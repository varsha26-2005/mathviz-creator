"""
MathViz Manim render worker (Hugging Face Space, Docker SDK).

POST /render   { "script": "<full manim python>", "scene": "MyScene" }
             -> { "video_base64": "...", "mime": "video/mp4" }

Set a Space secret WORKER_TOKEN and send it as `Authorization: Bearer <token>`.
"""
import base64
import os
import re
import shutil
import subprocess
import tempfile
import uuid
from pathlib import Path

from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

WORKER_TOKEN = os.environ.get("WORKER_TOKEN", "")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class RenderRequest(BaseModel):
    script: str
    scene: str | None = None
    quality: str = "l"  # l=480p15, m=720p30, h=1080p60


@app.get("/")
def health():
    return {"status": "ok", "service": "mathviz-manim-worker"}


def _detect_scene(script: str) -> str:
    m = re.search(r"class\s+(\w+)\s*\(\s*\w*Scene\w*\s*\)", script)
    if not m:
        raise HTTPException(400, "No Scene subclass found in script")
    return m.group(1)


@app.post("/render")
def render(req: RenderRequest, authorization: str | None = Header(default=None)):
    if WORKER_TOKEN:
        if not authorization or authorization != f"Bearer {WORKER_TOKEN}":
            raise HTTPException(401, "Unauthorized")

    scene = req.scene or _detect_scene(req.script)
    job_id = uuid.uuid4().hex[:12]
    workdir = Path(tempfile.mkdtemp(prefix=f"manim_{job_id}_", dir="/tmp"))

    try:
        script_path = workdir / "scene.py"
        script_path.write_text(req.script, encoding="utf-8")

        media_dir = workdir / "media"
        cmd = [
            "manim", "render",
            "-q", req.quality,
            "--media_dir", str(media_dir),
            "--disable_caching",
            str(script_path), scene,
        ]
        proc = subprocess.run(cmd, capture_output=True, text=True, timeout=180)
        if proc.returncode != 0:
            raise HTTPException(
                500,
                f"Manim failed:\nSTDOUT:\n{proc.stdout[-2000:]}\nSTDERR:\n{proc.stderr[-2000:]}",
            )

        mp4s = list(media_dir.rglob("*.mp4"))
        if not mp4s:
            raise HTTPException(500, "Render produced no mp4")
        mp4 = max(mp4s, key=lambda p: p.stat().st_mtime)
        data = mp4.read_bytes()
        return {
            "video_base64": base64.b64encode(data).decode("ascii"),
            "mime": "video/mp4",
            "scene": scene,
            "bytes": len(data),
        }
    finally:
        shutil.rmtree(workdir, ignore_errors=True)
