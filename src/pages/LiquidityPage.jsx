import React, { useState } from 'react';
import { Droplet, AlertTriangle, Info, Target, ArrowUpCircle, ArrowDownCircle, ShieldAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CandlestickChartSVG from '../components/charts/CandlestickChartSVG';
import clsx from 'clsx';

export default function LiquidityPage() {
  const { t } = useTranslation();
  const [scenario, setScenario] = useState('bsl_sweep');

  /* -------- BSL SWEEP then Short -------- */
  const bslData = [
    { x: 8,  open: 75, close: 55, high: 50, low: 80 }, // Downtrend
    { x: 18, open: 55, close: 40, high: 35, low: 60 },
    { x: 28, open: 40, close: 50, high: 35, low: 55 }, // Old High = Swing H (Y=35)
    { x: 38, open: 50, close: 65, high: 45, low: 70 }, // Price drops
    { x: 48, open: 65, close: 55, high: 50, low: 70 }, // Consolidation — BSL rests above
    { x: 58, open: 55, close: 28, high: 23, low: 58 }, // Sweeps BSL (wicks above Y=35!)
    { x: 68, open: 28, close: 60, high: 25, low: 65 }, // Strong rejection — displacement down
    { x: 78, open: 60, close: 85, high: 55, low: 90 }, // Distribution
    { x: 88, open: 85, close: 95, high: 80, low: 98 },
  ];
  const bslZones = [
    { x: 23, y: 30, w: 40, h: 8, fill: "rgba(239,68,68,0.12)", stroke: "#ef4444", label: "BSL Pool" }
  ];
  const bslLines = [
    { x1: 5,  y1: 35, x2: 65, y2: 35, stroke: "#ef4444", dashed: true, label: "BSL (Buy Stops)" },
    { x1: 62, y1: 62, x2: 72, y2: 62, stroke: "#ef4444", dashed: true, label: "Short Entry" },
    { x1: 62, y1: 18, x2: 92, y2: 18, stroke: "#ef4444", dashed: true, label: "SL" },
    { x1: 78, y1: 96, x2: 92, y2: 96, stroke: "#10b981", dashed: true, label: "TP (SSL)" },
  ];
  const bslAnnotations = [
    { x: 58, y: 23, type: 'sweep', text: 'Stops Triggered!', offsetY: -6 },
    { x: 68, y: 60, type: 'arrow-down', text: 'Sell after Sweep', offsetY: -8 }
  ];

  /* -------- SSL SWEEP then Long -------- */
  const sslData = [
    { x: 8,  open: 25, close: 45, high: 20, low: 50 }, // Uptrend
    { x: 18, open: 45, close: 60, high: 40, low: 65 },
    { x: 28, open: 60, close: 50, high: 45, low: 65 }, // Old Low = Swing L (Y=65)
    { x: 38, open: 50, close: 35, high: 30, low: 55 }, // Price rises
    { x: 48, open: 35, close: 45, high: 30, low: 50 }, // Consolidation — SSL rests below
    { x: 58, open: 45, close: 72, high: 42, low: 77 }, // Sweeps SSL (wicks below Y=65!)
    { x: 68, open: 72, close: 40, high: 35, low: 75 }, // Strong rejection — displacement up
    { x: 78, open: 40, close: 15, high: 10, low: 45 }, // Distribution
    { x: 88, open: 15, close: 5,  high: 2,  low: 20 },
  ];
  const sslZones = [
    { x: 23, y: 60, w: 40, h: 8, fill: "rgba(16,185,129,0.12)", stroke: "#10b981", label: "SSL Pool" }
  ];
  const sslLines = [
    { x1: 5,  y1: 65, x2: 65, y2: 65, stroke: "#10b981", dashed: true, label: "SSL (Sell Stops)" },
    { x1: 62, y1: 38, x2: 72, y2: 38, stroke: "#10b981", dashed: true, label: "Long Entry" },
    { x1: 62, y1: 80, x2: 92, y2: 80, stroke: "#ef4444", dashed: true, label: "SL" },
    { x1: 78, y1: 4,  x2: 92, y2: 4,  stroke: "#10b981", dashed: true, label: "TP (BSL)" },
  ];
  const sslAnnotations = [
    { x: 58, y: 77, type: 'sweep', text: 'Stops Triggered!', offsetY: 8 },
    { x: 68, y: 36, type: 'arrow-up', text: 'Buy after Sweep', offsetY: 8 }
  ];

  /* -------- INDUCEMENT then TRUE ENTRY -------- */
  const induceData = [
    { x: 8,  open: 80, close: 60, high: 55, low: 85 },
    { x: 18, open: 60, close: 45, high: 40, low: 65 },
    { x: 28, open: 45, close: 35, high: 30, low: 50 }, // Forms Inducement Low (Y=30)
    { x: 38, open: 35, close: 50, high: 30, low: 55 }, // Bounce — retail thinks it's a bottom
    { x: 48, open: 50, close: 65, high: 45, low: 70 }, // Retail goes long
    { x: 58, open: 65, close: 40, high: 35, low: 68 }, // Sweeps Inducement Low — retail stopped out
    { x: 68, open: 40, close: 72, high: 35, low: 75 }, // Sweeps into TRUE OB (Y 72-80)
    { x: 78, open: 72, close: 20, high: 15, low: 78 }, // Smart Money entries — TRUE impulse up
    { x: 88, open: 20, close: 5,  high: 2,  low: 25 },
  ];
  const induceZones = [
    { x: 4,  y: 70, w: 85, h: 10, fill: "rgba(16,185,129,0.18)", stroke: "#10b981", label: "TRUE OB" },
    { x: 24, y: 28, w: 20, h: 5,  fill: "rgba(239,68,68,0.15)", stroke: "#f59e0b", label: "Inducement" },
  ];
  const induceLines = [
    { x1: 5,  y1: 30, x2: 60, y2: 30, stroke: "#f59e0b", dashed: true, label: "Inducement Low (TRAP)" },
    { x1: 72, y1: 72, x2: 82, y2: 72, stroke: "#10b981", dashed: true, label: "True Entry" },
    { x1: 72, y1: 96, x2: 92, y2: 96, stroke: "#ef4444", dashed: true, label: "SL" },
    { x1: 78, y1: 4,  x2: 92, y2: 4,  stroke: "#10b981", dashed: true, label: "TP" },
  ];
  const induceAnnotations = [
    { x: 42, y: 50, type: 'text', text: '← Retail Long (TRAPPED)', offsetY: -4 },
    { x: 58, y: 35, type: 'sweep', text: 'Retail Stops Hit', offsetY: -6 },
    { x: 78, y: 70, type: 'arrow-up', text: 'SMC Entry', offsetY: 8 }
  ];

  const scenarios = {
    bsl_sweep: { title: "BSL Sweep → Short (Bearish)",       data: bslData,    zones: bslZones,    lines: bslLines,    annotations: bslAnnotations    },
    ssl_sweep: { title: "SSL Sweep → Long (Bullish)",         data: sslData,    zones: sslZones,    lines: sslLines,    annotations: sslAnnotations    },
    inducement:{ title: "Inducement Trap → True SMC Entry",   data: induceData, zones: induceZones, lines: induceLines, annotations: induceAnnotations },
  };
  const active = scenarios[scenario];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      <div className="bg-[var(--color-brand-card)] p-8 rounded-2xl border border-[var(--color-brand-border)]">
        <h1 className="text-3xl font-bold mb-4 text-blue-400 flex items-center gap-3">
          <Droplet className="w-8 h-8" /> {t('liquidity.title', 'Liquidity & Inducement')}
        </h1>
        <p className="text-gray-300">
          {t('liquidity.desc', 'Liquidity is the fuel for the algorithm. Understanding where retail stop losses rest (BSL and SSL) allows you to anticipate where the smart money will draw price to next.')}
        </p>
      </div>

      {/* Concept cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--color-brand-card)] border border-red-500/20 p-6 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-[50px] -mr-8 -mt-8 pointer-events-none"></div>
          <ArrowUpCircle className="w-7 h-7 text-red-400 mb-3" />
          <h3 className="text-lg font-bold text-red-400 mb-2">Buy Stop Liquidity (BSL)</h3>
          <p className="text-sm text-gray-400">Rests <strong>above</strong> old highs, equal highs (EQH), and trendline tops. Retail long-breakout traders and bearish stop losses cluster here. The algorithm hunts these stops before selling.</p>
        </div>
        <div className="bg-[var(--color-brand-card)] border border-emerald-500/20 p-6 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-[50px] -mr-8 -mt-8 pointer-events-none"></div>
          <ArrowDownCircle className="w-7 h-7 text-emerald-400 mb-3" />
          <h3 className="text-lg font-bold text-emerald-400 mb-2">Sell Stop Liquidity (SSL)</h3>
          <p className="text-sm text-gray-400">Rests <strong>below</strong> old lows, equal lows (EQL), and trendline bottoms. Retail short-breakout traders and bullish stop losses cluster here. The algorithm sweeps these before buying.</p>
        </div>
        <div className="bg-[var(--color-brand-card)] border border-amber-500/20 p-6 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-[50px] -mr-8 -mt-8 pointer-events-none"></div>
          <ShieldAlert className="w-7 h-7 text-amber-400 mb-3" />
          <h3 className="text-lg font-bold text-amber-400 mb-2">Inducement</h3>
          <p className="text-sm text-gray-400">A <strong>short-term high/low</strong> created to trap retail traders into a position early. Smart money sweeps the inducement BEFORE tapping the true Point of Interest (OB, FVG, CISD).</p>
        </div>
      </div>

      {/* Chart Scenarios */}
      <div className="bg-[var(--color-brand-card)] p-6 rounded-2xl border border-[var(--color-brand-border)]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold">Liquidity Scenarios</h2>
          <select
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm font-semibold text-gray-200 focus:outline-none focus:border-blue-500 w-full sm:w-auto"
          >
            <option value="bsl_sweep">BSL Sweep → Sell (Bearish)</option>
            <option value="ssl_sweep">SSL Sweep → Buy (Bullish)</option>
            <option value="inducement">Inducement Trap → True SMC Entry</option>
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

      {/* Key Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[var(--color-brand-card)] p-6 rounded-xl border border-blue-500/20">
          <h3 className="text-blue-400 font-bold text-lg mb-4 flex items-center gap-2"><Info className="w-5 h-5" /> Internal vs External Liquidity</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li><strong className="text-white">External:</strong> The major swing highs/lows defining the dealing range. These are primary objectives and draw price from afar.</li>
            <li><strong className="text-white">Internal:</strong> FVGs, OBs, and short-term swing points inside the range. Price mitigates internal PD arrays during retracements.</li>
            <li className="pt-2 border-t border-white/5">The typical sequence: Price sweeps <strong>External Liquidity</strong> → retraces to mitigate <strong>Internal</strong> PD Array → runs for next External Liquidity.</li>
          </ul>
        </div>
        <div className="bg-[var(--color-brand-card)] p-6 rounded-xl border border-amber-500/20">
          <h3 className="text-amber-400 font-bold text-lg mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> How to Spot a Liquidity Sweep</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li>1. Price <strong>wicks through</strong> a previous high/low but the candle <strong>body closes back</strong> inside the range.</li>
            <li>2. It happens during a Kill Zone time (London or NY open preferred).</li>
            <li>3. It is immediately followed by a <strong>strong displacement</strong> (large body candle) in the opposite direction.</li>
            <li>4. A FVG or OB is visible in the displacement for entry confirmation.</li>
          </ul>
        </div>
      </div>

      <div className="bg-black/20 p-6 rounded-xl border border-white/5">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Target className="text-purple-400 w-5 h-5"/> Liquidity + Entry Model Synergy</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="pb-3 pr-6">Liquidity Type</th>
                <th className="pb-3 pr-6">Action</th>
                <th className="pb-3 pr-6">Best Follow-up Model</th>
                <th className="pb-3">R:R Potential</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              {[
                ["BSL Sweep",   "Wait for rejection", "Bearish FVG / Bearish OB", "1:3+"],
                ["SSL Sweep",   "Wait for rejection", "Bullish FVG / Bullish OB", "1:3+"],
                ["Inducement",  "Let price take trap", "OTE Fibonacci after deeper sweep", "1:4+"],
                ["Equal Highs", "Mark EQH level",    "Bearish CISD after sweep", "1:2.5+"],
                ["Equal Lows",  "Mark EQL level",    "Bullish CISD after sweep", "1:2.5+"],
              ].map(([type, action, model, rr], idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 pr-6 text-amber-400 font-semibold">{type}</td>
                  <td className="py-3 pr-6 text-gray-300">{action}</td>
                  <td className="py-3 pr-6 text-blue-400">{model}</td>
                  <td className="py-3 text-emerald-400 font-bold">{rr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
