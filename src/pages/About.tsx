import IndustriesMarquee from '../components/IndustriesMarquee'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, Award, BadgeCheck, Compass, Eye, Handshake, Scale, Search, Settings, ShieldCheck, Target, TrendingDown, Users, Zap } from 'lucide-react'
import PageHero from '../components/PageHero'
import ContactSection from '../components/sections/ContactSection'
import Testimonials from '../components/sections/Testimonials'
import { Head } from './ServicePage'
import { pagePathById } from '../data/pages'

const ease = [0.2, 0.7, 0.2, 1] as const
const toContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

const NUMBERS: [string, string][] = [['8+', 'Years of track record'], ['98%', 'Client satisfaction'], ['1,800+', 'Projects completed'], ['40%', 'Reduction in operational cost'], ['15 min', 'Response time']]
const TRAITS: [typeof Users, string, string][] = [
  [Users, 'Client-oriented', 'Your goals set the plan, and we stay close after go-live.'],
  [Scale, 'Independent', 'We recommend what fits, not what we are tied to.'],
  [BadgeCheck, 'Competent', 'Certified engineers who know the estates they run.'],
  [Target, 'Results-driven', 'Measured by uptime, response times and your outcomes.'],
  [Search, 'Problem-solving', 'We find root causes, so the same issue does not return.'],
  [Eye, 'Transparent', 'Clear scope, clear pricing and clear reporting.'],
]
const VALUES: [typeof Users, string, string][] = [
  [Settings, 'Managed IT services', 'Proactive, accountable IT operations that keep your business running.'],
  [Compass, 'Flexibility and adaptability', 'Dedicated, remote or onsite teams that grow or shrink with you.'],
  [Handshake, 'Transform reliably', 'Change that does not put your business at risk.'],
]
const CORE: [string, string][] = [
  ['IT Outsourcing', 'it-outsourcing'], ['IT AMC', 'it-amc'], ['New Office IT Setup', 'new-office'], ['IT Infrastructure', 'it-infrastructure'], ['VPN Solutions', 'firewall'],
  ['Managed IT Services', 'it-support'], ['ELV & Security', 'cctv'], ['IT Hardware', 'it-hardware'], ['Office 365', 'microsoft-365'], ['IT Support', 'it-helpdesk'],
]

