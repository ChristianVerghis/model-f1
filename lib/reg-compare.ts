import type { Car } from "@/data/cars";
import { currentRegs, incomingRegs, regLimitMeta, type RegLimit } from "@/data/currentRegs";
import { getTireSupplier } from "@/data/tireEras";

export type ComplianceStatus = "ok" | "violates" | "no-data";

export type ComparisonRow = {
  meta: RegLimit;
  carValue: number | undefined;
  regValue2025: number;
  regValue2026: number;
  delta2025: number | null; // car - 2025 reg
  delta2026: number | null; // car - 2026 reg
  status2025: ComplianceStatus;
  status2026: ComplianceStatus;
};

function checkCompliance(kind: "min" | "max" | "value", carValue: number | undefined, reg: number): ComplianceStatus {
  if (carValue === undefined) return "no-data";
  if (kind === "min") return carValue >= reg ? "ok" : "violates";
  if (kind === "max") return carValue <= reg ? "ok" : "violates";
  // kind === "value": equality required (ICE-only car has 0 MGU-K; that's a violation today only conceptually)
  return carValue === reg ? "ok" : "violates";
}

export function buildComparison(car: Car): ComparisonRow[] {
  return regLimitMeta.map((meta) => {
    const carValue = (car as unknown as Record<string, number | undefined>)[meta.key];
    const regValue2025 = currentRegs.limits[meta.key] as number;
    const regValue2026 = incomingRegs.limits[meta.key] as number;
    const delta2025 = carValue !== undefined ? +(carValue - regValue2025).toFixed(1) : null;
    const delta2026 = carValue !== undefined ? +(carValue - regValue2026).toFixed(1) : null;
    return {
      meta,
      carValue,
      regValue2025,
      regValue2026,
      delta2025,
      delta2026,
      status2025: checkCompliance(meta.kind, carValue, regValue2025),
      status2026: checkCompliance(meta.kind, carValue, regValue2026),
    };
  });
}

export function inferredTireSupplier(car: Car) {
  if (car.tireSupplier) return { value: car.tireSupplier, inferred: false as const };
  const guess = getTireSupplier(car.year, car.constructor);
  return guess ? { value: guess, inferred: true as const } : null;
}
