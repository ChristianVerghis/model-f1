import { cars, type Car } from "@/data/cars";

export function slugifyConstructor(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function uniqueConstructors(): { name: string; slug: string; count: number }[] {
  const map = new Map<string, number>();
  for (const c of cars) map.set(c.constructor, (map.get(c.constructor) ?? 0) + 1);
  return [...map.entries()]
    .map(([name, count]) => ({ name, slug: slugifyConstructor(name), count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function carsByConstructorSlug(slug: string): { name: string; cars: Car[] } | null {
  const match = uniqueConstructors().find((c) => c.slug === slug);
  if (!match) return null;
  return {
    name: match.name,
    cars: cars.filter((c) => slugifyConstructor(c.constructor) === slug).sort((a, b) => a.year - b.year),
  };
}
