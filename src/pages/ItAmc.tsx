import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'motion/react'
import { Activity, ArrowRight, ArrowUpRight, Check, ChevronDown, Headset, Mail, MessageCircle, Network, Phone, ShieldCheck, Sparkles, Users, Wrench, Zap } from 'lucide-react'
import Eyebrow from '../components/Eyebrow'
import ContactSection from '../components/sections/ContactSection'
import Testimonials from '../components/sections/Testimonials'
import TimelineCard from '../components/TimelineCard'
import { groupFaqs } from '../data/faqGroups'
import FaqSection from '../components/FaqSection'
import IndustriesMarquee from '../components/IndustriesMarquee'
import { GRID, span } from '../lib/gridSpan'
import PocketCards from '../components/PocketCards'
import { LIVE } from '../data/pages/live'
import { pageById, pagePath } from '../data/pages'
import TopicOverview from '../components/TopicOverview'
import ArcHero from '../components/ArcHero'
import {
  COVERAGE, COVERAGE_GROUPS, INCLUDED, INDUSTRIES, PLANS, QA, SLA, SLA_INTRO, SWITCH_STEPS, WORKFLOW,
} from '../data/itAmc'

const ease = [0.2, 0.7, 0.2, 1] as const
const toContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

/** Eyebrow + title + sub-line, the same header every section of the site uses */
function Head({ eyebrow, note, title, sub, align = 'center' }: { eyebrow: string; note?: string; title: string; sub?: string; align?: 'center' | 'left' }) {
  const c = align === 'center'
  return (
    <motion.div
      className={`flex max-w-2xl flex-col ${c ? 'mx-auto items-center text-center' : 'items-start text-left'}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7 }}
    >
      <Eyebrow label={eyebrow} note={note} />
      <h2 className="m-0 mt-6 text-[34px] font-bold leading-[1.1] tracking-tight text-[#0b1220] sm:text-[44px]">{title}</h2>
      {sub && <p className="m-0 mt-4 text-[17px] leading-relaxed text-[#667085]">{sub}</p>}
    </motion.div>
  )
}

const TONE = {
  red: { chip: 'bg-[#ffe9ea] text-[#d6373b]', bar: 'from-[#ff8a8f] to-[#e5484d]', ring: 'hover:border-[#f5b5b8]' },
  amber: { chip: 'bg-[#fff1da] text-[#c27803]', bar: 'from-[#fbbf24] to-[#f59e0b]', ring: 'hover:border-[#f3d49a]' },
  blue: { chip: 'bg-[#e8efff] text-[#2563ff]', bar: 'from-[#12a5f5] to-[#2563ff]', ring: 'hover:border-[#b9ccf8]' },
  green: { chip: 'bg-[#e7f8f0] text-[#0f9a68]', bar: 'from-[#34d399] to-[#12a06e]', ring: 'hover:border-[#a9e0c9]' },
} as const

export default function ItAmc() {
  /* "what's included" timeline: the blue line fills as you scroll past each item */
  const tl = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: tl, offset: ['start 65%', 'end 70%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const fillH = useTransform(fill, (v) => `${Math.max(0, Math.min(1, v)) * 100}%`)

  const [group, setGroup] = useState<(typeof COVERAGE_GROUPS)[number]>('All')
  const [q, setQ] = useState(0)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const shown = COVERAGE.filter((c) => group === 'All' || c.group === group)

  return (
    <div className="bg-white font-sans">
      {/* ---------- hero: the home hero's arc of glass discs ---------- */}
      <ArcHero
        eyebrow="IT AMC" note="IT Services · Dubai" eyebrowTo="/services/it-services"
        title="IT AMC" accent="Dubai"
        text={<><p className="m-0">IT AMC Services in Dubai for Reliable, Proactive &amp; Business-Focused IT Support. Get your IT Systems Up and Running with our 24/7 dedicated IT AMC Support in Dubai.</p></>}
        nodes={INCLUDED.slice(0, 7).map((i) => ({ label: i.tag, icon: i.icon, onClick: () => document.getElementById('included')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }))}
        actions={<><button type="button" onClick={toContact} className="btn-cubezix cursor-pointer border-0">Book free demo now</button><Link to="/services/it-services" className="btn-cubezix-secondary">All services <ArrowRight size={16} /></Link></>}
      />

      <IndustriesMarquee />

      {/* ---------- overview: the same block every service page opens with ---------- */}
      <TopicOverview
        eyebrow="IT AMC Services in dubai" title="IT Annual Maintenance Contract in Dubai"
        paras={['Our IT AMC ( Annual Maintenance Contract ) is designed to provide you with comprehensive IT support and maintenance. We provide cost-effective and scalable IT AMC in Dubai. Our IT AMC is an annual agreement where an IT provider maintains your organization’s technology infrastructure through preventive maintenance, monitoring, troubleshooting, and technical support. We provide 24/7 dedicated L1, L2, L3 IT support engineers.']}
        keywords={PLANS} icons={[ShieldCheck, Wrench, Headset, Activity, Users, Network]} hubLabel="IT AMC"
        tag="TRANSForm RELIABLY" cta="Request A Callback" onCta={toContact}
      />

      {/* ---------- free assessment ---------- */}
      <section className="px-4 pb-20 sm:px-6 lg:px-12 lg:pb-28">
        <div className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[32px] bg-[#0A1B44] px-6 py-14 text-center sm:px-12">
          <div className="pointer-events-none absolute -left-20 -top-24 size-[380px] rounded-full bg-[radial-gradient(circle,rgba(37,99,255,0.5),transparent_68%)] blur-2xl" aria-hidden />
          <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#fff_1px,transparent_1.4px)] [background-size:26px_26px]" aria-hidden />
          <div className="relative">
            <h2 className="m-0 text-[30px] font-bold leading-[1.12] tracking-tight text-white sm:text-[40px]">Get Your Free IT Assessment Today</h2>
            <p className="m-0 mx-auto mt-4 max-w-[60ch] text-[17px] leading-relaxed text-white/75">A Single Partner For All Your IT needs. Protect Your Business with Reliable IT AMC Services in Dubai.</p>
            <button type="button" onClick={toContact} className="btn-cubezix mt-7 cursor-pointer border-0">Schedule an Appointment</button>
          </div>
        </div>
      </section>

      {/* ---------- what's included: sticky intro + a timeline that fills as you scroll ---------- */}
      <section id="included" className="scroll-mt-24 px-4 pb-20 sm:px-6 lg:px-12 lg:pb-28">
        <div className="relative mx-auto max-w-[1280px] overflow-clip rounded-[36px] bg-gradient-to-br from-[#eef3ff] via-[#f8faff] to-white px-6 py-16 ring-1 ring-[#e6ecfa] sm:px-12 lg:py-24">
          <div className="pointer-events-none absolute -left-24 -top-24 size-[420px] rounded-full bg-[radial-gradient(circle,rgba(37,99,255,0.14),transparent_68%)]" aria-hidden />
          <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1fr] lg:gap-20">
            <div className="lg:sticky lg:top-36 lg:self-start">
              <Head align="left" eyebrow="What’s included" note="12 services" title="IT AMC Services in Dubai to Strengthen and Secure Your Business Infrastructure" sub="By providing IT AMC Services in Dubai we create value across the IT spectrum through deploying innovation, structuring transformation, and unlocking growth for your company." />
              <button type="button" onClick={toContact} className="btn-cubezix mt-8 cursor-pointer border-0">Book free demo now</button>
            </div>

            <div ref={tl} className="relative pl-10 sm:pl-14">
              <span className="absolute bottom-2 left-[11px] top-2 w-[3px] rounded-full bg-[#dfe5f2] sm:left-[15px]" aria-hidden />
              <motion.span className="absolute left-[11px] top-2 w-[3px] rounded-full bg-gradient-to-b from-[#12a5f5] to-[#2563ff] shadow-[0_0_10px_rgba(37,99,255,0.5)] sm:left-[15px]" style={{ height: fillH }} aria-hidden />
              <div className="flex flex-col gap-7">
                {INCLUDED.map(({ tag, text, icon }) => <TimelineCard key={tag} tag={tag} text={text} icon={icon} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- workflow: the road map from the live page ---------- */}
      <section className="px-6 pb-20 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-[1100px]">
          <Head eyebrow="IT AMC" note="8 milestones" title="Our IT AMC Service Workflow" />
          <div className="relative mt-14 flex flex-col gap-5">
            <span className="absolute bottom-10 left-[43px] top-10 hidden border-l-2 border-dashed border-[#b9c8f3] sm:block" aria-hidden />
            {WORKFLOW.map(({ title, text, icon: Icon }, i) => (
              <motion.article
                key={title}
                className="group relative grid gap-5 rounded-[28px] border border-[#e6e9f0] bg-white p-6 transition-all duration-300 hover:border-[#c9d6f5] hover:shadow-[0_28px_60px_-34px_rgba(37,99,255,0.4)] sm:grid-cols-[auto_1fr] sm:items-center sm:gap-7"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.05, ease }}
              >
                <span className="relative z-10 flex size-[72px] items-center justify-center rounded-[22px] bg-gradient-to-br from-[#12a5f5] via-[#2563ff] to-[#3b1ee0] text-white shadow-[0_18px_36px_-14px_rgba(37,99,255,0.6)] transition-transform duration-300 group-hover:scale-105">
                  <Icon size={28} />
                </span>
                <div>
                  <h3 className="m-0 text-[22px] font-semibold tracking-tight text-[#0b1220] sm:text-[24px]">{title}</h3>
                  <p className="m-0 mt-3 max-w-[62ch] text-[16px] leading-[1.7] text-[#667085]">{text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SLA ---------- */}
      <section className="bg-[#f8f9fc] px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1280px]">
          <Head eyebrow="IT AMC" note="SLA" title="IT AMC Service Level Agreement (SLA) in Dubai" sub={SLA_INTRO} />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {SLA.map((s, i) => (
              <motion.article
                key={s.level}
                className={`group flex flex-col rounded-[26px] border border-[#e6e9f0] bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-34px_rgba(20,30,90,0.35)] ${TONE[s.tone].ring}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
              >
                <div className="flex items-center justify-between">
                  <span className={`rounded-full px-3 py-1 text-[12px] font-bold tracking-wide ${TONE[s.tone].chip}`}>Priority · {s.priority}</span>
                  <Zap size={17} className="text-[#f5b301] transition-transform duration-300 group-hover:scale-125" />
                </div>
                <h3 className="m-0 mt-6 text-[26px] font-bold leading-tight tracking-tight text-[#0b1220]">{s.level}</h3>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#eef1f6]" aria-hidden>
                  <motion.div className={`h-full rounded-full bg-gradient-to-r ${TONE[s.tone].bar}`} initial={{ width: 0 }} whileInView={{ width: `${100 - i * 22}%` }} viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.2 + i * 0.1, ease }} />
                </div>
                <p className="m-0 mt-5 text-[15px] leading-[1.65] text-[#667085]">{s.desc}</p>
                <p className="m-0 mt-auto border-t border-[#eef0f5] pt-4 text-[14px] font-semibold leading-snug text-[#0b1220]">{s.owner}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- flexi payment ---------- */}
      <section className="px-6 py-20 lg:px-12 lg:py-28">
        <motion.div
          className="relative mx-auto max-w-[1000px] overflow-hidden rounded-[36px] border border-[#e6e9f0] bg-gradient-to-b from-[#f4f7ff] to-white px-6 py-14 text-center sm:px-14"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="pointer-events-none absolute -right-16 -top-20 size-[320px] rounded-full bg-[radial-gradient(circle,rgba(37,99,255,0.16),transparent_68%)]" aria-hidden />
          <div className="relative">
            <Eyebrow label="Flexi payment" note="Plans" />
            <h2 className="m-0 mt-6 text-[32px] font-bold leading-[1.12] tracking-tight text-[#0b1220] sm:text-[42px]">IT AMC with Flexible Payment Options</h2>
            <p className="m-0 mx-auto mt-5 max-w-[60ch] text-[16.5px] leading-[1.7] text-[#667085]">
              We understand that businesses have varying financial strategies and cash flow considerations. To accommodate this, we offer Flexi Payment Plans for our IT Annual Maintenance Contracts (AMC). These plans are tailored to provide you with the flexibility to choose a payment structure that aligns with your budget and financial planning.
            </p>
            <button type="button" onClick={toContact} className="btn-cubezix mt-8 cursor-pointer border-0">Book free demo now</button>
          </div>
        </motion.div>
      </section>

      {/* ---------- what a contract covers ---------- */}
      <section className="px-4 pb-20 sm:px-6 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-[1280px] rounded-[36px] bg-[#f7f9fd] px-6 py-16 ring-1 ring-[#e9eef8] sm:px-12 lg:py-20">
          <Head eyebrow="IT AMC includes" note={`${COVERAGE.length} coverage areas`} title="One IT AMC for Your Complete Technology Environment" sub="Simplify IT management with one comprehensive AMC covering your complete technology environment." />
          <div className="mt-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Coverage areas">
            {COVERAGE_GROUPS.map((g) => (
              <button
                key={g}
                type="button"
                role="tab"
                aria-selected={group === g}
                onClick={() => setGroup(g)}
                className={`cursor-pointer rounded-full border px-4 py-2 text-[14px] font-semibold transition-all ${group === g ? 'border-transparent bg-gradient-to-r from-[#12a5f5] via-[#2563ff] to-[#3b1ee0] text-white shadow-[0_12px_24px_-12px_rgba(37,99,255,0.6)]' : 'border-[#dfe6f6] bg-white text-[#475467] hover:border-[#2563ff] hover:text-[#2563ff]'}`}
              >
                {g}
              </button>
            ))}
          </div>
          <motion.div layout className={`mt-10 ${GRID}`}>
            <AnimatePresence mode="popLayout">
              {shown.map(({ title, text, icon: Icon }, k) => (
                <motion.article
                  layout
                  key={title}
                  className={`${span(k, shown.length).cls} ${span(k, shown.length).wide ? 'lg:flex-row lg:items-center lg:gap-8 ' : ''}group flex flex-col rounded-[24px] border border-[#e6e9f0] bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#c9d6f5] hover:shadow-[0_28px_60px_-34px_rgba(37,99,255,0.4)]`}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, ease }}
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-[#eef3ff] text-[#2563ff] transition-colors duration-300 group-hover:bg-[#2563ff] group-hover:text-white"><Icon size={22} /></span>
                  <h3 className="m-0 mt-5 text-[19px] font-semibold leading-snug tracking-tight text-[#0b1220]">{title}</h3>
                  <p className="m-0 mt-2 text-[14.5px] leading-relaxed text-[#667085]">{text}</p>
                  <button type="button" onClick={toContact} className="mt-auto inline-flex w-fit cursor-pointer items-center gap-2 border-0 bg-transparent p-0 pt-5 text-[14.5px] font-semibold text-[#2563ff]">
                    Ask about this <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ---------- switching providers ---------- */}
      <section className="px-6 pb-20 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-[1180px]">
          <Head eyebrow="HOW IT WORKS" note="3 steps" title="Switching IT AMC Providers Without Business Disruption" sub="CubeZix follows a structured transition process designed to minimize service interruption." />
          <div className="mt-14 grid overflow-hidden rounded-[28px] border border-dashed border-[#c9d6f5] bg-[#fafbff] md:grid-cols-3">
            {SWITCH_STEPS.map(({ title, text, tags, icon: Icon }, i) => (
              <motion.div
                key={title}
                className={`group flex flex-col p-8 transition-colors hover:bg-white ${i > 0 ? 'border-t border-dashed border-[#c9d6f5] md:border-l md:border-t-0' : ''}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-[#eef3ff] text-[#2563ff] transition-all duration-300 group-hover:bg-[#2563ff] group-hover:text-white"><Icon size={22} /></span>
                  <span className="text-[13px] font-bold tracking-wider text-[#b3bccf]">0{i + 1}</span>
                </div>
                <h3 className="m-0 mt-8 text-[22px] font-semibold leading-snug tracking-tight text-[#0b1220]">{title}</h3>
                <p className="m-0 mt-3 text-[15px] leading-[1.7] text-[#667085]">{text}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {tags.map((t) => <span key={t} className="rounded-lg border border-[#e3e9f8] bg-white px-2.5 py-1 text-[12px] text-[#667085]">{t}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center"><button type="button" onClick={toContact} className="btn-cubezix cursor-pointer border-0">Switch Your IT AMC to CubeZix</button></div>
        </div>
      </section>

      {/* ---------- managed service provider ---------- */}
      <section className="px-4 pb-20 sm:px-6 lg:px-12 lg:pb-28">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
            <Eyebrow label="Ready To Unlock Your IT AMC Plan?" />
            <h2 className="m-0 mt-6 text-[34px] font-bold leading-[1.1] tracking-tight text-[#0b1220] sm:text-[44px]">Managed IT AMC Service Provider in Dubai</h2>
            <button type="button" onClick={toContact} className="btn-cubezix mt-8 cursor-pointer border-0">Contact Us</button>
          </motion.div>

          {/* a browser window with the three things the contract is built on, as live cursors */}
          <motion.div
            className="relative overflow-hidden rounded-[40px] bg-[#f3f6fd] shadow-[0_40px_90px_-50px_rgba(37,99,255,0.55)] ring-1 ring-[#e3eaf9]"
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="relative pt-[11%] [mask-image:linear-gradient(to_bottom,#000_72%,transparent_100%)]">
            {/* soft, blurred colour behind the window */}
            <div className="pointer-events-none absolute -left-[8%] -top-[4%] size-[56%] rounded-full bg-[#4aa8ff] opacity-95 blur-[60px]" aria-hidden />
            <div className="pointer-events-none absolute left-[26%] -top-[10%] h-[40%] w-[62%] rounded-full bg-[#2150e8] opacity-90 blur-[60px]" aria-hidden />
            <div className="pointer-events-none absolute -right-[10%] -top-[4%] size-[40%] rounded-full bg-[#7a6bff] opacity-80 blur-[60px]" aria-hidden />
            <div className="pointer-events-none absolute -left-[6%] top-[38%] h-[40%] w-[30%] rounded-full bg-[#5cc3ff] opacity-60 blur-[60px]" aria-hidden />

            <div className="relative ml-[9%] rounded-tl-[26px] border-l border-t border-white/80 bg-[#f6f8fd]/80 pb-[18%] shadow-[0_-18px_50px_-18px_rgba(37,99,255,0.45)] backdrop-blur-2xl">
              <div className="flex items-center gap-2 px-5 py-3.5">
                <i className="size-3 rounded-full bg-[#ff6159]" /><i className="size-3 rounded-full bg-[#ffbd2e]" /><i className="size-3 rounded-full bg-[#28c940]" />
                <span className="ml-auto mr-4 flex items-center gap-1.5 text-[13px] font-medium text-[#8a91a1]"><svg width="11" height="12" viewBox="0 0 11 12" fill="none" aria-hidden><rect x="1" y="5" width="9" height="6.5" rx="1.5" fill="#a9afbd" /><path d="M3 5V3.5a2.5 2.5 0 015 0V5" stroke="#a9afbd" strokeWidth="1.4" /></svg>cubezix.com</span>
              </div>
              <div className="px-5 pb-6 pt-2 sm:px-8">
                <div className="flex -space-x-2.5">
                  {['L1', 'L2', 'L3'].map((t, i) => <span key={t} className={`flex size-9 items-center justify-center rounded-full border-2 border-white text-[11px] font-bold text-white ${['bg-[#12a5f5]', 'bg-[#6a5af9]', 'bg-[#12a37a]'][i]}`}>{t}</span>)}
                </div>
                <div className="relative mt-9 text-[clamp(28px,4.6vw,46px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#1d1f27]">
                  <div>Proactive, reliable,</div>
                  <div className="relative mt-1 inline-block px-1.5 outline outline-1 outline-[#2563ff]">
                    and experienced
                    {[['-left-1 -top-1'], ['-right-1 -top-1'], ['-left-1 -bottom-1'], ['-right-1 -bottom-1']].map(([c]) => <i key={c} className={`absolute size-[7px] border border-[#2563ff] bg-white ${c}`} />)}
                  </div>
                </div>

                {/* the three cursors */}
                <span className="amc-float absolute left-[6%] top-[66%] flex items-start gap-0.5" style={{ animationDelay: '0s' }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden className="-mr-1 mt-3 -rotate-12"><path d="M3 2l15 7-6 2-2 6z" fill="#8b6cf6" /></svg>
                  <b className="rounded-full bg-[#e6dcff] px-3.5 py-1.5 text-[14px] font-semibold text-[#5b3fc4] shadow-[0_10px_20px_-10px_rgba(91,63,196,0.6)] ring-1 ring-white">Dedicated IT Support Engineer</b>
                </span>
                <span className="amc-float absolute right-[6%] top-[19%] flex items-start gap-0.5" style={{ animationDelay: '-1.6s' }}>
                  <b className="rounded-full bg-[#d8f6c8] px-3.5 py-1.5 text-[14px] font-semibold text-[#3c9a2a] shadow-[0_10px_20px_-10px_rgba(60,154,42,0.6)] ring-1 ring-white">Network Support</b>
                  <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden className="mt-4 rotate-[100deg]"><path d="M3 2l15 7-6 2-2 6z" fill="#7fd35f" /></svg>
                </span>
                <span className="amc-float absolute bottom-[26%] right-[4%] flex items-start gap-0.5" style={{ animationDelay: '-3.2s' }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden className="mr-0.5 mt-[-6px] -rotate-45"><path d="M3 2l15 7-6 2-2 6z" fill="#f0b45a" /></svg>
                  <b className="rounded-full bg-[#fde4b3] px-3.5 py-1.5 text-[14px] font-semibold text-[#a8691a] shadow-[0_10px_20px_-10px_rgba(168,105,26,0.6)] ring-1 ring-white">Data Backup and Recovery</b>
                </span>
              </div>
            </div>

            </div>

            <div className="relative px-7 pb-10 pt-3 text-center sm:px-10">
              <p className="m-0 text-[15.5px] leading-[1.7] text-[#5b6475]">
                Every company that leverages IT and cloud infrastructure to manage their operations requires a proactive, reliable, and experienced IT AMC (Annual Maintenance Contract) provider in Dubai, UAE. With a team of highly experienced, skilled, and certified IT Support engineers, we possess the capability to cater to the diverse needs of companies through our IT Annual Maintenance Contracts.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- industries ---------- */}
      <section className="px-6 pb-20 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-[1180px]">
          <Head eyebrow="INDUSTRIES" note="10 sectors" title="IT AMC For Businesses Across UAE" sub="CubeZix provides industry-specific IT AMC services in Dubai, tailored to the technology, security, connectivity, and uptime requirements of each business environment." />
          <div className={`mt-12 ${GRID}`}>
            {INDUSTRIES.map(({ label, text, icon: Icon }, i) => (
              <motion.div
                key={label}
                className={`${span(i, INDUSTRIES.length).cls} ${span(i, INDUSTRIES.length).wide ? 'lg:flex-row lg:items-center lg:gap-8 ' : ''}group flex flex-col rounded-[24px] border border-[#e6e9f0] bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#c9d6f5] hover:shadow-[0_24px_50px_-30px_rgba(37,99,255,0.4)]`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease }}
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[#eef3ff] text-[#2563ff] transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#12a5f5] group-hover:to-[#3b1ee0] group-hover:text-white"><Icon size={22} /></span>
                <h3 className="m-0 mt-5 text-[19px] font-semibold leading-snug tracking-tight text-[#0b1220]">{label}</h3>
                <p className="m-0 mt-2 text-[14.5px] leading-relaxed text-[#667085]">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FAQ: the home page's FAQ block ---------- */}
      {(() => {
        const g = groupFaqs(QA.map((f) => ({ q: f.q, a: f.a })))
        return <div className="-mt-10 lg:-mt-14"><FaqSection cats={g.cats} items={g.items} note="IT AMC" /></div>
      })()}

      {/* ---------- related ---------- */}
      <section className="px-6 py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1180px]">
          <Head eyebrow="Keep exploring" note="Related services" title="Services that pair well with this one" />
          <PocketCards items={['it-support', 'it-helpdesk', 'backup-dr'].map(pageById).filter((r) => !!r).map((r) => ({
            to: pagePath(r!), title: r!.title, icon: r!.ic[0], kicker: 'IT Services',
            tags: (LIVE[r!.id]?.sections.find((x) => x.list.length >= 2)?.list ?? []).filter((t) => t.length <= 26),
            text: LIVE[r!.id]?.hero[0] ?? '',
          }))} />
        </div>
      </section>

      <Testimonials />
      <ContactSection />
    </div>
  )
}
