import IndustriesMarquee from '../components/IndustriesMarquee'
import { motion } from 'motion/react'
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import PageHero from '../components/PageHero'
import ContactSection from '../components/sections/ContactSection'
import { Head } from './ServicePage'

const ease = [0.2, 0.7, 0.2, 1] as const
const toForm = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

const WAYS: { icon: typeof Phone; title: string; line: string; href: string; cta: string }[] = [
  { icon: Phone, title: 'Call us', line: '+971 4 241 4120', href: 'tel:+97142414120', cta: 'Call now' },
  { icon: Mail, title: 'Support', line: 'Support@CubeZix.com', href: 'mailto:support@cubezix.com', cta: 'Email support' },
  { icon: Mail, title: 'General enquiries', line: 'info@CubeZix.com', href: 'mailto:info@cubezix.com', cta: 'Email us' },
  { icon: MessageCircle, title: 'WhatsApp', line: 'Chat with an engineer', href: 'https://wa.me/97142414120', cta: 'Open WhatsApp' },
]

export default function Contact() {
  return (
    <div className="bg-white font-sans">
      <PageHero
        eyebrow="Contact us" note="Mon–Sat · 8:30am–7:30pm" title="We are always" accent="open to talk"
        text="We are the UAE’s leading IT solutions company, backed by over 8 years of experience, a 98% client satisfaction rate and 1,500+ happy clients."
        actions={<><button type="button" onClick={toForm} className="btn-cubezix cursor-pointer border-0">Schedule a call now</button><a href="tel:+97142414120" className="btn-cubezix-secondary"><Phone size={16} /> +971 4 241 4120</a></>}
      >
        <div className="rounded-[26px] border border-white bg-white/90 p-7 shadow-[0_30px_70px_-40px_rgba(37,99,255,0.5)] backdrop-blur">
          <div className="flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#12a5f5] to-[#3b1ee0] text-white"><MapPin size={20} /></span><div><b className="block text-[16px] text-[#0b1220]">Dubai head office</b><span className="text-[13.5px] text-[#667085]">Business Bay</span></div></div>
          <p className="m-0 mt-4 text-[15px] leading-relaxed text-[#475467]">805, The Burlington Tower, Business Bay, Dubai, UAE</p>
          <div className="mt-4 flex items-center gap-2 text-[14px] text-[#667085]"><Clock size={15} className="text-[#2563ff]" /> Mon–Sat, 8:30am to 7:30pm</div>
          <a href="https://www.google.com/maps/search/?api=1&query=The+Burlington+Tower+Business+Bay+Dubai" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-[14.5px] font-semibold text-[#2563ff] no-underline">Open in Google Maps <ArrowUpRight size={14} /></a>
        </div>
      </PageHero>

      <IndustriesMarquee />

      <section className="px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1180px]">
          <Head eyebrow="Reach us" note="4 ways" title="Pick the way that suits you" sub="An engineer answers, not a script." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WAYS.map(({ icon: I, title, line, href, cta }, i) => (
              <motion.a key={title} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="group flex flex-col rounded-[24px] border border-[#e6e9f0] bg-white p-6 no-underline transition-all duration-300 hover:-translate-y-1.5 hover:border-[#c9d6f5] hover:shadow-[0_28px_60px_-34px_rgba(37,99,255,0.4)]" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: i * 0.07, ease }}>
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[#eef3ff] text-[#2563ff] transition-colors duration-300 group-hover:bg-[#2563ff] group-hover:text-white"><I size={22} /></span>
                <h3 className="m-0 mt-5 text-[19px] font-semibold tracking-tight text-[#0b1220]">{title}</h3>
                <p className="m-0 mt-1 text-[15px] text-[#667085]">{line}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[14.5px] font-semibold text-[#2563ff]">{cta} <ArrowUpRight size={14} /></span>
              </motion.a>
            ))}
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {[['Dubai, UAE', '805, The Burlington Tower, Business Bay, Dubai, UAE'], ['Mumbai, India', 'Our other location']].map(([t, a]) => (
              <div key={t} className="flex items-start gap-4 rounded-[22px] border border-dashed border-[#c9d6f5] bg-[#fafbff] p-6"><span className="flex size-10 flex-none items-center justify-center rounded-xl bg-[#eef3ff] text-[#2563ff]"><MapPin size={18} /></span><div><b className="block text-[17px] text-[#0b1220]">{t}</b><span className="text-[14.5px] leading-relaxed text-[#667085]">{a}</span></div></div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  )
}
