import React, { useState } from 'react';
import { Target, TrendingUp, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Accordion from '../components/ui/Accordion';
import CandlestickChartSVG from '../components/charts/CandlestickChartSVG';

const fvgSteps = [
  { title: "Identify HTF Bias", content: "Determine the daily or 4H directional bias. If bullish, you are only looking for long setups in the discount array." },
  { title: "Wait for Liquidity Sweep", content: "Wait for a prominent old high or old low to be swept, triggering retail stops. This is the fuel for the algorithm." },
  { title: "Look for Displacement", content: "After the sweep, look for a strong, energetic move in the opposite direction. This displacement MUST leave a Fair Value Gap (FVG)." },
  { title: "Mark the FVG", content: "The FVG is the space between the high of candle 1 and the low of candle 3 in a 3-candle sequence. Extend this zone forward." },
  { title: "Wait for Pullback", content: "Do not chase the price. Let it return into the FVG zone. The premium/discount of the range should align with the FVG." },
  { title: "Drop to LTF (Optional)", content: "For maximum precision, drop to a lower timeframe (e.g. 1m inside a 15m FVG) and look for a micro market structure shift." },
  { title: "Entry", content: "Enter aggressively as price taps the FVG, or conservatively after a candle closes inside and respects the zone." },
  { title: "Stop Loss & Take Profit", content: "SL goes below the displacement swing low. TP targets the opposing liquidity pool (BSL/SSL) aiming for a minimum 1:2 R:R." },
];

export default function FVGPage() {
  const { t } = useTranslation();
  const [scenario, setScenario] = useState('bullish');

  // Bullish Data
  const bullData = [
    { x: 10, open: 50, close: 70, high: 45, low: 75 },
    { x: 20, open: 70, close: 90, high: 65, low: 95 }, // Sweep
    { x: 30, open: 90, close: 60, high: 55, low: 92 }, // C1
    { x: 40, open: 60, close: 20, high: 15, low: 65 }, // C2
    { x: 50, open: 20, close: 10, high: 5,  low: 25 }, // C3 -> FVG between 55 and 25
    { x: 60, open: 10, close: 35, high: 8,  low: 40 }, 
    { x: 70, open: 35, close: 45, high: 30, low: 50 }, // Retrace into FVG
    { x: 80, open: 45, close: 15, high: 10, low: 50 }, // Expansion up
    { x: 90, open: 15, close: 5,  high: 2,  low: 20 },
  ];
  const bullZones = [
    { x: 30, y: 25, w: 50, h: 30, fill: "rgba(59, 130, 246, 0.2)", stroke: "#3b82f6", label: "Bullish FVG" }
  ];
  const bullLines = [
    { x1: 5, y1: 90, x2: 25, y2: 90, stroke: "#f59e0b", dashed: true, label: "SSL" },
    { x1: 65, y1: 45, x2: 75, y2: 45, stroke: "#10b981", dashed: true, label: "Entry" },
    { x1: 65, y1: 95, x2: 95, y2: 95, stroke: "#ef4444", dashed: true, label: "SL" },
  ];
  const bullAnnotations = [
    { x: 20, y: 95, type: 'sweep', text: 'Purge', offsetY: 6 },
    { x: 70, y: 50, type: 'arrow-up', text: 'Buy', offsetY: 8 }
  ];

  // Bearish Data
  const bearData = [
    { x: 10, open: 50, close: 30, high: 25, low: 55 },
    { x: 20, open: 30, close: 10, high: 5,  low: 35 }, // Sweep
    { x: 30, open: 10, close: 40, high: 8,  low: 45 }, // C1
    { x: 40, open: 40, close: 80, high: 35, low: 85 }, // C2
    { x: 50, open: 80, close: 90, high: 75, low: 95 }, // C3 -> FVG between 45 and 75
    { x: 60, open: 90, close: 65, high: 60, low: 92 }, 
    { x: 70, open: 65, close: 55, high: 50, low: 70 }, // Entry
    { x: 80, open: 55, close: 85, high: 50, low: 90 }, 
    { x: 90, open: 85, close: 95, high: 80, low: 98 }, 
  ];
  const bearZones = [
    { x: 30, y: 45, w: 50, h: 30, fill: "rgba(239, 68, 68, 0.2)", stroke: "#ef4444", label: "Bearish FVG" }
  ];
  const bearLines = [
    { x1: 5, y1: 10, x2: 25, y2: 10, stroke: "#f59e0b", dashed: true, label: "BSL" },
    { x1: 65, y1: 55, x2: 75, y2: 55, stroke: "#ef4444", dashed: true, label: "Entry" },
    { x1: 65, y1: 5, x2: 95, y2: 5, stroke: "#ef4444", dashed: true, label: "SL" },
  ];
  const bearAnnotations = [
    { x: 20, y: 5, type: 'sweep', text: 'Purge', offsetY: -6 },
    { x: 70, y: 50, type: 'arrow-down', text: 'Sell', offsetY: -8 }
  ];

  // Failed Setup Data (Invalidation)
  const failedData = [
    { x: 10, open: 50, close: 70, high: 45, low: 75 },
    { x: 20, open: 70, close: 90, high: 65, low: 95 }, // Sweep
    { x: 30, open: 90, close: 60, high: 55, low: 92 }, // C1
    { x: 40, open: 60, close: 20, high: 15, low: 65 }, // C2
    { x: 50, open: 20, close: 10, high: 5,  low: 25 }, // C3 -> FVG between 55 and 25
    { x: 60, open: 10, close: 40, high: 8,  low: 45 }, 
    { x: 70, open: 40, close: 65, high: 35, low: 70 }, // FVG fully violated (closed below 55)
    { x: 80, open: 65, close: 85, high: 60, low: 90 }, // Continues down
  ];
  const failedZones = [
    { x: 30, y: 25, w: 45, h: 30, fill: "rgba(59, 130, 246, 0.2)", stroke: "#3b82f6", label: "Invalidated FVG" }
  ];
  const failedLines = [
    { x1: 65, y1: 55, x2: 85, y2: 55, stroke: "#ef4444", dashed: true, label: "Invalidation Level" },
  ];
  const failedAnnotations = [
    { x: 70, y: 70, type: 'text', text: 'Candle closed below FVG', offsetY: 6 }
  ];

  const scenarios = {
    'bullish': { title: "Bullish Standard", data: bullData, zones: bullZones, lines: bullLines, annotations: bullAnnotations },
    'bearish': { title: "Bearish Standard", data: bearData, zones: bearZones, lines: bearLines, annotations: bearAnnotations },
    'failed': { title: "Failed Setup (Invalidation)", data: failedData, zones: failedZones, lines: failedLines, annotations: failedAnnotations },
  };

  const active = scenarios[scenario];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="bg-[var(--color-brand-card)] p-8 rounded-2xl border border-[var(--color-brand-border)]">
        <h1 className="text-3xl font-bold mb-4 text-blue-400 flex items-center gap-3">
          <TrendingUp className="w-8 h-8" /> {t('fvg.title', 'Fair Value Gap (FVG)')}
        </h1>
        <p className="text-gray-300 mb-6">
          {t('fvg.desc', 'The FVG is an algorithmic signature of institutional displacement. It occurs when price is delivered so rapidly in one direction that a 3-candle imbalance is created, leaving a void that price tends to return to.')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-black/30 rounded-lg border border-white/5">
            <span className="block text-xs font-bold text-gray-500 uppercase mb-1">{t('common.stop_loss', 'Stop Loss')}</span>
            <span className="text-red-400 font-semibold">Below Displacement Swing Low</span>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/5">
            <span className="block text-xs font-bold text-gray-500 uppercase mb-1">{t('common.take_profit', 'Take Profit')}</span>
            <span className="text-emerald-400 font-semibold">Opposing Liquidity Pool</span>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/5">
            <span className="block text-xs font-bold text-gray-500 uppercase mb-1">{t('common.min_rr', 'Min R:R')}</span>
            <span className="text-blue-400 font-semibold">1 : 2.0+</span>
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-brand-card)] p-6 rounded-2xl border border-[var(--color-brand-border)]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold">Model Visualization Scenarios</h2>
          <select 
            value={scenario} 
            onChange={(e) => setScenario(e.target.value)}
            className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm font-semibold text-gray-200 focus:outline-none focus:border-blue-500 w-full sm:w-auto"
          >
            <option value="bullish">Bullish Standard Setup</option>
            <option value="bearish">Bearish Standard Setup</option>
            <option value="failed">Failed Setup (Invalidation Example)</option>
          </select>
        </div>
        
        <div className="w-full">
          <CandlestickChartSVG 
            title={active.title}
            data={active.data} 
            zones={active.zones} 
            lines={active.lines} 
            annotations={active.annotations} 
            className="h-80 md:h-96 w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <CheckCircle className="text-blue-400" /> Step-by-Step Execution
          </h2>
          <Accordion steps={fvgSteps} />
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
              <li>The highest probability FVGs are those formed immediately after a liquidity sweep.</li>
              <li>If a body closes significantly past the midpoint (Consequent Encroachment) of the FVG, caution is advised.</li>
              <li>Pair this with Fibonacci OTE for extreme confluence.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
