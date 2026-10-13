import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import ModelDashboard from './ModelDashboard'
import EstateMock from './EstateMock'
import OnboardMock from './OnboardMock'
import TicketMock from './TicketMock'
import '../styles/flow-hero.css'

/* ---------- copy ---------- */
const HERO = {
  badge: 'New',
  eyebrow: 'Meet CubeZix, your trusted IT partner in MENA',
  note: 'Free consultation. No obligation required.',
  title: 'Delivering Seamless IT Experience',
  accent: 'across the MENA Region.',
  sub: 'CubeZix, a leading IT solutions provider in Dubai, offers comprehensive IT services to support businesses across industries. Our expert team delivers exceptional IT support with scalable IT Annual Maintenance Contracts (AMC) to ensure seamless IT operations.',
}
const NODE_LABELS = ['Head office', 'Helpdesk', 'Backup', 'Wi-Fi', 'Servers', 'Cloud', 'Firewall', 'CCTV', 'ERP', 'VPN', 'Branch', 'Access', 'Telephony']

const STEPS = [
  {
    title: 'IT AMC keeps every system covered, all year.',
    body: 'One annual contract for preventive maintenance, unlimited helpdesk and remote support, onsite repairs and monthly health reports, so problems are fixed before they stop your team.',
  },
  {
    title: 'IT infrastructure built right the first time.',
    body: 'Structured cabling, Wi-Fi, servers and firewalls designed, installed and certified for new offices and growing sites, then supported long after go-live.',
  },
  {
    title: 'ERP solutions that run your whole business.',
    body: 'Finance, HR, CRM and operations on one system, tailored to your process, with data migration, training and on-call support through go-live and beyond.',
  },
]

/* ---------- geometry helpers ---------- */
type Pt = [number, number]

/** Orthogonal polyline with rounded corners. */
function rounded(pts: Pt[], r: number) {
  let d = `M${pts[0][0]} ${pts[0][1]}`
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1]
    const [x, y] = pts[i]
    const [nx, ny] = pts[i + 1]
    const l1 = Math.hypot(x - px, y - py)
    const l2 = Math.hypot(nx - x, ny - y)
    const k = Math.min(r, l1 / 2, l2 / 2)
    const ax = x + ((px - x) / l1) * k
    const ay = y + ((py - y) / l1) * k
    const bx = x + ((nx - x) / l2) * k
    const by = y + ((ny - y) / l2) * k
    d += ` L${ax.toFixed(1)} ${ay.toFixed(1)} Q${x} ${y} ${bx.toFixed(1)} ${by.toFixed(1)}`
  }
  const l = pts[pts.length - 1]
  return `${d} L${l[0]} ${l[1]}`
}

/* ---------- hero network ---------- */
const HUB: Pt = [730, 560]
const B = 490
// Node layout is mirrored about the hub (x = 730): the outer nodes sit 575px either side so the network is balanced left and right.
const ROUTES: Pt[][] = [
  [[730, B], [300, B], [300, 400], [235, 400], [235, 200], [155, 200], [155, 150]],
  [[730, B], [300, B], [300, 330], [155, 330], [155, 380]],
  [[730, B], [460, B], [460, 420], [340, 420], [340, 410]],
  [[730, B], [300, B], [300, 575], [170, 575], [170, 570]],
  [[730, B], [600, B], [600, 575], [500, 575]],
  [[730, B], [600, B], [600, 648], [420, 648]],
  [[730, B], [790, B], [790, 540], [860, 540], [860, 590]],
  [[730, B], [940, B], [940, 575], [1020, 575], [1020, 530]],
  [[730, B], [885, B], [885, 445], [1050, 445], [1050, 420]],
  [[730, B], [1210, B], [1210, 430], [1285, 430], [1285, 420]],
  [[730, B], [1210, B], [1210, 310], [1305, 310], [1305, 210]],
  [[730, B], [1210, B], [1305, B], [1305, 610]],
  [[730, B], [940, B], [940, 636], [1000, 636]],
]

const SCREENS = ['dash-1', 'dash-2', 'dash-3', 'dash-4', 'dash-5', 'dash-6']

