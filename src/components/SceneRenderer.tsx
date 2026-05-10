import { useMemo } from "react";

type SceneKind =
  | "sine" | "circle-roll" | "pythagoras" | "fourier" | "matrix" | "derivative" | "mandelbrot" | "parabola"
  | "circle" | "ellipse" | "hyperbola" | "rectangle" | "trapezium" | "parallelogram" | "cube" | "cuboid";

function pickScene(prompt: string): SceneKind {
  const p = prompt.toLowerCase();
  if (/(roll|rolling|cycloid)/.test(p)) return "circle-roll";
  if (/pythag|right triangle/.test(p)) return "pythagoras";
  if (/fourier|square wave|harmonic/.test(p)) return "fourier";
  if (/eigen|shear|linear transform|matrix/.test(p)) return "matrix";
  if (/derivative|tangent|slope/.test(p)) return "derivative";
  if (/mandelbrot|fractal|julia/.test(p)) return "mandelbrot";
  if (/hyperbola/.test(p)) return "hyperbola";
  if (/ellipse|oval/.test(p)) return "ellipse";
  if (/cuboid|box/.test(p)) return "cuboid";
  if (/\bcube\b/.test(p)) return "cube";
  if (/trapezium|trapezoid/.test(p)) return "trapezium";
  if (/parallelogram/.test(p)) return "parallelogram";
  if (/rectangle/.test(p)) return "rectangle";
  if (/\bcircle\b/.test(p)) return "circle";
  if (/parabola|quadratic|x\^?2/.test(p)) return "parabola";
  return "sine";
}

const titles: Record<SceneKind, string> = {
  "sine": "y = sin(x)",
  "circle-roll": "circle rolling on a plane",
  "pythagoras": "a² + b² = c²",
  "fourier": "Fourier square wave",
  "matrix": "linear transformation",
  "derivative": "derivative as slope",
  "mandelbrot": "Mandelbrot set",
  "parabola": "y = x²",
  "circle": "x² + y² = r²",
  "ellipse": "x²/a² + y²/b² = 1",
  "hyperbola": "x²/a² − y²/b² = 1",
  "rectangle": "rectangle",
  "trapezium": "trapezium",
  "parallelogram": "parallelogram",
  "cube": "cube",
  "cuboid": "cuboid",
};

export function SceneRenderer({ prompt }: { prompt: string }) {
  const kind = useMemo(() => pickScene(prompt), [prompt]);
  const key = `${kind}:${prompt}`;

  return (
    <div className="relative h-[360px] w-full overflow-hidden rounded-3xl border border-border/70 bg-card/60 shadow-[var(--shadow-glow)]">
      <div className="absolute inset-0 grid-backdrop opacity-70" />
      <svg key={key} viewBox="0 0 600 360" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="sg" x1="0" x2="1">
            <stop offset="0" stopColor="oklch(0.78 0.14 240)" />
            <stop offset="1" stopColor="oklch(0.8 0.16 350)" />
          </linearGradient>
        </defs>
        {kind === "sine" && <SineScene />}
        {kind === "circle-roll" && <CircleRollScene />}
        {kind === "pythagoras" && <PythagorasScene />}
        {kind === "fourier" && <FourierScene />}
        {kind === "matrix" && <MatrixScene />}
        {kind === "derivative" && <DerivativeScene />}
        {kind === "mandelbrot" && <MandelbrotScene />}
        {kind === "parabola" && <ParabolaScene />}
        {kind === "circle" && <CircleScene />}
        {kind === "ellipse" && <EllipseScene />}
        {kind === "hyperbola" && <HyperbolaScene />}
        {kind === "rectangle" && <RectangleScene />}
        {kind === "trapezium" && <TrapeziumScene />}
        {kind === "parallelogram" && <ParallelogramScene />}
        {kind === "cube" && <CubeScene />}
        {kind === "cuboid" && <CuboidScene />}
      </svg>
      <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-background/70 px-3 py-1 text-xs font-mono text-muted-foreground backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-chalk-green animate-pulse-glow" />
        rendering · {titles[kind]}
      </div>
    </div>
  );
}

