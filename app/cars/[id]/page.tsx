import Link from "next/link";
import { notFound } from "next/navigation";
import { cars, getCarById, type Car } from "@/data/cars";
import { aeroEraSpans, regulations } from "@/data/regulations";
import { getResults } from "@/data/results";
import { carRankInEra } from "@/lib/era-stats";
import { InEraRanks } from "./in-era-ranks";

type Params = Promise<{ id: string }>;

export function generateStaticParams() {
  return cars.map((c) => ({ id: c.id }));
}

function fmt(value: string | number | boolean | undefined): string {
  if (value === undefined) return "—";
  if (typeof value === "boolean") return value ? "yes" : "no";
  return String(value);
}

function StatBlock({ label, value, unit }: { label: string; value: string | number | undefined; unit?: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-medium tabular-nums">
        {fmt(value)}
        {unit && value !== undefined ? <span className="text-base text-zinc-500 ml-1">{unit}</span> : null}
      </p>
    </div>
  );
}

function SpecRow({ label, value, unit }: { label: string; value: string | number | boolean | undefined; unit?: string }) {
  if (value === undefined) return null;
  return (
    <div className="grid grid-cols-12 gap-4 py-2 border-b border-zinc-100 dark:border-zinc-900">
      <span className="col-span-5 text-sm text-zinc-500">{label}</span>
      <span className="col-span-7 text-sm tabular-nums">
        {fmt(value)}
        {unit ? <span className="text-zinc-500 ml-1">{unit}</span> : null}
      </span>
    </div>
  );
}

function neighbors(car: Car): { prev?: Car; next?: Car } {
  const sorted = [...cars].sort((a, b) => a.year - b.year);
  const idx = sorted.findIndex((c) => c.id === car.id);
  return { prev: sorted[idx - 1], next: sorted[idx + 1] };
}

function eraLabel(era: string): string {
  return aeroEraSpans.find((s) => s.era === era)?.label ?? era.replace(/-/g, " ");
}

export default async function CarPage({ params }: { params: Params }) {
  const { id } = await params;
  const car = getCarById(id);
  if (!car) notFound();

  const { prev, next } = neighbors(car);
  const era = aeroEraSpans.find((s) => s.era === car.aeroEra);
  const eraRegs = regulations.filter(
    (r) => era && r.year >= era.startYear && r.year <= era.endYear,
  );
  const inEra = carRankInEra(car);
  const results = getResults(car.id);

  const powerToWeight = +(car.enginePowerHp / car.weightKg).toFixed(3);

  return (
    <main className="mx-auto max-w-4xl px-6 py-16 w-full">
      <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
        ← all cars
      </Link>

      <header className="mt-6 pb-8 border-b border-zinc-200 dark:border-zinc-800">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">
          {car.year} · {eraLabel(car.aeroEra)}
        </p>
        <div className="mt-3 flex flex-wrap items-baseline gap-3">
          <h1 className="text-4xl font-semibold tracking-tight">
            {car.constructor} {car.chassis}
          </h1>
          {results.wonDrivers || results.wonConstructors || results.wins ? (
            <div className="flex flex-wrap gap-2">
              {results.wonDrivers ? (
                <span className="inline-block rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wider bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
                  Drivers&apos; title
                </span>
              ) : null}
              {results.wonConstructors ? (
                <span className="inline-block rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wider bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
                  Constructors&apos; title
                </span>
              ) : null}
              {results.wins ? (
                <span className="inline-block rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wider bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 tabular-nums">
                  {results.wins} wins
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
        <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400 italic">{car.notable}</p>
      </header>

      <section className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-b border-zinc-200 dark:border-zinc-800">
        <StatBlock label="Power" value={car.enginePowerHp} unit="hp" />
        <StatBlock label="Weight" value={car.weightKg} unit="kg" />
        <StatBlock label="Power-to-weight" value={powerToWeight} unit="hp/kg" />
        <StatBlock label="Max RPM" value={car.maxRpm} unit="rpm" />
      </section>

      <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8 mt-8">
        <section>
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-2">Powertrain</h2>
          <SpecRow label="Engine" value={car.engine} />
          <SpecRow label="Hybrid" value={car.hybrid} />
          <SpecRow label="ERS (full hybrid)" value={car.ers} />
          <SpecRow label="KERS" value={car.kers} />
          <SpecRow label="MGU-K power" value={car.mguKPowerKW} unit="kW" />
          <SpecRow label="Battery deployment" value={car.batteryDeploymentMJ} unit="MJ/lap" />
          <SpecRow label="Fuel flow limit" value={car.fuelFlowKgH} unit="kg/h" />
        </section>

        <section>
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-2">Chassis</h2>
          <SpecRow label="Monocoque" value={car.monocoque?.replace(/-/g, " ")} />
          <SpecRow label="Wheelbase" value={car.wheelbaseMm} unit="mm" />
          <SpecRow label="Fuel tank" value={car.fuelTankL} unit="L" />
        </section>

        <section>
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-2">Electronics</h2>
          <SpecRow label="Active suspension" value={car.activeSuspension} />
          <SpecRow label="Traction control" value={car.tractionControl} />
          <SpecRow label="Semi-auto gearbox" value={car.semiAutoGearbox} />
          <SpecRow label="Launch control" value={car.launchControl} />
        </section>

        <section>
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-2">Era context</h2>
          {era ? (
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
              {era.label} era: {era.startYear}–{era.endYear}
            </p>
          ) : null}
          {eraRegs.length > 0 ? (
            <ul className="space-y-2">
              {eraRegs.map((r) => (
                <li key={r.year + r.title} className="text-sm">
                  <span className="font-mono text-zinc-500 mr-2">{r.year}</span>
                  <span className="font-medium">{r.title}</span>
                  <span className="block text-xs text-zinc-500 mt-0.5">{r.description}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-zinc-500">No regulation changes recorded inside this era window.</p>
          )}
        </section>
      </div>

      {inEra && inEra.total > 1 ? (
        <section className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
              Where this car sits in its era
            </h2>
            <Link
              href={`/eras/${inEra.era.era}`}
              className="text-xs uppercase tracking-wider text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              {inEra.era.label} →
            </Link>
          </div>
          <InEraRanks total={inEra.total} ranks={inEra.ranks} />
        </section>
      ) : null}

      <nav className="mt-16 pt-6 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-2 gap-6">
        {prev ? (
          <Link href={`/cars/${prev.id}`} className="group">
            <span className="text-xs uppercase tracking-wider text-zinc-500">← {prev.year}</span>
            <p className="mt-1 text-sm font-medium group-hover:underline">
              {prev.constructor} {prev.chassis}
            </p>
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/cars/${next.id}`} className="group text-right">
            <span className="text-xs uppercase tracking-wider text-zinc-500">{next.year} →</span>
            <p className="mt-1 text-sm font-medium group-hover:underline">
              {next.constructor} {next.chassis}
            </p>
          </Link>
        ) : <span />}
      </nav>
    </main>
  );
}
