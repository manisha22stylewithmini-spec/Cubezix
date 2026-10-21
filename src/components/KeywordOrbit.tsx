import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'

const TINTS = [
  { bg: 'rgba(243,236,250,0.92)', fg: '#7a3a96' },
  { bg: 'rgba(232,238,252,0.92)', fg: '#3b5bb0' },
  { bg: 'rgba(230,246,238,0.92)', fg: '#2f7d5c' },
  { bg: 'rgba(240,240,244,0.92)', fg: '#6a6f7c' },
]

/** The panel of a service page's overview, in the manner of a product tour: the page name set large on the left,
    its keywords as a fan of frosted cards on the right. The front card goes to the back, the next one comes forward. */
export default function KeywordOrbit({ keywords, icons, hubLabel, active, onPick, onHold, tag, cta, onCta }: {
  keywords: string[]
  icons: LucideIcon[]
  hubLabel: string
  active: number
  onPick: (i: number) => void
  onHold: (held: boolean) => void
  tag: string
  cta: string
  onCta: () => void
}) {
  const n = keywords.length
  const VISIBLE = Math.min(4, n)
  return (
    <div
      className="@container relative flex min-w-0 flex-col overflow-hidden rounded-[30px] p-6 sm:p-9"
      onMouseEnter={() => onHold(true)} onMouseLeave={() => onHold(false)} onFocus={() => onHold(true)} onBlur={() => onHold(false)}
    >
      {/* the colour behind the cards */}
      <div className="pointer-events-none absolute right-[-8%] top-[18%] h-[62%] w-[62%] rounded-full opacity-80 blur-[60px] [background:radial-gradient(circle_at_30%_40%,rgba(80,130,255,0.55),transparent_55%),radial-gradient(circle_at_70%_75%,rgba(255,150,120,0.45),transparent_55%),radial-gradient(circle_at_80%_25%,rgba(120,220,170,0.4),transparent_55%)]" aria-hidden />

      <div className="relative grid flex-1 items-center">

        {/* the fan of cards */}
        <div className="relative h-[320px] @[560px]:h-[380px]" style={{ perspective: 1000 }}>
          <div className="absolute inset-0" style={{ transform: 'rotateY(-24deg) rotateX(6deg) rotateZ(-3deg)', transformStyle: 'preserve-3d' }}>
            {keywords.map((k, i) => {
              const j = (i - active + n) % n
              const I = icons[i % icons.length]
              const t = TINTS[i % TINTS.length]
              const shown = j < VISIBLE
              return (
                <motion.button
                  key={`${k}-${i}`}
                  type="button"
                  onClick={() => onPick(i)}
                  className="absolute bottom-[8%] left-[2%] flex w-[78%] max-w-[300px] cursor-pointer items-center gap-3 rounded-[20px] border border-white/80 px-5 py-4 text-left shadow-[0_24px_50px_-24px_rgba(40,50,110,0.35)] backdrop-blur-md"
                  style={{ background: t.bg, color: t.fg, zIndex: n - j, pointerEvents: shown ? 'auto' : 'none' }}
                  initial={false}
                  animate={{ x: shown ? j * 38 : 3 * 38, y: shown ? -j * 62 : -3 * 62 - 30, scale: shown ? 1 - j * 0.045 : 0.86, opacity: shown ? 1 - j * 0.3 : 0, filter: `blur(${j * 0.9}px)` }}
                  transition={{ duration: 0.9, ease: [0.22, 0.8, 0.2, 1] }}
                >
                  <I size={22} strokeWidth={1.7} className="flex-none" />
                  <span className="text-[16px] font-semibold leading-snug sm:text-[17px]">{k}</span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="relative mt-4 flex flex-col items-center gap-5">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2"><div className="flex items-center gap-1.5" role="tablist" aria-label={hubLabel}>
          {keywords.map((k, i) => (
            <button key={`${k}-${i}`} type="button" role="tab" aria-selected={i === active} aria-label={k} onClick={() => onPick(i)} className="h-5 cursor-pointer border-0 bg-transparent p-0">
              <span className={`block h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-8 bg-[#2563ff]' : 'w-1.5 bg-[#c6cbd8] hover:bg-[#9aa3b8]'}`} />
            </button>
          ))}
        </div>
        </div>
        <button type="button" onClick={onCta} className="btn-cubezix flex min-w-[200px] cursor-pointer items-center justify-between gap-4 border-0">
          {cta} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
