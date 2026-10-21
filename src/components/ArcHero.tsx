import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import Eyebrow from './Eyebrow'
import '../styles/hq-journey.css'
import '../styles/hero-arc.css'

const ease = [0.2, 0.7, 0.2, 1] as const
export interface ArcNode { label: string; icon: LucideIcon; to?: string; onClick?: () => void }

/** Hero of every services page, in the language of the home hero: centred headline over a brand glow,
    and an arc of glass discs with a light travelling along the line that joins them. */
export default function ArcHero({ eyebrow, note, eyebrowTo, title, accent, text, actions, nodes }: {
  eyebrow: string; note?: string; eyebrowTo?: string; title: string; accent: string; text: ReactNode; actions?: ReactNode; nodes: ArcNode[]
}) {
  const n = nodes.length
  return (
    <section className="px-4 pt-4 sm:px-6 lg:px-12">
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[32px] bg-[#fafafa] ring-1 ring-[#e6e9f0]">
        <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(40,70,160,0.2)_1.1px,transparent_1.4px)] [background-position:11px_11px] [background-size:22px_22px]" aria-hidden />
        <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(ellipse_70%_75%_at_50%_62%,rgba(37,99,255,0.26),rgba(24,150,245,0.12)_45%,rgba(255,255,255,0)_78%)]" aria-hidden />
        <div className="relative px-6 pb-10 pt-12 sm:px-10 lg:px-14 lg:pt-14">
          <motion.div className="mx-auto flex max-w-[820px] flex-col items-center text-center" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
            <Eyebrow label={eyebrow} note={note} to={eyebrowTo} />
            <h1 className="m-0 mt-5 text-[34px] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#0b1220] sm:text-[46px] lg:text-[54px]">
              {title}<br />
              <span className="rounded-lg bg-[#edf1ff] px-[0.14em] [box-decoration-break:clone]">
                <span className="bg-gradient-to-r from-[#1795f3] via-[#2563ff] to-[#3828e1] bg-clip-text text-transparent">{accent}</span>
              </span>
            </h1>
            <div className="mt-5 flex max-w-[62ch] flex-col gap-3 text-[16.5px] leading-[1.6] text-[#4b5563]">{text}</div>
            {actions && <div className="mt-7 flex flex-wrap items-center justify-center gap-3">{actions}</div>}
          </motion.div>

          <div className="ha" role="group" aria-label={`${eyebrow}: what is covered`}>
            <svg className="ha-line" viewBox="0 0 1000 228" preserveAspectRatio="none" aria-hidden>
              <path id="ha-path" d="M80 49 Q500 160 920 49" />
              <circle r="4.5"><animateMotion dur="7s" repeatCount="indefinite" path="M80 49 Q500 160 920 49" /></circle>
            </svg>
            {nodes.map((nd, i) => {
              const inner = (
                <>
                  <span className="hq-node-disc">
                    <span className="hq-wave" /><span className="hq-wave w2" /><span className="hq-wave w3" />
                    <span className="hq-node-in"><nd.icon size={26} strokeWidth={1.7} /></span>
                  </span>
                  <span className="hq-node-lb">{nd.label}</span>
                </>
              )
              const st = { ['--t' as string]: n > 1 ? i / (n - 1) - 0.5 : 0, ['--i' as string]: i, ['--dl' as string]: `${i * 0.45}s` }
              return nd.to
                ? <Link key={`${nd.label}-${i}`} to={nd.to} className="ha-node" style={st}>{inner}</Link>
                : <button key={`${nd.label}-${i}`} type="button" className="ha-node" style={st} onClick={nd.onClick}>{inner}</button>
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
