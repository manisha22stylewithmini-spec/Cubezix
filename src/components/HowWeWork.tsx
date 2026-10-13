import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import '../styles/how-we-work.css'
import Eyebrow from './Eyebrow'

type TabKey = 'new' | 'ongoing'

const content = {
  new: {
    label: 'New projects',
    steps: [
      { title: 'Map your estate and priorities', body: 'Tell us what you run today and where it hurts, so the assessment starts from facts, not assumptions.' },
      { title: 'Review a proposal built on the assessment', body: 'A scoped plan with named engineers, coverage hours and a fixed timeline. No templates.', alt: 'Need help right now instead?', altBody: 'Open a ticket by email, chat or phone and follow it to resolution.' },
      { title: 'Go live with a team that stays', body: 'The engineers who built it keep running it, with monthly health reports and one escalation path.' },
    ],
    chips: ['Networks', 'Cloud', 'Security', '+5'],
    estate: [['server', 'Head office', '42 devices'], ['cloud', 'Cloud workloads', '6 services']],
    proposal: ['Proposal ready for', 'New Office IT Setup', 'Business Bay, Dubai'],
    engineer: ['Amir Khan', 'Named account engineer', 'Amir owns your estate and joins the kick-off call.'],
    report: ['Monthly health report', 'All systems healthy', 'Backups verified, patching done.'],
  },
  ongoing: {
    label: 'Ongoing support',
    steps: [
      { title: 'Document your estate once', body: 'Asset registers, network maps and licences live in one place, so nothing depends on memory.' },
      { title: 'Get proactive checks and fast responses', body: 'Scheduled health checks and a documented path from request to fix, with a 15 minute median first response.', alt: 'Service down?', altBody: '24/7 escalation is part of the AMC, with a named owner on every ticket.' },
      { title: 'Review, adjust and grow the scope', body: 'Each year we compare coverage with what actually happened, then adjust before renewal.' },
    ],
    chips: ['AMC', 'Helpdesk', 'Backups', '+3'],
    estate: [['network', 'Branch network', '3 sites'], ['shield-check', 'Firewall policy', 'Reviewed today']],
    proposal: ['Health check due for', 'Quarterly Estate Review', 'All Dubai sites'],
    engineer: ['Sara Ali', 'Named support engineer', 'Sara handled your ticket and confirmed the fix.'],
    report: ['Quarterly review', '99.9% availability', 'Two tickets closed within SLA.'],
  },
} satisfies Record<TabKey, unknown>

function useReveal<T extends Element>() {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) { setSeen(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, seen] as const
}

function Row({ flip, children }: { flip?: boolean; children: ReactNode }) {
  const [ref, seen] = useReveal<HTMLDivElement>()
  return <div ref={ref} className={`hw-row${flip ? ' flip' : ''}${seen ? ' in' : ''}`}>{children}</div>
}

const GAP = 72 // matches .hw-row column gap
const CONN_H = 110

/** Right-angled connector (down, across, down) styled like the page pipe: 3px grey base, blue fill drawn with scroll. */
function Connector({ flip }: { flip?: boolean }) {
  const ref = useRef<SVGSVGElement>(null)
  const draw = useRef<SVGPathElement>(null)
  const pill = useRef<SVGGElement>(null)
  const [w, setW] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const col = (w - GAP) / 4
  const left = col
  const right = w - col
  const [x1, x2] = flip ? [right, left] : [left, right]
  const mid = CONN_H / 2
  const dir = x2 >= x1 ? 1 : -1
  const r = Math.max(0, Math.min(34, Math.abs(x2 - x1) / 2, mid))
  const d = `M ${x1} 0 V ${mid - r} Q ${x1} ${mid} ${x1 + dir * r} ${mid} H ${x2 - dir * r} Q ${x2} ${mid} ${x2} ${mid + r} V ${CONN_H}`
  const cx = (x1 + x2) / 2

  useEffect(() => {
    const path = draw.current
    const svg = ref.current
    if (!path || !svg || !w) return
    const len = path.getTotalLength()
    path.style.strokeDasharray = `${len}`
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    const update = () => {
      raf = 0
      const rect = svg.getBoundingClientRect()
      const vh = window.innerHeight
      const p = reduce ? 1 : Math.min(Math.max((vh * 0.85 - rect.top) / (vh * 0.5), 0), 1)
      path.style.strokeDashoffset = `${len * (1 - p)}`
      pill.current?.classList.toggle('on', p >= 0.5 - 0.001 && p > 0)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf) }
  }, [w, d])

  return (
    <svg ref={ref} className="hw-conn" width="100%" height={CONN_H} viewBox={`0 0 ${w || 1} ${CONN_H}`} aria-hidden>
      {w > 0 && (
        <>
          <path d={d} className="hw-conn-base" />
          <path ref={draw} d={d} className="hw-conn-draw" />
          <g ref={pill} className="hw-pill" transform={`translate(${cx - 33} ${mid - 13})`}>
            <rect className="hw-pill-body" width="66" height="26" rx="13" />
            <rect className="hw-pill-core" x="7" y="7" width="52" height="12" rx="6" />
          </g>
        </>
      )}
    </svg>
  )
}

