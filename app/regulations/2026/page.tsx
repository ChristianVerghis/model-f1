import Link from "next/link";
import { currentRegs, incomingRegs } from "@/data/currentRegs";

type Change = {
  area: string;
  headline: string;
  from: string;
  to: string;
  delta: string;
  what: string;
  opportunity: string;
};

const changes: Change[] = [
  {
    area: "Active aero",
    headline: "Moveable bodywork returns after 57 years",
    from: "DRS only — rear-wing flap, designated zones",
    to: "Front and rear wings morph between high-downforce (Z) and low-drag (X) modes anywhere on track",
    delta: "biggest aero discontinuity since 1983",
    what:
      "FIA banned moveable bodywork in 1969 after high-wing failures. DRS arrived in 2011 as a single narrow exception. 2026 reverses that 57-year stance and lets both wings actively change shape on every straight.",
    opportunity:
      "Whichever team builds the most efficient morph (low drag penalty in X-mode, fastest transition back to Z) gets a permanent qualifying-and-race advantage. Mechanically reliable wing actuators become an IP race — and the cars now spend less time on aero-loaded corners, which shifts the optimization away from pure peak downforce.",
  },
  {
    area: "Power unit · MGU-H",
    headline: "MGU-H removed — turbo lag returns",
    from: "Unlimited heat-energy harvest from turbine, used to spool turbo + charge battery",
    to: "No MGU-H — turbo runs conventionally, lag must be solved mechanically or via MGU-K pre-spool",
    delta: "biggest powertrain reset since 2014",
    what:
      "Since 2014 every Mercedes/Ferrari/Honda/Renault PU has had a motor-generator on the turbocharger shaft. Removing it cuts a major IP moat, kills 5-7 years of accumulated thermal-mapping expertise, and brings back the off-throttle hesitation that defined the late-80s turbo cars.",
    opportunity:
      "Pre-spool strategies will define the first 2-3 years. Options: electric e-boost via the clutched compressor, variable-geometry turbines (still under technical debate), or aggressive launch maps from the much-larger MGU-K. A team that gets meaningful boost at 5,000 rpm wins.",
  },
  {
    area: "Power unit · MGU-K",
    headline: "MGU-K nearly tripled to 350 kW",
    from: `${currentRegs.limits.mguKPowerKW} kW`,
    to: `${incomingRegs.limits.mguKPowerKW} kW`,
    delta: `+${(incomingRegs.limits.mguKPowerKW as number) - (currentRegs.limits.mguKPowerKW as number)} kW (+192%)`,
    what:
      "MGU-K goes from a recovery-system afterthought (161 hp) to roughly half the total power output (470 hp). ICE drops from ~750 to ~540 hp. The car becomes 50/50 electric/combustion on deployment.",
    opportunity:
      "Battery thermal management becomes the critical chassis discipline. Sustained 350 kW draw over a lap will boil cells without aggressive cooling — and cooling drag costs lap time. The team that packages the smallest battery cooling system without throttling on hot races wins.",
  },
  {
    area: "Energy store",
    headline: "Battery deployment doubles to 8+ MJ/lap",
    from: `${currentRegs.limits.batteryDeploymentMJ} MJ/lap`,
    to: `${incomingRegs.limits.batteryDeploymentMJ}+ MJ/lap`,
    delta: "100% more deployable energy",
    what:
      "The Energy Store can release at least twice as much energy per lap. Combined with the tripled MGU-K, that means much longer sustained electric assist — but every joule deployed has to be recovered, and without MGU-H, recovery options narrow to MGU-K under braking only.",
    opportunity:
      "Lap-mapping and recovery-vs-deployment optimization becomes the dominant strategy variable. Tracks with short braking zones (Monza, Spa Eau Rouge) will see deployment-limited laps; tracks with heavy braking (Singapore, Hungary) will be deployment-free. Strategy software, not driver decisions, owns this.",
  },
  {
    area: "Fuel",
    headline: "100% sustainable fuel mandate",
    from: "Conventional gasoline (E10 spec)",
    to: "100% drop-in sustainable fuel (synthetic + bio components)",
    delta: "all fuel sourced sustainably",
    what:
      "Energy density is 5-8% lower than gasoline. Cold-start behavior, octane mapping, combustion timing all shift. Fuel mass per race drops to ~70 kg from ~110 kg historically (combined with the smaller engine demand).",
    opportunity:
      "Whoever builds the combustion map best tuned for sustainable fuel chemistry wins free thermal efficiency. This is the only domain where ICE engineering still matters — and the PUs that get it right early will have a 5-15 hp ICE advantage that can't be addressed mid-season under the development freeze.",
  },
  {
    area: "Dimensions",
    headline: "Cars shrink for the first time in 30 years",
    from: `${currentRegs.limits.widthMm} mm wide · ${currentRegs.limits.wheelbaseMm} mm wheelbase · ${currentRegs.limits.weightKg} kg min`,
    to: `${incomingRegs.limits.widthMm} mm wide · ${incomingRegs.limits.wheelbaseMm} mm wheelbase · ${incomingRegs.limits.weightKg} kg min`,
    delta: "−100 mm width, −200 mm wheelbase, −32 kg min weight",
    what:
      "First mandated dimensional shrink since 1998 (and the first weight reduction since the late 90s). Cars become 5% narrower, 6% shorter in wheelbase, and 4% lighter. Designed to recover the responsiveness lost to two decades of safety-driven weight gain.",
    opportunity:
      "Teams that pack their car closest to the new envelope get the most aero-surface-to-frontal-area benefit. Mercedes' 2018-2021 long-wheelbase concept becomes infeasible. Suspension geometry — narrower track, shorter base — needs a clean-sheet redesign; teams that try to carry over 2025 geometry will be slower than ones that don't.",
  },
  {
    area: "Cost cap",
    headline: "Technical cap jumps to $215M",
    from: `$${currentRegs.limits.costCapTechnicalMUSD}M technical + $${currentRegs.limits.costCapPowerUnitMUSD}M PU`,
    to: `$${incomingRegs.limits.costCapTechnicalMUSD}M technical + $${incomingRegs.limits.costCapPowerUnitMUSD}M PU`,
    delta: "+$80M technical, +$35M PU",
    what:
      "The jump is mostly absorbed by previously-excluded categories now being inside the cap (CapEx depreciation, marketing-affected R&D, etc.). Net effective spend rises by ~10-15%, not 60%.",
    opportunity:
      "Aerodynamic Testing Restrictions still apply — the constructor finishing 1st gets ~70% of baseline tunnel hours, last gets ~115%. In a clean-sheet regulation reset year, that handicap means leading teams arrive at testing with less iteration time. McLaren's late-cycle 2024 rise was the proof of concept; 2026 amplifies it.",
  },
];

