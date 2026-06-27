import React, { useState } from 'react';
import { TrendingUp, AlertCircle, Clock, CheckCircle, List } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
  { title: "Stop Loss & Take Profit", content: "SL just beyond the 1.000 level (the origin swing). TP1 at 0.000 (old high/low), TP2 at -0.27 or -0.62 extensions." },
];

const fibLevels = [
  { level: "0.00",  desc: "External Swing High / Target",      color: "text-emerald-400" },
  { level: "0.27",  desc: "First TP / Partial Take-Off",       color: "text-blue-400"    },
  { level: "0.50",  desc: "Equilibrium — Do not enter here",   color: "text-gray-400"    },
  { level: "0.618", desc: "Start of OTE Zone — premium entry", color: "text-amber-400"   },
  { level: "0.705", desc: "Sweet spot — highest probability",  color: "text-amber-400"   },
  { level: "0.786", desc: "End of OTE Zone — last entry",      color: "text-amber-400"   },
  { level: "1.00",  desc: "Swing Origin — SL placement",       color: "text-red-400"     },
  { level: "-0.27", desc: "Symmetrical Price Objective (SPO)", color: "text-purple-400"  },
  { level: "-0.62", desc: "Extension TP — 2R+ target",         color: "text-purple-400"  },
];

export default function FibonacciPage() {
  const { t } = useTranslation();
  const [scenario, setScenario] = useState('bullish');

  /* -------- BULLISH OTE SETUP -------- */
  // Range: SwingLow=Y80, SwingHigh=Y18 → diff=62
  // 0.618 → 18+(62*0.618)=56.3   0.705 → 18+(62*0.705)=61.7   0.786 → 18+(62*0.786)=66.7   1.0→80
  const bullData = [
    { x: 8,  open: 72, close: 52, high: 48, low: 77 },
    { x: 18, open: 52, close: 30, high: 25, low: 57 },
    { x: 28, open: 30, close: 18, high: 14, low: 33 }, // Swing High
    { x: 38, open: 18, close: 35, high: 14, low: 40 }, // Retrace begins
    { x: 48, open: 35, close: 50, high: 30, low: 55 }, // 0.50 EQ
    { x: 58, open: 50, close: 62, high: 46, low: 66 }, // OTE 0.705
    { x: 68, open: 62, close: 35, high: 30, low: 67 }, // Reacts at OTE – entry
    { x: 78, open: 35, close: 10, high: 5,  low: 40 }, // Expansion to TP
    { x: 88, open: 10, close: 5,  high: 2,  low: 15 },
  ];
  const bullZones = [
    { x: 5, y: 56, w: 85, h: 14, fill: "rgba(245, 158, 11, 0.15)", stroke: "rgba(245,158,11,0.5)", label: "OTE Zone" }
  ];
  const bullLines = [
    { x1: 5, y1: 18, x2: 95, y2: 18, stroke: "#64748b", dashed: true,  label: "0.00 (High)" },
    { x1: 5, y1: 50, x2: 95, y2: 50, stroke: "#64748b", dashed: true,  label: "0.50 EQ"     },
    { x1: 5, y1: 56, x2: 95, y2: 56, stroke: "#f59e0b", dashed: false, label: "0.618"        },
    { x1: 5, y1: 62, x2: 95, y2: 62, stroke: "#f97316", dashed: false, label: "0.705 ★",     width: 0.8 },
    { x1: 5, y1: 67, x2: 95, y2: 67, stroke: "#f59e0b", dashed: false, label: "0.786"        },
    { x1: 5, y1: 80, x2: 95, y2: 80, stroke: "#ef4444", dashed: true,  label: "1.00 SL Zone" },
    { x1: 5, y1: 4,  x2: 95, y2: 4,  stroke: "#10b981", dashed: true,  label: "-0.27 TP"     },
  ];
  const bullAnnotations = [
    { x: 63, y: 64, type: 'arrow-up', text: 'Buy @ OTE', offsetY: 8 }
  ];

  /* -------- BEARISH OTE SETUP -------- */
  // Range: SwingHigh=Y18, SwingLow=Y80 → same diff=62
  // Bearish OTE is in Premium (0.618-0.786 from High down)
  // 0.618 → 18+62*0.618=56.3  0.705→61.7  0.786→66.7  redrawn upward since selling from high
  const bearData = [
    { x: 8,  open: 30, close: 50, high: 25, low: 55 },
    { x: 18, open: 50, close: 72, high: 45, low: 77 },
    { x: 28, open: 72, close: 80, high: 68, low: 84 }, // Swing Low
    { x: 38, open: 80, close: 63, high: 58, low: 84 }, // Retrace begins
    { x: 48, open: 63, close: 50, high: 46, low: 67 }, // 0.50 EQ
    { x: 58, open: 50, close: 37, high: 33, low: 54 }, // OTE 0.705
    { x: 68, open: 37, close: 64, high: 32, low: 68 }, // Reacts at OTE – entry
    { x: 78, open: 64, close: 88, high: 60, low: 92 }, // Expansion to TP
    { x: 88, open: 88, close: 95, high: 84, low: 98 },
  ];
  const bearZones = [
    { x: 5, y: 33, w: 85, h: 14, fill: "rgba(245, 158, 11, 0.15)", stroke: "rgba(245,158,11,0.5)", label: "OTE Zone" }
  ];
  const bearLines = [
    { x1: 5, y1: 80, x2: 95, y2: 80, stroke: "#64748b", dashed: true,  label: "0.00 (Low)"  },
    { x1: 5, y1: 49, x2: 95, y2: 49, stroke: "#64748b", dashed: true,  label: "0.50 EQ"     },
    { x1: 5, y1: 43, x2: 95, y2: 43, stroke: "#f59e0b", dashed: false, label: "0.618"        },
    { x1: 5, y1: 37, x2: 95, y2: 37, stroke: "#f97316", dashed: false, label: "0.705 ★",     width: 0.8 },
    { x1: 5, y1: 33, x2: 95, y2: 33, stroke: "#f59e0b", dashed: false, label: "0.786"        },
    { x1: 5, y1: 18, x2: 95, y2: 18, stroke: "#ef4444", dashed: true,  label: "1.00 SL Zone" },
    { x1: 5, y1: 96, x2: 95, y2: 96, stroke: "#10b981", dashed: true,  label: "-0.27 TP"     },
  ];
  const bearAnnotations = [
    { x: 63, y: 35, type: 'arrow-down', text: 'Sell @ OTE', offsetY: -8 }
  ];

  /* -------- OTE + OB CONFLUENCE -------- */
  const conflData = [
    { x: 8,  open: 75, close: 55, high: 50, low: 80 },
    { x: 18, open: 55, close: 30, high: 25, low: 60 },
    { x: 28, open: 30, close: 18, high: 14, low: 33 }, // Swing High
    { x: 38, open: 18, close: 32, high: 14, low: 37 },
    { x: 48, open: 32, close: 50, high: 28, low: 55 },
    { x: 58, open: 50, close: 62, high: 46, low: 67 }, // Hits OTE + OB zone
    { x: 68, open: 62, close: 30, high: 25, low: 67 }, // Strong rejection
    { x: 78, open: 30, close: 5,  high: 2,  low: 35 }, // Extension
    { x: 88, open: 5,  close: 2,  high: 1,  low: 10 },
  ];
  const conflZones = [
    { x: 5,  y: 56, w: 85, h: 14, fill: "rgba(245, 158, 11, 0.12)", stroke: "rgba(245,158,11,0.5)", label: "OTE Zone" },
    { x: 36, y: 55, w: 26, h: 13, fill: "rgba(16, 185, 129, 0.2)",  stroke: "#10b981", label: "OB" },
  ];
  const conflLines = [
    { x1: 5, y1: 18, x2: 95, y2: 18, stroke: "#64748b", dashed: true, label: "0.00" },
    { x1: 5, y1: 62, x2: 95, y2: 62, stroke: "#f97316", dashed: false, label: "0.705 ★", width: 0.8 },
    { x1: 5, y1: 80, x2: 95, y2: 80, stroke: "#ef4444", dashed: true, label: "1.00 SL" },
    { x1: 5, y1: 4,  x2: 95, y2: 4,  stroke: "#10b981", dashed: true, label: "-0.27 TP" },
  ];
  const conflAnnotations = [
    { x: 62, y: 60, type: 'arrow-up', text: 'OTE + OB Confluence', offsetY: 8 }
  ];

  const scenarios = {
    bullish:     { title: "Bullish OTE — Long Entry",               data: bullData,  zones: bullZones,  lines: bullLines,  annotations: bullAnnotations  },
    bearish:     { title: "Bearish OTE — Short Entry",              data: bearData,  zones: bearZones,  lines: bearLines,  annotations: bearAnnotations  },
    confluence:  { title: "OTE + Order Block Confluence — Max Prob", data: conflData, zones: conflZones, lines: conflLines, annotations: conflAnnotations },
  };
  const active = scenarios[scenario];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="bg-[var(--color-brand-card)] p-8 rounded-2xl border border-[var(--color-brand-border)]">
        <h1 className="text-3xl font-bold mb-4 text-amber-400 flex items-center gap-3">
          <TrendingUp className="w-8 h-8" /> Fibonacci OTE (Optimal Trade Entry)
        </h1>
        <p className="text-gray-300 mb-6">
          The Fibonacci tool is used to identify algorithmic precision levels for trade entries. The Optimal Trade Entry (OTE) zone between the 0.618 and 0.786 levels represents where Smart Money consistently finds value to execute positions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-black/30 rounded-lg border border-white/5">
            <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Stop Loss</span>
            <span className="text-red-400 font-semibold">Just Beyond the 1.00 Level</span>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/5">
            <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Take Profit</span>
            <span className="text-emerald-400 font-semibold">-0.27 / -0.62 Extensions</span>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/5">
            <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Min R:R</span>
            <span className="text-amber-400 font-semibold">1 : 3.0+</span>
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-brand-card)] p-6 rounded-2xl border border-[var(--color-brand-border)]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold">Model Visualization Scenarios</h2>
          <select
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm font-semibold text-gray-200 focus:outline-none focus:border-amber-500 w-full sm:w-auto"
          >
            <option value="bullish">Bullish OTE — Long Entry</option>
            <option value="bearish">Bearish OTE — Short Entry</option>
            <option value="confluence">OTE + OB Confluence (Max Probability)</option>
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
          <h2 className="text-xl font-bold flex items-center gap-2"><CheckCircle className="text-amber-400" /> Step-by-Step Execution</h2>
          <Accordion steps={fibSteps} />
        </div>
        <div className="space-y-6">
          <div className="bg-black/20 p-6 rounded-xl border border-[var(--color-brand-border)]">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <List className="w-4 h-4" /> Key Fib Levels
            </h3>
            <div className="space-y-2">
              {fibLevels.map((row, i) => (
                <div key={i} className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className={`font-mono font-bold text-sm ${row.color}`}>{row.level}</span>
                  <span className="text-xs text-gray-400 text-right ml-3">{row.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-black/20 p-6 rounded-xl border border-[var(--color-brand-border)]">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Pro Notes</h3>
            <ul className="list-disc pl-4 space-y-2 text-sm text-gray-400">
              <li>The 0.705 is ICT's proprietary sweet spot — not a standard Fib level.</li>
              <li>If price takes the 1.000 (origin swing) before reaching OTE, the setup is invalid.</li>
              <li>Fib works best with a liquidity sweep immediately before the swing.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
