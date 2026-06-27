import React from 'react';
import { BookOpen, Check, AlertTriangle, ShieldCheck } from 'lucide-react';
import CandlestickChartSVG from '../components/charts/CandlestickChartSVG';

const patterns = [
  {
    name: "Bullish Engulfing",
    type: "BULLISH",
    desc: "A smaller bearish candle followed by a larger bullish candle that completely eclipses the previous body.",
    features: ["Occurs at Support/OB", "Signals strong buying pressure", "Closes above previous high"],
    models: "FVG, OB, CISD",
    data: [
      { x: 30, open: 40, close: 60, high: 35, low: 65 }, // Small bear
      { x: 70, open: 65, close: 25, high: 20, low: 70 }, // Big bull
    ],
    lines: [{ x1: 10, y1: 40, x2: 90, y2: 40, stroke: "#10b981", dashed: true }] // Resistance broken
  },
  {
    name: "Bearish Engulfing",
    type: "BEARISH",
    desc: "A smaller bullish candle followed by a larger bearish candle that completely eclipses the previous body.",
    features: ["Occurs at Resistance/OB", "Signals strong selling pressure", "Closes below previous low"],
    models: "FVG, OB, CISD",
    data: [
      { x: 30, open: 60, close: 40, high: 35, low: 65 }, // Small bull
      { x: 70, open: 35, close: 75, high: 30, low: 80 }, // Big bear
    ],
    lines: [{ x1: 10, y1: 60, x2: 90, y2: 60, stroke: "#ef4444", dashed: true }] // Support broken
  },
  {
    name: "Bullish Pin Bar (Hammer)",
    type: "BULLISH",
    desc: "A candle with a small body and a long lower wick, showing rejection of lower prices.",
    features: ["Long lower wick (2x body)", "Sweeps liquidity", "Closes near its high"],
    models: "Fibonacci OTE",
    data: [
      { x: 50, open: 40, close: 35, high: 25, low: 85 }, // Long lower wick
    ],
    lines: [{ x1: 10, y1: 80, x2: 90, y2: 80, stroke: "#f59e0b", dashed: true, label: "Sweep" }]
  },
  {
    name: "Bearish Pin Bar",
    type: "BEARISH",
    desc: "A candle with a small body and a long upper wick, showing rejection of higher prices.",
    features: ["Long upper wick (2x body)", "Sweeps liquidity", "Closes near its low"],
    models: "Fibonacci OTE",
    data: [
      { x: 50, open: 60, close: 65, high: 15, low: 75 }, // Long upper wick
    ],
    lines: [{ x1: 10, y1: 20, x2: 90, y2: 20, stroke: "#f59e0b", dashed: true, label: "Sweep" }]
  },
  {
    name: "Bullish MSS",
    type: "BULLISH",
    desc: "A multi-candle sequence where a prominent swing high is broken with displacement.",
    features: ["Breaks swing high", "Displacement candle closes above", "Leaves FVG"],
    models: "All Models",
    data: [
      { x: 20, open: 30, close: 50, high: 25, low: 55 },
      { x: 40, open: 50, close: 70, high: 45, low: 75 }, // Swing Low
      { x: 60, open: 70, close: 40, high: 35, low: 75 }, // Up
      { x: 80, open: 40, close: 15, high: 10, low: 45 }, // Breakout
    ],
    lines: [{ x1: 10, y1: 25, x2: 90, y2: 25, stroke: "#10b981", dashed: true }] // Swing high broken
  },
  {
    name: "Bearish MSS",
    type: "BEARISH",
    desc: "A multi-candle sequence where a prominent swing low is broken with displacement.",
    features: ["Breaks swing low", "Displacement candle closes below", "Leaves FVG"],
    models: "All Models",
    data: [
      { x: 20, open: 70, close: 50, high: 45, low: 75 },
      { x: 40, open: 50, close: 30, high: 25, low: 55 }, // Swing High
      { x: 60, open: 30, close: 60, high: 25, low: 65 }, // Down
      { x: 80, open: 60, close: 85, high: 55, low: 90 }, // Breakout
    ],
    lines: [{ x1: 10, y1: 75, x2: 90, y2: 75, stroke: "#ef4444", dashed: true }] // Swing low broken
  },
  {
    name: "Bullish Displacement",
    type: "BULLISH",
    desc: "A very large, energetic green candle that signifies heavy institutional buying.",
    features: ["Very large body", "Small or no wicks", "Moves away from a level quickly"],
    models: "FVG, OB",
    data: [
      { x: 50, open: 80, close: 20, high: 15, low: 85 },
    ],
    lines: []
  },
  {
    name: "Bearish Displacement",
    type: "BEARISH",
    desc: "A very large, energetic red candle that signifies heavy institutional selling.",
    features: ["Very large body", "Small or no wicks", "Moves away from a level quickly"],
    models: "FVG, OB",
    data: [
      { x: 50, open: 20, close: 80, high: 15, low: 85 },
    ],
    lines: []
  },
  {
    name: "Doji / Indecision",
    type: "NEUTRAL",
    desc: "Open and close are at the same price, indicating a pause in the market.",
    features: ["No real body", "Long wicks on both sides", "Needs next candle to confirm direction"],
    models: "Wait for Confirmation",
    data: [
      { x: 50, open: 50, close: 50, high: 20, low: 80 },
    ],
    lines: []
  },
  {
    name: "Morning Star",
    type: "BULLISH",
    desc: "3-candle pattern: Bearish candle, indecision candle, followed by strong bullish candle.",
    features: ["Occurs at Support", "Validates a reversal", "Third candle closes deep into first"],
    models: "OB, Fib OTE",
    data: [
      { x: 25, open: 30, close: 60, high: 25, low: 65 },
      { x: 50, open: 65, close: 63, high: 55, low: 75 }, // Doji
      { x: 75, open: 60, close: 35, high: 30, low: 65 },
    ],
    lines: []
  },
  {
    name: "Evening Star",
    type: "BEARISH",
    desc: "3-candle pattern: Bullish candle, indecision candle, followed by strong bearish candle.",
    features: ["Occurs at Resistance", "Validates a reversal", "Third candle closes deep into first"],
    models: "OB, Fib OTE",
    data: [
      { x: 25, open: 70, close: 40, high: 35, low: 75 },
      { x: 50, open: 35, close: 37, high: 25, low: 45 }, // Doji
      { x: 75, open: 40, close: 65, high: 35, low: 70 },
    ],
    lines: []
  },
  {
    name: "Inside Bar",
    type: "NEUTRAL",
    desc: "A candle whose high and low are completely contained within the previous candle's range.",
    features: ["Indicates consolidation", "Wait for breakout of mother bar", "Common before expansion"],
    models: "Wait for Breakout",
    data: [
      { x: 30, open: 80, close: 20, high: 15, low: 85 }, // Mother Bar
      { x: 70, open: 35, close: 60, high: 30, low: 65 }, // Inside Bar
    ],
    lines: [
      { x1: 10, y1: 15, x2: 90, y2: 15, stroke: "#64748b", dashed: true }, // High
      { x1: 10, y1: 85, x2: 90, y2: 85, stroke: "#64748b", dashed: true }  // Low
    ]
  }
];