export default function HowWeWork() {
  const [tab, setTab] = useState<TabKey>('new')
  const keys = Object.keys(content) as TabKey[]
  const t = content[tab]

  const onKey = (e: KeyboardEvent) => {
    const i = keys.indexOf(tab)
    if (e.key === 'ArrowRight') setTab(keys[(i + 1) % keys.length])
    else if (e.key === 'ArrowLeft') setTab(keys[(i - 1 + keys.length) % keys.length])
    else return
    e.preventDefault()
    ;(e.currentTarget.querySelectorAll('[role=tab]')[(i + (e.key === 'ArrowRight' ? 1 : keys.length - 1)) % keys.length] as HTMLElement)?.focus()
  }

  return (
    <section className="hw" aria-labelledby="hw-title">
      <div className="hw-in">
        <header className="hw-head">
          <Eyebrow label="How it works" note="Three simple steps" />
          <h2 id="hw-title" className="hw-h">How CubeZix works</h2>
          <p className="hw-sub">Your business gets engineers who own the estate, whether you are building a new office, moving to the cloud or handing over day-to-day IT.</p>
          <div className="hw-tabs" role="tablist" aria-label="Engagement type" onKeyDown={onKey} data-active={tab}>
            <span className="hw-thumb" aria-hidden />
            {keys.map((k) => (
              <button key={k} id={`hw-tab-${k}`} role="tab" aria-selected={tab === k} aria-controls="hw-panel" tabIndex={tab === k ? 0 : -1} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>
                {content[k].label}
              </button>
            ))}
          </div>
        </header>

        <div id="hw-panel" role="tabpanel" aria-labelledby={`hw-tab-${tab}`} key={tab} className="hw-panel">
          <Row>
            <div className="hw-txt">
              <span className="hw-num">1</span>
              <h3>{t.steps[0].title}</h3>
              <p>{t.steps[0].body}</p>
            </div>
            <div className="hw-art g1">
              <div className="hw-ui hw-float">
                <b className="hw-lbl">We support</b>
                <div className="hw-chips">{t.chips.map((c) => <span key={c}>{c}</span>)}</div>
              </div>
              <div className="hw-ui">
                <b className="hw-lbl">My estate</b>
                {t.estate.map(([ic, n, s]) => (
                  <div className="hw-li" key={n}><i><Icon name={ic} size={16} /></i><div><span>{n}</span><small>{s}</small></div></div>
                ))}
              </div>
            </div>
          </Row>

          <Connector />

          <Row flip>
            <div className="hw-txt">
              <span className="hw-num">2</span>
              <h3>{t.steps[1].title}</h3>
              <p>{t.steps[1].body}</p>
              <div className="hw-or"><span>OR</span></div>
              <h4>{t.steps[1].alt}</h4>
              <p>{t.steps[1].altBody}</p>
            </div>
            <div className="hw-stack">
              <div className="hw-art g2">
                <div className="hw-ui">
                  <div className="hw-from"><i><Icon name="users" size={14} /></i>Shared by your CubeZix team</div>
                  <small className="hw-k">{t.proposal[0]}</small>
                  <strong className="hw-big">{t.proposal[1]}</strong>
                  <span className="hw-dim">{t.proposal[2]}</span>
                </div>
                <button type="button" className="hw-ui hw-act"><Icon name="check" size={18} /><span><b>Looks right to me</b><small>Approve or suggest changes</small></span><Icon name="arrow-right" size={16} /></button>
              </div>
              <div className="hw-art g3">
                <div className="hw-ui hw-center">
                  <span className="hw-av big">{t.engineer[0][0]}</span>
                  <b>{t.engineer[0]}</b>
                  <small className="hw-dim">{t.engineer[1]}</small>
                  <div className="hw-note"><small>Context from CubeZix</small>{t.engineer[2]}</div>
                </div>
                <div className="hw-pill"><Icon name="check" size={14} />Ticket #4821 acknowledged</div>
              </div>
            </div>
          </Row>

          <Connector flip />

          <Row>
            <div className="hw-txt">
              <span className="hw-num">3</span>
              <h3>{t.steps[2].title}</h3>
              <p>{t.steps[2].body}</p>
              <div className="hw-cta">
                <Link to="/contact" className="btn btn-primary hw-btn">Book a free assessment</Link>
                <Link to="/services" className="hw-link">See services <Icon name="arrow-right" size={15} /></Link>
              </div>
            </div>
            <div className="hw-art g4">
              <div className="hw-ui hw-center">
                <div className="hw-from"><i><Icon name="shield-check" size={14} /></i>{t.report[0]}</div>
                <div className="hw-avs"><span className="hw-av">A</span><span className="hw-av alt">S</span></div>
                <b>{t.report[1]}</b>
                <small className="hw-dim">{t.report[2]}</small>
              </div>
              <div className="hw-pill"><span className="hw-live" />Monitored 24/7</div>
            </div>
          </Row>
        </div>
      </div>
    </section>
  )
}
