import Link from "next/link";
import { cars, getCarById, type Car } from "@/data/cars";

type SearchParams = Promise<{ a?: string; b?: string }>;

type Row = {
  label: string;
  get: (car: Car) => string | number | boolean | undefined;
  numeric?: boolean;
  unit?: string;
};

const rows: Row[] = [
  { label: "Year", get: (c) => c.year, numeric: true },
  { label: "Constructor", get: (c) => c.constructor },
  { label: "Chassis", get: (c) => c.chassis },
  { label: "Engine", get: (c) => c.engine },
  { label: "Aero era", get: (c) => c.aeroEra.replace(/-/g, " ") },
  { label: "Engine power", get: (c) => c.enginePowerHp, numeric: true, unit: "hp" },
  { label: "Weight (min)", get: (c) => c.weightKg, numeric: true, unit: "kg" },
  { label: "Power-to-weight", get: (c) => +(c.enginePowerHp / c.weightKg).toFixed(2), numeric: true, unit: "hp/kg" },
  { label: "Max RPM", get: (c) => c.maxRpm, numeric: true, unit: "rpm" },
  { label: "Monocoque", get: (c) => c.monocoque?.replace(/-/g, " ") },
  { label: "Hybrid", get: (c) => c.hybrid },
  { label: "ERS (full)", get: (c) => c.ers },
  { label: "KERS", get: (c) => c.kers },
  { label: "MGU-K power", get: (c) => c.mguKPowerKW, numeric: true, unit: "kW" },
  { label: "Battery deployment", get: (c) => c.batteryDeploymentMJ, numeric: true, unit: "MJ/lap" },
  { label: "Fuel flow limit", get: (c) => c.fuelFlowKgH, numeric: true, unit: "kg/h" },
  { label: "Active suspension", get: (c) => c.activeSuspension },
  { label: "Traction control", get: (c) => c.tractionControl },
  { label: "Semi-auto gearbox", get: (c) => c.semiAutoGearbox },
  { label: "Launch control", get: (c) => c.launchControl },
];

function fmt(v: string | number | boolean | undefined): string {
  if (v === undefined) return "—";
  if (typeof v === "boolean") return v ? "yes" : "no";
  return String(v);
}

function delta(a: number | undefined, b: number | undefined): string | null {
  if (a === undefined || b === undefined) return null;
  const d = b - a;
  if (d === 0) return null;
  const sign = d > 0 ? "+" : "";
  return `${sign}${+d.toFixed(2)}`;
}

export default async function ComparePage({ searchParams }: { searchParams: SearchParams }) {
  const { a, b } = await searchParams;
  const carA = a ? getCarById(a) : undefined;
  const carB = b ? getCarById(b) : undefined;

  if (!carA || !carB) {
    return <CarPicker selectedA={a} selectedB={b} />;
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 w-full">
      <header className="mb-10 flex items-start justify-between border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Compare</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            {carA.constructor} {carA.chassis} <span className="text-zinc-400">vs</span> {carB.constructor} {carB.chassis}
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            {carA.year} → {carB.year} · {carB.year - carA.year} year span
          </p>
        </div>
        <Link href="/compare" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
          ← change cars
        </Link>
      </header>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-800 text-xs uppercase tracking-wider text-zinc-500">
            <th className="text-left py-3 font-medium w-1/4">Spec</th>
            <th className="text-left py-3 font-medium">{carA.chassis} ({carA.year})</th>
            <th className="text-left py-3 font-medium">{carB.chassis} ({carB.year})</th>
            <th className="text-right py-3 font-medium w-24">Δ</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const valA = row.get(carA);
            const valB = row.get(carB);
            const isNumericDelta = row.numeric && typeof valA === "number" && typeof valB === "number";
            const d = isNumericDelta ? delta(valA, valB) : null;
            const changed = fmt(valA) !== fmt(valB);
            return (
              <tr
                key={row.label}
                className={`border-b border-zinc-100 dark:border-zinc-900 ${
                  changed ? "" : "opacity-60"
                }`}
              >
                <td className="py-3 text-sm text-zinc-500">{row.label}</td>
                <td className="py-3 text-sm tabular-nums">
                  {fmt(valA)}
                  {row.unit && valA !== undefined ? <span className="text-zinc-500 ml-1">{row.unit}</span> : null}
                </td>
                <td className="py-3 text-sm tabular-nums">
                  {fmt(valB)}
                  {row.unit && valB !== undefined ? <span className="text-zinc-500 ml-1">{row.unit}</span> : null}
                </td>
                <td className="py-3 text-right text-sm tabular-nums font-mono">
                  {d ? <span className={d.startsWith("+") ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>{d}</span> : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-12 grid grid-cols-2 gap-8">
        <div>
          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">{carA.chassis} notable</p>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">{carA.notable}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">{carB.chassis} notable</p>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">{carB.notable}</p>
        </div>
      </div>
    </main>
  );
}

function CarPicker({ selectedA, selectedB }: { selectedA?: string; selectedB?: string }) {
  const sorted = [...cars].sort((a, b) => a.year - b.year);
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 w-full">
      <header className="mb-10 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Compare</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Pick two cars</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Click one car under <b>A</b>, then one under <b>B</b>. The URL drives the comparison so you can share it.
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
                {sorted.map((car) => {
                  const href = `/compare?${slot}=${car.id}${otherValue ? `&${otherSlot}=${otherValue}` : ""}`;
                  const current = slot === "a" ? selectedA === car.id : selectedB === car.id;
                  return (
                    <li key={car.id}>
                      <Link
                        href={href}
                        className={`block px-3 py-2 rounded text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 ${
                          current ? "bg-zinc-200 dark:bg-zinc-800 font-medium" : ""
                        }`}
                      >
                        <span className="font-mono text-zinc-500 mr-2">{car.year}</span>
                        {car.constructor} {car.chassis}
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
