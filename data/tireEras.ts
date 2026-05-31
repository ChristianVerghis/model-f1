// Tire-supplier history. F1 has gone through open competition, tire wars, and
// sole-supplier eras. Where multiple suppliers competed, we list the teams that
// ran each supplier in that window; otherwise the supplier was the field's
// mono-supplier for the year.

import type { TireSupplier } from "./cars";

export type TireEra = {
  startYear: number;
  endYear: number;
  suppliers: TireSupplier[];
  monoSupplier?: TireSupplier; // present means everyone ran them
  notes: string;
  // exception map: constructorName -> supplier (overrides monoSupplier for the row)
  exceptions?: Record<string, TireSupplier>;
};

export const tireEras: TireEra[] = [
  {
    startYear: 1950,
    endYear: 1958,
    suppliers: ["Pirelli", "Dunlop", "Firestone"],
    notes: "Multiple road-car-derived suppliers; Pirelli dominant in early Italian dominance.",
  },
  {
    startYear: 1959,
    endYear: 1970,
    suppliers: ["Dunlop", "Firestone", "Goodyear"],
    notes: "Dunlop dominant through the 60s; Firestone and Goodyear arrived mid-decade.",
  },
  {
    startYear: 1971,
    endYear: 1977,
    suppliers: ["Goodyear", "Firestone"],
    notes: "Two-way American war. Firestone withdrew end of 1974, Goodyear took over.",
  },
  {
    startYear: 1978,
    endYear: 1980,
    suppliers: ["Goodyear", "Michelin"],
    notes: "Michelin's first F1 stint with radials — won 1979 with Ferrari.",
  },
  {
    startYear: 1981,
    endYear: 1983,
    suppliers: ["Goodyear", "Michelin", "Pirelli"],
    notes: "Three-way war during the early turbo years.",
  },
  {
    startYear: 1984,
    endYear: 1986,
    suppliers: ["Goodyear", "Pirelli"],
    monoSupplier: "Goodyear",
    notes: "Michelin out; Goodyear largely mono with Pirelli on a handful of teams.",
    exceptions: { Brabham: "Pirelli" },
  },
  {
    startYear: 1987,
    endYear: 1996,
    suppliers: ["Goodyear"],
    monoSupplier: "Goodyear",
    notes: "Goodyear mono era.",
  },
  {
    startYear: 1997,
    endYear: 1998,
    suppliers: ["Goodyear", "Bridgestone"],
    notes: "Bridgestone arrives; Häkkinen wins 1998 on Bridgestones at McLaren.",
    exceptions: { McLaren: "Bridgestone", Prost: "Bridgestone", Stewart: "Bridgestone" },
  },
  {
    startYear: 1999,
    endYear: 2000,
    suppliers: ["Bridgestone"],
    monoSupplier: "Bridgestone",
    notes: "Goodyear withdraws. Bridgestone mono for two years.",
  },
  {
    startYear: 2001,
    endYear: 2006,
    suppliers: ["Bridgestone", "Michelin"],
    notes: "Tire war. Ferrari + Bridgestone; Renault, McLaren + Michelin. Performance gap drove the era's title swings.",
    exceptions: {
      Ferrari: "Bridgestone",
      Renault: "Michelin",
      McLaren: "Michelin",
      Williams: "Michelin",
    },
  },
  {
    startYear: 2007,
    endYear: 2010,
    suppliers: ["Bridgestone"],
    monoSupplier: "Bridgestone",
    notes: "Michelin withdrew after 2006. Bridgestone mono until exit end of 2010.",
  },
  {
    startYear: 2011,
    endYear: 2030, // open-ended; Pirelli contracted through current cycle
    suppliers: ["Pirelli"],
    monoSupplier: "Pirelli",
    notes: "Pirelli arrives with explicitly degradation-tuned compounds — strategy variable becomes a designed-in feature.",
  },
];

export function getTireSupplier(year: number, constructor: string): TireSupplier | null {
  const era = tireEras.find((e) => year >= e.startYear && year <= e.endYear);
  if (!era) return null;
  if (era.exceptions && era.exceptions[constructor]) return era.exceptions[constructor];
  if (era.monoSupplier) return era.monoSupplier;
  // multi-supplier era with no constructor override; can't disambiguate
  return null;
}
