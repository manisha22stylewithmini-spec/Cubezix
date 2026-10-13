import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, Check, PhoneCall } from 'lucide-react'
import Eyebrow from '../components/Eyebrow'
import ContactSection from '../components/sections/ContactSection'
import { categoryBySlug, type Service } from '../data/services'
import Placeholder from './Placeholder'

const toContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
const toServices = () => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

const ease = [0.2, 0.7, 0.2, 1] as const

function ServiceCard({ svc, i }: { svc: Service; i: number }) {
  const Icon = svc.icon
  const external = Boolean(svc.to)
  return (
    <motion.article
      id={svc.id}
      className="group relative flex scroll-mt-28 flex-col rounded-[26px] border border-[#e6e9f0] bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#c9d6f5] hover:shadow-[0_28px_60px_-30px_rgba(37,99,255,0.35)]"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease }}
    >
      <div className="flex items-start justify-between gap-4">
        {svc.img ? (
          <span className="block h-[68px] w-[148px] overflow-hidden rounded-xl bg-[#f1f4fa] ring-1 ring-black/5">
            <img src={svc.img} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
          </span>
        ) : (
          <span className="flex h-[68px] w-[148px] items-center justify-center rounded-xl bg-gradient-to-br from-[#eaf0ff] to-[#dfe7fb] text-[#2563ff] ring-1 ring-black/5">
            <Icon size={28} />
          </span>
        )}
        <span className="flex size-10 flex-none items-center justify-center rounded-full bg-[#eef3ff] text-[#2563ff] transition-colors group-hover:bg-[#2563ff] group-hover:text-white">
          <Icon size={18} />
        </span>
      </div>
      <h3 className="m-0 mt-5 text-[21px] font-semibold leading-snug tracking-tight text-[#0b1220]">{svc.title}</h3>
      <p className="m-0 mt-2 text-[15px] leading-relaxed text-[#5b6475]">{svc.desc}</p>
      <ul className="m-0 mt-5 flex list-none flex-col gap-2.5 p-0">
        {svc.points.map((p) => (
          <li key={p} className="flex items-start gap-2.5 text-[14.5px] text-[#334155]">
            <span className="mt-0.5 flex size-[20px] flex-none items-center justify-center rounded-full bg-[#e8f8f1] text-[#12a37a]"><Check size={11} strokeWidth={3} /></span>
            {p}
          </li>
        ))}
      </ul>
      {external ? (
        <Link to={svc.to!} className="mt-auto inline-flex w-fit items-center gap-2 pt-6 text-[15px] font-semibold text-[#2563ff]">
          Explore <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
      ) : (
        <button type="button" onClick={toContact} className="mt-auto inline-flex w-fit cursor-pointer items-center gap-2 border-0 bg-transparent p-0 pt-6 text-[15px] font-semibold text-[#2563ff]">
          Request a quote <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </button>
      )}
    </motion.article>
  )
}

