import React from 'react'

export default function BiasToggle({
  value,
  onChange
}: {
  value: 'bullish' | 'bearish'
  onChange: (v: 'bullish' | 'bearish') => void
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-300 font-semibold">Bias:</span>
      <div className="inline-flex rounded-lg border border-border/70 bg-card/40 p-1">
        <button
          onClick={() => onChange('bullish')}
          className={[
            'px-3 py-1.5 rounded-md text-sm transition',
            value === 'bullish' ? 'bg-green-500/15 border border-green-500/40 text-green-200' : 'text-slate-300 hover:text-slate-100'
          ].join(' ')}
        >
          Bullish
        </button>
        <button
          onClick={() => onChange('bearish')}
          className={[
            'px-3 py-1.5 rounded-md text-sm transition',
            value === 'bearish' ? 'bg-red-500/15 border border-red-500/40 text-red-200' : 'text-slate-300 hover:text-slate-100'
          ].join(' ')}
        >
          Bearish
        </button>
      </div>
    </div>
  )
}
