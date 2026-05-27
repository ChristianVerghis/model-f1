import { cars } from "@/data/cars";
import { aeroEraSpans } from "@/data/regulations";
import { CarGallery } from "./car-gallery";

export default function Home() {
  const sorted = [...cars].sort((a, b) => a.year - b.year);
  const constructors = [...new Set(cars.map((c) => c.constructor))].sort();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 w-full">
      <header className="mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">model-f1</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Seventy years of Formula 1, by the numbers.
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
          A growing dataset of era-defining F1 cars, from Fangio&apos;s Mercedes W196 to
          today&apos;s 1000+ hp hybrid ground-effect machines. Filter by era, constructor,
          or hybrid status — or search anywhere in the description.
        </p>
      </header>

      <CarGallery cars={sorted} eras={aeroEraSpans} constructors={constructors} />
    </main>
  );
}
