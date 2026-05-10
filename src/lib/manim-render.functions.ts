import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const renderManim = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z.object({ script: z.string().min(10).max(20000) }).parse(data),
  )
  .handler(async ({ data }) => {
    const url = process.env.MANIM_WORKER_URL;
    const token = process.env.MANIM_WORKER_TOKEN;
    if (!url) return { dataUrl: "", error: "MANIM_WORKER_URL secret not set" };

    try {
      const res = await fetch(`${url.replace(/\/$/, "")}/render`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ script: data.script, quality: "l" }),
      });
      if (!res.ok) {
        const body = await res.text();
        return { dataUrl: "", error: `Worker ${res.status}: ${body.slice(0, 500)}` };
      }
      const json = (await res.json()) as { video_base64: string; mime: string };
      if (!json.video_base64) return { dataUrl: "", error: "Worker returned no video" };
      return { dataUrl: `data:${json.mime};base64,${json.video_base64}`, error: null as string | null };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Render request failed";
      return { dataUrl: "", error: msg };
    }
  });
