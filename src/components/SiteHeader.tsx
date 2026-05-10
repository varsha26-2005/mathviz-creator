import { Link, useLocation } from "@tanstack/react-router";

export function SiteHeader() {
  const { pathname } = useLocation();
  const link = (to: string, label: string) => (
    <Link
      to={to}
      className={`text-sm transition-colors hover:text-foreground ${
        pathname === to ? "text-foreground" : "text-muted-foreground"
      }`}
    >
      {label}
    </Link>
  );
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 text-primary">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="7" cy="17" r="3" />
              <path d="M10 14l4-8" />
              <rect x="13" y="3" width="8" height="8" rx="1.5" />
            </svg>
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Math<span className="text-primary">Viz</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {link("/create", "Create")}
          {link("/examples", "Examples")}
          {link("/about", "About")}
        </nav>
        <Link
          to="/create"
          className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:opacity-90"
        >
          Try it
        </Link>
      </div>
    </header>
  );
}
