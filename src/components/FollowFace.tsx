import { useEffect, useRef } from 'react'

/** Per character: where the neck sits (pivot, as % of the 718x388 art) so only the head turns. */
const PIVOT: Record<number, [number, number]> = {
  1: [55.78, 50.52],
  2: [40.25, 47.94],
  3: [45.13, 46.65],
  4: [46.59, 45.36],
  5: [52.79, 47.94],
  6: [50.28, 47.68],
}

const MAX_YAW = 1.1 // % of art width the head slides sideways at full deflection
const MAX_PITCH = 1.3 // % of art height up / down
const MAX_TILT = 5 // degrees of roll toward the cursor

/**
 * A character whose head follows the cursor while the body stays still.
 * Two aligned layers (body, head) cut from the same artwork; the head layer pivots on the neck.
 */
export default function FollowFace({ n, theme }: { n: number; theme: 'light' | 'dark' }) {
  const head = useRef<HTMLImageElement>(null)
  const box = useRef<HTMLDivElement>(null)
  const [px, py] = PIVOT[n] ?? [50, 48]

  useEffect(() => {
    const el = head.current
    const wrap = box.current
    if (!el || !wrap) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    let vx = 0
    let vy = 0
    const apply = () => {
      raf = 0
      const yaw = vx * MAX_YAW
      const pitch = vy * MAX_PITCH
      const tilt = vx * MAX_TILT - vy * 0.6 * vx
      // squeeze the head a touch when it turns or looks down so it reads as rotating, not just sliding
      const sx = 1 - Math.abs(vx) * 0.018
      const sy = 1 - Math.max(vy, 0) * 0.015 + Math.max(-vy, 0) * 0.01
      el.style.transform = `translate(${yaw}%, ${pitch}%) rotate(${tilt}deg) scale(${sx}, ${sy})`
    }
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect()
      const cx = r.left + r.width * (px / 100)
      const cy = r.top + r.height * (py / 100)
      const dx = (e.clientX - cx) / (window.innerWidth * 0.5)
      const dy = (e.clientY - cy) / (window.innerHeight * 0.5)
      const ease = (v: number) => Math.sign(v) * Math.min(Math.abs(v), 1) ** 0.75
      vx = ease(dx)
      vy = ease(dy)
      if (!raf) raf = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      vx = 0
      vy = 0
      if (!raf) raf = requestAnimationFrame(apply)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [px, py])

  const base = `/assets/model/cut/c${n}-${theme}`
  return (
    <div ref={box} className="mdx-face">
      <img className="mdx-face-body" src={`${base}-body.webp`} alt="" draggable={false} />
      <img
        ref={head}
        className="mdx-face-head"
        src={`${base}-head.webp`}
        alt=""
        draggable={false}
        style={{ transformOrigin: `${px}% ${py}%` }}
      />
    </div>
  )
}
