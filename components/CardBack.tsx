"use client";

import { useId } from "react";

// ---------------------------------------------------------------------------
// Geometry helpers (local — not exported)
// ---------------------------------------------------------------------------
const f = (n: number) => Math.round(n * 100) / 100;

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const a = (angleDeg - 90) * (Math.PI / 180);
  return { x: f(cx + r * Math.cos(a)), y: f(cy + r * Math.sin(a)) };
}

function petalPath(
  cx: number, cy: number,
  innerR: number, outerR: number,
  halfW: number, angleDeg: number
) {
  const a  = (angleDeg - 90) * (Math.PI / 180);
  const pa = a + Math.PI / 2;
  const mid = (innerR + outerR) / 2;
  const sx = cx + innerR * Math.cos(a),  sy = cy + innerR * Math.sin(a);
  const ex = cx + outerR * Math.cos(a),  ey = cy + outerR * Math.sin(a);
  const c1x = cx + mid * Math.cos(a) + halfW * Math.cos(pa);
  const c1y = cy + mid * Math.sin(a) + halfW * Math.sin(pa);
  const c2x = cx + mid * Math.cos(a) - halfW * Math.cos(pa);
  const c2y = cy + mid * Math.sin(a) - halfW * Math.sin(pa);
  return `M ${f(sx)} ${f(sy)} Q ${f(c1x)} ${f(c1y)} ${f(ex)} ${f(ey)} Q ${f(c2x)} ${f(c2y)} ${f(sx)} ${f(sy)} Z`;
}

function diamondPath(x: number, y: number, s: number) {
  return `M ${f(x)} ${f(y - s)} L ${f(x + s)} ${f(y)} L ${f(x)} ${f(y + s)} L ${f(x - s)} ${f(y)} Z`;
}

function starPath(x: number, y: number, ro: number, ri: number) {
  return Array.from({ length: 8 }, (_, i) => {
    const r = i % 2 === 0 ? ro : ri;
    const pt = polar(x, y, r, i * 45);
    return `${i === 0 ? "M" : "L"} ${pt.x} ${pt.y}`;
  }).join(" ") + " Z";
}

// ---------------------------------------------------------------------------
// Star-field positions (outside r=76 central mandala)
// ---------------------------------------------------------------------------
const STARS: Array<{ x: number; y: number; r: number; o: number; fourPt?: boolean }> = [
  { x: 26,  y: 28,  r: 0.9,  o: 0.5 },
  { x: 53,  y: 22,  r: 0.75, o: 0.4 },
  { x: 78,  y: 32,  r: 0.8,  o: 0.45 },
  { x: 96,  y: 24,  r: 1.4,  o: 0.6, fourPt: true },
  { x: 114, y: 32,  r: 0.8,  o: 0.45 },
  { x: 139, y: 22,  r: 0.75, o: 0.4 },
  { x: 166, y: 28,  r: 0.9,  o: 0.5 },
  { x: 37,  y: 44,  r: 1.3,  o: 0.5, fourPt: true },
  { x: 155, y: 44,  r: 1.3,  o: 0.5, fourPt: true },
  { x: 62,  y: 38,  r: 0.7,  o: 0.35 },
  { x: 130, y: 38,  r: 0.7,  o: 0.35 },
  { x: 26,  y: 292, r: 0.9,  o: 0.5 },
  { x: 53,  y: 298, r: 0.75, o: 0.4 },
  { x: 78,  y: 288, r: 0.8,  o: 0.45 },
  { x: 96,  y: 296, r: 1.4,  o: 0.6, fourPt: true },
  { x: 114, y: 288, r: 0.8,  o: 0.45 },
  { x: 139, y: 298, r: 0.75, o: 0.4 },
  { x: 166, y: 292, r: 0.9,  o: 0.5 },
  { x: 37,  y: 276, r: 1.3,  o: 0.5, fourPt: true },
  { x: 155, y: 276, r: 1.3,  o: 0.5, fourPt: true },
  { x: 19,  y: 120, r: 0.8,  o: 0.4 },
  { x: 18,  y: 155, r: 1.2,  o: 0.5, fourPt: true },
  { x: 19,  y: 190, r: 0.8,  o: 0.4 },
  { x: 173, y: 120, r: 0.8,  o: 0.4 },
  { x: 174, y: 155, r: 1.2,  o: 0.5, fourPt: true },
  { x: 173, y: 190, r: 0.8,  o: 0.4 },
];

// ---------------------------------------------------------------------------
// Public component
// ---------------------------------------------------------------------------
type Props = {
  /** 0–1 brightness multiplier — lets shadow cards appear dimmer */
  dim?: number;
  className?: string;
};

