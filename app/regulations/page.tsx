import Link from "next/link";
import { currentRegs, incomingRegs, regLimitMeta } from "@/data/currentRegs";
import { tireEras } from "@/data/tireEras";

function fmt(value: number | string | boolean, unit: string): string {
  if (typeof value === "boolean") return value ? "yes" : "no";
  if (typeof value === "string") return value;
  return `${value}${unit ? " " + unit : ""}`;
}

function deltaLabel(a: number | string | boolean, b: number | string | boolean, unit: string): string | null {
  if (typeof a !== "number" || typeof b !== "number") {
    if (a === b) return null;
    return `${a} → ${b}`;
  }
  const d = b - a;
  if (d === 0) return null;
  const sign = d > 0 ? "+" : "";
  return `${sign}${d}${unit ? " " + unit : ""}`;
}

export default function RegulationsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 w-full">
      <header className="mb-10 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="flex items-baseline justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Regulations</p>
          <Link
            href="/regulations/2026"
            className="text-xs uppercase tracking-wider text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            2026 deep-dive →
          </Link>
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Current FIA limits and what changes in 2026.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          The numbers that bound modern Formula 1 design. Mass, dimensions, hybrid spec, and
          fuel flow on the left; the 2026 reset on the right. Use any car&apos;s detail page to see
          where its specs land against these limits.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-4">
          Technical limits
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 text-xs uppercase tracking-wider text-zinc-500">
                <th className="text-left py-3 pr-4 font-medium">Dimension</th>
                <th className="text-right py-3 px-3 font-medium">2025 (current)</th>
                <th className="text-right py-3 px-3 font-medium">2026 (incoming)</th>
                <th className="text-right py-3 pl-3 font-medium">Δ</th>
              </tr>
            </thead>
            <tbody>
              {regLimitMeta.map((meta) => {
                const a = currentRegs.limits[meta.key];
                const b = incomingRegs.limits[meta.key];
                const d = deltaLabel(a, b, meta.unit);
                return (
                  <tr key={meta.key} className="border-b border-zinc-100 dark:border-zinc-900">
                    <td className="py-3 pr-4">
                      <p className="font-medium">{meta.label}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {meta.kind === "min" ? "minimum" : meta.kind === "max" ? "maximum" : "spec"} ·{" "}
                        {meta.description}
                      </p>
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums">{fmt(a, meta.unit)}</td>
                    <td className="py-3 px-3 text-right tabular-nums">{fmt(b, meta.unit)}</td>
                    <td className="py-3 pl-3 text-right tabular-nums font-mono text-zinc-600 dark:text-zinc-400">
                      {d}
                    </td>
                  </tr>
                );
              })}
              <BinaryRow label="MGU-H" a={currentRegs.limits.mguH as boolean} b={incomingRegs.limits.mguH as boolean} />
              <BinaryRow label="DRS" a={currentRegs.limits.drs as boolean} b={incomingRegs.limits.drs as boolean} />
              <BinaryRow label="Halo (cockpit halo)" a={currentRegs.limits.halo as boolean} b={incomingRegs.limits.halo as boolean} />
              <BinaryRow label="Sustainable fuel" a={currentRegs.limits.sustainableFuel as boolean} b={incomingRegs.limits.sustainableFuel as boolean} />
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-4">
          Financial limits
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <BudgetCard
            label="Technical cost cap"
            current={currentRegs.limits.costCapTechnicalMUSD as number}
            incoming={incomingRegs.limits.costCapTechnicalMUSD as number}
            description="Covers chassis design, R&D, manufacturing — anything that improves on-track performance. Excludes drivers' salaries and the three highest-paid staff."
          />
          <BudgetCard
            label="Power-unit cost cap"
            current={currentRegs.limits.costCapPowerUnitMUSD as number}
            incoming={incomingRegs.limits.costCapPowerUnitMUSD as number}
            description="Separate cap for engine R&D and supply. Designed to keep new PU manufacturers (Audi, GM-Cadillac) viable."
          />
        </div>
      </section>

      <section className="mb-12 grid sm:grid-cols-2 gap-6">
        <article className="rounded border border-zinc-200 dark:border-zinc-800 p-5">
          <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-2">
            {currentRegs.label}
          </h3>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{currentRegs.notes}</p>
        </article>
        <article className="rounded border border-zinc-200 dark:border-zinc-800 p-5 bg-emerald-50/50 dark:bg-emerald-950/20">
          <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-2">
            {incomingRegs.label}
          </h3>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{incomingRegs.notes}</p>
        </article>
      </section>

      <section>
        <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-4">
          Tire-supplier eras
        </h2>
        <ol className="space-y-2">
          {tireEras.map((era) => (
            <li
              key={`${era.startYear}-${era.endYear}`}
              className="grid grid-cols-12 gap-3 py-2 border-b border-zinc-100 dark:border-zinc-900 text-sm"
            >
              <span className="col-span-2 font-mono text-zinc-500 tabular-nums">
                {era.startYear}–{era.endYear === 2030 ? "now" : era.endYear}
              </span>
              <span className="col-span-3 font-medium">
                {era.monoSupplier ?? era.suppliers.join(", ")}
                {era.monoSupplier ? " (mono)" : ""}
              </span>
              <span className="col-span-7 text-zinc-600 dark:text-zinc-400">{era.notes}</span>
            </li>
          ))}
        </ol>
      </section>

      <p className="mt-12 text-xs text-zinc-500">
        Sources: <Link className="underline" href="https://www.fia.com/sites/default/files/documents/fia_2025_formula_1_technical_regulations_-_issue_03_-_2025-04-07.pdf">FIA 2025 Technical Regulations</Link>{" "}·{" "}
        <Link className="underline" href="https://www.formula1.com/en/latest/article/from-smaller-cars-to-a-bigger-budget-cap-12-rule-changes-you-need-to-know-in.56uUTFhB0z5j3iZfhC0rGP">Formula1.com 2026 rule changes</Link>
      </p>
    </main>
  );
}

function BinaryRow({ label, a, b }: { label: string; a: boolean; b: boolean }) {
  return (
    <tr className="border-b border-zinc-100 dark:border-zinc-900">
      <td className="py-3 pr-4 font-medium">{label}</td>
      <td className="py-3 px-3 text-right">{a ? "yes" : "no"}</td>
      <td className="py-3 px-3 text-right">{b ? "yes" : "no"}</td>
      <td className="py-3 pl-3 text-right text-xs font-mono text-zinc-600 dark:text-zinc-400">
        {a !== b ? (a ? "removed" : "added") : null}
      </td>
    </tr>
  );
}

function BudgetCard({
  label,
  current,
  incoming,
  description,
}: {
  label: string;
  current: number;
  incoming: number;
  description: string;
}) {
  const delta = incoming - current;
  return (
    <div className="rounded border border-zinc-200 dark:border-zinc-800 p-5">
      <p className="text-xs uppercase tracking-wider text-zinc-500">{label}</p>
      <div className="mt-2 flex items-baseline gap-3">
        <p className="text-2xl font-medium tabular-nums">${current}M</p>
        <p className="text-zinc-400">→</p>
        <p className="text-2xl font-medium tabular-nums">${incoming}M</p>
        <p className={`text-sm font-mono ${delta > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
          {delta > 0 ? "+" : ""}${delta}M
        </p>
      </div>
      <p className="mt-3 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{description}</p>
    </div>
  );
}
