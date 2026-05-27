import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { cars } from "../data/cars";
import { powerUnits } from "../data/powerunits";
import { aeroEraSpans, regulations } from "../data/regulations";

const outDir = join(import.meta.dirname, "..", "analysis", "data");
mkdirSync(outDir, { recursive: true });

const enrichedCars = cars.map((c) => ({
  ...c,
  powerToWeight: +(c.enginePowerHp / c.weightKg).toFixed(4),
  powerPerLiter: c.engineDisplacementL
    ? +(c.enginePowerHp / c.engineDisplacementL).toFixed(2)
    : null,
}));

writeFileSync(join(outDir, "cars.json"), JSON.stringify(enrichedCars, null, 2));
writeFileSync(join(outDir, "power-units.json"), JSON.stringify(powerUnits, null, 2));
writeFileSync(join(outDir, "regulations.json"), JSON.stringify(regulations, null, 2));
writeFileSync(join(outDir, "aero-eras.json"), JSON.stringify(aeroEraSpans, null, 2));

console.log(`Wrote ${cars.length} cars, ${powerUnits.length} power units, ${regulations.length} regulations, ${aeroEraSpans.length} eras → ${outDir}`);
