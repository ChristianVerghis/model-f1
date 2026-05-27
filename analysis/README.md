# analysis/

Reserved for Python notebooks and statistical work that doesn't belong in the Next.js app.

## Refreshing the dataset

The Next.js app is the source of truth. Run from the repo root:

```bash
npm run export-data
```

That dumps four JSON files into `analysis/data/`:

- `cars.json` — 35 cars, each enriched with `powerToWeight` and `powerPerLiter` (null if displacement unknown)
- `power-units.json` — 9 hybrid-era PUs with thermal-efficiency estimates
- `regulations.json` — 12 regulation inflection points
- `aero-eras.json` — 7 aero eras with date ranges and descriptions

Re-run the script after any change to `data/*.ts` in the app.

## Planned

- **Pace-from-specs regression** — once the dataset reaches ~50+ cars with full aero/PU coverage, fit a model that estimates relative qualifying pace from specs alone. Compare predicted vs. actual era ranking.
- **PU efficiency curves** — chart claimed thermal efficiency of the hybrid V6 era against fuel-flow regulations.
- **Aero-vs-engine contribution** — decompose lap-time gains per era into aero share vs. powertrain share.
- **Turbo-era power-per-liter analysis** — quantify how much of the 1988 MP4/4 advantage was raw hp and how much was efficiency-at-fuel-limit. (FIA capped race fuel to 150L in 1988, then 195L.)

## Stack (when we start)

```bash
uv venv && source .venv/bin/activate
uv pip install pandas numpy scikit-learn matplotlib
```
