import React, { useState } from 'react';
import { Target, TrendingUp, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import Accordion from '../components/ui/Accordion';
import CandlestickChartSVG from '../components/charts/CandlestickChartSVG';

const cisdSteps = [
  { title: "Identify Institutional Order Flow", content: "Determine if the higher timeframe order flow is bullish or bearish based on recent swings and displacement." },
  { title: "Wait for Key Level Interaction", content: "Price must interact with a HTF POI (Point of Interest) like a Daily/4H Order Block, FVG, or major Liquidity pool." },
  { title: "Observe LTF Market Structure", content: "Drop to a lower timeframe (e.g., 5m or 15m). Watch the current structure heading into the HTF POI." },
  { title: "Identify the Shift (MSS)", content: "Wait for a prominent structural swing point to be broken with energetic displacement. This confirms the smart money reversing." },
  { title: "Change In State of Delivery (CISD)", content: "A CISD is confirmed when an opposing candle (e.g., last down candle before up move) is traded through and closed beyond." },
  { title: "Mark the CISD Level", content: "Extend the open/close of the candle that triggered the CISD. This level will now act as support/resistance." },
  { title: "Entry on Retest", content: "Wait for price to pull back to the CISD level. Enter as price taps into this newly established institutional level." },
  { title: "Stop Loss & Take Profit", content: "SL goes beyond the recent swing high/low that formed the MSS. TP at the next internal/external liquidity pool." },
];

export default function CISDPage() {
  const [bias, setBias] = useState('bullish');

  // Bullish CISD: Down candle gets violated
  const bullData = [
    { x: 10, open: 40, close: 60, high: 35, low: 65 },
    { x: 20, open: 60, close: 80, high: 55, low: 85 },
    { x: 30, open: 80, close: 65, high: 60, low: 90 }, // Down candle before up move
    { x: 40, open: 65, close: 45, high: 40, low: 70 }, // Up move begins
    { x: 50, open: 45, close: 20, high: 15, low: 50 }, // Displaces through C3's Open (80), closes above. CISD confirmed.
    { x: 60, open: 20, close: 40, high: 15, low: 45 }, // Retrace
    { x: 70, open: 40, close: 75, high: 35, low: 85 }, // Retest CISD level (C3 Open = 80). Entry.
    { x: 80, open: 75, close: 30, high: 25, low: 80 }, // Expansion
  ];
  const bullZones = [
    { x: 25, y: 78, w: 60, h: 4, fill: "rgba(139, 92, 246, 0.3)", stroke: "#8b5cf6", label: "CISD Level" }
  ];
  const bullLines = [
    { x1: 65, y1: 80, x2: 75, y2: 80, stroke: "#10b981", dashed: true, label: "Entry" },
    { x1: 65, y1: 95, x2: 95, y2: 95, stroke: "#ef4444", dashed: true, label: "SL" },
  ];
  const bullAnnotations = [
    { x: 50, y: 10, type: 'text', text: 'MSS / Displacement', offsetY: 0 },
    { x: 70, y: 85, type: 'arrow-up', text: 'Buy', offsetY: 8 }
  ];

  // Bearish CISD: Up candle gets violated
  const bearData = [
    { x: 10, open: 80, close: 60, high: 55, low: 85 },
    { x: 20, open: 60, close: 40, high: 35, low: 65 },
    { x: 30, open: 40, close: 50, high: 30, low: 55 }, // Up candle before down move
    { x: 40, open: 50, close: 70, high: 45, low: 75 }, // Down move begins
    { x: 50, open: 70, close: 90, high: 65, low: 95 }, // Displaces through C3's Open (40), closes below. CISD confirmed.
    { x: 60, open: 90, close: 70, high: 65, low: 95 }, // Retrace
    { x: 70, open: 70, close: 35, high: 30, low: 75 }, // Retest CISD level (C3 Open = 40). Entry.
    { x: 80, open: 35, close: 85, high: 30, low: 90 }, // Expansion
  ];
  const bearZones = [
    { x: 25, y: 38, w: 60, h: 4, fill: "rgba(139, 92, 246, 0.3)", stroke: "#8b5cf6", label: "CISD Level" }
  ];
  const bearLines = [
    { x1: 65, y1: 40, x2: 75, y2: 40, stroke: "#ef4444", dashed: true, label: "Entry" },
    { x1: 65, y1: 25, x2: 95, y2: 25, stroke: "#ef4444", dashed: true, label: "SL" },
  ];
  const bearAnnotations = [
    { x: 50, y: 95, type: 'text', text: 'MSS / Displacement', offsetY: 0 },
    { x: 70, y: 35, type: 'arrow-down', text: 'Sell', offsetY: -8 }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="bg-[var(--color-brand-card)] p-8 rounded-2xl border border-[var(--color-brand-border)]">
        <h1 className="text-3xl font-bold mb-4 text-purple-400 flex items-center gap-3">
          <Target className="w-8 h-8" /> Change In State of Delivery (CISD)
        </h1>
        <p className="text-gray-300 mb-6">
          A CISD occurs when price displaces through a prominent opposing candle, signaling a true shift in institutional order flow. The open/close of that violated candle becomes a highly sensitive support/resistance level.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-black/30 rounded-lg border border-white/5">
            <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Stop Loss</span>
            <span className="text-red-400 font-semibold">Above/Below the swing point</span>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/5">
            <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Take Profit</span>
            <span className="text-emerald-400 font-semibold">Next Liquidity Draw</span>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/5">
            <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Min R:R</span>
            <span className="text-purple-400 font-semibold">1 : 2.5+</span>
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
            <CandlestickChartSVG title="Bullish CISD Setup" data={bullData} zones={bullZones} lines={bullLines} annotations={bullAnnotations} />
          </div>
          <div className={bias === 'bearish' ? 'block lg:block' : 'hidden lg:block opacity-50'}>
            <CandlestickChartSVG title="Bearish CISD Setup" data={bearData} zones={bearZones} lines={bearLines} annotations={bearAnnotations} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <CheckCircle className="text-purple-400" /> Step-by-Step Execution
          </h2>
          <Accordion steps={cisdSteps} />
        </div>

        <div className="space-y-6">
          <div className="bg-black/20 p-6 rounded-xl border border-[var(--color-brand-border)]">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Timeframes
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex justify-between items-center"><span className="text-gray-500">Bias:</span> <span className="font-semibold">Daily / 4H</span></li>
              <li className="flex justify-between items-center"><span className="text-gray-500">Setup:</span> <span className="font-semibold">1H / 15m</span></li>
              <li className="flex justify-between items-center"><span className="text-gray-500">Execution:</span> <span className="font-semibold">5m / 3m</span></li>
            </ul>
          </div>
          
          <div className="bg-black/20 p-6 rounded-xl border border-[var(--color-brand-border)]">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Pro Notes
            </h3>
            <ul className="list-disc pl-4 space-y-2 text-sm text-gray-400">
              <li>CISD requires a prominent candle to be traded through. A small indecision candle does not make a strong CISD.</li>
              <li>Wait for candle close to confirm the CISD; wicks do not count as a true shift in delivery.</li>
              <li>Often acts as the first entry point before a larger FVG forms.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
