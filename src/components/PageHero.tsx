import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import Eyebrow from './Eyebrow'

const ease = [0.2, 0.7, 0.2, 1] as const

/** The dotted hero card used on every inner page: eyebrow, two-tone title, text, actions and an art slot. */
export default function PageHero({ eyebrow, note, to, title, accent, text, actions, children }: {
  eyebrow: string; note?: string; to?: string; title: string; accent: string; text: string; actions?: ReactNode; children?: ReactNode
}) {
  return (
    <section className="px-4 pt-4 sm:px-6 lg:px-12">
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[32px] bg-[#fafafa] ring-1 ring-[#e6e9f0] lg:min-h-[460px]">
        <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(ellipse_60%_80%_at_72%_50%,rgba(37,99,255,0.26),rgba(24,150,245,0.12)_45%,rgba(255,255,255,0)_75%)]" aria-hidden />
        <div className="hero-tex pointer-events-none absolute inset-0" aria-hidden />
        <div className={`relative grid items-center gap-8 px-6 py-12 sm:px-10 lg:min-h-[460px] lg:px-14 lg:py-10 ${children ? 'lg:grid-cols-[1.02fr_0.98fr]' : ''}`}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
            <Eyebrow label={eyebrow} note={note} to={to} />
            <h1 className="m-0 mt-5 text-[32px] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#0b1220] sm:text-[42px] lg:text-[48px]">
              {title}<br />
              <span className="rounded-lg bg-[#edf1ff] px-[0.14em] [box-decoration-break:clone]">
                <span className="bg-gradient-to-r from-[#1795f3] via-[#2563ff] to-[#3828e1] bg-clip-text text-transparent">{accent}</span>
              </span>
            </h1>
            <p className="m-0 mt-4 max-w-[54ch] text-[16px] leading-[1.6] text-[#4b5563]">{text}</p>
            {actions && <div className="mt-7 flex flex-wrap items-center gap-3">{actions}</div>}
          </motion.div>
          {children && (
            <motion.div className="justify-self-center lg:justify-self-end" style={{ width: '100%', maxWidth: 520 }} initial={{ opacity: 0, scale: 0.97, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }}>
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
