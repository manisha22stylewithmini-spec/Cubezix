import IndustriesMarquee from '../components/IndustriesMarquee'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, ArrowUpRight, Clock } from 'lucide-react'
import PageHero from '../components/PageHero'
import ContactSection from '../components/sections/ContactSection'
import { Head } from './ServicePage'
import { ARCHIVE, POSTS } from '../data/blog'

const ease = [0.2, 0.7, 0.2, 1] as const
const CATS = ['All', ...Array.from(new Set(POSTS.map((p) => p.cat)))]
const toContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

export default function Blog() {
  const [cat, setCat] = useState('All')
  const [first, ...rest] = POSTS
  const list = cat === 'All' ? rest : POSTS.filter((p) => p.cat === cat)
  return (
    <div className="bg-white font-sans">
      <PageHero
        eyebrow="Blogs" note="Guides, news and IT insights" title="Field notes from the" accent="estates we run"
        text="Practical IT writing for Dubai businesses: support, security, cloud, cabling and the contracts behind them."
        actions={<><button type="button" onClick={toContact} className="btn-cubezix cursor-pointer border-0">Talk to an engineer</button><a href="#articles" className="btn-cubezix-secondary">Read the latest <ArrowRight size={16} /></a></>}
      >
        <Link to={`/blog/${first.slug}`} className="group block rounded-[26px] border border-white bg-white/90 p-7 no-underline shadow-[0_30px_70px_-40px_rgba(37,99,255,0.5)] backdrop-blur transition-transform duration-300 hover:-translate-y-1">
          <span className="rounded-full bg-[#e8efff] px-3 py-1 text-[12px] font-bold text-[#2563ff]">Latest · {first.cat}</span>
          <h2 className="m-0 mt-4 text-[22px] font-semibold leading-snug tracking-tight text-[#0b1220]">{first.title}</h2>
          <p className="m-0 mt-3 text-[14.5px] leading-relaxed text-[#667085]">{first.excerpt}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-[14.5px] font-semibold text-[#2563ff]">Read article <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></span>
        </Link>
      </PageHero>

      <IndustriesMarquee />

      <section id="articles" className="scroll-mt-24 px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1180px]">
          <Head eyebrow="Latest articles" note={`${POSTS.length} posts`} title="Read, then put it to work" sub="Filter by topic." />
          <div className="mt-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Topics">
            {CATS.map((c) => (
              <button key={c} type="button" role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
                className={`cursor-pointer rounded-full border px-4 py-2 text-[14px] font-semibold transition-all ${cat === c ? 'border-transparent bg-gradient-to-r from-[#12a5f5] via-[#2563ff] to-[#3b1ee0] text-white shadow-[0_14px_28px_-14px_rgba(37,99,255,0.7)]' : 'border-[#dfe6f6] bg-white text-[#475467] hover:border-[#2563ff] hover:text-[#2563ff]'}`}>
                {c}
              </button>
            ))}
          </div>
          <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((p) => (
                <motion.div layout key={p.slug} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35, ease }}>
                  <Link to={`/blog/${p.slug}`} className="group flex h-full flex-col rounded-[24px] border border-[#e6e9f0] bg-white p-6 no-underline transition-all duration-300 hover:-translate-y-1.5 hover:border-[#c9d6f5] hover:shadow-[0_28px_60px_-34px_rgba(37,99,255,0.4)]">
                    <div className="flex items-center justify-between gap-3 text-[12px]">
                      <span className="rounded-full bg-[#eef3ff] px-3 py-1 font-bold text-[#2563ff]">{p.cat}</span>
                      <span className="flex items-center gap-1.5 text-[#8a91a1]"><Clock size={12} />{p.date}</span>
                    </div>
                    <h3 className="m-0 mt-5 text-[19px] font-semibold leading-snug tracking-tight text-[#0b1220]">{p.title}</h3>
                    <p className="m-0 mt-2 text-[14.5px] leading-relaxed text-[#667085]">{p.excerpt}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[14.5px] font-semibold text-[#2563ff]">Read article <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></span>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-[1180px] rounded-[36px] bg-[#f7f9fd] px-6 py-14 ring-1 ring-[#e9eef8] sm:px-12">
          <Head eyebrow="Archive" note={`${ARCHIVE.length}+ older posts`} title="More from the archive" sub="These open on cubezix.com." />
          <ul className="m-0 mt-10 grid list-none gap-3 p-0 md:grid-cols-2">
            {ARCHIVE.map(([t, slug, date, c]) => (
              <li key={slug}>
                <a href={`https://cubezix.com/${slug}/`} target="_blank" rel="noreferrer" className="group flex items-start justify-between gap-4 rounded-2xl border border-[#e6e9f0] bg-white px-5 py-4 no-underline transition-all hover:border-[#c9d6f5] hover:shadow-[0_18px_40px_-30px_rgba(37,99,255,0.45)]">
                  <span><b className="block text-[15px] font-semibold leading-snug text-[#0b1220]">{t}</b><span className="mt-1 block text-[12.5px] text-[#8a91a1]">{c} · {date}</span></span>
                  <ArrowUpRight size={16} className="mt-1 flex-none text-[#2563ff] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center"><a href="https://cubezix.com/blog/" target="_blank" rel="noreferrer" className="btn-cubezix-secondary">Full archive on cubezix.com <ArrowUpRight size={15} /></a></div>
        </div>
      </section>

      <ContactSection />
    </div>
  )
}
