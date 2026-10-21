import { useEffect, useId, useState, type ReactNode } from 'react'
import {
  BarChart3, Briefcase, Bug, Building2, Calendar, Cctv, Check, Cloud, Cpu, Database, FileText, Globe, HardDrive,
  Headset, LayoutDashboard, Lock, Mail, Monitor, MousePointer2, Package, Phone, PhoneCall, PhoneIncoming,
  RotateCcw, Server, Shield, ShieldCheck, Smartphone, Tablet, Users, Video, Wallet, Laptop, BatteryCharging,
  Thermometer, Activity, Bell, Search,
} from 'lucide-react'

/* ------------------------------------------------------------------------------------------------
   The scenes for each station of the HQ tour. Every scene is drawn on a 1100 x 380 stage that the
   tour scales to fit, standing on a stone platform at the bottom edge.
------------------------------------------------------------------------------------------------- */

/* ---------- shared pieces ---------- */
const Stone = ({ w = 900 }: { w?: number }) => <span className="hq-stone" style={{ width: w }} />
const Leds = ({ n, cls = '' }: { n: number; cls?: string }) => (
  <span className={`hq-leds ${cls}`}>{Array.from({ length: n }, (_, i) => <i key={i} style={{ animationDelay: `${(i * 0.37) % 2.2}s` }} />)}</span>
)
export const Hint = ({ children }: { children: ReactNode }) => <span className="hq-hint"><MousePointer2 size={13} />{children}</span>

/** A circular node that sends waves out, the same mark used for the services in the lobby. */
export function Beacon({ icon: Ic, label, tone = 'blue', size = 76 }: { icon: typeof Server; label?: string; tone?: 'blue' | 'red' | 'green'; size?: number }) {
  return (
    <span className={`hq-beacon t-${tone}`} style={{ ['--bs' as string]: `${size}px` }}>
      <span className="hq-node-disc">
        <span className="hq-wave" />
        <span className="hq-wave w2" />
        <span className="hq-wave w3" />
        <span className="hq-node-in"><Ic size={Math.round(size * 0.34)} strokeWidth={1.7} /></span>
      </span>
      {label ? <span className="hq-node-lb">{label}</span> : null}
    </span>
  )
}

/** A frosted-glass cloud. Something colourful sits behind the glass and shows through it:
 *  `orb` is a gradient sphere peeking over the top edge, `rain` adds data drops falling out of the bottom. */
const CLOUD_PATH = 'M66 150C30 150 8 126 8 97C8 69 30 48 58 47C66 20 93 4 124 4C162 4 191 29 196 62C228 62 252 85 252 114C252 136 236 150 210 150Z'
export function GlassCloud({ w = 260, variant = 'orb', icon: Ic, children }: { w?: number; variant?: 'orb' | 'rain' | 'plain'; icon: typeof Server; children?: ReactNode }) {
  const k = w / 260
  const d = CLOUD_PATH.replace(/-?\d+(\.\d+)?/g, (n) => (parseFloat(n) * k).toFixed(1))
  const h = 156 * k
  const back = (
    <>
      {variant !== 'plain' ? <span className="hq-glc-orb"><Ic size={Math.round(22 * k)} strokeWidth={2} /></span> : null}
      {variant === 'rain' ? (
        <span className="hq-glc-rain">{Array.from({ length: 6 }, (_, i) => <i key={i} style={{ animationDelay: `${(i * 0.37) % 1.6}s`, height: `${[44, 58, 38, 62, 48, 54][i]}px` }} />)}</span>
      ) : null}
    </>
  )
  return (
    <span className={`hq-glc v-${variant}`} style={{ width: w, height: h }}>
      <span className="hq-glc-shadow" />
      <span className="hq-glc-back">{back}</span>
      {/* the glass: a blurred copy of what is behind it, clipped to the cloud, under a frosted white wash
          (a real backdrop-filter does not survive the 3D ring, so the blur is baked in) */}
      <span className="hq-glc-glass" style={{ clipPath: `path('${d}')` }}>
        <span className="hq-glc-ghost" aria-hidden>{back}</span>
      </span>
      <svg className="hq-glc-edge" viewBox={`0 0 ${w} ${h}`} aria-hidden><path d={d} /></svg>
      <span className="hq-glc-in">{children}</span>
    </span>
  )
}

/* ================= HQ lobby ================= */
const LOBBY_SERVICES = [
  { lb: 'Firewall', icon: Shield, to: 1 },
  { lb: 'Server & Backup', icon: Server, to: 2 },
  { lb: 'Cloud', icon: Cloud, to: 4 },
  { lb: 'CCTV', icon: Cctv, to: 5 },
  { lb: 'Telephony', icon: PhoneCall, to: 6 },
  { lb: 'ERP', icon: LayoutDashboard, to: 7 },
  { lb: 'CRM', icon: Briefcase, to: 7 },
]

