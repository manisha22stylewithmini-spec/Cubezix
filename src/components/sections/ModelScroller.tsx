import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import Eyebrow from '../Eyebrow'
import { model } from '@/data/home'

const HEADER = 84 // sticky site header height
const RADIUS = 32

/** Blue line that starts mid-left and runs both ways round the card edge until the two ends meet. */
function Ring() {
  const ref = useRef<HTMLDivElement>(null)
  const [s, setS] = useState({ w: 0, h: 0 })
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setS({ w: e.contentRect.width, h: e.contentRect.height }))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const { w, h } = s
  const r = RADIUS
  const o = 1.5 // keep the 3px stroke inside the card
  const x1 = w - o
  const y1 = h - o
  const my = h / 2
  // upper arm: left-middle -> up -> top edge -> down the right side to right-middle
  const up = `M ${o} ${my} V ${r} Q ${o} ${o} ${r} ${o} H ${x1 - r} Q ${x1} ${o} ${x1} ${r} V ${my}`
  // lower arm: left-middle -> down -> bottom edge -> up the right side to right-middle
  const down = `M ${o} ${my} V ${y1 - r} Q ${o} ${y1} ${r} ${y1} H ${x1 - r} Q ${x1} ${y1} ${x1} ${y1 - r} V ${my}`
  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-20" aria-hidden>
      {w > 0 && (
        <svg width={w} height={h} className="absolute inset-0 overflow-visible">
          <path className="ms-ring ms-ring-up" d={up} pathLength={1} />
          <path className="ms-ring ms-ring-down" d={down} pathLength={1} />
        </svg>
      )}
    </div>
  )
}