function Axes() {
  return (
    <>
      <line x1="60" y1="300" x2="540" y2="300" stroke="oklch(0.6 0.02 250 / 0.5)" strokeWidth="1.2" />
      <line x1="300" y1="40" x2="300" y2="320" stroke="oklch(0.6 0.02 250 / 0.5)" strokeWidth="1.2" />
    </>
  );
}

function SineScene() {
  let d = "";
  for (let i = 0; i <= 480; i += 4) {
    const x = 60 + i;
    const t = (i / 480) * Math.PI * 4;
    d += (i === 0 ? "M" : "L") + x + "," + (180 + Math.sin(t) * 90) + " ";
  }
  return (
    <>
      <Axes />
      <path d={d} fill="none" stroke="url(#sg)" strokeWidth="3" strokeLinecap="round" className="animate-draw" style={{ ["--len" as never]: 1400 }} />
      <circle cx="300" cy="180" r="70" fill="none" stroke="oklch(0.78 0.14 240)" strokeWidth="2" className="animate-draw" style={{ ["--len" as never]: 480 }} />
      <text x="220" y="80" fill="oklch(0.9 0.14 95)" fontSize="14" fontFamily="serif" fontStyle="italic">y = sin(x)</text>
    </>
  );
}

function CircleRollScene() {
  const r = 40;
  // cycloid path
  let d = "";
  for (let i = 0; i <= 200; i++) {
    const t = (i / 200) * Math.PI * 4;
    const x = 80 + r * t;
    const y = 260 - r * (1 - Math.cos(t));
    d += (i === 0 ? "M" : "L") + x + "," + y + " ";
  }
  return (
    <>
      <line x1="40" y1="260" x2="560" y2="260" stroke="oklch(0.6 0.02 250 / 0.6)" strokeWidth="1.5" />
      <path d={d} fill="none" stroke="url(#sg)" strokeWidth="2" strokeDasharray="4 4" className="animate-draw" style={{ ["--len" as never]: 1600 }} />
      <g style={{ transformOrigin: "center", animation: "roll 4s linear infinite" }}>
        <circle cx="0" cy="0" r={r} fill="none" stroke="oklch(0.78 0.14 240)" strokeWidth="2.5" />
        <line x1="0" y1="0" x2="0" y2={-r} stroke="oklch(0.8 0.16 350)" strokeWidth="2" />
        <circle cx="0" cy={-r} r="5" fill="oklch(0.8 0.16 350)" />
      </g>
      <style>{`@keyframes roll { from { transform: translate(80px, 220px) rotate(0deg); } to { transform: translate(520px, 220px) rotate(630deg); } }`}</style>
      <text x="40" y="320" fill="oklch(0.9 0.14 95)" fontSize="13" fontFamily="serif" fontStyle="italic">cycloid traced by a point on a rolling circle</text>
    </>
  );
}

function PythagorasScene() {
  return (
    <>
      <polygon points="180,260 420,260 180,120" fill="oklch(0.78 0.14 240 / 0.15)" stroke="url(#sg)" strokeWidth="2.5" className="animate-draw" style={{ ["--len" as never]: 900 }} />
      <rect x="180" y="260" width="80" height="80" fill="oklch(0.78 0.14 240 / 0.25)" stroke="oklch(0.78 0.14 240)" />
      <rect x="100" y="120" width="80" height="140" fill="oklch(0.8 0.16 350 / 0.25)" stroke="oklch(0.8 0.16 350)" />
      <text x="295" y="280" fill="oklch(0.9 0.14 95)" fontSize="14" fontFamily="serif" fontStyle="italic">a</text>
      <text x="155" y="195" fill="oklch(0.9 0.14 95)" fontSize="14" fontFamily="serif" fontStyle="italic">b</text>
      <text x="305" y="195" fill="oklch(0.9 0.14 95)" fontSize="14" fontFamily="serif" fontStyle="italic">c</text>
      <text x="220" y="60" fill="oklch(0.9 0.14 95)" fontSize="16" fontFamily="serif" fontStyle="italic">a² + b² = c²</text>
    </>
  );
}

