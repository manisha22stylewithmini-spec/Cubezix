import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowUp, CheckCircle2, Mail, MessageSquareText, Rocket, Sparkles, TrendingUp, Workflow, Zap } from 'lucide-react'
import Eyebrow from '../Eyebrow'

/* ---------- small helpers ---------- */
function CountUp({ to, suffix = '', decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const t0 = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min((t - t0) / 1500, 1)
      setV(to * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])
  return <span ref={ref} className="tabular-nums">{v.toFixed(decimals)}{suffix}</span>
}

function Window({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`absolute overflow-hidden rounded-t-2xl bg-white shadow-[0_-12px_40px_-12px_rgba(8,12,60,0.5)] ring-1 ring-white/60 ${className}`}>
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-3.5 py-2.5">
        <span className="flex gap-1.5">
          <i className="size-2 rounded-full bg-rose-300" />
          <i className="size-2 rounded-full bg-amber-300" />
          <i className="size-2 rounded-full bg-emerald-300" />
        </span>
        <span className="ml-1 text-[10.5px] font-semibold tracking-wide text-slate-500">{title}</span>
      </div>
      <div className="p-3.5 pr-9">{children}</div>
    </div>
  )
}

function Floating({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-xl border border-slate-100 bg-white px-3 py-2 shadow-[0_14px_30px_-10px_rgba(8,12,60,0.45)] ${className}`}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- the four mock UIs ---------- */
function ChatMock() {
  return (
    <>
      <Window title="CubeZix Assistant" className="-right-5 bottom-0 left-5 top-[172px]">
        <div className="flex justify-end">
          <span className="rounded-2xl rounded-br-md bg-[#2563ff] px-3 py-1.5 text-[11px] font-medium text-white">What should I check first?</span>
        </div>
        <div className="mt-2.5 flex items-start gap-2">
          <span className="flex size-6 flex-none items-center justify-center rounded-full bg-[#eaf0ff] text-[#2563ff]"><Sparkles size={12} /></span>
          <div className="flex-1 space-y-1.5 rounded-2xl rounded-tl-md bg-slate-50 px-3 py-2.5">
            {[100, 88, 62].map((w, i) => (
              <motion.div key={i} className="h-1.5 rounded-full bg-slate-200" initial={{ width: 0 }} whileInView={{ width: `${w}%` }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.8 + i * 0.2 }} />
            ))}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {['Backups', 'Patching', 'Licences'].map((c) => (
            <span key={c} className="rounded-full border border-slate-200 px-2.5 py-0.5 text-[10px] font-medium text-slate-500">{c}</span>
          ))}
        </div>
      </Window>
      <div className="absolute inset-x-4 bottom-3.5 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[11.5px] text-slate-400 shadow-[0_10px_24px_-8px_rgba(8,12,60,0.55)]">
        <Sparkles size={13} className="text-[#2563ff]" /> Ask me anything
        <span className="ml-auto flex size-6 items-center justify-center rounded-full bg-[#2563ff] text-white"><ArrowUp size={12} /></span>
      </div>
    </>
  )
}

function BarsMock() {
  const bars = [34, 52, 44, 70, 58, 88, 74]
  return (
    <>
      <Window title="Go-live progress" className="-right-5 bottom-0 left-5 top-[172px]">
        <div className="flex h-[108px] items-end gap-2">
          {bars.map((h, i) => (
            <div key={i} className="flex h-full flex-1 flex-col justify-end">
              <motion.div
                className={`rounded-t-md ${i === 5 ? 'bg-gradient-to-t from-[#4338ca] to-[#818cf8]' : 'bg-gradient-to-t from-indigo-100 to-indigo-300'}`}
                initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.5 + i * 0.07, ease: 'easeOut' }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[9.5px] font-medium text-slate-400">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => <span key={d}>{d}</span>)}
        </div>
      </Window>
      <Floating className="bottom-10 left-2.5">
        <div className="text-[9.5px] font-medium text-slate-500">Tickets resolved</div>
        <div className="text-[15px] font-bold text-slate-800"><CountUp to={1284} /></div>
        <span className="mt-0.5 inline-block rounded-full bg-emerald-100 px-1.5 py-px text-[9.5px] font-semibold text-emerald-700">+12.4%</span>
      </Floating>
    </>
  )
}

function ChartMock() {
  return (
    <>
      <Window title="Capacity" className="-right-5 bottom-0 left-5 top-[172px]">
        <div className="mb-1 flex items-center gap-3 text-[9.5px] font-medium text-slate-500">
          <span className="flex items-center gap-1"><i className="size-1.5 rounded-full bg-[#0a8fd8]" />Usage</span>
          <span className="flex items-center gap-1"><i className="size-1.5 rounded-full bg-slate-300" />Limit</span>
        </div>
        <svg viewBox="0 0 220 96" className="w-full">
          <defs>
            <linearGradient id="fcArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0a8fd8" stopOpacity=".28" />
              <stop offset="1" stopColor="#0a8fd8" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[24, 48, 72].map((y) => <line key={y} x1="0" x2="220" y1={y} y2={y} stroke="#eef1f6" />)}
          <line x1="0" x2="220" y1="20" y2="20" stroke="#cbd5e1" strokeDasharray="4 4" />
          <motion.path
            d="M0 82 C22 78 34 56 60 60 S100 82 126 52 S176 36 220 20 L220 96 L0 96 Z"
            fill="url(#fcArea)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 1 }}
          />
          <motion.path
            d="M0 82 C22 78 34 56 60 60 S100 82 126 52 S176 36 220 20"
            fill="none" stroke="#0a8fd8" strokeWidth="2.6" strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, delay: 0.5, ease: 'easeInOut' }}
          />
          {[[60, 60], [126, 52], [220, 20]].map(([x, y], i) => (
            <motion.circle key={i} cx={x} cy={y} r="4" fill="#fff" stroke="#0a8fd8" strokeWidth="2" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.2 + i * 0.25 }} />
          ))}
        </svg>
      </Window>
      <Floating className="right-3 top-[150px]" delay={0.8}>
        <div className="flex items-center gap-1.5 text-[9.5px] font-medium text-slate-500">
          <span className="relative flex size-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" /><span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" /></span>
          Sites online
        </div>
        <div className="text-[15px] font-bold text-slate-800"><CountUp to={24} /> / 24</div>
      </Floating>
    </>
  )
}

function FlowMock() {
  const nodes = [
    { label: 'Request', icon: <Mail size={12} />, cls: 'bg-sky-50 text-sky-700 border-sky-100' },
    { label: 'Triage', icon: <Workflow size={12} />, cls: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
    { label: 'Resolved', icon: <CheckCircle2 size={12} />, cls: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  ]
  return (
    <>
      <Window title="Auto-routing" className="-right-5 bottom-0 left-5 top-[172px]">
        <div className="relative mt-1 flex items-center justify-between">
          <svg className="absolute inset-x-6 top-1/2 h-1 -translate-y-1/2" viewBox="0 0 100 2" preserveAspectRatio="none">
            <motion.line x1="0" y1="1" x2="100" y2="1" stroke="#2563ff" strokeWidth="1.5" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -16] }} transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }} />
          </svg>
          {nodes.map((n, i) => (
            <motion.span
              key={n.label}
              className={`relative z-10 flex flex-col items-center gap-1 rounded-xl border px-2.5 py-2 text-[10px] font-semibold ${n.cls}`}
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
            >
              {n.icon}{n.label}
            </motion.span>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          {[['Patch window', 'Tonight 02:00', 82], ['Backup verify', 'Complete', 100]].map(([a, b, p]) => (
            <div key={a as string}>
              <div className="flex justify-between text-[10px] text-slate-500"><span className="font-medium text-slate-700">{a}</span><span>{b}</span></div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-[#12a5f5] to-[#3b1ee0]" initial={{ width: 0 }} whileInView={{ width: `${p}%` }} viewport={{ once: true }} transition={{ duration: 1.3, delay: 0.9 }} />
              </div>
            </div>
          ))}
        </div>
      </Window>
      <Floating className="right-3 top-[148px]" delay={0.5}>
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-700"><Zap size={11} className="text-[#2563ff]" /> Auto-routed</div>
      </Floating>
    </>
  )
}

const CARDS = [
  { n: '01', title: 'Smart Assistance', body: 'Get instant guidance and proactive support from engineers who know your estate.', bg: 'from-[#4a85ff] via-[#2f62f0] to-[#1b3fd0]', glow: 'rgba(125,170,255,0.55)', Icon: MessageSquareText, Mock: ChatMock },
  { n: '02', title: 'Go Live Faster', body: 'Skip the usual delays. New offices, users and services are up in days.', bg: 'from-[#7477f5] via-[#5a5be3] to-[#3730a3]', glow: 'rgba(165,160,255,0.55)', Icon: Rocket, Mock: BarsMock },
  { n: '03', title: 'Grow Without Limits', body: 'Cloud and infrastructure that scales as your team and sites grow.', bg: 'from-[#22c2f0] via-[#109ad6] to-[#0a6fb8]', glow: 'rgba(140,230,255,0.55)', Icon: TrendingUp, Mock: ChartMock },
  { n: '04', title: 'Hands-Free Operations', body: 'Monitoring, patching and ticket routing run in the background.', bg: 'from-[#1f3d85] via-[#142c63] to-[#0A1B44]', glow: 'rgba(90,140,255,0.5)', Icon: Workflow, Mock: FlowMock },
]

const STATS = [
  { to: 15, suffix: ' min', decimals: 0, label: 'First response', color: 'bg-[#2563ff]' },
  { to: 1500, suffix: '+', decimals: 0, label: 'Projects delivered', color: 'bg-[#00DAFF]' },
  { to: 98, suffix: '%', decimals: 0, label: 'Client satisfaction', color: 'bg-indigo-500' },
  { to: 99.9, suffix: '%', decimals: 1, label: 'Uptime', color: 'bg-[#0A1B44]' },
]

export default function FeatureCards() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#e3e4eb_0%,#e8eaef_8%,#eeeff4_18%,#f5f6fa_34%,#ffffff_68%,#f6f7fb_88%,#ffffff_100%)] px-6 pb-28 pt-24 font-sans">
      {/* soft cloud glow behind the numbers */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(ellipse_at_50%_70%,rgba(150,160,220,0.22),transparent_62%)] [mask-image:linear-gradient(180deg,#000_0%,#000_45%,transparent_100%)]" aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <Eyebrow label="About CubeZix" note="IT solutions, Dubai" />
          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            Your Partner in Innovative IT Solutions in Dubai
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            At CubeZix, we are dedicated to delivering top-tier IT solutions, services, and support across the MENA
            region. With a commitment to excellence and a customer-centric approach, we specialize in a comprehensive
            range of IT services tailored to meet the unique needs of businesses in various industries.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map(({ n, title, body, bg, glow, Icon, Mock }, i) => (
            <motion.div
              key={title}
              className={`group relative h-[420px] overflow-hidden rounded-[26px] bg-gradient-to-b ${bg} p-5 text-white shadow-[0_28px_50px_-22px_rgba(20,25,90,0.55)] ring-1 ring-white/25`}
              style={{ ['--mx' as string]: '50%', ['--my' as string]: '0%' }}
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
                e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
              }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
            >
              {/* depth: top glow + fine dot grid + inner border */}
              <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(120% 70% at 0% 0%, ${glow}, transparent 60%)` }} />
              <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(180deg,#000,transparent_55%)]" />
              <div className="pointer-events-none absolute inset-0 rounded-[26px] ring-1 ring-inset ring-white/10" />

              <div className="relative flex items-start justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"><Icon size={19} /></span>
                <span className="text-[11px] font-bold tracking-[0.18em] text-white/60">{n}</span>
              </div>
              <h3 className="relative mt-4 text-[19px] font-semibold tracking-tight text-white">{title}</h3>
              <p className="relative mt-1.5 max-w-[26ch] text-[13px] leading-snug text-white/80">{body}</p>
              <Mock />
              {/* cursor spotlight */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 [background:radial-gradient(220px_circle_at_var(--mx)_var(--my),rgba(255,255,255,0.22),transparent_70%)] group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mx-auto mt-20 max-w-4xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-semibold tracking-tight text-foreground">Numbers that power our story</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Our engineers have helped hundreds of businesses stay online, scale smarter and spend less on IT.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-y-8 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <div key={s.label} className={`px-4 text-left sm:pl-8 ${i > 0 ? 'sm:border-l sm:border-border' : ''}`}>
                <div className="flex items-center gap-3">
                  <span className={`size-3.5 flex-none rounded-[4px] ${s.color}`} />
                  <b className="text-3xl font-semibold tracking-tight text-foreground">
                    <CountUp to={s.to} suffix={s.suffix} decimals={s.decimals} />
                  </b>
                </div>
                <div className="mt-1 pl-[26px] text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
