import { useEffect, useRef, useState, type ReactNode } from 'react'
import Eyebrow from './Eyebrow'
import FollowFace from './FollowFace'
import {
  Bell, CalendarDays, ChevronDown, ChevronRight, CircleDot, ClipboardList, Cloud, FileText, Home, LayoutGrid,
  Lock, Mail, MessageSquare, Moon, Search, Server, Shield, ShieldCheck, User, Wrench,
} from 'lucide-react'

/** Design canvas taken 1:1 from the reference frames (1440 x 1162), scaled to the section width. */
const CW = 1440
const CH = 1162

type Theme = 'light' | 'dark'

const CARDS: { title: string; emoji: string; body: string }[] = [
  { title: 'IT AMC Support', emoji: '🛡️', body: 'Annual contracts that keep every system maintained, patched and covered.' },
  { title: 'Helpdesk & Remote Fixes', emoji: '☕', body: 'Raise a ticket by email, chat or phone and get help within minutes.' },
  { title: 'Network & Wi-Fi', emoji: '📶', body: 'Cabling, switches and wireless coverage that simply works.' },
  { title: 'Cloud & Microsoft 365', emoji: '☁️', body: 'Mailboxes, Teams and cloud apps set up and managed for you.' },
  { title: 'Devices & Hardware', emoji: '💻', body: 'Laptops, printers and phones supplied, set up and supported.' },
  { title: 'Backup & Recovery', emoji: '⏱️', body: 'Nightly backups, tested restores and a plan for every outage.' },
]

function NavItem({ icon, label, arrow, cls = '' }: { icon: ReactNode; label: string; arrow?: boolean; cls?: string }) {
  return (
    <div className={`mdx-nav ${cls}`}>
      <span className="mdx-ic">{icon}</span>
      <span className="mdx-nl">{label}</span>
      {arrow && <ChevronRight size={18} className="mdx-chev" />}
    </div>
  )
}

function Section({ label }: { label: string }) {
  return <div className="mdx-sec"><span>{label}</span><i /></div>
}

/** Flat plant illustrations redrawn as vectors so the banner copy stays live text. */
function Plants({ theme }: { theme: Theme }) {
  const a = theme === 'light' ? '#a9c7fb' : '#5a3fc4'
  const b = theme === 'light' ? '#7f97ee' : '#3c2a8f'
  const pot = theme === 'light' ? '#eef1f9' : '#5d5a74'
  const vein = theme === 'light' ? '#7b8fe0' : '#6f58d9'
  const g = `pl-${theme}`
  return (
    <svg className="mdx-plants" viewBox="0 0 1132 320" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      {/* hanging plant, top */}
      <rect x="164" y="40" width="22" height="42" fill={pot} opacity="0.9" />
      <line x1="175" y1="0" x2="175" y2="44" stroke={vein} strokeWidth="2" />
      <ellipse cx="175" cy="2" rx="30" ry="30" fill={`url(#${g})`} opacity="0.85" />
      {/* tall rounded tree, left */}
      <path d="M86 70 C70 70 74 100 76 120 C78 140 62 150 64 176 C66 200 82 214 86 214 C92 214 108 200 110 176 C112 150 96 140 98 120 C100 100 104 70 86 70 Z" fill={`url(#${g})`} />
      <line x1="87" y1="88" x2="87" y2="232" stroke={vein} strokeWidth="2" />
      <path d="M87 150 L98 140 M87 176 L76 166" stroke={vein} strokeWidth="2" strokeLinecap="round" />
      <rect x="72" y="216" width="30" height="46" rx="3" fill={pot} />
      {/* big leaves, right */}
      <path d="M906 56 C860 90 862 180 902 250 C912 230 950 160 906 56 Z" fill={`url(#${g})`} />
      <path d="M1004 134 C966 160 960 222 976 266 C1000 240 1020 190 1004 134 Z" fill={`url(#${g})`} opacity="0.85" />
      <path d="M906 70 L912 250 M1000 150 L978 262" stroke={vein} strokeWidth="2" strokeLinecap="round" />
      <path d="M907 120 L918 108 M908 160 L896 148 M909 196 L920 186 M990 190 L999 182 M985 222 L976 214" stroke={vein} strokeWidth="2" strokeLinecap="round" />
      <rect x="926" y="250" width="36" height="70" fill={pot} />
    </svg>
  )
}

function UaeFlag() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden>
      <defs><clipPath id="uae"><circle cx="13" cy="13" r="12" /></clipPath></defs>
      <g clipPath="url(#uae)">
        <rect width="26" height="9" fill="#00843d" />
        <rect y="9" width="26" height="8" fill="#ffffff" />
        <rect y="17" width="26" height="9" fill="#111111" />
        <rect width="8" height="26" fill="#ef3340" />
      </g>
      <circle cx="13" cy="13" r="12" fill="none" stroke="rgba(0,0,0,0.12)" />
    </svg>
  )
}

