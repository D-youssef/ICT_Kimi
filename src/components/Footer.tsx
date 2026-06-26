import React from 'react'
import { Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/fvg', label: 'FVG Entry' },
  { to: '/cisd', label: 'CISD Entry' },
  { to: '/fibonacci', label: 'Fibonacci Entry' },
  { to: '/order-block', label: 'Order Block' },
  { to: '/candle-patterns', label: 'Candle Patterns' },
  { to: '/checklist', label: 'Checklist' },
  { to: '/sessions', label: 'Sessions' }
]

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-[#060d1a]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-2 items-start">
          <div>
            <div className="font-semibold text-slate-100">
              ICT <span className="text-slate-300">Smart Money</span> <span className="text-blue-400">Trade Journal</span>
            </div>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              Not financial advice. Educational use only. Markets involve risk; manage risk accordingly.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-start md:justify-end">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-2 rounded-md text-sm border border-border/50 bg-card/40 hover:bg-card transition text-slate-200"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 text-xs text-slate-500">
          © {new Date().getFullYear()} ICT Smart Money Trade Journal
        </div>
      </div>
    </footer>
  )
}
