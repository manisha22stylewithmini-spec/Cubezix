import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ease = [0.2, 0.7, 0.2, 1] as const

export interface PocketItem { to: string; title: string; text: string; icon: LucideIcon; kicker: string; tags?: string[] }

/* what sits in the pocket above and below the card, per column */
const SLOTS: { top: 'empty' | 'kicker'; bottom: 'empty' | 'icon' | 'cta'; tilt: number }[] = [
  { top: 'empty', bottom: 'icon', tilt: -2.6 },
  { top: 'kicker', bottom: 'empty', tilt: 2 },
  { top: 'empty', bottom: 'cta', tilt: -1.6 },
]

/** Three white pockets, each holding a tilted service card between two stitched tabs. */
export default function PocketCards({ items, cta = 'Explore service' }: { items: PocketItem[]; cta?: string }) {
  return (
    <div className="mt-14 grid gap-6 md:grid-cols-3">
      {items.slice(0, 3).map((it, i) => {
        const s = SLOTS[i]
        const Icon = it.icon
        const empty = (
          <div className="relative h-[72px] rounded-[18px] bg-[#f4f7ff]" aria-hidden>
            <span className="absolute inset-[6px] rounded-[13px] border border-dashed border-[#cfdaf5]" />
          </div>
        )
        const solid = (body: React.ReactNode) => (
          <div className="relative flex h-[72px] items-center justify-center overflow-hidden rounded-[18px] bg-[#2563ff] text-white">
            <span className="pointer-events-none absolute -right-6 -top-10 size-28 rounded-full bg-white/15 blur-xl" aria-hidden />
            <span className="pointer-events-none absolute inset-[6px] rounded-[13px] border border-dashed border-white/45" aria-hidden />
            <span className="relative flex items-center gap-2 text-[15.5px] font-semibold tracking-tight">{body}</span>
          </div>
        )
        const top = s.top === 'kicker' ? solid(<>{it.kicker}</>) : empty
        const bottom = s.bottom === 'icon' ? solid(<><Icon size={20} strokeWidth={1.8} /> {it.kicker}</>) : s.bottom === 'cta' ? solid(<>{cta} <ArrowUpRight size={16} /></>) : empty
        return (
          <motion.div key={it.to} className="h-full" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: i * 0.09, ease }}>
            <Link to={it.to} className="group flex h-full flex-col rounded-[30px] bg-white p-2.5 no-underline shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_30px_70px_-40px_rgba(37,99,255,0.45)] ring-1 ring-[#e6ecfa] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-40px_rgba(37,99,255,0.6)]">
              <div className="flex flex-1 flex-col rounded-[22px] bg-[radial-gradient(120%_70%_at_50%_0%,#eef3ff_0%,#f8faff_60%,#ffffff_100%)] p-2.5">
                {top}
                <div
                  className="relative z-10 -my-4 flex flex-1 flex-col rounded-[20px] bg-white/95 p-5 shadow-[0_0_0_1px_rgba(225,232,248,1),0_22px_44px_-22px_rgba(20,30,90,0.4)] backdrop-blur transition-transform duration-500 group-hover:!rotate-0"
                  style={{ transform: `rotate(${s.tilt}deg)` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="flex size-8 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#12a5f5] to-[#3b1ee0] text-white"><Icon size={15} /></span>
                      <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8a93a8]">{it.kicker}</span>
                    </span>
                    <span className="flex size-8 items-center justify-center rounded-full bg-[#f2f5fc] text-[#2563ff] transition-all duration-300 group-hover:bg-[#2563ff] group-hover:text-white"><ArrowUpRight size={15} /></span>
                  </div>
                  <h3 className="m-0 mt-4 text-[21px] font-bold leading-tight tracking-[-0.02em] text-[#0b1220]">{it.title}</h3>
                  <p className="m-0 mb-4 mt-2 line-clamp-3 text-[14px] leading-[1.6] text-[#667085]">{it.text}</p>
                  {it.tags && it.tags.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-1.5 border-t border-[#eef1f7] pt-4">
                      {it.tags.slice(0, 3).map((t, n) => (
                        <span key={`${t}-${n}`} className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f7ff] px-2.5 py-1 text-[11.5px] font-medium text-[#3b4a6b]"><i className="size-1.5 rounded-full bg-[#2563ff]" />{t}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-4">{bottom}</div>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
