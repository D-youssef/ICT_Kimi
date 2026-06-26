import React from 'react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

type Tone = 'bullish' | 'bearish' | 'neutral'

function PatternSvg({ tone }: { tone: Tone }) {
  const stroke = tone === 'bullish' ? '#10b981' : tone === 'bearish' ? '#ef4444' : '#f59e0b'
  return (
    <svg width="220" height="120" viewBox="0 0 220 120" className="w-full h-auto">
      {/* hand-drawn-ish grid */}
      {Array.from({ length: 5 }).map((_, i) => (
        <line
          key={i}
          x1={10}
          y1={20 + i * 18}
          x2={210}
          y2={20 + i * 18}
          stroke="rgba(30,45,74,0.35)"
          strokeDasharray={i % 2 === 0 ? '4 5' : undefined}
        />
      ))}
      {/* candlestick-like illustration */}
      <g transform="translate(0,0)">
        <line x1="60" y1="90" x2="60" y2="30" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        <rect x="46" y="60" width="28" height="20" rx="6" fill={stroke} opacity="0.9" />
        <line x1="120" y1="92" x2="120" y2="28" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        <rect x="107" y="62" width="26" height="20" rx="6" fill={stroke} opacity="0.65" />
        <line x1="165" y1="96" x2="165" y2="42" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        <rect x="155" y="70" width="20" height="18" rx="6" fill={stroke} opacity="0.8" />
      </g>
    </svg>
  )
}

function Check({ ok }: { ok: boolean }) {
  return (
    <span className={ok ? 'text-green-300' : 'text-slate-500'}>
      {ok ? '✓' : '—'}
    </span>
  )
}

type Pattern = {
  key: string
  name: string
  tone: Tone
  description: string
  features: string[]
  confirms: string[]
}

const patterns: Pattern[] = [
  {
    key: 'bull-engulf',
    name: 'Bullish Engulfing',
    tone: 'bullish',
    description: 'Strong reversal where bullish body fully engulfs prior bearish body.',
    features: ['Bigger bullish body', 'Reversal location (liquidity)', 'Candle CLOSE confirmation'],
    confirms: ['FVG', 'Order Block']
  },
  {
    key: 'bear-engulf',
    name: 'Bearish Engulfing',
    tone: 'bearish',
    description: 'Strong reversal where bearish body fully engulfs prior bullish body.',
    features: ['Bigger bearish body', 'Reversal location (liquidity)', 'Candle CLOSE confirmation'],
    confirms: ['FVG', 'Order Block']
  },
  {
    key: 'bull-pin',
    name: 'Bullish Pin Bar (Hammer)',
    tone: 'bullish',
    description: 'Long lower wick shows rejection below; bullish close implies acceptance.',
    features: ['Long wick lower', 'Small upper wick', 'Close back above level'],
    confirms: ['FVG', 'CISD', 'Fib']
  },
  {
    key: 'bear-pin',
    name: 'Bearish Pin Bar (Shooting Star)',
    tone: 'bearish',
    description: 'Long upper wick shows rejection above; bearish close implies acceptance.',
    features: ['Long wick upper', 'Small lower wick', 'Close back below level'],
    confirms: ['FVG', 'CISD', 'Fib']
  },
  {
    key: 'bull-mss',
    name: 'Bullish MSS (Market Structure Shift)',
    tone: 'bullish',
    description: 'Break of structure to the upside + follow-through indicates state change.',
    features: ['CHOCH/MSS trigger', 'Displacement follow-through', 'HTF confluence'],
    confirms: ['CISD']
  },
  {
    key: 'bear-mss',
    name: 'Bearish MSS (Market Structure Shift)',
    tone: 'bearish',
    description: 'Break of structure to the downside + displacement follow-through indicates state change.',
    features: ['CHOCH/MSS trigger', 'Displacement follow-through', 'HTF confluence'],
    confirms: ['CISD']
  },
  {
    key: 'bull-displacement',
    name: 'Bullish Displacement Candle',
    tone: 'bullish',
    description: 'Large bullish candle often creates FVG and signals expansion.',
    features: ['Large body', 'Stops clearing', 'Creates inefficiency (FVG)'],
    confirms: ['FVG', 'CISD']
  },
  {
    key: 'bear-displacement',
    name: 'Bearish Displacement Candle',
    tone: 'bearish',
    description: 'Large bearish candle signals expansion and often creates FVG.',
    features: ['Large body', 'Stops clearing', 'Creates inefficiency (FVG)'],
    confirms: ['FVG', 'CISD']
  },
  {
    key: 'doji',
    name: 'Doji / Indecision',
    tone: 'neutral',
    description: 'Shows indecision; use with context (liquidity and next displacement).',
    features: ['Small body', 'Wicks both sides', 'Wait for next confirmation'],
    confirms: ['All (weak alone)']
  },
  {
    key: 'morning',
    name: 'Morning Star (3-candle)',
    tone: 'bullish',
    description: 'Reversal pattern: bearish candle → small indecision → bullish confirmation.',
    features: ['Positioning near liquidity', 'Middle candle indecision', 'Confirmation candle CLOSE'],
    confirms: ['Order Block', 'Fib']
  },
  {
    key: 'evening',
    name: 'Evening Star (3-candle)',
    tone: 'bearish',
    description: 'Reversal pattern: bullish candle → small indecision → bearish confirmation.',
    features: ['Positioning near liquidity', 'Middle candle indecision', 'Confirmation candle CLOSE'],
    confirms: ['Order Block', 'Fib']
  },
  {
    key: 'inside-bar',
    name: 'Inside Bar',
    tone: 'neutral',
    description: 'Compression; breaks with displacement give entry confirmation.',
    features: ['Contained range', 'Break + close required', 'Best after liquidity'],
    confirms: ['FVG (setup)']
  }
]