function FourierScene() {
  const terms = [1, 3, 5, 7, 9];
  let d = "";
  for (let i = 0; i <= 480; i += 2) {
    const x = 60 + i;
    const t = (i / 480) * Math.PI * 4;
    let y = 0;
    for (const n of terms) y += Math.sin(n * t) / n;
    d += (i === 0 ? "M" : "L") + x + "," + (180 + y * 80) + " ";
  }
  return (
    <>
      <Axes />
      <path d={d} fill="none" stroke="url(#sg)" strokeWidth="2.5" className="animate-draw" style={{ ["--len" as never]: 1500 }} />
      <text x="200" y="70" fill="oklch(0.9 0.14 95)" fontSize="14" fontFamily="serif" fontStyle="italic">Σ sin(nx)/n  →  square wave</text>
    </>
  );
}

function MatrixScene() {
  return (
    <>
      <Axes />
      <g style={{ animation: "shear 3s ease-in-out infinite alternate" }}>
        <rect x="220" y="100" width="160" height="160" fill="oklch(0.78 0.14 240 / 0.2)" stroke="url(#sg)" strokeWidth="2.5" />
      </g>
      <style>{`@keyframes shear { from { transform: matrix(1,0,0,1,0,0); } to { transform: matrix(1,0,0.6,1,-50,0); } }`}</style>
      <text x="200" y="60" fill="oklch(0.9 0.14 95)" fontSize="14" fontFamily="serif" fontStyle="italic">[ 1  k ; 0  1 ]  · shear</text>
    </>
  );
}

function DerivativeScene() {
  let d = "";
  for (let i = 0; i <= 480; i += 4) {
    const x = 60 + i;
    const xn = (i - 240) / 60;
    const y = 280 - (xn * xn) * 25;
    d += (i === 0 ? "M" : "L") + x + "," + y + " ";
  }
  return (
    <>
      <Axes />
      <path d={d} fill="none" stroke="url(#sg)" strokeWidth="3" className="animate-draw" style={{ ["--len" as never]: 1400 }} />
      <line x1="120" y1="100" x2="480" y2="280" stroke="oklch(0.8 0.16 350)" strokeWidth="2" strokeDasharray="6 4" />
      <circle cx="360" cy="220" r="6" fill="oklch(0.8 0.16 350)" className="animate-pulse-glow" />
      <text x="200" y="70" fill="oklch(0.9 0.14 95)" fontSize="14" fontFamily="serif" fontStyle="italic">f'(x) = slope of tangent</text>
    </>
  );
}

function MandelbrotScene() {
  const dots: { x: number; y: number; o: number }[] = [];
  for (let i = 0; i < 600; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 60 + Math.random() * 60 * Math.sin(a * 3);
    dots.push({ x: 300 + Math.cos(a) * r, y: 180 + Math.sin(a) * r, o: Math.random() });
  }
  return (
    <>
      {dots.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="1.4" fill="url(#sg)" opacity={p.o} />
      ))}
      <text x="200" y="60" fill="oklch(0.9 0.14 95)" fontSize="14" fontFamily="serif" fontStyle="italic">z → z² + c</text>
    </>
  );
}

function ParabolaScene() {
  let d = "";
  for (let i = 0; i <= 480; i += 4) {
    const x = 60 + i;
    const xn = (i - 240) / 80;
    d += (i === 0 ? "M" : "L") + x + "," + (290 - xn * xn * 30) + " ";
  }
  return (
    <>
      <Axes />
      <path d={d} fill="none" stroke="url(#sg)" strokeWidth="3" className="animate-draw" style={{ ["--len" as never]: 1400 }} />
      <text x="220" y="70" fill="oklch(0.9 0.14 95)" fontSize="14" fontFamily="serif" fontStyle="italic">y = x²</text>
    </>
  );
}
