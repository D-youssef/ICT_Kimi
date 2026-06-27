import React, { useState } from 'react';
import { Target, TrendingUp, AlertCircle, Clock, CheckCircle, List } from 'lucide-react';
import Accordion from '../components/ui/Accordion';
import CandlestickChartSVG from '../components/charts/CandlestickChartSVG';

const fibSteps = [
  { title: "Identify the Dealing Range", content: "Locate a clear swing high and swing low that created displacement and broke structure." },
  { title: "Draw the Fibonacci Tool", content: "For a bullish setup, draw from the Swing Low to the Swing High. For bearish, draw from Swing High to Swing Low." },
  { title: "Wait for Retracement", content: "Price must retrace back into the range. You want it to cross Equilibrium (0.50) into Discount (for longs) or Premium (for shorts)." },
  { title: "Identify OTE Levels", content: "Optimal Trade Entry (OTE) is between 0.618 and 0.786, with 0.705 being the absolute sweet spot." },
  { title: "Look for Confluence", content: "Within the OTE zone, look for an Order Block, FVG, or CISD to overlap with the Fib level." },
  { title: "Wait for LTF Confirmation", content: "Drop to a 1m or 5m timeframe and look for a micro Market Structure Shift inside the OTE." },
  { title: "Entry", content: "Execute at the 0.705 level or upon LTF confirmation inside the OTE zone." },
  { title: "Stop Loss & Take Profit", content: "SL goes just beyond the 1.000 level (the origin of the swing). TP1 at 0.000 (old high/low), TP2 at -0.27 or -0.62 extensions." },
];

