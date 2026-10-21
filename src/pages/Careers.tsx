import IndustriesMarquee from '../components/IndustriesMarquee'
import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, BadgeCheck, Briefcase, Check, Eye, MapPin, Scale, Search, Target, Users } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Head } from './ServicePage'

const ease = [0.2, 0.7, 0.2, 1] as const
const apply = () => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

const ROLES: [string, string, string][] = [
  ['IT Sales Executive', 'Dubai, UAE', 'Open to applications. Send us your details and we will be in touch.'],
  ['Business Development Manager', 'Dubai, UAE', 'Open to applications. Send us your details and we will be in touch.'],
]
const TRAITS: [typeof Users, string, string][] = [
  [Users, 'Client-oriented', 'We put clients first, always.'], [Scale, 'Independent', 'Honest advice over vendor loyalty.'], [BadgeCheck, 'Competent', 'Skilled people who keep learning.'],
  [Target, 'Results-driven', 'We care about outcomes.'], [Search, 'Problem-solving', 'We fix causes, not symptoms.'], [Eye, 'Transparent', 'Open with clients and each other.'],
]

export default function Careers() {
  const [role, setRole] = useState(ROLES[0][0])
  const [sent, setSent] = useState(false)
  return (
    <div className="bg-white font-sans">
      <PageHero
        eyebrow="Careers" note="Join the CubeZix team" title="Start your career as an" accent="IT professional"
        text="If you want to start your career with us as an IT professional, join and innovate with us."
        actions={<><button type="button" onClick={apply} className="btn-cubezix cursor-pointer border-0">Apply now</button><a href="#roles" className="btn-cubezix-secondary">Open roles <ArrowRight size={16} /></a></>}
      >
        <div className="rounded-[26px] border border-white bg-white/90 p-6 shadow-[0_30px_70px_-40px_rgba(37,99,255,0.5)] backdrop-blur">
          <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#2563ff]">Now hiring</div>
          {ROLES.map(([t, loc]) => (
            <div key={t} className="mt-4 flex items-center gap-3 rounded-2xl border border-[#e6e9f0] bg-white px-4 py-3">
              <span className="flex size-10 flex-none items-center justify-center rounded-xl bg-[#eef3ff] text-[#2563ff]"><Briefcase size={18} /></span>
              <span><b className="block text-[15px] text-[#0b1220]">{t}</b><span className="flex items-center gap-1 text-[13px] text-[#667085]"><MapPin size={12} />{loc}</span></span>
            </div>
          ))}
        </div>
      </PageHero>

      <IndustriesMarquee />

      <section id="roles" className="scroll-mt-24 px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1000px]">
          <Head eyebrow="Open positions" note={`${ROLES.length} roles`} title="Join the team" sub="Applications are accepted through this page." />
          <div className="mt-12 flex flex-col gap-4">
            {ROLES.map(([t, loc, d], i) => (
              <motion.article key={t} className="group flex flex-wrap items-center justify-between gap-5 rounded-[26px] border border-[#e6e9f0] bg-white p-6 transition-all duration-300 hover:border-[#c9d6f5] hover:shadow-[0_28px_60px_-34px_rgba(37,99,255,0.4)] sm:p-8" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: i * 0.08, ease }}>
                <div className="min-w-0 flex-1 basis-[320px]">
                  <h3 className="m-0 text-[22px] font-semibold tracking-tight text-[#0b1220]">{t}</h3>
                  <span className="mt-1 flex items-center gap-1.5 text-[14px] text-[#667085]"><MapPin size={14} className="text-[#2563ff]" />{loc}</span>
                  <p className="m-0 mt-3 text-[15px] leading-relaxed text-[#667085]">{d}</p>
                </div>
                <button type="button" onClick={() => { setRole(t); apply() }} className="btn-cubezix cursor-pointer border-0">Apply now</button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-[1280px] rounded-[36px] bg-gradient-to-br from-[#eef3ff] via-[#f8faff] to-white px-6 py-16 ring-1 ring-[#e6ecfa] sm:px-12 lg:py-20">
          <Head eyebrow="Your benefits" note="How we work" title="What it is like to work here" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TRAITS.map(([I, t, d]) => (
              <div key={t} className="group rounded-[24px] border border-[#e6e9f0] bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#c9d6f5] hover:shadow-[0_28px_60px_-34px_rgba(37,99,255,0.4)]">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[#eef3ff] text-[#2563ff] transition-colors duration-300 group-hover:bg-[#2563ff] group-hover:text-white"><I size={22} /></span>
                <h3 className="m-0 mt-5 text-[19px] font-semibold tracking-tight text-[#0b1220]">{t}</h3>
                <p className="m-0 mt-2 text-[14.5px] leading-relaxed text-[#667085]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="scroll-mt-24 px-6 pb-24 lg:px-12">
        <div className="mx-auto max-w-[760px]">
          <Head eyebrow="Apply now" title="Tell us about yourself" />
          <form className="mt-10 grid gap-4 rounded-[28px] border border-[#e6e9f0] bg-white p-6 shadow-[0_30px_70px_-44px_rgba(37,99,255,0.35)] sm:grid-cols-2 sm:p-8" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
            {[['Full name', 'text'], ['Email', 'email'], ['Phone', 'tel']].map(([l, t]) => (
              <label key={l} className="flex flex-col gap-1.5 text-[13px] font-semibold text-[#475467]">{l}<input required={l !== 'Phone'} type={t} className="h-12 rounded-xl border border-[#dfe6f6] bg-white px-4 text-[15px] font-normal text-[#0b1220] outline-none transition-colors focus:border-[#2563ff]" /></label>
            ))}
            <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-[#475467]">Role
              <select value={role} onChange={(e) => setRole(e.target.value)} className="h-12 rounded-xl border border-[#dfe6f6] bg-white px-3 text-[15px] font-normal text-[#0b1220] outline-none focus:border-[#2563ff]">{ROLES.map(([t]) => <option key={t}>{t}</option>)}<option>Another role</option></select>
            </label>
            <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-[#475467] sm:col-span-2">A few lines about you<textarea rows={4} className="rounded-xl border border-[#dfe6f6] bg-white p-4 text-[15px] font-normal text-[#0b1220] outline-none transition-colors focus:border-[#2563ff]" /></label>
            <div className="sm:col-span-2">
              <button type="submit" className="btn-cubezix cursor-pointer border-0">{sent ? <><Check size={16} /> Thank you, we will be in touch</> : 'Submit application'}</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
