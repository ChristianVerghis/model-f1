import { cars } from "@/data/cars";

export default function Home() {
  const sorted = [...cars].sort((a, b) => a.year - b.year);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
      <main className="mx-auto max-w-5xl px-6 py-16">
        <header className="mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">model-f1</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Fifty years of Formula 1, by the numbers.
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
            A growing dataset of era-defining F1 cars. Track how aerodynamics, powertrain,
            and chassis design have evolved from skirted ground-effect to today&apos;s 1000+ hp
            hybrid era.
          </p>
        </header>

        <section>
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-4">
            Seed dataset · {sorted.length} cars
          </h2>
          <ol className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {sorted.map((car) => (
              <li key={car.id} className="py-5 grid grid-cols-12 gap-4 items-baseline">
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
                  <span className="inline-block rounded-full bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 text-[10px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    {car.aeroEra.replace(/-/g, " ")}
                  </span>
                </div>
                <p className="col-span-12 text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  {car.notable}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <footer className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500">
          Next: compare view · timeline charts · regulation overlay
        </footer>
      </main>
    </div>
  );
}
