export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} MathViz. Animations rendered with care.</p>
        <p className="font-mono text-xs">v0.1 · built for learners</p>
      </div>
    </footer>
  );
}
