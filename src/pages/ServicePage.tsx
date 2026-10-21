import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowRight, ArrowUpRight, ChevronDown, Phone, Sparkles } from 'lucide-react'
import Eyebrow from '../components/Eyebrow'
import TimelineCard from '../components/TimelineCard'
import IndustriesMarquee from '../components/IndustriesMarquee'
import PocketCards from '../components/PocketCards'
import TopicOverview from '../components/TopicOverview'
import { GRID, span } from '../lib/gridSpan'
import { groupFaqs } from '../data/faqGroups'
import FaqSection, { type FaqBlock } from '../components/FaqSection'
import ArcHero from '../components/ArcHero'
import ContactSection from '../components/sections/ContactSection'
import Testimonials from '../components/sections/Testimonials'
import { categoryBySlug } from '../data/services'
import { LIVE } from '../data/pages/live'
import type { LivePage, LiveSection } from '../data/pages/types'
import { pageById, pagePath, PAGES, type SvcPage } from '../data/pages'

const ease = [0.2, 0.7, 0.2, 1] as const
const toContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

const PHOTOS: Record<SvcPage['cat'], [string, string]> = {
  'it-services': ['/assets/blog-detail-hero.jpg', '/assets/about-company-photo.jpg'],
  'it-infrastructure': ['/assets/about-company-photo.jpg', '/assets/consult-expertise.jpg'],
  'elv-security': ['/assets/blog-detail-hero.jpg', '/assets/consult-tailored.jpg'],
  'business-applications': ['/assets/consult-discovery.jpg', '/assets/how-we-work.png'],
}

/** Eyebrow + title + sub-line, the same header every section of the site uses */
export function Head({ eyebrow, note, title, sub, align = 'center' }: { eyebrow?: string; note?: string; title: string; sub?: string; align?: 'center' | 'left' }) {
  const c = align === 'center'
  return (
    <motion.div
      className={`flex max-w-2xl flex-col ${c ? 'mx-auto items-center text-center' : 'items-start text-left'}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7 }}
    >
      {eyebrow && <Eyebrow label={eyebrow} note={note} />}
      <h2 className={`m-0 text-[34px] font-bold leading-[1.1] tracking-tight text-[#0b1220] sm:text-[44px] ${eyebrow ? 'mt-6' : ''}`}>{title}</h2>
      {sub && <p className="m-0 mt-4 text-[17px] leading-relaxed text-[#667085]">{sub}</p>}
    </motion.div>
  )
}

/** two-tone headline: the original words, split only for the colour */
function splitH1(h: string): [string, string] {
  const w = h.split(' ')
  const k = Math.max(1, Math.round(w.length * 0.45))
  return [w.slice(0, k).join(' '), w.slice(k).join(' ')]
}

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.18'/%3E%3C/svg%3E")`
const TABS = [
  { tab: '#5b7cfa', tint: 'rgba(91,124,250,0.20)' },
  { tab: '#c77dff', tint: 'rgba(199,125,255,0.22)' },
  { tab: '#12a5f5', tint: 'rgba(18,165,245,0.20)' },
  { tab: '#8b6cf6', tint: 'rgba(139,108,246,0.22)' },
  { tab: '#3b82f6', tint: 'rgba(59,130,246,0.20)' },
  { tab: '#e879f9', tint: 'rgba(232,121,249,0.18)' },
]

/** A document folder: a coloured sheet sits in the pocket and slides up on hover; the title is set large,
    the card fades into its own colour at the bottom. */
function FolderCard({ i, title, text, label, icon: Icon, cls = '' }: { cls?: string; i: number; title: string; text: string; label: string; icon: SvcPage['ic'][number] }) {
  const c = TABS[i % TABS.length]
  return (
    <motion.article
      className={`group relative pt-[82px] ${cls}`}
      initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, delay: (i % 3) * 0.07, ease }}
    >
      {/* the sheet in the pocket */}
      <div className="absolute inset-x-[13%] top-0 z-0 h-32 rounded-t-[22px] border-[10px] border-b-0 bg-[#f7f7fa] px-4 pt-3 transition-transform duration-500 ease-out group-hover:-translate-y-3" style={{ borderColor: c.tab }}>
        <div className="flex items-center gap-2 text-[14px] font-semibold text-[#5b6070]"><Icon size={15} style={{ color: c.tab }} />{label}</div>
        <div className="mt-3 grid grid-cols-3 gap-2.5"><i className="h-1.5 rounded-full bg-[#dcdde4]" /><i className="h-1.5 rounded-full bg-[#dcdde4]" /><i className="h-1.5 rounded-full bg-[#dcdde4]" /></div>
        <div className="mt-1.5 grid grid-cols-3 gap-2.5"><i className="h-1.5 w-2/3 rounded-full bg-[#e6e7ec]" /><i className="h-1.5 w-1/2 rounded-full bg-[#e6e7ec]" /><i className="h-1.5 w-3/5 rounded-full bg-[#e6e7ec]" /></div>
      </div>
      {/* the folder front */}
      <div className="relative z-10 flex h-full min-h-[300px] flex-col overflow-hidden rounded-[30px] p-7 pt-10 shadow-[0_30px_60px_-38px_rgba(30,40,100,0.45)] ring-1 ring-white transition-transform duration-500 group-hover:-translate-y-1"
        style={{ background: `linear-gradient(180deg, #ffffff 0%, #fbfbfd 46%, ${c.tint} 100%)` }}>
        <span className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply" style={{ backgroundImage: NOISE }} aria-hidden />
        <h3 className="relative m-0 text-[26px] font-bold leading-[1.15] tracking-[-0.01em] text-[#2a2d38]">{title}</h3>
        <p className="relative m-0 mt-3 text-[15px] leading-relaxed text-[#667085]">{text}</p>
        <div className="relative mt-auto flex items-end justify-between pt-8">
          <span className="text-[15px] font-medium text-[#6b7080]">0{i + 1}</span>
          <button type="button" aria-label={`Request A Callback about ${title}`} onClick={toContact} className="flex size-10 cursor-pointer items-center justify-center rounded-full border-0 bg-white/80 text-[#2563ff] shadow-[0_8px_18px_-10px_rgba(37,99,255,0.6)] transition-all duration-300 group-hover:bg-[#2563ff] group-hover:text-white"><ArrowRight size={16} /></button>
        </div>
      </div>
    </motion.article>
  )
}

