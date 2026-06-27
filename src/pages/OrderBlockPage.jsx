import React, { useState } from 'react';
import { Target, TrendingUp, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import Accordion from '../components/ui/Accordion';
import CandlestickChartSVG from '../components/charts/CandlestickChartSVG';

const obSteps = [
  { title: "Identify the Narrative", content: "Determine HTF bias. Price must be approaching an area where we expect a reversal (like an old high/low or HTF PD array)." },
  { title: "Watch for Displacement", content: "Look for a strong, energetic move away from a level. This displacement must break structure (MSS) and ideally leave a FVG." },
  { title: "Locate the Order Block", content: "The Bullish OB is the last down candle(s) prior to the bullish displacement. The Bearish OB is the last up candle(s) prior to bearish displacement." },
  { title: "Mark the OB Zone", content: "Draw a zone from the high to the low of the OB candle. The most sensitive part is the open of the candle and its midpoint (Mean Threshold)." },
  { title: "Wait for the Return", content: "Let price trade away, then wait for a retracement back into the Order Block zone." },
  { title: "Verify with LTF (Optional)", content: "On a lower timeframe, watch price action as it taps the OB. Look for a willingness to reject the level." },
  { title: "Entry", content: "Enter aggressively at the top of the OB (or open price), or conservatively at the Mean Threshold." },
  { title: "Stop Loss & Take Profit", content: "SL goes just below the low of the OB (or the swing low). TP targets the opposing liquidity pool." },
];

export default function OrderBlockPage() {
  const [bias, setBias] = useState('bullish');

  // Bullish OB
  const bullData = [
    { x: 10, open: 40, close: 60, high: 35, low: 65 },
    { x: 20, open: 60, close: 80, high: 55, low: 90 }, // Last down candle (OB)
    { x: 30, open: 80, close: 30, high: 25, low: 85 }, // Strong displacement up (MSS)
    { x: 40, open: 30, close: 10, high: 5,  low: 35 }, // Continued displacement
    { x: 50, open: 10, close: 40, high: 5,  low: 45 }, // Retrace
    { x: 60, open: 40, close: 65, high: 35, low: 70 }, // Retrace into OB (Y range 55 to 90)
    { x: 70, open: 65, close: 25, high: 20, low: 75 }, // Expansion up
    { x: 80, open: 25, close: 5,  high: 2,  low: 30 }, // Hit TP
  ];
  // OB is candle 2: high=55, low=90.
  const bullZones = [
    { x: 20, y: 55, w: 45, h: 35, fill: "rgba(16, 185, 129, 0.2)", stroke: "#10b981", label: "Bullish OB" }
  ];
  const bullLines = [
    { x1: 20, y1: 72.5, x2: 65, y2: 72.5, stroke: "#10b981", dashed: true, label: "Mean Threshold" },
    { x1: 60, y1: 65, x2: 70, y2: 65, stroke: "#10b981", dashed: true, label: "Entry" },
    { x1: 60, y1: 95, x2: 90, y2: 95, stroke: "#ef4444", dashed: true, label: "SL" },
  ];
  const bullAnnotations = [
    { x: 35, y: 15, type: 'text', text: 'Displacement', offsetY: 0 },
    { x: 65, y: 75, type: 'arrow-up', text: 'Buy', offsetY: 8 }
  ];

  // Bearish OB
  const bearData = [
    { x: 10, open: 80, close: 60, high: 55, low: 85 },
    { x: 20, open: 60, close: 20, high: 10, low: 65 }, // Last up candle (OB)
    { x: 30, open: 20, close: 70, high: 15, low: 75 }, // Strong displacement down (MSS)
    { x: 40, open: 70, close: 90, high: 65, low: 95 }, // Continued displacement
    { x: 50, open: 90, close: 60, high: 55, low: 95 }, // Retrace
    { x: 60, open: 60, close: 35, high: 30, low: 65 }, // Retrace into OB (Y range 10 to 65)
    { x: 70, open: 35, close: 75, high: 30, low: 80 }, // Expansion down
    { x: 80, open: 75, close: 95, high: 70, low: 98 }, // Hit TP
  ];
  // OB is candle 2: high=10, low=65.
  const bearZones = [
    { x: 20, y: 10, w: 45, h: 55, fill: "rgba(239, 68, 68, 0.2)", stroke: "#ef4444", label: "Bearish OB" }
  ];
  const bearLines = [
    { x1: 20, y1: 37.5, x2: 65, y2: 37.5, stroke: "#ef4444", dashed: true, label: "Mean Threshold" },
    { x1: 60, y1: 35, x2: 70, y2: 35, stroke: "#ef4444", dashed: true, label: "Entry" },
    { x1: 60, y1: 5,  x2: 90, y2: 5,  stroke: "#ef4444", dashed: true, label: "SL" },
  ];
  const bearAnnotations = [
    { x: 35, y: 85, type: 'text', text: 'Displacement', offsetY: 0 },
    { x: 65, y: 25, type: 'arrow-down', text: 'Sell', offsetY: -8 }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="bg-[var(--color-brand-card)] p-8 rounded-2xl border border-[var(--color-brand-border)]">
        <h1 className="text-3xl font-bold mb-4 text-emerald-500 flex items-center gap-3">
          <Target className="w-8 h-8" /> Order Block (OB)
        </h1>
        <p className="text-gray-300 mb-6">
          An Order Block is a specific footprint of institutional sponsorship. It is defined as the last opposing candle(s) prior to a strong impulsive move that breaks market structure. Price often returns to the OB to mitigate institutional orders.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-black/30 rounded-lg border border-white/5">
            <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Stop Loss</span>
            <span className="text-red-400 font-semibold">Below OB Low / Swing Low</span>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/5">
            <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Take Profit</span>
            <span className="text-emerald-400 font-semibold">Next Liquidity Pool</span>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/5">
            <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Min R:R</span>
            <span className="text-emerald-500 font-semibold">1 : 2.0+</span>
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
            <CandlestickChartSVG title="Bullish OB Setup" data={bullData} zones={bullZones} lines={bullLines} annotations={bullAnnotations} />
          </div>
          <div className={bias === 'bearish' ? 'block lg:block' : 'hidden lg:block opacity-50'}>
            <CandlestickChartSVG title="Bearish OB Setup" data={bearData} zones={bearZones} lines={bearLines} annotations={bearAnnotations} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <CheckCircle className="text-emerald-500" /> Step-by-Step Execution
          </h2>
          <Accordion steps={obSteps} />
        </div>

        <div className="space-y-6">
          <div className="bg-black/20 p-6 rounded-xl border border-[var(--color-brand-border)]">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Timeframes
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex justify-between items-center"><span className="text-gray-500">Bias:</span> <span className="font-semibold">Daily / 4H</span></li>
              <li className="flex justify-between items-center"><span className="text-gray-500">Setup:</span> <span className="font-semibold">1H / 15m</span></li>
              <li className="flex justify-between items-center"><span className="text-gray-500">Execution:</span> <span className="font-semibold">5m / 1m</span></li>
            </ul>
          </div>
          
          <div className="bg-black/20 p-6 rounded-xl border border-[var(--color-brand-border)]">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Pro Notes
            </h3>
            <ul className="list-disc pl-4 space-y-2 text-sm text-gray-400">
              <li>Not every down candle before an up move is an OB. It MUST be followed by strong displacement that breaks structure.</li>
              <li>The best Order Blocks have a Fair Value Gap immediately following them.</li>
              <li>If the Mean Threshold (midpoint) of the OB is closed below, the OB is likely invalidated.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
