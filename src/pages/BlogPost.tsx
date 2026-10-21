import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, BookOpen, Clock, Sparkles } from 'lucide-react'
import PocketCards from '../components/PocketCards'
import Eyebrow from '../components/Eyebrow'
import ContactSection from '../components/sections/ContactSection'
import { Head } from './ServicePage'
import { POSTS } from '../data/blog'

const toContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

export default function BlogPost() {
  const { slug } = useParams()
  const i = POSTS.findIndex((p) => p.slug === slug)
  const [q, setQ] = useState(0)
  if (i < 0) return <Navigate to="/blog" replace />
  const p = POSTS[i]
  const more = POSTS.filter((x) => x.slug !== p.slug && x.cat === p.cat).concat(POSTS.filter((x) => x.slug !== p.slug && x.cat !== p.cat)).slice(0, 3)
  return (
    <div className="bg-white font-sans">
      <section className="px-4 pt-4 sm:px-6 lg:px-12">
        <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[32px] bg-[#fafafa] px-6 py-14 ring-1 ring-[#e6e9f0] sm:px-10 lg:px-14">
          <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(40,70,160,0.2)_1.1px,transparent_1.4px)] [background-position:11px_11px] [background-size:22px_22px]" aria-hidden />
          <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(37,99,255,0.22),rgba(255,255,255,0)_70%)]" aria-hidden />
          <div className="relative mx-auto max-w-[860px]">
            <Eyebrow label="Blogs" note={p.cat} to="/blog" />
            <h1 className="m-0 mt-5 text-[30px] font-extrabold leading-[1.12] tracking-[-0.03em] text-[#0b1220] sm:text-[40px]">{p.title}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-[14px] text-[#667085]">
              <span className="flex items-center gap-1.5"><Clock size={14} />{p.date}</span>
              <span className="rounded-full bg-[#eef3ff] px-3 py-1 text-[12px] font-bold text-[#2563ff]">{p.cat}</span>
              <span>By CubeZix</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[1fr_300px] lg:gap-16">
          <article>
            <p className="m-0 text-[19px] leading-[1.7] text-[#475467]">{p.excerpt}</p>
            {p.sections.map(([h, t], k) => (
              <motion.div key={h} className="mt-10 border-l-[3px] border-[#d8e2fb] pl-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}>
                <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#2563ff]">0{k + 1}</span>
                <h2 className="m-0 mt-1 text-[24px] font-semibold leading-snug tracking-tight text-[#0b1220]">{h}</h2>
                <p className="m-0 mt-3 text-[16.5px] leading-[1.75] text-[#667085]">{t}</p>
              </motion.div>
            ))}

            <div className="mt-14">
              <h2 className="m-0 text-[26px] font-bold tracking-tight text-[#0b1220]">Quick answers</h2>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {p.faqs.map(([question], k) => (
                  <button key={question} type="button" aria-expanded={q === k} onClick={() => setQ(k)}
                    className={`cursor-pointer rounded-xl border px-4 py-2.5 text-left text-[14px] font-medium transition-all ${q === k ? 'border-[#2563ff] bg-[#2563ff] text-white' : 'border-[#dfe6f6] bg-white text-[#475467] hover:border-[#2563ff] hover:text-[#2563ff]'}`}>{question}</button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={q} className="mt-4 flex items-start gap-4 rounded-[20px] border border-[#dfe6f6] bg-[#fafbff] p-5" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <span className="flex size-9 flex-none items-center justify-center rounded-full bg-[#eef3ff] text-[#2563ff]"><Sparkles size={16} /></span>
                  <p className="m-0 text-[15.5px] leading-[1.7] text-[#475467]">{p.faqs[q][1]}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <Link to="/blog" className="mt-12 inline-flex items-center gap-2 text-[15px] font-semibold text-[#2563ff] no-underline"><ArrowLeft size={15} /> All articles</Link>
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[24px] border border-[#e6e9f0] bg-gradient-to-br from-white to-[#f4f7ff] p-6 shadow-[0_24px_60px_-40px_rgba(37,99,255,0.45)]">
              <h3 className="m-0 text-[19px] font-semibold leading-snug tracking-tight text-[#0b1220]">Need this handled for you?</h3>
              <p className="m-0 mt-2 text-[14.5px] leading-relaxed text-[#667085]">Our L1, L2 and L3 engineers respond in 15 minutes, 24/7.</p>
              <button type="button" onClick={toContact} className="btn-cubezix mt-5 w-full cursor-pointer justify-center border-0">Book free demo now</button>
              {p.service && <Link to={p.service[1]} className="mt-4 flex items-center justify-between rounded-xl border border-[#dfe6f6] bg-white px-4 py-3 text-[14px] font-semibold text-[#2563ff] no-underline transition-colors hover:border-[#2563ff]">{p.service[0]} <ArrowRight size={14} /></Link>}
            </div>
          </aside>
        </div>
      </section>

      <section className="px-6 pb-20 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-[1180px]">
          <Head eyebrow="Keep reading" title="More articles" />
          <PocketCards cta="Read article" items={more.map((m) => ({ to: `/blog/${m.slug}`, title: m.title, icon: BookOpen, kicker: m.cat, tags: [m.date], text: m.excerpt }))} />
        </div>
      </section>
      <ContactSection />
    </div>
  )
}
