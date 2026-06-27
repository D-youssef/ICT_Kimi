import React from 'react';

// A highly reusable SVG component for rendering ICT setups
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
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-64 md:h-80 lg:h-96">
        
        {/* Gradients for candles */}
        <defs>
          <linearGradient id="bull-grad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <linearGradient id="bear-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b91c1c" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        <g stroke="#1e2d4a" strokeWidth="0.5" opacity="0.4">
          {[10, 20, 30, 40, 50, 60, 70, 80, 90].map(y => <line key={`h-${y}`} x1="0" y1={y} x2="100" y2={y} />)}
          {[10, 20, 30, 40, 50, 60, 70, 80, 90].map(x => <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="100" />)}
        </g>

        {/* Zones (FVG, OB, etc) */}
        {zones.map((z, idx) => (
          <g key={`zone-${idx}`}>
            <rect 
              x={z.x} 
              y={z.y} 
              width={z.w} 
              height={z.h} 
              fill={z.fill || "rgba(59, 130, 246, 0.15)"} 
              stroke={z.stroke || "rgba(59, 130, 246, 0.4)"}
              strokeWidth="0.5"
            />
            {z.label && (
              <text x={z.x + z.w + 1} y={z.y + (z.h/2)} fill={z.stroke} fontSize="3" alignmentBaseline="middle">
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
              strokeWidth={l.width || 0.4} 
              strokeDasharray={l.dashed ? "1.5,1.5" : "none"} 
            />
            {l.label && (
              <text x={l.x2 + 1} y={l.y2 + 0.5} fill={l.stroke} fontSize="3">
                {l.label}
              </text>
            )}
          </g>
        ))}

        {/* Realistic Candles */}
        {data.map((c, idx) => {
          // In SVG Y is down, so lower Y means higher price
          const isBullish = c.close <= c.open; 
          const isDoji = c.close === c.open;
          
          const strokeColor = isBullish ? "#34d399" : "#f87171";
          const fillColor = isBullish ? "url(#bull-grad)" : "url(#bear-grad)";
          const dojiColor = "#9ca3af";

          const bodyTop = Math.min(c.open, c.close);
          const bodyBottom = Math.max(c.open, c.close);
          const bodyHeight = isDoji ? 0.3 : Math.max(0.5, bodyBottom - bodyTop);

          return (
            <g key={`candle-${idx}`}>
              {/* Wick */}
              <line 
                x1={c.x} y1={c.high} 
                x2={c.x} y2={c.low} 
                stroke={isDoji ? dojiColor : strokeColor} 
                strokeWidth="0.5" 
              />
              {/* Body */}
              <rect 
                x={c.x - 1.5} 
                y={bodyTop} 
                width="3" 
                height={bodyHeight} 
                fill={isDoji ? dojiColor : fillColor} 
                stroke={isDoji ? dojiColor : strokeColor}
                strokeWidth="0.3"
                rx="0.2"
              />
            </g>
          );
        })}

        {/* Annotations */}
        {annotations.map((a, idx) => (
          <g key={`ann-${idx}`} transform={`translate(${a.x}, ${a.y})`}>
            {a.type === 'sweep' && (
              <circle cx="0" cy="0" r="1.5" fill="none" stroke="#f59e0b" strokeWidth="0.4" />
            )}
            {a.type === 'arrow-up' && (
              <path d="M-1.5,2 L0,-1.5 L1.5,2 Z" fill="#34d399" />
            )}
            {a.type === 'arrow-down' && (
              <path d="M-1.5,-2 L0,1.5 L1.5,-2 Z" fill="#f87171" />
            )}
            {a.text && (
              <text x="0" y={a.offsetY || -3} fill="#e2e8f0" fontSize="3" textAnchor="middle" fontWeight="bold">
                {a.text}
              </text>
            )}
          </g>
        ))}
      </svg>
      
      {title && (
        <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 rounded text-[10px] font-bold border border-white/10 text-gray-200 backdrop-blur-md">
          {title}
        </div>
      )}
    </div>
  );
}
