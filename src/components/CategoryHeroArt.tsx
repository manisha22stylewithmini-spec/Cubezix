import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import {
  Activity, BarChart3, Bell, CheckCheck, Clock, Database, Headset, Wrench, KeyRound, Laptop, Lock, Printer, ShieldCheck,
  Smartphone, Wifi,
} from 'lucide-react'
import { BulletCam, DASH_SCREENS, DashboardMonitor, DomeCam } from './nova/HQScenes'
import '../styles/hq-journey.css'
import '../styles/category-hero.css'

/* ------------------------------------------------------------------------------------------------
   The hero illustration of each service category page: a small live scene in the same visual
   language as the home hero (white tiles, glass, brand blue, waves). Designed on a 480 x 360
   stage that scales to the width it is given; every scene reacts to the pointer (parallax) and has
   its own hover micro-interactions.
------------------------------------------------------------------------------------------------- */
const W = 480
const H = 360

function Stage({ children, label }: { children: ReactNode; label: string }) {
  const box = useRef<HTMLDivElement>(null)
  const [k, setK] = useState(1)
  useEffect(() => {
    const el = box.current
    if (!el) return
    const fit = () => setK(Math.min(1.25, el.clientWidth / W))
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--ppx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3))
    e.currentTarget.style.setProperty('--ppy', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3))
  }
  const onLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--ppx', '0')
    e.currentTarget.style.setProperty('--ppy', '0')
  }
  return (
    <div ref={box} className="ch-box" style={{ height: H * k }} onPointerMove={onMove} onPointerLeave={onLeave} role="img" aria-label={label}>
      <div className="ch-stage" style={{ transform: `scale(${k})`, width: W, height: H } as CSSProperties}>
        {children}
      </div>
    </div>
  )
}

