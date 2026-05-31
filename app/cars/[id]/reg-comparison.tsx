import type { ComparisonRow } from "@/lib/reg-compare";

function StatusDot({ status }: { status: ComparisonRow["status2025"] }) {
  if (status === "ok")
    return <span className="text-emerald-600 dark:text-emerald-400" title="Within current limits">●</span>;
  if (status === "violates")
    return <span className="text-rose-600 dark:text-rose-400" title="Outside current limits">●</span>;
  return <span className="text-zinc-400 dark:text-zinc-600" title="Not in dataset">○</span>;
}

function DeltaCell({ delta, unit, kind }: { delta: number | null; unit: string; kind: "min" | "max" | "value" }) {
  if (delta === null) return <span className="text-zinc-400">—</span>;
  if (delta === 0) return <span className="text-zinc-500">0 {unit}</span>;
  const color =
    kind === "min"
      ? delta >= 0
        ? "text-emerald-600 dark:text-emerald-400"
        : "text-rose-600 dark:text-rose-400"
      : kind === "max"
        ? delta <= 0
          ? "text-emerald-600 dark:text-emerald-400"
          : "text-rose-600 dark:text-rose-400"
        : "text-zinc-600 dark:text-zinc-400";
  const sign = delta > 0 ? "+" : "";
  return <span className={color}>{sign}{delta} {unit}</span>;
}

export function RegComparison({ rows }: { rows: ComparisonRow[] }) {
  const tracked = rows.filter((r) => r.carValue !== undefined);
  const untracked = rows.filter((r) => r.carValue === undefined);
  if (tracked.length === 0) {
    return (
      <p className="text-sm text-zinc-500">
        No dimensions in the dataset overlap with the current FIA limits for this car yet. Try a modern era car.
      </p>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-800 text-xs uppercase tracking-wider text-zinc-500">
            <th className="text-left py-2 pr-4 font-medium">Dimension</th>
            <th className="text-right py-2 px-3 font-medium">This car</th>
            <th className="text-right py-2 px-3 font-medium">2025 reg</th>
            <th className="text-right py-2 px-3 font-medium">Δ 2025</th>
            <th className="text-right py-2 px-3 font-medium">2026 reg</th>
            <th className="text-right py-2 px-3 font-medium">Δ 2026</th>
          </tr>
        </thead>
        <tbody>
          {tracked.map((row) => (
            <tr key={row.meta.key} className="border-b border-zinc-100 dark:border-zinc-900">
              <td className="py-2 pr-4">
                <div className="flex items-baseline gap-2">
                  <StatusDot status={row.status2025} />
                  <span>{row.meta.label}</span>
                </div>
                <span className="text-xs text-zinc-500 ml-4">
                  {row.meta.kind === "min" ? "minimum" : row.meta.kind === "max" ? "maximum" : "spec value"}
                </span>
              </td>
              <td className="py-2 px-3 text-right tabular-nums font-medium">
                {row.carValue} {row.meta.unit}
              </td>
              <td className="py-2 px-3 text-right tabular-nums text-zinc-600 dark:text-zinc-400">
                {row.regValue2025} {row.meta.unit}
              </td>
              <td className="py-2 px-3 text-right tabular-nums font-mono">
                <DeltaCell delta={row.delta2025} unit={row.meta.unit} kind={row.meta.kind} />
              </td>
              <td className="py-2 px-3 text-right tabular-nums text-zinc-600 dark:text-zinc-400">
                {row.regValue2026} {row.meta.unit}
              </td>
              <td className="py-2 px-3 text-right tabular-nums font-mono">
                <DeltaCell delta={row.delta2026} unit={row.meta.unit} kind={row.meta.kind} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {untracked.length > 0 ? (
        <p className="mt-4 text-xs text-zinc-500">
          Not in dataset for this car: {untracked.map((r) => r.meta.label).join(" · ")}
        </p>
      ) : null}
    </div>
  );
}
