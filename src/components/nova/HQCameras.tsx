import { useId } from 'react'

/* Hand-drawn CCTV cameras for the CCTV station. Glossy white housings, brand-blue glow,
   dark glass and a live lens, matching the light-blue HQ scenes. Pure SVG, no raster art. */

function Defs({ p }: { p: string }) {
  return (
    <defs>
      <linearGradient id={`${p}shell`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="0.55" stopColor="#eef2f9" />
        <stop offset="1" stopColor="#cfd9ea" />
      </linearGradient>
      <linearGradient id={`${p}side`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#dfe6f2" />
        <stop offset="0.45" stopColor="#ffffff" />
        <stop offset="1" stopColor="#d3dcec" />
      </linearGradient>
      <linearGradient id={`${p}plate`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#d9e1ee" />
      </linearGradient>
      <linearGradient id={`${p}ring`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#1d4ed8" />
        <stop offset="0.5" stopColor="#60a5ff" />
        <stop offset="1" stopColor="#1d4ed8" />
      </linearGradient>
      <radialGradient id={`${p}glass`} cx="0.5" cy="0.1" r="0.95">
        <stop offset="0" stopColor="#475a86" />
        <stop offset="0.5" stopColor="#141d36" />
        <stop offset="1" stopColor="#05080f" />
      </radialGradient>
      <radialGradient id={`${p}lens`} cx="0.4" cy="0.36" r="0.7">
        <stop offset="0" stopColor="#bfe0ff" />
        <stop offset="0.22" stopColor="#4a8dff" />
        <stop offset="0.55" stopColor="#1638a8" />
        <stop offset="0.85" stopColor="#06103a" />
        <stop offset="1" stopColor="#020617" />
      </radialGradient>
      <radialGradient id={`${p}bezel`} cx="0.35" cy="0.3" r="0.8">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="0.7" stopColor="#e3e9f4" />
        <stop offset="1" stopColor="#b9c5da" />
      </radialGradient>
      <radialGradient id={`${p}screw`} cx="0.35" cy="0.3" r="0.8">
        <stop offset="0" stopColor="#e2e8f2" />
        <stop offset="1" stopColor="#8d9ab3" />
      </radialGradient>
      <filter id={`${p}drop`} x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#2550b4" floodOpacity="0.22" />
      </filter>
      <filter id={`${p}glow`} x="-50%" y="-200%" width="200%" height="500%">
        <feGaussianBlur stdDeviation="4" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
  )
}

function Screw({ x, y, p }: { x: number; y: number; p: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="5.5" fill={`url(#${p}screw)`} />
      <path d={`M${x - 3} ${y} H${x + 3}`} stroke="#7b879e" strokeWidth="1.2" strokeLinecap="round" />
    </g>
  )
}

export function DomeCam() {
  const p = useId().replace(/:/g, '') + 'd'
  return (
    <svg className="cc-svg dome" viewBox="0 0 240 206" aria-hidden>
      <Defs p={p} />
      <clipPath id={`${p}clip`}><path d="M86 104 A64 64 0 0 0 214 104 Z" /></clipPath>
      <ellipse cx="150" cy="196" rx="66" ry="6" fill="#2563ff" opacity="0.12" />

      <g filter={`url(#${p}drop)`}>
        {/* wall plate + arm */}
        <rect x="8" y="38" width="56" height="132" rx="15" fill={`url(#${p}plate)`} />
        <rect x="8.5" y="38.5" width="55" height="131" rx="14.5" fill="none" stroke="#fff" strokeOpacity="0.9" />
        <Screw x={36} y={58} p={p} />
        <Screw x={36} y={150} p={p} />
        <path d="M58 82 h26 a10 10 0 0 1 10 10 v12 a10 10 0 0 1 -10 10 h-26 Z" fill={`url(#${p}side)`} />

        {/* housing */}
        <path d="M80 98 C80 52 110 22 150 22 C190 22 220 52 220 98 Z" fill={`url(#${p}shell)`} />
        <path d="M96 76 C100 50 120 34 146 31" stroke="#fff" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.9" />
        <ellipse cx="150" cy="97" rx="70" ry="3" fill="#c3cee1" />

        {/* glowing ring */}
        <rect className="cc-ring" x="76" y="96" width="148" height="10" rx="5" fill={`url(#${p}ring)`} filter={`url(#${p}glow)`} />

        {/* glass bubble + panning lens */}
        <path d="M86 104 A64 64 0 0 0 214 104 Z" fill={`url(#${p}glass)`} />
        <g clipPath={`url(#${p}clip)`}>
          <g className="cc-pan">
            <circle cx="150" cy="136" r="27" fill="#0b1224" stroke="#2c3a5c" strokeWidth="3" />
            <circle cx="150" cy="136" r="19" fill={`url(#${p}lens)`} />
            <circle cx="150" cy="136" r="7" fill="#020617" />
            <circle cx="150" cy="136" r="19" fill="none" stroke="#7fb4ff" strokeOpacity="0.35" />
            <circle cx="150" cy="136" r="12.5" fill="none" stroke="#9cc6ff" strokeOpacity="0.18" />
            <ellipse cx="143" cy="128" rx="5" ry="3" fill="#fff" opacity="0.8" transform="rotate(-28 143 128)" />
          </g>
          <ellipse cx="150" cy="106" rx="64" ry="7" fill="#000" opacity="0.35" />
          <path d="M98 112 C104 140 120 158 140 164" stroke="#fff" strokeOpacity="0.16" strokeWidth="9" strokeLinecap="round" fill="none" />
        </g>
        <path d="M86 104 A64 64 0 0 0 214 104" fill="none" stroke="#2c3b60" strokeOpacity="0.5" />
      </g>
    </svg>
  )
}

export function BulletCam() {
  const p = useId().replace(/:/g, '') + 'b'
  const leds = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2
    return { x: 74 + Math.cos(a) * 25.5, y: 98 + Math.sin(a) * 30 }
  })
  return (
    <svg className="cc-svg bullet" viewBox="0 0 300 212" aria-hidden>
      <Defs p={p} />
      <defs>
        <linearGradient id={`${p}body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.38" stopColor="#f4f7fc" />
          <stop offset="0.78" stopColor="#d9e2f1" />
          <stop offset="1" stopColor="#b7c5dc" />
        </linearGradient>
        <linearGradient id={`${p}shade`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8fa3c6" stopOpacity="0.5" />
          <stop offset="0.25" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.8" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#8fa3c6" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id={`${p}hood`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#eef2f9" />
          <stop offset="1" stopColor="#c9d4e8" />
        </linearGradient>
        <linearGradient id={`${p}arm`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c4d0e4" />
        </linearGradient>
        <radialGradient id={`${p}well`} cx="0.45" cy="0.4" r="0.75">
          <stop offset="0" stopColor="#2a3555" />
          <stop offset="1" stopColor="#070b17" />
        </radialGradient>
        <radialGradient id={`${p}floor`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#2563ff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#2563ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="150" cy="198" rx="118" ry="9" fill={`url(#${p}floor)`} />

      <g filter={`url(#${p}drop)`}>
        {/* wall plate */}
        <rect x="238" y="30" width="54" height="142" rx="15" fill={`url(#${p}plate)`} />
        <rect x="238.5" y="30.5" width="53" height="141" rx="14.5" fill="none" stroke="#fff" strokeOpacity="0.9" />
        <Screw x={265} y={52} p={p} />
        <Screw x={265} y={150} p={p} />

        {/* arm from the plate to the ball joint under the body */}
        <path d="M242 112 h-44 a10 10 0 0 0 -10 10 v10 a10 10 0 0 0 10 10 h44 Z" fill={`url(#${p}arm)`} />
        <path d="M200 116 h40" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.9" />

        {/* the head swings on the joint */}
        <g className="cc-swing">
          {/* ball joint + mount foot */}
          <circle cx="190" cy="134" r="14" fill={`url(#${p}bezel)`} />
          <path d="M168 124 h42 a8 8 0 0 1 8 8 v2 h-58 v-2 a8 8 0 0 1 8 -8 Z" fill={`url(#${p}side)`} />

          {/* body: a long cylinder */}
          <rect x="60" y="62" width="172" height="72" rx="36" fill={`url(#${p}body)`} />
          <rect x="60" y="62" width="172" height="72" rx="36" fill={`url(#${p}shade)`} />
          {/* seam where the rear cap meets the tube */}
          <path d="M196 64 V132" stroke="#b9c6dc" strokeWidth="1.4" opacity="0.8" />
          <path d="M199 66 V130" stroke="#fff" strokeWidth="1.4" opacity="0.9" />
          {/* underside shadow line + status LED + blue accent */}
          <path d="M92 124 Q146 132 192 124" stroke="#a9b8d2" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.7" />
          <rect x="116" y="112" width="58" height="3" rx="1.5" fill="#2563ff" opacity="0.6" />
          <circle className="cc-led" cx="214" cy="96" r="3.6" fill="#3b82ff" />
          <circle cx="214" cy="96" r="6.5" fill="#3b82ff" opacity="0.18" />

          {/* sun hood: overhangs the lens and wraps the top of the tube */}
          <path d="M26 74 C26 46 46 34 78 34 H204 C222 34 234 42 234 58 V66 C150 56 70 58 30 82 Z" fill={`url(#${p}hood)`} />
          <path d="M42 56 C48 45 62 41 84 41 H198" stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.95" />
          <path d="M30 82 C70 58 150 56 234 66" stroke="#b9c6dc" strokeWidth="1.6" fill="none" />
          <path d="M30 84 C72 62 150 60 234 70" stroke="#000" strokeOpacity="0.12" strokeWidth="5" fill="none" />

          {/* front: recess, IR ring, lens */}
          <ellipse cx="72" cy="99" rx="44" ry="49" fill={`url(#${p}bezel)`} />
          <ellipse cx="72" cy="99" rx="44" ry="49" fill="none" stroke="#fff" strokeWidth="2" opacity="0.9" />
          <ellipse cx="74" cy="99" rx="37" ry="42" fill={`url(#${p}well)`} />
          {leds.map((l, i) => <circle key={i} className="cc-ir" cx={l.x} cy={l.y} r="2.6" fill="#9b1c1c" style={{ animationDelay: `${i * 0.11}s` }} />)}
          <ellipse cx="74" cy="99" rx="23" ry="27" fill="#0b1224" stroke="#33415f" strokeWidth="2.5" />
          <ellipse cx="74" cy="99" rx="18" ry="21" fill={`url(#${p}lens)`} />
          <ellipse cx="74" cy="99" rx="7" ry="8" fill="#020617" />
          <ellipse cx="74" cy="99" rx="18" ry="21" fill="none" stroke="#8fc0ff" strokeOpacity="0.4" />
          <ellipse cx="66" cy="89" rx="6" ry="3.6" fill="#fff" opacity="0.85" transform="rotate(-30 66 89)" />
          <path d="M44 78 A36 41 0 0 1 64 62" stroke="#fff" strokeOpacity="0.2" strokeWidth="4" strokeLinecap="round" fill="none" />
        </g>
      </g>
    </svg>
  )
}
