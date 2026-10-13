import { motion } from 'motion/react'
import { Quote, Star } from 'lucide-react'
import Eyebrow from '../Eyebrow'
import { testimonials } from '@/data/home'

const TAGS = [
  ['IT AMC', 'Cloud'],
  ['Helpdesk', 'Remote support'],
  ['Cloud migration', 'Microsoft 365'],
  ['Maintenance', 'Reporting'],
]

export default function Testimonials() {
  return (
    <section className="relative bg-[#fafbfd] px-6 pb-24 pt-16 font-sans lg:px-6">
      <div className="mx-auto max-w-[1480px]">
        <motion.div
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <Eyebrow label="Client voices" note="Verified reviews" />
          <h2 className="m-0 mt-6 text-[44px] font-bold leading-[1.1] tracking-tight text-[#0b1220] sm:text-[52px]">
            What our clients <span className="text-[#2563ff]">say</span>
          </h2>
          <p className="m-0 mt-4 max-w-[34em] text-[17px] leading-relaxed text-[#667085]">
            Verified reviews from businesses running their IT operations with CubeZix across the MENA region.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {testimonials.slice(0, 4).map((t, i) => (
            <motion.figure
              key={t.name}
              className="m-0 flex min-h-[268px] flex-col rounded-[28px] border border-[#e9ecf2] bg-[#fdfdfe] p-6 transition-shadow duration-300 hover:shadow-[0_24px_50px_-28px_rgba(20,30,90,0.3)]"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.09, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <div className="flex items-center justify-between">
                <span className="flex size-[27px] items-center justify-center rounded-full bg-[#e8eefc] text-[#2563ff]">
                  <Quote size={13} />
                </span>
                <span className="flex gap-0.5 text-[#f5b301]" aria-label="5 out of 5 stars">
                  {[0, 1, 2, 3, 4].map((s) => <Star key={s} size={13} fill="currentColor" />)}
                </span>
              </div>
              <blockquote className="m-0 mt-6 flex-1 text-[13px] leading-[1.75] text-[#1b2230]">{t.quote}</blockquote>
              <div className="mt-5 flex flex-wrap gap-2">
                {TAGS[i % TAGS.length].map((tag) => (
                  <span key={tag} className="rounded-full border border-[#e4e8f1] px-2.5 py-1 text-[11px] text-[#667085]">{tag}</span>
                ))}
              </div>
              <figcaption className="sr-only">{t.name}, {t.role}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
