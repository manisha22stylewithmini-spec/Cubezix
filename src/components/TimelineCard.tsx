import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import type { LucideIcon } from 'lucide-react'

/** One card of the sticky timeline: it rises, sharpens and lights up as it travels up the screen,
    then settles a little back once it has passed, so the card in the middle of the screen is the active one. */
export default function TimelineCard({ tag, text, icon: Icon }: { tag: string; text: string; icon: LucideIcon }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 92%', 'end 30%'] })
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0.25, 1, 1, 0.45])
  const y = useTransform(scrollYProgress, [0, 0.35], [46, 0])
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0.94, 1, 1, 0.97])
  const glow = useTransform(scrollYProgress, [0.15, 0.4, 0.7, 0.95], [0, 1, 1, 0])
  const boxShadow = useTransform(glow, (g) => `0 24px 50px -30px rgba(37,99,255,${(0.5 * g).toFixed(2)})`)
  return (
    <motion.article ref={ref} className="group relative" style={{ opacity, y, scale, transformOrigin: 'left center' }}>
      <span className="absolute -left-[36px] top-1 flex size-[26px] items-center justify-center rounded-full border-2 border-[#c9d6f5] bg-white text-[#2563ff] transition-all duration-300 group-hover:scale-110 group-hover:border-[#2563ff] group-hover:bg-[#2563ff] group-hover:text-white"><Icon size={14} /></span>
      <span className="inline-block rounded-md bg-[#2563ff] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white">{tag}</span>
      <motion.div style={{ boxShadow }} className="mt-3 rounded-[20px] border border-[#e3e9f8] bg-white/90 p-5 text-[15px] leading-[1.7] text-[#4b5563] backdrop-blur transition-colors duration-300 group-hover:border-[#c9d6f5]">{text}</motion.div>
    </motion.article>
  )
}
