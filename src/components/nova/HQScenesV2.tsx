import { useEffect, useState, type CSSProperties } from 'react'
import {
  Activity, BarChart3, Bug, Calendar, ChevronRight, Clock, Cloud, Cpu, Database, FileText, Folder, Headset,
  Image as ImageIcon, Laptop, Lock, Mail, MapPin, Monitor, Network, Phone, PhoneCall, Server, ShieldCheck, Smartphone,
  Thermometer, Users, Video, Wifi, X, Ban, BatteryCharging, Building2,
 Check, Globe,
} from 'lucide-react'
import { GlassCloud, Hint, useTicker } from './HQScenes'
import '../../styles/hq-scenes-v2.css'
import '../../styles/hq-firewall-min.css'

/* ------------------------------------------------------------------------------------------------
   Depth versions of four HQ stations (1100 x 380 stage). Same motion rule as the rest of the tour:
   anything that moves, moves along a line you can see (CSS offset-path on the same SVG path).
------------------------------------------------------------------------------------------------- */

/** a moving item that follows an SVG path drawn in stage coordinates */
const along = (d: string, dur: number, delay: number, extra?: CSSProperties): CSSProperties => ({
  offsetPath: `path('${d}')`,
  animationDuration: `${dur}s`,
  animationDelay: `${delay}s`,
  ...extra,
})

const Dot = ({ ok = true }: { ok?: boolean }) => <i className={`x-dot${ok ? '' : ' warn'}`} />

/* ================= Firewall (minimal) ================= */
/* One idea: attacks stop at the shield, clean traffic passes. Flat white nodes, three lanes, one status pill. */
const FW = {
  bad: 'M206 128 C 300 128 372 100 472 132',
  goodIn: 'M206 172 C 300 172 372 196 472 168',
  out: 'M628 150 C 712 150 742 128 806 128 S 868 150 894 150',
}

export function FirewallArt() {
  const blocked = useTicker(1348, 2250)
  const services: typeof Wifi[] = [Wifi, Mail, Cloud, Database, Calendar, Video, Network]
  return (
    <div className="hq-art m-fw">
      <svg className="x-svg" viewBox="0 0 1100 380" aria-hidden>
        <defs>
          <linearGradient id="mfwGood" x1="0" x2="1"><stop offset="0" stopColor="#9fc7ff" /><stop offset="1" stopColor="#2563ff" /></linearGradient>
        </defs>
        <path d={FW.goodIn} className="m-glow" />
        <path d={FW.out} className="m-glow" />
        <path d={FW.bad} className="m-lane bad" />
        <path d={FW.goodIn} className="m-lane" stroke="url(#mfwGood)" />
        <path d={FW.out} className="m-lane" stroke="url(#mfwGood)" />
      </svg>

      {/* internet */}
      <div className="m-node m-left">
        <span className="m-halo" />
        <span className="m-circle accent">
          <span className="m-gloss" />
          <Globe size={18} className="m-globe-ic" />
          <b>{blocked.toLocaleString('en-US')}</b>
          <em>threats blocked</em>
        </span>
        <span className="m-floor" />
        <span className="m-tag"><b>Internet</b><em><Dot />Connected</em></span>
      </div>

      {/* traffic */}
      <span className="x-pk m-pk bad" style={along(FW.bad, 4.5, 0)}><Bug size={15} /></span>
      <span className="m-hit"><X size={12} strokeWidth={3} /></span>
      {[Mail, FileText].map((Ic, i) => (
        <span key={`g${i}`} className="x-pk m-pk" style={along(FW.goodIn, 4.2, 0.4 + i * 2.1)}><Ic size={15} /></span>
      ))}
      {[Database, Calendar].map((Ic, i) => (
        <span key={`o${i}`} className="x-pk m-pk out" style={along(FW.out, 4.4, 1 + i * 2.2)}><Ic size={15} /></span>
      ))}

      {/* firewall */}
      <div className="m-node m-mid hq-hot">
        <span className="m-tag top"><b>Firewall</b><em><Dot />Active · monitored</em></span>
        <span className="m-orbit" />
        <span className="m-ripple" />
        <span className="m-circle shield">
          <svg viewBox="0 0 64 72" className="m-shield" aria-hidden>
            <defs><linearGradient id="mfwSh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#38bdf8" /><stop offset="0.55" stopColor="#2563ff" /><stop offset="1" stopColor="#3b1ee0" /></linearGradient></defs>
            <path d="M32 3 L58 13 V34 C58 52 46 63 32 69 C18 63 6 52 6 34 V13 Z" fill="url(#mfwSh)" />
            <path d="M20 36 L29 45 L45 27" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="m-floor wide" />
      </div>

      {/* office */}
      <div className="m-node m-right">
        <span className="m-halo soft" />
        <span className="m-circle office"><span className="m-office-ic"><Building2 size={34} strokeWidth={1.7} /></span><span className="m-ok"><Check size={12} strokeWidth={3.5} /></span></span>
        <span className="m-floor" />
        <span className="m-tag"><b>Your office</b><em><Dot />All systems safe</em></span>
      </div>

      <div className="m-pill">
        <span className="m-pill-ic">{services.map((Ic, i) => <i key={i} style={{ animationDelay: `${i * 0.35}s` }}><Ic size={15} /></i>)}</span>
        <i className="m-pill-sep" />
        <span><Dot />7 of 7 services protected</span>
      </div>
      <Hint>Hover the firewall</Hint>
    </div>
  )
}

