import IndustriesMarquee from '../components/IndustriesMarquee'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import ArcHero from '../components/ArcHero'
import ContactSection from '../components/sections/ContactSection'
import { CATEGORIES, categoryPath } from '../data/services'

export default function ServicesIndex() {
  return (
    <div className="bg-white font-sans">
      <ArcHero
        eyebrow="Our services" note="Four service lines"
        title="Everything your IT needs," accent="under one team."
        text="Choose a service line to see what is covered, or talk to us and we will scope a single contract across all of them."
        nodes={CATEGORIES.map((c) => ({ label: c.label, icon: c.services[0].icon, to: categoryPath(c.slug) }))}
      />

      <IndustriesMarquee />

      <section className="px-6 pb-24 pt-16 lg:px-12">
        <div className="mx-auto grid max-w-[1280px] gap-6 md:grid-cols-2">
          {CATEGORIES.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
            >
              <Link to={categoryPath(c.slug)} className="group flex h-full flex-col rounded-[28px] border border-[#e6e9f0] bg-white p-8 text-inherit transition-all duration-300 hover:-translate-y-1.5 hover:border-[#c9d6f5] hover:shadow-[0_30px_60px_-30px_rgba(37,99,255,0.38)]">
                <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#2563ff]">{c.eyebrowNote}</span>
                <h2 className="m-0 mt-3 text-[30px] font-bold tracking-tight text-[#0b1220]">{c.label}</h2>
                <p className="m-0 mt-3 text-[16px] leading-relaxed text-[#5b6475]">{c.intro.split('.')[0]}.</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {c.services.slice(0, 5).map((s) => (
                    <span key={s.id} className="rounded-full border border-[#e4e8f1] px-3 py-1 text-[13px] text-[#475569]">{s.title}</span>
                  ))}
                  {c.services.length > 5 && <span className="rounded-full bg-[#eef3ff] px-3 py-1 text-[13px] font-semibold text-[#2563ff]">+{c.services.length - 5} more</span>}
                </div>
                <span className="mt-auto inline-flex items-center gap-2 pt-7 text-[16px] font-semibold text-[#2563ff]">
                  View {c.label} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      <ContactSection />
    </div>
  )
}