const Paras = ({ list, center = false }: { list: string[]; center?: boolean }) => (
  <>{list.map((t, i) => <p key={`${i}`} className={`m-0 mt-4 text-[16.5px] leading-[1.7] text-[#667085] ${center ? 'mx-auto max-w-[70ch] text-center' : ''}`}>{t}</p>)}</>
)
const Chips = ({ list, center = false }: { list: string[]; center?: boolean }) => (
  <div className={`mt-6 flex flex-wrap gap-2 ${center ? 'justify-center' : ''}`}>
    {list.map((c, i) => <span key={`${c}-${i}`} className="rounded-full border border-[#dfe6f6] bg-[#f7f9ff] px-3.5 py-1.5 text-[13px] font-semibold text-[#3b4a6b] transition-colors hover:border-[#2563ff] hover:text-[#2563ff]">{c}</span>)}
  </div>
)

export default function ServicePage() {
  const { cat, slug } = useParams()
  const page = PAGES.find((p) => p.id === slug && p.cat === cat)
  if (!page || !LIVE[page.id]) return <Navigate to="/services" replace />
  return <PageBody key={page.id} p={page} live={LIVE[page.id]} />
}

type Shape = 'cta' | 'story' | 'cards'
const shapeOf = (s: LiveSection): Shape =>
  s.cards.length ? 'cards' : !s.list.length && s.paras.length <= 1 && (s.paras[0]?.length ?? 0) < 150 ? 'cta' : 'story'