export function Lobby({ go }: { go: (i: number) => void }) {
  const n = LOBBY_SERVICES.length
  return (
    <div className="hq-art hq-lobby">
      <svg className="hq-arc-line" viewBox="0 0 1100 380" preserveAspectRatio="none" aria-hidden>
        <path d="M70 120 Q550 330 1030 120" />
      </svg>
      <div className="hq-arc">
        {LOBBY_SERVICES.map((s, i) => {
          const t = i / (n - 1) - 0.5
          return (
            <button key={s.lb} type="button" className="hq-node" style={{ ['--t' as string]: t, ['--i' as string]: i, ['--dl' as string]: `${i * 0.45}s` }} onClick={() => go(s.to)}>
              <span className="hq-node-disc">
                <span className="hq-wave" />
                <span className="hq-wave w2" />
                <span className="hq-wave w3" />
                <span className="hq-node-in"><s.icon size={28} strokeWidth={1.7} /></span>
              </span>
              <span className="hq-node-lb">{s.lb}</span>
            </button>
          )
        })}
      </div>
      <Hint>Pick a service</Hint>
    </div>
  )
}

/* ================= Firewall ================= */
export function useTicker(start: number, every: number, step = 1) {
  const [n, setN] = useState(start)
  useEffect(() => {
    const id = window.setInterval(() => setN((v) => v + step), every)
    return () => window.clearInterval(id)
  }, [every, step])
  return n
}

export function FirewallArt() {
  const good = [Mail, FileText, Video, Calendar, Database]
  const blocked = useTicker(1284, 2250)
  return (
    <div className="hq-art hq-fw">
      <span className="hq-fw-end l"><Beacon icon={Globe} label="Internet" tone="red" /></span>
      <div className="hq-lane l-in">
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const bad = i % 3 === 1
          const Ic = bad ? Bug : good[i % good.length]
          return <span key={i} className={`hq-pkt ${bad ? 'bad' : ''}`} style={{ animationDelay: `${i * 0.75}s` }}><Ic size={16} /></span>
        })}
      </div>
      <div className="hq-fw-wall hq-hot">
        <span className="hq-fw-shield"><ShieldCheck size={50} strokeWidth={1.6} /></span>
        <span className="hq-fw-box">
          <Leds n={8} />
          <span className="hq-ports">{Array.from({ length: 8 }, (_, i) => <i key={i} />)}</span>
        </span>
      </div>
      <div className="hq-lane l-out">
        {[0, 1, 2, 3].map((i) => {
          const Ic = good[(i + 2) % good.length]
          return <span key={i} className="hq-pkt ok" style={{ animationDelay: `${0.4 + i * 1.1}s` }}><Ic size={16} /></span>
        })}
      </div>
      <span className="hq-fw-end r"><Beacon icon={Building2} label="Your office" tone="green" /></span>
      <span className="hq-blocked"><Lock size={13} /> Threat blocked</span>
      <span className="hq-stat s-fw">
        <span className="hq-stat-ic"><ShieldCheck size={18} /></span>
        <span><b>{blocked.toLocaleString('en-US')}</b><em>threats blocked today</em></span>
      </span>
      <Stone w={960} />
      <Hint>Hover the firewall</Hint>
    </div>
  )
}

