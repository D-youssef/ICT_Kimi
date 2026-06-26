import React from 'react'
import type { Candle } from '../../data/candles'

type Zone = {
  x0: number
  x1: number
  y0: number
  y1: number
  color: string
  label?: string
}

export default function SvgCandles({
  candles,
  width = 980,
  height = 420,
  padding = 32,
  zones = [],
  fibLevels = [],
  cisdLevels = [],
  orderBlockZones = [],
  grid = true,
  buyBias = true
}: {
  candles: Candle[]
  width?: number
  height?: number
  padding?: number
  zones?: Zone[] // FVG
  fibLevels?: { level: number; y: number }[] // y in chart space (not price space)
  cisdLevels?: { level: number; y: number }[]
  orderBlockZones?: Zone[]
  grid?: boolean
  buyBias?: boolean
}) {
  const prices = candles.flatMap((c) => [c.l, c.h])
  const minP = Math.min(...prices)
  const maxP = Math.max(...prices)

  const innerW = width - padding * 2
  const innerH = height - padding * 2

  const xForIndex = (i: number) => padding + (i / Math.max(1, candles.length - 1)) * innerW
  const yForPrice = (p: number) =>
    padding + (1 - (p - minP) / (maxP - minP || 1)) * innerH

  const candleW = innerW / candles.length
  const wickW = Math.max(2, candleW * 0.18)
  const bodyW = Math.max(3, candleW * 0.62)

  const bullish = '#10b981'
  const bearish = '#ef4444'

  const allFibCisd = [
    ...fibLevels.map((f) => ({ ...f, color: '#f59e0b' })),
    ...cisdLevels.map((f) => ({ ...f, color: '#8b5cf6' }))
  ]

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      {grid && (
        <>
          {Array.from({ length: 6 }).map((_, i) => {
            const y = padding + (i / 5) * innerH
            return <line key={i} x1={padding} y1={y} x2={padding + innerW} y2={y} stroke="rgba(30,45,74,0.55)" />
          })}
          {Array.from({ length: 10 }).map((_, i) => {
            const x = padding + (i / 9) * innerW
            return <line key={i} y1={padding} x1={x} y2={padding + innerH} x2={x} stroke="rgba(30,45,74,0.35)" />
          })}
        </>
      )}

      {/* Zones: FVG + OB */}
      {orderBlockZones.map((z, idx) => {
        const rx = 4
        const w = Math.max(2, z.x1 - z.x0)
        const h = Math.max(2, z.y1 - z.y0)
        return (
          <g key={`ob-${idx}`}>
            <rect
              x={z.x0}
              y={z.y0}
              width={w}
              height={h}
              rx={rx}
              fill={z.color}
              opacity={buyBias ? 0.22 : 0.16}
              stroke="rgba(16,185,129,0.55)"
            />
            {z.label && (
              <text x={z.x0 + w / 2} y={z.y0 + 14} textAnchor="middle" fill="rgba(200,255,230,0.9)" fontSize="11">
                {z.label}
              </text>
            )}
          </g>
        )
      })}

      {zones.map((z, idx) => {
        const rx = 4
        const w = Math.max(2, z.x1 - z.x0)
        const h = Math.max(2, z.y1 - z.y0)
        return (
          <g key={`fvg-${idx}`}>
            <rect
              x={z.x0}
              y={z.y0}
              width={w}
              height={h}
              rx={rx}
              fill={z.color}
              opacity={buyBias ? 0.22 : 0.16}
              stroke="rgba(59,130,246,0.55)"
            />
            {z.label && (
              <text x={z.x0 + w / 2} y={z.y0 + 14} textAnchor="middle" fill="rgba(210,230,255,0.9)" fontSize="11">
                {z.label}
              </text>
            )}
          </g>
        )
      })}

      {/* Fib lines */}
      {allFibCisd.map((l, idx) => (
        <g key={`lvl-${idx}`}>
          <line
            x1={padding}
            y1={l.y}
            x2={padding + innerW}
            y2={l.y}
            stroke={l.color === '#f59e0b' ? 'rgba(245,158,11,0.5)' : 'rgba(139,92,246,0.45)'}
            strokeDasharray="6 6"
          />
          <text
            x={padding + 6}
            y={l.y - 6}
            fill={l.color}
            fontSize="11"
            style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
          >
            {l.level.toFixed(3)}
          </text>
        </g>
      ))}

      {/* Candles */}
      {candles.map((c, i) => {
        const x = xForIndex(i)
        const yO = yForPrice(c.o)
        const yC = yForPrice(c.c)
        const yH = yForPrice(c.h)
        const yL = yForPrice(c.l)

        const isBull = c.c >= c.o
        const color = isBull ? bullish : bearish

        const bodyTop = Math.min(yO, yC)
        const bodyBottom = Math.max(yO, yC)
        const bodyH = Math.max(1.5, bodyBottom - bodyTop)

        return (
          <g key={c.t}>
            {/* Wick */}
            <line x1={x} y1={yH} x2={x} y2={yL} stroke={color} strokeWidth={wickW} strokeLinecap="round" />
            {/* Body */}
            <rect x={x - bodyW / 2} y={bodyTop} width={bodyW} height={bodyH} rx={2} fill={color} opacity={0.95} />
          </g>
        )
      })}
    </svg>
  )
}
