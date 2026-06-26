import { generateDeterministicCandles } from './candles'

export type Zone = { x0: number; x1: number; y0: number; y1: number; color: string; label?: string }

function quantize(n: number, step: number) {
  return Math.round(n / step) * step
}

function priceToY(p: number, minP: number, maxP: number, innerH: number, padding: number) {
  return padding + (1 - (p - minP) / (maxP - minP || 1)) * innerH
}

export type ChartModelMarkers = {
  fibLevels: { level: number; y: number }[]
  cisdLevels: { level: number; y: number }[]
  fvgZones: Zone[]
  orderBlockZones: Zone[]
  // annotations for future (optional)
}

export type ModelBias = 'bullish' | 'bearish'

function buildMarkers({
  candles,
  width,
  height,
  padding,
  fibAnchorIndex,
  baseCisd = [0.236, 0.382, 0.5],
  fvgColor,
  obColor
}: {
  candles: ReturnType<typeof generateDeterministicCandles>
  width: number
  height: number
  padding: number
  fibAnchorIndex: number
  baseCisd?: number[]
  fvgColor: string
  obColor: string
}): ChartModelMarkers {
  const prices = candles.flatMap((c) => [c.l, c.h])
  const minP = Math.min(...prices)
  const maxP = Math.max(...prices)
  const innerW = width - padding * 2
  const innerH = height - padding * 2
  const xForIndex = (i: number) => padding + (i / Math.max(1, candles.length - 1)) * innerW

  // Create “real-looking” derived levels from the generated candles.
  // Choose anchors around the fibAnchorIndex region.
  const anchor = candles[Math.max(2, Math.min(candles.length - 3, fibAnchorIndex))]
  const swingHigh = Math.max(...candles.slice(fibAnchorIndex - 6, fibAnchorIndex + 6).map((c) => c.h))
  const swingLow = Math.min(...candles.slice(fibAnchorIndex - 6, fibAnchorIndex + 6).map((c) => c.l))

  const range = swingHigh - swingLow || 1
  const fibs = [0.5, 0.618, 0.705, 0.786]
  const fibLevels = fibs.map((f) => {
    const levelPrice = swingLow + range * f
    return { level: f, y: priceToY(levelPrice, minP, maxP, innerH, padding) }
  })

  // CISD levels: use swing low/high and base ratios to compute y
  const cisdLevels = baseCisd.map((r) => {
    const levelPrice = swingLow + range * r
    return { level: r, y: priceToY(levelPrice, minP, maxP, innerH, padding) }
  })

  // FVG zones (create 2 zones)
  const z0 = candles[Math.max(5, fibAnchorIndex - 5)]
  const z1 = candles[Math.max(6, fibAnchorIndex - 4)]
  const z2 = candles[Math.max(7, fibAnchorIndex - 3)]

  const fvgA_top = Math.min(z0.h, z1.h)
  const fvgA_bot = Math.max(z2.l, z1.l)
  const fvgB_top = Math.min(z1.h, z2.h)
  const fvgB_bot = Math.max(z2.l, z1.l)

  const xA0 = xForIndex(fibAnchorIndex - 4)
  const xA1 = xForIndex(fibAnchorIndex - 3) + 18
  const xB0 = xForIndex(fibAnchorIndex - 2)
  const xB1 = xForIndex(fibAnchorIndex - 1) + 18

  const fvgZones: Zone[] = [
    {
      x0: xA0,
      x1: xA1,
      y0: priceToY(fvgA_top, minP, maxP, innerH, padding),
      y1: priceToY(fvgA_bot, minP, maxP, innerH, padding),
      color: fvgColor,
      label: 'FVG'
    },
    {
      x0: xB0,
      x1: xB1,
      y0: priceToY(fvgB_top, minP, maxP, innerH, padding),
      y1: priceToY(fvgB_bot, minP, maxP, innerH, padding),
      color: fvgColor,
      label: 'FVG'
    }
  ].map((z) => ({
    ...z,
    y0: Math.min(z.y0, z.y1),
    y1: Math.max(z.y0, z.y1)
  }))

  // Order Block zones (create 1-2 zones)
  const obC = candles[Math.max(8, fibAnchorIndex - 1)]
  const obD = candles[Math.max(9, fibAnchorIndex)]
  const ob_top = Math.max(obC.o, obC.c) * 0.999 + Math.max(0, obD.o - obD.c) * 0.001
  const ob_bot = Math.min(obD.o, obD.c) * 1.001 - Math.max(0, obC.o - obC.c) * 0.001

  const xO0 = xForIndex(fibAnchorIndex - 1)
  const xO1 = xForIndex(fibAnchorIndex) + 24

  const orderBlockZones: Zone[] = [
    {
      x0: xO0,
      x1: xO1,
      y0: priceToY(ob_top, minP, maxP, innerH, padding),
      y1: priceToY(ob_bot, minP, maxP, innerH, padding),
      color: obColor,
      label: 'OB'
    }
  ].map((z) => ({
    ...z,
    y0: Math.min(z.y0, z.y1),
    y1: Math.max(z.y0, z.y1)
  }))

  return { fibLevels, cisdLevels, fvgZones, orderBlockZones }
}

export function getModelMarkers({
  model,
  bias = 'bullish'
}: {
  model: 'fvg' | 'cisd' | 'fibonacci' | 'order-block'
  bias?: ModelBias
}): ChartModelMarkers {
  const width = 980
  const height = 420
  const padding = 32

  const seedBase = model === 'fvg' ? 1201 : model === 'cisd' ? 1307 : model === 'fibonacci' ? 1411 : 1523
  const seed = seedBase + (bias === 'bullish' ? 1 : 2)

  const candles = generateDeterministicCandles({ seed, count: 92, start: 1.102, step: 0.0008, volatility: 0.95 })

  // Different fibAnchorIndex per model to visually differ
  const fibAnchorIndex =
    model === 'fvg' ? 42 : model === 'cisd' ? 48 : model === 'fibonacci' ? 44 : 52

  const markers = buildMarkers({
    candles,
    width,
    height,
    padding,
    fibAnchorIndex,
    baseCisd:
      model === 'cisd'
        ? [0.236, 0.382, 0.5]
        : model === 'order-block'
          ? [0.182, 0.277, 0.5]
          : [0.236, 0.382, 0.5],
    fvgColor: '#3b82f6',
    obColor: '#10b981'
  })

  // Bias tweak: slightly adjust zone emphasis
  if (bias === 'bearish') {
    // swap/quantize to look different while staying consistent
    return {
      ...markers,
      fvgZones: markers.fvgZones.map((z, i) => ({
        ...z,
        y0: quantize(z.y0 + (i ? 3 : 0), 1),
        y1: quantize(z.y1 + (i ? 3 : 0), 1)
      })),
      orderBlockZones: markers.orderBlockZones.map((z) => ({
        ...z,
        y0: quantize(z.y0 + 2, 1),
        y1: quantize(z.y1 + 2, 1)
      }))
    }
  }

  return markers
}

export function getEntryCandles(bias: ModelBias, model: 'fvg' | 'cisd' | 'fibonacci' | 'order-block') {
  const seedBase = model === 'fvg' ? 1201 : model === 'cisd' ? 1307 : model === 'fibonacci' ? 1411 : 1523
  const seed = seedBase + (bias === 'bullish' ? 1 : 2)
  return generateDeterministicCandles({ seed, count: 92, start: 1.102, step: 0.0008, volatility: 0.95 })
}
