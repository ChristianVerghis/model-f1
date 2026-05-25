export type RegulationArea =
  | "aero"
  | "engine"
  | "electronics"
  | "safety"
  | "weight"
  | "fuel";

export type Regulation = {
  year: number;
  title: string;
  area: RegulationArea;
  description: string;
};

export const regulations: Regulation[] = [
  {
    year: 1983,
    title: "Flat-bottom mandate",
    area: "aero",
    description:
      "Sliding skirts banned 1981, flat bottoms mandated 1983 — end of the original ground-effect era.",
  },
  {
    year: 1989,
    title: "Turbos banned",
    area: "engine",
    description:
      "Naturally aspirated only (3.5L max). Ended the 1500hp qualifying-spec turbo era.",
  },
  {
    year: 1994,
    title: "Driver aids banned",
    area: "electronics",
    description:
      "Active suspension, traction control, ABS, and launch control all banned after the FW14B / FW15C era.",
  },
  {
    year: 1995,
    title: "3.0L cap",
    area: "engine",
    description: "Engines downsized to 3.0L max. V10 era settles in.",
  },
  {
    year: 1998,
    title: "Narrow track + grooved tires",
    area: "aero",
    description: "Cars narrowed from 2000mm to 1800mm. Grooved tires reduce mechanical grip.",
  },
  {
    year: 2006,
    title: "V8 engines (2.4L)",
    area: "engine",
    description: "Last V10s in 2005. 2.4L V8s mandated 2006–2013, rev limit progressively tightened.",
  },
  {
    year: 2008,
    title: "Driver aids banned (again) + standard ECU",
    area: "electronics",
    description:
      "Traction control banned for the second time (re-allowed 2001–2007). Single FIA-spec ECU introduced.",
  },
  {
    year: 2009,
    title: "Aero overhaul + optional KERS",
    area: "aero",
    description:
      "Slick tires return, wider front wing, narrower rear wing. KERS optional: 60kW / 400kJ per lap.",
  },
  {
    year: 2014,
    title: "Hybrid V6 era begins",
    area: "engine",
    description:
      "1.6L V6 turbo + ERS (MGU-K 120kW, MGU-H unlimited harvest, 4MJ battery deployment). Fuel flow capped at 100 kg/h.",
  },
  {
    year: 2017,
    title: "Wider, faster cars",
    area: "aero",
    description:
      "Tires widened, aero allowance increased — fastest cars in F1 history at the time.",
  },
  {
    year: 2022,
    title: "Ground effect returns",
    area: "aero",
    description:
      "Venturi tunnels replace bargeboards. Cars chase clean air better — explicit racing intent.",
  },
  {
    year: 2026,
    title: "50/50 hybrid + sustainable fuel",
    area: "engine",
    description:
      "MGU-H removed. MGU-K power increased to 350kW. 100% sustainable fuel. ICE and electric output roughly balanced.",
  },
];

export type AeroEraSpan = {
  era: string;
  startYear: number;
  endYear: number;
  label: string;
  description: string;
};

export const aeroEraSpans: AeroEraSpan[] = [
  {
    era: "pre-ground-effect",
    startYear: 1960,
    endYear: 1976,
    label: "Pre-ground-effect",
    description:
      "Front and rear wings appeared in 1968 but the floor stayed flat. Cars relied on slick mechanical grip, fat slicks, and (briefly) high-mounted strut wings with terrifying failure modes that prompted the FIA to limit wing height by 1969. The Cosworth DFV becomes the universal customer engine. The era ends when Colin Chapman figures out venturi tunnels.",
  },
  {
    era: "ground-effect-skirts",
    startYear: 1977,
    endYear: 1982,
    label: "Ground effect (skirts)",
    description:
      "Lotus 79 establishes the principle: shape the underfloor as an inverted wing, seal the sides with sliding skirts, and the car gets sucked to the road. Cornering speeds rise faster than safety can keep up. The Brabham BT46B fan car (1978) takes the idea to its logical extreme. The FIA bans skirts, then mandates flat bottoms — but not before the turbo arms race compounds the danger.",
  },
  {
    era: "flat-bottom",
    startYear: 1983,
    endYear: 1994,
    label: "Flat bottom",
    description:
      "FIA-mandated flat reference plane under the car kills ground effect. Aero work shifts to wings, sidepods, and the diffuser. Carbon-fiber monocoques become standard. Active suspension (FW14B/FW15C), traction control, and semi-auto gearboxes turn the era into a software race — all banned for 1994 after Senna's death at Imola.",
  },
  {
    era: "stepped-floor",
    startYear: 1995,
    endYear: 2008,
    label: "Stepped floor",
    description:
      "Post-Imola, the FIA adds a 50mm step in the floor to cut downforce. V10s become dominant (2.4L V8s from 2006). Aero refinement explodes — every bargeboard, winglet, and chimney earns its wind-tunnel hours. Schumacher's Ferrari dynasty defines the decade; F2004 sets lap records that survive into the hybrid era.",
  },
  {
    era: "blown-diffuser",
    startYear: 2009,
    endYear: 2013,
    label: "Blown diffuser + KERS",
    description:
      "Aero overhaul: slick tires return, wings narrowed/widened in opposite directions, double diffusers and blown floors emerge as the dominant performance tricks. KERS (60 kW / 400 kJ) introduced 2009, mandatory by 2011. Red Bull/Newey perfect exhaust-blown floors and take four consecutive doubles.",
  },
  {
    era: "hybrid-v6",
    startYear: 2014,
    endYear: 2021,
    label: "Hybrid V6",
    description:
      "1.6L V6 turbo + MGU-K (120 kW) + MGU-H (unlimited harvest) + 4 MJ/lap battery deployment + 100 kg/h fuel flow. Mercedes' split-turbo concept catches everyone else off guard and the team wins eight straight constructors' titles. By 2017 the dominant PUs claim >50% thermal efficiency on the dyno.",
  },
  {
    era: "ground-effect-return",
    startYear: 2022,
    endYear: 2025,
    label: "Ground effect return",
    description:
      "Venturi tunnels return under the floor; bargeboards banned; wheel covers, simpler front wings. Explicit goal: cars can follow each other in dirty air. Porpoising dominates the first season. Red Bull's RB19 produces the most dominant single-season car ever (21 wins from 22).",
  },
];
