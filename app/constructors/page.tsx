import Link from "next/link";
import { uniqueConstructors } from "@/lib/constructors";
import { cars } from "@/data/cars";

export default function ConstructorsIndexPage() {
  const constructors = uniqueConstructors();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 w-full">
      <header className="mb-10 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Constructors</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Trajectories across decades.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          Every car from a single constructor told as one chronological story —
          how the same name produced an aluminum-honeycomb DFV runner and a 1000 hp
          hybrid ground-effect car forty years apart.
        </p>
      </header>

      <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {constructors.map((c) => {
          const years = cars
            .filter((car) => car.constructor === c.name)
            .map((car) => car.year)
            .sort((a, b) => a - b);
          const span = years.length > 1 ? `${years[0]} – ${years.at(-1)}` : `${years[0]}`;
          return (
            <li key={c.slug}>
              <Link
                href={`/constructors/${c.slug}`}
                className="block py-4 px-4 rounded border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
              >
                <div className="flex items-baseline justify-between">
                  <p className="font-medium">{c.name}</p>
                  <span className="text-xs font-mono tabular-nums text-zinc-500">
                    {c.count} car{c.count === 1 ? "" : "s"}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-1 font-mono">{span}</p>
              </Link>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