/** "Our model": vertical scroll drives a horizontal track of six step cards while the section is pinned. */
export default function ModelScroller() {
  const section = useRef<HTMLElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [pinned, setPinned] = useState(true)
  const N = model.length

  useEffect(() => {
    const sec = section.current
    const vp = viewport.current
    const tr = track.current
    if (!sec || !vp || !tr) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let dist = 0
    let target = 0
    let shown = 0
    let raf = 0

    const paint = () => {
      const pos = shown * (N - 1)
      tr.style.transform = `translate3d(${-shown * dist}px,0,0)`
      tr.querySelectorAll<HTMLElement>('[data-card]').forEach((c, i) => {
        const dist1 = Math.abs(i - pos)
        const d = Math.min(dist1, 1)
        c.style.setProperty('--d', d.toFixed(3))
        c.style.boxShadow = `0 ${40 - d * 34}px ${90 - d * 70}px -30px rgba(20,30,90,${(0.34 * (1 - d)).toFixed(3)}), 0 0 0 1px rgba(20,30,90,${(0.04 + d * 0.02).toFixed(3)})`
        // the border completes its round as the card arrives in the centre, and un-draws as it leaves
        const ring = Math.min(Math.max(1 - dist1 / 0.85, 0), 1)
        const ease = ring * ring * (3 - 2 * ring)
        c.querySelectorAll<SVGPathElement>('.ms-ring').forEach((p) => {
          p.style.strokeDashoffset = String(1 - ease)
          p.style.opacity = ring > 0.001 ? '1' : '0'
        })
      })
    }
    let last = 0
    // time-based easing (~140ms time constant) so it feels the same at 60Hz, 120Hz or in a throttled tab
    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 1000) : 16
      last = now
      shown += (target - shown) * (1 - Math.exp(-dt / 140))
      if (Math.abs(target - shown) < 0.0004) { shown = target; raf = 0; last = 0 } else raf = requestAnimationFrame(tick)
      paint()
    }
    const measure = () => {
      const pin = window.innerWidth > 900
      setPinned(pin)
      if (!pin) {
        sec.style.height = ''
        tr.style.transform = ''
        tr.querySelectorAll<SVGPathElement>('.ms-ring').forEach((p) => { p.style.strokeDashoffset = '0'; p.style.opacity = '0' })
        return
      }
      dist = Math.max(tr.scrollWidth - vp.clientWidth, 0)
      sec.style.height = `${dist + window.innerHeight}px`
      onScroll()
      shown = target
      paint()
    }
    const onScroll = () => {
      if (window.innerWidth <= 900) return
      const r = sec.getBoundingClientRect()
      const span = sec.offsetHeight - window.innerHeight
      target = span > 0 ? Math.min(Math.max(-r.top / span, 0), 1) : 0
      if (reduce) { shown = target; paint() } else if (!raf) raf = requestAnimationFrame(tick)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(vp)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
    }
  }, [N])

  return (
    <section ref={section} className="ms relative bg-[#f5f6fa] font-sans" aria-label="Our model">
      <div
        className={pinned ? 'sticky top-0 flex h-screen flex-col overflow-hidden' : 'flex flex-col py-20'}
        style={pinned ? { paddingTop: HEADER } : undefined}
      >
        {/* soft lavender wash behind the whole panel */}
        <div className="pointer-events-none absolute inset-0 [background:linear-gradient(180deg,#f4f6fc_0%,#eef1fb_100%),radial-gradient(60%_50%_at_10%_10%,rgba(37,99,255,0.08),transparent_70%)]" aria-hidden />

        <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center px-6 pt-5 text-center lg:px-12">
          <Eyebrow label="Our model" note="Six steps, one team" />
          <h2 className="m-0 mt-4 text-3xl font-semibold leading-[1.1] tracking-tight text-[#0b1220] lg:text-[44px]">
            How we run your IT, <span className="text-[#2563ff]">step by step</span>
          </h2>
        </div>

        {/* horizontal track */}
        <div ref={viewport} className={`relative mt-6 mb-8 w-full flex-1 ${pinned ? 'min-h-0' : 'overflow-x-auto [scroll-snap-type:x_mandatory] [scrollbar-width:none]'}`}>
          <div ref={track} className="flex h-full items-center gap-6 px-6 will-change-transform lg:gap-8 lg:px-[max(48px,calc((100vw-1080px)/2))]">
            {model.map((m, i) => (
              <article
                key={m.quote}
                data-card
                className="ms-card group relative h-[min(540px,100%)] w-[min(88vw,1080px)] flex-none overflow-hidden rounded-[32px] bg-white [scroll-snap-align:center]"
              >
                {/* artwork: fills the right side to the card edge, never cropped */}
                <div className="absolute inset-y-0 right-0 hidden w-[54%] items-center justify-end md:flex">
                  <img
                    src={`/assets/${m.img}`}
                    alt=""
                    className="ms-img block h-full max-h-full w-full object-contain object-right mix-blend-multiply"
                    draggable={false}
                  />
                </div>

                {/* big gradient number that sits behind the title */}
                <span className="ms-num pointer-events-none absolute left-9 top-2 select-none text-[230px] font-black leading-none tracking-tighter" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="relative z-10 flex h-full w-full flex-col justify-end p-9 md:w-[56%] lg:p-11">
                  <h3 className="m-0 text-[40px] font-medium leading-[1.05] tracking-tight text-[#0b1220] lg:text-[46px]">{m.quote}</h3>
                  <p className="m-0 mt-4 max-w-[34ch] text-[17px] leading-relaxed text-[#5b6475]">{m.body}</p>
                  <ul className="m-0 mt-6 grid list-none grid-cols-2 gap-x-6 gap-y-2.5 p-0">
                    {m.keys.map((k) => (
                      <li key={k} className="flex items-center gap-2.5 text-[15px] text-[#334155]">
                        <span className="flex size-[22px] flex-none items-center justify-center rounded-full bg-[#e8f8f1] text-[#12a37a]">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        {k}
                      </li>
                    ))}
                  </ul>
                  <Link to="/services" className="mt-9 inline-flex w-fit items-center gap-2 text-[16px] font-semibold text-[#2563ff]">
                    Learn more <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                <span className="absolute right-5 top-5 z-10 inline-flex items-center gap-2 rounded-full bg-[#eef3ff] px-3.5 py-1.5 text-[13px] font-semibold text-[#2563ff]">
                  <i className="size-1.5 rounded-full bg-[#2563ff]" />
                  Step {i + 1} · {m.company}
                </span>
                <span className="absolute bottom-5 right-5 z-10 rounded-full border border-[#e4e8f2] bg-white px-3.5 py-1.5 text-[13px] font-semibold text-[#334155] shadow-sm">
                  {m.company}
                </span>

                <Ring />
                <span className="ms-flat pointer-events-none absolute inset-0 z-30 rounded-[32px]" aria-hidden />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