/* ================= Servers ================= */
export function ServersArt() {
  return (
    <div className="hq-art hq-srv">
      <div className="hq-health">
        <span className="hq-health-h"><Activity size={15} /> Live health <i /></span>
        {[
          { ic: Cpu, lb: 'CPU', v: 42, cls: 'b1' },
          { ic: Database, lb: 'Memory', v: 61, cls: 'b2' },
          { ic: Thermometer, lb: 'Temp', v: 38, cls: 'b3', unit: '°C' },
        ].map((r) => (
          <span key={r.lb} className="hq-health-r">
            <r.ic size={13} /><em>{r.lb}</em>
            <span className="hq-bar"><i className={r.cls} /></span>
            <b>{r.v}{r.unit ?? '%'}</b>
          </span>
        ))}
        <span className="hq-health-up">Uptime <b>99.99%</b></span>
      </div>
      <div className="hq-srv-row">
        <div className="hq-unit hq-hot u-tower">
          <span className="hq-unit-lb">Tower</span>
          <span className="hq-tower-pc">
            <span className="hq-bays">{[0, 1, 2, 3].map((i) => <i key={i} />)}</span>
            <Leds n={2} cls="col" />
            <span className="hq-vent" />
          </span>
        </div>
        <div className="hq-unit hq-hot u-rack">
          <span className="hq-unit-lb">Rack servers</span>
          <span className="hq-rack">
            <span className="hq-rack-top" />
            {['2u', '1u', '1u', '2u', 'sw', '1u', '2u'].map((t, i) => (
              <span key={i} className={`hq-blade b-${t}`}>
                <Leds n={t === 'sw' ? 10 : 3} />
                {t === '2u' ? <span className="hq-drv">{[0, 1, 2, 3, 4, 5].map((k) => <i key={k} />)}</span> : null}
              </span>
            ))}
            <span className="hq-rack-glass" />
          </span>
        </div>
        <div className="hq-unit hq-hot u-nas">
          <span className="hq-unit-lb">Storage</span>
          <span className="hq-nas">
            <span className="hq-nas-bays">{Array.from({ length: 8 }, (_, i) => <i key={i} style={{ animationDelay: `${i * 0.21}s` }} />)}</span>
            <span className="hq-nas-scr">RAID 6 · OK</span>
          </span>
        </div>
        <div className="hq-unit hq-hot u-ups">
          <span className="hq-unit-lb">UPS</span>
          <span className="hq-ups">
            <span className="hq-ups-scr"><BatteryCharging size={14} /><span className="hq-ups-bar"><i /></span></span>
            <span className="hq-vent" />
          </span>
        </div>
      </div>
      <Stone w={980} />
      <Hint>Hover a server</Hint>
    </div>
  )
}

/* ================= Backup ================= */
export function BackupArt() {
  const times = ['02:00', '06:00', '10:00', '14:00', '18:00']
  return (
    <div className="hq-art hq-bk">
      <div className="hq-bk-office">
        <span className="hq-mini-srv"><Leds n={3} /></span>
        <span className="hq-mini-srv"><Leds n={3} /></span>
        <span className="hq-bk-pcs"><Monitor size={18} /><Laptop size={18} /><Monitor size={18} /></span>
        <span className="hq-unit-lb">Your office</span>
      </div>
      <div className="hq-bk-flow f1">
        {[0, 1, 2, 3].map((i) => <span key={i} className="hq-file" style={{ animationDelay: `${i * 0.6}s` }}><FileText size={14} /></span>)}
      </div>
      <div className="hq-vault hq-hot">
        <svg className="hq-ring" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="52" className="trk" />
          <circle cx="60" cy="60" r="52" className="bar" pathLength={1} />
        </svg>
        <span className="hq-vault-door"><HardDrive size={34} strokeWidth={1.6} /></span>
        <span className="hq-sweep" />
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className="hq-snap" style={{ transform: `rotate(${i * 30}deg) translateY(-102px)`, animationDelay: `${i * 0.25}s` }} />
        ))}
      </div>
      <div className="hq-bk-flow f2">
        {[0, 1, 2].map((i) => <span key={i} className="hq-file c" style={{ animationDelay: `${0.3 + i * 0.8}s` }}><Lock size={13} /></span>)}
      </div>
      <div className="hq-bk-cloud">
        <GlassCloud w={280} variant="plain" icon={Lock}>
          <b>Offsite copy</b>
          <em>Encrypted · UAE region</em>
        </GlassCloud>
      </div>
      <div className="hq-versions">
        {times.map((t, i) => (
          <span key={t} className="hq-ver" style={{ animationDelay: `${i * 0.8}s` }}><i /> {t}</span>
        ))}
      </div>
      <span className="hq-restore"><RotateCcw size={13} /> Restore test passed</span>
      <Stone w={960} />
      <Hint>Hover the vault</Hint>
    </div>
  )
}

/* ================= Cloud ================= */
/* ---- Microsoft 365 -----------------------------------------------------------------------------
   One perspective plane, centred on the cloud's base:
   - a platform ring the cloud sits in (back half behind the cloud, front half in front of it)
   - the app orbit: an arc on the same plane; every app tile sits ON the arc, and the data dots
     travel only along that arc
   - a bracket from the platform down to the devices the apps reach                                */
const M = { cx: 550, cy: 178, orx: 430, ory: 150, prx: 214, pry: 36 }
const onArc = (deg: number) => {
  const t = (deg * Math.PI) / 180
  return { x: M.cx + M.orx * Math.cos(t), y: M.cy + M.ory * Math.sin(t) }
}
const M365_APPS = [
  { src: 'onedrive', lb: 'OneDrive', deg: 180 },
  { src: 'outlook', lb: 'Outlook', deg: 212 },
  { src: 'powerpoint', lb: 'PowerPoint', deg: 244 },
  { src: 'teams', lb: 'Teams', deg: 296 },
  { src: 'word', lb: 'Word', deg: 328 },
  { src: 'sharepoint', lb: 'SharePoint', deg: 360 },
]
const M365_DEVICES: { lb: string; ic?: typeof Monitor; img?: string }[] = [
  { lb: 'Office PC', ic: Monitor },
  { lb: 'Laptop', ic: Laptop },
  { lb: 'Phone', ic: Smartphone },
  { lb: 'Tablet', ic: Tablet },
  { lb: 'Remote staff', img: 'remote-staff' },
]

