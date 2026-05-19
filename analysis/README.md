# analysis/

Reserved for Python notebooks and statistical work that doesn't belong in the Next.js app.

## Planned

- **Pace-from-specs regression** — once the dataset reaches ~30+ cars with full aero/PU coverage, fit a model that estimates relative qualifying pace from specs alone. Compare predicted vs. actual era ranking.
- **PU efficiency curves** — chart claimed thermal efficiency of the hybrid V6 era against fuel-flow regulations.
- **Aero-vs-engine contribution** — decompose lap-time gains per era into aero share vs. powertrain share.
- **MGU-K deployment optimization** — given a track layout, optimize 4 MJ/lap deployment for minimum lap time (toy problem; real engineering version is constructor-IP).

## Stack (when we start)

- `uv` for env management
- pandas + numpy
- scikit-learn for the regression layer
- matplotlib / plotly for static + interactive plots
- Data ingested from `../data/*.ts` via a small TS→JSON export script
