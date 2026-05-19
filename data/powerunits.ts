export type PowerUnit = {
  id: string;
  year: number;
  manufacturer: string;
  name: string;
  iceConfig: string;
  iceMaxRpm: number;
  iceFuelFlowKgH: number;
  mguKPowerKW: number;
  mguHUnlimited: boolean;
  energyStoreDeploymentMJ: number;
  estimatedTotalHp: number;
  estimatedThermalEfficiency?: number;
  notes: string;
};

export const powerUnits: PowerUnit[] = [
  {
    id: "mercedes-pu106a-2014",
    year: 2014,
    manufacturer: "Mercedes",
    name: "PU106A Hybrid",
    iceConfig: "1.6L V6 turbo",
    iceMaxRpm: 15000,
    iceFuelFlowKgH: 100,
    mguKPowerKW: 120,
    mguHUnlimited: true,
    energyStoreDeploymentMJ: 4,
    estimatedTotalHp: 760,
    estimatedThermalEfficiency: 0.44,
    notes:
      "Split-turbo concept — compressor at the front of the engine, turbine at the rear, MGU-H on the shaft between. Mercedes' decisive 2014 advantage.",
  },
  {
    id: "mercedes-pu106b-2015",
    year: 2015,
    manufacturer: "Mercedes",
    name: "PU106B Hybrid",
    iceConfig: "1.6L V6 turbo",
    iceMaxRpm: 15000,
    iceFuelFlowKgH: 100,
    mguKPowerKW: 120,
    mguHUnlimited: true,
    energyStoreDeploymentMJ: 4,
    estimatedTotalHp: 850,
    estimatedThermalEfficiency: 0.46,
    notes: "Combustion refinements close the qualifying gap to Ferrari briefly.",
  },
  {
    id: "mercedes-pu106c-2016",
    year: 2016,
    manufacturer: "Mercedes",
    name: "PU106C Hybrid",
    iceConfig: "1.6L V6 turbo",
    iceMaxRpm: 15000,
    iceFuelFlowKgH: 100,
    mguKPowerKW: 120,
    mguHUnlimited: true,
    energyStoreDeploymentMJ: 4,
    estimatedTotalHp: 900,
    estimatedThermalEfficiency: 0.47,
    notes: "Token system in final year — Mercedes still well clear.",
  },
  {
    id: "mercedes-m08-eq-2017",
    year: 2017,
    manufacturer: "Mercedes",
    name: "M08 EQ Power+",
    iceConfig: "1.6L V6 turbo",
    iceMaxRpm: 15000,
    iceFuelFlowKgH: 100,
    mguKPowerKW: 120,
    mguHUnlimited: true,
    energyStoreDeploymentMJ: 4,
    estimatedTotalHp: 950,
    estimatedThermalEfficiency: 0.5,
    notes:
      "Mercedes publicly claims >50% thermal efficiency on the dyno — a road-car turbo-diesel is ~40%.",
  },
  {
    id: "ferrari-062-2019",
    year: 2019,
    manufacturer: "Ferrari",
    name: "Tipo 064",
    iceConfig: "1.6L V6 turbo",
    iceMaxRpm: 15000,
    iceFuelFlowKgH: 100,
    mguKPowerKW: 120,
    mguHUnlimited: true,
    energyStoreDeploymentMJ: 4,
    estimatedTotalHp: 1000,
    notes:
      "The (in)famous 2019 Ferrari PU — high straight-line speed, subject to mid-season FIA technical directives that quietly ended the advantage by 2020.",
  },
  {
    id: "mercedes-m11-2020",
    year: 2020,
    manufacturer: "Mercedes",
    name: "M11 EQ Performance",
    iceConfig: "1.6L V6 turbo",
    iceMaxRpm: 15000,
    iceFuelFlowKgH: 100,
    mguKPowerKW: 120,
    mguHUnlimited: true,
    energyStoreDeploymentMJ: 4,
    estimatedTotalHp: 1025,
    estimatedThermalEfficiency: 0.52,
    notes: "Powered the W11 — arguably the best car ever built.",
  },
  {
    id: "honda-ra621h-2021",
    year: 2021,
    manufacturer: "Honda",
    name: "RA621H",
    iceConfig: "1.6L V6 turbo",
    iceMaxRpm: 15000,
    iceFuelFlowKgH: 100,
    mguKPowerKW: 120,
    mguHUnlimited: true,
    energyStoreDeploymentMJ: 4,
    estimatedTotalHp: 1010,
    notes:
      "Honda's farewell-season PU — gave Verstappen the title and seeded the Red Bull Powertrains lineage.",
  },
  {
    id: "rbpt-2022",
    year: 2022,
    manufacturer: "Red Bull Powertrains",
    name: "RBPT (Honda-derived)",
    iceConfig: "1.6L V6 turbo",
    iceMaxRpm: 15000,
    iceFuelFlowKgH: 100,
    mguKPowerKW: 120,
    mguHUnlimited: true,
    energyStoreDeploymentMJ: 4,
    estimatedTotalHp: 1040,
    notes: "First year of the ground-effect-return regs. PU development frozen until 2025.",
  },
  {
    id: "honda-rbpt-2023",
    year: 2023,
    manufacturer: "Honda",
    name: "Honda RBPT",
    iceConfig: "1.6L V6 turbo",
    iceMaxRpm: 15000,
    iceFuelFlowKgH: 100,
    mguKPowerKW: 120,
    mguHUnlimited: true,
    energyStoreDeploymentMJ: 4,
    estimatedTotalHp: 1050,
    notes: "Powered RB19 to 21 wins from 22 races.",
  },
];