export default function FibonacciPage() {
  const [bias, setBias] = useState('bullish');

  // Bullish Fib
  const bullData = [
    { x: 10, open: 80, close: 60, high: 55, low: 85 }, // Swing Low (100) at Y=80
    { x: 20, open: 60, close: 40, high: 35, low: 65 },
    { x: 30, open: 40, close: 20, high: 15, low: 45 }, // Swing High (0) at Y=20
    { x: 40, open: 20, close: 35, high: 15, low: 40 }, // Retrace
    { x: 50, open: 35, close: 50, high: 30, low: 55 }, // Retrace
    { x: 60, open: 50, close: 62, high: 45, low: 65 }, // Hits 0.705 (Y = 62.3)
    { x: 70, open: 62, close: 40, high: 35, low: 65 }, // Expansion up
    { x: 80, open: 40, close: 10, high: 5,  low: 45 }, // Hits TP extension (-0.27)
  ];
  const bullZones = [
    { x: 5, y: 57, w: 85, h: 10, fill: "rgba(245, 158, 11, 0.2)", stroke: "transparent", label: "" } // OTE Zone (0.618 - 0.786)
  ];
  // Fib levels for Y: range is 80 (low) to 20 (high). Difference = 60.
  // 0.00 = 20
  // 0.50 = 50
  // 0.618 = 20 + (60 * 0.618) = 57.08
  // 0.705 = 20 + (60 * 0.705) = 62.3
  // 0.786 = 20 + (60 * 0.786) = 67.16
  // 1.00 = 80
  const bullLines = [
    { x1: 5, y1: 20, x2: 90, y2: 20, stroke: "#64748b", dashed: true, label: "0.00" },
    { x1: 5, y1: 50, x2: 90, y2: 50, stroke: "#64748b", dashed: true, label: "0.50" },
    { x1: 5, y1: 57, x2: 90, y2: 57, stroke: "#f59e0b", dashed: false, label: "0.618" },
    { x1: 5, y1: 62, x2: 90, y2: 62, stroke: "#f59e0b", dashed: false, label: "0.705 OTE", width: 1 },
    { x1: 5, y1: 67, x2: 90, y2: 67, stroke: "#f59e0b", dashed: false, label: "0.786" },
    { x1: 5, y1: 80, x2: 90, y2: 80, stroke: "#64748b", dashed: true, label: "1.00" },
    { x1: 5, y1: 5,  x2: 90, y2: 5,  stroke: "#10b981", dashed: true, label: "-0.27" }, // TP
  ];
  const bullAnnotations = [
    { x: 60, y: 70, type: 'arrow-up', text: 'Buy', offsetY: 8 }
  ];

  // Bearish Fib
  const bearData = [
    { x: 10, open: 20, close: 40, high: 15, low: 45 }, // Swing High (1.00) at Y=20
    { x: 20, open: 40, close: 60, high: 35, low: 65 },
    { x: 30, open: 60, close: 80, high: 55, low: 85 }, // Swing Low (0.00) at Y=80
    { x: 40, open: 80, close: 65, high: 60, low: 85 }, // Retrace
    { x: 50, open: 65, close: 50, high: 45, low: 70 }, // Retrace
    { x: 60, open: 50, close: 38, high: 35, low: 55 }, // Hits 0.705 (Y = 37.7)
    { x: 70, open: 38, close: 60, high: 35, low: 65 }, // Expansion down
    { x: 80, open: 60, close: 90, high: 55, low: 95 }, // Hits TP extension
  ];
  const bearZones = [
    { x: 5, y: 33, w: 85, h: 10, fill: "rgba(245, 158, 11, 0.2)", stroke: "transparent", label: "" }
  ];
  // Fib levels for Y: range is 20 (high) to 80 (low). Difference = 60.
  // 0.00 = 80
  // 0.50 = 50
  // 0.618 = 80 - (60 * 0.618) = 42.92
  // 0.705 = 80 - (60 * 0.705) = 37.7
  // 0.786 = 80 - (60 * 0.786) = 32.84
  // 1.00 = 20
  const bearLines = [
    { x1: 5, y1: 80, x2: 90, y2: 80, stroke: "#64748b", dashed: true, label: "0.00" },
    { x1: 5, y1: 50, x2: 90, y2: 50, stroke: "#64748b", dashed: true, label: "0.50" },
    { x1: 5, y1: 43, x2: 90, y2: 43, stroke: "#f59e0b", dashed: false, label: "0.618" },
    { x1: 5, y1: 38, x2: 90, y2: 38, stroke: "#f59e0b", dashed: false, label: "0.705 OTE", width: 1 },
    { x1: 5, y1: 33, x2: 90, y2: 33, stroke: "#f59e0b", dashed: false, label: "0.786" },
    { x1: 5, y1: 20, x2: 90, y2: 20, stroke: "#64748b", dashed: true, label: "1.00" },
    { x1: 5, y1: 95, x2: 90, y2: 95, stroke: "#10b981", dashed: true, label: "-0.27" },
  ];
  const bearAnnotations = [
    { x: 60, y: 30, type: 'arrow-down', text: 'Sell', offsetY: -8 }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="bg-[var(--color-brand-card)] p-8 rounded-2xl border border-[var(--color-brand-border)]">
        <h1 className="text-3xl font-bold mb-4 text-amber-500 flex items-center gap-3">
          <TrendingUp className="w-8 h-8" /> Fibonacci & OTE (Optimal Trade Entry)
        </h1>
        <p className="text-gray-300 mb-6">
          The Fibonacci tool measures the premium and discount arrays of a dealing range. ICT emphasizes the 0.618, 0.705, and 0.786 levels as the "Optimal Trade Entry" zone where smart money typically accumulates positions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-black/30 rounded-lg border border-white/5">
            <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Stop Loss</span>
            <span className="text-red-400 font-semibold">Beyond 1.000 Level</span>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/5">
            <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Take Profit</span>
            <span className="text-emerald-400 font-semibold">0.000, then -0.27/-0.62</span>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/5">
            <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Min R:R</span>
            <span className="text-amber-500 font-semibold">1 : 3.0+</span>
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-brand-card)] p-6 rounded-2xl border border-[var(--color-brand-border)]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Model Visualization</h2>
          <div className="flex bg-black/40 rounded-lg p-1 border border-white/10">
            <button
              onClick={() => setBias('bullish')}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                bias === 'bullish' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Bullish Bias
            </button>
            <button
              onClick={() => setBias('bearish')}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                bias === 'bearish' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Bearish Bias
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className={bias === 'bullish' ? 'block lg:block' : 'hidden lg:block opacity-50'}>
            <CandlestickChartSVG title="Bullish OTE" data={bullData} zones={bullZones} lines={bullLines} annotations={bullAnnotations} />
          </div>
          <div className={bias === 'bearish' ? 'block lg:block' : 'hidden lg:block opacity-50'}>
            <CandlestickChartSVG title="Bearish OTE" data={bearData} zones={bearZones} lines={bearLines} annotations={bearAnnotations} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <CheckCircle className="text-amber-500" /> Step-by-Step Execution
          </h2>
          <Accordion steps={fibSteps} />
        </div>

        <div className="space-y-6">
          <div className="bg-black/20 p-6 rounded-xl border border-[var(--color-brand-border)]">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Timeframes
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex justify-between items-center"><span className="text-gray-500">Bias:</span> <span className="font-semibold">Daily / 4H</span></li>
              <li className="flex justify-between items-center"><span className="text-gray-500">Setup (Range):</span> <span className="font-semibold">1H / 15m</span></li>
              <li className="flex justify-between items-center"><span className="text-gray-500">Execution:</span> <span className="font-semibold">5m / 1m</span></li>
            </ul>
          </div>
          
          <div className="bg-black/20 p-6 rounded-xl border border-[var(--color-brand-border)]">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Pro Notes
            </h3>
            <ul className="list-disc pl-4 space-y-2 text-sm text-gray-400">
              <li>Never trade OTE blindly. It must align with a POI like an Order Block or FVG.</li>
              <li>Wait for London open or NY Open before trusting dealing ranges.</li>
              <li>If price blasts through 0.786 and closes near 1.000, the trade is likely invalid.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Full Fib Level Reference Table */}
      <div className="bg-[var(--color-brand-card)] p-6 rounded-2xl border border-[var(--color-brand-border)]">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <List className="text-amber-500" /> ICT Fibonacci Levels Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-brand-border)]">
                <th className="py-3 px-4 font-semibold text-gray-400">Level</th>
                <th className="py-3 px-4 font-semibold text-gray-400">Name / Purpose</th>
                <th className="py-3 px-4 font-semibold text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 text-sm">
              <tr className="border-b border-[var(--color-brand-border)]/50 bg-black/10">
                <td className="py-3 px-4 font-mono text-emerald-400">-0.620</td>
                <td className="py-3 px-4">Symmetrical Price Objective (TP2)</td>
                <td className="py-3 px-4">Take partial/full profit</td>
              </tr>
              <tr className="border-b border-[var(--color-brand-border)]/50 bg-black/10">
                <td className="py-3 px-4 font-mono text-emerald-400">-0.270</td>
                <td className="py-3 px-4">First Profit Objective (TP1)</td>
                <td className="py-3 px-4">Take partial profit, move SL to breakeven</td>
              </tr>
              <tr className="border-b border-[var(--color-brand-border)]/50">
                <td className="py-3 px-4 font-mono text-gray-200">0.000</td>
                <td className="py-3 px-4">Origin of Retracement (Old High/Low)</td>
                <td className="py-3 px-4">First major liquidity draw</td>
              </tr>
              <tr className="border-b border-[var(--color-brand-border)]/50">
                <td className="py-3 px-4 font-mono text-gray-400">0.500</td>
                <td className="py-3 px-4">Equilibrium</td>
                <td className="py-3 px-4">Fair value. Do not enter here.</td>
              </tr>
              <tr className="border-b border-[var(--color-brand-border)]/50 bg-amber-500/10">
                <td className="py-3 px-4 font-mono text-amber-500">0.618</td>
                <td className="py-3 px-4">OTE - Entry Level 1</td>
                <td className="py-3 px-4">First scale-in point</td>
              </tr>
              <tr className="border-b border-[var(--color-brand-border)]/50 bg-amber-500/20">
                <td className="py-3 px-4 font-mono text-amber-400 font-bold">0.705</td>
                <td className="py-3 px-4">Optimal Trade Entry (Sweet Spot)</td>
                <td className="py-3 px-4">Primary execution zone</td>
              </tr>
              <tr className="border-b border-[var(--color-brand-border)]/50 bg-amber-500/10">
                <td className="py-3 px-4 font-mono text-amber-500">0.786</td>
                <td className="py-3 px-4">OTE - Entry Level 3 (Deep Discount)</td>
                <td className="py-3 px-4">Last point of entry</td>
              </tr>
              <tr className="bg-black/10">
                <td className="py-3 px-4 font-mono text-red-400">1.000</td>
                <td className="py-3 px-4">Origin of Impulse (Invalidation)</td>
                <td className="py-3 px-4">Stop Loss placement</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
