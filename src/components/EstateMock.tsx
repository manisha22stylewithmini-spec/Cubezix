import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { AlertTriangle, CheckCircle2, ChevronDown, ChevronRight, Cpu, HardDrive, ShieldCheck } from 'lucide-react'

/** Design canvas is 600 x 450; the whole thing scales to fit its container. */
export const W = 600
export const H = 450

export function Avatars({ a, b }: { a: string; b: string }) {
  return (
    <span className="flex -space-x-2">
      <span className="flex size-6 items-center justify-center rounded-full bg-indigo-500 text-[9px] font-bold text-white ring-2 ring-white">{a}</span>
      <span className="flex size-6 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white ring-2 ring-white">{b}</span>
    </span>
  )
}

function Row({ kind, title, sub, count, state, people, open, delay }: {
  kind: string; title: string; sub: string; count: string; state: 'ok' | 'risk'; people: [string, string]; open?: boolean; delay: number
}) {
  return (
    <motion.div
      className="flex h-[58px] items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 shadow-[0_1px_2px_rgba(15,23,42,0.05)]"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <span className="flex size-6 flex-none items-center justify-center rounded-md bg-slate-100 text-slate-500">
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      </span>
      <span className="flex-none rounded-md border border-indigo-200 bg-indigo-50 px-2 py-1 text-[11px] font-medium text-indigo-700">{kind}</span>
      <span className="flex min-w-0 flex-1 flex-col leading-tight">
        <b className="truncate text-[13.5px] font-semibold text-slate-800">{title}</b>
        <span className="text-[11px] text-slate-500">{sub}</span>
      </span>
      <span className="flex-none rounded-md border border-indigo-100 bg-indigo-50/70 px-2 py-1 text-[11px] font-medium text-indigo-600">{count}</span>
      {state === 'ok' ? (
        <span className="flex flex-none items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-700">
          <CheckCircle2 size={12} /> Healthy
        </span>
      ) : (
        <span className="flex flex-none items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-[11px] font-medium text-amber-700">
          <AlertTriangle size={12} /> Attention
        </span>
      )}
      <Avatars a={people[0]} b={people[1]} />
    </motion.div>
  )
}

function Sub({ icon, tag, tagCls, text, status, delay }: { icon: React.ReactNode; tag: string; tagCls: string; text: string; status: string; delay: number }) {
  return (
    <motion.div
      className="flex items-center gap-2.5 py-[5px]"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
    >
      <span className="h-3 w-3 flex-none rounded-bl-md border-b border-l border-slate-300" />
      <span className={`flex flex-none items-center gap-1 rounded-md border px-2 py-0.5 text-[10.5px] font-medium ${tagCls}`}>{icon}{tag}</span>
      <span className="min-w-0 flex-1 truncate text-[12px] text-slate-700">{text}</span>
      <span className="flex-none text-[11px] text-slate-500">{status}</span>
    </motion.div>
  )
}

/** Handwritten note + hand-drawn arrow. (x, y) is the note's top-left in canvas px. */
export function Note({ x, y, rot, text, arrow, delay, w = 190 }: { x: number; y: number; rot: number; text: string; arrow: string; delay: number; w?: number }) {
  return (
    <>
      <motion.span
        className="absolute z-20 inline-block whitespace-nowrap bg-amber-100/80 px-2 text-[25px] font-semibold leading-tight text-indigo-600"
        style={{ left: x, top: y, rotate: rot, fontFamily: "'Caveat', 'Segoe Script', cursive", width: 'max-content', maxWidth: w + 60 }}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
      >
        {text}
      </motion.span>
      <svg className="pointer-events-none absolute inset-0 z-20" width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
        <motion.path
          d={arrow}
          stroke="#4f46e5"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 0.35, ease: 'easeInOut' }}
        />
      </svg>
    </>
  )
}

/** Scales the 600x450 design canvas to the width of its container. */
export function useFit() {
  const box = useRef<HTMLDivElement>(null)
  const [s, setS] = useState(1)
  useEffect(() => {
    const el = box.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setS(Math.min(e.contentRect.width / W, 1.15)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [box, s] as const
}

export default function EstateMock() {
  const [box, s] = useFit()

  return (
    <div ref={box} className="w-full" style={{ height: H * s }}>
      <div className="relative origin-top-left font-sans" style={{ width: W, height: H, transform: `scale(${s})` }}>
        {/* main list card */}
        <div className="absolute left-[34px] top-[62px] w-[548px] rounded-2xl bg-slate-50/80 p-2.5 shadow-[0_30px_60px_-30px_rgba(30,40,120,0.35)] ring-1 ring-slate-200">
          <div className="mb-2 flex h-10 items-center justify-between rounded-xl bg-slate-100 px-4 text-[13px] font-medium text-slate-600">
            <span>IT AMC · Contract overview</span>
            <span className="flex items-center gap-1.5 text-[11px] text-emerald-600"><span className="size-2 rounded-full bg-emerald-500" />Active · renews 30 Nov</span>
          </div>
          <div className="space-y-2">
            <Row kind="Preventive" title="Monthly health checks" sub="Next visit 18 Oct 2026" count="42 devices" state="ok" people={['AK', 'SA']} delay={0.1} />
            <Row kind="Helpdesk" title="Unlimited remote support" sub="Median response 15 min" count="24/7" state="ok" people={['RS', 'MN']} delay={0.22} />
            <Row kind="Hardware" title="Onsite repair and spares" sub="2 devices awaiting parts" count="6 visits" state="risk" people={['HD', 'IT']} open delay={0.34} />
          </div>
        </div>

        <motion.div
          className="absolute left-[74px] top-[326px] w-[500px] rounded-b-2xl rounded-tr-2xl border border-slate-200 bg-white px-4 pb-2 pt-2 shadow-[0_16px_30px_-18px_rgba(20,30,90,0.3)]"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.5 }}
        >
          <Sub icon={<Cpu size={11} />} tag="Patch · 4" tagCls="border-rose-200 bg-rose-50 text-rose-700" text="Security patches scheduled tonight" status="02:00" delay={0.7} />
          <Sub icon={<HardDrive size={11} />} tag="Backup" tagCls="border-emerald-200 bg-emerald-50 text-emerald-700" text="Nightly restore test passed" status="Verified" delay={0.8} />
          <Sub icon={<ShieldCheck size={11} />} tag="Report" tagCls="border-slate-200 bg-slate-50 text-slate-600" text="Monthly IT health report issued" status="Sent" delay={0.9} />
        </motion.div>

        {/* handwritten notes with drawn arrows */}
        <Note x={0} y={6} rot={-7} text="One contract, whole estate" delay={0.9} w={230}
          arrow="M64 44 C58 56 66 68 92 76 M82 66 L93 76 L79 80" />
        <Note x={226} y={30} rot={-3} text="Renewal date tracked" delay={1.05}
          arrow="M256 70 C234 78 216 92 202 106 M211 95 L201 107 L216 106" />
        <Note x={404} y={8} rot={4} text="Fixed yearly cost" delay={1.2}
          arrow="M470 48 C486 70 472 98 446 120 M453 106 L445 121 L461 119" />
        <Note x={14} y={414} rot={-5} text="Prevent, don't just fix" delay={1.35} w={210}
          arrow="M36 410 C14 378 22 330 52 296 M40 306 L53 295 L56 311" />
        <Note x={404} y={414} rot={5} text="Reports every month" delay={1.5}
          arrow="M440 410 C430 396 452 380 482 388 M470 380 L483 388 L471 396" w={170} />
      </div>
    </div>
  )
}
