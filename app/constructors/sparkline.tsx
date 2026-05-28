type Point = { year: number; hp: number };

type Bounds = {
  minYear: number;
  maxYear: number;
  minHp: number;
  maxHp: number;
};

type Props = {
  points: Point[];
  bounds: Bounds;
  width?: number;
  height?: number;
};

export function Sparkline({ points, bounds, width = 160, height = 36 }: Props) {
  if (points.length === 0) return null;

  const xRange = bounds.maxYear - bounds.minYear || 1;
  const yRange = bounds.maxHp - bounds.minHp || 1;
  const pad = 3;
  const w = width - pad * 2;
  const h = height - pad * 2;

  if (points.length === 1) {
    const p = points[0];
    const x = pad + ((p.year - bounds.minYear) / xRange) * w;
    const y = pad + h - ((p.hp - bounds.minHp) / yRange) * h;
    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="text-zinc-400 dark:text-zinc-500"
        aria-hidden
      >
        <line x1={pad} x2={width - pad} y1={height - pad} y2={height - pad} stroke="currentColor" strokeOpacity={0.15} />
        <circle cx={x} cy={y} r={2} fill="currentColor" />
      </svg>
    );
  }

  const coords = points.map((p) => {
    const x = pad + ((p.year - bounds.minYear) / xRange) * w;
    const y = pad + h - ((p.hp - bounds.minHp) / yRange) * h;
    return { x, y };
  });

  const path = coords
    .map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)},${c.y.toFixed(1)}`)
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="text-zinc-400 dark:text-zinc-500"
      aria-hidden
    >
      <line x1={pad} x2={width - pad} y1={height - pad} y2={height - pad} stroke="currentColor" strokeOpacity={0.15} />
      <path d={path} fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinejoin="round" strokeLinecap="round" />
      {coords.map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r={1.4} fill="currentColor" />
      ))}
    </svg>
  );
}