export function CloudArt() {
  const uid = useId().replace(/:/g, '')
  const { cx, cy, orx, ory, prx, pry } = M
  const orbit = `M${cx - orx} ${cy} A${orx} ${ory} 0 0 1 ${cx + orx} ${cy}`
  const orbit2 = `M${cx - 330} ${cy} A330 116 0 0 1 ${cx + 330} ${cy}`
  const ringBack = `M${cx - prx} ${cy} A${prx} ${pry} 0 0 1 ${cx + prx} ${cy}`
  const ringFront = `M${cx - prx} ${cy} A${prx} ${pry} 0 0 0 ${cx + prx} ${cy}`
  const barY = 246
  const devTop = 270
  const xs = M365_DEVICES.map((_, i) => cx + (i - 2) * 142)
  return (
    <div className="hq-art hq-cl m3">
      {/* behind the cloud */}
      <svg className="m3-svg" viewBox="0 0 1100 380" aria-hidden>
        <defs>
          <linearGradient id={`m3o${uid}`} x1="0" x2="1">
            <stop offset="0" stopColor="#2563ff" stopOpacity="0" />
            <stop offset="0.18" stopColor="#2563ff" stopOpacity="0.45" />
            <stop offset="0.5" stopColor="#12a5f5" stopOpacity="0.6" />
            <stop offset="0.82" stopColor="#3b1ee0" stopOpacity="0.45" />
            <stop offset="1" stopColor="#3b1ee0" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`m3r${uid}`} x1="0" x2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="0.5" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id={`m3g${uid}`}>
            <stop offset="0" stopColor="#3b74ff" stopOpacity="0.7" />
            <stop offset="0.6" stopColor="#4f8bff" stopOpacity="0.18" />
            <stop offset="1" stopColor="#4f8bff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path id={`m3p${uid}`} d={orbit} className="m3-orbit" stroke={`url(#m3o${uid})`} />
        <path d={orbit2} className="m3-orbit2" />
        {[0, 1, 2].map((i) => (
          <circle key={i} r={4} className="m3-dot">
            <animateMotion dur="7.5s" begin={`${-i * 2.5}s`} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
              <mpath href={`#m3p${uid}`} />
            </animateMotion>
          </circle>
        ))}
        <ellipse cx={cx} cy={cy + 2} rx={prx + 30} ry={pry + 16} fill={`url(#m3g${uid})`} />
        <path d={ringBack} className="m3-ring" stroke={`url(#m3r${uid})`} />
        {/* bracket to the devices */}
        <path className="m3-wire" d={`M${cx} ${cy + pry} V${barY}`} />
        {xs.map((x) => {
          const r = 12
          const d = x === cx ? `M${cx} ${barY} V${devTop}` : `M${cx} ${barY} H${x < cx ? x + r : x - r} Q${x} ${barY} ${x} ${barY + r} V${devTop}`
          return <path key={x} className="m3-wire" d={d} />
        })}
        {xs.map((x) => <circle key={`e${x}`} className="m3-end" cx={x} cy={devTop} r={3.4} />)}
      </svg>

      <div className="m3-cloud hq-hot">
        <GlassCloud w={262} variant="plain" icon={Cloud}>
          <img className="m3-logo" src="/assets/m365/m365.png" alt="" draggable={false} />
          <b>Microsoft 365</b>
        </GlassCloud>
      </div>

      {/* in front of the cloud: the near half of the platform ring, with a light sweeping along it */}
      <svg className="m3-svg front" viewBox="0 0 1100 380" aria-hidden>
        <path d={ringFront} className="m3-ring" stroke={`url(#m3r${uid})`} />
        <path d={ringFront} className="m3-sweep" pathLength={1} />
      </svg>

      {M365_APPS.map((a) => {
        const p = onArc(a.deg)
        return (
          <span key={a.src} className="m3-app" style={{ left: p.x, top: p.y }} tabIndex={0}>
            <span className="m3-tile"><img src={`/assets/m365/${a.src}.png`} alt="" draggable={false} /></span>
            <em>{a.lb}</em>
          </span>
        )
      })}

      {M365_DEVICES.map((d, i) => (
        <span key={d.lb} className="m3-dev" style={{ left: xs[i], top: devTop + 6 }}>
          {d.img ? <img src={`/assets/m365/${d.img}.png`} alt="" draggable={false} /> : d.ic ? <d.ic size={28} strokeWidth={1.7} /> : null}
          <b>{d.lb}</b>
        </span>
      ))}
      <Hint>Hover an app</Hint>
    </div>
  )
}

