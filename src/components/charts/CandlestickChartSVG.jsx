import React from 'react';

// A highly reusable SVG component for rendering ICT setups
// Logical coordinate system: X = 0 to 100 (time), Y = 0 to 100 (price, where 0 is top, 100 is bottom for SVG)

export default function CandlestickChartSVG({
  data = [], 
  zones = [], 
  lines = [], 
  annotations = [],
  title = "",
  className = ""
}) {
  return (
    <div className={`relative bg-[#060d1a] border border-[#1e2d4a] rounded-xl overflow-hidden ${className}`}>
      {/* Background Grid */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-64 md:h-80 lg:h-96">
        
        {/* Grid lines */}
        <g stroke="#1e2d4a" strokeWidth="0.5" opacity="0.5">
          {[20, 40, 60, 80].map(y => <line key={`h-${y}`} x1="0" y1={y} x2="100" y2={y} />)}
          {[20, 40, 60, 80].map(x => <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="100" />)}
        </g>

        {/* Zones (FVG, OB, etc) */}
        {zones.map((z, idx) => (
          <g key={`zone-${idx}`}>
            <rect 
              x={z.x} 
              y={z.y} 
              width={z.w} 
              height={z.h} 
              fill={z.fill || "rgba(59, 130, 246, 0.2)"} 
              stroke={z.stroke || "rgba(59, 130, 246, 0.5)"}
              strokeWidth="0.5"
            />
            {z.label && (
              <text x={z.x + z.w + 2} y={z.y + (z.h/2)} fill={z.stroke} fontSize="4" alignmentBaseline="middle">
                {z.label}
              </text>
            )}
          </g>
        ))}

        {/* Lines (SL, TP, Fib levels, CISD) */}
        {lines.map((l, idx) => (
          <g key={`line-${idx}`}>
            <line 
              x1={l.x1} 
              y1={l.y1} 
              x2={l.x2} 
              y2={l.y2} 
              stroke={l.stroke || "#ef4444"} 
              strokeWidth={l.width || 0.5} 
              strokeDasharray={l.dashed ? "2,2" : "none"} 
            />
            {l.label && (
              <text x={l.x2 + 2} y={l.y2 + 1} fill={l.stroke} fontSize="4">
                {l.label}
              </text>
            )}
          </g>
        ))}

        {/* Candles */}
        {data.map((c, idx) => {
          const isBullish = c.close <= c.open; // In SVG Y is down, so lower Y means higher price
          const color = isBullish ? "#10b981" : "#ef4444";
          return (
            <g key={`candle-${idx}`}>
              {/* Wick */}
              <line x1={c.x} y1={c.high} x2={c.x} y2={c.low} stroke={color} strokeWidth="1" />
              {/* Body */}
              <rect 
                x={c.x - 1.5} 
                y={isBullish ? c.close : c.open} 
                width="3" 
                height={Math.max(0.5, Math.abs(c.close - c.open))} 
                fill={color} 
                rx="0.5"
              />
            </g>
          );
        })}

        {/* Annotations */}
        {annotations.map((a, idx) => (
          <g key={`ann-${idx}`} transform={`translate(${a.x}, ${a.y})`}>
            {a.type === 'sweep' && (
              <circle cx="0" cy="0" r="1.5" fill="none" stroke="#f59e0b" strokeWidth="0.5" />
            )}
            {a.type === 'arrow-up' && (
              <path d="M-2,2 L0,-2 L2,2 Z" fill="#f59e0b" />
            )}
            {a.type === 'arrow-down' && (
              <path d="M-2,-2 L0,2 L2,-2 Z" fill="#f59e0b" />
            )}
            {a.text && (
              <text x="0" y={a.offsetY || -4} fill="#e2e8f0" fontSize="4" textAnchor="middle">
                {a.text}
              </text>
            )}
          </g>
        ))}
      </svg>
      
      {title && (
        <div className="absolute top-3 left-3 bg-black/60 px-2 py-1 rounded text-xs font-semibold border border-white/10 text-gray-200">
          {title}
        </div>
      )}
    </div>
  );
}
