import Link from "next/link";
import { notFound } from "next/navigation";
import { cars } from "@/data/cars";
import { aeroEraSpans, regulations } from "@/data/regulations";

type Params = Promise<{ era: string }>;

export function generateStaticParams() {
  return aeroEraSpans.map((s) => ({ era: s.era }));
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

export default async function EraPage({ params }: { params: Params }) {
  const { era } = await params;
  const span = aeroEraSpans.find((s) => s.era === era);
  if (!span) notFound();

  const eraCars = cars
    .filter((c) => c.aeroEra === era)
    .sort((a, b) => a.year - b.year);

  const eraRegs = regulations.filter(
    (r) => r.year >= span.startYear && r.year <= span.endYear,
  );

  const sortedEras = [...aeroEraSpans].sort((a, b) => a.startYear - b.startYear);
  const idx = sortedEras.findIndex((s) => s.era === era);
  const prev = sortedEras[idx - 1];
  const next = sortedEras[idx + 1];

  return (
    <main className="mx-auto max-w-4xl px-6 py-16 w-full">
      <Link href="/eras" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
        ← all eras
      </Link>

      <header className="mt-6 pb-8 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${eraColor[era] ?? ""}`}>
            {span.label}
          </span>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">
            {span.startYear} – {span.endYear}
          </p>
        </div>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{span.label}</h1>
        <p className="mt-4 max-w-3xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {span.description}
        </p>
      </header>

      <section className="mt-10">
        <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-4">
          Cars in this era · {eraCars.length}
        </h2>
        {eraCars.length === 0 ? (
          <p className="text-sm text-zinc-500">No cars in the dataset for this era yet.</p>
        ) : (
          <ol className="divide-y divide-zinc-100 dark:divide-zinc-900">
            {eraCars.map((car) => (
              <li key={car.id}>
                <Link
                  href={`/cars/${car.id}`}
                  className="block py-4 grid grid-cols-12 gap-4 items-baseline hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60 -mx-3 px-3 rounded transition-colors"
                >
                  <span className="col-span-2 font-mono text-sm text-zinc-500">{car.year}</span>
                  <div className="col-span-7">
                    <p className="font-medium">{car.constructor} {car.chassis}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{car.engine}</p>
                  </div>
                  <div className="col-span-3 text-right text-sm tabular-nums">
                    <span className="text-zinc-500">hp</span> {car.enginePowerHp}{" "}
                    <span className="text-zinc-500 ml-1">kg</span> {car.weightKg}
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-4">
          Regulation changes inside this window · {eraRegs.length}
        </h2>
        {eraRegs.length === 0 ? (
          <p className="text-sm text-zinc-500">No regulation inflection points recorded inside the window.</p>
        ) : (
          <ol className="space-y-3">
            {eraRegs.map((r) => (
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
        )}
      </section>

      <nav className="mt-16 pt-6 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-2 gap-6">
        {prev ? (
          <Link href={`/eras/${prev.era}`} className="group">
            <span className="text-xs uppercase tracking-wider text-zinc-500">← {prev.startYear}–{prev.endYear}</span>
            <p className="mt-1 text-sm font-medium group-hover:underline">{prev.label}</p>
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/eras/${next.era}`} className="group text-right">
            <span className="text-xs uppercase tracking-wider text-zinc-500">{next.startYear}–{next.endYear} →</span>
            <p className="mt-1 text-sm font-medium group-hover:underline">{next.label}</p>
          </Link>
        ) : <span />}
      </nav>
    </main>
  );
}