/* ================= CCTV ================= */
export function Feed({ kind, name }: { kind: 'park' | 'hall' | 'door' | 'ware' | 'desk' | 'gate'; name: string }) {
  const [t, setT] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setT(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])
  return (
    <span className={`hq-feed f-${kind}`} tabIndex={0}>
      <span className="hq-scene">
        {kind === 'park' && (<><i className="lot" /><i className="car c1" /><i className="car c2" /><i className="car c3 mv" /><i className="box b-car"><u>Car 96%</u></i></>)}
        {kind === 'hall' && (<><i className="persp" /><i className="man mv" /><i className="box b-man"><u>Person 98%</u></i></>)}
        {kind === 'door' && (<><i className="doorway" /><i className="man m2" /><i className="box b-m2"><u>Staff · ID ok</u></i></>)}
        {kind === 'ware' && (<><i className="shelf s1" /><i className="shelf s2" /><i className="fork" /></>)}
        {kind === 'desk' && (<><i className="counter" /><i className="man m3" /><i className="man m4" /></>)}
        {kind === 'gate' && (<><i className="road" /><i className="barrier" /><i className="car c4" /></>)}
      </span>
      <span className="hq-osd"><span className="rec" />{name}</span>
      <span className="hq-ts">{t.toLocaleTimeString('en-GB')}</span>
      <span className="hq-feed-tip">{name} · 4K · night vision · motion alerts</span>
    </span>
  )
}

/** A ceiling dome: mount plate, white housing, smoked glass with a lens that pans. */
export function DomeCam() {
  return (
    <span className="cam-dome">
      <span className="cd-plate" />
      <span className="cd-house" />
      <span className="cd-glass">
        <span className="cd-lens"><i /></span>
        <span className="cd-shine" />
      </span>
      <span className="cd-led" />
      <span className="cam-cone c-dome" />
    </span>
  )
}

/** A wall bullet: wall plate, arm, ball joint, housing with sun shield, IR ring and glass lens. */
export function BulletCam() {
  return (
    <span className="cam-bullet">
      <span className="cb-plate" />
      <span className="cb-arm" />
      <span className="cb-joint" />
      <span className="cb-head">
        <span className="cb-shield" />
        <span className="cb-body" />
        <span className="cb-front">
          <span className="cb-ir">{Array.from({ length: 8 }, (_, i) => <i key={i} style={{ transform: `rotate(${i * 45}deg) translateY(-15px)` }} />)}</span>
          <span className="cb-lens" />
        </span>
        <span className="cb-led" />
        <span className="cam-cone c-bullet" />
      </span>
    </span>
  )
}

export function CctvArt() {
  return (
    <div className="hq-art hq-tv">
      <span className="hq-cam-wrap w-dome hq-hot">
        <DomeCam />
        <span className="hq-cam-lb">360° dome · 4K</span>
      </span>
      <span className="hq-cam-wrap w-bullet hq-hot">
        <BulletCam />
        <span className="hq-cam-lb">Bullet · night vision</span>
      </span>
      <div className="hq-wall">
        <Feed kind="park" name="CAM 01 · Parking" />
        <Feed kind="hall" name="CAM 02 · Corridor" />
        <Feed kind="door" name="CAM 03 · Entrance" />
        <Feed kind="ware" name="CAM 04 · Warehouse" />
        <Feed kind="desk" name="CAM 05 · Reception" />
        <Feed kind="gate" name="CAM 06 · Gate" />
      </div>
      <span className="hq-alert"><Bell size={13} /> Motion detected · Entrance</span>
      <span className="hq-wall-neck" />
      <Stone w={900} />
      <Hint>Hover a camera or feed</Hint>
    </div>
  )
}

/* ================= Telephony ================= */
const AGENTS = [
  { ic: Phone, lb: 'Reception', key: '0' },
  { ic: Headset, lb: 'Sales team', key: '1' },
  { ic: PhoneCall, lb: 'Support desk', key: '2' },
  { ic: Smartphone, lb: 'On the move', key: '3' },
]

