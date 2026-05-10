export function HeroAnimation() {
  return (
    <div className="relative h-[360px] w-full overflow-hidden rounded-3xl border border-border/70 bg-card/60 shadow-[var(--shadow-glow)]">
      <div className="absolute inset-0 grid-backdrop opacity-70" />
      <svg viewBox="0 0 600 360" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0" stopColor="oklch(0.78 0.14 240)" />
            <stop offset="1" stopColor="oklch(0.8 0.16 350)" />
          </linearGradient>
        </defs>
        {/* axes */}
        <line x1="60" y1="300" x2="540" y2="300" stroke="oklch(0.6 0.02 250 / 0.5)" strokeWidth="1.2" />
        <line x1="300" y1="40" x2="300" y2="320" stroke="oklch(0.6 0.02 250 / 0.5)" strokeWidth="1.2" />
        {/* sine curve */}
        <path
          d={(() => {
            let d = "";
            for (let i = 0; i <= 480; i += 4) {
              const x = 60 + i;
              const t = (i / 480) * Math.PI * 4;
              const y = 180 + Math.sin(t) * 90;
              d += (i === 0 ? "M" : "L") + x + "," + y + " ";
            }
            return d;
          })()}
          fill="none"
          stroke="url(#g1)"
          strokeWidth="3"
          strokeLinecap="round"
          className="animate-draw"
          style={{ ["--len" as never]: 1400 }}
        />
        {/* circle + radius */}
        <circle cx="300" cy="180" r="70" fill="none" stroke="oklch(0.78 0.14 240)" strokeWidth="2" className="animate-draw" style={{ ["--len" as never]: 480 }} />
        <circle cx="370" cy="180" r="6" fill="oklch(0.8 0.16 350)" className="animate-pulse-glow" />
        <line x1="300" y1="180" x2="370" y2="180" stroke="oklch(0.8 0.16 350)" strokeWidth="2" />
        {/* labels */}
        <text x="540" y="315" fill="oklch(0.7 0.02 252)" fontSize="12" fontFamily="ui-monospace">x</text>
        <text x="285" y="38" fill="oklch(0.7 0.02 252)" fontSize="12" fontFamily="ui-monospace">y</text>
        <text x="220" y="80" fill="oklch(0.9 0.14 95)" fontSize="14" fontFamily="serif" fontStyle="italic">y = sin(x)</text>
      </svg>
      <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-background/70 px-3 py-1 text-xs font-mono text-muted-foreground backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-chalk-green animate-pulse-glow" />
        rendering · scene 01
      </div>
    </div>
  );
}
