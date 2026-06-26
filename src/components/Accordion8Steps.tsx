import React, { useMemo, useState } from 'react'

export type AccordionStep = {
  title: string
  description: string
}

export default function Accordion8Steps({
  steps
}: {
  steps: AccordionStep[]
}) {
  const [openIndex, setOpenIndex] = useState<number>(0)

  const safeSteps = useMemo(() => {
    const normalized = steps.slice(0, 8)
    while (normalized.length < 8) {
      normalized.push({ title: 'Step', description: '' })
    }
    return normalized
  }, [steps])

  return (
    <div className="space-y-3">
      {safeSteps.map((s, idx) => {
        const isOpen = idx === openIndex
        return (
          <div key={`${s.title}-${idx}`} className="rounded-xl border border-border/70 bg-card/60 overflow-hidden">
            <button
              className="w-full px-4 py-3 flex items-center justify-between gap-3 hover:bg-card/70 transition"
              onClick={() => setOpenIndex((cur) => (cur === idx ? -1 : idx))}
              aria-expanded={isOpen}
            >
              <div className="text-left">
                <div className="text-sm font-semibold text-slate-100">{idx + 1}. {s.title}</div>
              </div>
              <div className="text-slate-300 font-semibold">
                {isOpen ? '—' : '+'}
              </div>
            </button>

            {isOpen && (
              <div className="px-4 pb-4 text-sm text-slate-300 leading-relaxed">
                {s.description}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
