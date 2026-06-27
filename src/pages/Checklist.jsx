import React, { useState, useEffect } from 'react';
import { ClipboardCheck, Save, RefreshCw, AlertTriangle, Calculator } from 'lucide-react';
import clsx from 'clsx';

const checklistItems = [
  { id: 1, category: "HTF Bias", text: "Checked Daily/4H chart for directional bias" },
  { id: 2, category: "HTF Bias", text: "Price is reacting from a HTF PD Array (OB, FVG, Liquidity Pool)" },
  { id: 3, category: "Session", text: "Current time is within a Kill Zone (London or NY Open)" },
  { id: 4, category: "Session", text: "Not trading during major red folder news events" },
  { id: 5, category: "Entry Model", text: "Liquidity has been clearly swept" },
  { id: 6, category: "Entry Model", text: "Energetic displacement observed breaking structure (MSS)" },
  { id: 7, category: "Entry Model", text: "Clear FVG, OB, or CISD formed after displacement" },
  { id: 8, category: "Confluence", text: "Entry point aligns with Fibonacci OTE (0.618 - 0.786)" },
  { id: 9, category: "Confluence", text: "Time of day aligns with expected macroeconomic flow" },
  { id: 10, category: "Candle Confirmation", text: "Waited for candle to CLOSE inside the zone" },
  { id: 11, category: "Candle Confirmation", text: "Observed a bullish/bearish confirmation pattern (e.g., Engulfing, Pin bar)" },
  { id: 12, category: "Risk Management", text: "Risk is 1% or less of total account balance" },
  { id: 13, category: "Risk Management", text: "Stop loss is placed at structural invalidation point" }
];