export default function About() {
  return (
    <div className="bg-white font-sans">
      <PageHero
        eyebrow="About us" note="Dubai · Business Bay" title="Empowering businesses to" accent="transform reliably"
        text="CubeZix has grown into a trusted IT partner offering IT support, infrastructure management, cloud services and cybersecurity, with strategic consultants and tech-savvy engineers who provide personalized support."
        actions={<><button type="button" onClick={toContact} className="btn-cubezix cursor-pointer border-0">Schedule a call</button><Link to="/services" className="btn-cubezix-secondary">Our services <ArrowRight size={16} /></Link></>}
      >
        <div className="grid grid-cols-2 gap-4">
          {NUMBERS.slice(0, 4).map(([n, l], i) => (
            <motion.div key={l} className={`rounded-[22px] border border-white bg-white/90 p-5 shadow-[0_24px_60px_-40px_rgba(37,99,255,0.5)] backdrop-blur ${i % 2 ? 'mt-6' : ''}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease }}>
              <div className="bg-gradient-to-r from-[#1795f3] via-[#2563ff] to-[#3828e1] bg-clip-text text-[34px] font-extrabold leading-none tracking-tight text-transparent">{n}</div>
              <div className="mt-2 text-[13.5px] leading-snug text-[#667085]">{l}</div>
            </motion.div>
          ))}
        </div>
      </PageHero>

      <IndustriesMarquee />

      <section className="px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <motion.figure className="m-0 overflow-hidden rounded-[28px] bg-[#eef3ff] shadow-[0_30px_60px_-34px_rgba(37,99,255,0.5)]" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.8, ease }}>
            <img src="/assets/about-company-photo.jpg" alt="A modern Dubai office with a server room beside the workspace" className="aspect-[4/3] h-full w-full object-cover" loading="lazy" />
          </motion.figure>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.8, ease }}>
            <Head align="left" eyebrow="Our journey" note="Who we are" title="An overview of our journey of impact" sub="A team of IT professionals with experience and a focus on innovation, offering tailored support across strategy and engineering." />
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#dfe6f6] bg-[#f7f9ff] px-4 py-2 text-[14px] font-semibold text-[#3b4a6b]"><Award size={16} className="text-[#2563ff]" /> SMB Connect Award 2024 &amp; 2025</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#dfe6f6] bg-[#f7f9ff] px-4 py-2 text-[14px] font-semibold text-[#3b4a6b]"><TrendingDown size={16} className="text-[#2563ff]" /> 40% lower operational cost</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#dfe6f6] bg-[#f7f9ff] px-4 py-2 text-[14px] font-semibold text-[#3b4a6b]"><Zap size={16} className="text-[#2563ff]" /> 15-minute response</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-[1280px] rounded-[36px] bg-gradient-to-br from-[#eef3ff] via-[#f8faff] to-white px-6 py-16 ring-1 ring-[#e6ecfa] sm:px-12 lg:py-20">
          <Head eyebrow="How we work" note="6 traits" title="Client-oriented, from the first call" sub="The way we behave is the most important part of the service." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TRAITS.map(([I, t, d], i) => (
              <motion.div key={t} className="group rounded-[24px] border border-[#e6e9f0] bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#c9d6f5] hover:shadow-[0_28px_60px_-34px_rgba(37,99,255,0.4)]" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease }}>
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[#eef3ff] text-[#2563ff] transition-colors duration-300 group-hover:bg-[#2563ff] group-hover:text-white"><I size={22} /></span>
                <h3 className="m-0 mt-5 text-[19px] font-semibold tracking-tight text-[#0b1220]">{t}</h3>
                <p className="m-0 mt-2 text-[14.5px] leading-relaxed text-[#667085]">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-12 lg:pb-28">
        <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[36px] bg-[#0A1B44] px-6 py-16 sm:px-12 lg:py-20">
          <div className="pointer-events-none absolute -left-24 -top-24 size-[420px] rounded-full bg-[radial-gradient(circle,rgba(37,99,255,0.5),transparent_68%)] blur-2xl" aria-hidden />
          <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#fff_1px,transparent_1.4px)] [background-size:26px_26px]" aria-hidden />
          <div className="relative">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[13px] font-semibold text-white/90">What we value</span>
              <h2 className="m-0 mt-6 text-[34px] font-bold leading-[1.1] tracking-tight text-white sm:text-[42px]">Three values behind every project</h2>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {VALUES.map(([I, t, d]) => (
                <div key={t} className="rounded-[22px] border border-white/12 bg-white/[0.07] p-6 backdrop-blur transition-colors hover:bg-white/[0.12]">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-white/12 text-[#7fd2ff]"><I size={19} /></span>
                  <h3 className="m-0 mt-4 text-[19px] font-semibold text-white">{t}</h3>
                  <p className="m-0 mt-2 text-[14.5px] leading-relaxed text-white/70">{d}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[22px] border border-white/12 bg-white/12 md:grid-cols-5">
              {NUMBERS.map(([n, l]) => (
                <div key={l} className="bg-[#0A1B44] px-4 py-6 text-center"><div className="text-[30px] font-extrabold tracking-tight text-white">{n}</div><div className="mt-1 text-[13px] text-white/65">{l}</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-[1180px]">
          <Head eyebrow="Core services" note="10 services" title="What we do every day" />
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5">
            {CORE.map(([label, id]) => (
              <Link key={label} to={pagePathById(id) ?? '/services'} className="group flex items-center justify-between gap-2 rounded-[18px] border border-[#e6e9f0] bg-white px-4 py-4 text-[14.5px] font-semibold text-[#0b1220] no-underline transition-all hover:-translate-y-1 hover:border-[#c9d6f5] hover:text-[#2563ff] hover:shadow-[0_20px_44px_-30px_rgba(37,99,255,0.45)]">
                {label}<ShieldCheck size={15} className="flex-none text-[#2563ff] opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <ContactSection />
    </div>
  )
}
