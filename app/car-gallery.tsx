"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Car } from "@/data/cars";
import type { AeroEraSpan } from "@/data/regulations";

const eraColor: Record<string, string> = {
  "pre-ground-effect": "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  "ground-effect-skirts": "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
  "flat-bottom": "bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-200",
  "stepped-floor": "bg-pink-100 text-pink-900 dark:bg-pink-950 dark:text-pink-200",
  "blown-diffuser": "bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-200",
  "hybrid-v6": "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200",
  "ground-effect-return": "bg-cyan-100 text-cyan-900 dark:bg-cyan-950 dark:text-cyan-200",
};

type Props = {
  cars: Car[];
  eras: AeroEraSpan[];
  constructors: string[];
};

export function CarGallery({ cars, eras, constructors }: Props) {
  const [query, setQuery] = useState("");
  const [era, setEra] = useState<string>("");
  const [constructor, setConstructor] = useState<string>("");
  const [hybridOnly, setHybridOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cars.filter((c) => {
      if (era && c.aeroEra !== era) return false;
      if (constructor && c.constructor !== constructor) return false;
      if (hybridOnly && !c.hybrid) return false;
      if (q) {
        const hay = `${c.year} ${c.constructor} ${c.chassis} ${c.engine} ${c.notable}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [cars, query, era, constructor, hybridOnly]);

  const eraLabel = (key: string) =>
    eras.find((e) => e.era === key)?.label ?? key.replace(/-/g, " ");

  const clearAll = () => {
    setQuery("");
    setEra("");
    setConstructor("");
    setHybridOnly(false);
  };
  const anyActive = query !== "" || era !== "" || constructor !== "" || hybridOnly;

  return (
    <section>
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-12 gap-3">
        <input
          type="search"
          placeholder="Search constructor, chassis, engine, notes…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="sm:col-span-5 px-3 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded focus:outline-none focus:border-zinc-500"
        />
        <select
          value={era}
          onChange={(e) => setEra(e.target.value)}
          className="sm:col-span-3 px-3 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded focus:outline-none focus:border-zinc-500"
        >
          <option value="">All eras</option>
          {eras.map((e) => (
            <option key={e.era} value={e.era}>
              {e.label}
            </option>
          ))}
        </select>
        <select
          value={constructor}
          onChange={(e) => setConstructor(e.target.value)}
          className="sm:col-span-3 px-3 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded focus:outline-none focus:border-zinc-500"
        >
          <option value="">All constructors</option>
          {constructors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <label className="sm:col-span-1 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={hybridOnly}
            onChange={(e) => setHybridOnly(e.target.checked)}
            className="accent-zinc-900 dark:accent-zinc-100"
          />
          Hybrid
        </label>
      </div>

      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
          {filtered.length} of {cars.length} car{cars.length === 1 ? "" : "s"}
          {anyActive ? " · click any row for details" : " · click any row for details"}
        </h2>
        {anyActive ? (
          <button
            onClick={clearAll}
            className="text-xs uppercase tracking-wider text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            clear filters
          </button>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-zinc-500">
          No cars match these filters.
        </p>
      ) : (
        <ol className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {filtered.map((car) => (
            <li key={car.id}>
              <Link
                href={`/cars/${car.id}`}
                className="block py-5 grid grid-cols-12 gap-4 items-baseline hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60 -mx-3 px-3 rounded transition-colors"
              >
                <span className="col-span-2 font-mono text-sm text-zinc-500">{car.year}</span>
                <div className="col-span-4">
                  <p className="font-medium">
                    {car.constructor} {car.chassis}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">{car.engine}</p>
                </div>
                <div className="col-span-2 text-sm tabular-nums">
                  <span className="text-zinc-500">hp</span> {car.enginePowerHp}
                </div>
                <div className="col-span-2 text-sm tabular-nums">
                  <span className="text-zinc-500">kg</span> {car.weightKg}
                </div>
                <div className="col-span-2 text-right">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${eraColor[car.aeroEra] ?? ""}`}
                  >
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
      )}
    </section>
  );
}
