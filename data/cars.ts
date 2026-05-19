export type AeroEra =
  | "ground-effect-skirts"
  | "flat-bottom"
  | "stepped-floor"
  | "high-downforce-v10"
  | "blown-diffuser"
  | "hybrid-v6"
  | "ground-effect-return";

export type Monocoque = "aluminum-honeycomb" | "carbon-fiber";

export type Car = {
  id: string;
  year: number;
  constructor: string;
  chassis: string;
  engine: string;
  enginePowerHp: number;
  weightKg: number;
  aeroEra: AeroEra;
  hybrid: boolean;
  notable: string;

  // chassis
  monocoque?: Monocoque;
  wheelbaseMm?: number;
  fuelTankL?: number;

  // electronics
  activeSuspension?: boolean;
  tractionControl?: boolean;
  semiAutoGearbox?: boolean;
  launchControl?: boolean;
  kers?: boolean;
  ers?: boolean;

  // hybrid-era PU detail (2014+)
  mguKPowerKW?: number;
  batteryDeploymentMJ?: number;
  fuelFlowKgH?: number;
  maxRpm?: number;
};

export const cars: Car[] = [
  {
    id: "tyrrell-p34-1976",
    year: 1976,
    constructor: "Tyrrell",
    chassis: "P34",
    engine: "Ford-Cosworth DFV 3.0L V8 NA",
    enginePowerHp: 465,
    weightKg: 595,
    aeroEra: "ground-effect-skirts",
    hybrid: false,
    notable: "Six-wheeler — four 10\" front wheels to reduce frontal area while keeping contact patch.",
    monocoque: "aluminum-honeycomb",
    maxRpm: 10500,
  },
  {
    id: "lotus-79-1978",
    year: 1978,
    constructor: "Lotus",
    chassis: "79",
    engine: "Ford-Cosworth DFV 3.0L V8 NA",
    enginePowerHp: 480,
    weightKg: 575,
    aeroEra: "ground-effect-skirts",
    hybrid: false,
    notable: "Defined modern ground effect — venturi sidepods with sliding skirts. Andretti title.",
    monocoque: "aluminum-honeycomb",
    maxRpm: 11000,
  },
  {
    id: "mclaren-mp4-4-1988",
    year: 1988,
    constructor: "McLaren",
    chassis: "MP4/4",
    engine: "Honda RA168E 1.5L V6 turbo",
    enginePowerHp: 685,
    weightKg: 540,
    aeroEra: "flat-bottom",
    hybrid: false,
    notable: "15 wins from 16 races. Last turbo-era car before the 1989 NA-only mandate.",
    monocoque: "carbon-fiber",
    semiAutoGearbox: false,
    maxRpm: 12500,
  },
  {
    id: "williams-fw14b-1992",
    year: 1992,
    constructor: "Williams",
    chassis: "FW14B",
    engine: "Renault RS3/4 3.5L V10 NA",
    enginePowerHp: 760,
    weightKg: 505,
    aeroEra: "flat-bottom",
    hybrid: false,
    notable: "Active suspension, traction control, semi-auto gearbox. Computers won the race.",
    monocoque: "carbon-fiber",
    activeSuspension: true,
    tractionControl: true,
    semiAutoGearbox: true,
    maxRpm: 14500,
  },
  {
    id: "ferrari-f2004-2004",
    year: 2004,
    constructor: "Ferrari",
    chassis: "F2004",
    engine: "Ferrari Tipo 053 3.0L V10 NA",
    enginePowerHp: 940,
    weightKg: 605,
    aeroEra: "high-downforce-v10",
    hybrid: false,
    notable: "Apex of the V10 era. 19,000 rpm. Lap records that stood for over a decade.",
    monocoque: "carbon-fiber",
    activeSuspension: false,
    tractionControl: true,
    semiAutoGearbox: true,
    launchControl: false,
    maxRpm: 19000,
  },
  {
    id: "brawn-bgp001-2009",
    year: 2009,
    constructor: "Brawn",
    chassis: "BGP 001",
    engine: "Mercedes FO 108W 2.4L V8 NA",
    enginePowerHp: 720,
    weightKg: 605,
    aeroEra: "stepped-floor",
    hybrid: false,
    notable: "Double diffuser loophole. Constructors' title from a team that nearly didn't race.",
    monocoque: "carbon-fiber",
    semiAutoGearbox: true,
    kers: false,
    maxRpm: 18000,
  },
  {
    id: "redbull-rb9-2013",
    year: 2013,
    constructor: "Red Bull",
    chassis: "RB9",
    engine: "Renault RS27 2.4L V8 NA",
    enginePowerHp: 750,
    weightKg: 642,
    aeroEra: "blown-diffuser",
    hybrid: false,
    notable: "Last V8 champion. Exhaust-blown diffuser refined to its peak by Newey.",
    monocoque: "carbon-fiber",
    semiAutoGearbox: true,
    kers: true,
    maxRpm: 18000,
  },
  {
    id: "mercedes-w05-2014",
    year: 2014,
    constructor: "Mercedes",
    chassis: "W05 Hybrid",
    engine: "Mercedes PU106A 1.6L V6 turbo hybrid",
    enginePowerHp: 760,
    weightKg: 691,
    aeroEra: "hybrid-v6",
    hybrid: true,
    notable: "First year of the hybrid V6 PU regs. Split turbo (compressor front, turbine rear).",
    monocoque: "carbon-fiber",
    semiAutoGearbox: true,
    ers: true,
    mguKPowerKW: 120,
    batteryDeploymentMJ: 4,
    fuelFlowKgH: 100,
    maxRpm: 15000,
  },
  {
    id: "mercedes-w11-2020",
    year: 2020,
    constructor: "Mercedes",
    chassis: "W11",
    engine: "Mercedes M11 EQ Performance 1.6L V6 turbo hybrid",
    enginePowerHp: 1025,
    weightKg: 746,
    aeroEra: "hybrid-v6",
    hybrid: true,
    notable: "DAS (dual-axis steering) front-toe adjustment. Considered one of the best cars ever.",
    monocoque: "carbon-fiber",
    semiAutoGearbox: true,
    ers: true,
    mguKPowerKW: 120,
    batteryDeploymentMJ: 4,
    fuelFlowKgH: 100,
    maxRpm: 15000,
  },
  {
    id: "redbull-rb18-2022",
    year: 2022,
    constructor: "Red Bull",
    chassis: "RB18",
    engine: "Red Bull Powertrains RBPT 1.6L V6 turbo hybrid",
    enginePowerHp: 1040,
    weightKg: 798,
    aeroEra: "ground-effect-return",
    hybrid: true,
    notable: "First car of the ground-effect-return regs. Verstappen runaway after early bouncing.",
    monocoque: "carbon-fiber",
    semiAutoGearbox: true,
    ers: true,
    mguKPowerKW: 120,
    batteryDeploymentMJ: 4,
    fuelFlowKgH: 100,
    maxRpm: 15000,
  },
  {
    id: "redbull-rb19-2023",
    year: 2023,
    constructor: "Red Bull",
    chassis: "RB19",
    engine: "Honda RBPT 1.6L V6 turbo hybrid",
    enginePowerHp: 1050,
    weightKg: 798,
    aeroEra: "ground-effect-return",
    hybrid: true,
    notable: "21 wins from 22 races. Most dominant single-season car in F1 history.",
    monocoque: "carbon-fiber",
    semiAutoGearbox: true,
    ers: true,
    mguKPowerKW: 120,
    batteryDeploymentMJ: 4,
    fuelFlowKgH: 100,
    maxRpm: 15000,
  },
];

export function getCarById(id: string): Car | undefined {
  return cars.find((c) => c.id === id);
}
