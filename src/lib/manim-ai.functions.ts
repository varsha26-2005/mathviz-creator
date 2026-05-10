import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway";

const SYSTEM = `You generate self-contained Manim Community Edition (v0.18+) Python scripts.

STRICT RULES:
- Output ONLY Python code. No markdown, no commentary, no \`\`\` fences.
- Start with: from manim import *
- Define exactly ONE Scene subclass. Use a clear PascalCase class name.
- Implement construct(self) with a short, visually clear animation (5-15 seconds total).
- Use self.play(...) and self.wait(...) properly. Add run_time where helpful.
- Prefer built-in mobjects: Text, MathTex, Axes, NumberPlane, Circle, Square, Rectangle, Polygon, Line, Dot, Arrow, ValueTracker, always_redraw.
- Do NOT use external assets, files, images, or network calls.
- Do NOT import anything besides 'from manim import *' and 'import numpy as np' if needed.
- Keep it under 60 lines.`;

export const generateManimScript = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ prompt: z.string().min(1).max(500) }).parse(data))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) return { script: "", error: "LOVABLE_API_KEY missing" };

    try {
      const gateway = createLovableAiGatewayProvider(key);
      const model = gateway("google/gemini-3-flash-preview");
      const { text } = await generateText({
        model,
        system: SYSTEM,
        prompt: `Create a Manim scene that visualizes: ${data.prompt}`,
      });
      // strip any accidental code fences
      const cleaned = text
        .replace(/^```(?:python)?\s*/i, "")
        .replace(/```\s*$/i, "")
        .trim();
      return { script: cleaned, error: null as string | null };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "AI request failed";
      return { script: "", error: msg };
    }
  });
