#!/usr/bin/env -S uv run --script
#
# /// script
# requires-python = ">=3.11"
# dependencies = [
#   "matplotlib>=3.8",
#   "pandas>=2.0",
# ]
# ///
#
# Plot engine power-per-liter by year, with aero-era shading and a marker on
# the 1989 NA-only mandate. The story: the 1988 MP4/4 hits ~457 hp/L in race
# trim, the 1984 TAG-Porsche cars peaked at ~500 hp/L; the 1989 ban collapses
# the curve to ~200 hp/L. Modern hybrids "beat" the turbo peak (~650 hp/L) but
# (a) include MGU-K's ~161 hp on top of the ICE, and (b) divide by a 1.6L
# displacement vs 1.5L — apples-to-oranges with the late-80s number.
#
# Run with `uv run analysis/01_power_per_liter.py` (uv resolves deps inline).
# Outputs analysis/out/01_power_per_liter.png.

from __future__ import annotations

import json
from pathlib import Path

import matplotlib.pyplot as plt
import pandas as pd

ROOT = Path(__file__).parent
DATA = ROOT / "data"
OUT = ROOT / "out"
OUT.mkdir(parents=True, exist_ok=True)

ERA_COLORS = {
    "pre-ground-effect": "#cbd5e1",
    "ground-effect-skirts": "#fde68a",
    "flat-bottom": "#c7d2fe",
    "stepped-floor": "#fbcfe8",
    "blown-diffuser": "#fecaca",
    "hybrid-v6": "#a7f3d0",
    "ground-effect-return": "#a5f3fc",
}


def load() -> tuple[pd.DataFrame, list[dict], list[dict]]:
    cars = pd.DataFrame(json.loads((DATA / "cars.json").read_text()))
    eras = json.loads((DATA / "aero-eras.json").read_text())
    regs = json.loads((DATA / "regulations.json").read_text())
    return cars, eras, regs


def main() -> None:
    cars, eras, regs = load()
    cars = cars.dropna(subset=["powerPerLiter"]).sort_values("year")

    fig, ax = plt.subplots(figsize=(11, 6))

    # Aero-era shading
    year_min, year_max = cars["year"].min() - 2, cars["year"].max() + 2
    for era in eras:
        x1 = max(era["startYear"], year_min)
        x2 = min(era["endYear"], year_max)
        ax.axvspan(x1, x2, color=ERA_COLORS.get(era["era"], "#f4f4f5"), alpha=0.35, zorder=0)

    # Regulation reference lines
    for reg in regs:
        ax.axvline(reg["year"], color="#a1a1aa", linestyle="--", linewidth=0.8, alpha=0.7, zorder=1)

    # Scatter colored by aero era, with hybrid cars hollow-marked
    for era_name, color in ERA_COLORS.items():
        subset = cars[cars["aeroEra"] == era_name]
        if subset.empty:
            continue
        non_hybrid = subset[~subset["hybrid"]]
        hybrid = subset[subset["hybrid"]]
        if not non_hybrid.empty:
            ax.scatter(
                non_hybrid["year"], non_hybrid["powerPerLiter"],
                s=55, color=color, edgecolor="#27272a", linewidth=0.8, zorder=3,
            )
        if not hybrid.empty:
            ax.scatter(
                hybrid["year"], hybrid["powerPerLiter"],
                s=55, color=color, edgecolor="#27272a", linewidth=0.8, zorder=3,
                marker="D",  # diamond = hybrid (value includes MGU-K, not ICE-only)
            )

    # Annotate the peak (MP4/4) and the 1989 collapse
    peak = cars.loc[cars["powerPerLiter"].idxmax()]
    ax.annotate(
        f"{peak['constructor']} {peak['chassis']}\n{peak['powerPerLiter']:.0f} hp/L",
        xy=(peak["year"], peak["powerPerLiter"]),
        xytext=(peak["year"] - 14, peak["powerPerLiter"] + 30),
        arrowprops=dict(arrowstyle="-", color="#52525b", lw=0.8),
        fontsize=9, color="#27272a",
    )
    ax.axvline(1989, color="#dc2626", linewidth=1.3, alpha=0.85, zorder=2)
    ax.text(
        1989.3, ax.get_ylim()[1] * 0.94,
        "1989: turbos\nbanned",
        fontsize=8.5, color="#dc2626", va="top",
    )

    ax.set_xlabel("Year")
    ax.set_ylabel("Engine power per liter (hp/L)")
    ax.set_title(
        "Power per liter — the cleanest single number showing\n"
        "regulation, not engineering, capping Formula 1",
        fontsize=12,
    )
    ax.set_xlim(year_min, year_max)
    ax.grid(axis="y", color="#e4e4e7", linewidth=0.6)
    ax.spines[["top", "right"]].set_visible(False)

    # Legend for the marker
    from matplotlib.lines import Line2D
    legend_elements = [
        Line2D([0], [0], marker="o", color="w", markerfacecolor="#cbd5e1",
               markeredgecolor="#27272a", label="ICE-only car", markersize=8),
        Line2D([0], [0], marker="D", color="w", markerfacecolor="#a7f3d0",
               markeredgecolor="#27272a", label="Hybrid car (total PU / displacement)", markersize=7),
        Line2D([0], [0], color="#a1a1aa", linestyle="--", label="Regulation change"),
    ]
    ax.legend(handles=legend_elements, loc="upper left", fontsize=8.5, frameon=False)

    out_path = OUT / "01_power_per_liter.png"
    fig.tight_layout()
    fig.savefig(out_path, dpi=150)
    print(f"wrote {out_path}")

    # Print the per-era summary table
    summary = (
        cars.groupby("aeroEra")
        .agg(n=("id", "count"),
             min_hp_per_L=("powerPerLiter", "min"),
             mean_hp_per_L=("powerPerLiter", "mean"),
             max_hp_per_L=("powerPerLiter", "max"))
        .round(1)
        .reindex([e["era"] for e in eras])
        .dropna()
    )
    print("\nPer-era power-per-liter (total PU / ICE displacement, race trim):")
    print(summary.to_string())


if __name__ == "__main__":
    main()
