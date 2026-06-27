import React from 'react';
import { BookOpen, Check, AlertTriangle, ShieldCheck } from 'lucide-react';
import CandlestickChartSVG from '../components/charts/CandlestickChartSVG';

// ─── Pattern Definitions ─────────────────────────────────────────────────────
// ALL X values span 10..90 and Y values use full 5..95 range for visibility
const patterns = [
  {
    name: "Bullish Engulfing",
    type: "BULLISH",
    desc: "A small bearish candle followed by a larger bullish candle that completely eclipses the previous body.",
    features: ["Occurs at Support/OB", "Signals strong buying pressure", "Closes above previous high"],
    models: "FVG, OB, CISD",
    data: [
      // Small bearish candle on the left
      { x: 35, open: 38, close: 58, high: 33, low: 63 },
      // Large bullish candle on the right — body exceeds above 38 and below 58
      { x: 65, open: 72, close: 20, high: 15, low: 77 },
    ],
    zones: [],
    lines: [{ x1: 10, y1: 38, x2: 90, y2: 38, stroke: "#10b981", dashed: true, label: "Resistance cleared" }],
  },
  {
    name: "Bearish Engulfing",
    type: "BEARISH",
    desc: "A small bullish candle followed by a larger bearish candle that completely eclipses the previous body.",
    features: ["Occurs at Resistance/OB", "Signals strong selling pressure", "Closes below previous low"],
    models: "FVG, OB, CISD",
    data: [
      // Small bullish candle on the left
      { x: 35, open: 62, close: 42, high: 37, low: 67 },
      // Large bearish candle on the right
      { x: 65, open: 25, close: 80, high: 20, low: 85 },
    ],
    zones: [],
    lines: [{ x1: 10, y1: 62, x2: 90, y2: 62, stroke: "#ef4444", dashed: true, label: "Support broken" }],
  },
  {
    name: "Bullish Pin Bar",
    type: "BULLISH",
    desc: "A candle with a small body near the top and a very long lower wick — shows strong rejection of lower prices.",
    features: ["Lower wick ≥ 2× body size", "Sweeps liquidity below", "Closes near session high"],
    models: "Fibonacci OTE",
    data: [
      // Left context candles
      { x: 20, open: 50, close: 60, high: 45, low: 65 },
      { x: 40, open: 60, close: 65, high: 55, low: 70 },
      // Pin bar — tiny body at top, long lower wick
      { x: 70, open: 35, close: 30, high: 25, low: 92 },
    ],
    zones: [],
    lines: [{ x1: 10, y1: 88, x2: 90, y2: 88, stroke: "#f59e0b", dashed: true, label: "Liquidity swept" }],
  },
  {
    name: "Bearish Pin Bar",
    type: "BEARISH",
    desc: "A candle with a small body near the bottom and a very long upper wick — shows strong rejection of higher prices.",
    features: ["Upper wick ≥ 2× body size", "Sweeps liquidity above", "Closes near session low"],
    models: "Fibonacci OTE",
    data: [
      { x: 20, open: 55, close: 45, high: 40, low: 60 },
      { x: 40, open: 45, close: 38, high: 33, low: 50 },
      // Pin bar — tiny body at bottom, long upper wick
      { x: 70, open: 65, close: 70, high: 8, low: 77 },
    ],
    zones: [],
    lines: [{ x1: 10, y1: 12, x2: 90, y2: 12, stroke: "#f59e0b", dashed: true, label: "Liquidity swept" }],
  },
  {
    name: "Bullish MSS",
    type: "BULLISH",
    desc: "Price breaks a prominent swing high with a strong displacement candle, shifting market structure upward.",
    features: ["Breaks swing high (BOS)", "Displacement closes above", "Often leaves an FVG"],
    models: "All Models",
    data: [
      { x: 12, open: 65, close: 50, high: 45, low: 70 },
      { x: 27, open: 50, close: 65, high: 45, low: 70 },
      { x: 42, open: 65, close: 48, high: 43, low: 70 }, // Swing Low area
      { x: 57, open: 48, close: 62, high: 43, low: 67 },
      { x: 72, open: 62, close: 20, high: 15, low: 67 }, // Displacement breaks swing high (Y=45)
      { x: 87, open: 20, close: 12, high: 8,  low: 25 },
    ],
    zones: [],
    lines: [
      { x1: 10, y1: 43, x2: 90, y2: 43, stroke: "#10b981", dashed: true, label: "Swing High (BOS)" },
    ],
  },
  {
    name: "Bearish MSS",
    type: "BEARISH",
    desc: "Price breaks a prominent swing low with a strong displacement candle, shifting market structure downward.",
    features: ["Breaks swing low (BOS)", "Displacement closes below", "Often leaves an FVG"],
    models: "All Models",
    data: [
      { x: 12, open: 38, close: 52, high: 33, low: 57 },
      { x: 27, open: 52, close: 38, high: 33, low: 57 },
      { x: 42, open: 38, close: 52, high: 33, low: 57 }, // Swing High area
      { x: 57, open: 52, close: 38, high: 33, low: 57 },
      { x: 72, open: 38, close: 80, high: 33, low: 85 }, // Displacement breaks swing low (Y=57)
      { x: 87, open: 80, close: 90, high: 75, low: 95 },
    ],
    zones: [],
    lines: [
      { x1: 10, y1: 57, x2: 90, y2: 57, stroke: "#ef4444", dashed: true, label: "Swing Low (BOS)" },
    ],
  },
  {
    name: "Bullish Displacement",
    type: "BULLISH",
    desc: "A large, energetic green candle reflecting heavy institutional buying with minimal wicks.",
    features: ["Very large body", "Tiny/no wicks", "Moves far from a key level"],
    models: "FVG, OB",
    data: [
      { x: 20, open: 72, close: 62, high: 58, low: 77 },
      { x: 40, open: 62, close: 70, high: 57, low: 75 },
      // The displacement
      { x: 65, open: 88, close: 12, high: 8,  low: 92 },
      { x: 85, open: 12, close: 8,  high: 5,  low: 18 },
    ],
    zones: [
      { x: 53, y: 12, w: 20, h: 76, fill: "rgba(16,185,129,0.1)", stroke: "#10b981", label: "FVG" },
    ],
    lines: [],
  },
  {
    name: "Bearish Displacement",
    type: "BEARISH",
    desc: "A large, energetic red candle reflecting heavy institutional selling with minimal wicks.",
    features: ["Very large body", "Tiny/no wicks", "Moves far from a key level"],
    models: "FVG, OB",
    data: [
      { x: 20, open: 30, close: 40, high: 25, low: 45 },
      { x: 40, open: 40, close: 32, high: 27, low: 45 },
      // The displacement
      { x: 65, open: 12, close: 88, high: 8,  low: 92 },
      { x: 85, open: 88, close: 92, high: 84, low: 96 },
    ],
    zones: [
      { x: 53, y: 12, w: 20, h: 76, fill: "rgba(239,68,68,0.1)", stroke: "#ef4444", label: "FVG" },
    ],
    lines: [],
  },
  {
    name: "Doji / Indecision",
    type: "NEUTRAL",
    desc: "Open and close are at nearly the same price, showing a battle between buyers and sellers.",
    features: ["No real body", "Long wicks on both sides", "Next candle confirms direction"],
    models: "Wait for Confirmation",
    data: [
      { x: 25, open: 40, close: 55, high: 35, low: 60 }, // Context
      // True doji: open=close=50, long wicks
      { x: 50, open: 50, close: 50, high: 15, low: 85 },
      { x: 75, open: 50, close: 35, high: 45, low: 90 }, // Next: bearish resolution
    ],
    zones: [],
    lines: [{ x1: 10, y1: 50, x2: 90, y2: 50, stroke: "#9ca3af", dashed: true, label: "EQ" }],
  },
  {
    name: "Morning Star",
    type: "BULLISH",
    desc: "3-candle reversal: bearish candle, small doji, then a strong bullish candle.",
    features: ["Occurs at Support/OB", "Validates a bottom reversal", "Third candle closes into first"],
    models: "OB, Fibonacci",
    data: [
      { x: 20, open: 20, close: 55, high: 15, low: 60 }, // Strong bearish
      { x: 50, open: 60, close: 58, high: 52, low: 75 }, // Doji / small body at bottom
      { x: 80, open: 58, close: 20, high: 15, low: 63 }, // Strong bullish
    ],
    zones: [],
    lines: [],
  },
  {
    name: "Evening Star",
    type: "BEARISH",
    desc: "3-candle reversal: bullish candle, small doji, then a strong bearish candle.",
    features: ["Occurs at Resistance/OB", "Validates a top reversal", "Third candle closes into first"],
    models: "OB, Fibonacci",
    data: [
      { x: 20, open: 80, close: 42, high: 37, low: 85 }, // Strong bullish
      { x: 50, open: 40, close: 38, high: 30, low: 48 }, // Doji / small body at top
      { x: 80, open: 37, close: 80, high: 33, low: 85 }, // Strong bearish
    ],
    zones: [],
    lines: [],
  },
  {
    name: "Inside Bar",
    type: "NEUTRAL",
    desc: "A candle whose high and low are completely contained within the previous candle's range.",
    features: ["Signals consolidation", "Breakout of mother bar is key", "Common before expansion"],
    models: "Wait for Breakout",
    data: [
      { x: 30, open: 82, close: 18, high: 10, low: 90 }, // Mother bar (large range)
      { x: 60, open: 38, close: 58, high: 30, low: 65 }, // Inside bar (within mother range)
    ],
    zones: [],
    lines: [
      { x1: 10, y1: 10,  x2: 90, y2: 10,  stroke: "#64748b", dashed: true, label: "MH" },
      { x1: 10, y1: 90,  x2: 90, y2: 90,  stroke: "#64748b", dashed: true, label: "ML" },
    ],
  },
];

