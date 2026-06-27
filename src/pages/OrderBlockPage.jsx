import React, { useState } from 'react';
import { TrendingUp, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Accordion from '../components/ui/Accordion';
import CandlestickChartSVG from '../components/charts/CandlestickChartSVG';

const obSteps = [
  { title: "Identify the Narrative", content: "Determine HTF bias. Price must be approaching an area where we expect a reversal (like an old high/low or HTF PD array)." },
  { title: "Watch for Displacement", content: "Look for a strong, energetic move away from a level. This displacement must break structure (MSS) and ideally leave a FVG." },
  { title: "Locate the Order Block", content: "The Bullish OB is the last down candle(s) prior to the bullish displacement. The Bearish OB is the last up candle(s) prior to bearish displacement." },
  { title: "Mark the OB Zone", content: "Draw a zone from the high to the low of the OB candle. The most sensitive part is the open and its midpoint (Mean Threshold)." },
  { title: "Wait for the Return", content: "Let price trade away, then wait for a retracement back into the Order Block zone." },
  { title: "Verify with LTF", content: "On a lower timeframe, watch price action as it taps the OB. Look for a willingness to reject the level." },
  { title: "Entry", content: "Enter aggressively at the top of the OB (or open price), or conservatively at the Mean Threshold." },
  { title: "Stop Loss & Take Profit", content: "SL goes just below the low of the OB (or the swing low). TP targets the opposing liquidity pool." },
];

export default function OrderBlockPage() {
  const { t } = useTranslation();
  const [scenario, setScenario] = useState('bullish');

  /* -------- BULLISH OB -------- */
  const bullData = [
    { x: 8,  open: 50, close: 70, high: 45, low: 75 },
    { x: 18, open: 70, close: 85, high: 65, low: 90 }, // Last DOWN candle before bull displacement (OB)
    { x: 28, open: 85, close: 30, high: 25, low: 88 }, // Strong bull displacement
    { x: 38, open: 30, close: 10, high: 5,  low: 35 }, // Continued expansion
    { x: 48, open: 10, close: 35, high: 5,  low: 40 }, // Retrace starts
    { x: 58, open: 35, close: 60, high: 30, low: 65 }, // Retrace into OB (High=65, Low=90)
    { x: 68, open: 60, close: 70, high: 55, low: 75 }, // Taps OB Mean Threshold — entry
    { x: 78, open: 70, close: 20, high: 15, low: 75 }, // Expansion
    { x: 88, open: 20, close: 5,  high: 2,  low: 25 }, // TP
  ];
  const bullZones = [
    { x: 14, y: 65, w: 50, h: 25, fill: "rgba(16,185,129,0.18)", stroke: "#10b981", label: "Bullish OB" }
  ];
  const bullLines = [
    { x1: 14, y1: 77.5, x2: 70, y2: 77.5, stroke: "#10b981", dashed: true, label: "Mean Threshold" },
    { x1: 62, y1: 68, x2: 72, y2: 68, stroke: "#10b981", dashed: true, label: "Entry" },
    { x1: 62, y1: 94, x2: 92, y2: 94, stroke: "#ef4444", dashed: true, label: "SL" },
    { x1: 78, y1: 4,  x2: 92, y2: 4,  stroke: "#10b981", dashed: true, label: "TP" },
  ];
  const bullAnnotations = [
    { x: 33, y: 15, type: 'text', text: 'Displacement (MSS)', offsetY: 0 },
    { x: 68, y: 72, type: 'arrow-up', text: 'Buy', offsetY: 8 }
  ];

  /* -------- BEARISH OB -------- */
  const bearData = [
    { x: 8,  open: 70, close: 50, high: 45, low: 75 },
    { x: 18, open: 50, close: 20, high: 15, low: 55 }, // Last UP candle before bear displacement (OB)
    { x: 28, open: 20, close: 70, high: 15, low: 75 }, // Strong bear displacement
    { x: 38, open: 70, close: 90, high: 65, low: 95 }, // Continued expansion
    { x: 48, open: 90, close: 65, high: 60, low: 93 }, // Retrace starts
    { x: 58, open: 65, close: 40, high: 35, low: 68 }, // Retrace into OB (High=15, Low=55)
    { x: 68, open: 40, close: 30, high: 25, low: 45 }, // Taps OB Mean — entry
    { x: 78, open: 30, close: 80, high: 25, low: 85 }, // Expansion
    { x: 88, open: 80, close: 95, high: 75, low: 98 }, // TP
  ];
  const bearZones = [
    { x: 14, y: 15, w: 50, h: 40, fill: "rgba(239,68,68,0.18)", stroke: "#ef4444", label: "Bearish OB" }
  ];
  const bearLines = [
    { x1: 14, y1: 35, x2: 70, y2: 35, stroke: "#ef4444", dashed: true, label: "Mean Threshold" },
    { x1: 62, y1: 32, x2: 72, y2: 32, stroke: "#ef4444", dashed: true, label: "Entry" },
    { x1: 62, y1: 5,  x2: 92, y2: 5,  stroke: "#ef4444", dashed: true, label: "SL" },
    { x1: 78, y1: 96, x2: 92, y2: 96, stroke: "#10b981", dashed: true, label: "TP" },
  ];
  const bearAnnotations = [
    { x: 33, y: 85, type: 'text', text: 'Displacement (MSS)', offsetY: 8 },
    { x: 68, y: 28, type: 'arrow-down', text: 'Sell', offsetY: -8 }
  ];

  /* -------- BREAKER BLOCK (failed OB becomes opposite) -------- */
  const breakerData = [
    { x: 8,  open: 40, close: 60, high: 35, low: 65 },
    { x: 18, open: 60, close: 80, high: 55, low: 87 }, // OB (last down candle)
    { x: 28, open: 80, close: 55, high: 50, low: 83 }, // Displacement — OB formed
    { x: 38, open: 55, close: 45, high: 40, low: 58 }, // Retrace
    { x: 48, open: 45, close: 85, high: 40, low: 90 }, // OB FAILS — price takes out the swing low → Breaker!
    { x: 58, open: 85, close: 70, high: 65, low: 90 }, // Retrace into what WAS OB (now resistance)
    { x: 68, open: 70, close: 60, high: 55, low: 75 }, // Retest of broken OB
    { x: 78, open: 60, close: 90, high: 55, low: 95 }, // Sell — Breaker Block entry
    { x: 88, open: 90, close: 97, high: 85, low: 99 }, // TP
  ];
  const breakerZones = [
    { x: 14, y: 55, w: 55, h: 32, fill: "rgba(239,68,68,0.15)", stroke: "#ef4444", label: "Breaker Block" }
  ];
  const breakerLines = [
    { x1: 62, y1: 65, x2: 72, y2: 65, stroke: "#ef4444", dashed: true, label: "Short Entry" },
    { x1: 62, y1: 5,  x2: 92, y2: 5,  stroke: "#ef4444", dashed: true, label: "SL" },
    { x1: 78, y1: 97, x2: 92, y2: 97, stroke: "#10b981", dashed: true, label: "TP" },
  ];
  const breakerAnnotations = [
    { x: 48, y: 90, type: 'sweep', text: 'OB Fails → Becomes Breaker', offsetY: 7 },
    { x: 72, y: 68, type: 'arrow-down', text: 'Sell (Breaker)', offsetY: -8 }
  ];

  const scenarios = {
    bullish: { title: "Bullish OB — Long Entry",              data: bullData,    zones: bullZones,    lines: bullLines,    annotations: bullAnnotations    },
    bearish: { title: "Bearish OB — Short Entry",             data: bearData,    zones: bearZones,    lines: bearLines,    annotations: bearAnnotations    },
    breaker: { title: "Breaker Block — Failed OB Reversal",   data: breakerData, zones: breakerZones, lines: breakerLines, annotations: breakerAnnotations },
  };
  const active = scenarios[scenario];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="bg-[var(--color-brand-card)] p-8 rounded-2xl border border-[var(--color-brand-border)]">
        <h1 className="text-3xl font-bold mb-4 text-emerald-400 flex items-center gap-3">
          <TrendingUp className="w-8 h-8" /> Order Block (OB)
        </h1>
        <p className="text-gray-300 mb-6">
          An Order Block is the last opposing candle before a significant displacement that breaks market structure. It represents the candle where institutions placed their bulk orders. When price returns to this zone, it is often the highest probability entry point in the model.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-black/30 rounded-lg border border-white/5">
            <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Stop Loss</span>
            <span className="text-red-400 font-semibold">Below OB Low (Bullish)</span>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/5">
            <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Take Profit</span>
            <span className="text-emerald-400 font-semibold">Opposing Liquidity Pool</span>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/5">
            <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Min R:R</span>
            <span className="text-emerald-400 font-semibold">1 : 2.5+</span>
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-brand-card)] p-6 rounded-2xl border border-[var(--color-brand-border)]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold">Model Visualization Scenarios</h2>
          <select
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm font-semibold text-gray-200 focus:outline-none focus:border-emerald-500 w-full sm:w-auto"
          >
            <option value="bullish">Bullish OB — Long Entry</option>
            <option value="bearish">Bearish OB — Short Entry</option>
            <option value="breaker">Breaker Block — Failed OB Reversal</option>
          </select>
        </div>
        <CandlestickChartSVG
          title={active.title}
          data={active.data}
          zones={active.zones}
          lines={active.lines}
          annotations={active.annotations}
          className="h-80 md:h-96 w-full"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2"><CheckCircle className="text-emerald-400" /> Step-by-Step Execution</h2>
          <Accordion steps={obSteps} />
        </div>
        <div className="space-y-6">
          <div className="bg-black/20 p-6 rounded-xl border border-[var(--color-brand-border)]">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2"><Clock className="w-4 h-4" /> Timeframes</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex justify-between items-center"><span className="text-gray-500">Identify OB:</span> <span className="font-semibold">4H / 1H</span></li>
              <li className="flex justify-between items-center"><span className="text-gray-500">Setup:</span>      <span className="font-semibold">15m / 5m</span></li>
              <li className="flex justify-between items-center"><span className="text-gray-500">Entry:</span>      <span className="font-semibold">5m / 1m</span></li>
            </ul>
          </div>
          <div className="bg-black/20 p-6 rounded-xl border border-[var(--color-brand-border)]">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Pro Notes</h3>
            <ul className="list-disc pl-4 space-y-2 text-sm text-gray-400">
              <li>A <strong>Breaker Block</strong> forms when an OB fails (price takes its low). This becomes a resistance/support flip.</li>
              <li>The <strong>Mean Threshold</strong> (midpoint) of the OB is the highest-probability entry sub-level.</li>
              <li>A bullish OB that aligns with a Daily/4H FVG is an extremely high probability setup.</li>
              <li>OBs lose validity if price fully closes through them and re-opens on the other side.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
