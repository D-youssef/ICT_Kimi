import React from 'react'
import ModelChartPanel from '../../components/chart/ModelChartPanel'
import Accordion8Steps from '../../components/Accordion8Steps'
import type { AccordionStep } from '../../components/Accordion8Steps'

const steps: AccordionStep[] = [
  {
    title: 'Identify HTF Bias',
    description:
      'Map BSL/SSL liquidity pools on HTF (H4/H1). Determine where price will likely seek and reverse—this becomes your trade direction.'
  },
  {
    title: 'Mark the FVG / OB / CISD',
    description:
      'On LTF, locate the displacement candle and draw the FVG zone. Optionally align OB + CISD levels to strengthen confluence.'
  },
  {
    title: 'Wait for Pullback',
    description:
      'Do not enter during displacement. Wait for price to pull back into the FVG (mitigation) and show reaction.'
  },
  { title: 'Drop to LTF', description: 'Execute on a lower timeframe (e.g., M15/M5). Keep HTF bias unchanged.' },
  { title: 'Wait for Candle Confirmation', description: 'Look for a close that confirms acceptance/rejection at the FVG. No wick-only entries.' },
  { title: 'Entry', description: 'Enter when confirmation candle closes and the mitigation zone holds.' },
  { title: 'Stop Loss', description: 'Place SL beyond the mitigation: for longs below the FVG/OB boundary (or bearish invalidation). Avoid too tight SL.' },
  { title: 'Take Profit', description: 'Target next HTF liquidity pool (BSL for shorts / SSL for longs). Consider partials before the pool.' }
]

export default function FVGPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <ModelChartPanel model="fvg" modelName="FVG" fvgLabel="FVG" />
      <div className="mt-10">
        <h2 className="text-xl font-bold text-slate-100">FVG Entry — 8-Step Playbook</h2>
        <p className="mt-2 text-sm text-slate-400">Click each step to expand the ICT process.</p>
        <div className="mt-5">
          <Accordion8Steps steps={steps} />
        </div>
      </div>
    </div>
  )
}