// ─── Component ─────────────────────────────────────────────────────────────
export default function CandlePatterns() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-12">
      {/* Banner */}
      <div className="bg-[var(--color-brand-card)] p-8 rounded-2xl border border-[var(--color-brand-border)] text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500" />
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4 text-white">The Golden Rule of Execution</h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          <strong className="text-white">Always wait for the candle to CLOSE.</strong>{' '}
          <br />
          A wick is just a visual illusion until the timeframe prints its close. Many traps are set by smart money using wicks to trick retail traders into early entries.
        </p>
      </div>

      {/* Pattern Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <BookOpen className="text-blue-400" /> Pattern Library
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {patterns.map((pattern, idx) => {
            const badgeColor =
              pattern.type === 'BULLISH'
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                : pattern.type === 'BEARISH'
                ? 'bg-red-500/20 text-red-400 border-red-500/30'
                : 'bg-amber-500/20 text-amber-400 border-amber-500/30';

            return (
              <div
                key={idx}
                className="bg-[var(--color-brand-card)] rounded-xl border border-[var(--color-brand-border)] overflow-hidden flex flex-col"
              >
                {/* Chart area — tall enough to show candles clearly */}
                <div className="bg-[#060d1a] border-b border-[var(--color-brand-border)]" style={{ height: '200px' }}>
                  <CandlestickChartSVG
                    data={pattern.data}
                    zones={pattern.zones || []}
                    lines={pattern.lines || []}
                    annotations={pattern.annotations || []}
                    compact={true}
                    className="w-full h-full border-none rounded-none bg-transparent"
                  />
                </div>

                {/* Info area */}
                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-gray-200">{pattern.name}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border whitespace-nowrap ml-2 ${badgeColor}`}>
                      {pattern.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">{pattern.desc}</p>

                  <div className="mt-auto">
                    <div className="space-y-1.5 mb-4">
                      {pattern.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                          <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-3 border-t border-[var(--color-brand-border)]/50 flex justify-between items-center text-xs">
                      <span className="text-gray-500">Confirms:</span>
                      <span className="font-semibold text-gray-300">{pattern.models}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confluence Matrix */}
      <div className="bg-[var(--color-brand-card)] p-6 rounded-2xl border border-[var(--color-brand-border)]">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <ShieldCheck className="text-emerald-400" /> Confluence Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-brand-border)]">
                <th className="py-3 px-4 font-semibold text-gray-400">Pattern</th>
                <th className="py-3 px-4 font-semibold text-gray-400">FVG Context</th>
                <th className="py-3 px-4 font-semibold text-gray-400">Order Block</th>
                <th className="py-3 px-4 font-semibold text-gray-400">Fib OTE</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 text-sm">
              {[
                ["Engulfing",        "★★★ High",   "★★★ High",   "★★★ High",   "bg-black/10"],
                ["Pin Bar (Sweep)",  "★★☆ Medium", "★★★ High",   "★★★ High",   ""],
                ["Displacement",     "★★★ High",   "★★★ High",   "★★☆ Medium", "bg-black/10"],
                ["MSS (BOS)",        "★★★ High",   "★★★ High",   "★★★ High",   ""],
                ["Doji",             "★☆☆ Low",    "★☆☆ Low",    "★★☆ Medium", "bg-black/10"],
                ["Morning/Evening ★","★★☆ Medium", "★★★ High",   "★★★ High",   ""],
                ["Inside Bar",       "★☆☆ Low",    "★★☆ Medium", "★☆☆ Low",    "bg-black/10"],
              ].map(([name, fvg, ob, fib, rowBg], i) => (
                <tr key={i} className={`border-b border-[var(--color-brand-border)]/50 ${rowBg}`}>
                  <td className="py-3 px-4 font-medium">{name}</td>
                  {[fvg, ob, fib].map((v, j) => (
                    <td
                      key={j}
                      className={`py-3 px-4 ${
                        v.startsWith('★★★') ? 'text-emerald-400'
                        : v.startsWith('★★') ? 'text-amber-400'
                        : 'text-red-400'
                      }`}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
