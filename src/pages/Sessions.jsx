import React from 'react';
import { Clock, Globe, Zap, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

const sessions = [
  {
    name: "Asian Session",
    time: "8:00 PM - 12:00 AM EST",
    color: "bg-blue-500",
    text: "text-blue-400",
    border: "border-blue-500/20",
    desc: "Typically characterizes the accumulation phase of the AMD cycle. Price often consolidates in a tight range, building liquidity on both sides.",
    dos: ["Mark the Asian High and Low for future liquidity draws.", "Study the range for clues about the next day's bias."],
    donts: ["Do not expect large expansion moves.", "Avoid taking breakout trades during this time."]
  },
  {
    name: "London Kill Zone",
    time: "2:00 AM - 5:00 AM EST",
    color: "bg-red-500",
    text: "text-red-400",
    border: "border-red-500/20",
    desc: "The Manipulation phase (Judas Swing). London often creates the high or low of the day by sweeping the Asian range liquidity.",
    dos: ["Wait for the fake-out (Judas Swing) before entering.", "Look for OTE entries targeting the opposite side of the range."],
    donts: ["Do not chase the initial 2:00 AM impulse blindly.", "Don't ignore the Daily bias."]
  },
  {
    name: "New York AM Kill Zone",
    time: "8:30 AM - 11:00 AM EST",
    color: "bg-emerald-500",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
    desc: "The Distribution phase. High volatility, driven by US news at 8:30 AM and equities open at 9:30 AM. Offers the highest probability setups.",
    dos: ["Wait for 8:30 AM news volatility to settle.", "Look for continuation of the London trend, or a reversal if London hasn't swept HTF liquidity."],
    donts: ["Do not trade right at 8:30 AM if there is red folder news.", "Avoid forcing a trade if London already met the daily range objective."]
  },
  {
    name: "New York PM Kill Zone",
    time: "1:30 PM - 4:00 PM EST",
    color: "bg-purple-500",
    text: "text-purple-400",
    border: "border-purple-500/20",
    desc: "Late day distribution or reversal. Often retraces the AM move or makes a final push into a HTF liquidity pool before the daily close.",
    dos: ["Look for setups around the 2:00 PM or 3:00 PM macros.", "Target nearby untouched liquidity."],
    donts: ["Do not trade the 12:00 PM - 1:30 PM lunch hour (algo reset).", "Don't hold trades past 4:00 PM unless swing trading."]
  }
];

const macros = [
  "2:33 AM - 3:00 AM",
  "4:03 AM - 4:30 AM",
  "8:50 AM - 9:10 AM",
  "9:50 AM - 10:10 AM",
  "10:50 AM - 11:10 AM",
  "11:50 AM - 12:10 PM",
  "1:10 PM - 1:40 PM",
  "3:15 PM - 3:45 PM"
];

export default function Sessions() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-12">
      <div className="bg-[var(--color-brand-card)] p-8 rounded-2xl border border-[var(--color-brand-border)]">
        <h1 className="text-3xl font-bold mb-4 text-white flex items-center gap-3">
          <Globe className="w-8 h-8 text-blue-400" /> Time & Price Theory
        </h1>
        <p className="text-gray-300">
          In the ICT methodology, Time is more important than Price. The algorithm delivers price based on specific time windows. If you have the right setup at the wrong time, you will likely be stopped out. All times are in EST (New York Local Time).
        </p>
      </div>

      {/* 24-Hour Timeline Visual */}
      <div className="bg-[var(--color-brand-card)] p-6 rounded-2xl border border-[var(--color-brand-border)]">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Clock className="text-gray-400" /> 24-Hour Algorithmic Cycle
        </h2>
        
        <div className="relative pt-8 pb-4">
          <div className="absolute top-0 left-0 w-full flex justify-between text-xs text-gray-500 font-mono px-2">
            <span>18:00</span>
            <span>20:00</span>
            <span>22:00</span>
            <span>00:00</span>
            <span>02:00</span>
            <span>04:00</span>
            <span>06:00</span>
            <span>08:00</span>
            <span>10:00</span>
            <span>12:00</span>
            <span>14:00</span>
            <span>16:00</span>
          </div>
          
          <div className="h-8 w-full bg-black/40 rounded-full border border-[var(--color-brand-border)] relative overflow-hidden flex">
            {/* 18:00 to 18:00 next day = 24 hours */}
            {/* Asian: 20:00 to 00:00 (4 hrs = 16.6%) */}
            <div className="h-full bg-blue-500/20 border-l border-r border-blue-500/50 absolute" style={{ left: '8.3%', width: '16.6%' }}>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-blue-400">ASIAN</span>
            </div>
            
            {/* London: 02:00 to 05:00 (3 hrs = 12.5%) */}
            <div className="h-full bg-red-500/20 border-l border-r border-red-500/50 absolute" style={{ left: '33.3%', width: '12.5%' }}>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-red-400">LONDON</span>
            </div>
            
            {/* NY AM: 08:30 to 11:00 (2.5 hrs = 10.4%) */}
            <div className="h-full bg-emerald-500/20 border-l border-r border-emerald-500/50 absolute" style={{ left: '60.4%', width: '10.4%' }}>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-emerald-400">NY AM</span>
            </div>

            {/* NY PM: 13:30 to 16:00 (2.5 hrs = 10.4%) */}
            <div className="h-full bg-purple-500/20 border-l border-r border-purple-500/50 absolute" style={{ left: '81.2%', width: '10.4%' }}>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-purple-400">NY PM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sessions.map((s, idx) => (
          <div key={idx} className={clsx("p-6 rounded-xl border bg-[var(--color-brand-card)] relative overflow-hidden", s.border)}>
            <div className={clsx("absolute top-0 right-0 w-32 h-32 rounded-full blur-[80px] -mr-16 -mt-16 opacity-20 pointer-events-none", s.color)}></div>
            <div className="relative z-10">
              <h3 className={clsx("text-2xl font-bold mb-1", s.text)}>{s.name}</h3>
              <p className="font-mono text-sm text-gray-400 mb-4 bg-black/30 inline-block px-2 py-1 rounded border border-white/5">{s.time}</p>
              <p className="text-gray-300 text-sm mb-6">{s.desc}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-900/10 p-4 rounded-lg border border-emerald-500/20">
                  <h4 className="text-emerald-400 font-bold text-xs uppercase mb-2 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> DO
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-400">
                    {s.dos.map((item, i) => <li key={i}>• {item}</li>)}
                  </ul>
                </div>
                <div className="bg-red-900/10 p-4 rounded-lg border border-red-500/20">
                  <h4 className="text-red-400 font-bold text-xs uppercase mb-2 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> DON'T
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-400">
                    {s.donts.map((item, i) => <li key={i}>• {item}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[var(--color-brand-card)] p-8 rounded-2xl border border-[var(--color-brand-border)]">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Zap className="text-amber-400" /> ICT Macro Windows
        </h2>
        <p className="text-gray-400 text-sm mb-8 max-w-3xl">
          Macros are specific 20-30 minute time windows where the algorithm is highly likely to engage in "seek and destroy" behavior or deliver price to a specific objective. Look for setups to form exactly within these windows.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {macros.map((macro, idx) => (
            <div key={idx} className="bg-black/30 border border-[var(--color-brand-border)] p-4 rounded-lg flex flex-col items-center justify-center text-center hover:border-amber-500/30 transition-colors group">
              <Clock className="w-5 h-5 text-gray-500 mb-2 group-hover:text-amber-400 transition-colors" />
              <span className="font-mono text-sm text-gray-300 group-hover:text-white transition-colors">{macro}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
