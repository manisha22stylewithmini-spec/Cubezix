import IndustriesMarquee from '../components/IndustriesMarquee'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowUpRight, Mail } from 'lucide-react'
import Eyebrow from '../components/Eyebrow'
import ContactSection from '../components/sections/ContactSection'
import { CATEGORIES, categoryBySlug, categoryPath, type Category } from '../data/services'
import ArcHero from '../components/ArcHero'
import Testimonials from '../components/sections/Testimonials'
import Placeholder from './Placeholder'
import PocketCards from '../components/PocketCards'
import TopicOverview from '../components/TopicOverview'
import GlassFolder, { type ArtRecipe } from '../components/ui/glass-folder-cards'

const FOLDER_W = 260
/* the folder artwork, painted in the brand's blue and indigo instead of the stock palettes */
const FOLDER_ART: ArtRecipe[] = [
  { style: 'streak', colors: ['#f4f8ff', '#cfe0ff', '#6aa3ff', '#2563ff', '#1b2e86', '#7fd2ff', '#eef5ff'], scale: 0.7, warp: 1.4, angle: -0.62, gloss: 0.2, veins: 0 },
  { style: 'marble', colors: ['#050b1e', '#10286b', '#2563ff', '#0a1b44', '#12a5f5', '#7fd2ff', '#e8f3ff'], scale: 0.65, warp: 3.2, angle: -0.5, gloss: 0.5, veins: 0.5 },
  { style: 'marble', colors: ['#0c0a2a', '#2b1f8f', '#6a5af9', '#14123e', '#12a5f5', '#a9c4ff', '#f1f4ff'], scale: 0.75, warp: 3.5, angle: 0.8, gloss: 0.5, veins: 0.45 },
  { style: 'streak', colors: ['#f7fbff', '#d6ecff', '#8cc8ff', '#e7f1ff', '#6aa3ff', '#ffffff'], scale: 0.7, warp: 1.6, angle: 0.35, gloss: 0.25, veins: 0 },
]

const toContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

const ease = [0.2, 0.7, 0.2, 1] as const

/** "Are you running into these problems?": three pain points per category */
const PROBLEMS: Record<string, [string, string][]> = {
  'it-services': [
    ['Slow, reactive support', 'Tickets sit for days while your team waits and systems stay down.'],
    ['Unpredictable IT costs', 'Break-fix bills and surprise purchases make IT spend hard to plan.'],
    ['Gaps in coverage', 'Backups, patching and monitoring depend on one person, or get missed.'],
  ],
  'it-infrastructure': [
    ['An office that outgrew its network', 'Slow Wi-Fi, dropped links and ageing cabling hold everyone back.'],
    ['Messy, undocumented setups', 'Mixed vendors and unlabelled racks make every change a risk.'],
    ['Projects that disrupt the business', 'Moves, upgrades and new offices stall the day-to-day work.'],
  ],
  'elv-security': [
    ['Blind spots on site', 'Cameras that miss entrances, or footage too poor to be of any use.'],
    ['Systems that are not compliant', 'Installations that do not meet SIRA requirements or approval.'],
    ['Too many contractors', 'Cabling, phones and CCTV from different vendors, and nobody accountable.'],
  ],
  'business-applications': [
    ['Work stuck in spreadsheets', 'Manual tracking that is slow, error-prone and hard to share.'],
    ['Tools that do not talk to each other', 'Sales, HR and finance data live in separate places.'],
    ['Software nobody uses', 'Systems that are rolled out, but never really adopted by the team.'],
  ],
}

function Row({ svc }: { svc: Category['services'][number] }) {
  const Icon = svc.icon
  return (
    <>
      <span className="flex items-start gap-5">
        <span className="mt-1 flex size-11 flex-none items-center justify-center rounded-2xl bg-[#eef3ff] text-[#2563ff] transition-colors group-hover:bg-[#2563ff] group-hover:text-white">
          <Icon size={20} />
        </span>
        <h3 className="m-0 pt-1 text-[22px] font-semibold leading-snug tracking-tight text-[#0b1220] transition-colors group-hover:text-[#2563ff] sm:text-[26px]">{svc.title}</h3>
      </span>
      <span className="flex items-start justify-between gap-4 pl-[64px] md:pl-0 md:pt-2">
        <span className="text-[15px] leading-[1.65] text-[#667085]">{svc.desc}</span>
        <ArrowUpRight size={18} className="mt-1 flex-none text-[#b3bccf] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#2563ff]" />
      </span>
    </>
  )
}

