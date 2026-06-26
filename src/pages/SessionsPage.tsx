import React from 'react'
import Card from '../components/ui/Card'

type Session = {
  key: 'Asian' | 'London KZ' | 'NY AM KZ' | 'NY PM KZ'
  time: string
  summary: string
  dos: string[]
  donts: string[]
}

const sessions: Session[] = [
  {
    key: 'Asian',
    time: '00:00–06:00',
    summary: 'Range building. Look for liquidity at extremes and prepare HTF bias.',
    dos: ['Mark BSL/SSL in range', 'Wait for sweep + displacement', 'Map where London will likely react'],
    donts: ['Chase the first breakout', 'Enter without candle CLOSE acceptance']
  },
  {
    key: 'London KZ',
    time: '07:00–10:00',
    summary: 'Most common liquidity migration. Expect stop hunts then displacement.',
    dos: ['Watch for MSS attempt', 'Mark FVG/OB/CISD after sweep', 'Drop to LTF for precision'],
    donts: ['Trade mid-range', 'Enter on wick-only touches']
  },
  {
    key: 'NY AM KZ',
    time: '08:30–11:00',
    summary: 'Continuation/expansion window. Best for confirming state change.',
    dos: ['Look for displacement candle', 'Use candle close confirmation', 'Confirm confluence with checklist'],
    donts: ['Ignore invalidation conditions', 'Overtrade during low liquidity']
  },
  {
    key: 'NY PM KZ',
    time: '13:00–16:00',
    summary: 'End-of-day liquidity. Look for last sweeps before deeper moves.',
    dos: ['Target remaining liquidity pools', 'Manage R:R discipline', 'Use HTF context to avoid traps'],
    donts: ['Assume trend will persist', 'Risk without clear SL invalidation']
  }
]

function TimelineBar() {
  // 24h scale mapped to positions (0..24 -> 0..100%)
  // approximate: Asian 0-6, London 7-10, NY AM 8.5-11, NY PM 13-16
  return (
    <div className="rounded-2xl border border-border/70 bg-card/50 p-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <div className="text-sm font-semibold text-slate-200">Session Timeline (24h scale)</div>
          <div className="mt-1 text-xs text-slate-400">Kill Zones overlap sometimes; education is about precision.</div>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <div className="relative h-10 rounded-xl border border-border/70 bg-[#060d1a] overflow-hidden">
          {/* baseline */}
          <div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0" />
          {/* bars */}
          <div
            className="absolute top-1 bottom-1 rounded-md bg-blue-500/20 border border-blue-500/40"
            style={{ left: '0%', width: `${(6 / 24) * 100}%` }}
            title="Asian"
          />
          <div
            className="absolute top-1 bottom-1 rounded-md bg-fuchsia-500/15 border border-fuchsia-400/30"
            style={{ left: `${(7 / 24) * 100}%`, width: `${((10 - 7) / 24) * 100}%` }}
            title="London KZ"
          />
          <div
            className="absolute top-1 bottom-1 rounded-md bg-amber-500/15 border border-amber-400/30"
            style={{ left: `${(8.5 / 24) * 100}%`, width: `${((11 - 8.5) / 24) * 100}%` }}
            title="NY AM KZ"
          />
          <div
            className="absolute top-1 bottom-1 rounded-md bg-green-500/15 border border-green-500/30"
            style={{ left: `${(13 / 24) * 100}%`, width: `${((16 - 13) / 24) * 100}%` }}
            title="NY PM KZ"
          />

          {/* hour markers */}
          {Array.from({ length: 25 }).map((_, h) => (
            <div
              key={h}
              className="absolute top-0 bottom-0 w-[1px]"
              style={{ left: `${(h / 24) * 100}%` }}
            >
              <div className="h-full w-px bg-border/60" />
              {h % 3 === 0 && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-slate-500">
                  {String(h).padStart(2, '0')}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          {sessions.map((s, idx) => {
            const className =
              idx === 0
                ? 'bg-blue-500/15 border border-blue-500/40'
                : idx === 1
                  ? 'bg-purple-500/15 border border-purple-500/40'
                  : idx === 2
                    ? 'bg-amber-500/15 border border-amber-500/40'
                    : 'bg-green-500/15 border border-green-500/40'
            return (
              <div key={s.key} className={`rounded-xl p-3 ${className}`}>
                <div className="text-sm font-semibold text-slate-100">{s.key}</div>
                <div className="mt-1 text-xs text-slate-300">{s.time}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function SessionsPage() {
  const macroWindows = [
    '2:33–3:00 AM',
    '8:50–9:10 AM',
    '9:55–10:20 AM',
    '12:55–1:15 PM',
    '3:50–4:15 PM'
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-100">Trading Sessions</h1>
        <p className="text-slate-300 leading-relaxed">
          ICT Kill Zones help you focus liquidity behavior. Always follow candle CLOSE confirmation and your invalidation rules.
        </p>
      </header>

      <TimelineBar />

      <section>
        <div className="text-xl font-bold text-slate-100">Detailed Session Notes</div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {sessions.map((s) => (
            <Card key={s.key} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-slate-200">{s.key}</div>
                  <div className="mt-1 text-sm text-slate-400">{s.time}</div>
                </div>
                <div className="text-xs px-3 py-1 rounded-full border border-border/70 bg-card/60 text-slate-200">
                  Kill Zone
                </div>
              </div>

              <p className="mt-3 text-sm text-slate-300 leading-relaxed">{s.summary}</p>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <div className="text-sm font-semibold text-green-200">DO’s</div>
                  <ul className="mt-2 space-y-1 text-sm text-slate-300">
                    {s.dos.map((d, i) => (
                      <li key={i}>• {d}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-semibold text-red-200">DON’Ts</div>
                  <ul className="mt-2 space-y-1 text-sm text-slate-300">
                    {s.donts.map((d, i) => (
                      <li key={i}>• {d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <Card className="p-6">
          <div className="text-xl font-bold text-slate-100">ICT Macro Kill Zones (20-minute windows)</div>
          <div className="mt-2 text-sm text-slate-400">Use as “watch windows”. Entry only when your model + candle CLOSE confirmation aligns.</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {macroWindows.map((w) => (
              <span key={w} className="px-3 py-2 rounded-xl border border-border/70 bg-card/60 text-sm text-slate-200">
                {w}
              </span>
            ))}
          </div>
        </Card>
      </section>
    </div>
  )
}
