import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/examples")({
  component: Examples,
  head: () => ({
    meta: [
      { title: "Examples — MathViz" },
      { name: "description", content: "A gallery of math animations made with MathViz." },
    ],
  }),
});

const items = [
  { title: "Sine & the unit circle", tag: "Trigonometry", color: "from-chalk-blue/30 to-transparent",
    prompt: "Visualize the unit circle and sine wave together",
    desc: "How rotating angles trace out the sine function." },
  { title: "Pythagorean proof", tag: "Geometry", color: "from-chalk-pink/30 to-transparent",
    prompt: "Animate the proof of the Pythagorean theorem",
    desc: "Squares dance into place around a right triangle." },
  { title: "Fourier square wave", tag: "Series", color: "from-chalk-yellow/30 to-transparent",
    prompt: "Show the Fourier series of a square wave",
    desc: "Watch sinusoids pile up into a square pulse." },
  { title: "Eigen-shear", tag: "Linear algebra", color: "from-chalk-green/30 to-transparent",
    prompt: "Show eigenvectors of a 2×2 shear matrix",
    desc: "Vectors that refuse to change direction." },
  { title: "Mandelbrot zoom", tag: "Fractals", color: "from-chalk-pink/30 to-transparent",
    prompt: "Draw a Mandelbrot zoom up to depth 6",
    desc: "Infinite detail at the edge of chaos." },
  { title: "Derivative as slope", tag: "Calculus", color: "from-chalk-blue/30 to-transparent",
    prompt: "Animate the derivative as the slope of a tangent line",
    desc: "A tangent line glides along a curve." },
];

function Examples() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Gallery</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Examples to learn from.</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">Open any prompt in the studio and remix it.</p>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <Link
            key={it.title}
            to="/create"
            search={{ q: it.prompt }}
            className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-5 transition hover:border-primary/40"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${it.color} opacity-60`} />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-background/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground backdrop-blur">
                  {it.tag}
                </span>
                <span className="text-muted-foreground transition group-hover:text-primary">→</span>
              </div>
              <h3 className="mt-12 font-display text-2xl">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