export default function ServiceCategory({ slug }: { slug: string }) {
  const c = categoryBySlug(slug)
  if (!c) return <Placeholder title="Page not found" />

  return (
    <div className="bg-white font-sans">
      {/* ---------- hero: the home hero's arc of glass discs, one per service ---------- */}
      <ArcHero
        eyebrow={c.label} note={c.eyebrowNote}
        title={c.title} accent={c.accent} text={c.intro}
        nodes={c.services.slice(0, 7).map((svc) => ({ label: svc.title, icon: svc.icon, to: svc.to ?? `#${svc.id}` }))}
        actions={
          <form className="flex w-full max-w-[500px] items-center gap-2 rounded-full bg-white p-1.5 pl-5 shadow-[0_18px_40px_-22px_rgba(20,30,90,0.4)] ring-1 ring-[#e6e9f0]" onSubmit={(e) => { e.preventDefault(); toContact() }}>
            <Mail size={16} className="flex-none text-[#8a91a1]" />
            <input type="email" required placeholder="Your work email" aria-label="Email" className="h-11 min-w-0 flex-1 border-0 bg-transparent text-[14.5px] text-[#0b1220] outline-none placeholder:text-[#9aa1b2]" />
            <button type="submit" className="btn-cubezix !h-11 cursor-pointer border-0 !px-5 !text-[14px]">Get started</button>
          </form>
        }
      />

      <IndustriesMarquee />

      {/* ---------- problems ---------- */}
      <section className="px-6 pt-20 lg:px-12 lg:pt-28">
        <div className="mx-auto max-w-[1180px]">
          <motion.div
            className="mx-auto flex max-w-2xl flex-col items-center text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <Eyebrow label="Common challenges" note="Sound familiar?" />
            <h2 className="m-0 mt-6 text-[34px] font-bold leading-[1.1] tracking-tight text-[#0b1220] sm:text-[44px]">Are you running into these problems?</h2>
            <p className="m-0 mt-4 text-[17px] leading-relaxed text-[#667085]">The three things we hear most before a team asks us for help.</p>
          </motion.div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {(PROBLEMS[c.slug] ?? PROBLEMS['it-services']).map(([t, d], i) => (
              <motion.div
                key={t}
                className="flex min-h-[210px] flex-col rounded-[26px] border border-[#e6e9f0] bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#c9d6f5] hover:shadow-[0_28px_60px_-30px_rgba(37,99,255,0.35)]"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-[#eef3ff] text-[13px] font-bold tracking-wider text-[#2563ff]">0{i + 1}</span>
                <h3 className="m-0 mt-6 text-[21px] font-semibold leading-snug tracking-tight text-[#0b1220]">{t}</h3>
                <p className="m-0 mt-2 text-[15px] leading-relaxed text-[#5b6475]">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- what we can do: one row per service ---------- */}
      <section id="services" className="scroll-mt-20 bg-white px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1180px]">
          <motion.div
            className="mx-auto flex max-w-2xl flex-col items-center text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <Eyebrow label="Our services" note={`${c.services.length} services`} />
            <h2 className="m-0 mt-6 text-[34px] font-bold leading-[1.1] tracking-tight text-[#0b1220] sm:text-[44px]">{c.servicesTitle}</h2>
            <p className="m-0 mt-4 text-[17px] leading-relaxed text-[#667085]">{c.servicesIntro}</p>
          </motion.div>
          <div className="mt-14 overflow-hidden rounded-[30px] border border-[#e6e9f0] bg-white shadow-[0_30px_70px_-44px_rgba(37,99,255,0.35)]">
            {c.services.map((svc, i) => (
              <motion.article
                id={svc.id}
                key={svc.id}
                className="group scroll-mt-28 border-b border-[#eef0f5] transition-colors hover:bg-[#f7f9ff]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.05, ease }}
              >
                {svc.to ? (
                  <Link to={svc.to} className="grid cursor-pointer gap-3 px-6 py-7 no-underline sm:px-10 md:grid-cols-[1.05fr_1fr] md:gap-12">
                    <Row svc={svc} />
                  </Link>
                ) : (
                  <button type="button" onClick={toContact} className="grid w-full cursor-pointer gap-3 border-0 bg-transparent px-6 py-7 text-left sm:px-10 md:grid-cols-[1.05fr_1fr] md:gap-12">
                    <Row svc={svc} />
                  </button>
                )}
              </motion.article>
            ))}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-[#12a5f5] via-[#2563ff] to-[#3b1ee0] px-6 py-6 sm:px-10">
              <span className="text-[24px] font-semibold leading-tight tracking-tight text-white sm:text-[28px]">Free consultation</span>
              <button type="button" onClick={toContact} className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full border border-white/60 bg-transparent px-6 text-[15px] font-semibold text-white transition-colors hover:bg-white hover:text-[#2563ff]">
                Schedule a free call <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- blocks: folders on a dotted desk ---------- */}
      <section className="px-4 pb-20 sm:px-6 lg:px-12 lg:pb-28">
        <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[36px] bg-[#f3f5fa] px-6 py-16 sm:px-12 lg:py-20">
          <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(#28469b_1.1px,transparent_1.4px)] [background-size:22px_22px]" aria-hidden />
          <div className="pointer-events-none absolute -left-24 -top-28 size-[420px] rounded-full bg-[radial-gradient(circle,rgba(37,99,255,0.14),transparent_68%)]" aria-hidden />
          <div className="relative">
            <motion.div
              className="mx-auto max-w-2xl text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center rounded-full border border-[#dfe6f6] bg-white px-3.5 py-1.5 text-[13px] font-semibold text-[#2563ff]">Why CubeZix</span>
              <h2 className="m-0 mt-5 text-[32px] font-bold leading-[1.12] tracking-tight text-[#0b1220] sm:text-[42px]">{c.blocksTitle}</h2>
            </motion.div>
            <div className="mt-14 grid grid-cols-1 justify-items-center gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-4">
              {c.blocks.map(({ icon: Icon, title, text }, i) => (
                <motion.div
                  key={title}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.09, ease }}
                >
                  <GlassFolder
                    width={FOLDER_W}
                    tone="light"
                    art={FOLDER_ART[i % FOLDER_ART.length]}
                    seed={11 + i * 7}
                    action="none"
                    labelPlacement={i % 2 ? 'top-left' : 'bottom-left'}
                    appearDelay={i * 120}
                    label={title}
                    meta={`0${i + 1} / 0${c.blocks.length}`}
                    files={[
                      { name: c.label, meta: 'CubeZix', art: FOLDER_ART[(i + 1) % FOLDER_ART.length] },
                      { name: title, meta: `0${i + 1}` },
                    ]}
                  />
                  <div className="mt-3 flex max-w-[260px] flex-col items-start">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#12a5f5] to-[#3b1ee0] text-white shadow-lg shadow-blue-500/30"><Icon size={18} /></span>
                    <p className="m-0 mt-3 text-[14.5px] leading-relaxed text-[#667085]">{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- our approach: the same overview block as the service pages ---------- */}
      <TopicOverview
        eyebrow="Our approach" title={c.photoTitle} paras={[c.photoText]}
        keywords={c.services.slice(0, 7).map((x) => x.title)} icons={c.services.map((x) => x.icon)} hubLabel={c.label}
        tag={c.eyebrowNote} cta="Talk to an engineer" onCta={toContact}
      />

      {/* ---------- testimonials: the same section as the home page ---------- */}
      {/* ---------- other service lines ---------- */}
      <section className="px-6 py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <Eyebrow label="Keep exploring" note="Other service lines" />
            <h2 className="m-0 mt-6 text-[34px] font-bold leading-[1.1] tracking-tight text-[#0b1220] sm:text-[44px]">More from CubeZix</h2>
          </div>
          <PocketCards cta="View service line" items={CATEGORIES.filter((x) => x.slug !== c.slug).map((x) => ({
            to: categoryPath(x.slug), title: x.label, icon: x.services[0].icon, kicker: x.eyebrowNote,
            tags: x.services.slice(0, 3).map((v) => v.title).filter((t) => t.length <= 26), text: x.intro,
          }))} />
        </div>
      </section>

      <Testimonials />

      {/* ---------- contact ---------- */}
      <ContactSection />
    </div>
  )
}
