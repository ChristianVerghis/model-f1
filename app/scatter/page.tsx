import { cars } from "@/data/cars";
import { ScatterView, type ScatterPoint } from "./scatter-chart";

export default function ScatterPage() {
  const points: ScatterPoint[] = cars.map((c) => ({
    id: c.id,
    year: c.year,
    label: `${c.constructor} ${c.chassis}`,
    era: c.aeroEra,
    powerHp: c.enginePowerHp,
    weightKg: c.weightKg,
    powerToWeight: +(c.enginePowerHp / c.weightKg).toFixed(3),
    maxRpm: c.maxRpm,
  }));

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 w-full">
      <header className="mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Scatter</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Every car, one dot, switchable metric.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          Hover for the car name. The ranked list below updates with the selected metric —
          click any row to open that car&apos;s detail page.
        </p>
      </header>

      <ScatterView points={points} />
    </main>
  );
}
