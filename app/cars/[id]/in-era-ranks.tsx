type Rank = {
  metric: string;
  value: number;
  rank: number;
  min: number;
  max: number;
  median: number;
  unit: string;
};

type Props = {
  total: number;
  ranks: Rank[];
};

function PositionBar({ value, min, max, median, unit }: { value: number; min: number; max: number; median: number; unit: string }) {
  if (max === min) {
    return (
      <div className="mt-2 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded relative">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-red-600 rounded-full" />
      </div>
    );
  }
  const pct = ((value - min) / (max - min)) * 100;
  const medianPct = ((median - min) / (max - min)) * 100;
  return (
    <div className="mt-2 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded relative">
      <span
        className="absolute top-0 bottom-0 w-px bg-zinc-500"
        style={{ left: `${medianPct}%` }}
        title={`era median: ${median} ${unit}`}
      />
      <span
        className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-red-600 rounded-full -translate-x-1/2"
        style={{ left: `${pct}%` }}
      />
    </div>
  );
}

export function InEraRanks({ total, ranks }: Props) {
  if (ranks.length === 0) return null;
  return (
    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
      {ranks.map((r) => (
        <div key={r.metric}>
          <div className="flex items-baseline justify-between">
            <p className="text-sm text-zinc-700 dark:text-zinc-300">{r.metric}</p>
            <p className="text-xs font-mono tabular-nums text-zinc-500">
              #{r.rank} of {total}
            </p>
          </div>
          <div className="flex items-baseline justify-between text-xs tabular-nums text-zinc-500 mt-0.5">
            <span>{r.min} {r.unit} min</span>
            <span className="text-zinc-700 dark:text-zinc-300 font-medium">
              {r.value} {r.unit}
            </span>
            <span>{r.max} {r.unit} max</span>
          </div>
          <PositionBar value={r.value} min={r.min} max={r.max} median={r.median} unit={r.unit} />
        </div>
      ))}
      <p className="sm:col-span-2 text-xs text-zinc-500 mt-2">
        Red dot is this car. Grey tick is the era median.
      </p>
    </div>
  );
}
