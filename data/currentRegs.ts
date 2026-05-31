// Current and incoming FIA F1 technical-regulation limits.
// Sources verified May 2026 from formula1.com 2026 rule changes article + FIA
// 2025 technical regulations document. Values are minimums (mass) or maximums
// (dimensions) unless noted.

export type RegLimitKind = "min" | "max" | "value";

export type RegLimit = {
  key: string; // matches a field name on Car where it makes sense (weightKg, widthMm, etc.)
  label: string;
  kind: RegLimitKind;
  unit: string;
  description: string;
};

export type RegulationSet = {
  year: number;
  label: string;
  limits: Record<string, number | string | boolean>;
  notes?: string;
};

export const regLimitMeta: RegLimit[] = [
  { key: "weightKg", label: "Minimum car weight (no fuel)", kind: "min", unit: "kg",
    description: "Minimum mass with driver and required equipment; ballast added to reach it." },
  { key: "widthMm", label: "Maximum overall width", kind: "max", unit: "mm",
    description: "Bodywork width measured across the widest point." },
  { key: "heightMm", label: "Maximum overall height", kind: "max", unit: "mm",
    description: "Excluding the airbox/roll hoop antenna." },
  { key: "wheelbaseMm", label: "Maximum wheelbase", kind: "max", unit: "mm",
    description: "Front axle centerline to rear axle centerline." },
  { key: "mguKPowerKW", label: "MGU-K peak power", kind: "value", unit: "kW",
    description: "Single hybrid motor-generator on the crankshaft." },
  { key: "batteryDeploymentMJ", label: "Battery deployment per lap", kind: "max", unit: "MJ",
    description: "Energy released from ES to MGU-K each lap." },
  { key: "fuelFlowKgH", label: "Fuel mass flow", kind: "max", unit: "kg/h",
    description: "Caps peak combustion power; sustainable fuel from 2026." },
];

export const currentRegs: RegulationSet = {
  year: 2025,
  label: "2025 regulations",
  limits: {
    weightKg: 800,
    widthMm: 2000,
    heightMm: 950,
    wheelbaseMm: 3600,
    mguKPowerKW: 120,
    batteryDeploymentMJ: 4,
    fuelFlowKgH: 100,
    halo: true,
    mguH: true,
    drs: true,
    tireSupplier: "Pirelli",
    costCapTechnicalMUSD: 135,
    costCapPowerUnitMUSD: 95,
    sustainableFuel: false,
  },
  notes:
    "Current ground-effect-return regs. 1.6L V6 turbo + MGU-K + MGU-H. Halo mandatory. DRS active in designated zones. Cost cap $135M technical + $95M power unit (with inflation adjustments).",
};

export const incomingRegs: RegulationSet = {
  year: 2026,
  label: "2026 regulations",
  limits: {
    weightKg: 768,
    widthMm: 1900,
    heightMm: 950,
    wheelbaseMm: 3400,
    mguKPowerKW: 350,
    batteryDeploymentMJ: 8,
    fuelFlowKgH: 100,
    halo: true,
    mguH: false,
    drs: false, // replaced by active-aero X/Z modes
    tireSupplier: "Pirelli",
    costCapTechnicalMUSD: 215,
    costCapPowerUnitMUSD: 130,
    sustainableFuel: true,
  },
  notes:
    "Biggest regulation reset since 2014. MGU-H removed; MGU-K nearly tripled to 350 kW. ICE/electric split moves toward 50/50. 100% sustainable fuel. Active aerodynamics replaces DRS — front and rear wings morph between high-downforce (Z) and low-drag (X) modes. Cars shrink: -32 kg, -100 mm wide, -200 mm wheelbase.",
};

export const regulationSets: RegulationSet[] = [currentRegs, incomingRegs];
