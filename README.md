# model-f1

A study of Formula 1 car evolution across generations — aerodynamics, powertrain, chassis, electronics.

## What this is

A growing dataset and visualization layer for era-defining F1 cars (1970s ground-effect pioneers through the current hybrid + ground-effect era). The goal is to make the engineering arc of F1 legible: what changed, when, why, and how much.

## Dimensions tracked

- **Aerodynamics** — downforce era (skirts → flat bottom → ground effect return), drag/downforce ratios, ride heights, frontal area
- **Powertrain** — engine config, displacement, hp, fuel flow limits, hybrid deployment (MGU-K, MGU-H)
- **Energy storage** — battery capacity, deployment per lap, recovery efficiency
- **Chassis** — minimum weight, wheelbase, dimensions, safety regulations
- **Tires & suspension** — compound era, active vs passive, anti-dive/anti-squat trends

## Roadmap

1. **Seed dataset** — 10–15 era-defining cars with consistent spec schema
2. **Compare view** — side-by-side spec comparison between any two cars
3. **Timeline charts** — spec evolution (weight, hp, downforce) over decades
4. **Regulation overlay** — annotate where rule changes drove design shifts
5. **Predictive layer** — given specs, estimate where a car would qualify vs. its era peers
6. **Python `analysis/`** — Jupyter notebooks for statistical / aero modeling work

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind 4
- Data as typed TS modules to start; migrate to a DB once the schema settles

## Local dev

```bash
npm run dev
```

Open <http://localhost:3000>.
