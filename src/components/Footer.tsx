import { Link } from 'react-router-dom'
import Icon from './Icon'
import { footerLinks } from '../data/site'

export default function Footer() {
  return (
    <>
      <section id="newsletter" aria-hidden />
      <footer className="ftr">
        <div className="ftr-in">
          <div className="ftr-cta">
            <h2>Reliable IT, Ready When You Are</h2>
            <p>From day-to-day support to full infrastructure builds, CubeZix keeps your business connected, secure, and running, so you can focus on growth, not downtime.</p>
            <Link to="/contact" className="btn btn-primary">Book free demo now</Link>
          </div>
          <div className="ftr-grid">
            <div className="ftr-about">
              <img src="/assets/cubezix-logo-full.png" alt="CubeZix" className="ftr-logo" />
              <p>CubeZix delivers IT infrastructure, outsourcing, security, and ERP solutions built for businesses across Dubai and the MENA region.</p>
              <div className="social">
                {(['twitter', 'facebook', 'linkedin'] as const).map((n) => (
                  <a key={n} href="#" aria-label={n}><Icon name={n} size={16} /></a>
                ))}
              </div>
            </div>
            <nav className="ftr-col" aria-label="Company">
              <div className="t">Company</div>
              {footerLinks.site.map((l) => <Link key={l.label} to={l.to}>{l.label}</Link>)}
            </nav>
            <nav className="ftr-col" aria-label="Services">
              <div className="t">Services</div>
              {footerLinks.services.map((l) => <Link key={l.label} to={l.to}>{l.label}</Link>)}
            </nav>
            <div className="ftr-col">
              <div className="t">Get in touch</div>
              <a href="tel:+97142414120">+971 4 241 4120</a>
              <a href="mailto:info@cubezix.com">info@cubezix.com</a>
              <a href="mailto:support@cubezix.com">support@cubezix.com</a>
              <span className="ftr-addr">Business Bay, Dubai, UAE</span>
            </div>
          </div>
          <div className="ftr-bar">
            <small>© 2026 CubeZix. All rights reserved.</small>
            <div>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/career">Careers</Link>
            </div>
          </div>
        </div>
        <div className="ftr-word" aria-hidden><span>CUBEZIX</span></div>
      </footer>
    </>
  )
}
