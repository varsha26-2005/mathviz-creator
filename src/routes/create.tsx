import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { SceneRenderer } from "@/components/SceneRenderer";
import { generateManimScript } from "@/lib/manim-ai.functions";
import { renderManim } from "@/lib/manim-render.functions";

const search = z.object({ q: z.string().optional() });

export const Route = createFileRoute("/create")({
  component: Create,
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Studio — MathViz" },
      { name: "description", content: "Type a prompt and generate an animated math explainer." },
    ],
  }),
});

type Status = "idle" | "thinking" | "rendering" | "done" | "error";

function Create() {
  const { q } = Route.useSearch();
  const [prompt, setPrompt] = useState(q ?? "");
  const [status, setStatus] = useState<Status>("idle");
  const [script, setScript] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");

  const generate = useServerFn(generateManimScript);
  const render = useServerFn(renderManim);

  useEffect(() => { if (q) setPrompt(q); }, [q]);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;
    setStatus("thinking");
    setScript(""); setVideoUrl(""); setError("");

    const ai = await generate({ data: { prompt } });
    if (ai.error || !ai.script) {
      setError(ai.error || "Could not generate script");
      setStatus("error");
      return;
    }
    setScript(ai.script);
    setStatus("rendering");

    const r = await render({ data: { script: ai.script } });
    if (r.error || !r.dataUrl) {
      setError(r.error || "Render failed");
      setStatus("error");
      return;
    }
    setVideoUrl(r.dataUrl);
    setStatus("done");
  }

  const busy = status === "thinking" || status === "rendering";

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Studio</p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">Compose a scene</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Describe what you want to visualize. MathViz drafts a Manim script with AI and renders a real mp4.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="rounded-2xl border border-border/70 bg-card/60 p-5 shadow-[var(--shadow-glow)]">
        <div className="flex items-start gap-3">
          <span className="mt-3 font-mono text-xs text-muted-foreground">PROMPT</span>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Animate the proof of the Pythagorean theorem"
            rows={3}
            className="flex-1 resize-none bg-transparent text-lg outline-none placeholder:text-muted-foreground/60"
          />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">First render takes ~30–90s while the worker spins up.</span>
          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            {status === "thinking" ? "Drafting…" : status === "rendering" ? "Rendering…" : "Generate"}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-6 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          <p className="font-medium">Something went wrong</p>
          <p className="mt-1 font-mono text-xs opacity-90">{error}</p>
        </div>
      )}

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border/70 bg-card/40 p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg">Preview</h2>
            <span className="font-mono text-xs text-muted-foreground">
              {status === "idle" && "ready"}
              {status === "thinking" && "drafting script…"}
              {status === "rendering" && "rendering with Manim…"}
              {status === "done" && "complete"}
              {status === "error" && "error"}
            </span>
          </div>
          {status === "done" && videoUrl ? (
            <video
              src={videoUrl}
              controls
              autoPlay
              loop
              className="aspect-video w-full rounded-3xl border border-border/70 bg-black"
            />
          ) : status === "error" ? (
            <div className="grid h-[360px] place-items-center rounded-3xl border border-dashed border-destructive/40 bg-background/30 text-center">
              <SceneRenderer prompt={prompt} />
            </div>
          ) : (
            <div className="grid h-[360px] place-items-center rounded-3xl border border-dashed border-border/70 bg-background/30 text-center">
              <div>
                <div
                  className="mx-auto mb-3 h-10 w-10 rounded-full border-2 border-primary/40 border-t-primary animate-spin"
                  style={{ opacity: busy ? 1 : 0.2 }}
                />
                <p className="text-sm text-muted-foreground">
                  {status === "idle" ? "Your animation will appear here." : "Working on your scene…"}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-border/70 bg-card/40 p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg">Generated script</h2>
            {script && (
              <button
                onClick={() => navigator.clipboard.writeText(script)}
                className="rounded-full border border-border bg-background/40 px-3 py-1 text-xs hover:border-primary/40"
              >
                Copy
              </button>
            )}
          </div>
          <pre className="max-h-[360px] overflow-auto rounded-xl border border-border/60 bg-background/60 p-4 text-xs leading-relaxed text-foreground/90">
{script || "# Your AI-generated Manim script will appear here.\n# Try: 'Visualize the unit circle and sine wave together'"}
          </pre>
        </div>
      </div>
    </div>
  );
}
