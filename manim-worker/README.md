# MathViz Manim Worker

A tiny FastAPI service that renders a Manim script to mp4. Designed to run on a free Hugging Face Space (Docker SDK).

## Deploy to Hugging Face Spaces

1. Go to https://huggingface.co/new-space
2. **Space SDK**: Docker → "Blank"
3. **Hardware**: CPU basic (free) is enough for `-q l` (480p15). Use upgraded hardware for higher quality.
4. Clone the new empty Space repo locally:
   ```bash
   git clone https://huggingface.co/spaces/<your-username>/<space-name>
   ```
5. Copy the contents of this `manim-worker/` folder into the cloned repo.
6. In Space **Settings → Variables and secrets**, add a secret:
   - `WORKER_TOKEN` = any long random string (e.g. `openssl rand -hex 32`)
7. Commit & push. Wait for the Space to build (~5–10 min the first time — LaTeX is heavy).
8. The Space will be live at `https://<your-username>-<space-name>.hf.space`

## Test it

```bash
curl -X POST https://<your-space>.hf.space/render \
  -H "Authorization: Bearer <WORKER_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"script":"from manim import *\nclass S(Scene):\n    def construct(self):\n        self.play(Write(Text(\"hi\")))","scene":"S"}'
```

## Wire into MathViz

Back in Lovable, add two secrets to the project:
- `MANIM_WORKER_URL` = `https://<your-space>.hf.space`
- `MANIM_WORKER_TOKEN` = the same `WORKER_TOKEN` you set on the Space

That's it — the `/create` page will call your Space and play the returned mp4.