export default function CardBack({ dim = 1, className = "" }: Props) {
  const uid = useId().replace(/:/g, "");
  const CX = 96, CY = 155;

  const ticks = Array.from({ length: 24 }, (_, i) => {
    const isMain = i % 3 === 0;
    const a = polar(CX, CY, isMain ? 65 : 69, i * 15);
    const b = polar(CX, CY, 73, i * 15);
    return { x1: a.x, y1: a.y, x2: b.x, y2: b.y, main: isMain };
  });

  const petals = Array.from({ length: 8 }, (_, i) =>
    petalPath(CX, CY, 24, 52, 9, i * 45)
  );

  const sq1 = [0, 90, 180, 270].map(a => polar(CX, CY, 40, a));
  const sq2 = [45, 135, 225, 315].map(a => polar(CX, CY, 40, a));
  const sqPts = (pts: { x: number; y: number }[]) =>
    pts.map(p => `${p.x},${p.y}`).join(" ");

  const innerDiamonds = Array.from({ length: 8 }, (_, i) => {
    const pt = polar(CX, CY, 28, i * 45);
    return diamondPath(pt.x, pt.y, 2.5);
  });

  const divider = (y: number) => (
    <g>
      <line x1="20" y1={y} x2="82"  y2={y} stroke="#a855f7" strokeWidth="0.5" strokeOpacity={0.45 * dim}/>
      <path d={diamondPath(96, y, 3.5)} fill="#a855f7" fillOpacity={0.55 * dim}/>
      <line x1="110" y1={y} x2="172" y2={y} stroke="#a855f7" strokeWidth="0.5" strokeOpacity={0.45 * dim}/>
    </g>
  );

  return (
    <svg
      viewBox="0 0 192 320"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full ${className}`}
    >
      <defs>
        <radialGradient id={`bg-${uid}`} cx="50%" cy="48%" r="70%">
          <stop offset="0%"   stopColor="#1e0838" stopOpacity={dim}/>
          <stop offset="50%"  stopColor="#0d0420" stopOpacity={dim}/>
          <stop offset="100%" stopColor="#050510" stopOpacity={dim}/>
        </radialGradient>
        <radialGradient id={`glow-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#7c3aed" stopOpacity={0.35 * dim}/>
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
        </radialGradient>
        <clipPath id={`moon-${uid}`}>
          <circle cx={CX} cy={CY} r="13"/>
        </clipPath>
        <filter id={`f-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="192" height="320" fill={`url(#bg-${uid})`}/>
      <ellipse cx={CX} cy={CY} rx="90" ry="90" fill={`url(#glow-${uid})`}/>

      {/* Diamond lattice */}
      <g opacity={0.06 * dim} stroke="#a855f7" strokeWidth="0.4">
        {Array.from({ length: 10 }, (_, i) => (
          <line key={`dl-${i}`} x1={-20 + i * 24} y1="0" x2={-20 + i * 24 - 160} y2="320" transform="skewX(-45)"/>
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <line key={`dr-${i}`} x1={i * 24} y1="0" x2={i * 24 + 160} y2="320" transform="skewX(45)"/>
        ))}
      </g>

      {/* Stars */}
      <g fill="#e9d5ff">
        {STARS.map((s, i) =>
          s.fourPt
            ? <path key={i} d={starPath(s.x, s.y, s.r * 2.2, s.r * 0.8)} fillOpacity={s.o * dim}/>
            : <circle key={i} cx={s.x} cy={s.y} r={s.r} fillOpacity={s.o * dim}/>
        )}
      </g>

      {/* Outer double border */}
      <rect x="6" y="6" width="180" height="308" rx="8"
            fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeOpacity={0.55 * dim}/>
      <rect x="12" y="12" width="168" height="296" rx="5"
            fill="none" stroke="#a855f7" strokeWidth="0.6" strokeOpacity={0.35 * dim}/>

      {/* Corner ornaments */}
      {([
        "translate(0,0) scale(1,1)",
        "translate(192,0) scale(-1,1)",
        "translate(0,320) scale(1,-1)",
        "translate(192,320) scale(-1,-1)",
      ] as const).map((transform, i) => (
        <g key={i} transform={transform} stroke="#a855f7" strokeOpacity={0.6 * dim}>
          <path d="M 30,13 L 13,13 L 13,30" fill="none" strokeWidth="1.25"/>
          <path d="M 24,18 L 18,18 L 18,24" fill="none" strokeWidth="0.7" strokeOpacity={0.4 * dim}/>
          <path d={diamondPath(13, 13, 3.5)} fill="#a855f7" fillOpacity={0.5 * dim} stroke="none"/>
          <circle cx="25" cy="25" r="1.5" fill="#c084fc" fillOpacity={0.5 * dim} stroke="none"/>
          <path d={diamondPath(31, 31, 1.8)} fill="#a855f7" fillOpacity={0.35 * dim} stroke="none"/>
        </g>
      ))}

      {/* Top section */}
      <circle cx={CX} cy="35" r="9" fill="#7c3aed" fillOpacity={0.35 * dim}/>
      <circle cx={CX + 5} cy="33" r="8" fill="#050510" opacity="0.95"/>
      <circle cx={CX} cy="35" r="1.5" fill="#c084fc" fillOpacity={0.6 * dim}/>
      {divider(50)}
      <text x={CX} y="46" textAnchor="middle" fontSize="5.5" letterSpacing="3.5"
            fill="#a855f7" fillOpacity={0.55 * dim} fontFamily="serif">
        ᛫  T A R O T  ᛫
      </text>

      {/* Animated outer tick ring */}
      <g>
        <animateTransform
          attributeName="transform" type="rotate"
          from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
          dur="90s" repeatCount="indefinite"
        />
        <circle cx={CX} cy={CY} r="74" fill="none" stroke="#6d28d9"
                strokeWidth="0.75" strokeDasharray="3 6" strokeOpacity={0.45 * dim}/>
        {ticks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
                stroke={t.main ? "#a855f7" : "#7c3aed"}
                strokeWidth={t.main ? "1.25" : "0.65"}
                strokeOpacity={(t.main ? 0.65 : 0.4) * dim}/>
        ))}
      </g>

      {/* Static outer ring */}
      <circle cx={CX} cy={CY} r="66" fill="none" stroke="#8b5cf6"
              strokeWidth="0.9" strokeOpacity={0.5 * dim}/>

      {/* Lotus petals */}
      <g filter={`url(#f-${uid})`}>
        {petals.map((d, i) => (
          <path key={i} d={d} fill="#7c3aed" fillOpacity={0.18 * dim}
                stroke="#a855f7" strokeWidth="0.75" strokeOpacity={0.55 * dim}/>
        ))}
      </g>

      {/* Octagram */}
      <polygon points={sqPts(sq1)} fill="none" stroke="#c084fc"
               strokeWidth="0.9" strokeOpacity={0.65 * dim}/>
      <polygon points={sqPts(sq2)} fill="none" stroke="#c084fc"
               strokeWidth="0.9" strokeOpacity={0.65 * dim}/>

      {/* Inner ring + 8 diamonds */}
      <circle cx={CX} cy={CY} r="24" fill="none" stroke="#a855f7"
              strokeWidth="0.75" strokeOpacity={0.6 * dim}/>
      <g fill="#c084fc" fillOpacity={0.55 * dim}>
        {innerDiamonds.map((d, i) => <path key={i} d={d}/>)}
      </g>

      {/* Central medallion */}
      <circle cx={CX} cy={CY} r="19" fill="#0a0220"
              stroke="#a855f7" strokeWidth="1" strokeOpacity={0.75 * dim}/>
      <circle cx={CX} cy={CY} r="15" fill="none"
              stroke="#c084fc" strokeWidth="0.4" strokeOpacity={0.4 * dim}/>
      <circle cx={CX} cy={CY} r="13" fill="#7c3aed" fillOpacity={0.55 * dim}
              filter={`url(#f-${uid})`}/>
      <circle cx={CX + 5.5} cy={CY - 2} r="11.5" fill="#0a0220"
              clipPath={`url(#moon-${uid})`}/>
      <path d={starPath(CX - 4, CY + 2, 2.5, 1)} fill="#e9d5ff" fillOpacity={0.75 * dim}/>

      {/* Bottom section */}
      {divider(270)}
      <text x={CX} y="282" textAnchor="middle" fontSize="7" letterSpacing="2"
            fill="#a855f7" fillOpacity={0.5 * dim} fontFamily="serif">
        ✦  ✦  ✦
      </text>
      {/* Triple moon */}
      <circle cx={CX}      cy="300" r="5.5" fill="none" stroke="#a855f7" strokeWidth="0.75" strokeOpacity={0.45 * dim}/>
      <circle cx={CX}      cy="300" r="3"   fill="#7c3aed" fillOpacity={0.35 * dim}/>
      <circle cx={CX - 14} cy="300" r="4.5" fill="none" stroke="#a855f7" strokeWidth="0.6"  strokeOpacity={0.3 * dim}/>
      <circle cx={CX - 12} cy="300" r="3.5" fill="#0a0220" opacity="0.9"/>
      <circle cx={CX + 14} cy="300" r="4.5" fill="none" stroke="#a855f7" strokeWidth="0.6"  strokeOpacity={0.3 * dim}/>
      <circle cx={CX + 16} cy="300" r="3.5" fill="#0a0220" opacity="0.9"/>
    </svg>
  );
}
