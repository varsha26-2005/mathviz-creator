import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroAnimation } from "@/components/HeroAnimation";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "MathViz — Prompt to mathematical animation" },
      { name: "description", content: "Describe an idea. MathViz writes the script and renders a clean math animation in seconds." },
    ],
  }),
});

const features = [
  { title: "Prompt to scene", body: "Type an idea like 'visualize the Fourier series of a square wave' and get a structured scene." },
  { title: "Readable scripts", body: "Every animation comes with a clean, editable Manim-style script — no black box." },
  { title: "Built for teaching", body: "Designed for educators, students, and curious minds who think in pictures." },
];

const examples = [
  "Visualize the unit circle and sine wave together",
  "Animate the proof of the Pythagorean theorem",
  "Draw a Mandelbrot zoom up to depth 6",
  "Show eigenvectors of a 2×2 shear matrix",
];

function Index() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-backdrop" />
        <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-28">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-chalk-pink" />
                Math, animated.
              </span>
              <h1 className="mt-5 font-display text-5xl leading-[1.05] md:text-6xl">
                Turn an idea into a <span className="text-primary">mathematical</span>{" "}
                <span className="italic text-accent">animation</span>.
              </h1>
              <p className="mt-5 max-w-lg text-lg text-muted-foreground">
                MathViz writes the scene, renders it, and gives you the source. From
                eigenvectors to Fourier series — explained the way you'd draw it on a chalkboard.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/create" className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:opacity-90">
                  Create an animation
                </Link>
                <Link to="/examples" className="rounded-full border border-border bg-card/40 px-6 py-3 text-sm font-medium text-foreground/90 transition hover:bg-card">
                  Browse examples
                </Link>
              </div>
            </div>
            <div className="animate-float"><HeroAnimation /></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-3xl md:text-4xl">A studio for visual thinking.</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">Three primitives. Endless explainers.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {features.map((f, i) => (
            <div key={f.title} className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-6 transition hover:border-primary/40">
              <div className="font-mono text-xs text-muted-foreground">0{i + 1}</div>
              <h3 className="mt-3 font-display text-xl">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-3xl border border-border/70 bg-card/50 p-8 md:p-12">
          <h2 className="font-display text-3xl">Try one of these prompts</h2>
          <p className="mt-2 text-muted-foreground">Click any to open it in the studio.</p>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {examples.map((e) => (
              <Link
                key={e}
                to="/create"
                search={{ q: e }}
                className="group flex items-center justify-between rounded-xl border border-border/60 bg-background/40 p-4 text-left text-sm transition hover:border-primary/50 hover:bg-background/70"
              >
                <span className="font-mono text-foreground/90">{e}</span>
                <span className="text-muted-foreground transition group-hover:text-primary">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="font-display text-4xl md:text-5xl">Ready to see your math move?</h2>
        <p className="mt-3 text-muted-foreground">Open the studio and type your first scene.</p>
        <Link to="/create" className="mt-7 inline-block rounded-full bg-accent px-7 py-3 text-sm font-medium text-accent-foreground shadow-[var(--shadow-glow)]">
          Open the studio
        </Link>
      </section>
    </div>
  );
}
