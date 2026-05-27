import Link from "next/link";
import { aeroEraSpans } from "@/data/regulations";
import { eraStats, type EraStats } from "@/lib/era-stats";

type SearchParams = Promise<{ a?: string; b?: string }>;

const eraColor: Record<string, string> = {
  "pre-ground-effect": "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  "ground-effect-skirts": "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
  "flat-bottom": "bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-200",
  "stepped-floor": "bg-pink-100 text-pink-900 dark:bg-pink-950 dark:text-pink-200",
  "blown-diffuser": "bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-200",
  "hybrid-v6": "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200",
  "ground-effect-return": "bg-cyan-100 text-cyan-900 dark:bg-cyan-950 dark:text-cyan-200",
};

function pct(x: number): string {
  return `${Math.round(x * 100)}%`;
}

function formatDelta(a: number | null, b: number | null, unit: string, fractionDigits = 0): string | null {
  if (a === null || b === null) return null;
  const d = b - a;
  if (d === 0) return null;
  const formatted = fractionDigits > 0 ? d.toFixed(fractionDigits) : d.toFixed(0);
  const sign = d > 0 ? "+" : "";
  return `${sign}${formatted} ${unit}`;
}

type Row = {
  label: string;
  a: string;
  b: string;
  delta: string | null;
  deltaPositive?: boolean;
};

function buildRows(a: EraStats, b: EraStats): Row[] {
  return [
    {
      label: "Year span",
      a: `${a.span.startYear}–${a.span.endYear}`,
      b: `${b.span.startYear}–${b.span.endYear}`,
      delta: null,
    },
    {
      label: "Cars in dataset",
      a: String(a.cars.length),
      b: String(b.cars.length),
      delta: formatDelta(a.cars.length, b.cars.length, "cars"),
      deltaPositive: b.cars.length > a.cars.length,
    },
    {
      label: "Avg power",
      a: `${a.avgPowerHp} hp`,
      b: `${b.avgPowerHp} hp`,
      delta: formatDelta(a.avgPowerHp, b.avgPowerHp, "hp"),
      deltaPositive: b.avgPowerHp > a.avgPowerHp,
    },
    {
      label: "Avg weight",
      a: `${a.avgWeightKg} kg`,
      b: `${b.avgWeightKg} kg`,
      delta: formatDelta(a.avgWeightKg, b.avgWeightKg, "kg"),
      deltaPositive: b.avgWeightKg < a.avgWeightKg,
    },
    {
      label: "Avg power-to-weight",
      a: `${a.avgPowerToWeight.toFixed(2)} hp/kg`,
      b: `${b.avgPowerToWeight.toFixed(2)} hp/kg`,
      delta: formatDelta(a.avgPowerToWeight, b.avgPowerToWeight, "hp/kg", 2),
      deltaPositive: b.avgPowerToWeight > a.avgPowerToWeight,
    },
    {
      label: "Avg power per liter",
      a: a.avgPowerPerLiter !== null ? `${a.avgPowerPerLiter.toFixed(0)} hp/L` : "—",
      b: b.avgPowerPerLiter !== null ? `${b.avgPowerPerLiter.toFixed(0)} hp/L` : "—",
      delta: formatDelta(a.avgPowerPerLiter, b.avgPowerPerLiter, "hp/L"),
      deltaPositive: (b.avgPowerPerLiter ?? 0) > (a.avgPowerPerLiter ?? 0),
    },
    {
      label: "Hybrid share",
      a: pct(a.hybridShare),
      b: pct(b.hybridShare),
      delta: a.hybridShare !== b.hybridShare ? `${b.hybridShare > a.hybridShare ? "+" : ""}${Math.round((b.hybridShare - a.hybridShare) * 100)} pts` : null,
      deltaPositive: b.hybridShare > a.hybridShare,
    },
    {
      label: "Carbon-fiber tub",
      a: pct(a.carbonFiberShare),
      b: pct(b.carbonFiberShare),
      delta: a.carbonFiberShare !== b.carbonFiberShare ? `${b.carbonFiberShare > a.carbonFiberShare ? "+" : ""}${Math.round((b.carbonFiberShare - a.carbonFiberShare) * 100)} pts` : null,
      deltaPositive: b.carbonFiberShare > a.carbonFiberShare,
    },
    {
      label: "Full ERS",
      a: pct(a.ersShare),
      b: pct(b.ersShare),
      delta: a.ersShare !== b.ersShare ? `${b.ersShare > a.ersShare ? "+" : ""}${Math.round((b.ersShare - a.ersShare) * 100)} pts` : null,
      deltaPositive: b.ersShare > a.ersShare,
    },
    {
      label: "Top constructor",
      a: a.topConstructor ? `${a.topConstructor.name} (${a.topConstructor.count})` : "—",
      b: b.topConstructor ? `${b.topConstructor.name} (${b.topConstructor.count})` : "—",
      delta: null,
    },
    {
      label: "Unique constructors",
      a: String(a.uniqueConstructors),
      b: String(b.uniqueConstructors),
      delta: formatDelta(a.uniqueConstructors, b.uniqueConstructors, ""),
      deltaPositive: b.uniqueConstructors > a.uniqueConstructors,
    },
  ];
}

