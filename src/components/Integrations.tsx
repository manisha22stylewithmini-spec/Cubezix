import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import Icon from './Icon'

function OrbitCard({ children, className = '', center = false }: { children: ReactNode; className?: string; center?: boolean }) {
  return (
    <div className={`orb-card ${center ? 'orb-center' : ''} ${className}`}>
      <div className="orb-ico">{children}</div>
    </div>
  )
}

const ico = (name: string) => <Icon name={name} size={20} />

/** Orbiting partner-platform graphic; rings spin on hover. */
export default function Integrations() {
  return (
    <section className="sec" style={{ overflowX: 'clip' }}>
      <div className="sec-pad" style={{ padding: '96px 24px' }}>
        <div className="orb group" aria-label="Platforms CubeZix works with">
          <div className="orb-spin" aria-hidden />
          <div className="orb-spin inner" aria-hidden />
          <div className="orb-ring">
            <OrbitCard className="o-lt">{ico('server')}</OrbitCard>
            <OrbitCard className="o-t">{ico('cloud')}</OrbitCard>
            <OrbitCard className="o-rt">{ico('network')}</OrbitCard>
          </div>
          <div className="orb-ring inner">
            <OrbitCard className="o-t">{ico('shield-check')}</OrbitCard>
            <OrbitCard className="o-lt2">{ico('layers')}</OrbitCard>
            <OrbitCard className="o-rt2">{ico('layout-grid')}</OrbitCard>
          </div>
          <div className="orb-core">
            <OrbitCard center><img src="/assets/logo-mark.png" alt="CubeZix" /></OrbitCard>
          </div>
        </div>
        <div className="orb-copy">
          <h2 className="h2" style={{ maxWidth: '22ch', margin: '0 auto' }}>Works with the platforms you already run</h2>
          <p className="lede" style={{ margin: '0 auto' }}>
            Microsoft 365, AWS, Cisco, Fortinet, VMware and more — CubeZix connects to your existing stack instead of replacing it.
          </p>
          <div><Link to="/services" className="btn btn-primary">Explore Services</Link></div>
        </div>
      </div>
    </section>
  )
}
