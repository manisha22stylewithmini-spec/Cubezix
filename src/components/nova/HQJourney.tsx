import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Building2, Cctv, Cloud, HardDrive, LayoutDashboard, PhoneCall, Server, Shield } from 'lucide-react'
import '../../styles/hq-journey.css'

/* ------------------------------------------------------------------------------------------------
   CubeZix HQ tour. The hero is a pinned frame; scrolling pans the camera sideways from the lobby
   through one room per service. A pipe with bends and loops runs under every room and a CubeZix
   puck rides along it, so the visitor reads the page as "walking through the building".
------------------------------------------------------------------------------------------------- */

type Room = { id: string; tag: string; ar: string; icon: typeof Server; eyebrow: string; title: string; accent: string; line: string; art: ReactNode }

import { BackupArt, CctvArt, CloudArt, ErpArt, FirewallArt, Lobby, PhoneArt, ServersArt } from './HQScenes'

const ROOM_META = [
  { id: 'lobby', tag: 'CubeZix HQ', ar: 'المقر الرئيسي', icon: Building2 },
  { id: 'firewall', tag: 'Firewall', ar: 'جدار الحماية', icon: Shield },
  { id: 'servers', tag: 'Servers', ar: 'الخوادم', icon: Server },
  { id: 'backup', tag: 'Backup', ar: 'النسخ الاحتياطي', icon: HardDrive },
  { id: 'cloud', tag: 'Cloud', ar: 'الحوسبة السحابية', icon: Cloud },
  { id: 'cctv', tag: 'CCTV', ar: 'المراقبة بالكاميرات', icon: Cctv },
  { id: 'telephony', tag: 'Telephony', ar: 'الاتصالات الهاتفية', icon: PhoneCall },
  { id: 'erp', tag: 'ERP & CRM', ar: 'أنظمة الأعمال', icon: LayoutDashboard },
]

/* ---------- metro ---------- */
const f = (n: number) => n.toFixed(1)

