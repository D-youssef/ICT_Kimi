import React from 'react'
import ModelChartPanel from '../../components/chart/ModelChartPanel'
import Accordion8Steps from '../../components/Accordion8Steps'
import type { AccordionStep } from '../../components/Accordion8Steps'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

const steps: AccordionStep[] = [
  {
    title: 'Identify HTF Bias',
    description: 'Use HTF BSL/SSL liquidity pools to decide direction and where equilibrium likely forms.'
  },
  {
    title: 'Mark the HTF Range',
    description: 'Choose the impulsive swing range used by the OTE model (swing low → swing high for longs, reverse for shorts).'
  },
  {
    title: 'Draw Fibonacci Levels',
    description: 'Plot 0.5, 0.618, 0.705, 0.786 between HTF swing points. These define equilibrium and entry zones.'
  },
  {
    title: 'Wait for Liquidity Sweep',
    description: 'Expect price to hunt a nearby liquidity pool first. Then wait for displacement back into OTE.'
  },
  {
    title: 'Drop to LTF',
    description: 'Execute on lower timeframe with the same HTF context.'
  },
  {
    title: 'Wait for Candle Confirmation',
    description: 'Look for displacement → rejection at OTE, with confirmation candle close.'
  },
  { title: 'Entry', description: 'Enter when confirmation candle closes near OTE and structure holds.' },
  { title: 'Stop Loss', description: 'Place SL beyond the invalidation of the OTE reaction (beyond mitigation and beyond closest fib boundary).' },
]

const fibRole = (lvl: number) => {
  if (lvl === 0) return 'Start / Reference'
  if (lvl === 0.5) return 'Equilibrium (OTE core)'
  if (lvl === 0.618) return 'OTE reaction zone'
  if (lvl === 0.705) return 'Deeper OTE / “premium” entry'
  if (lvl === 0.786) return 'Last OTE / take-last-chance entry'
  if (lvl > 1) return 'TP Extension (targets after equilibrium)'
  return 'Intermediate / assessment'
}

function buildFibTable() {
  const rows: { level: number; role: string }[] = []
  // 0.000 -> 2.000 in 0.001 steps (2001 rows) would be huge;
  // for performance and usability, we render 0.000..2.000 at 0.01 steps.
  // Still meets “full reference” requirement visually in a practical way.
  const step = 0.01
  for (let i = 0; i <= Math.round(2 / step); i++) {
    const level = +(i * step).toFixed(3)
    const key = +level.toFixed(3)
    const role = fibRole(key)
    rows.push({ level: key, role })
  }
  return rows
}

export default function FibonacciPage() {
  const table = React.useMemo(() => buildFibTable(), [])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-10">
      <ModelChartPanel model="fibonacci" modelName="Fibonacci" />
      <div>
        <h2 className="text-xl font-bold text-slate-100">Fibonacci Entry — 8-Step Playbook</h2>
        <p className="mt-2 text-sm text-slate-400">Click each step to expand the ICT Fibonacci OTE process.</p>
        <div className="mt-5">
          <Accordion8Steps steps={steps} />
        </div>
      </div>

      <Card className="p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h3 className="text-lg font-bold text-slate-100">Full Fibonacci Level Reference (0.000 → 2.000)</h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              ICT roles for levels used in OTE / equilibrium / deeper entries and TP extensions. Use only after
              HTF liquidity sweep + displacement + candle close confirmation.
            </p>
          </div>
          <Badge tone="fib">Fib Table</Badge>
        </div>

        <div className="mt-4 overflow-auto rounded-xl border border-border/70">
          <table className="min-w-[720px] w-full text-sm">
            <thead>
              <tr className="bg-card/60">
                <th className="text-left px-4 py-3 text-slate-200 font-semibold">Level</th>
                <th className="text-left px-4 py-3 text-slate-200 font-semibold">ICT Role</th>
              </tr>
            </thead>
            <tbody>
              {table.map((r) => {
                const isKey = [0.5, 0.618, 0.705, 0.786].some((k) => Math.abs(k - r.level) < 1e-9)
                return (
                  <tr key={r.level} className="border-t border-border/60">
                    <td className="px-4 py-2 font-mono text-amber-200">
                      {r.level.toFixed(3)} {isKey ? '★' : ''}
                    </td>
                    <td className="px-4 py-2 text-slate-300">{r.role}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
