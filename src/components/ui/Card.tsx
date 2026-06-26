import React from 'react'

export default function Card({
  className = '',
  children
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <section
      className={[
        'rounded-xl border border-border/70 bg-card/70 shadow-[0_0_0_1px_rgba(30,45,74,0.15)]',
        'backdrop-blur-sm',
        className
      ].join(' ')}
    >
      {children}
    </section>
  )
}