/* ================= Servers ================= */
export function ServersArt() {
  const rows: [typeof Cpu, string, number, string, string][] = [
    [Cpu, 'CPU usage', 42, '42%', 'b1'],
    [Database, 'Memory', 61, '61%', 'b2'],
    [Thermometer, 'Temperature', 38, '38°C', 'b3'],
  ]
  return (
    <div className="hq-art x-srv">
      <div className="x-health">
        <div className="x-health-h">
          <span className="x-health-ic"><Activity size={18} /></span>
          <span><b>System health</b><em>All systems normal</em></span>
          <span className="x-pill ok"><Dot />Healthy</span>
        </div>
        {rows.map(([Ic, lb, , v, cls]) => (
          <div key={lb} className="x-health-r">
            <span className="x-ri"><Ic size={15} /></span>
            <em>{lb}</em>
            <span className="x-track"><i className={cls} /></span>
            <b>{v}</b>
          </div>
        ))}
        <div className="x-health-up">
          <span className="x-ri"><Clock size={15} /></span>
          <span><b>Server uptime</b><em>Last 30 days</em></span>
          <strong>99.99%</strong>
        </div>
      </div>

      <span className="x-slab" />
      <div className="x-units">
        <div className="x-unit hq-hot u-tw">
          <span className="x-tag"><b>Tower server</b><em><Dot />Online</em></span>
          <span className="x-tower"><span className="side" /><span className="front"><span className="grill" /><span className="strip" /></span></span>
        </div>
        <div className="x-unit hq-hot u-rk">
          <span className="x-tag"><b>Rack servers</b><em><Dot />Online · 12/12 active</em></span>
          <span className="x-rack">
            <span className="side" />
            <span className="front">
              {Array.from({ length: 8 }, (_, i) => (
                <span key={i} className={`x-blade${i === 3 || i === 5 ? ' sw' : ''}`}>
                  <span className="x-blade-grill" />
                  <span className="x-blade-leds">{Array.from({ length: i === 3 || i === 5 ? 8 : 3 }, (_, k) => <i key={k} style={{ animationDelay: `${(k * 0.31 + i * 0.17) % 2}s` }} />)}</span>
                </span>
              ))}
            </span>
          </span>
        </div>
        <div className="x-unit hq-hot u-st">
          <span className="x-tag"><b>Storage</b><em><Dot />RAID 6 · healthy</em></span>
          <span className="x-nas">{Array.from({ length: 6 }, (_, i) => <i key={i} style={{ animationDelay: `${i * 0.25}s` }} />)}</span>
        </div>
        <div className="x-unit hq-hot u-up">
          <span className="x-tag"><b>UPS</b><em><Dot />Protected</em></span>
          <span className="x-ups"><span className="scr"><b>100%</b><span className="bat"><i /></span></span><span className="vent" /></span>
        </div>
      </div>
      <div className="x-bar sm">
        {([[Server, 'Tower'], [Database, 'Rack servers'], [Database, 'Storage'], [BatteryCharging, 'UPS']] as [typeof Server, string][]).map(([Ic, t]) => (
          <span key={t} className="x-bar-it"><Ic size={18} /><span><b>{t}</b><em><Dot />Online</em></span></span>
        ))}
      </div>
      <Hint>Hover a server</Hint>
    </div>
  )
}

