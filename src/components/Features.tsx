import type { ReactNode } from 'react'
import Icon from './Icon'
import '../styles/features.css'
import Eyebrow from './Eyebrow'

const bars = [62, 40, 28, 70, 46, 84, 58, 30, 88, 52, 76, 44, 66, 34, 80]

const rows = [
  { icon: 'wrench', tone: 'violet', title: 'Printer offline', date: '24 June 2026', value: '12 min' },
  { icon: 'network', tone: 'cyan', title: 'Wi-Fi upgrade', date: '24 June 2026', value: '2 days' },
  { icon: 'server', tone: 'rose', title: 'Server patching', date: '25 June 2026', value: '45 min' },
]

/** Phone outline. `status` shows the 9:41 bar; `screen` adds faint placeholder content. */
function Phone({ className = '', status, screen, children }: { className?: string; status?: boolean; screen?: boolean; children?: ReactNode }) {
  return (
    <div className={`fx-phone ${className}`}>
      {status && (
        <div className="fx-status"><span>9:41</span><i /></div>
      )}
      {screen && (
        <div className="fx-screen">
          <div className="fx-sline w60" />
          <div className="fx-sblock" />
          <div className="fx-srow"><span /><span /><span /></div>
          <div className="fx-stabs"><span /><span /><span /><span /></div>
        </div>
      )}
      {children}
    </div>
  )
}

export default function Features() {
  return (
    <section className="fx" aria-labelledby="fx-title">
      <div className="fx-in">
        <Eyebrow label="Features" note="One contract, one team" />
        <h2 id="fx-title" className="fx-h">Why manage IT with CubeZix?</h2>

        <div className="fx-grid">
          {/* 1 — control */}
          <article className="fx-card">
            <div className="fx-art" aria-hidden>
              <Phone className="p1">
                <span className="fx-app"><img src="/assets/logo-mark.png" alt="" /></span>
              </Phone>
              <div className="fx-chip c1">
                <div className="fx-chip-h"><i className="t-green"><Icon name="check" size={11} /></i>Resolved</div>
                <b>128</b>
                <small>closed out of 131</small>
              </div>
              <div className="fx-chip c2">
                <div className="fx-chip-h"><i className="t-violet"><Icon name="trending-up" size={11} /></i>Open tickets</div>
                <b>3</b>
                <small>avg. response 15 min</small>
              </div>
            </div>
            <div className="fx-copy">
              <h3>Take control of your IT with one contract</h3>
              <p>Support, infrastructure and security under a single AMC, with one point of contact.</p>
            </div>
          </article>

          {/* 2 — full picture */}
          <article className="fx-card">
            <div className="fx-art" aria-hidden>
              <Phone className="p2" status>
                <span className="fx-up"><Icon name="chevron-down" size={12} /></span>
              </Phone>
              <span className="fx-tile"><Icon name="server" size={34} /></span>
              <span className="fx-orb o-blue"><Icon name="cloud" size={15} /></span>
              <span className="fx-orb o-violet"><Icon name="layers" size={15} /></span>
              <span className="fx-orb o-green"><Icon name="network" size={15} /></span>
              <span className="fx-ghost"><Icon name="shield-check" size={22} /></span>
            </div>
            <div className="fx-copy">
              <h3>See the full picture of your estate</h3>
              <p>Servers, networks, licences and backups in one place, from head office to branch.</p>
            </div>
          </article>

          {/* 3 — faster */}
          <article className="fx-card">
            <div className="fx-art fx-list" aria-hidden>
              {rows.map((r, i) => (
                <div key={r.title} className="fx-row" style={{ ['--i' as string]: i }}>
                  <i className={`t-${r.tone}`}><Icon name={r.icon} size={13} /></i>
                  <span><b>{r.title}</b><small>{r.date}</small></span>
                  <em>{r.value}</em>
                </div>
              ))}
            </div>
            <div className="fx-copy">
              <h3>Resolve issues faster, every time</h3>
              <p>Every request gets a ticket ID, a named engineer and one documented path to resolution.</p>
            </div>
          </article>

          {/* 4 — audit */}
          <article className="fx-card wide">
            <div className="fx-copy">
              <h3>Stay audit-ready with documented systems</h3>
              <p>Asset registers, network maps and change logs, kept current for every review.</p>
            </div>
            <div className="fx-art" aria-hidden>
              <Phone className="pw" status screen />
              <div className="fx-paper doc">
                <b>AUDIT</b>
                {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className="fx-line"><span /><span /></div>)}
                <span className="fx-paper-ghost"><Icon name="check" size={18} /></span>
              </div>
            </div>
          </article>

          {/* 5 — insight */}
          <article className="fx-card wide">
            <div className="fx-copy">
              <h3>Understand uptime and spend with clarity</h3>
              <p>Monthly reports show availability, ticket trends and where your IT budget goes.</p>
            </div>
            <div className="fx-art" aria-hidden>
              <Phone className="pw" status screen />
              <div className="fx-paper chart">
                <small>Availability</small>
                <strong>99.95<span>%</span></strong>
                <div className="fx-bars">{bars.map((h, i) => <span key={i} style={{ height: `${h}%`, ['--i' as string]: i }} />)}</div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
