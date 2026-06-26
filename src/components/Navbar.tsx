import React, { useMemo, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/fvg', label: 'FVG Entry' },
  { to: '/cisd', label: 'CISD Entry' },
  { to: '/fibonacci', label: 'Fibonacci Entry' },
  { to: '/order-block', label: 'Order Block' },
  { to: '/candle-patterns', label: 'Candle Patterns' },
  { to: '/checklist', label: 'Checklist' },
  { to: '/sessions', label: 'Sessions' }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const links = useMemo(
    () =>
      navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            [
              'px-3 py-2 rounded-md text-sm transition-colors',
              isActive ? 'text-slate-100 bg-border/40 border border-border' : 'text-slate-300 hover:text-slate-100 hover:bg-card'
            ].join(' ')
          }
        >
          {item.label}
        </NavLink>
      )),
    []
  )

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-[#060d1a]/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="font-semibold tracking-wide text-slate-100">
            ICT <span className="text-slate-300">Smart Money</span> <span className="text-blue-400">Trade Journal</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">{links}</nav>

          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-border/60 bg-card/40 hover:bg-card transition"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-slate-200">{open ? '✕' : '☰'}</span>
          </button>
        </div>

        {open && (
          <div className="pb-4 md:hidden">
            <div className="flex flex-col gap-1">{links}</div>
          </div>
        )}
      </div>
    </header>
  )
}
