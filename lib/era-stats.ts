import { cars, type Car } from "@/data/cars";
import { aeroEraSpans, type AeroEraSpan } from "@/data/regulations";

export type EraStats = {
  span: AeroEraSpan;
  cars: Car[];
  avgPowerHp: number;
  avgWeightKg: number;
  avgPowerToWeight: number;
  avgPowerPerLiter: number | null;
  hybridShare: number;
  carbonFiberShare: number;
  ersShare: number;
  topConstructor: { name: string; count: number } | null;
  uniqueConstructors: number;
};

function mean(xs: number[]): number {
  if (xs.length === 0) return 0;
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}

export function eraStats(era: string): EraStats | null {
  const span = aeroEraSpans.find((s) => s.era === era);
  if (!span) return null;
  const list = cars.filter((c) => c.aeroEra === era);

  const ppl = list
    .filter((c) => c.engineDisplacementL !== undefined)
    .map((c) => c.enginePowerHp / (c.engineDisplacementL as number));

  const constructors = new Map<string, number>();
  for (const c of list) constructors.set(c.constructor, (constructors.get(c.constructor) ?? 0) + 1);
  const top = [...constructors.entries()].sort((a, b) => b[1] - a[1])[0];

  return {
    span,
    cars: list,
    avgPowerHp: Math.round(mean(list.map((c) => c.enginePowerHp))),
    avgWeightKg: Math.round(mean(list.map((c) => c.weightKg))),
    avgPowerToWeight: +mean(list.map((c) => c.enginePowerHp / c.weightKg)).toFixed(3),
    avgPowerPerLiter: ppl.length > 0 ? +mean(ppl).toFixed(1) : null,
    hybridShare: list.length > 0 ? list.filter((c) => c.hybrid).length / list.length : 0,
    carbonFiberShare: list.length > 0 ? list.filter((c) => c.monocoque === "carbon-fiber").length / list.length : 0,
    ersShare: list.length > 0 ? list.filter((c) => c.ers).length / list.length : 0,
    topConstructor: top ? { name: top[0], count: top[1] } : null,
    uniqueConstructors: constructors.size,
  };
}

export function carRankInEra(car: Car): {
  era: AeroEraSpan;
  total: number;
  ranks: { metric: string; value: number; rank: number; min: number; max: number; median: number; unit: string }[];
} | null {
  const span = aeroEraSpans.find((s) => s.era === car.aeroEra);
  if (!span) return null;
  const list = cars.filter((c) => c.aeroEra === car.aeroEra);

  const median = (xs: number[]) => {
    const sorted = [...xs].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  };

  const buildRank = (
    metric: string,
    unit: string,
    valuesOf: (c: Car) => number | undefined,
  ) => {
    const ownValue = valuesOf(car);
    if (ownValue === undefined) return null;
    const values = list
      .map((c) => valuesOf(c))
      .filter((v): v is number => v !== undefined);
    const sortedDesc = [...values].sort((a, b) => b - a);
    const rank = sortedDesc.findIndex((v) => v === ownValue) + 1;
    return {
      metric,
      value: ownValue,
      rank,
      min: Math.min(...values),
      max: Math.max(...values),
      median: +median(values).toFixed(2),
      unit,
    };
  };

  const rows = [
    buildRank("Power", "hp", (c) => c.enginePowerHp),
    buildRank("Weight", "kg", (c) => c.weightKg),
    buildRank("Power-to-weight", "hp/kg", (c) => +(c.enginePowerHp / c.weightKg).toFixed(3)),
    buildRank("Power per liter", "hp/L", (c) =>
      c.engineDisplacementL ? +(c.enginePowerHp / c.engineDisplacementL).toFixed(1) : undefined,
    ),
  ].filter((r): r is NonNullable<typeof r> => r !== null);

  return {
    era: span,
    total: list.length,
    ranks: rows,
  };
}
