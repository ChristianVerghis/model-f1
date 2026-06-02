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

export type FeatureCheck = {
  key: string;
  label: string;
  description: string;
  hasFeature: boolean;
  requiredIn2025: boolean;
  requiredIn2026: boolean;
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

// Binary safety/spec requirements derived from existing fields. Returned alongside
// the numeric comparison rows so the home-gallery "violations" counter reflects
// safety regs (halo, carbon-fiber monocoque) — not just dimensional minimums.
export function buildFeatureChecks(car: Car): FeatureCheck[] {
  const haloRequired2025 = currentRegs.limits.halo === true;
  const haloRequired2026 = incomingRegs.limits.halo === true;
  // Halo was mandated for 2018 — earlier cars never had one.
  const carHasHalo = car.year >= 2018;

  // Carbon-fiber monocoques became standard 1981 (McLaren MP4/1) and required
  // de facto from the crash-test regs of the early 80s onward. Treat absence
  // as a violation; we mark aluminum-honeycomb tubs and unset values as failing.
  const carHasCarbonFiberTub = car.monocoque === "carbon-fiber";

  // Active aero is mandated by 2026 (X/Z wing modes); not yet for 2025.
  const carHasActiveAero = car.activeAero === true;

  const check = (has: boolean, req2025: boolean, req2026: boolean): { status2025: ComplianceStatus; status2026: ComplianceStatus } => ({
    status2025: req2025 ? (has ? "ok" : "violates") : "ok",
    status2026: req2026 ? (has ? "ok" : "violates") : "ok",
  });

  return [
    {
      key: "halo",
      label: "Halo (cockpit protection)",
      description: "Titanium frame around cockpit, mandatory since 2018.",
      hasFeature: carHasHalo,
      requiredIn2025: haloRequired2025,
      requiredIn2026: haloRequired2026,
      ...check(carHasHalo, haloRequired2025, haloRequired2026),
    },
    {
      key: "carbonFiberTub",
      label: "Carbon-fiber monocoque",
      description: "Required by modern crash-test regs (frontal, side, rear, halo loads).",
      hasFeature: carHasCarbonFiberTub,
      requiredIn2025: true,
      requiredIn2026: true,
      ...check(carHasCarbonFiberTub, true, true),
    },
    {
      key: "activeAero",
      label: "Active aero (X/Z wing modes)",
      description: "Front and rear wings morph between modes — mandated 2026.",
      hasFeature: carHasActiveAero,
      requiredIn2025: false,
      requiredIn2026: true,
      ...check(carHasActiveAero, false, true),
    },
  ];
}

export function totalViolations(car: Car, year: 2025 | 2026): number {
  const rows = buildComparison(car).filter((r) =>
    year === 2025 ? r.status2025 === "violates" : r.status2026 === "violates",
  ).length;
  const features = buildFeatureChecks(car).filter((f) =>
    year === 2025 ? f.status2025 === "violates" : f.status2026 === "violates",
  ).length;
  return rows + features;
}
