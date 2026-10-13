import { motion } from 'motion/react'
import { CheckCircle2, Clock, Cloud, Laptop, Mail, Wifi } from 'lucide-react'
import { Avatars, H, Note, W, useFit } from './EstateMock'

function Site({ name, sub, pct, state, people, delay }: { name: string; sub: string; pct: number; state: 'live' | 'doing' | 'next'; people: [string, string]; delay: number }) {
  const bar = state === 'live' ? 'bg-emerald-500' : state === 'doing' ? 'bg-indigo-500' : 'bg-slate-300'
  return (
    <motion.div
      className="flex h-[58px] items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 shadow-[0_1px_2px_rgba(15,23,42,0.05)]"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <span className="flex-none rounded-md border border-indigo-200 bg-indigo-50 px-2 py-1 text-[11px] font-medium text-indigo-700">Site</span>
      <span className="flex w-[150px] flex-none flex-col leading-tight">
        <b className="truncate text-[13.5px] font-semibold text-slate-800">{name}</b>
        <span className="text-[11px] text-slate-500">{sub}</span>
      </span>
      <span className="flex min-w-0 flex-1 items-center gap-2">
        <span className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
          <motion.span
            className={`block h-full rounded-full ${bar}`}
            initial={{ width: 0 }}
            whileInView={{ width: `${pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, delay: delay + 0.3, ease: 'easeOut' }}
          />
        </span>
        <span className="w-8 flex-none text-right text-[11px] font-medium text-slate-500">{pct}%</span>
      </span>
      {state === 'live' ? (
        <span className="flex flex-none items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-700"><CheckCircle2 size={12} /> Live</span>
      ) : state === 'doing' ? (
        <span className="flex flex-none items-center gap-1 rounded-md border border-indigo-200 bg-indigo-50 px-2 py-1 text-[11px] font-medium text-indigo-700"><Clock size={12} /> Onboarding</span>
      ) : (
        <span className="flex flex-none items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600">Scheduled</span>
      )}
      <Avatars a={people[0]} b={people[1]} />
    </motion.div>
  )
}

function Task({ icon, text, status, delay }: { icon: React.ReactNode; text: string; status: string; delay: number }) {
  return (
    <motion.div
      className="flex items-center gap-2.5 py-[5px]"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
    >
      <span className="h-3 w-3 flex-none rounded-bl-md border-b border-l border-slate-300" />
      <span className="flex size-5 flex-none items-center justify-center rounded-md bg-indigo-50 text-indigo-600">{icon}</span>
      <span className="min-w-0 flex-1 truncate text-[12px] text-slate-700">{text}</span>
      <span className="flex-none text-[11px] text-slate-500">{status}</span>
    </motion.div>
  )
}

export default function OnboardMock() {
  const [box, s] = useFit()
  return (
    <div ref={box} className="w-full" style={{ height: H * s }}>
      <div className="relative origin-top-left font-sans" style={{ width: W, height: H, transform: `scale(${s})` }}>
        <div className="absolute left-[34px] top-[62px] w-[548px] rounded-2xl bg-slate-50/80 p-2.5 shadow-[0_30px_60px_-30px_rgba(30,40,120,0.35)] ring-1 ring-slate-200">
          <div className="mb-2 flex h-10 items-center justify-between rounded-xl bg-slate-100 px-4 text-[13px] font-medium text-slate-600">
            <span>IT infrastructure · Projects</span>
            <span className="flex gap-1.5">
              {['Cabling', 'Wi-Fi', 'Servers'].map((p) => (
                <span key={p} className="rounded-md bg-white px-2 py-0.5 text-[10.5px] font-medium text-slate-500 ring-1 ring-slate-200">{p}</span>
              ))}
            </span>
          </div>
          <div className="space-y-2">
            <Site name="Business Bay office fit-out" sub="Handed over 06 Oct" pct={100} state="live" people={['AK', 'SA']} delay={0.1} />
            <Site name="Abu Dhabi branch network" sub="Go-live 16 Oct" pct={72} state="doing" people={['RS', 'MN']} delay={0.22} />
            <Site name="Sharjah warehouse Wi-Fi" sub="Scheduled 24 Oct" pct={30} state="next" people={['HD', 'IT']} delay={0.34} />
          </div>
        </div>

        <motion.div
          className="absolute left-[74px] top-[326px] w-[500px] rounded-b-2xl rounded-tr-2xl border border-slate-200 bg-white px-4 pb-2 pt-2 shadow-[0_16px_30px_-18px_rgba(20,30,90,0.3)]"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.5 }}
        >
          <Task icon={<Mail size={12} />} text="Structured cabling tested and certified" status="Done" delay={0.7} />
          <Task icon={<Laptop size={12} />} text="Servers and firewalls configured" status="14 of 18" delay={0.8} />
          <Task icon={<Wifi size={12} />} text="Wi-Fi coverage survey signed off" status="Complete" delay={0.9} />
        </motion.div>

        <Note x={0} y={6} rot={-6} text="Cabling to cloud" delay={0.9}
          arrow="M60 46 C54 60 64 72 90 80 M80 70 L91 80 L77 84" />
        <Note x={274} y={26} rot={3} text="Built to scale with you" delay={1.05} w={220}
          arrow="M340 66 C326 84 304 100 276 112 M286 100 L275 113 L291 113" />
        <Note x={430} y={218} rot={-4} text="Progress you can see" delay={1.2} w={150}
          arrow="M508 252 C522 240 526 226 512 206 M506 214 L512 205 L520 216" />
        <Note x={14} y={414} rot={-5} text="Certified and documented" delay={1.35} w={220}
          arrow="M40 410 C18 380 26 342 58 322 M44 332 L59 321 L60 337" />
        <Note x={410} y={414} rot={5} text="Supported after go-live" delay={1.5} w={190}
          arrow="M450 410 C440 396 462 380 492 388 M480 380 L493 388 L481 396" />
      </div>
    </div>
  )
}
