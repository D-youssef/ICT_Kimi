import React from 'react'
import ModelChartPanel from '../../components/chart/ModelChartPanel'
import Accordion8Steps from '../../components/Accordion8Steps'
import type { AccordionStep } from '../../components/Accordion8Steps'

const steps: AccordionStep[] = [
  {
    title: 'Identify HTF Bias',
    description:
      'Decide direction using HTF BSL/SSL liquidity pools. Expect price to seek liquidity then shift state.'
  },
  {
    title: 'Mark the MSS Attempt + Displacement',
    description:
      'On LTF, locate the Market Structure Shift attempt. Confirm it with displacement (strong candle body/wick rejection).'
  },
  {
    title: 'Mark CISD (Change In State)',
    description:
      'After MSS/displacement, draw CISD levels where price “changes state” and transitions (use your model ratios).'
  },
  {
    title: 'Wait for Pullback into CISD',
    description:
      'Do not sell/buy into the initial displacement. Wait for price to pull back toward CISD mitigation.'
  },
  {
    title: 'Drop to LTF',
    description:
      'Use lower timeframe for the final precision. Keep HTF bias constant.'
  },
  {
    title: 'Wait for Candle Confirmation',
    description:
      'Look for candle close confirmation (not just a wick). Expect acceptance/rejection at the CISD level.'
  },
  { title: 'Entry', description: 'Enter on confirmation candle close at/near CISD mitigation.' },
  { title: 'Stop Loss', description: 'Place SL beyond the invalidation: reclaim of the CISD/mitigation boundary.' }
]

export default function CISDPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <ModelChartPanel model="cisd" modelName="CISD" />
      <div className="mt-10">
        <h2 className="text-xl font-bold text-slate-100">CISD Entry — 8-Step Playbook</h2>
        <p className="mt-2 text-sm text-slate-400">Click each step to expand the ICT process.</p>
        <div className="mt-5">
          <Accordion8Steps steps={steps} />
        </div>
      </div>
    </div>
  )
}