function PageBody({ p, live }: { p: SvcPage; live: LivePage }) {
  const category = categoryBySlug(p.cat)!
  const photos = PHOTOS[p.cat]
  const Ic = (i: number) => p.ic[i % p.ic.length]

  const tl = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: tl, offset: ['start 65%', 'end 70%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const fillH = useTransform(fill, (v) => `${Math.max(0, Math.min(1, v)) * 100}%`)
  const [q, setQ] = useState(0)
  /* the page's first call-to-action band sits right after the intro, before the cards of services */
  const ordered = (() => {
    const a = [...live.sections]
    const ci = a.findIndex((x) => shapeOf(x) === 'cta')
    const wi = a.findIndex((x) => shapeOf(x) === 'cards')
    if (ci > wi && wi >= 0) a.splice(wi, 0, a.splice(ci, 1)[0])
    return a
  })()
  const first = live.sections.find((s) => s.list.length >= 3) ?? live.sections.find((s) => s.cards.length >= 3)
  const nodeLabels = (first ? (first.list.length >= 3 ? first.list : first.cards.map((c) => c.t)) : []).slice(0, 7)
  const firstStory = live.sections.find((x) => shapeOf(x) === 'story')
  /* the keywords the overview shows: the section's own list, else the page's main points */
  const keywords = (firstStory && firstStory.list.length >= 2 ? firstStory.list : nodeLabels).slice(0, 7)

  const [h1a, h1b] = splitH1(live.h1)
  const related = p.related.map(pageById).filter(Boolean) as SvcPage[]

  let story = 0
  let timeline = 0
  /* the folder-card design is used once per page: on the benefits-style listing */
  const stepsLike = (x: LiveSection) => /^step\b/i.test(x.cards[0]?.t ?? '') || (/transition|streamlined|workflow|process/i.test(x.title) && x.cards.length <= 6)
  let tlSeen = false
  const candidates: number[] = []
  ordered.forEach((x, i) => {
    if (shapeOf(x) !== 'cards' || stepsLike(x)) return
    if (!tlSeen && x.cards.length >= 4 && x.cards.length <= 13) { tlSeen = true; return }
    candidates.push(i)
  })
  const folderIdx = candidates.find((i) => /benefit|why |advantage|feature|reason/i.test(ordered[i].title)) ?? candidates[0] ?? -1

  const sections = ordered.map((s, i) => {
    const shape = shapeOf(s)
    const key = `${s.title}-${i}`

    /* ---- a short headline with a button ---- */
    if (shape === 'cta') {
      return (
        <section key={key} className="px-4 pb-12 sm:px-6 lg:px-12 lg:pb-16">
          <div className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[32px] bg-[#0A1B44] px-6 py-14 text-center sm:px-12">
            <div className="pointer-events-none absolute -left-20 -top-24 size-[380px] rounded-full bg-[radial-gradient(circle,rgba(37,99,255,0.5),transparent_68%)] blur-2xl" aria-hidden />
            <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#fff_1px,transparent_1.4px)] [background-size:26px_26px]" aria-hidden />
            <motion.div className="relative" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7 }}>
              <h2 className="m-0 text-[30px] font-bold leading-[1.12] tracking-tight text-white sm:text-[40px]">{s.title}</h2>
              {s.paras[0] && <p className="m-0 mx-auto mt-4 max-w-[60ch] text-[17px] leading-relaxed text-white/75">{s.paras[0]}</p>}
              <button type="button" onClick={toContact} className="btn-cubezix mt-7 cursor-pointer border-0">{s.cta || 'Schedule an Appointment'}</button>
            </motion.div>
          </div>
        </section>
      )
    }

    /* ---- text (and chips): the first one gets the photos ---- */
    if (shape === 'story') {
      const n = story++
      if (n === 0) {
        return <TopicOverview key={key} eyebrow={s.eyebrow} title={s.title} paras={s.paras} keywords={keywords} icons={p.ic} hubLabel={p.title} tag={live.tag} cta={s.cta || 'Request A Callback'} onCta={toContact} />
      }
      return (
        <section key={key} className="px-6 pb-12 lg:px-12 lg:pb-16">
          <motion.div className="relative mx-auto max-w-[1000px] overflow-hidden rounded-[36px] border border-[#e6e9f0] bg-gradient-to-b from-[#f4f7ff] to-white px-6 py-14 text-center sm:px-14" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease }}>
            <div className="pointer-events-none absolute -right-16 -top-20 size-[320px] rounded-full bg-[radial-gradient(circle,rgba(37,99,255,0.16),transparent_68%)]" aria-hidden />
            <div className="relative">
              {s.eyebrow && <Eyebrow label={s.eyebrow} className="mx-auto" />}
              <h2 className="m-0 mt-6 text-[30px] font-bold leading-[1.12] tracking-tight text-[#0b1220] sm:text-[40px]">{s.title}</h2>
              <Paras list={s.paras} center />
              {s.list.length > 0 && <Chips list={s.list} center />}
              {s.cta && <button type="button" onClick={toContact} className="btn-cubezix mt-8 cursor-pointer border-0">{s.cta}</button>}
            </div>
          </motion.div>
        </section>
      )
    }

    /* ---- cards: the first block gets the scroll-filled timeline, step lists the numbered cards, the rest a grid ---- */
    const isSteps = /^step\b/i.test(s.cards[0].t) || (/transition|streamlined|workflow|process/i.test(s.title) && s.cards.length <= 6)
    const useTimeline = !isSteps && timeline === 0 && s.cards.length >= 4 && s.cards.length <= 13
    if (useTimeline) timeline++

    if (useTimeline) {
      return (
        <section key={key} id="included" className="scroll-mt-24 px-4 pb-12 sm:px-6 lg:px-12 lg:pb-16">
          <div className="relative mx-auto max-w-[1280px] overflow-clip rounded-[36px] bg-gradient-to-br from-[#eef3ff] via-[#f8faff] to-white px-6 py-16 ring-1 ring-[#e6ecfa] sm:px-12 lg:py-24">
            <div className="pointer-events-none absolute -left-24 -top-24 size-[420px] rounded-full bg-[radial-gradient(circle,rgba(37,99,255,0.14),transparent_68%)]" aria-hidden />
            <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1fr] lg:gap-20">
              <div className="lg:sticky lg:top-36 lg:self-start">
                <Head align="left" eyebrow={s.eyebrow || undefined} title={s.title} />
                {s.paras.map((t) => <p key={t} className="m-0 mt-4 text-[16.5px] leading-[1.7] text-[#667085]">{t}</p>)}
                {s.list.length > 0 && <Chips list={s.list} />}
                <button type="button" onClick={toContact} className="btn-cubezix mt-8 cursor-pointer border-0">{s.cta || 'Request A Callback'}</button>
              </div>
              <div ref={tl} className="relative pl-10 sm:pl-14">
                <span className="absolute bottom-2 left-[11px] top-2 w-[3px] rounded-full bg-[#dfe5f2] sm:left-[15px]" aria-hidden />
                <motion.span className="absolute left-[11px] top-2 w-[3px] rounded-full bg-gradient-to-b from-[#12a5f5] to-[#2563ff] shadow-[0_0_10px_rgba(37,99,255,0.5)] sm:left-[15px]" style={{ height: fillH }} aria-hidden />
                <div className="flex flex-col gap-7">
                  {s.cards.map((c, k) => <TimelineCard key={`${c.t}-${k}`} tag={c.t} text={c.d} icon={Ic(k)} />)}
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    }

    if (isSteps) {
      return (
        <section key={key} className="px-6 pb-12 lg:px-12 lg:pb-16">
          <div className="mx-auto max-w-[1100px]">
            <Head eyebrow={s.eyebrow || undefined} title={s.title} />
            <Paras list={s.paras} center />
            <div className="relative mt-14 flex flex-col gap-5">
              <span className="absolute bottom-10 left-[43px] top-10 hidden border-l-2 border-dashed border-[#b9c8f3] sm:block" aria-hidden />
              {s.cards.map((c, k) => {
                const I = Ic(k)
                return (
                  <motion.article key={c.t} className="group relative grid gap-5 rounded-[28px] border border-[#e6e9f0] bg-white p-6 transition-all duration-300 hover:border-[#c9d6f5] hover:shadow-[0_28px_60px_-34px_rgba(37,99,255,0.4)] sm:grid-cols-[auto_1fr] sm:items-center sm:gap-7"
                    initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: k * 0.05, ease }}>
                    <span className="relative z-10 flex size-[72px] items-center justify-center rounded-[22px] bg-gradient-to-br from-[#12a5f5] via-[#2563ff] to-[#3b1ee0] text-white shadow-[0_18px_36px_-14px_rgba(37,99,255,0.6)] transition-transform duration-300 group-hover:scale-105"><I size={28} /></span>
                    <div>
                      <h3 className="m-0 text-[22px] font-semibold tracking-tight text-[#0b1220] sm:text-[24px]">{c.t}</h3>
                      <p className="m-0 mt-3 max-w-[62ch] text-[16px] leading-[1.7] text-[#667085]">{c.d}</p>
                    </div>
                  </motion.article>
                )
              })}
            </div>
            {s.cta && <div className="mt-10 text-center"><button type="button" onClick={toContact} className="btn-cubezix cursor-pointer border-0">{s.cta}</button></div>}
          </div>
        </section>
      )
    }

    return (
      <section key={key} className="px-4 pb-12 sm:px-6 lg:px-12 lg:pb-16">
        <div className="mx-auto max-w-[1280px] px-6 py-16 sm:px-12 lg:py-20">
          <Head eyebrow={s.eyebrow || undefined} title={s.title} />
          <Paras list={s.paras} center />
          {i === folderIdx ? (
            <div className={`mt-14 ${GRID} gap-y-10`}>
              {s.cards.map((c, k) => <FolderCard key={`${c.t}-${k}`} i={k} title={c.t} text={c.d} label={p.title} icon={Ic(k)} cls={span(k, s.cards.length, 'center').cls} />)}
            </div>
          ) : (
            <div className={`mt-12 ${GRID}`}>
              {s.cards.map((c, k) => {
                const I = Ic(k)
                const sp = span(k, s.cards.length)
                return (
                  <motion.article key={`${c.t}-${k}`} className={`${sp.cls} ${sp.wide ? 'lg:flex-row lg:items-center lg:gap-8 ' : ''}group flex flex-col rounded-[24px] border border-[#e6e9f0] bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#c9d6f5] hover:shadow-[0_28px_60px_-34px_rgba(37,99,255,0.4)]`}
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: (k % 3) * 0.06, ease }}>
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-[#eef3ff] text-[#2563ff] transition-colors duration-300 group-hover:bg-[#2563ff] group-hover:text-white"><I size={22} /></span>
                    <h3 className="m-0 mt-5 text-[19px] font-semibold leading-snug tracking-tight text-[#0b1220] lg:data-[wide=true]:mt-0 lg:data-[wide=true]:w-[28%]" data-wide={sp.wide}>{c.t}</h3>
                    <p className="m-0 mt-2 text-[14.5px] leading-relaxed text-[#667085] lg:data-[wide=true]:mt-0 lg:data-[wide=true]:flex-1" data-wide={sp.wide}>{c.d}</p>
                  </motion.article>
                )
              })}
            </div>
          )}
          {s.list.length > 0 && <Chips list={s.list} center />}
          {s.cta && <div className="mt-10 text-center"><button type="button" onClick={toContact} className="btn-cubezix cursor-pointer border-0">{s.cta}</button></div>}
        </div>
      </section>
    )
  })

  const faq = live.faqs[q]

  return (
    <div className="bg-white font-sans">
      {/* ---------- hero: the home hero's arc of glass discs ---------- */}
      <ArcHero
        eyebrow={p.title} note={live.tag} eyebrowTo={`/services/${p.cat}`}
        title={h1a} accent={h1b}
        text={live.hero.map((t) => <p key={t} className="m-0">{t}</p>)}
        nodes={nodeLabels.map((label, i) => ({ label, icon: Ic(i), onClick: () => document.getElementById('included')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }))}
        actions={<><button type="button" onClick={toContact} className="btn-cubezix cursor-pointer border-0">Request A Callback</button><Link to="/contact" className="btn-cubezix-secondary">Let's Talk <ArrowRight size={16} /></Link></>}
      />

      <IndustriesMarquee />

      <div className="pt-4">{sections}</div>

      {/* ---------- FAQ: the home page's FAQ block ---------- */}
      {live.faqs.length > 0 && (() => {
        const g = groupFaqs(live.faqs.map((f) => ({ q: f.q, a: f.a as FaqBlock[] })))
        const single = g.cats.length === 1
        const cats = single ? [{ id: 'all', label: p.title, icon: 'headphones', heading: `${p.title} questions` }] : g.cats
        return <div className="-mt-10 lg:-mt-14"><FaqSection cats={cats} items={single ? { all: g.items.all } : g.items} note={p.title} /></div>
      })()}

      {/* ---------- related ---------- */}
      {related.length > 0 && (
        <section className="px-6 py-20 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1180px]">
            <Head eyebrow="Keep exploring" note="Related services" title="Services that pair well with this one" />
            <PocketCards items={related.map((r) => ({ to: pagePath(r), title: r.title, icon: r.ic[0], kicker: categoryBySlug(r.cat)?.label ?? 'CubeZix', tags: (LIVE[r.id]?.sections.find((x) => x.list.length >= 2)?.list ?? ['24/7 Active Monitoring', 'Preventive Maintenance', 'Remote and On-site IT Support']).filter((t) => t.length <= 26), text: LIVE[r.id]?.hero[0] ?? 'Our flexible IT AMC Annual Maintenance Plans offer 24/7 reliable support for your network and resources.' }))} />
          </div>
        </section>
      )}

      <Testimonials />
      <ContactSection />
    </div>
  )
}
