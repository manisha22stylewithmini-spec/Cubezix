import { useState } from 'react'
import Icon from '../components/Icon'
import Integrations from '../components/Integrations'
import HowWeWork from '../components/HowWeWork'
import FlowHero from '../components/FlowHero'
import HQJourney from '../components/nova/HQJourney'
import FeatureCards from '../components/sections/FeatureCards'
import ServicesBento from '../components/sections/ServicesBento'
import Testimonials from '../components/sections/Testimonials'
import ContactSection from '../components/sections/ContactSection'
import ModelScroller from '../components/sections/ModelScroller'
import { partners, faqCats, faqs } from '../data/home'
import Eyebrow from '../components/Eyebrow'

export default function Home() {
  return (
    <>
      <HQJourney />
      <FlowHero hero={false} />
      <Partners />
      <FeatureCards />
      <Integrations />
      <HowWeWork />
      <ServicesBento />
      <ModelScroller />
      <Testimonials />
      <Faq />
      <ContactSection />
    </>
  )
}

function Partners() {
  const row = [...partners, ...partners]
  return (
    // gradient sampled from the design (Look Animation.pdf): top #f4f6fa down to #e3e4eb, no top or bottom rule
    <section className="sec" style={{ background: 'linear-gradient(180deg, #f4f6fa 0%, #f0f2f7 45%, #e8e9f0 78%, #e3e4eb 100%)', border: 0 }}>
      <div className="wrap" style={{ padding: '64px 48px' }}>
        <div className="mq-mask" aria-label="Technology partners">
          <div className="mq-track">
            {[...row, ...row].map((p, i) => (
              <div className="mq-card" key={i} aria-hidden={i >= partners.length ? true : undefined}>
                <i><Icon name={p.icon} size={18} /></i>
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Faq() {
  const [catId, setCatId] = useState('services')
  const [open, setOpen] = useState('services-0')
  const cat = faqCats.find((c) => c.id === catId)!
  return (
    <section className="sec">
      <div className="sec-pad">
        <div className="center-head" style={{ marginBottom: 56 }}>
          <Eyebrow label="FAQs" note="Straight answers" />
          <h2 className="h2">Frequently asked questions</h2>
          <p className="lede">Straight answers on services, coverage and how contracts work.</p>
        </div>
        <div className="faq-shell">
          <div className="faq-rail">
            <h3>FAQs</h3>
            <nav>
              {faqCats.map((c) => (
                <button key={c.id} type="button" className={`faq-cat${c.id === catId ? ' on' : ''}`} onClick={() => { setCatId(c.id); setOpen(`${c.id}-0`) }}>
                  <Icon name={c.icon} size={18} />{c.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="faq-main">
            <div>
              <h2>{cat.heading}</h2>
              <p>{cat.sub}</p>
            </div>
            <div className="faq-list">
              {faqs[catId].map((item, i) => {
                const key = `${catId}-${i}`
                const on = open === key
                return (
                  <div className="faq-item" key={key}>
                    <button type="button" className="faq-q" aria-expanded={on} onClick={() => setOpen(on ? '' : key)}>
                      {item.q}
                      <i><Icon name="chevron-down" size={17} /></i>
                    </button>
                    {on && <p className="faq-a">{item.a}</p>}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
