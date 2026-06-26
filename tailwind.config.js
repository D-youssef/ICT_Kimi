/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg0: '#060d1a',
        card: '#0a0f1e',
        border: '#1e2d4a',
        fvg: '#3b82f6',
        cisd: '#8b5cf6',
        fib: '#f59e0b',
        ob: '#10b981',
        bullish: '#10b981',
        bearish: '#ef4444',
        neutral: '#f59e0b'
      },
      boxShadow: {
        glow: '0 0 24px rgba(59,130,246,0.18)'
      }
    }
  },
  plugins: []
}
