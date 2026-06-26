import React from 'react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { Link } from 'react-router-dom'

const entryModels = [
  { to: '/fvg', title: 'FVG', color: 'fvg', desc: 'Fair Value Gap entry after displacement + pullback.' },
  { to: '/cisd', title: 'CISD', color: 'cisd', desc: 'Change in state levels after MSS + mitigation.' },
  { to: '/fibonacci', title: 'Fibonacci', color: 'fib', desc: 'OTE equilibrium targeting using 0.5–0.786.' },
  { to: '/order-block', title: 'Order Block', color: 'ob', desc: 'Last institutional candle before displacement.' }
] as const

function KillZoneCard({ title, time }: { title: string; time: string }) {
  return (
    <div className="rounded-xl border border-border/70 bg-card/60 p-4">
      <div className="text-sm font-semibold text-slate-100">{title}</div>
      <div className="mt-1 text-sm text-slate-300">{time}</div>
      <div className="mt-2 text-xs text-slate-400">Plan trades around liquidity + reactions.</div>
    </div>
  )
}

export default function OverviewPage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <section className="pt-10 pb-10">
        <div className="rounded-2xl border border-border/70 bg-card/40 p-6 sm:p-10 shadow-[0_0_0_1px_rgba(30,45,74,0.25)]">
          <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex flex-wrap gap-3 items-center">
                <Badge tone="neutral">Smart Money Concepts</Badge>
                <span className="text-xs text-slate-400">Dark-themed ICT Education Dashboard</span>
              </div>

              <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
                Inner Circle Trader Journal —{' '}
                <span className="text-blue-300">Smart Money Trade Journal</span>
              </h1>

              <p className="mt-4 text-slate-300 leading-relaxed">
                Learn AMD cycle behavior (Accumulation → Manipulation → Distribution), apply HTF→LTF mapping,
                validate setups with candle close confirmation, and log each trade with a disciplined risk plan.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/checklist" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-500/15 border border-blue-500/40 hover:bg-blue-500/25 transition text-blue-200 font-semibold">
                  Run Pre-Trade Checklist
                </Link>
                <Link to="/candle-patterns" className="inline-flex items-center px-4 py-2 rounded-lg bg-card/60 border border-border/70 hover:bg-card/80 transition text-slate-200 font-semibold">
                  Candle Patterns Library
                </Link>
              </div>
            </div>

            <div className="lg:w-[360px]">
              <Card className="p-5">
                <div className="text-sm text-slate-400">What you’ll practice</div>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  <li>• HTF bias → LTF execution</li>
                  <li>• Liquidity pools + sweeps</li>
                  <li>• FVG/OB/CISD/Fib entry mapping</li>
                  <li>• MSS + displacement + pullback</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3 pb-10">
        <Card className="p-5 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-100">Accumulation</div>
            <Badge tone="bullish">AMD</Badge>
          </div>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Price builds positions near HTF liquidity. Wait for manipulation signals before committing.
          </p>
          <div className="mt-3 space-y-2 text-xs text-slate-400">
            <div>✓ Identify HTF liquidity pools</div>
            <div>✓ Watch for MSS attempt (but don’t chase)</div>
          </div>
        </Card>

        <Card className="p-5 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-100">Manipulation</div>
            <Badge tone="neutral">Sweep</Badge>
          </div>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Likely stop-hunt. Expect liquidity grabs + displacement. The setup is born here.
          </p>
          <div className="mt-3 space-y-2 text-xs text-slate-400">
            <div>✓ Confirm sweep (wick + reclaim)</div>
            <div>✓ Mark displacement candle range</div>
          </div>
        </Card>

        <Card className="p-5 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-100">Distribution</div>
            <Badge tone="bearish">Run</Badge>
          </div>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            After state change, price moves to next liquidity pools. Entry is after pullback.
          </p>
          <div className="mt-3 space-y-2 text-xs text-slate-400">
            <div>✓ Drop to LTF & wait for confirmation close</div>
            <div>✓ Use R:R discipline (target 1:2+)</div>
          </div>
        </Card>
      </section>

      <section className="pb-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-xl font-bold text-slate-100">Entry Models</h2>
          <div className="text-sm text-slate-400">Click to open the full lesson page + annotated charts.</div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {entryModels.map((m) => (
            <Link key={m.to} to={m.to} className="group">
              <Card className="p-5 transition hover:shadow-[0_0_0_1px_rgba(30,45,74,0.25),0_0_24px_rgba(59,130,246,0.16)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm text-slate-400">Model</div>
                    <div className="mt-1 text-2xl font-extrabold text-slate-100">{m.title}</div>
                    <p className="mt-2 text-sm text-slate-300 leading-relaxed">{m.desc}</p>
                  </div>
                  <Badge tone={m.color as any}>Entry</Badge>
                </div>
                <div className="mt-4 text-sm font-semibold text-blue-200 opacity-90 group-hover:opacity-100 transition">
                  Open →
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="pb-10">
        <h2 className="text-xl font-bold text-slate-100">Trading Sessions</h2>
        <div className="mt-3 text-sm text-slate-400">Kill Zones (commonly referenced in ICT education)</div>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <KillZoneCard title="Asian Range" time="00:00–06:00" />
          <KillZoneCard title="London KZ" time="07:00–10:00" />
          <KillZoneCard title="NY AM KZ" time="08:30–11:00" />
          <KillZoneCard title="NY PM KZ" time="13:00–16:00" />
        </div>
      </section>

      <section className="pb-10">
        <h2 className="text-xl font-bold text-slate-100">Key ICT Concepts Grid</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card className="p-5">
            <div className="text-sm font-semibold text-slate-100">BSL/SSL Liquidity Pools</div>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Build and Sweep Liquidity: expect stop runs into buy-side/sell-side levels.
            </p>
          </Card>
          <Card className="p-5">
            <div className="text-sm font-semibold text-slate-100">HTF → LTF Framework</div>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Map bias on higher timeframes, execute on the lower timeframe.
            </p>
          </Card>
          <Card className="p-5">
            <div className="text-sm font-semibold text-slate-100">Invalidation</div>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              When structure fails or mitigation zone is reclaimed, your plan is invalid.
            </p>
          </Card>
          <Card className="p-5">
            <div className="text-sm font-semibold text-slate-100">ICT Entry Rules</div>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Wait for displacement + pullback + candle close confirmation.
            </p>
          </Card>
        </div>
      </section>
    </div>
  )
}
