"use client";

import {
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AeroEraSpan, Regulation } from "@/data/regulations";

type DataPoint = {
  year: number;
  enginePowerHp: number;
  weightKg: number;
  powerToWeight: number;
  label: string;
};

type Props = {
  data: DataPoint[];
  regulations: Regulation[];
  aeroEras: AeroEraSpan[];
};

const eraFill: Record<string, string> = {
  "ground-effect-skirts": "#fef3c7",
  "flat-bottom": "#e0e7ff",
  "stepped-floor": "#fce7f3",
  "blown-diffuser": "#fee2e2",
  "hybrid-v6": "#dcfce7",
  "ground-effect-return": "#cffafe",
};

function CarTooltip({ active, payload, dataKey, unit }: {
  active?: boolean;
  payload?: Array<{ payload: DataPoint; value: number }>;
  dataKey: keyof DataPoint;
  unit: string;
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  const value = payload[0].value;
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-xs shadow">
      <p className="font-medium">{point.label}</p>
      <p className="text-zinc-500 mt-0.5 font-mono">
        {point.year} · {value.toFixed(dataKey === "powerToWeight" ? 2 : 0)} {unit}
      </p>
    </div>
  );
}

function ChartFrame({
  title,
  data,
  dataKey,
  unit,
  aeroEras,
  regulations,
  domain,
}: {
  title: string;
  data: DataPoint[];
  dataKey: "enginePowerHp" | "weightKg" | "powerToWeight";
  unit: string;
  aeroEras: AeroEraSpan[];
  regulations: Regulation[];
  domain?: [number, number];
}) {
  const xDomain: [number, number] = [
    Math.min(...data.map((d) => d.year)) - 2,
    Math.max(...data.map((d) => d.year)) + 2,
  ];
  return (
    <div className="mb-12">
      <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-3">{title}</h3>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 16, right: 16, bottom: 8, left: 8 }}>
            {aeroEras.map((era) => (
              <ReferenceArea
                key={era.era}
                x1={Math.max(era.startYear, xDomain[0])}
                x2={Math.min(era.endYear, xDomain[1])}
                fill={eraFill[era.era] ?? "#f4f4f5"}
                fillOpacity={0.35}
                stroke="none"
                ifOverflow="hidden"
              />
            ))}
            {regulations.map((r) => (
              <ReferenceLine
                key={r.year + r.title}
                x={r.year}
                stroke="#a1a1aa"
                strokeDasharray="2 3"
                strokeWidth={1}
              />
            ))}
            <XAxis
              dataKey="year"
              type="number"
              domain={xDomain}
              tickFormatter={(v) => String(v)}
              stroke="#71717a"
              fontSize={11}
            />
            <YAxis stroke="#71717a" fontSize={11} domain={domain} />
            <Tooltip content={<CarTooltip dataKey={dataKey} unit={unit} />} />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#dc2626"
              strokeWidth={2}
              dot={{ r: 4, fill: "#dc2626" }}
              activeDot={{ r: 6 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function TimelineCharts({ data, regulations, aeroEras }: Props) {
  return (
    <>
      <ChartFrame
        title="Engine power (hp)"
        data={data}
        dataKey="enginePowerHp"
        unit="hp"
        aeroEras={aeroEras}
        regulations={regulations}
      />
      <ChartFrame
        title="Minimum weight (kg)"
        data={data}
        dataKey="weightKg"
        unit="kg"
        aeroEras={aeroEras}
        regulations={regulations}
      />
      <ChartFrame
        title="Power-to-weight (hp/kg)"
        data={data}
        dataKey="powerToWeight"
        unit="hp/kg"
        aeroEras={aeroEras}
        regulations={regulations}
      />
    </>
  );
}
