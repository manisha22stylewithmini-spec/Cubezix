import Integrations from '../components/Integrations'
import HowWeWork from '../components/HowWeWork'
import FlowHero from '../components/FlowHero'
import HQJourney from '../components/nova/HQJourney'
import FeatureCards from '../components/sections/FeatureCards'
import ServicesBento from '../components/sections/ServicesBento'
import Testimonials from '../components/sections/Testimonials'
import ContactSection from '../components/sections/ContactSection'
import ModelScroller from '../components/sections/ModelScroller'
import { faqCats, faqs } from '../data/home'
import FaqSection from '../components/FaqSection'

export default function Home() {
  return (
    <>
      <HQJourney />
      <FlowHero hero={false} tail={<FeatureCards flush />} />
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

const Faq = () => <FaqSection cats={faqCats} items={faqs} lede="Straight answers on services, coverage and how contracts work." />
