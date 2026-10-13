import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import MagnifiedBento from '@/components/ui/magnified-bento'
import Eyebrow from '../Eyebrow'

const POINTS = ['One contract for support, infrastructure and cloud', 'Named engineers who own your estate', '15 minute median first response']

export default function ServicesBento() {
  return (
    <section className="relative bg-background py-24 font-sans">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <Eyebrow label="Services at a glance" note="One contract" />
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Intelligent IT, <span className="text-primary">organised for you</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Explore everything CubeZix runs for businesses across Dubai and the MENA region. Slide the lens across the
            services to see what is covered, then talk to an engineer about the pieces you need.
          </p>
          <ul className="m-0 mt-7 list-none space-y-3 p-0">
            {POINTS.map((p, i) => (
              <motion.li
                key={p}
                className="flex items-center gap-3 text-sm text-foreground"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
              >
                <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check size={14} />
                </span>
                {p}
              </motion.li>
            ))}
          </ul>
          <Link
            to="/services"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Explore all services
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <MagnifiedBento />
        </motion.div>
      </div>
    </section>
  )
}