export default function Checklist() {
  const [checked, setChecked] = useState(new Set());
  const [formData, setFormData] = useState({
    pair: '', direction: 'LONG', model: 'FVG', session: 'NY AM',
    entry: '', sl: '', tp: '', notes: ''
  });
  const [rr, setRr] = useState(0);

  const toggleCheck = (id) => {
    const newChecked = new Set(checked);
    if (newChecked.has(id)) newChecked.delete(id);
    else newChecked.add(id);
    setChecked(newChecked);
  };

  const handleReset = () => {
    if(window.confirm("Are you sure you want to reset the checklist and form?")) {
      setChecked(new Set());
      setFormData({
        pair: '', direction: 'LONG', model: 'FVG', session: 'NY AM',
        entry: '', sl: '', tp: '', notes: ''
      });
    }
  };

  // Calculate R:R
  useEffect(() => {
    const entry = parseFloat(formData.entry);
    const sl = parseFloat(formData.sl);
    const tp = parseFloat(formData.tp);

    if (entry && sl && tp && entry !== sl) {
      let risk, reward;
      if (formData.direction === 'LONG') {
        risk = entry - sl;
        reward = tp - entry;
      } else {
        risk = sl - entry;
        reward = entry - tp;
      }

      if (risk > 0 && reward > 0) {
        setRr((reward / risk).toFixed(2));
      } else {
        setRr(0);
      }
    } else {
      setRr(0);
    }
  }, [formData]);

  const score = Math.round((checked.size / checklistItems.length) * 100);
  
  let scoreColor = 'bg-red-500';
  let scoreText = 'NO TRADE';
  if (score === 100) { scoreColor = 'bg-emerald-500'; scoreText = 'EXECUTE'; }
  else if (score >= 80) { scoreColor = 'bg-amber-500'; scoreText = 'REVIEW'; }
  else if (score >= 60) { scoreColor = 'bg-orange-500'; scoreText = 'WAIT'; }

  const categories = [...new Set(checklistItems.map(item => item.category))];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="bg-[var(--color-brand-card)] p-8 rounded-2xl border border-[var(--color-brand-border)]">
        <h1 className="text-3xl font-bold mb-4 text-white flex items-center gap-3">
          <ClipboardCheck className="w-8 h-8 text-blue-500" /> Pre-Trade Checklist & Setup Log
        </h1>
        <p className="text-gray-300">
          Discipline is the bridge between goals and accomplishment. Never force a trade. Use this checklist to objectively score your setup before execution.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Checklist */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[var(--color-brand-card)] rounded-2xl border border-[var(--color-brand-border)] overflow-hidden">
            
            {/* Progress Bar Header */}
            <div className="p-6 border-b border-[var(--color-brand-border)] bg-black/20">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <h2 className="text-xl font-bold">Setup Quality Score</h2>
                  <p className="text-sm text-gray-400">{checked.size} of {checklistItems.length} criteria met</p>
                </div>
                <div className="text-right">
                  <span className={clsx("text-2xl font-black", scoreColor.replace('bg-', 'text-'))}>
                    {score}%
                  </span>
                  <span className={clsx("ml-2 px-2 py-1 rounded text-xs font-bold text-black", scoreColor)}>
                    {scoreText}
                  </span>
                </div>
              </div>
              <div className="h-3 w-full bg-black rounded-full overflow-hidden border border-white/10">
                <div 
                  className={clsx("h-full transition-all duration-500", scoreColor)}
                  style={{ width: `${score}%` }}
                ></div>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {categories.map(cat => (
                <div key={cat}>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 pb-2 border-b border-white/5">{cat}</h3>
                  <div className="space-y-3">
                    {checklistItems.filter(i => i.category === cat).map(item => (
                      <label 
                        key={item.id} 
                        className={clsx(
                          "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors border",
                          checked.has(item.id) 
                            ? "bg-blue-500/10 border-blue-500/30" 
                            : "bg-black/20 border-transparent hover:bg-black/40 hover:border-white/5"
                        )}
                      >
                        <input 
                          type="checkbox" 
                          className="mt-1 w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                          checked={checked.has(item.id)}
                          onChange={() => toggleCheck(item.id)}
                        />
                        <span className={clsx("text-sm", checked.has(item.id) ? "text-gray-200" : "text-gray-400")}>
                          {item.text}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Trade Log Form & Rules */}
        <div className="space-y-6">
          <div className="bg-[var(--color-brand-card)] rounded-2xl border border-[var(--color-brand-border)] p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Calculator className="text-purple-500" /> Trade Setup Log
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Pair / Asset</label>
                <input type="text" placeholder="e.g. EURUSD, NQ, BTC" className="w-full bg-black/40 border border-[var(--color-brand-border)] rounded-md px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" value={formData.pair} onChange={e => setFormData({...formData, pair: e.target.value})} />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setFormData({...formData, direction: 'LONG'})}
                  className={clsx("py-2 rounded-md font-bold text-sm transition-colors border", formData.direction === 'LONG' ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50" : "bg-black/40 text-gray-500 border-transparent hover:text-gray-300")}
                >LONG</button>
                <button 
                  onClick={() => setFormData({...formData, direction: 'SHORT'})}
                  className={clsx("py-2 rounded-md font-bold text-sm transition-colors border", formData.direction === 'SHORT' ? "bg-red-500/20 text-red-400 border-red-500/50" : "bg-black/40 text-gray-500 border-transparent hover:text-gray-300")}
                >SHORT</button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Model</label>
                  <select className="w-full bg-black/40 border border-[var(--color-brand-border)] rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})}>
                    <option>FVG</option>
                    <option>CISD</option>
                    <option>Fibonacci</option>
                    <option>Order Block</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Session</label>
                  <select className="w-full bg-black/40 border border-[var(--color-brand-border)] rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" value={formData.session} onChange={e => setFormData({...formData, session: e.target.value})}>
                    <option>Asian</option>
                    <option>London</option>
                    <option>NY AM</option>
                    <option>NY PM</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Entry</label>
                  <input type="number" step="any" className="w-full bg-black/40 border border-[var(--color-brand-border)] rounded-md px-2 py-2 text-white text-sm focus:outline-none" value={formData.entry} onChange={e => setFormData({...formData, entry: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Stop Loss</label>
                  <input type="number" step="any" className="w-full bg-black/40 border border-[var(--color-brand-border)] rounded-md px-2 py-2 text-white text-sm focus:outline-none" value={formData.sl} onChange={e => setFormData({...formData, sl: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Take Profit</label>
                  <input type="number" step="any" className="w-full bg-black/40 border border-[var(--color-brand-border)] rounded-md px-2 py-2 text-white text-sm focus:outline-none" value={formData.tp} onChange={e => setFormData({...formData, tp: e.target.value})} />
                </div>
              </div>

              {/* R:R Calculator Result */}
              <div className={clsx("p-3 rounded-lg border flex items-center justify-between", rr >= 2 ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : rr > 0 ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-black/20 border-white/5 text-gray-500")}>
                <span className="text-sm font-bold uppercase">Risk : Reward</span>
                <span className="font-mono font-bold text-lg">{rr > 0 ? `1 : ${rr}` : '--'}</span>
              </div>
              {rr > 0 && rr < 2 && (
                <div className="flex items-start gap-2 text-xs text-red-400 mt-1">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Warning: R:R is below the ICT recommended 1:2 minimum.</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Trade Notes</label>
                <textarea rows="3" placeholder="Why are you taking this trade? What is the narrative?" className="w-full bg-black/40 border border-[var(--color-brand-border)] rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 resize-none" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}></textarea>
              </div>

              <div className="flex gap-3 pt-4 border-t border-[var(--color-brand-border)]">
                <button onClick={handleReset} className="flex-1 py-2 px-4 bg-black/40 hover:bg-black/60 text-gray-300 rounded-md text-sm font-bold transition-colors flex justify-center items-center gap-2">
                  <RefreshCw className="w-4 h-4" /> Reset
                </button>
                <button className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm font-bold transition-colors flex justify-center items-center gap-2">
                  <Save className="w-4 h-4" /> Save Log
                </button>
              </div>
            </div>
          </div>

          <div className="bg-blue-900/10 p-6 rounded-2xl border border-blue-500/20">
            <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Quick ICT Rules
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>• Do not trade 15 mins before/after high-impact news.</li>
              <li>• If the first setup fails, cut risk in half for the second.</li>
              <li>• Max 2 consecutive losses per day. Walk away.</li>
              <li>• Always secure partials at 1:2 R:R.</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