export default async function EraComparePage({ searchParams }: { searchParams: SearchParams }) {
  const { a, b } = await searchParams;
  const statsA = a ? eraStats(a) : null;
  const statsB = b ? eraStats(b) : null;

  if (!statsA || !statsB) {
    return <EraPicker selectedA={a} selectedB={b} />;
  }

  const rows = buildRows(statsA, statsB);

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 w-full">
      <header className="mb-10 flex items-start justify-between border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Era compare</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            {statsA.span.label} <span className="text-zinc-400">vs</span> {statsB.span.label}
          </h1>
          <p className="mt-2 text-sm text-zinc-500 font-mono">
            {statsA.span.startYear}–{statsA.span.endYear} → {statsB.span.startYear}–{statsB.span.endYear} ·{" "}
            {statsB.span.startYear - statsA.span.startYear} years apart
          </p>
        </div>
        <Link href="/eras/compare" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 shrink-0">
          ← change eras
        </Link>
      </header>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-800 text-xs uppercase tracking-wider text-zinc-500">
            <th className="text-left py-3 font-medium w-1/4">Metric</th>
            <th className="text-left py-3 font-medium">
              <Link href={`/eras/${statsA.span.era}`} className="hover:underline">
                {statsA.span.label}
              </Link>
            </th>
            <th className="text-left py-3 font-medium">
              <Link href={`/eras/${statsB.span.era}`} className="hover:underline">
                {statsB.span.label}
              </Link>
            </th>
            <th className="text-right py-3 font-medium w-28">Δ</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className={`border-b border-zinc-100 dark:border-zinc-900 ${row.delta || row.a !== row.b ? "" : "opacity-60"}`}
            >
              <td className="py-3 text-sm text-zinc-500">{row.label}</td>
              <td className="py-3 text-sm tabular-nums">{row.a}</td>
              <td className="py-3 text-sm tabular-nums">{row.b}</td>
              <td className="py-3 text-right text-sm tabular-nums font-mono">
                {row.delta ? (
                  <span
                    className={
                      row.deltaPositive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400"
                    }
                  >
                    {row.delta}
                  </span>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-12 grid sm:grid-cols-2 gap-8">
        <section>
          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">{statsA.span.label} narrative</p>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{statsA.span.description}</p>
        </section>
        <section>
          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">{statsB.span.label} narrative</p>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{statsB.span.description}</p>
        </section>
      </div>
    </main>
  );
}

function EraPicker({ selectedA, selectedB }: { selectedA?: string; selectedB?: string }) {
  const sorted = [...aeroEraSpans].sort((a, b) => a.startYear - b.startYear);
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 w-full">
      <header className="mb-10 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Era compare</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Pick two eras</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Click one era under <b>A</b>, then one under <b>B</b>. The URL drives the comparison so you can share it.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-10">
        {(["a", "b"] as const).map((slot) => {
          const otherSlot = slot === "a" ? "b" : "a";
          const otherValue = slot === "a" ? selectedB : selectedA;
          return (
            <div key={slot}>
              <p className="text-xs uppercase tracking-wider text-zinc-500 mb-3">
                {slot.toUpperCase()} {slot === "a" ? selectedA && `· ${selectedA}` : selectedB && `· ${selectedB}`}
              </p>
              <ul className="space-y-1">
                {sorted.map((span) => {
                  const href = `/eras/compare?${slot}=${span.era}${otherValue ? `&${otherSlot}=${otherValue}` : ""}`;
                  const current = slot === "a" ? selectedA === span.era : selectedB === span.era;
                  return (
                    <li key={span.era}>
                      <Link
                        href={href}
                        className={`block px-3 py-2 rounded text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 flex items-center gap-2 ${
                          current ? "bg-zinc-200 dark:bg-zinc-800 font-medium" : ""
                        }`}
                      >
                        <span
                          className={`inline-block rounded-full px-1.5 py-0 text-[9px] uppercase tracking-wider ${eraColor[span.era] ?? ""}`}
                        >
                          {span.startYear}
                        </span>
                        {span.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </main>
  );
}
