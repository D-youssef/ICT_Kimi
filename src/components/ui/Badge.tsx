import React from 'react'

export default function Badge({
  tone = 'neutral',
  children
}: {
  tone?: 'fvg' | 'cisd' | 'fib' | 'ob' | 'bullish' | 'bearish' | 'neutral'
  children: React.ReactNode
}) {
  const toneStyles: Record<typeof tone, string> = {
    fvg: 'border-blue-500/50 bg-blue-500/10 text-blue-200',
    cisd: 'border-purple-500/50 bg-purple-500/10 text-purple-200',
    fib: 'border-amber-500/50 bg-amber-500/10 text-amber-200',
    ob: 'border-green-500/50 bg-green-500/10 text-green-200',
    bullish: 'border-green-500/50 bg-green-500/10 text-green-200',
    bearish: 'border-red-500/50 bg-red-500/10 text-red-200',
    neutral: 'border-amber-500/50 bg-amber-500/10 text-amber-200'
  }

  return (
    <span
      className={[
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide',
        'shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur',
        toneStyles[tone]
      ].join(' ')}
    >
      {children}
    </span>
  )
}