/* ---------- IT services: a live service desk ---------- */
const TICKETS = [
  ['Printer offline', 'Floor 2 · Finance'],
  ['Email access', 'Sales team'],
  ['New laptop setup', 'HR · new joiner'],
]
function ServiceDesk() {
  return (
    <Stage label="A live IT service desk resolving tickets">
      <div className="ch-layer l1">
        <div className="ch-win ch-desk">
          <div className="ch-win-bar"><i /><i /><i /><b>Service desk</b><span className="ch-live"><em />Live · 24/7</span></div>
          {TICKETS.map(([t, s], i) => (
            <div key={t} className="ch-ticket" style={{ ['--d' as string]: `${i * 1.6}s` }}>
              <span className="ch-tk-ic"><Headset size={15} /></span>
              <span className="ch-tk-tx"><b>{t}</b><em>{s}</em></span>
              <span className="ch-st">
                <span className="ch-chip st-1">New</span>
                <span className="ch-chip st-2">In progress</span>
                <span className="ch-chip st-3"><CheckCheck size={11} /> Resolved</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="ch-layer l2">
        <div className="ch-float col c1">
          <span className="ch-ringbox">
            <svg viewBox="0 0 44 44" className="ch-ring"><circle cx="22" cy="22" r="18" className="t" /><circle cx="22" cy="22" r="18" className="b" pathLength={1} /></svg>
            <Clock size={15} className="ch-ring-ic" />
          </span>
          <span><b>15 min</b><em>first response</em></span>
        </div>
        <div className="ch-float col c2">
          <span className="ch-avs"><i>L1</i><i>L2</i><i>L3</i></span>
          <span><b>Engineers</b><em>L1 · L2 · L3</em></span>
        </div>
        <div className="ch-float col c3"><ShieldCheck size={18} /><span><b>98%</b><em>satisfaction</em></span></div>
      </div>
    </Stage>
  )
}

/* ---------- IT infrastructure: a rack feeding the whole office ---------- */
function Infra() {
  const nodes: { ic: typeof Laptop; lb: string; x: number; y: number }[] = [
    { ic: Laptop, lb: 'Workstations', x: 70, y: 70 },
    { ic: Wifi, lb: 'Wi-Fi', x: 410, y: 70 },
    { ic: Printer, lb: 'Printers', x: 70, y: 290 },
    { ic: Smartphone, lb: 'Mobile', x: 410, y: 290 },
  ]
  return (
    <Stage label="A server rack connecting workstations, Wi-Fi, printers and mobiles">
      <svg className="ch-links" viewBox={`0 0 ${W} ${H}`} aria-hidden>
        {nodes.map((n, i) => {
          const d = `M240 180 C ${n.x < 240 ? 170 : 310} 180 ${n.x} ${n.y < 180 ? 150 : 210} ${n.x} ${n.y}`
          return (
            <g key={n.lb}>
              <path d={d} className="b" />
              <path d={d} className="r" pathLength={1} style={{ animationDelay: `${i * 0.7}s` }} />
            </g>
          )
        })}
      </svg>
      <div className="ch-layer l1">
        <div className="ch-rackbox">
          <span className="hq-rack">
            <span className="hq-rack-top" />
            {['2u', '1u', 'sw', '2u', '1u'].map((t, i) => (
              <span key={i} className={`hq-blade b-${t}`}>
                <span className="hq-leds">{Array.from({ length: t === 'sw' ? 10 : 3 }, (_, k) => <i key={k} style={{ animationDelay: `${(k * 0.37) % 2.2}s` }} />)}</span>
                {t === '2u' ? <span className="hq-drv">{[0, 1, 2, 3, 4, 5].map((k) => <i key={k} />)}</span> : null}
              </span>
            ))}
            <span className="hq-rack-glass" />
          </span>
        </div>
      </div>
      <div className="ch-layer l2">
        {nodes.map((n) => (
          <span key={n.lb} className={`ch-node${n.y < 180 ? ' up' : ''}`} style={{ left: n.x, top: n.y }}>
            <span className="ch-node-in"><n.ic size={20} /></span>
            <em>{n.lb}</em>
          </span>
        ))}
        <div className="ch-float f-d"><Activity size={15} /><span><b>Network</b><em>healthy · monitored</em></span></div>
      </div>
    </Stage>
  )
}

/* ---------- ELV & security: cameras above a live feed, status chips in their own column ---------- */
function SecFeed() {
  const [t, setT] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setT(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])
  return (
    <div className="ch-feed" aria-hidden>
      <span className="ch-corr" />
      <span className="ch-floor" />
      <span className="ch-walker">
        <i className="hd" /><i className="bd" />
        <span className="ch-det"><b>Person 98%</b></span>
      </span>
      <span className="ch-osd"><em />CAM 02 · Corridor</span>
      <span className="ch-clock">{t.toLocaleTimeString('en-GB')}</span>
      <span className="ch-scan" />
    </div>
  )
}

function Security() {
  return (
    <Stage label="CCTV cameras, a live video feed with person detection, and access control">
      <div className="ch-layer l1">
        <SecFeed />
      </div>
      <div className="ch-layer l2">
        <span className="ch-cam dome hq-hot"><DomeCam /></span>
        <span className="ch-cam bullet hq-hot"><BulletCam /></span>
        <div className="ch-float col s1"><Bell size={18} /><span><b>Motion detected</b><em>Entrance · now</em></span></div>
        <div className="ch-float col s2"><KeyRound size={18} /><span><b>Access granted</b><em>Staff · Door 2</em></span></div>
        <div className="ch-float col s3"><Lock size={18} /><span><b>SIRA compliant</b><em>installed &amp; certified</em></span></div>
      </div>
    </Stage>
  )
}

/* ---------- Business applications: the dashboard that rotates through your modules ---------- */
function Apps() {
  const [at, setAt] = useState(0)
  const [hold, setHold] = useState<number | null>(null)
  useEffect(() => {
    if (hold !== null) return
    const id = window.setInterval(() => setAt((a) => (a + 1) % DASH_SCREENS.length), 3400)
    return () => window.clearInterval(id)
  }, [hold])
  const cur = hold ?? at
  return (
    <Stage label="A business dashboard switching between finance, reports, CRM, inventory and HR">
      <div className="ch-layer l1">
        <div className="ch-mon"><DashboardMonitor cur={cur} /></div>
      </div>
      <div className="ch-layer l2">
        <div className="ch-chiprow">
          {DASH_SCREENS.map((m, i) => (
            <button
              key={m.id}
              type="button"
              className={`ch-chipbtn${cur === i ? ' on' : ''}`}
              onMouseEnter={() => setHold(i)}
              onMouseLeave={() => { setAt(i); setHold(null) }}
              onFocus={() => setHold(i)}
              onBlur={() => setHold(null)}
            >
              <m.ic size={14} />{m.lb}
            </button>
          ))}
        </div>
      </div>
    </Stage>
  )
}

/* ---------- IT AMC: what one annual contract keeps running ---------- */
const COVERAGE_ROWS: [typeof Activity, string, string, string][] = [
  [Activity, '24/7 monitoring', 'Servers · network', 'Active'],
  [Wrench, 'Preventive care', 'Scheduled inspections', 'On plan'],
  [Headset, 'Remote & on-site', 'L1 · L2 · L3', 'On call'],
  [Database, 'Backup & recovery', 'Restore tested', 'Verified'],
]
export function AmcHeroArt() {
  return (
    <Stage label="An IT AMC dashboard showing monitoring, maintenance, support and backup all covered">
      <div className="ch-layer l1">
        <div className="ch-win ch-amc">
          <div className="ch-win-bar"><i /><i /><i /><b>Your AMC</b><span className="ch-live"><em />All covered</span></div>
          {COVERAGE_ROWS.map(([Ic, t, sub, st], i) => (
            <div key={t} className="ch-ticket ch-cov" style={{ ['--d' as string]: `${i * 0.9}s` }}>
              <span className="ch-tk-ic"><Ic size={15} /></span>
              <span className="ch-tk-tx"><b>{t}</b><em>{sub}</em></span>
              <span className="ch-ok"><CheckCheck size={11} /> {st}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="ch-layer l2">
        <div className="ch-float col c1">
          <span className="ch-ringbox">
            <svg viewBox="0 0 44 44" className="ch-ring"><circle cx="22" cy="22" r="18" className="t" /><circle cx="22" cy="22" r="18" className="b" pathLength={1} /></svg>
            <Clock size={15} className="ch-ring-ic" />
          </span>
          <span><b>15 min</b><em>first response</em></span>
        </div>
        <div className="ch-float col c2">
          <span className="ch-avs"><i>L1</i><i>L2</i><i>L3</i></span>
          <span><b>Engineers</b><em>L1 · L2 · L3</em></span>
        </div>
        <div className="ch-float col c3"><BarChart3 size={18} /><span><b>Monthly report</b><em>health &amp; tickets</em></span></div>
      </div>
    </Stage>
  )
}

/* ---------- any inner service page: the same live card, filled from the page data ---------- */
export function PageHeroArt({ head, rows, icons, stat, badge }: {
  head: string
  rows: [string, string, string][]
  icons: (typeof Activity)[]
  stat: [string, string]
  badge: [string, string]
}) {
  return (
    <Stage label={`${head}: a live summary of the service`}>
      <div className="ch-layer l1">
        <div className="ch-win ch-amc">
          <div className="ch-win-bar"><i /><i /><i /><b>{head}</b><span className="ch-live"><em />Live</span></div>
          {rows.map(([t, sub, st], i) => {
            const Ic = icons[i % icons.length]
            return (
              <div key={t} className="ch-ticket ch-cov" style={{ ['--d' as string]: `${i * 0.9}s` }}>
                <span className="ch-tk-ic"><Ic size={15} /></span>
                <span className="ch-tk-tx"><b>{t}</b><em>{sub}</em></span>
                <span className="ch-ok"><CheckCheck size={11} /> {st}</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="ch-layer l2">
        <div className="ch-float col c1">
          <span className="ch-ringbox">
            <svg viewBox="0 0 44 44" className="ch-ring"><circle cx="22" cy="22" r="18" className="t" /><circle cx="22" cy="22" r="18" className="b" pathLength={1} /></svg>
            <Clock size={15} className="ch-ring-ic" />
          </span>
          <span><b>{stat[0]}</b><em>{stat[1]}</em></span>
        </div>
        <div className="ch-float col c2">
          <span className="ch-avs"><i>L1</i><i>L2</i><i>L3</i></span>
          <span><b>Engineers</b><em>L1 · L2 · L3</em></span>
        </div>
        <div className="ch-float col c3"><ShieldCheck size={18} /><span><b>{badge[0]}</b><em>{badge[1]}</em></span></div>
      </div>
    </Stage>
  )
}

export default function CategoryHeroArt({ slug }: { slug: string }) {
  switch (slug) {
    case 'it-infrastructure':
      return <Infra />
    case 'elv-security':
      return <Security />
    case 'business-applications':
      return <Apps />
    default:
      return <ServiceDesk />
  }
}