/* ================= Backup ================= */
const BK = {
  w: ['M262 138 C 320 138 330 170 400 170 L 452 170', 'M262 206 C 330 206 340 170 400 170 L 452 170', 'M262 274 C 320 274 330 170 400 170 L 452 170'],
  out: 'M648 170 L 722 170',
  cloudA: 'M762 170 C 790 170 792 138 826 138',
  cloudB: 'M762 170 C 790 170 792 200 826 200',
}
const TIMES = ['02:00', '06:00', '10:00', '14:00', '18:00']

export function BackupArt() {
  const [pct, setPct] = useState(12)
  const [slot, setSlot] = useState(2)
  const [files, setFiles] = useState(1245)
  useEffect(() => {
    const id = window.setInterval(() => {
      setPct((p) => {
        if (p >= 100) {
          setSlot((s) => (s + 1) % TIMES.length)
          return 0
        }
        setFiles((f) => f + 1)
        return Math.min(100, p + 2)
      })
    }, 120)
    return () => window.clearInterval(id)
  }, [])
  const C = 2 * Math.PI * 96
  const fileIcons = [FileText, ImageIcon, Folder]
  return (
    <div className="hq-art x-bk">

      <div className="x-office">
        <div className="x-office-h"><Dot /><span><b>Your office</b><em>3 devices connected</em></span></div>
        {[[Monitor, 'Workstation 01'], [Laptop, 'Workstation 02'], [Monitor, 'Workstation 03']].map(([Ic, t]) => {
          const I = Ic as typeof Monitor
          return (
            <div key={t as string} className="x-ws"><I size={20} /><span><b>{t as string}</b><em><Dot />Online</em></span></div>
          )
        })}
      </div>

      <svg className="x-svg" viewBox="0 0 1100 380" aria-hidden>
        {BK.w.map((d) => <path key={d} d={d} className="x-lane" />)}
        <path d={BK.out} className="x-lane" />
        <path d={BK.cloudA} className="x-lane" />
        <path d={BK.cloudB} className="x-lane" />
      </svg>
      {BK.w.map((d, i) => (
        <span key={`f${i}`} className="x-pk sm" style={along(d, 3.4, i * 1.1)}>{(() => { const I = fileIcons[i]; return <I size={14} /> })()}</span>
      ))}
      <span className="x-pk tiny" style={along(BK.out + ' ' + BK.cloudA.replace('M762 170', 'L762 170'), 2.6, 0.4)} />
      <span className="x-pk tiny" style={along(BK.out + ' ' + BK.cloudB.replace('M762 170', 'L762 170'), 2.6, 1.7)} />

      {/* the vault: the ring is the sync progress */}
      <div className="x-vault hq-hot">
        <span className="x-vault-halo" />
        <svg viewBox="0 0 220 220" className="x-vault-ring" aria-hidden>
          <defs><linearGradient id="xbkG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#38bdf8" /><stop offset="1" stopColor="#3b1ee0" /></linearGradient></defs>
          <circle cx="110" cy="110" r="96" className="trk" />
          <circle cx="110" cy="110" r="96" className="bar" stroke="url(#xbkG)" strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)} />
        </svg>
        <span className="x-vault-disc"><Server size={42} strokeWidth={1.6} /></span>
      </div>
      <div className="x-sync">
        <div className="x-sync-h"><Dot /><b>{pct >= 100 ? 'Backup complete' : 'Syncing data'}</b><em>{TIMES[slot]} AM</em></div>
        <div className="x-sync-b"><span className="x-track"><i style={{ width: `${pct}%` }} /></span><b>{pct}%</b></div>
      </div>
      <span className="x-lock"><Lock size={18} /></span>

      <div className="x-bk-cloud">
        <GlassCloud w={250} variant="plain" icon={Cloud}>
          <span className="x-cloud-badge"><ShieldCheck size={22} /></span>
          <b>Offsite copy</b>
          <em>Encrypted · UAE region</em>
        </GlassCloud>
      </div>
      <div className="x-bk-stats">
        <span><FileText size={16} /><b>{files.toLocaleString('en-US')}</b><em>Files synced</em></span>
        <span><ShieldCheck size={16} /><b>AES-256</b><em>Encrypted</em></span>
        <span><MapPin size={16} /><b>UAE</b><em>Region</em></span>
      </div>
      <Hint>Hover the vault</Hint>
    </div>
  )
}

