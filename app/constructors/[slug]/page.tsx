import Link from "next/link";
import { notFound } from "next/navigation";
import { carsByConstructorSlug, uniqueConstructors } from "@/lib/constructors";
import { aeroEraSpans } from "@/data/regulations";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return uniqueConstructors().map((c) => ({ slug: c.slug }));
}

const eraColor: Record<string, string> = {
  "pre-ground-effect": "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  "ground-effect-skirts": "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
  "flat-bottom": "bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-200",
  "stepped-floor": "bg-pink-100 text-pink-900 dark:bg-pink-950 dark:text-pink-200",
  "blown-diffuser": "bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-200",
  "hybrid-v6": "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200",
  "ground-effect-return": "bg-cyan-100 text-cyan-900 dark:bg-cyan-950 dark:text-cyan-200",
};

function eraLabel(era: string): string {
  return aeroEraSpans.find((s) => s.era === era)?.label ?? era.replace(/-/g, " ");
}

export default async function ConstructorPage({ params }: { params: Params }) {
  const { slug } = await params;
  const result = carsByConstructorSlug(slug);
  if (!result) notFound();
  const { name, cars: list } = result;

  const yearSpan = list.length > 1 ? `${list[0].year} – ${list.at(-1)!.year}` : `${list[0].year}`;
  const yearGap = list.length > 1 ? list.at(-1)!.year - list[0].year : 0;
  const powerSpan = `${Math.min(...list.map((c) => c.enginePowerHp))} – ${Math.max(...list.map((c) => c.enginePowerHp))} hp`;
  const erasTouched = new Set(list.map((c) => c.aeroEra));

  return (
    <main className="mx-auto max-w-4xl px-6 py-16 w-full">
      <Link href="/constructors" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
        ← all constructors
      </Link>

      <header className="mt-6 pb-8 border-b border-zinc-200 dark:border-zinc-800">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">{yearSpan}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{name}</h1>
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <Stat label="Cars in dataset" value={String(list.length)} />
          <Stat label="Year span" value={yearGap > 0 ? `${yearGap} years` : "—"} />
          <Stat label="Power range" value={powerSpan} />
          <Stat label="Aero eras touched" value={String(erasTouched.size)} />
        </div>
      </header>

      <section className="mt-10">
        <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-4">
          Chronological trajectory
        </h2>
        <ol className="relative border-l border-zinc-200 dark:border-zinc-800 ml-3">
          {list.map((car) => (
            <li key={car.id} className="mb-8 ml-6">
              <span className="absolute -left-1.5 w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <Link
                href={`/cars/${car.id}`}
                className="block group"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs text-zinc-500">{car.year}</p>
                    <p className="mt-1 text-lg font-medium group-hover:underline">{car.chassis}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{car.engine}</p>
                  </div>
                  <span className={`shrink-0 inline-block rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${eraColor[car.aeroEra] ?? ""}`}>
                    {eraLabel(car.aeroEra)}
                  </span>
                </div>
                <div className="mt-2 flex gap-4 text-xs text-zinc-500 tabular-nums">
                  <span><span className="text-zinc-400">hp</span> {car.enginePowerHp}</span>
                  <span><span className="text-zinc-400">kg</span> {car.weightKg}</span>
                  <span><span className="text-zinc-400">P:W</span> {(car.enginePowerHp / car.weightKg).toFixed(2)}</span>
                </div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{car.notable}</p>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-zinc-500">{label}</p>
      <p className="mt-1 text-sm font-medium tabular-nums">{value}</p>
    </div>
  );
}
