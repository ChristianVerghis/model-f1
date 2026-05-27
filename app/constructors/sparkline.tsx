type Point = { year: number; hp: number };

type Props = {
  points: Point[];
  width?: number;
  height?: number;
};

export function Sparkline({ points, width = 160, height = 36 }: Props) {
  if (points.length === 0) return null;
  if (points.length === 1) {
    return (
      <svg width={width} height={height} className="text-zinc-400 dark:text-zinc-600">
        <circle cx={width / 2} cy={height / 2} r={2.5} fill="currentColor" />
      </svg>
    );
  }

  const xs = points.map((p) => p.year);
  const ys = points.map((p) => p.hp);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const xRange = maxX - minX || 1;
  const yRange = maxY - minY || 1;

  const pad = 3;
  const w = width - pad * 2;
  const h = height - pad * 2;

  const coords = points.map((p) => {
    const x = pad + ((p.year - minX) / xRange) * w;
    const y = pad + h - ((p.hp - minY) / yRange) * h;
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
      <path d={path} fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinejoin="round" strokeLinecap="round" />
      {coords.map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r={1.4} fill="currentColor" />
      ))}
    </svg>
  );
}
