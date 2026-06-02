"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CartesianGrid,
  Label,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type ScatterPoint = {
  id: string;
  year: number;
  label: string;
  era: string;
  powerHp: number;
  weightKg: number;
  powerToWeight: number;
  maxRpm?: number;
};

const eraHex: Record<string, string> = {
  "pre-ground-effect": "#64748b",
  "ground-effect-skirts": "#f59e0b",
  "flat-bottom": "#6366f1",
  "stepped-floor": "#ec4899",
  "blown-diffuser": "#ef4444",
  "hybrid-v6": "#10b981",
  "ground-effect-return": "#06b6d4",
};

const eraLabel: Record<string, string> = {
  "pre-ground-effect": "Pre-ground-effect",
  "ground-effect-skirts": "Ground effect (skirts)",
  "flat-bottom": "Flat bottom",
  "stepped-floor": "Stepped floor",
  "blown-diffuser": "Blown diffuser + KERS",
  "hybrid-v6": "Hybrid V6",
  "ground-effect-return": "Ground effect return",
};

type Metric = {
  key: "powerHp" | "weightKg" | "powerToWeight" | "maxRpm";
  label: string;
  unit: string;
  format: (v: number) => string;
  reg2025?: number;
  reg2026?: number;
  regKind?: "min" | "max";
};

const metrics: Metric[] = [
  { key: "powerToWeight", label: "Power-to-weight", unit: "hp/kg", format: (v) => v.toFixed(2) },
  { key: "powerHp", label: "Engine power", unit: "hp", format: (v) => v.toFixed(0) },
  {
    key: "weightKg", label: "Minimum weight", unit: "kg", format: (v) => v.toFixed(0),
    reg2025: 800, reg2026: 768, regKind: "min",
  },
  { key: "maxRpm", label: "Max RPM", unit: "rpm", format: (v) => v.toLocaleString() },
];

function CarTooltip({ active, payload, metric }: { active?: boolean; payload?: Array<{ payload: ScatterPoint }>; metric: Metric }) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  const value = p[metric.key];
  if (value === undefined) return null;
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-xs shadow">
      <p className="font-medium">{p.label}</p>
      <p className="text-zinc-500 mt-0.5 font-mono">
        {p.year} · {metric.format(value)} {metric.unit}
      </p>
      <p className="text-zinc-400 text-[10px] mt-1 uppercase tracking-wider">{eraLabel[p.era] ?? p.era}</p>
    </div>
  );
}

export function ScatterView({ points }: { points: ScatterPoint[] }) {
  const [metricKey, setMetricKey] = useState<Metric["key"]>("powerToWeight");
  const metric = metrics.find((m) => m.key === metricKey)!;

  const byEra: Record<string, ScatterPoint[]> = {};
  for (const p of points) {
    if (p[metric.key] === undefined) continue;
    (byEra[p.era] ||= []).push(p);
  }

  const sortedRanking = [...points]
    .filter((p) => p[metric.key] !== undefined)
    .sort((a, b) => (b[metric.key] as number) - (a[metric.key] as number));

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2">
        {metrics.map((m) => (
          <button
            key={m.key}
            onClick={() => setMetricKey(m.key)}
            className={`text-xs uppercase tracking-wider px-3 py-1.5 rounded border transition-colors ${
              metricKey === m.key
                ? "bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100"
                : "border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-500"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="h-96 w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 16, right: 24, bottom: 24, left: 16 }}>
            <CartesianGrid stroke="#e4e4e7" strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="year"
              domain={["dataMin - 2", "dataMax + 2"]}
              tickCount={10}
              stroke="#71717a"
              fontSize={11}
              label={{ value: "year", position: "insideBottom", offset: -8, fill: "#71717a", fontSize: 11 }}
            />
            <YAxis
              type="number"
              dataKey={metric.key}
              stroke="#71717a"
              fontSize={11}
              label={{ value: `${metric.label} (${metric.unit})`, angle: -90, position: "insideLeft", fill: "#71717a", fontSize: 11 }}
            />
            <Tooltip content={<CarTooltip metric={metric} />} cursor={{ strokeDasharray: "3 3" }} />
            {metric.reg2025 !== undefined ? (
              <ReferenceLine
                y={metric.reg2025}
                stroke="#dc2626"
                strokeDasharray="4 3"
                strokeWidth={1.2}
              >
                <Label
                  value={`2025 ${metric.regKind === "min" ? "min" : "max"}: ${metric.reg2025} ${metric.unit}`}
                  position="insideTopLeft"
                  fill="#dc2626"
                  fontSize={10}
                />
              </ReferenceLine>
            ) : null}
            {metric.reg2026 !== undefined ? (
              <ReferenceLine
                y={metric.reg2026}
                stroke="#10b981"
                strokeDasharray="4 3"
                strokeWidth={1.2}
              >
                <Label
                  value={`2026 ${metric.regKind === "min" ? "min" : "max"}: ${metric.reg2026} ${metric.unit}`}
                  position="insideBottomLeft"
                  fill="#10b981"
                  fontSize={10}
                />
              </ReferenceLine>
            ) : null}
            {Object.entries(byEra).map(([era, eraPoints]) => (
              <Scatter
                key={era}
                data={eraPoints}
                fill={eraHex[era] ?? "#a1a1aa"}
                shape="circle"
                isAnimationActive={false}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs mb-10">
        {Object.keys(byEra).map((era) => (
          <div key={era} className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: eraHex[era] ?? "#a1a1aa" }} />
            <span className="text-zinc-600 dark:text-zinc-400">{eraLabel[era] ?? era}</span>
          </div>
        ))}
      </div>

      <section>
        <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-3">
          Ranked by {metric.label.toLowerCase()}
        </h2>
        <ol className="space-y-1">
          {sortedRanking.slice(0, 12).map((p, idx) => (
            <li key={p.id}>
              <Link
                href={`/cars/${p.id}`}
                className="grid grid-cols-12 gap-3 py-1.5 px-2 -mx-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900 text-sm"
              >
                <span className="col-span-1 font-mono text-zinc-500 tabular-nums">{idx + 1}.</span>
                <span className="col-span-2 font-mono text-zinc-500 tabular-nums">{p.year}</span>
                <span className="col-span-6">{p.label}</span>
                <span className="col-span-3 text-right tabular-nums font-medium">
                  {metric.format(p[metric.key] as number)}
                  <span className="text-zinc-500 ml-1 font-normal">{metric.unit}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