/** Hero network: SVG lines underneath, HTML nodes + travelling pulses on top (no SVG filters, so it stays smooth). */
function Network() {
  const stage = useRef<HTMLDivElement>(null)
  const items = useMemo(
    () => ROUTES.map((r, i) => ({ d: rounded([HUB, ...r], 26), end: r[r.length - 1], i })),
    [],
  )

  // mimic preserveAspectRatio="xMidYMax slice": scale the 1470x700 stage to cover the hero, anchored bottom-centre
  useEffect(() => {
    const el = stage.current
    const host = el?.parentElement
    if (!el || !host) return
    const fit = () => {
      const s = Math.max(host.clientWidth / 1470, host.clientHeight / 700)
      el.style.setProperty('--s', String(s))
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(host)
    return () => ro.disconnect()
  }, [])

  /* One shared cycle: the hub pulses, a comet leaves along every route at the same speed (so near nodes
     light up first and far ones later, like a real fan-out), each node acknowledges on arrival, then a
     faint return trace flows back to the hub. */
  useEffect(() => {
    const el = stage.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const PERIOD = 9000 // ms per cycle
    const DELAY = 2600 // let the lines finish drawing first
    const SPEED = 0.34 // stage px per ms, outward
    const BACK = 0.3 // stage px per ms, return
    const START = 0.05 // fraction of the cycle at which comets leave the hub
    const LEN: Record<string, number> = { halo: 70, tail: 110, mid: 56, head: 22, back: 54 }
    const anims: Animation[] = []
    const opts: KeyframeAnimationOptions = { duration: PERIOD, iterations: Infinity, delay: DELAY }
    const f = (ms: number) => ms / PERIOD

    const pulse = el.querySelector<HTMLElement>('.fh-hub-pulse')
    if (pulse) {
      anims.push(pulse.animate([
        { offset: 0, opacity: 0, transform: 'scale(1)' },
        { offset: START * 0.3, opacity: 0.85, transform: 'scale(1)' },
        { offset: START + 0.12, opacity: 0, transform: 'scale(1.55)' },
        { offset: 1, opacity: 0, transform: 'scale(1.55)' },
      ], opts))
    }

    el.querySelectorAll<SVGGElement>('[data-route]').forEach((g) => {
      const i = Number(g.dataset.route)
      const paths = Array.from(g.querySelectorAll<SVGPathElement>('path'))
      const L = paths[0].getTotalLength()
      const arrive = START + f(L / SPEED)
      paths.forEach((p) => {
        const layer = p.dataset.layer ?? 'head'
        const len = LEN[layer]
        p.style.strokeDasharray = `${len} ${L + len * 2 + 40}`
        p.style.visibility = 'visible'
        if (layer === 'back') {
          const b0 = Math.min(arrive + 0.06, 0.9)
          const b1 = Math.min(b0 + f((L + len) / BACK), 0.99)
          anims.push(p.animate([
            { offset: 0, strokeDashoffset: -L },
            { offset: b0, strokeDashoffset: -L, easing: 'cubic-bezier(0.4, 0, 0.6, 1)' },
            { offset: b1, strokeDashoffset: len },
            { offset: 1, strokeDashoffset: len },
          ], opts))
        } else {
          const end = Math.min(START + f((L + len) / SPEED), 0.97)
          anims.push(p.animate([
            { offset: 0, strokeDashoffset: len },
            { offset: START, strokeDashoffset: len },
            { offset: end, strokeDashoffset: -L },
            { offset: 1, strokeDashoffset: -L },
          ], opts))
        }
      })
      const ack = el.querySelector<HTMLElement>(`.fh-node[data-i="${i}"] .fh-ack`)
      if (ack) {
        const a0 = Math.min(arrive, 0.9)
        anims.push(ack.animate([
          { offset: 0, opacity: 0, transform: 'scale(1)' },
          { offset: a0, opacity: 0, transform: 'scale(1)' },
          { offset: a0 + 0.006, opacity: 1, transform: 'scale(1)' },
          { offset: Math.min(a0 + 0.1, 0.99), opacity: 0, transform: 'scale(1.32)' },
          { offset: 1, opacity: 0, transform: 'scale(1.32)' },
        ], opts))
      }
    })
    return () => anims.forEach((a) => a.cancel())
  }, [items])

  return (
    <div className="fh-net" aria-hidden="true">
      <div className="fh-stage" ref={stage}>
        <svg className="fh-lines" width="1470" height="700" viewBox="0 0 1470 700">
          {items.map(({ d, i }) => (
            <path key={i} d={d} pathLength={1} className="fh-line" style={{ animationDelay: `${0.15 + i * 0.08}s` }} />
          ))}
          {/* data stream: a soft comet per route, timed by distance from the hub, then a faint return */}
          {items.map(({ d, i }) => (
            <g key={`s${i}`} data-route={i}>
              <path d={d} className="fh-st fh-st-halo" data-layer="halo" />
              <path d={d} className="fh-st fh-st-tail" data-layer="tail" />
              <path d={d} className="fh-st fh-st-mid" data-layer="mid" />
              <path d={d} className="fh-st fh-st-head" data-layer="head" />
              <path d={d} className="fh-st fh-st-back" data-layer="back" />
            </g>
          ))}
        </svg>

        {items.map(({ end, i }) => {
          const edge = end[0] < 220 ? 'l' : end[0] > 1250 ? 'r' : 'c'
          return (
            <div
              key={i}
              className={`fh-node o-${edge}`}
              data-i={i}
              style={{ left: end[0] - 25, top: end[1] - 29, animationDelay: `${1.0 + i * 0.07}s` }}
            >
              <div className="fh-float" style={{ animationDelay: `${-i * 0.7}s` }}>
                <div className="fh-tile">
                  <span className="fh-ack" />
                  <span className="fh-led" />
                  <div className="fh-desk">
                    <div className="fh-bezel">
                      <span className="fh-cam" />
                      <img className="fh-screen" src={`/assets/screens/${SCREENS[i % SCREENS.length]}.svg`} alt="" draggable={false} />
                      <span className="fh-glare" />
                    </div>
                    <span className="fh-neck" />
                    <span className="fh-base" />
                  </div>
                </div>
                <span className="fh-label">{NODE_LABELS[i % NODE_LABELS.length]}</span>
              </div>
            </div>
          )
        })}

        {/* hub: brand badge */}
        <div className="fh-hub fh-node" style={{ left: 730 - 46, top: 600 - 46, animationDelay: '0.8s' }}>
          <span className="fh-hub-badge"><span className="fh-hub-pulse" /><img src="/assets/logo-mark.png" alt="" /></span>
        </div>
      </div>
    </div>
  )
}

/* ---------- isometric illustrations ---------- */
const C = 0.866
const S = 0.5
const pr = (x: number, y: number, z: number): Pt => [(x - y) * C, (x + y) * S - z]
const ptsStr = (a: [number, number, number][]) => a.map((p) => pr(...p).map((n) => n.toFixed(1)).join(',')).join(' ')

type Col = { top?: string; left?: string; right?: string; op?: number }
function box(x: number, y: number, z: number, w: number, d: number, h: number, c: Col = {}) {
  const k = { top: '#fff', left: '#e4e9f6', right: '#cfd8ee', op: 1, ...c }
  return `<g opacity="${k.op}">
  <polygon points="${ptsStr([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]])}" fill="${k.left}"/>
  <polygon points="${ptsStr([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]])}" fill="${k.right}"/>
  <polygon points="${ptsStr([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]])}" fill="${k.top}"/></g>`
}
const BLUE: Col = { top: '#a9c8ff', left: '#6f9cf0', right: '#4d7fe0' }
const GLASS: Col = { top: '#d7e6ff', left: '#8fb4f7', right: '#6c97ec', op: 0.92 }
const PLATE: Col = { top: '#f4f7ff', left: '#dfe6f6', right: '#cdd7ee' }

/** A packet that slides along -y (toward the machine). */
function packet(x: number, y: number, z: number, dist: number, delay: number, dur = 4) {
  const [tx, ty] = pr(0, -dist, 0)
  return `<g class="fh-pk" style="--tx:${tx.toFixed(1)}px;--ty:${ty.toFixed(1)}px;--dl:${delay}s;--d:${dur}s">${box(x, y, z, 22, 12, 5, BLUE)}</g>`
}
const wrapSvg = (inner: string) => `<svg class="fh-iso" viewBox="-260 -70 540 400">${inner}</svg>`
const glowDef = (id: string, a = 0.9) =>
  `<defs><radialGradient id="${id}"><stop offset="0" stop-color="#5b8dff" stop-opacity="${a}"/><stop offset="1" stop-color="#5b8dff" stop-opacity="0"/></radialGradient></defs>`

function sceneOne() {
  let s = glowDef('fh-g1')
  s += `<g class="fh-bob">`
  s += box(-20, -10, 0, 230, 300, 8, PLATE)
  s += `<ellipse cx="60" cy="-14" rx="130" ry="70" fill="url(#fh-g1)" class="fh-glow"/>`
  s += box(70, 40, 8, 110, 110, 18, { top: '#fff', left: '#e2e8f7', right: '#ccd6ee' })
  for (let i = 0; i < 5; i++) s += box(70 + i * 22, 36, 26, 14, 8, 24, { top: '#fff', left: '#dfe6f6', right: '#c9d3ec' })
  for (let i = 0; i < 5; i++) s += box(176, 52 + i * 20, 26, 8, 14, 24, { top: '#fff', left: '#dfe6f6', right: '#c9d3ec' })
  s += box(96, 66, 26, 56, 56, 10, { top: '#e9f1ff', left: '#c4d6f8', right: '#a9c3f3' })
  s += `<g class="fh-glow">${box(110, 80, 36, 28, 28, 3, { top: '#2563ff', left: '#1c4fd0', right: '#1a46b8' })}</g>`
  for (let i = 0; i < 3; i++) s += box(40, 170 + i * 50, 8, 100, 8, 30, { ...GLASS, op: 0.85 })
  for (let i = 0; i < 3; i++) s += box(52, 172 + i * 50, 8, 76, 4, 4, { top: '#fff', left: '#c8dafb', right: '#aac7f6' })
  s += packet(90, 235, 8, 160, 0) + packet(90, 235, 8, 160, 1.4) + packet(90, 235, 8, 160, 2.8)
  return wrapSvg(s + '</g>')
}

function sceneTwo() {
  let s = glowDef('fh-g2', 0.85)
  s += `<g class="fh-bob">`
  s += box(10, -20, 0, 200, 330, 8, PLATE)
  s += `<ellipse cx="80" cy="-6" rx="120" ry="60" fill="url(#fh-g2)" class="fh-glow"/>`
  s += box(50, 0, 8, 130, 110, 40, GLASS)
  s += box(60, 10, 48, 110, 90, 10, { top: '#f6f9ff', left: '#d5e1f9', right: '#bccdf3' })
  for (let i = 0; i < 3; i++) s += box(76 + i * 30, 18, 58, 18, 10, 6, { top: '#cfe0ff', left: '#9bb9f2', right: '#7ea3ec' })
  s += `<g class="fh-glow">${box(88, 100, 16, 70, 6, 26, { top: '#aecbff', left: '#2563ff', right: '#1c4fd0' })}</g>`
  const dots = ['#00DAFF', '#12B981', '#4F46E5']
  ;[150, 210, 270].forEach((y, i) => {
    s += box(60, y, 8, 100, 10, 36, { ...GLASS, op: 0.9 })
    const [cx, cy] = pr(110, y, 50)
    s += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="9" fill="#fff"/><circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="5.5" fill="${dots[i]}"/>`
  })
  s += packet(110, 300, 8, 200, 0, 5) + packet(110, 300, 8, 200, 1.7, 5) + packet(110, 300, 8, 200, 3.4, 5)
  return wrapSvg(s + '</g>')
}

function sceneThree() {
  let s = glowDef('fh-g3', 0.7)
  s += `<g class="fh-bob">`
  s += box(-20, -10, 0, 240, 320, 8, PLATE)
  s += `<ellipse cx="60" cy="-10" rx="130" ry="60" fill="url(#fh-g3)" class="fh-glow"/>`
  s += box(40, 10, 8, 150, 120, 42, { top: '#fff', left: '#e5eaf7', right: '#cfd8ee' })
  s += `<g class="fh-glow">${box(52, 22, 50, 126, 96, 6, { top: '#5b8dff', left: '#2563ff', right: '#1c4fd0' })}</g>`
  for (let i = 0; i < 4; i++) s += box(60 + i * 28, 30, 56, 18, 80, 2, { top: '#9fc1ff', left: '#7aa5f5', right: '#6492ea' })
  s += box(190, 40, 8, 22, 22, 34, GLASS) + box(190, 80, 8, 22, 22, 34, GLASS)
  s += box(30, 140, 8, 70, 70, 30, { top: '#d7e6ff', left: '#9fbcf3', right: '#80a4ec' })
  s += box(48, 148, 8, 34, 200, 8, { top: '#eef3ff', left: '#d4def5', right: '#bfcdef' })
  s += packet(52, 320, 16, 180, 0, 4.5) + packet(52, 320, 16, 180, 1.5, 4.5) + packet(52, 320, 16, 180, 3, 4.5)
  return wrapSvg(s + '</g>')
}

/* ---------- scroll reveal ---------- */
function useReveal<T extends Element>() {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setSeen(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, seen] as const
}

function Step({ n, flip, scene, node, wide, children }: { n: number; flip?: boolean; scene?: string; node?: React.ReactNode; wide?: boolean; children: React.ReactNode }) {
  const [ref, seen] = useReveal<HTMLElement>()
  return (
    <section ref={ref} className={`fh-step${flip ? ' right' : ''}${seen ? ' in' : ''}`} data-step={n}>
      {node ? (
        <div className={`fh-ill${wide ? ' wide' : ''}`}>{node}</div>
      ) : (
        <div className="fh-ill" dangerouslySetInnerHTML={{ __html: scene ?? '' }} />
      )}
      <div className="fh-txt">
        <span className="fh-tag">Step {n}</span>
        {children}
      </div>
    </section>
  )
}


/* ---------- component ---------- */
export default function FlowHero() {
  const copy = HERO

  const flow = useRef<HTMLDivElement>(null)
  const svg = useRef<SVGSVGElement>(null)
  const base = useRef<SVGPathElement>(null)
  const base2 = useRef<SVGPathElement>(null)
  const prog = useRef<SVGPathElement>(null)
  const markers = useRef<(HTMLSpanElement | null)[]>([])
  const kpi = useRef<HTMLDivElement>(null)

  const scenes = useMemo(() => [sceneOne(), sceneTwo(), sceneThree()], [])

  /* pipe: geometry + scroll progress */
  useEffect(() => {
    const el = flow.current
    const sv = svg.current
    const p0 = base.current
    const p1 = base2.current
    const p2 = prog.current
    if (!el || !sv || !p0 || !p1 || !p2) return

    let samples: [number, number][] = []
    let total = 0
    let mids: number[] = []
    let target = 0
    let shown = 0
    let raf = 0
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const apply = () => {
      p2.style.strokeDashoffset = String(total - shown)
    }
    // ease the blue fill toward the scroll position instead of snapping to it
    const tick = () => {
      shown += (target - shown) * 0.12
      if (Math.abs(target - shown) < 0.4) {
        shown = target
        raf = 0
      } else {
        raf = requestAnimationFrame(tick)
      }
      apply()
    }

    const update = () => {
      const top = el.getBoundingClientRect().top + window.scrollY
      const y = window.scrollY + window.innerHeight * 0.62 - top
      let lo = 0
      let hi = samples.length - 1
      while (lo < hi) {
        const m = (lo + hi) >> 1
        if (samples[m][1] < y) lo = m + 1
        else hi = m
      }
      const len = samples[lo] ? samples[lo][0] : 0
      target = Math.max(0, Math.min(total, len))
      if (reduce) {
        shown = target
        apply()
      } else if (!raf) {
        raf = requestAnimationFrame(tick)
      }
      markers.current.forEach((m, i) => m && m.classList.toggle('on', y > mids[i] - 20))
    }

    const build = () => {
      const W = el.clientWidth
      const H = el.clientHeight
      const fr = el.getBoundingClientRect().top + window.scrollY
      sv.setAttribute('viewBox', `0 0 ${W} ${H}`)
      const steps = Array.from(el.querySelectorAll<HTMLElement>('.fh-step'))
      const rel = (s: HTMLElement): [number, number] => {
        const r = s.getBoundingClientRect()
        return [r.top + window.scrollY - fr, r.bottom + window.scrollY - fr]
      }
      const [t1, b1] = rel(steps[0])
      const [, b2] = rel(steps[1])
      const [, b3] = rel(steps[2])
      // the pipe ends behind the "Our model" eyebrow pill (its vertical centre), never down behind the heading.
      // Measured from layout offsets so the block's reveal translate does not shift it.
      const eb = kpi.current?.querySelector<HTMLElement>('.md-head .eb')
      let kpiTop = kpi.current ? rel(kpi.current)[0] + 69 : H
      if (eb) {
        let y = eb.offsetHeight / 2
        let node: HTMLElement | null = eb
        while (node && node !== el) {
          y += node.offsetTop
          node = node.offsetParent as HTMLElement | null
        }
        kpiTop = y
      }
      const cx = W / 2
      const mob = W <= 900
      const L = mob ? 24 : W * 0.155
      const R = mob ? 24 : W * 0.845
      const y0 = t1 + 20
      // hub badge bottom sits at stage y=646 of 700, so start the pipe right under it (above this container)
      const stageEl = document.querySelector<HTMLElement>('.fh-stage')
      const sc = stageEl ? parseFloat(getComputedStyle(stageEl).getPropertyValue('--s')) || 1 : 1
      const startY = -54 * sc
      const P: Pt[] = mob
        ? [[cx, startY], [cx, y0], [L, y0], [L, b3], [cx, b3], [cx, kpiTop]]
        : [[cx, startY], [cx, y0], [L, y0], [L, b1], [R, b1], [R, b2], [L, b2], [L, b3], [cx, b3], [cx, kpiTop]]
      const d = rounded(P, 70)
      ;[p0, p1, p2].forEach((p) => p.setAttribute('d', d))
      total = p2.getTotalLength()
      p2.style.strokeDasharray = String(total)
      samples = []
      for (let l = 0; l <= total; l += 6) samples.push([l, p2.getPointAtLength(l).y])
      mids = steps.map((s) => {
        const [a, b] = rel(s)
        return (a + b) / 2
      })
      const xs = mob ? [L, L, L] : [L, R, L]
      markers.current.forEach((m, i) => {
        if (!m) return
        m.style.left = `${xs[i]}px`
        m.style.top = `${mids[i]}px`
      })
      update()
      shown = target
      apply()
    }

    build()
    const t = window.setTimeout(build, 500)
    const ro = new ResizeObserver(build)
    ro.observe(el)
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('load', build)
    return () => {
      window.clearTimeout(t)
      ro.disconnect()
      window.removeEventListener('scroll', update)
      window.removeEventListener('load', build)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="fh">
      <section className="fh-hero">
        <Network />
        <div className="fh-hero-in">
          <Link to="/about" className="fh-new">
            <span className="fh-new-badge">{copy.badge}</span>
            <span className="fh-new-text">{copy.eyebrow}</span>
            <ArrowRight size={15} className="fh-new-arrow" />
          </Link>
          <h1 className="fh-hero-title">
            <span className="fh-hero-main-title">{copy.title}</span>
            <span className="fh-hero-accent">
              <span className="fh-hl" aria-hidden />
              <span className="fh-grad">{copy.accent}</span>
            </span>
          </h1>
          <p className="fh-sub">{copy.sub}</p>
          <div className="fh-actions">
            <Link to="/contact" className="btn-cubezix">
              Book free demo
            </Link>
            <Link to="/services" className="btn-cubezix-secondary">
              Explore services
              <ArrowRight size={16} />
            </Link>
          </div>
          <p className="fh-note">
            <Sparkles size={15} className="fh-note-ic" />
            {copy.note}
          </p>
        </div>
      </section>

      <div className="fh-flow" ref={flow}>
        <svg className="fh-pipe" ref={svg} aria-hidden>
          <path className="base" ref={base} />
          <path className="base2" ref={base2} />
          <path className="prog" ref={prog} />
        </svg>
        {[0, 1, 2].map((i) => (
          <span key={i} className="fh-marker" ref={(el) => { markers.current[i] = el }} />
        ))}
        {STEPS.map((s, i) => (
          <Step key={s.title} n={i + 1} flip={i === 1} scene={scenes[i]} node={i === 0 ? <EstateMock /> : i === 1 ? <OnboardMock /> : <TicketMock />} wide>
            <h2>{s.title}</h2>
            <p>{s.body}</p>
          </Step>
        ))}
        <div className="fh-model-wrap" ref={kpi}>
          <ModelDashboard />
        </div>
      </div>
    </div>
  )
}