export function PhoneArt() {
  const [at, setAt] = useState(0)
  const [secs, setSecs] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => {
      setAt((a) => (a + 1) % AGENTS.length)
      setSecs(0)
    }, 3200)
    const t = window.setInterval(() => setSecs((s) => s + 1), 1000)
    return () => {
      window.clearInterval(id)
      window.clearInterval(t)
    }
  }, [])
  const rowY = (i: number) => 44 + i * 80
  return (
    <div className="hq-art hq-tel">
      <svg className="hq-tel-wires" viewBox="0 0 1100 380" aria-hidden>
        <path className="w" d="M300 123 C 380 123 380 123 452 123" />
        <path className="w-run on" key={`c${at}`} d="M300 123 C 380 123 380 123 452 123" pathLength={1} />
        {AGENTS.map((_, i) => {
          const d = `M648 123 C 740 123 740 ${rowY(i)} 812 ${rowY(i)}`
          return (
            <g key={i}>
              <path className={`w${i === at ? ' lit' : ''}`} d={d} />
              {i === at ? <path className="w-run on d2" key={`r${at}`} d={d} pathLength={1} /> : null}
            </g>
          )
        })}
      </svg>
      <div className="hq-caller">
        <Beacon icon={PhoneIncoming} tone="green" size={70} />
        <span className="hq-caller-card">
          <em>Incoming call</em>
          <b>+971 4 •••• 210</b>
          <span className="hq-eq">{Array.from({ length: 12 }, (_, i) => <i key={i} style={{ animationDelay: `${(i * 0.13) % 0.9}s` }} />)}</span>
        </span>
      </div>
      <div className="hq-pbx2 hq-hot">
        <span className="hq-pbx-box"><Leds n={6} /><span className="hq-ports">{Array.from({ length: 10 }, (_, i) => <i key={i} />)}</span></span>
        <span className="hq-ivr">
          <span className="hq-ivr-h">Cloud PBX · auto-attendant</span>
          {AGENTS.map((a, i) => (
            <span key={a.key} className={`hq-ivr-o${i === at ? ' on' : ''}`}><kbd>{a.key}</kbd>{a.lb}</span>
          ))}
        </span>
      </div>
      <div className="hq-agents">
        {AGENTS.map((a, i) => (
          <span key={a.lb} className={`hq-agent${i === at ? ' on' : ''}`} style={{ top: rowY(i) - 30 }}>
            <span className="hq-agent-ic"><a.ic size={20} /></span>
            <span className="hq-agent-tx">
              <b>{a.lb}</b>
              <em>{i === at ? `Connected · 00:${String(secs).padStart(2, '0')}` : 'Available'}</em>
            </span>
            <span className="hq-eq sm">{Array.from({ length: 6 }, (_, k) => <i key={k} style={{ animationDelay: `${(k * 0.15) % 0.9}s` }} />)}</span>
          </span>
        ))}
      </div>
      <Stone w={960} />
      <Hint>Hover the PBX</Hint>
    </div>
  )
}

/* ================= ERP & CRM ================= */
const SCREENS = [
  { id: 'finance', lb: 'Finance', ic: Wallet },
  { id: 'reports', lb: 'Reports', ic: BarChart3 },
  { id: 'crm', lb: 'CRM', ic: Briefcase },
  { id: 'inventory', lb: 'Inventory', ic: Package },
  { id: 'hr', lb: 'HR & payroll', ic: Users },
] as const

function Kpi({ lb, v, d, up = true }: { lb: string; v: string; d: string; up?: boolean }) {
  return (
    <span className="db-kpi">
      <em>{lb}</em>
      <b>{v}</b>
      <i className={up ? 'up' : 'dn'}>{up ? '▲' : '▼'} {d}</i>
    </span>
  )
}

function FinanceScreen() {
  return (
    <>
      <div className="db-kpis">
        <Kpi lb="Revenue" v="AED 2.48M" d="12.4%" />
        <Kpi lb="Expenses" v="AED 1.12M" d="3.1%" up={false} />
        <Kpi lb="Net profit" v="AED 1.36M" d="18.2%" />
      </div>
      <div className="db-row">
        <div className="db-card grow">
          <span className="db-card-h">Cash flow <i>Last 12 months</i></span>
          <svg className="db-area" viewBox="0 0 300 90" preserveAspectRatio="none">
            <defs>
              <linearGradient id="dbAreaF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2563ff" stopOpacity="0.35" /><stop offset="1" stopColor="#2563ff" stopOpacity="0" /></linearGradient>
            </defs>
            <path className="fill" d="M0 70 C30 60 45 66 70 52 C95 38 115 50 140 40 C165 30 185 36 210 24 C235 14 260 22 300 8 L300 90 L0 90Z" fill="url(#dbAreaF)" />
            <path className="ln" d="M0 70 C30 60 45 66 70 52 C95 38 115 50 140 40 C165 30 185 36 210 24 C235 14 260 22 300 8" pathLength={1} />
            <path className="ln2" d="M0 80 C40 76 70 78 100 70 C140 62 170 66 210 58 C240 52 270 56 300 46" pathLength={1} />
          </svg>
        </div>
        <div className="db-card list">
          <span className="db-card-h">Invoices</span>
          {[['INV-2041', 'Paid', 'AED 48k'], ['INV-2042', 'Due', 'AED 12k'], ['INV-2043', 'Paid', 'AED 31k']].map(([a, s, v]) => (
            <span key={a} className="db-li"><em>{a}</em><i className={s === 'Paid' ? 'ok' : 'warn'}>{s}</i><b>{v}</b></span>
          ))}
        </div>
      </div>
    </>
  )
}

