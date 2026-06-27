import { Link } from 'react-router-dom';
import { Target, TrendingUp, Clock, BookOpen, ArrowRight, ShieldAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const entryModels = [
  { title: 'Fair Value Gap (FVG)', path: '/fvg', color: 'bg-blue-500', text: 'text-blue-500', border: 'border-blue-500/20', hover: 'hover:border-blue-500/50', desc: 'Inefficiencies in price delivery creating a 3-candle imbalance.' },
  { title: 'CISD', path: '/cisd', color: 'bg-purple-500', text: 'text-purple-500', border: 'border-purple-500/20', hover: 'hover:border-purple-500/50', desc: 'Change In State of Delivery. Shift in institutional order flow.' },
  { title: 'Fibonacci OTE', path: '/fibonacci', color: 'bg-amber-500', text: 'text-amber-500', border: 'border-amber-500/20', hover: 'hover:border-amber-500/50', desc: 'Optimal Trade Entry using precise algorithmic retracement levels.' },
  { title: 'Order Block (OB)', path: '/orderblock', color: 'bg-emerald-500', text: 'text-emerald-500', border: 'border-emerald-500/20', hover: 'hover:border-emerald-500/50', desc: 'The last opposite candle before a strong displacement in price.' },
];

const amdCycle = [
  { phase: 'Accumulation', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', desc: 'Smart money building a position during a consolidation phase.', tip: 'Occurs primarily during the Asian Session.' },
  { phase: 'Manipulation', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', desc: 'A false move to sweep liquidity and trigger retail stop losses.', tip: 'Judas Swing during London or NY Open.' },
  { phase: 'Distribution', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', desc: 'Price expands in the true intended direction to deliver orders.', tip: 'The expansion phase offering high R:R setups.' }
];

export default function Overview() {
  const { t } = useTranslation();

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-12">
      {/* Hero Section */}
      <section className="bg-[var(--color-brand-card)] p-8 md:p-12 rounded-2xl border border-[var(--color-brand-border)] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold mb-6 border border-blue-500/20">
            <Target className="w-4 h-4" /> {t('overview.badge', 'Smart Money Concepts')}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            {t('overview.title', 'Internalize the Algorithm.')}
          </h1>
          <p className="text-gray-400 max-w-3xl text-lg leading-relaxed mb-8">
            {t('overview.desc', 'The ICT Trade Journal is your centralized dashboard to master institutional trading concepts. Review core entry models, validate your setups through a rigorous checklist, and study the anatomy of high-probability trades.')}
          </p>
        </div>
      </section>

      {/* AMD Cycle Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <TrendingUp className="text-[var(--color-ict-fvg)]" /> The AMD Cycle
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {amdCycle.map((item, idx) => (
            <div key={idx} className={`p-6 rounded-xl border ${item.border} ${item.bg} backdrop-blur-sm relative overflow-hidden group hover:scale-[1.02] transition-transform`}>
              <h3 className={`text-xl font-bold mb-3 ${item.color}`}>{item.phase}</h3>
              <p className="text-gray-300 text-sm mb-4">{item.desc}</p>
              <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Pro Tip</span>
                <span className="text-sm text-gray-200">{item.tip}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Entry Models */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Target className="text-[var(--color-ict-cisd)]" /> Core Entry Models
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {entryModels.map((model, idx) => (
            <Link key={idx} to={model.path} className={`block p-6 rounded-xl bg-[var(--color-brand-card)] border ${model.border} ${model.hover} transition-all group`}>
              <div className={`w-12 h-12 rounded-lg ${model.color}/20 flex items-center justify-center mb-4 border ${model.border}`}>
                <TrendingUp className={model.text} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gray-200 transition-colors">{model.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{model.desc}</p>
              <div className={`flex items-center text-sm font-semibold ${model.text} group-hover:translate-x-1 transition-transform`}>
                Study Model <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Grid: Concepts & Kill Zones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Kill Zones */}
        <section className="bg-[var(--color-brand-card)] rounded-xl border border-[var(--color-brand-border)] p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Clock className="text-[var(--color-ict-fib)]" /> Macro Kill Zones (EST)
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
              <span className="text-gray-300 font-medium">Asian Session</span>
              <span className="text-amber-400 font-mono">8:00 PM - 12:00 AM</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
              <span className="text-gray-300 font-medium">London Open (Judas)</span>
              <span className="text-amber-400 font-mono">2:00 AM - 5:00 AM</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
              <span className="text-gray-300 font-medium">NY AM Session</span>
              <span className="text-amber-400 font-mono">8:30 AM - 11:00 AM</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
              <span className="text-gray-300 font-medium">NY PM Session</span>
              <span className="text-amber-400 font-mono">1:30 PM - 4:00 PM</span>
            </div>
          </div>
          <Link to="/sessions" className="mt-6 block text-center text-sm text-blue-400 hover:text-blue-300 transition-colors">
            View detailed timeline &rarr;
          </Link>
        </section>

        {/* Key Concepts */}
        <section className="bg-[var(--color-brand-card)] rounded-xl border border-[var(--color-brand-border)] p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="text-[var(--color-ict-ob)]" /> Key Concepts
          </h2>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="mt-1"><ShieldAlert className="w-5 h-5 text-emerald-400" /></div>
              <div>
                <strong className="text-gray-200 block">BSL & SSL Pools</strong>
                <span className="text-gray-400 text-sm">Buy Stop Liquidity (above old highs) and Sell Stop Liquidity (below old lows). Price is magnetically drawn to these pools.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="mt-1"><ShieldAlert className="w-5 h-5 text-blue-400" /></div>
              <div>
                <strong className="text-gray-200 block">HTF &rarr; LTF Alignment</strong>
                <span className="text-gray-400 text-sm">Never trade against the Higher Timeframe bias. Use the 1D/4H/1H for direction, and 15m/5m/1m for execution.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="mt-1"><ShieldAlert className="w-5 h-5 text-red-400" /></div>
              <div>
                <strong className="text-gray-200 block">Invalidation Rules</strong>
                <span className="text-gray-400 text-sm">If price breaks the structural point that led to the entry pattern (e.g. closing below an OB or full FVG), the setup is invalid.</span>
              </div>
            </li>
          </ul>
        </section>

      </div>
    </div>
  );
}
