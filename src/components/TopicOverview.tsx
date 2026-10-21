import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import KeywordOrbit from './KeywordOrbit'

const ease = [0.2, 0.7, 0.2, 1] as const

/** The overview block every service page opens with: the topic's headline and text with the three promises
    on the left, and the topic's own keywords, one after another, on the right. */
export default function TopicOverview({ eyebrow, title, paras, keywords, icons, hubLabel, tag, cta, onCta }: {
  eyebrow?: string
  title: string
  paras: string[]
  keywords: string[]
  icons: LucideIcon[]
  hubLabel: string
  tag: string
  cta: string
  onCta: () => void
}) {
  const [tab, setTab] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = keywords.length
  useEffect(() => {
    if (paused || n < 2) return
    const id = window.setTimeout(() => setTab((t) => (t + 1) % n), 2600)
    return () => window.clearTimeout(id)
  }, [paused, n, tab])

  const words = title.split(' ')
  const dim0 = Math.min(1, words.length - 1)
  const dim1 = Math.max(dim0 + 1, Math.round(words.length * 0.62))
  return (
    <section className="px-4 pb-16 pt-6 sm:px-6 lg:px-12 lg:pb-24 lg:pt-8">
      <motion.div className="mx-auto max-w-[1280px] rounded-[40px] bg-white p-3 shadow-[0_40px_90px_-50px_rgba(37,99,255,0.45)] sm:p-4" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease }}>
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-[1fr_1.05fr]">
          <div className="relative flex flex-col overflow-hidden rounded-[30px] bg-gradient-to-br from-[#eef3ff] via-[#f6f9ff] to-white p-7 ring-1 ring-[#e3eaf9] sm:p-10">
            <div className="pointer-events-none absolute -left-20 -top-24 size-[340px] rounded-full bg-[radial-gradient(circle,rgba(37,99,255,0.16),transparent_68%)]" aria-hidden />
            <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(40,70,160,0.14)_1px,transparent_1.3px)] [background-size:22px_22px]" aria-hidden />
            {eyebrow && <span className="relative flex items-center gap-2 text-[12.5px] font-bold text-[#2563ff]"><i className="size-1.5 rounded-full bg-[#12a5f5] shadow-[0_0_8px_#12a5f5]" />{eyebrow}</span>}
            <h2 className="relative m-0 mt-5 text-[32px] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[42px]">
              {words.map((w, k) => <span key={k} className={k >= dim0 && k < dim1 ? 'text-[#b7c4e6]' : 'text-[#0b1220]'}>{w}{' '}</span>)}
            </h2>
            {paras.map((t, i) => <p key={i} className="relative m-0 mt-4 text-[16.5px] leading-[1.7] text-[#667085]">{t}</p>)}
            <div className="relative mt-auto grid grid-cols-3 gap-3 pt-10">
              {[['15 Mins', 'Response Time'], ['98%', 'Client Satisfaction'], ['8+ Years', 'Field Experience']].map(([a, l]) => (
                <div key={l} className="rounded-2xl bg-white/85 px-3 py-3.5 shadow-[0_14px_30px_-22px_rgba(37,99,255,0.5)] ring-1 ring-[#dfe6f6]"><div className="bg-gradient-to-r from-[#1795f3] via-[#2563ff] to-[#3828e1] bg-clip-text text-[20px] font-extrabold tracking-tight text-transparent">{a}</div><div className="mt-0.5 text-[12px] leading-tight text-[#667085]">{l}</div></div>
              ))}
            </div>
          </div>
          <KeywordOrbit keywords={keywords} icons={icons} hubLabel={hubLabel} active={Math.min(tab, n - 1)} onPick={setTab} onHold={setPaused} tag={tag} cta={cta} onCta={onCta} />
        </div>
      </motion.div>
    </section>
  )
}
