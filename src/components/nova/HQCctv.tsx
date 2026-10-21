import { useState } from 'react'
import { Bell, Eye, Moon } from 'lucide-react'
import { Feed, Hint } from './HQScenes'
import { BulletCam, DomeCam } from './HQCameras'
import '../../styles/hq-cctv.css'

/* The CCTV station: wall cameras either side of a monitor showing the live clips.
   The clips are exported pictures that already carry their own on-screen text (camera name, time and
   detection boxes), so the wall adds only the glass, the scan light and the hover zoom. */

const TILES: { src: string; name: string; fallback?: 'ware'; title: string; items: string[] }[] = [
  { src: 'cam06-desk', name: 'CAM 06 · Desk monitoring', title: 'Desk monitoring', items: ['Staff presence & activity', 'Privacy zones supported', 'Recorded and searchable'] },
  { src: 'cam03-entrance', name: 'CAM 03 · Entrance', title: 'Entrance & access', items: ['Staff ID recognition', 'Turnstile and door integration', 'Visitor log with snapshots'] },
  { src: 'cam02-corridor', name: 'CAM 02 · Corridor', title: 'Corridor', items: ['Person detection', 'After-hours alerts', 'Wide-angle coverage'] },
  { src: 'cam01-parking', name: 'CAM 01 · Parking', title: 'Parking', items: ['Vehicle & number-plate capture', 'Direction tracking', 'Works day and night'] },
  { src: 'cam05-staff', name: 'CAM 05 · Staff area', title: 'Staff area', items: ['Live headcount', 'Status by employee ID', 'Works with attendance'] },
  { src: 'cam04-warehouse.png', name: 'CAM 04 · Warehouse', fallback: 'ware', title: 'Warehouse', items: ['Forklift and pallet tracking', 'Safety-zone alerts', 'Night vision'] },
]

function Tile({ t }: { t: (typeof TILES)[number] }) {
  const [bad, setBad] = useState(false)
  return (
    <span className="c-tile hq-hot" tabIndex={0}>
      {bad && t.fallback ? (
        <Feed kind={t.fallback} name={t.name} />
      ) : (
        <img src={`/assets/cctv/${t.src.includes('.') ? t.src : t.src + '.webp'}`} alt={t.name} draggable={false} loading="eager" onError={() => setBad(true)} />
      )}
      <span className="c-scan" />
    </span>
  )
}

/* the two cameras are drawn in SVG (HQCameras) so they stay crisp and match the scene */
const Dome = () => <DomeCam />
const Bullet = () => <BulletCam />

export function CctvArt() {
  return (
    <div className="hq-art c-art">
      <svg className="c-links" viewBox="0 0 1100 380" aria-hidden>
        <path id="cL" d="M178 190 C 205 226 236 248 276 264" />
        <path id="cR" d="M922 196 C 896 232 866 252 826 266" />
      </svg>
      <span className="c-run" style={{ offsetPath: "path('M178 190 C 205 226 236 248 276 264')", animationDelay: '0s' }} />
      <span className="c-run" style={{ offsetPath: "path('M922 196 C 896 232 866 252 826 266')", animationDelay: '1.4s' }} />

      <span className="c-camwrap l hq-hot">
        <Dome />
        <span className="c-chip"><Eye size={18} />360° dome · 4K</span>
      </span>
      <span className="c-camwrap r hq-hot">
        <Bullet />
        <span className="c-chip"><Moon size={18} />Bullet · Night Vision</span>
      </span>

      <div className="c-monitor">
        <span className="c-glowline" />
        <div className="c-screen">
          {TILES.map((t) => <Tile key={t.src} t={t} />)}
        </div>
        <span className="c-bezel-dot" />
      </div>
      <span className="c-neck" />
      <span className="c-base"><i /></span>
      <span className="hq-alert c-alert"><Bell size={13} /> Motion detected · Entrance</span>
      <Hint>Hover a camera or feed</Hint>
    </div>
  )
}