function toneToBadgeTone(tone: Tone) {
  if (tone === 'bullish') return 'bullish'
  if (tone === 'bearish') return 'bearish'
  return 'neutral'
}

export default function CandlePatternsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-10">
      <header>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">Candle Patterns Library</h1>
        <p className="mt-3 text-slate-300 max-w-3xl leading-relaxed">
          Each pattern below includes a hand-drawn SVG reference, key features, and which ICT models it confirms.
          Always wait for candle CLOSE confirmation (not just wicks).
        </p>
      </header>

      <section className="rounded-2xl border border-border/70 bg-card/40 p-6">
        <div className="flex items-start gap-4">
          <div className="mt-1 w-10 h-10 rounded-xl border border-border/70 bg-card/60 flex items-center justify-center">
            <span className="text-2xl">📌</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Golden Rule: Candle CLOSE confirmation</h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              ICT entries are validated by the candle close that accepts/rejects price at the level (FVG / OB / CISD / OTE).
              A wick probe alone is not a confirmation.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-100">Patterns (12)</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {patterns.map((p) => (
            <Card key={p.key} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm text-slate-400">Pattern</div>
                  <div className="mt-1 text-lg font-bold text-slate-100">{p.name}</div>
                </div>
                <Badge tone={toneToBadgeTone(p.tone)}>{p.tone.toUpperCase()}</Badge>
              </div>

              <div className="mt-4">
                <PatternSvg tone={p.tone} />
              </div>

              <p className="mt-3 text-sm text-slate-300 leading-relaxed">{p.description}</p>

              <div className="mt-3">
                <div className="text-sm font-semibold text-slate-200">Key Features</div>
                <ul className="mt-2 space-y-1 text-sm text-slate-300">
                  {p.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check ok={true} /> <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <div className="text-sm font-semibold text-slate-200">Confirms ICT Models</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.confirms.map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1 rounded-full border border-border/70 bg-card/60 text-xs text-slate-200"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-slate-100">How to Use (Correct Process)</h2>
          <ol className="mt-4 space-y-2 text-sm text-slate-300 list-decimal ml-6">
            <li>Mark HTF liquidity pools (BSL/SSL) and HTF bias.</li>
            <li>On LTF, wait for sweep + displacement (create inefficiency / state change).</li>
            <li>Draw FVG / OB / CISD / OTE (your mitigation zone).</li>
            <li>Wait for the relevant candle pattern at the zone.</li>
            <li>Enter only after the candle CLOSE confirms acceptance/rejection.</li>
            <li>Set SL beyond invalidation and TP to next liquidity pool.</li>
          </ol>

          <div className="mt-4 text-sm text-slate-400">
            Common mistake: entering on wick-only touches—ICT requires the CLOSE.
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold text-slate-100">Confluence Matrix (Pattern Strength)</h2>
          <div className="mt-4 overflow-auto rounded-xl border border-border/70">
            <table className="min-w-[520px] w-full text-sm">
              <thead>
                <tr className="bg-card/60">
                  <th className="text-left px-4 py-3 text-slate-200 font-semibold">Pattern</th>
                  <th className="text-left px-4 py-3 text-slate-200 font-semibold">FVG</th>
                  <th className="text-left px-4 py-3 text-slate-200 font-semibold">CISD</th>
                  <th className="text-left px-4 py-3 text-slate-200 font-semibold">Fib</th>
                  <th className="text-left px-4 py-3 text-slate-200 font-semibold">OB</th>
                </tr>
              </thead>
              <tbody>
                {patterns.map((p) => {
                  const score = (model: string) => {
                    if (p.confirms.includes('All (weak alone)')) return model === 'FVG' ? 2 : 1
                    if (p.confirms.some((c) => c.toLowerCase().includes(model.toLowerCase()))) return 3
                    if (p.confirms.some((c) => c.toLowerCase().includes('weak'))) return 1
                    // heuristics
                    if (model === 'FVG' && p.key.includes('engulf')) return 2
                    return 1
                  }
                  return (
                    <tr key={p.key} className="border-t border-border/60">
                      <td className="px-4 py-2 text-slate-200">{p.name}</td>
                      {(['FVG', 'CISD', 'Fib', 'OB'] as const).map((m) => {
                        const s = score(m)
                        return (
                          <td key={m} className="px-4 py-2 text-slate-300">
                            {'★'.repeat(s)}{' '}
                            <span className="text-slate-500">{'☆'.repeat(Math.max(0, 3 - s))}</span>
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-3 text-xs text-slate-500">★ ratings are educational heuristics for confluence strength.</div>
        </Card>
      </section>
    </div>
  )
}
