import React, { useMemo } from 'react'
import SvgCandles from './SvgCandles'
import BiasToggle from './BiasToggle'
import { getEntryCandles, getModelMarkers, type ModelBias } from '../../data/ictModels'
import Card from '../ui/Card'
import Badge from '../ui/Badge'

const fibLevelsOnly = [
  { level: 0.5, label: '0.5' },
  { level: 0.618, label: '0.618' },
  { level: 0.705, label: '0.705' },
  { level: 0.786, label: '0.786' }
]

export default function ModelChartPanel({
  model,
  modelName,
  fvgLabel = 'FVG',
  biasDefault = 'bullish'
}: {
  model: 'fvg' | 'cisd' | 'fibonacci' | 'order-block'
  modelName: string
  fvgLabel?: string
  biasDefault?: ModelBias
}) {
  const [bias, setBias] = React.useState<ModelBias>(biasDefault)

  const buyMarkers = useMemo(() => getModelMarkers({ model, bias: 'bullish' }), [model])
  const sellMarkers = useMemo(() => getModelMarkers({ model, bias: 'bearish' }), [model])

  const buyCandles = useMemo(() => getEntryCandles('bullish', model), [model])
  const sellCandles = useMemo(() => getEntryCandles('bearish', model), [model])

  const description =
    model === 'fvg'
      ? 'FVG (Fair Value Gap) targets inefficiencies created by displacement. Entry comes after liquidity sweep + pullback into the gap.'
      : model === 'cisd'
        ? 'CISD (Change In State) uses market structure shift and “state change” levels to define where price transitions.'
        : model === 'fibonacci'
          ? 'Fib OTE framework (0.5–0.786) to locate equilibrium and optimal trade entry zones after HTF liquidity.'
          : 'Order Block (OB) is the last down-up / up-down institutional candle before displacement. Entry waits for reaction inside the OB.'

  const stopLossText = bias === 'bullish' ? 'Below the mitigation zone (OB/FVG/CISD)' : 'Above the mitigation zone (OB/FVG/CISD)'
  const takeProfitText = bias === 'bullish' ? 'Next HTF liquidity pool (sell-side sweep targets)' : 'Next HTF liquidity pool (buy-side sweep targets)'
  const rrText = 'R:R aims 1:2+ (use the checklist to auto-calc)'

  const shouldShowFibTable = model === 'fibonacci'

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Card className="p-5 h-full">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-100">{modelName} Entry Model</h1>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">{description}</p>
              </div>
              <Badge
                tone={model === 'fvg' ? 'fvg' : model === 'cisd' ? 'cisd' : model === 'fibonacci' ? 'fib' : 'ob'}
              >
                Smart Money
              </Badge>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <BiasToggle value={bias} onChange={setBias} />
              <div className="text-xs text-slate-400">
                <div className="font-semibold text-slate-300">Green = bullish, Red = bearish</div>
                <div className="mt-1">Diagrams remain side-by-side; toggle emphasizes your bias.</div>
              </div>
            </div>

            {shouldShowFibTable && (
              <div className="mt-5 rounded-xl border border-border/70 bg-card/40 p-4">
                <div className="text-sm font-semibold text-slate-100">Fib Levels (0.5 / 0.618 / 0.705 / 0.786)</div>
                <div className="mt-2 text-xs text-slate-300 leading-relaxed">
                  Use these for OTE and equilibrium reactions. Price should respect and confirm with candle close.
                </div>
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {fibLevelsOnly.map((l) => (
                    <div key={l.level} className="rounded-lg border border-border/70 bg-card/50 px-3 py-2 text-center">
                      <div className="text-sm font-semibold text-amber-200">{l.label}</div>
                      <div className="text-[11px] text-slate-400 mt-1">OTE / Reaction zone</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>

        <div className="grid gap-4 lg:col-span-2">
          <Card className="p-5">
            <div className="text-sm text-slate-400">Stop Loss</div>
            <div className="mt-1 text-sm font-semibold text-slate-100">{stopLossText}</div>
            <div className="mt-2 text-xs text-slate-400 leading-relaxed">Invalidation = when structure fails / mitigation zone is reclaimed.</div>
          </Card>

          <Card className="p-5">
            <div className="text-sm text-slate-400">Take Profit</div>
            <div className="mt-1 text-sm font-semibold text-slate-100">{takeProfitText}</div>
            <div className="mt-2 text-xs text-slate-400 leading-relaxed">Target liquidity pools on HTF (expect stop hunts before continuation).</div>
          </Card>

          <Card className="p-5">
            <div className="text-sm text-slate-400">Risk:Reward</div>
            <div className="mt-1 text-sm font-semibold text-slate-100">{rrText}</div>
            <div className="mt-2 text-xs text-slate-400 leading-relaxed">If below 1:2, your expectancy is usually reduced.</div>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-200">Bullish Setup Diagram</div>
            <Badge tone="bullish">BUY</Badge>
          </div>
          <Card className="p-4">
            <SvgCandles
              candles={buyCandles}
              zones={bias === 'bullish' ? buyMarkers.fvgZones : buyMarkers.fvgZones}
              fibLevels={buyMarkers.fibLevels}
              cisdLevels={buyMarkers.cisdLevels}
              orderBlockZones={buyMarkers.orderBlockZones}
              grid
              buyBias={bias === 'bullish'}
            />
          </Card>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-200">Bearish Setup Diagram</div>
            <Badge tone="bearish">SELL</Badge>
          </div>
          <Card className="p-4">
            <SvgCandles
              candles={sellCandles}
              zones={sellMarkers.fvgZones}
              fibLevels={sellMarkers.fibLevels}
              cisdLevels={sellMarkers.cisdLevels}
              orderBlockZones={sellMarkers.orderBlockZones}
              grid
              buyBias={bias === 'bearish'}
            />
          </Card>
        </div>
      </div>

      {/* Placeholders for the requested hand-drawn annotations:
          We'll add later in a follow-up iteration for arrows, SL/TP dashed lines,
          liquidity circles, displacement/pullback labels.
          The SVG candlesticks + base zones/levels are already in place. */}
    </div>
  )
}
