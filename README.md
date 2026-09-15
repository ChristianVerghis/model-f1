# model-f1

**A study of Formula 1 car evolution across generations — aerodynamics, powertrain, chassis, electronics.**

## What it is

A hand-curated dataset of 50 era-defining F1 cars (1955 Mercedes W196 through the 2024 McLaren MCL38) stored as typed TypeScript modules, with a Next.js app that turns it into gallery, comparison, timeline and regulation views, and a small Python pipeline for analysis that doesn't belong in a web page.

The data layer covers:

- **Cars** (`data/cars.ts`) — year, constructor, chassis, engine, displacement, power, minimum weight, aero era, monocoque material, dimensions, tire supplier, driver-aid electronics (active suspension, traction control, semi-auto gearbox, launch control, KERS/ERS), hybrid-era power-unit detail (MGU-K power, battery deployment, fuel flow, max rpm).
- **Aero eras and regulation inflection points** (`data/regulations.ts`) — seven aero eras from pre-ground-effect (1960–76) to the ground-effect return (2022–25), and twelve rule changes (flat-bottom mandate, turbo ban, driver-aid bans, displacement caps, narrow track, V8/V6 mandates, hybrid, halo, cost cap, ...).
- **Hybrid power units** (`data/powerunits.ts`) — nine 2014+ units with ICE spec, MGU-K, energy store deployment, estimated total hp and estimated thermal efficiency.
- **Current and incoming FIA limits** (`data/currentRegs.ts`) — 2025 and 2026 technical-regulation limits (mass, width, height, wheelbase, MGU-K, battery deployment, fuel flow, halo, DRS/active aero, cost caps).
- **Race results** (`data/results.ts`) — drivers'/constructors' title flags per chassis, and win totals where well documented.
- **Tire-supplier eras** (`data/tireEras.ts`) — used to infer a car's supplier when it isn't recorded directly.

The app (routes under `app/`):

| Route | What it shows |
| --- | --- |
| `/` | Filterable gallery of all cars (era, constructor, championship status, free-text search), with a count of 2025-regulation violations per car |
| `/cars/[id]` | Car detail: full spec sheet, in-era rank for power, weight, power-to-weight and power-per-liter, and a compliance table against the 2025 and 2026 limits |
| `/compare` | Side-by-side spec comparison of any two cars; the pair is carried in the URL |
| `/eras`, `/eras/[era]`, `/eras/compare` | Aero-era overview, per-era cars and regulation changes, and two-era statistical comparison (average power, weight, hybrid/carbon-fiber share, dominant constructor) |
| `/constructors`, `/constructors/[slug]` | Constructors with power sparklines, and each constructor's cars in chronological order |
| `/scatter` | Every car as a point on year vs. a switchable metric (power-to-weight, power, weight, max rpm), with a ranked list |
| `/timeline` | Power, weight and efficiency over time, shaded by aero era with regulation inflection points as dashed lines |
| `/powerunits` | The hybrid V6 decade, unit by unit |
| `/regulations`, `/regulations/2026` | Current FIA limits next to the 2026 reset, and a deep dive on the seven 2026 changes |

The `analysis/` directory holds Python scripts that read a JSON export of the same data. `01_power_per_liter.py` charts hp/L by year with era shading and the 1989 NA-only marker.

## Why I built it

I wanted the engineering arc of Formula 1 in one place: what changed, when, and how much, without re-collecting specs from scattered articles every time a question came up. Keeping the data as typed TypeScript means the web app, the compliance checks and the Python analysis all read one source of truth, and a mistake in a spec is a one-line diff. The 2026 regulation reset was the immediate motivation for the compliance layer: it makes it easy to see which historical designs would fail which current rule, and by how much.

## Status

As of 2026-09-15:

- Done: 50-car dataset with results and tire-era layers; gallery, car detail, compare, eras, constructors, scatter, timeline, power units and regulations pages; 2025/2026 compliance comparison; JSON export for analysis; first analysis script (power per liter).
- Rough: several spec fields (dimensions, fuel tank, tire supplier) are missing on older cars, so some rows show "no data"; `wins` is only populated for a handful of chassis; power figures are period estimates rather than measured values; the carbon-fiber-monocoque compliance check is a heuristic (absence is treated as a violation).
- Not started: the pace-from-specs regression (`analysis/02`), power-unit efficiency curves and aero-vs-engine decomposition listed in `analysis/README.md`. Active development is paused; the analysis capstone is the remaining piece.

## Stack

- Next.js 16 (App Router, React 19) + TypeScript
- Tailwind CSS 4
- Recharts for the scatter, timeline and sparkline charts
- Data as typed TS modules (no database)
- `tsx` for the export script; Python 3.11+ with `uv` (PEP 723 inline dependencies: pandas, matplotlib) for `analysis/`

## Run it

Uses npm (`package-lock.json` is committed).

```bash
npm install
npm run dev          # http://localhost:3000
```

Other commands:

```bash
npm run lint         # eslint
npx tsc --noEmit     # typecheck
npm run build        # production build

npm run export-data                     # writes analysis/data/*.json (gitignored)
uv run analysis/01_power_per_liter.py   # writes analysis/out/01_power_per_liter.png
```

## Layout

```
app/                Next.js routes (see table above); *-chart.tsx / charts.tsx are client components
data/               Typed dataset: cars, regulations + aero eras, powerunits, currentRegs, results, tireEras
lib/                Derived data: constructor grouping, era statistics and in-era ranks, regulation compliance
scripts/            export-data.ts: enriches cars (power-to-weight, power-per-liter, outcome flags) and dumps JSON
analysis/           uv-run Python scripts and their README; data/ and out/ are generated and gitignored
public/             Static assets
```

## Data and sources

All figures are hand-entered from public references and should be read as representative rather than authoritative; period horsepower numbers in particular vary by source and are recorded as estimates. The 2025 and 2026 regulation limits in `data/currentRegs.ts` were checked in May 2026 against the formula1.com 2026 rule-changes article and the FIA 2025 Technical Regulations. Championship outcomes in `data/results.ts` are attributed to a chassis's lifetime, so a car listed under its debut year may carry a title won the following season (noted inline).

## License

MIT. See [LICENSE](LICENSE).
