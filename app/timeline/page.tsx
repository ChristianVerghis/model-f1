import { cars } from "@/data/cars";
import { aeroEraSpans, regulations } from "@/data/regulations";
import { TimelineCharts } from "./charts";

export default function TimelinePage() {
  const data = [...cars]
    .sort((a, b) => a.year - b.year)
    .map((c) => ({
      year: c.year,
      enginePowerHp: c.enginePowerHp,
      weightKg: c.weightKg,
      powerToWeight: +(c.enginePowerHp / c.weightKg).toFixed(3),
      label: `${c.constructor} ${c.chassis}`,
    }));

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 w-full">
      <header className="mb-10 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Timeline</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Power, weight, and efficiency over fifty years.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          Each point is a car from the seed dataset. Shaded regions are aero eras; dashed
          lines mark regulation inflection points.
        </p>
      </header>

      <TimelineCharts data={data} regulations={regulations} aeroEras={aeroEraSpans} />

      <section className="mt-12">
        <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-4">
          Regulation inflection points
        </h2>
        <ol className="space-y-3">
          {regulations.map((r) => (
            <li key={r.year + r.title} className="grid grid-cols-12 gap-4">
              <span className="col-span-1 font-mono text-sm text-zinc-500">{r.year}</span>
              <span className="col-span-2 text-xs uppercase tracking-wider text-zinc-500 self-baseline">
                {r.area}
              </span>
              <div className="col-span-9">
                <p className="text-sm font-medium">{r.title}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">{r.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