export default function ServiceCategory({ slug }: { slug: string }) {
  const c = categoryBySlug(slug)
  if (!c) return <Placeholder title="Page not found" />

  return (
    <div className="bg-white font-sans">
      {/* ---------- hero (max 498px on desktop) ---------- */}
      <section className="relative overflow-hidden bg-[#fafafa] lg:h-[498px] lg:max-h-[498px]">
        <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(#d4d8e1_1.15px,transparent_1.4px)] [background-position:11px_11px] [background-size:22px_22px]" aria-hidden />
        <div className="pointer-events-none absolute -right-24 top-1/2 size-[420px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,255,0.12),transparent_68%)]" aria-hidden />

        <div className="relative mx-auto grid h-full max-w-[1280px] items-center gap-10 px-6 py-14 lg:grid-cols-[1.12fr_0.88fr] lg:px-12 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <Eyebrow label={c.label} note={c.eyebrowNote} />
            <h1 className="m-0 mt-5 text-[34px] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#0b1220] sm:text-[42px] lg:text-[46px]">
              {c.title}{' '}
              <span className="relative inline-block">
                <span className="absolute inset-x-[-0.1em] bottom-[-0.02em] top-[0.1em] -skew-x-12 rounded-lg bg-[#edf1ff]" aria-hidden />
                <span className="relative bg-gradient-to-r from-[#1795f3] via-[#2563ff] to-[#3828e1] bg-clip-text text-transparent">{c.accent}</span>
              </span>
            </h1>
            <p className="m-0 mt-4 max-w-[56ch] text-[15.5px] leading-[1.6] text-[#5b6475]">{c.intro}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button type="button" onClick={toContact} className="btn-cubezix cursor-pointer border-0">Book free demo</button>
              <button type="button" onClick={toServices} className="btn-cubezix-secondary cursor-pointer">
                Explore services <ArrowRight size={16} />
              </button>
            </div>
            <dl className="m-0 mt-6 flex max-w-[560px] items-stretch gap-0">
              {c.stats.map(([n, l], i) => (
                <div key={l} className={`pr-6 ${i > 0 ? 'border-l border-[#e2e6ef] pl-6' : ''}`}>
                  <dt className="text-[22px] font-bold leading-none tracking-tight text-[#0b1220]">{n}</dt>
                  <dd className="m-0 mt-1.5 text-[12.5px] leading-snug text-[#667085]">{l}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* contained illustration frame */}
          <motion.div
            className="relative hidden justify-self-end lg:block"
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <div
              className="relative h-[330px] w-[460px] overflow-hidden rounded-[32px] border border-white bg-[#eef3ff] shadow-[0_30px_70px_-34px_rgba(37,99,255,0.45)]"
              style={{ backgroundImage: `url(${c.art})`, backgroundSize: 'auto 112%', backgroundPosition: c.artPos, backgroundRepeat: 'no-repeat' }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-6 flex items-center gap-3 rounded-2xl border border-white bg-white/90 px-4 py-3 shadow-[0_18px_40px_-20px_rgba(20,30,90,0.35)] backdrop-blur">
              <span className="flex size-9 items-center justify-center rounded-full bg-[#e8f8f1] text-[#12a37a]"><Check size={16} strokeWidth={3} /></span>
              <span className="text-[13px] leading-tight text-[#334155]"><b className="block text-[14px] text-[#0b1220]">{c.stats[1][0]}</b>{c.stats[1][1]}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- sub-category services ---------- */}
      <section id="services" className="scroll-mt-20 bg-white px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1280px]">
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
          <div className={`mt-14 grid gap-6 md:grid-cols-2 ${c.services.length === 2 ? 'mx-auto max-w-[900px]' : c.services.length % 4 === 0 ? 'xl:grid-cols-4' : 'xl:grid-cols-3'}`}>
            {c.services.map((svc, i) => <ServiceCard key={svc.id} svc={svc} i={i} />)}
          </div>
        </div>
      </section>

      {/* ---------- blocks ---------- */}
      <section className="px-4 pb-20 sm:px-6 lg:px-12 lg:pb-28">
        <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[36px] bg-[#0A1B44] px-6 py-16 sm:px-12 lg:py-20">
          <div className="pointer-events-none absolute -left-24 -top-24 size-[420px] rounded-full bg-[radial-gradient(circle,rgba(37,99,255,0.5),transparent_68%)] blur-2xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-32 -right-16 size-[460px] rounded-full bg-[radial-gradient(circle,rgba(0,218,255,0.28),transparent_66%)] blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#fff_1px,transparent_1.4px)] [background-size:26px_26px]" aria-hidden />
          <div className="relative">
            <motion.div
              className="mx-auto max-w-2xl text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[13px] font-semibold text-white/90">Why CubeZix</span>
              <h2 className="m-0 mt-5 text-[32px] font-bold leading-[1.12] tracking-tight text-white sm:text-[42px]">{c.blocksTitle}</h2>
            </motion.div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {c.blocks.map(({ icon: Icon, title, text }, i) => (
                <motion.div
                  key={title}
                  className="rounded-[24px] border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm transition-colors duration-300 hover:bg-white/[0.11]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.09, ease }}
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3b82ff] to-[#6366f1] text-white shadow-lg shadow-blue-900/40"><Icon size={22} /></span>
                  <h3 className="m-0 mt-5 text-[19px] font-semibold tracking-tight text-white">{title}</h3>
                  <p className="m-0 mt-2 text-[14.5px] leading-relaxed text-white/70">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- photo ---------- */}
      <section className="px-4 pb-20 sm:px-6 lg:px-12 lg:pb-28">
        <motion.div
          className="relative mx-auto h-[360px] max-w-[1280px] overflow-hidden rounded-[36px] sm:h-[460px]"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease }}
        >
          <img src={c.photo} alt={c.photoAlt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B44]/80 via-[#0A1B44]/15 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 max-w-[520px] rounded-[24px] border border-white/40 bg-white/20 p-6 text-white backdrop-blur-xl sm:bottom-8 sm:left-8 sm:p-8">
            <h3 className="m-0 text-[24px] font-bold leading-tight tracking-tight sm:text-[30px]">{c.photoTitle}</h3>
            <p className="m-0 mt-3 text-[15px] leading-relaxed text-white/90">{c.photoText}</p>
          </div>
        </motion.div>
      </section>

      {/* ---------- call to action ---------- */}
      <section className="px-4 pb-20 sm:px-6 lg:px-12 lg:pb-24">
        <motion.div
          className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[36px] bg-gradient-to-br from-[#12a5f5] via-[#2563ff] to-[#3b1ee0] px-6 py-16 text-center sm:px-12"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(#fff_1px,transparent_1.4px)] [background-size:24px_24px]" aria-hidden />
          <div className="pointer-events-none absolute -right-16 -top-20 size-[320px] rounded-full bg-white/20 blur-3xl" aria-hidden />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="m-0 text-[32px] font-bold leading-[1.12] tracking-tight text-white sm:text-[44px]">{c.ctaTitle}</h2>
            <p className="m-0 mt-4 text-[17px] leading-relaxed text-white/85">{c.ctaText}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button type="button" onClick={toContact} className="inline-flex h-[54px] cursor-pointer items-center rounded-full border-0 bg-white px-8 text-[17px] font-semibold text-[#0b1220] shadow-[0_16px_34px_-14px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-0.5">
                Book free demo
              </button>
              <a href="tel:+97142414120" className="inline-flex h-[54px] items-center gap-2 rounded-full border border-white/50 px-7 text-[17px] font-semibold text-white transition-colors hover:bg-white/10">
                <PhoneCall size={18} /> +971 4 241 4120
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ---------- contact ---------- */}
      <ContactSection />
    </div>
  )
}