export default function HQJourney() {
  const sec = useRef<HTMLElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const train = useRef<HTMLSpanElement>(null)
  const ring = useRef<SVGSVGElement>(null)
  const clip = useRef<SVGRectElement>(null)
  const clipId = useId().replace(/:/g, '')
  const [, setStop] = useState({ at: 0, moving: false })
  const N = ROOM_META.length

  const go = (i: number) => {
    const el = sec.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const fr = frame.current
    const run = el.offsetHeight - (fr?.clientHeight ?? window.innerHeight)
    const hdr = fr ? parseFloat(getComputedStyle(fr).top) || 0 : 0
    window.scrollTo({ top: top - hdr + (i / (N - 1)) * run, behavior: 'smooth' })
  }

  const rooms: Room[] = [
    { ...ROOM_META[0], eyebrow: 'Your trusted IT partner in the UAE', title: 'Every IT service,', accent: 'under one roof.', line: 'Firewalls, servers, cloud, CCTV, telephony and ERP, designed, installed and supported by one Dubai team.', art: <Lobby go={go} /> },
    { ...ROOM_META[1], eyebrow: 'Network security', title: 'Threats stop', accent: 'at the door.', line: 'Next-generation firewalls that let your work in, keep attacks out and are watched around the clock.', art: <FirewallArt /> },
    { ...ROOM_META[2], eyebrow: 'Servers & infrastructure', title: 'Servers that', accent: 'never sleep.', line: 'Rack, tower, storage and power protection, sized for your business, installed and monitored 24/7.', art: <ServersArt /> },
    { ...ROOM_META[3], eyebrow: 'Backup & recovery', title: 'Nothing is', accent: 'ever lost.', line: 'Automatic backups in the office and an encrypted offsite copy, with restores tested every month.', art: <BackupArt /> },
    { ...ROOM_META[4], eyebrow: 'Cloud & Microsoft 365', title: 'Work from', accent: 'anywhere.', line: 'Email, files, Teams and cloud servers migrated, secured and managed for every user and device.', art: <CloudArt /> },
    { ...ROOM_META[5], eyebrow: 'CCTV & access control', title: 'Eyes on', accent: 'every corner.', line: 'SIRA-compliant cameras with smart motion alerts, live on any screen, day or night.', art: <CctvArt /> },
    { ...ROOM_META[6], eyebrow: 'Business telephony', title: 'Every call,', accent: 'answered.', line: 'Cloud PBX, IP phones and smart call routing that reach the right person the first time.', art: <PhoneArt /> },
    { ...ROOM_META[7], eyebrow: 'ERP & CRM', title: 'One system', accent: 'runs it all.', line: 'Finance, CRM, inventory and HR on one live dashboard, built around the way you work.', art: <ErpArt /> },
  ]

  useEffect(() => {
    const el = sec.current
    const fr = frame.current
    const tr = track.current
    const tn = train.current
    const sv = ring.current
    const cr = clip.current
    if (!el || !fr || !tr || !tn || !sv || !cr) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let vw = 0
    let px = 0.62
    let target = 0
    let cam = 0 // camera position, in rooms
    let car = 0 // train position, in rooms: it leads the camera a little, then the camera catches up at the platform
    let raf = 0
    let prev = 0
    let lastKey = ''
    const roomEls = Array.from(tr.querySelectorAll<HTMLElement>('.hq-room'))
    // the stations sit on one big ring, seen from a little above: R is its radius, A the angle between stations
    const P = 1600
    const A = (30 * Math.PI) / 180
    let R = 0
    let Y = 0
    let ox = 0
    let oy = 0
    const proj = (th: number) => {
      const X = R * Math.sin(th)
      const Z = R * (1 - Math.cos(th))
      const k = P / (P + Z)
      return { x: ox + X * k, y: oy + (Y - oy) * k, k }
    }

    const build = () => {
      const hdr = document.querySelector<HTMLElement>('.hdr')
      fr.style.setProperty('--hdr', `${hdr ? hdr.offsetHeight : 0}px`)
      vw = fr.clientWidth
      const vh = fr.clientHeight
      const mob = vw < 900
      px = 0.5
      fr.style.setProperty('--px', String(px))
      // the artwork starts just below the tallest headline block, so text and scene never overlap
      let top = 0
      tr.querySelectorAll<HTMLElement>('.hq-copy').forEach((c) => { top = Math.max(top, c.offsetTop + c.offsetHeight) })
      top += mob ? 18 : 26
      const yMax = vh - Math.max(56, vh * 0.085)
      const availW = mob ? vw * 1.32 : vw * 0.94
      const scale = Math.max(0.3, Math.min(1.2, availW / 1100, (yMax - 118 - top) / 380))
      // on phones the room is narrower than it is tall, so raise the track to sit just under the artwork
      Y = mob ? Math.min(yMax, (top + vh) / 2 + (380 * scale) / 2 + 60) : yMax
      R = vw * (mob ? 1.6 : 1.4)
      ox = px * vw
      oy = vh * 0.26
      fr.style.setProperty('--oy', `${oy}px`)
      // the ring's front edge, projected: it dips to the station in front and rises away on both sides
      const pts: string[] = []
      for (let a = -88; a <= 88; a += 2) {
        const q = proj((a * Math.PI) / 180)
        pts.push(`${f(q.x)} ${f(q.y)}`)
      }
      const d = `M${pts.join(' L')}`
      sv.setAttribute('viewBox', `0 0 ${vw} ${vh}`)
      sv.querySelectorAll('path').forEach((p) => p.setAttribute('d', d))
      fr.style.setProperty('--py', `${Y}px`)
      fr.style.setProperty('--px', String(px))
      fr.style.setProperty('--k', String(scale))
      tr.style.width = `${N * vw}px`
      update()
      cam = car = target
      apply()
    }

    // dwell: the train waits at each station for a moment before it pulls away
    const dwell = (u: number) => {
      const t = Math.max(0, Math.min(1, (u - 0.2) / 0.6))
      return t * t * t * (t * (t * 6 - 15) + 10)
    }

    const update = () => {
      const rect = el.getBoundingClientRect()
      const run = el.offsetHeight - fr.clientHeight
      // the frame pins under the header, so progress counts from the moment the section reaches it
      const hdr = parseFloat(getComputedStyle(fr).top) || 0
      const p = Math.max(0, Math.min(1, (hdr - rect.top) / (run || 1)))
      const s = p * (N - 1)
      const i = Math.min(N - 2, Math.floor(s))
      target = i + dwell(s - i)
      if (reduce) {
        cam = car = target
        apply()
      } else if (!raf) raf = requestAnimationFrame(tick)
    }

    const tick = (now: number) => {
      const dt = prev ? Math.min(250, now - prev) : 16
      prev = now
      car += (target - car) * (1 - Math.exp(-dt / 140))
      cam += (car - cam) * (1 - Math.exp(-dt / 170))
      if (Math.abs(target - car) < 0.0005 && Math.abs(car - cam) < 0.0005) {
        car = cam = target
        raf = 0
        prev = 0
      } else raf = requestAnimationFrame(tick)
      apply()
    }

    const apply = () => {
      if (!vw) return
      tr.style.transform = `translate3d(${f(-cam * vw)}px,0,0)`
      fr.style.setProperty('--bgx', `${f(-cam * vw * 0.25)}px`)
      fr.style.setProperty('--mp', String(car / (N - 1)))
      const q = proj((car - cam) * A)
      tn.style.transform = `translate3d(${f(q.x)}px,${f(q.y)}px,0) scale(${q.k.toFixed(3)})`
      cr.setAttribute('width', f(Math.max(0, q.x)))
      roomEls.forEach((r, k) => {
        const dd = k - cam
        const th = dd * A
        const far = Math.abs(dd) > 2.4
        r.style.visibility = far ? 'hidden' : ''
        if (!far) {
          // move each room from its flat slot onto the ring, turned to face outward
          const dx = R * Math.sin(th) - dd * vw
          const dz = -R * (1 - Math.cos(th))
          r.style.transform = `translate3d(${f(dx)}px,0,${f(dz)}px) rotateY(${f((th * 180) / Math.PI)}deg)`
        }
        r.style.setProperty('--d', f(Math.max(-1.5, Math.min(1.5, dd))))
        r.style.setProperty('--ad', f(Math.min(1.5, Math.abs(dd))))
        r.classList.toggle('on', Math.abs(dd) < 0.35)
        r.classList.toggle('seen', car > k - 0.05)
      })
      const moving = Math.abs(target - car) > 0.02 || Math.abs(car - Math.round(car)) > 0.03
      tn.classList.toggle('moving', moving)
      const at = moving ? Math.min(N - 1, Math.floor(car) + (target > car ? 1 : 0)) : Math.round(car)
      const key = `${at}${moving}`
      if (key !== lastKey) {
        lastKey = key
        setStop({ at, moving })
      }
    }

    build()
    const ro = new ResizeObserver(build)
    ro.observe(fr)
    document.fonts?.ready.then(build)
    const hdrEl = document.querySelector<HTMLElement>('.hdr')
    if (hdrEl) ro.observe(hdrEl)
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', update)
      cancelAnimationFrame(raf)
    }
  }, [N])

  return (
    <section ref={sec} className="hq" style={{ height: `${100 + (N - 1) * 95}vh` }} aria-label="CubeZix Line: a tour of our services">
      <div className="hq-frame" ref={frame}>
        <svg className="hq-ringline" ref={ring} aria-hidden>
          <defs>
            <clipPath id={`hq-clip-${clipId}`}><rect ref={clip} x="0" y="0" width="0" height="4000" /></clipPath>
            <linearGradient id={`hq-grad-${clipId}`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#12a5f5" /><stop offset="0.6" stopColor="#2563ff" /><stop offset="1" stopColor="#3b1ee0" />
            </linearGradient>
          </defs>
          <path className="base" />
          <path className="prog" clipPath={`url(#hq-clip-${clipId})`} stroke={`url(#hq-grad-${clipId})`} />
        </svg>
        <span className="hq-puck" ref={train} aria-hidden><span className="hq-puck-ring" /><span className="hq-puck-in"><img src="/assets/logo-mark.png" alt="" /></span></span>
        <div className="hq-track" ref={track}>
          {rooms.map((r, i) => (
            <article key={r.id} className={`hq-room r-${r.id}`} style={{ left: `${(i * 100) / N}%`, width: `${100 / N}%` }}>
              <div className="hq-copy">
                <span className="hq-eyebrow">
                  <span className="hq-eyebrow-no">{i === 0 ? 'HQ' : String(i).padStart(2, '0')}</span>
                  <span className="hq-eyebrow-tx">{r.eyebrow}</span>
                  <span className="hq-eyebrow-ar" lang="ar" dir="rtl">{r.ar}</span>
                  <r.icon size={15} className="hq-eyebrow-ic" />
                </span>
                {(() => {
                  const H = i === 0 ? 'h1' : 'h2'
                  return (
                    <H className="hq-title">
                      <span className="hq-title-main">{r.title}</span>
                      <span className="hq-title-accent"><span className="hq-hl" aria-hidden /><span className="hq-grad">{r.accent}</span></span>
                    </H>
                  )
                })()}
                <p>{r.line}</p>
              </div>
              <div className="hq-ill"><div className="hq-ill-in">{r.art}</div></div>
              {i === N - 1 ? (
                <div className="hq-dock">
                  <Link to="/contact" className="btn-cubezix">Book free demo</Link>
                  <Link to="/services" className="btn-cubezix-secondary">Explore services <ArrowRight size={16} /></Link>
                </div>
              ) : null}
              <span className="hq-col" aria-hidden><span>{i === 0 ? 'HQ' : String(i).padStart(2, '0')}</span></span>
              <span className="hq-cap" aria-hidden />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
