import Link from "next/link";
import { cars } from "@/data/cars";
import { aeroEraSpans } from "@/data/regulations";

const eraColor: Record<string, string> = {
  "pre-ground-effect": "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  "ground-effect-skirts": "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
  "flat-bottom": "bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-200",
  "stepped-floor": "bg-pink-100 text-pink-900 dark:bg-pink-950 dark:text-pink-200",
  "blown-diffuser": "bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-200",
  "hybrid-v6": "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200",
  "ground-effect-return": "bg-cyan-100 text-cyan-900 dark:bg-cyan-950 dark:text-cyan-200",
};

export default function ErasIndexPage() {
  const sorted = [...aeroEraSpans].sort((a, b) => a.startYear - b.startYear);

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 w-full">
      <header className="mb-10 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="flex items-baseline justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Eras</p>
          <Link
            href="/eras/compare"
            className="text-xs uppercase tracking-wider text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            compare two eras →
          </Link>
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Seven distinct aerodynamic eras.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          The story of F1 design can be told as a sequence of philosophies the FIA permitted,
          then closed off. Each era has its own dominant team and characteristic engineering trick.
        </p>
      </header>

      <ol className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {sorted.map((span) => {
          const carCount = cars.filter((c) => c.aeroEra === span.era).length;
          return (
            <li key={span.era}>
              <Link
                href={`/eras/${span.era}`}
                className="block py-6 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60 -mx-3 px-3 rounded transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${eraColor[span.era] ?? ""}`}>
                    {span.label}
                  </span>
                  <p className="text-xs font-mono text-zinc-500">
                    {span.startYear}–{span.endYear}
                  </p>
                  <p className="text-xs text-zinc-500">· {carCount} car{carCount === 1 ? "" : "s"}</p>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                  {span.description}
                </p>
              </Link>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
