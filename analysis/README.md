# analysis/

Python notebooks and statistical work that doesn't belong in the Next.js app.

## Refreshing the dataset

The Next.js app is the source of truth. From the repo root:

```bash
npm run export-data
```

That dumps four JSON files into `analysis/data/` (gitignored — regenerate after any change to `data/*.ts`):

- `cars.json` — every car, enriched with `powerToWeight`, `powerPerLiter`, and outcome flags (`wonDrivers`, `wonConstructors`, `wins`)
- `power-units.json` — hybrid-era PUs with thermal-efficiency estimates
- `regulations.json` — regulation inflection points
- `aero-eras.json` — aero eras with date ranges and descriptions

## Running scripts

Scripts use PEP 723 inline dependencies — `uv` reads the dep block at the top of the file, resolves an ephemeral venv, and runs. No global pip installs needed.

```bash
uv run analysis/01_power_per_liter.py
```

Outputs land in `analysis/out/`.

## Done

- **01_power_per_liter.py** — chart hp/L by year with aero-era shading and the 1989 NA-mandate marker. Confirms the central story: regulation, not engineering, capped F1. The 1984 TAG-Porsche peaked at ~500 hp/L; the 1989 ban collapses the curve back to ~200; modern hybrids only beat the late-80s number when you include MGU-K and divide by a 1.6L (vs 1.5L) displacement.

## Planned

- **02_pace_from_specs.py** — pace-from-specs regression. With outcome flags now in the export, target the binary `wonDrivers OR wonConstructors` as a proxy for relative pace; predictors are power, weight, P:W, hybrid, era. Compare logistic regression vs. tree models on a 50-car set.
- **PU efficiency curves** — claimed thermal efficiency over the hybrid V6 decade against fuel-flow regs.
- **Aero-vs-engine contribution** — decompose lap-time gains per era into aero share vs. powertrain share.
