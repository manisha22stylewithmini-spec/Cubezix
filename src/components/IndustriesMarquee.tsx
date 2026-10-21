import { useEffect, useRef } from 'react'
import lottie from 'lottie-web/build/player/lottie_light'
import Eyebrow from './Eyebrow'

/* One Lottie animation per sector (LottieFiles), recoloured to the brand's navy, blue and sky ramp. */
/* some animations ship with a lot of empty canvas around the drawing; scale those up so every card reads the same size */
const SCALE: Record<string, number> = { health: 1.7, logistics: 1.2, public: 1.35, bank: 1.1, media: 1.1 }
const cache = new Map<string, Promise<object>>()
const load = (name: string) => {
  let p = cache.get(name)
  if (!p) { p = fetch(`/assets/lottie/${name}.json`).then((r) => r.json()); cache.set(name, p) }
  return p
}

function LottieArt({ name, label }: { name: string; label: string }) {
  const box = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let anim: ReturnType<typeof lottie.loadAnimation> | undefined
    let live = true
    load(name).then((data) => {
      if (!live || !box.current) return
      anim = lottie.loadAnimation({ container: box.current, renderer: 'svg', loop: true, autoplay: true, animationData: JSON.parse(JSON.stringify(data)), rendererSettings: { preserveAspectRatio: 'xMidYMid meet' } })
    }).catch(() => {})
    return () => { live = false; anim?.destroy() }
  }, [name])
  return <div ref={box} role="img" aria-label={label} className="h-[108px] w-[150px]" />
}

/** The sectors CubeZix names on its live IT AMC page. */
const SECTORS: { label: string; art: string; tint: string }[] = [
  { label: 'Financial Services & Insurance', art: 'bank', tint: 'from-[#e8efff] to-[#d4e2ff]' },
  { label: 'Healthcare', art: 'health', tint: 'from-[#e3f6fb] to-[#cdeaf6]' },
  { label: 'Real Estate', art: 'realestate', tint: 'from-[#efeaff] to-[#dcd6ff]' },
  { label: 'Petroleum and Oil & Gas', art: 'oilgas', tint: 'from-[#e9f0ff] to-[#cfdcff]' },
  { label: 'Manufacturing & Distribution', art: 'factory', tint: 'from-[#e4f1ff] to-[#cde3fb]' },
  { label: 'Logistics & Retail', art: 'logistics', tint: 'from-[#ece9ff] to-[#d8d2fb]' },
  { label: 'Educational Institutions', art: 'education', tint: 'from-[#e6f3ff] to-[#cfe5fb]' },
  { label: 'Media & Entertainment', art: 'media', tint: 'from-[#efe9ff] to-[#dad0fb]' },
  { label: 'Public Sector', art: 'public', tint: 'from-[#e8efff] to-[#d4e2ff]' },
  { label: 'Trading', art: 'trading', tint: 'from-[#e4f0fb] to-[#cbdff5]' },
]

function Card({ s }: { s: (typeof SECTORS)[number] }) {
  return (
    <figure className={`m-0 flex h-[132px] w-[340px] flex-none items-center justify-between gap-2 overflow-hidden rounded-[26px] border border-[#e3eaf9] bg-[#f3f6ff] pl-6 pr-3 sm:w-[380px]`}>
      <figcaption className="max-w-[170px] text-[18px] font-semibold leading-snug tracking-tight text-[#0b1220]">{s.label}</figcaption>
      {/* multiply drops the white backdrop most animations ship with, so only the drawing shows on the tint */}
      <div className="mix-blend-multiply" style={{ transform: `scale(${SCALE[s.art] ?? 1})` }}><LottieArt name={s.art} label={s.label} /></div>
    </figure>
  )
}

/** A constant, steady ticker of the sectors we work in: right to left, never eased, never stopping. */
export default function IndustriesMarquee() {
  return (
    <section className="overflow-hidden pb-4 pt-12 lg:pb-6 lg:pt-16" aria-label="Industries">
      <div className="flex justify-center px-6"><Eyebrow label="INDUSTRIES" note="10 sectors" /></div>
      <div className="mt-9 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="ind-track flex w-max gap-5 pr-5">
          {[...SECTORS, ...SECTORS].map((s, i) => <Card key={`${s.label}-${i}`} s={s} />)}
        </div>
      </div>
    </section>
  )
}
