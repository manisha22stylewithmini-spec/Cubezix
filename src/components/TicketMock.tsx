import { motion } from 'motion/react'
import { AlertTriangle, Banknote, CheckCircle2, Loader2, ShieldCheck, Users, Handshake } from 'lucide-react'
import { Avatars, H, Note, W, useFit } from './EstateMock'

function Ticket({ id, title, via, state, who, delay }: { id: string; title: string; via: 'Finance' | 'HR' | 'CRM'; state: 'done' | 'work' | 'esc'; who: [string, string]; delay: number }) {
  const Icon = via === 'Finance' ? Banknote : via === 'HR' ? Users : Handshake
  return (
    <motion.div
      className="flex h-[58px] items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 shadow-[0_1px_2px_rgba(15,23,42,0.05)]"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <span className="flex flex-none items-center gap-1 rounded-md border border-indigo-200 bg-indigo-50 px-2 py-1 text-[11px] font-medium text-indigo-700">
        <Icon size={11} /> {via}
      </span>
      <span className="flex min-w-0 flex-1 flex-col leading-tight">
        <b className="truncate text-[13.5px] font-semibold text-slate-800">{title}</b>
        <span className="text-[11px] text-slate-500">{id}</span>
      </span>
      <span className="flex-none rounded-md border border-indigo-100 bg-indigo-50/70 px-2 py-1 text-[11px] font-medium text-indigo-600">
        {state === 'done' ? '9 users' : state === 'work' ? '14 users' : '6 users'}
      </span>
      {state === 'done' ? (
        <span className="flex flex-none items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-700"><CheckCircle2 size={12} /> Live</span>
      ) : state === 'work' ? (
        <span className="flex flex-none items-center gap-1 rounded-md border border-indigo-200 bg-indigo-50 px-2 py-1 text-[11px] font-medium text-indigo-700"><Loader2 size={12} className="animate-spin" /> Migrating</span>
      ) : (
        <span className="flex flex-none items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-[11px] font-medium text-amber-700"><AlertTriangle size={12} /> Training due</span>
      )}
      <Avatars a={who[0]} b={who[1]} />
    </motion.div>
  )
}

function Step({ time, text, done, delay }: { time: string; text: string; done?: boolean; delay: number }) {
  return (
    <motion.div
      className="flex items-center gap-2.5 py-[5px]"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
    >
      <span className="h-3 w-3 flex-none rounded-bl-md border-b border-l border-slate-300" />
      <span className="w-12 flex-none rounded-md bg-slate-100 px-1.5 py-0.5 text-center text-[10.5px] font-medium text-slate-600">{time}</span>
      <span className="min-w-0 flex-1 truncate text-[12px] text-slate-700">{text}</span>
      {done ? <ShieldCheck size={14} className="flex-none text-emerald-500" /> : <Loader2 size={13} className="flex-none animate-spin text-indigo-400" />}
    </motion.div>
  )
}

export default function TicketMock() {
  const [box, s] = useFit()
  return (
    <div ref={box} className="w-full" style={{ height: H * s }}>
      <div className="relative origin-top-left font-sans" style={{ width: W, height: H, transform: `scale(${s})` }}>
        <div className="absolute left-[34px] top-[62px] w-[548px] rounded-2xl bg-slate-50/80 p-2.5 shadow-[0_30px_60px_-30px_rgba(30,40,120,0.35)] ring-1 ring-slate-200">
          <div className="mb-2 flex h-10 items-center justify-between rounded-xl bg-slate-100 px-4 text-[13px] font-medium text-slate-600">
            <span>ERP solutions · Modules</span>
            <span className="flex items-center gap-1.5 text-[11px] text-emerald-600">
              <span className="relative flex size-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" /><span className="relative inline-flex size-2 rounded-full bg-emerald-500" /></span>
              Live in production
            </span>
          </div>
          <div className="space-y-2">
            <Ticket id="Finance · Accounts, VAT, invoicing" title="Finance and accounting" via="Finance" state="done" who={['AK', 'SA']} delay={0.1} />
            <Ticket id="HR · Payroll, leave, records" title="HR and payroll" via="HR" state="work" who={['RS', 'MN']} delay={0.22} />
            <Ticket id="CRM · Leads, quotes, pipeline" title="CRM and sales" via="CRM" state="esc" who={['HD', 'IT']} delay={0.34} />
          </div>
        </div>

        <motion.div
          className="absolute left-[74px] top-[326px] w-[500px] rounded-b-2xl rounded-tr-2xl border border-slate-200 bg-white px-4 pb-2 pt-2 shadow-[0_16px_30px_-18px_rgba(20,30,90,0.3)]"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.5 }}
        >
          <Step time="Wk 1" text="Requirements mapped to your process" done delay={0.7} />
          <Step time="Wk 3" text="Data migrated and users trained" done delay={0.8} />
          <Step time="Wk 5" text="Go-live with on-call support" delay={0.9} />
        </motion.div>

        <Note x={0} y={6} rot={-6} text="Finance, HR and CRM" delay={0.9}
          arrow="M66 46 C60 60 70 72 96 82 M86 72 L97 82 L83 86" />
        <Note x={300} y={20} rot={3} text="One system, one source of truth" delay={1.05} w={270}
          arrow="M520 62 C536 80 530 108 506 132 M512 118 L505 133 L521 128" />
        <Note x={438} y={226} rot={-4} text="Tailored to your process" delay={1.2} w={170}
          arrow="M512 256 C526 244 528 230 514 210 M508 218 L514 209 L522 220" />
        <Note x={14} y={414} rot={-5} text="Full data migration" delay={1.35}
          arrow="M38 410 C16 380 24 342 56 322 M42 332 L57 321 L58 337" />
        <Note x={410} y={414} rot={5} text="Support after go-live" delay={1.5} w={190}
          arrow="M450 410 C440 396 462 380 492 388 M480 380 L493 388 L481 396" />
      </div>
    </div>
  )
}