/* ================= Telephony ================= */
const AGENTS: [typeof Phone, string][] = [[Phone, 'Reception'], [Users, 'Sales team'], [Headset, 'Support desk'], [Smartphone, 'On the move']]
const AG_Y = [48, 132, 216, 300]
const AG_ICON = [Users, BarChart3, Headset, Smartphone]

export function PhoneArt() {
  const [at, setAt] = useState(2)
  const [secs, setSecs] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => { setAt((a) => (a + 1) % AGENTS.length); setSecs(0) }, 3600)
    const t = window.setInterval(() => setSecs((s) => s + 1), 1000)
    return () => { window.clearInterval(id); window.clearInterval(t) }
  }, [])
  const inPath = 'M282 170 C 350 170 380 112 432 112'
  const outPath = (i: number) => `M668 140 C 730 140 732 ${AG_Y[i]} 790 ${AG_Y[i]}`
  return (
    <div className="hq-art x-tel">
      <svg className="x-svg" viewBox="0 0 1100 380" aria-hidden>
        <path d={inPath} className="x-lane" />
        {AGENTS.map((_, i) => <path key={i} d={outPath(i)} className={`x-lane${i === at ? ' lit' : ' dim'}`} />)}
        {AGENTS.map((_, i) => <circle key={`e${i}`} cx={790} cy={AG_Y[i]} r={4} className={`x-end${i === at ? ' lit' : ''}`} />)}
      </svg>
      <span className="x-pk tiny" style={along(inPath, 1.6, 0)} />
      <span key={`run${at}`} className="x-pk tiny once" style={along(outPath(at), 1.1, 0.2)} />

      <div className="x-caller">
        <span className="x-ring-ph"><i /><i /><span><PhoneCall size={28} /></span></span>
        <span className="x-caller-tx">
          <em><Dot />Incoming call</em>
          <b>+971 4 •••• 210</b>
          <small><MapPin size={12} /> Dubai, UAE</small>
          <span className="x-eq">{Array.from({ length: 16 }, (_, i) => <i key={i} style={{ animationDelay: `${(i * 0.11) % 0.9}s` }} />)}<u>00:{String(secs + 6).padStart(2, '0')}</u></span>
        </span>
      </div>

      <div className="x-pbx hq-hot">
        <div className="x-pbx-card">
          <Cloud size={26} />
          <b>Cloud PBX</b>
          <em>Auto-attendant</em>
          <span className="x-pbx-wave">{Array.from({ length: 22 }, (_, i) => <i key={i} style={{ animationDelay: `${(i * 0.07) % 0.8}s` }} />)}</span>
        </div>
        <div className="x-menu">
          {AGENTS.map(([, lb], i) => {
            const I = AG_ICON[i]
            return <span key={lb} className={`x-opt${i === at ? ' on' : ''}`}><kbd>{i}</kbd>{lb}<I size={16} /></span>
          })}
        </div>
      </div>

      {AGENTS.map(([Ic, lb], i) => (
        <div key={lb} className={`x-agent${i === at ? ' on' : ''}`} style={{ top: AG_Y[i] - 34 }}>
          <span className="x-agent-ic"><Ic size={22} /></span>
          <span className="x-agent-tx"><b>{lb}</b><em><Dot />{i === at ? `Connected · 00:${String(secs).padStart(2, '0')}` : 'Available'}</em></span>
          <ChevronRight size={18} className="x-chev" />
        </div>
      ))}
      <Hint>Hover the PBX</Hint>
    </div>
  )
}
