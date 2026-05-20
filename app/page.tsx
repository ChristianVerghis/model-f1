import Link from "next/link";
import { cars } from "@/data/cars";
import { aeroEraSpans } from "@/data/regulations";

const eraColor: Record<string, string> = {
  "pre-ground-effect": "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  "ground-effect-skirts": "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
  "flat-bottom": "bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-200",
  "stepped-floor": "bg-pink-100 text-pink-900 dark:bg-pink-950 dark:text-pink-200",
  "high-downforce-v10": "bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200",
  "blown-diffuser": "bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-200",
  "hybrid-v6": "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200",
  "ground-effect-return": "bg-cyan-100 text-cyan-900 dark:bg-cyan-950 dark:text-cyan-200",
};

function eraLabel(era: string): string {
  return aeroEraSpans.find((s) => s.era === era)?.label ?? era.replace(/-/g, " ");
}

export default function Home() {
  const sorted = [...cars].sort((a, b) => a.year - b.year);

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 w-full">
      <header className="mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">model-f1</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Sixty years of Formula 1, by the numbers.
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
          A growing dataset of era-defining F1 cars. Track how aerodynamics, powertrain,
          and chassis design have evolved from the Cosworth DFV era to today&apos;s 1000+ hp
          hybrid ground-effect machines.
        </p>
      </header>

      <section>
        <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-4">
          {sorted.length} cars · click any row for details
        </h2>
        <ol className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {sorted.map((car) => (
            <li key={car.id}>
              <Link
                href={`/cars/${car.id}`}
                className="block py-5 grid grid-cols-12 gap-4 items-baseline hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60 -mx-3 px-3 rounded transition-colors"
              >
                <span className="col-span-2 font-mono text-sm text-zinc-500">{car.year}</span>
                <div className="col-span-4">
                  <p className="font-medium">{car.constructor} {car.chassis}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{car.engine}</p>
                </div>
                <div className="col-span-2 text-sm tabular-nums">
                  <span className="text-zinc-500">hp</span> {car.enginePowerHp}
                </div>
                <div className="col-span-2 text-sm tabular-nums">
                  <span className="text-zinc-500">kg</span> {car.weightKg}
                </div>
                <div className="col-span-2 text-right">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${eraColor[car.aeroEra] ?? ""}`}>
                    {eraLabel(car.aeroEra)}
                  </span>
                </div>
                <p className="col-span-12 text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  {car.notable}
                </p>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
