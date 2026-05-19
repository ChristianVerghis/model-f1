export type AeroEra =
  | "ground-effect-skirts"
  | "flat-bottom"
  | "stepped-floor"
  | "high-downforce-v10"
  | "blown-diffuser"
  | "hybrid-v6"
  | "ground-effect-return";

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
  },
];