export default function Regs2026Page() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 w-full">
      <Link href="/regulations" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
        ← all regulations
      </Link>

      <header className="mt-6 pb-8 border-b border-zinc-200 dark:border-zinc-800">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">2026</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Seven changes, and what each one opens up.
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          The 2026 reset is the largest single-year regulation discontinuity since 2014 — and
          arguably since 1983. Below: each change, what it does, and where the design opportunity sits.
        </p>
      </header>

      <ol className="mt-10 space-y-12">
        {changes.map((c, i) => (
          <li key={c.area}>
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-mono text-sm text-zinc-400 tabular-nums">{(i + 1).toString().padStart(2, "0")}</span>
              <p className="text-xs uppercase tracking-wider text-zinc-500">{c.area}</p>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">{c.headline}</h2>
            <p className="mt-2 text-sm text-zinc-500 italic">{c.delta}</p>

            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              <div className="rounded border border-zinc-200 dark:border-zinc-800 px-4 py-3">
                <p className="text-[10px] uppercase tracking-wider text-zinc-500">From (2025)</p>
                <p className="mt-1 text-sm">{c.from}</p>
              </div>
              <div className="rounded border border-emerald-200 dark:border-emerald-900 bg-emerald-50/40 dark:bg-emerald-950/20 px-4 py-3">
                <p className="text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-300">To (2026)</p>
                <p className="mt-1 text-sm">{c.to}</p>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs uppercase tracking-wider text-zinc-500 mb-1">What it does</p>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{c.what}</p>
            </div>

            <div className="mt-4 rounded border-l-2 border-amber-400 bg-amber-50/40 dark:bg-amber-950/20 px-4 py-3">
              <p className="text-xs uppercase tracking-wider text-amber-700 dark:text-amber-300 mb-1">
                Design opportunity
              </p>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{c.opportunity}</p>
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
        <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-3">
          The compound bet
        </h2>
        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
          Each change above is large alone. Taken together, they cut almost every accumulated source of
          IP from the hybrid V6 decade: MGU-H expertise gone, aero around a different car size, electric
          power dominates over ICE, fuel chemistry changes. A team that&apos;s been winning by refining
          known answers (Red Bull&apos;s 2022-23 dominance, Mercedes&apos; 2014-21 dynasty) has the most
          to lose. A team that&apos;s been losing by lacking iteration time (Audi entering, Williams
          rebuilding, Cadillac arriving) has the most to gain.
        </p>
      </section>
    </main>
  );
}
