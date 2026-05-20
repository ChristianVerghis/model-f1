import { powerUnits } from "@/data/powerunits";

export default function PowerUnitsPage() {
  const sorted = [...powerUnits].sort((a, b) => a.year - b.year);

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 w-full">
      <header className="mb-10 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Power Units</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          The hybrid V6 decade.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          Every modern F1 power unit is a 1.6L V6 turbo with two electric motor-generators
          (MGU-K, MGU-H), an Energy Store, and a 100 kg/h fuel-flow ceiling. The differences
          between them are combustion efficiency, deployment strategy, and reliability.
        </p>
      </header>

      <section>
        <ol className="space-y-6">
          {sorted.map((pu) => (
            <li
              key={pu.id}
              className="grid grid-cols-12 gap-6 py-5 border-b border-zinc-100 dark:border-zinc-900"
            >
              <div className="col-span-2">
                <p className="font-mono text-2xl tabular-nums">{pu.year}</p>
                <p className="text-xs uppercase tracking-wider text-zinc-500 mt-1">
                  {pu.manufacturer}
                </p>
              </div>
              <div className="col-span-10">
                <h3 className="text-lg font-medium">{pu.name}</h3>
                <p className="text-sm text-zinc-500 mt-0.5">{pu.iceConfig}</p>

                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <Stat label="Total power" value={`${pu.estimatedTotalHp} hp`} />
                  <Stat label="MGU-K" value={`${pu.mguKPowerKW} kW`} />
                  <Stat label="Battery deploy" value={`${pu.energyStoreDeploymentMJ} MJ/lap`} />
                  <Stat label="Fuel flow" value={`${pu.iceFuelFlowKgH} kg/h`} />
                  <Stat label="Max RPM" value={`${pu.iceMaxRpm.toLocaleString()}`} />
                  <Stat
                    label="MGU-H regs"
                    value={pu.mguHUnlimited ? "unlimited harvest" : "limited"}
                  />
                  {pu.estimatedThermalEfficiency ? (
                    <Stat
                      label="Thermal η"
                      value={`${Math.round(pu.estimatedThermalEfficiency * 100)}%`}
                    />
                  ) : null}
                </div>

                <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">{pu.notes}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12 rounded border border-zinc-200 dark:border-zinc-800 p-5 text-sm text-zinc-600 dark:text-zinc-400">
        <p className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">2026 reset</p>
        <p>
          MGU-H removed. MGU-K power increased from 120 kW (161 hp) to 350 kW (~470 hp).
          ICE drops to roughly 540 hp under the new fuel-energy cap. 100% sustainable fuel.
          The car becomes roughly 50/50 ICE/electric on deployment.
        </p>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-zinc-500">{label}</p>
      <p className="mt-0.5 tabular-nums">{value}</p>
    </div>
  );
}
