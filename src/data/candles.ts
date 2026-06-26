export type Candle = {
  t: number
  o: number
  h: number
  l: number
  c: number
  v: number
}

function mulberry32(seed: number) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n))
}

export function generateDeterministicCandles({
  seed = 202503,
  count = 90,
  start = 1.102,
  step = 0.0008,
  volatility = 0.9
}: {
  seed?: number
  count?: number
  start?: number
  step?: number
  volatility?: number
} = {}): Candle[] {
  const rnd = mulberry32(seed)
  const candles: Candle[] = []

  let price = start
  for (let i = 0; i < count; i++) {
    const drift = (rnd() - 0.5) * step * 0.35
    const impulse = (rnd() - 0.5) * step * volatility * 1.35
    const change = drift + impulse

    const o = price
    const c = o + change

    // wick sizes
    const wickBase = step * (0.35 + rnd() * 0.9) * volatility
    const upWick = wickBase * (0.4 + rnd() * 0.9)
    const downWick = wickBase * (0.4 + rnd() * 0.9)

    let h = Math.max(o, c) + upWick
    let l = Math.min(o, c) - downWick

    // keep reasonable range
    const min = start - step * count * 0.6
    const max = start + step * count * 0.6
    h = clamp(h, min, max)
    l = clamp(l, min, max)

    const v = 1000 + Math.floor(rnd() * 5000)

    candles.push({
      t: i,
      o,
      h,
      l,
      c,
      v
    })

    price = c
  }

  return candles
}

export function formatPrice(p: number) {
  if (p >= 10) return p.toFixed(2)
  if (p >= 1) return p.toFixed(4)
  return p.toFixed(6)
}
