import React from 'react'
import ModelChartPanel from '../../components/chart/ModelChartPanel'
import Accordion8Steps from '../../components/Accordion8Steps'
import type { AccordionStep } from '../../components/Accordion8Steps'

const steps: AccordionStep[] = [
  {
    title: 'Identify HTF Bias',
    description:
      'Decide direction using HTF liquidity pools. Expect price to seek liquidity and then shift state.'
  },
  {
    title: 'Mark the Displacement Candle',
    description:
      'On LTF, find the displacement candle that causes a strong MSS attempt (big body + rejection follow-through).'
  },
  {
    title: 'Mark the Order Block (OB)',
    description:
      'OB is the last bearish candle before bullish displacement (bullish OB), or last bullish candle before bearish displacement (bearish OB).'
  },
  {
    title: 'Wait for Pullback to OB',
    description:
      'Do not enter immediately on displacement. Wait for price to return into the OB mitigation area.'
  },
  {
    title: 'Drop to LTF',
    description:
      'Execute on lower timeframe with the same HTF plan. Keep focusing on OB mitigation and structure.'
  },
  {
    title: 'Wait for Candle Confirmation',
    description:
      'Look for candle close confirmation inside the OB (engulfing / pin-bar / displacement follow-through).'
  },
  { title: 'Entry', description: 'Enter on confirmation close after OB mitigation and rejection.' },
  { title: 'Stop Loss', description: 'SL beyond OB invalidation (reclaim of OB mitigation zone).' }
]

export default function OrderBlockPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <ModelChartPanel model="order-block" modelName="Order Block" />
      <div className="mt-10">
        <h2 className="text-xl font-bold text-slate-100">Order Block Entry — 8-Step Playbook</h2>
        <p className="mt-2 text-sm text-slate-400">Click each step to expand the ICT process.</p>
        <div className="mt-5">
          <Accordion8Steps steps={steps} />
        </div>
      </div>
    </div>
  )
}
