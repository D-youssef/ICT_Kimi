import React, { useState } from 'react';
import { TrendingUp, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Accordion from '../components/ui/Accordion';
import CandlestickChartSVG from '../components/charts/CandlestickChartSVG';

const cisdSteps = [
  { title: "Identify Institutional Order Flow", content: "Determine if the higher timeframe order flow is bullish or bearish based on recent swings and displacement." },
  { title: "Wait for Key Level Interaction", content: "Price must interact with a HTF POI (Point of Interest) like a Daily/4H Order Block, FVG, or major Liquidity pool." },
  { title: "Observe LTF Market Structure", content: "Drop to a lower timeframe (e.g., 5m or 15m). Watch the current structure heading into the HTF POI." },
  { title: "Identify the Shift (MSS)", content: "Wait for a prominent structural swing point to be broken with energetic displacement. This confirms the smart money reversing." },
  { title: "Change In State of Delivery (CISD)", content: "A CISD is confirmed when an opposing candle (e.g., last down candle before up move) is traded through and closed beyond its open." },
  { title: "Mark the CISD Level", content: "Extend the open/close of the candle that triggered the CISD. This level will now act as support/resistance." },
  { title: "Entry on Retest", content: "Wait for price to pull back to the CISD level. Enter as price taps into this newly established institutional level." },
  { title: "Stop Loss & Take Profit", content: "SL goes beyond the recent swing high/low that formed the MSS. TP at the next internal/external liquidity pool." },
];

export default function CISDPage() {
  const { t } = useTranslation();
  const [scenario, setScenario] = useState('bullish');

  // Bullish CISD
  const bullData = [
    { x: 10, open: 80, close: 60, high: 55, low: 85 },
    { x: 20, open: 60, close: 40, high: 35, low: 65 },
    { x: 30, open: 40, close: 55, high: 35, low: 60 }, // Last DOWN candle before up impulse (CISD candidate)
    { x: 40, open: 55, close: 30, high: 25, low: 60 }, // Strong up impulse - trades through C3 open (40). CISD confirmed.
    { x: 50, open: 30, close: 15, high: 10, low: 35 }, // Continued expansion
    { x: 60, open: 15, close: 35, high: 10, low: 40 }, // Retrace
    { x: 70, open: 35, close: 42, high: 30, low: 48 }, // Retrace into CISD level
    { x: 80, open: 42, close: 15, high: 10, low: 47 }, // Entry + expansion
    { x: 90, open: 15, close: 5,  high: 2,  low: 20 }, // TP hit
  ];
  const bullZones = [
    { x: 25, y: 38, w: 55, h: 7, fill: "rgba(139, 92, 246, 0.25)", stroke: "#8b5cf6", label: "CISD Level" }
  ];
  const bullLines = [
    { x1: 65, y1: 40, x2: 75, y2: 40, stroke: "#10b981", dashed: true, label: "Entry" },
    { x1: 65, y1: 95, x2: 95, y2: 95, stroke: "#ef4444", dashed: true, label: "SL" },
    { x1: 80, y1: 5, x2: 95, y2: 5, stroke: "#10b981", dashed: true, label: "TP" },
  ];
  const bullAnnotations = [
    { x: 40, y: 22, type: 'text', text: 'MSS + CISD Confirmed', offsetY: -4 },
    { x: 72, y: 45, type: 'arrow-up', text: 'Buy', offsetY: 8 }
  ];

  // Bearish CISD
  const bearData = [
    { x: 10, open: 20, close: 40, high: 15, low: 45 },
    { x: 20, open: 40, close: 60, high: 35, low: 65 },
    { x: 30, open: 60, close: 45, high: 40, low: 65 }, // Last UP candle before down impulse (CISD candidate)
    { x: 40, open: 45, close: 70, high: 40, low: 75 }, // Strong down impulse - trades through C3 open (60). CISD confirmed.
    { x: 50, open: 70, close: 85, high: 65, low: 90 }, // Continued expansion
    { x: 60, open: 85, close: 65, high: 60, low: 90 }, // Retrace
    { x: 70, open: 65, close: 57, high: 52, low: 70 }, // Retrace into CISD level
    { x: 80, open: 57, close: 85, high: 52, low: 90 }, // Entry + expansion
    { x: 90, open: 85, close: 95, high: 80, low: 98 }, // TP hit
  ];
  const bearZones = [
    { x: 25, y: 55, w: 55, h: 7, fill: "rgba(139, 92, 246, 0.25)", stroke: "#8b5cf6", label: "CISD Level" }
  ];
  const bearLines = [
    { x1: 65, y1: 60, x2: 75, y2: 60, stroke: "#ef4444", dashed: true, label: "Entry" },
    { x1: 65, y1: 5, x2: 95, y2: 5, stroke: "#ef4444", dashed: true, label: "SL" },
    { x1: 80, y1: 95, x2: 95, y2: 95, stroke: "#10b981", dashed: true, label: "TP" },
  ];
  const bearAnnotations = [
    { x: 40, y: 75, type: 'text', text: 'MSS + CISD Confirmed', offsetY: 8 },
    { x: 72, y: 55, type: 'arrow-down', text: 'Sell', offsetY: -8 }
  ];

  // CISD with continuation (after trend retest)
  const contData = [
    { x: 8,  open: 85, close: 70, high: 65, low: 90 },
    { x: 16, open: 70, close: 50, high: 45, low: 75 },
    { x: 24, open: 50, close: 30, high: 25, low: 55 }, // Strong bull impulse already trending
    { x: 32, open: 30, close: 20, high: 15, low: 35 },
    { x: 40, open: 20, close: 35, high: 15, low: 40 }, // Last DOWN candle in pullback = CISD
    { x: 48, open: 35, close: 45, high: 30, low: 50 }, // Pullback continues
    { x: 56, open: 45, close: 60, high: 40, low: 65 }, // Pullback taps CISD
    { x: 64, open: 60, close: 30, high: 25, low: 65 }, // CISD respected → new impulse
    { x: 72, open: 30, close: 10, high: 5,  low: 35 }, // Extension
    { x: 80, open: 10, close: 5,  high: 2,  low: 15 },
  ];
  const contZones = [
    { x: 36, y: 18, w: 30, h: 19, fill: "rgba(139, 92, 246, 0.25)", stroke: "#8b5cf6", label: "CISD (Continuation)" }
  ];
  const contLines = [
    { x1: 60, y1: 35, x2: 68, y2: 35, stroke: "#10b981", dashed: true, label: "Entry" },
    { x1: 60, y1: 90, x2: 85, y2: 90, stroke: "#ef4444", dashed: true, label: "SL" },
    { x1: 72, y1: 5, x2: 85, y2: 5, stroke: "#10b981", dashed: true, label: "TP" },
  ];
  const contAnnotations = [
    { x: 55, y: 60, type: 'text', text: 'Pullback Retest', offsetY: -4 },
    { x: 64, y: 60, type: 'arrow-up', text: 'Buy (Continuation)', offsetY: 8 }
  ];

  const scenarios = {
    bullish:      { title: "Bullish CISD — Reversal Entry",    data: bullData, zones: bullZones, lines: bullLines, annotations: bullAnnotations },
    bearish:      { title: "Bearish CISD — Reversal Entry",    data: bearData, zones: bearZones, lines: bearLines, annotations: bearAnnotations },
    continuation: { title: "Bullish CISD — Trend Continuation", data: contData, zones: contZones, lines: contLines, annotations: contAnnotations },
  };
  const active = scenarios[scenario];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="bg-[var(--color-brand-card)] p-8 rounded-2xl border border-[var(--color-brand-border)]">
        <h1 className="text-3xl font-bold mb-4 text-purple-400 flex items-center gap-3">
          <TrendingUp className="w-8 h-8" /> Change In State of Delivery (CISD)
        </h1>
        <p className="text-gray-300 mb-6">
          CISD occurs when price violates the open of the last opposing candle before a displacement, shifting the market's order flow. It signals a hand-off from bearish to bullish (or vice versa) delivery by the algorithm.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-black/30 rounded-lg border border-white/5">
            <span className="block text-xs font-bold text-gray-500 uppercase mb-1">{t('common.stop_loss', 'Stop Loss')}</span>
            <span className="text-red-400 font-semibold">Beyond the MSS Swing</span>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/5">
            <span className="block text-xs font-bold text-gray-500 uppercase mb-1">{t('common.take_profit', 'Take Profit')}</span>
            <span className="text-emerald-400 font-semibold">Next Liquidity Pool</span>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/5">
            <span className="block text-xs font-bold text-gray-500 uppercase mb-1">{t('common.min_rr', 'Min R:R')}</span>
            <span className="text-purple-400 font-semibold">1 : 2.0+</span>
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-brand-card)] p-6 rounded-2xl border border-[var(--color-brand-border)]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold">Model Visualization Scenarios</h2>
          <select
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm font-semibold text-gray-200 focus:outline-none focus:border-purple-500 w-full sm:w-auto"
          >
            <option value="bullish">Bullish CISD — Reversal Entry</option>
            <option value="bearish">Bearish CISD — Reversal Entry</option>
            <option value="continuation">Bullish CISD — Trend Continuation</option>
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
          <h2 className="text-xl font-bold flex items-center gap-2"><CheckCircle className="text-purple-400" /> Step-by-Step Execution</h2>
          <Accordion steps={cisdSteps} />
        </div>
        <div className="space-y-6">
          <div className="bg-black/20 p-6 rounded-xl border border-[var(--color-brand-border)]">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2"><Clock className="w-4 h-4" /> Timeframes</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex justify-between items-center"><span className="text-gray-500">Bias:</span> <span className="font-semibold">Daily / 4H</span></li>
              <li className="flex justify-between items-center"><span className="text-gray-500">Setup:</span> <span className="font-semibold">15m / 5m</span></li>
              <li className="flex justify-between items-center"><span className="text-gray-500">Entry:</span> <span className="font-semibold">1m confirmation</span></li>
            </ul>
          </div>
          <div className="bg-black/20 p-6 rounded-xl border border-[var(--color-brand-border)]">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Pro Notes</h3>
            <ul className="list-disc pl-4 space-y-2 text-sm text-gray-400">
              <li>CISD is most powerful when it occurs at a HTF OB, FVG, or Liquidity Pool.</li>
              <li>A CISD in a trending market = continuation setup with very tight SL.</li>
              <li>The CISD level must not be breached again before price takes off.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