function ReportsScreen() {
  const bars = [38, 52, 45, 64, 58, 72, 66, 80, 74, 88, 82, 94]
  return (
    <div className="db-row full">
      <div className="db-card grow">
        <span className="db-card-h">Monthly sales <i>2026</i></span>
        <span className="db-bars">{bars.map((h, i) => <i key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.04}s` }} />)}</span>
      </div>
      <div className="db-card donut-c">
        <span className="db-card-h">By department</span>
        <svg className="db-donut" viewBox="0 0 42 42">
          <circle cx="21" cy="21" r="15.9" className="trk" />
          <circle cx="21" cy="21" r="15.9" className="s1" pathLength={100} strokeDasharray="42 58" strokeDashoffset="25" />
          <circle cx="21" cy="21" r="15.9" className="s2" pathLength={100} strokeDasharray="28 72" strokeDashoffset="-17" />
          <circle cx="21" cy="21" r="15.9" className="s3" pathLength={100} strokeDasharray="30 70" strokeDashoffset="-45" />
        </svg>
        <span className="db-legend"><i className="l1" />Sales<i className="l2" />Ops<i className="l3" />Service</span>
      </div>
    </div>
  )
}

function CrmScreen() {
  const cols = [
    { h: 'Lead', n: 12, deals: [['Gulf Logistics', '45k'], ['Desert Foods', '18k']] },
    { h: 'Qualified', n: 8, deals: [['Marina Clinics', '72k'], ['Oasis Tech', '30k']] },
    { h: 'Proposal', n: 5, deals: [['Al Noor Trading', '120k']] },
    { h: 'Won', n: 9, deals: [['Emirates Retail', '96k']] },
  ]
  return (
    <div className="db-kanban">
      {cols.map((c, i) => (
        <span key={c.h} className={`db-col c${i}`}>
          <span className="db-col-h">{c.h}<i>{c.n}</i></span>
          {c.deals.map(([n, v], k) => (
            <span key={n} className="db-deal" style={{ animationDelay: `${i * 0.08 + k * 0.06}s` }}>
              <b>{n}</b><em>AED {v}</em><span className="db-av">{n.split(' ').map((w) => w[0]).join('').slice(0, 2)}</span>
            </span>
          ))}
        </span>
      ))}
    </div>
  )
}

function InventoryScreen() {
  const rows = [
    ['Laptops · ProBook', 'SKU-1042', 82, 'In stock'],
    ['Network switch 24p', 'SKU-2210', 34, 'In stock'],
    ['Toner cartridge', 'SKU-3087', 12, 'Low'],
    ['IP phone T54', 'SKU-4120', 6, 'Reorder'],
  ] as const
  return (
    <div className="db-card table">
      <span className="db-card-h">Stock levels <i>Main warehouse</i></span>
      <span className="db-th"><em>Item</em><em>SKU</em><em>Stock</em><em>Status</em></span>
      {rows.map(([n, s, q, st], i) => (
        <span key={s} className="db-tr" style={{ animationDelay: `${i * 0.06}s` }}>
          <b>{n}</b><em>{s}</em>
          <span className="db-q"><i style={{ width: `${q}%` }} className={q < 15 ? 'lo' : q < 40 ? 'mid' : ''} /></span>
          <i className={`db-st ${st === 'In stock' ? 'ok' : st === 'Low' ? 'warn' : 'bad'}`}>{st}</i>
        </span>
      ))}
    </div>
  )
}

function HrScreen() {
  const people = [['Sara A.', 'Finance', 'In office'], ['Omar K.', 'IT', 'Remote'], ['Lina M.', 'Sales', 'On leave'], ['Ravi P.', 'Ops', 'In office']]
  return (
    <>
      <div className="db-kpis">
        <Kpi lb="Headcount" v="248" d="6 new" />
        <Kpi lb="Attendance" v="96.4%" d="1.2%" />
        <Kpi lb="Payroll" v="AED 1.9M" d="On time" />
      </div>
      <div className="db-row">
        <div className="db-card list grow">
          <span className="db-card-h">Team today</span>
          {people.map(([n, d, s]) => (
            <span key={n} className="db-li p"><span className="db-av">{n.split(' ').map((w) => w[0]).join('')}</span><b>{n}</b><em>{d}</em><i className={s === 'In office' ? 'ok' : s === 'Remote' ? 'info' : 'warn'}>{s}</i></span>
          ))}
        </div>
        <div className="db-card">
          <span className="db-card-h">Leave this week</span>
          <span className="db-week">{['S', 'M', 'T', 'W', 'T'].map((d, i) => <span key={i}><i style={{ height: `${[30, 55, 40, 70, 45][i]}%` }} />{d}</span>)}</span>
        </div>
      </div>
    </>
  )
}

const SCREEN_VIEW: Record<(typeof SCREENS)[number]['id'], () => ReactNode> = {
  finance: FinanceScreen,
  reports: ReportsScreen,
  crm: CrmScreen,
  inventory: InventoryScreen,
  hr: HrScreen,
}

/** Where each module label sits, in stage units: three on the left of the screen, two on the right. */
const ERP_SPOTS = [[150, 70], [130, 175], [150, 280], [950, 95], [970, 230]] as const

/** The rotating dashboard monitor on its own (used by the Business Applications hero). */
export function DashboardMonitor({ cur }: { cur: number }) {
  const S = SCREENS[cur]
  const View = SCREEN_VIEW[S.id]
  return (
    <span className="hq-bezel">
      <span className="hq-cam-dot" />
      <span className="db">
        <span className="db-side">
          <span className="db-logo"><img src="/assets/logo-mark.png" alt="" /></span>
          {SCREENS.map((m, i) => <span key={m.id} className={`db-nav${i === cur ? ' on' : ''}`}><m.ic size={13} /></span>)}
        </span>
        <span className="db-main" key={S.id}>
          <span className="db-top">
            <b>{S.lb}</b>
            <span className="db-search"><Search size={10} /> Search</span>
            <span className="db-date">Oct 2026</span>
            <span className="db-av me">MB</span>
          </span>
          <span className="db-body"><View /></span>
        </span>
      </span>
      <span className="hq-glare" />
    </span>
  )
}
export { SCREENS as DASH_SCREENS }

export function ErpArt() {
  const [at, setAt] = useState(0)
  const [hold, setHold] = useState<number | null>(null)
  useEffect(() => {
    if (hold !== null) return
    const id = window.setInterval(() => setAt((a) => (a + 1) % SCREENS.length), 3400)
    return () => window.clearInterval(id)
  }, [hold])
  const cur = hold ?? at
  const S = SCREENS[cur]
  const View = SCREEN_VIEW[S.id]
  return (
    <div className="hq-art hq-erp">
      <svg className="hq-erp-links" viewBox="0 0 1100 380" aria-hidden>
        {ERP_SPOTS.map(([x, y], i) => (
          <path key={i} className={i === cur ? 'on' : ''} d={x < 550 ? `M${x + 62} ${y} L 250 ${y}` : `M${x - 62} ${y} L 850 ${y}`} />
        ))}
      </svg>
      <div className="hq-mods">
        {SCREENS.map((m, i) => (
          <button
            key={m.id}
            type="button"
            className={`hq-mod${i === cur ? ' on' : ''}`}
            style={{ left: ERP_SPOTS[i][0], top: ERP_SPOTS[i][1] }}
            onMouseEnter={() => setHold(i)}
            onMouseLeave={() => { setAt(i); setHold(null) }}
            onFocus={() => setHold(i)}
            onBlur={() => setHold(null)}
          >
            <m.ic size={16} />{m.lb}
          </button>
        ))}
      </div>
      <div className="hq-desk">
        <span className="hq-bezel">
          <span className="hq-cam-dot" />
          <span className="db">
            <span className="db-side">
              <span className="db-logo"><img src="/assets/logo-mark.png" alt="" /></span>
              {SCREENS.map((m, i) => <span key={m.id} className={`db-nav${i === cur ? ' on' : ''}`}><m.ic size={13} /></span>)}
            </span>
            <span className="db-main" key={S.id}>
              <span className="db-top">
                <b>{S.lb}</b>
                <span className="db-search"><Search size={10} /> Search</span>
                <span className="db-date">Oct 2026</span>
                <span className="db-av me">MB</span>
              </span>
              <span className="db-body"><View /></span>
            </span>
          </span>
          <span className="hq-glare" />
        </span>
        <span className="hq-neck" />
        <span className="hq-base" />
      </div>
      <Stone w={720} />
      <Hint>Hover a module</Hint>
    </div>
  )
}

