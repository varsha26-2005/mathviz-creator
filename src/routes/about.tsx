import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — MathViz" },
      { name: "description", content: "MathViz is a studio for turning ideas into mathematical animations." },
    ],
  }),
});

const steps = [
  { n: "01", t: "Describe", d: "You type a prompt — anything from a single equation to a whole proof." },
  { n: "02", t: "Compose", d: "MathViz drafts a structured scene script using simple, readable primitives." },
  { n: "03", t: "Render", d: "The scene becomes a clean animation you can preview and download." },
];

function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">About</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Mathematics, drawn out loud.</h1>
      <p className="mt-5 text-lg text-muted-foreground">
        MathViz is a small studio that turns ideas into mathematical animations.
        It exists because the best way to understand something is often to see it move.
      </p>

      <div className="mt-12 space-y-5">
        {steps.map((s) => (
          <div key={s.n} className="flex gap-5 rounded-2xl border border-border/70 bg-card/50 p-6">
            <span className="font-mono text-sm text-primary">{s.n}</span>
            <div>
              <h3 className="font-display text-xl">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-border/70 bg-gradient-to-br from-primary/15 to-accent/10 p-8 text-center">
        <h2 className="font-display text-2xl">Open the studio</h2>
        <p className="mt-2 text-sm text-muted-foreground">Type your first prompt — it takes about ten seconds.</p>
        <Link to="/create" className="mt-5 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground">
          Get started
        </Link>
      </div>
    </div>
  );
}