function Dash({ theme }: { theme: Theme }) {
  return (
    <div className={`mdx ${theme}`}>
      <aside className="mdx-side">
        <div className="mdx-brand">
          <b>cubezix</b>
          <CircleDot size={20} className="mdx-pin" />
        </div>
        <div className="mdx-nav mdx-group"><span className="mdx-ic"><Home size={20} /></span><span className="mdx-nl">Dashboards</span><em>New</em><ChevronDown size={18} className="mdx-chev" /></div>
        <NavItem icon={<span className="mdx-ring" />} label="Overview" cls="sub" />
        <NavItem icon={<span className="mdx-ring" />} label="Helpdesk" cls="sub active" />
        <NavItem icon={<span className="mdx-ring" />} label="Assets" cls="sub" />

        <Section label="APPS & PAGES" />
        <NavItem icon={<Mail size={20} />} label="Tickets" />
        <NavItem icon={<MessageSquare size={20} />} label="Live Chat" />
        <NavItem icon={<CalendarDays size={20} />} label="Maintenance Calendar" cls="soft" />
        <NavItem icon={<FileText size={20} />} label="Invoices" arrow />
        <NavItem icon={<User size={20} />} label="Users" arrow />
        <NavItem icon={<Lock size={20} />} label="Roles & Permissions" arrow />
        <NavItem icon={<LayoutGrid size={20} />} label="Sites" arrow />
        <NavItem icon={<ClipboardList size={20} />} label="Reports" />

        <Section label="SERVICES" />
        <NavItem icon={<ShieldCheck size={20} />} label="IT AMC" />
        <NavItem icon={<Server size={20} />} label="Infrastructure" arrow />
        <NavItem icon={<Cloud size={20} />} label="Cloud" arrow />
        <NavItem icon={<Shield size={20} />} label="Security" arrow />

        <Section label="OPERATIONS" />
        <NavItem icon={<Wrench size={20} />} label="Preventive Checks" arrow />
        <NavItem icon={<FileText size={20} />} label="Documents" />
      </aside>

      <main className="mdx-main">
        <div className="mdx-top">
          <Search size={22} />
          <span className="mdx-tools">
            <UaeFlag />
            <Moon size={21} />
            <Bell size={21} />
            <span className="mdx-av">MB<i /></span>
          </span>
        </div>

        <div className="mdx-banner">
          <Plants theme={theme} />
          <div className="mdx-bcopy">
            <h3>Hello, how can we help?</h3>
            <p>or choose a category to quickly find the help you need</p>
            <div className="mdx-search"><Search size={20} /><span>Ask a question....</span></div>
          </div>
        </div>

        <div className="mdx-grid">
          {CARDS.map((c, i) => (
            <div className="mdx-card" key={c.title}>
              <div className="mdx-art"><FollowFace n={i + 1} theme={theme} /></div>
              <div className="mdx-body">
                <h4>{c.title} <span>{c.emoji}</span></h4>
                <p>{c.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mdx-foot">
          <span>© 2026, Made with <i>❤</i> by CubeZix</span>
          <span className="mdx-links"><a>Status</a><a>Docs</a><a>Support</a><a>Contact</a></span>
        </div>
      </main>
    </div>
  )
}

/** "Our model" block: heading + help-centre dashboard whose dark theme wipes in as you scroll. */
export default function ModelDashboard() {
  const ref = useRef<HTMLDivElement>(null)
  const fit = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  const [scale, setScale] = useState(0.78)

  useEffect(() => {
    const el = fit.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / CW))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true)
        io.disconnect()
      }
    }, { threshold: 0.15 })
    io.observe(el)

    const wipeEl = el.querySelector<HTMLElement>('.md-wipe')
    // The sweep is driven by scroll but eased, and spread over ~1.7x the old distance so it reads slower and more deliberate.
    const SPAN = 1.7
    let target = reduce ? 1 : 0
    let shown = target
    let raf = 0
    const paint = () => {
      el.style.setProperty('--wipe', `${((1 - shown) * 100).toFixed(2)}%`)
      el.classList.toggle('act', shown > 0.01 && shown < 0.99)
    }
    const tick = () => {
      shown += (target - shown) * 0.07
      if (Math.abs(target - shown) < 0.0008) {
        shown = target
        raf = 0
      } else {
        raf = requestAnimationFrame(tick)
      }
      paint()
    }
    const on = () => {
      const vh = window.innerHeight
      const sr = (wipeEl ?? el).getBoundingClientRect()
      const span = (vh * 0.9 + sr.height * 0.1 - 120) * SPAN
      target = reduce ? 1 : Math.min(Math.max(((vh * 0.9 - sr.top) / span) * 1.05, 0), 1)
      if (reduce) {
        shown = target
        paint()
      } else if (!raf) {
        raf = requestAnimationFrame(tick)
      }
    }
    on()
    shown = target
    paint()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
    }
  }, [])

  return (
    <div ref={ref} className={`md${seen ? ' in' : ''}`}>
      <div className="md-head">
        <Eyebrow label="Our model" note="Built for reliable support" />
        <h2>Designed around your team, <em>built for reliable support</em></h2>
        <p>Clients open tickets through email, chat or phone — and we follow an established protocol from helpdesk and remote support through preventive maintenance.</p>
      </div>
      <div className="md-wipe" ref={fit} style={{ height: CH * scale }}>
        <div className="mdx-stage" style={{ width: CW, height: CH, transform: `scale(${scale})` }}>
          <Dash theme="light" />
          <div className="md-dark" aria-hidden><Dash theme="dark" /></div>
          <span className="md-line" aria-hidden />
        </div>
      </div>
    </div>
  )
}