export default function CandlePatterns() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-12">
      <div className="bg-[var(--color-brand-card)] p-8 rounded-2xl border border-[var(--color-brand-border)] text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"></div>
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4 text-white">The Golden Rule of Execution</h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          <strong className="text-white">Always wait for the candle to CLOSE.</strong> 
          <br/>A wick is just a visual illusion until the timeframe prints its close. Many traps are set by smart money using wicks to trick retail traders into early entries.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <BookOpen className="text-blue-400" /> Pattern Library
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {patterns.map((pattern, idx) => {
            const badgeColor = pattern.type === 'BULLISH' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 
                               pattern.type === 'BEARISH' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 
                               'bg-amber-500/20 text-amber-400 border-amber-500/30';
            return (
              <div key={idx} className="bg-[var(--color-brand-card)] rounded-xl border border-[var(--color-brand-border)] overflow-hidden flex flex-col">
                <div className="h-40 bg-black/40 border-b border-[var(--color-brand-border)] p-4 flex items-center justify-center">
                  <CandlestickChartSVG data={pattern.data} lines={pattern.lines} className="w-full h-full border-none bg-transparent" />
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-gray-200">{pattern.name}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badgeColor}`}>
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
            )
          })}
        </div>
      </div>

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
                <th className="py-3 px-4 font-semibold text-gray-400">Order Block Context</th>
                <th className="py-3 px-4 font-semibold text-gray-400">Fib OTE Context</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 text-sm">
              <tr className="border-b border-[var(--color-brand-border)]/50 bg-black/10">
                <td className="py-3 px-4 font-medium">Engulfing</td>
                <td className="py-3 px-4 text-emerald-400">★★★ (High)</td>
                <td className="py-3 px-4 text-emerald-400">★★★ (High)</td>
                <td className="py-3 px-4 text-emerald-400">★★★ (High)</td>
              </tr>
              <tr className="border-b border-[var(--color-brand-border)]/50">
                <td className="py-3 px-4 font-medium">Pin Bar (Sweep)</td>
                <td className="py-3 px-4 text-amber-400">★★☆ (Medium)</td>
                <td className="py-3 px-4 text-emerald-400">★★★ (High)</td>
                <td className="py-3 px-4 text-emerald-400">★★★ (High)</td>
              </tr>
              <tr className="border-b border-[var(--color-brand-border)]/50 bg-black/10">
                <td className="py-3 px-4 font-medium">Displacement</td>
                <td className="py-3 px-4 text-emerald-400">★★★ (High)</td>
                <td className="py-3 px-4 text-emerald-400">★★★ (High)</td>
                <td className="py-3 px-4 text-amber-400">★★☆ (Medium)</td>
              </tr>
              <tr className="border-b border-[var(--color-brand-border)]/50">
                <td className="py-3 px-4 font-medium">Doji</td>
                <td className="py-3 px-4 text-red-400">★☆☆ (Low)</td>
                <td className="py-3 px-4 text-red-400">★☆☆ (Low)</td>
                <td className="py-3 px-4 text-amber-400">★★☆ (Medium)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
