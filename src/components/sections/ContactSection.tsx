import { useState, type FormEvent } from 'react'
import { motion } from 'motion/react'
import { Check } from 'lucide-react'

const STEPS = [
  'We schedule a call at your convenience',
  'We do a discovery and consulting meeting',
  'We prepare a proposal',
]

const field =
  'h-[50px] w-full rounded-xl border border-[#e6e9f0] bg-white px-4 text-[15px] text-[#0b1220] outline-none transition-colors placeholder:text-[#8a93a5] focus:border-[#2563ff] focus:ring-4 focus:ring-[#2563ff]/10'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[13px] text-[#667085]">{label}</span>
      {children}
    </label>
  )
}

export default function ContactSection() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
    window.setTimeout(() => {
      setSent(false)
      e.currentTarget?.reset?.()
    }, 4000)
  }

  return (
    <section id="contact" className="bg-white px-6 py-20 font-sans lg:px-12">
      <div className="mx-auto grid max-w-[1180px] items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <div className="text-[16px] text-[#2563ff]">[ Contact us ]</div>
          <h2 className="m-0 mt-3 text-[44px] font-bold leading-[1.1] tracking-tight text-[#0b1220]">What happens next?</h2>

          <ol className="m-0 mt-6 flex list-none flex-col gap-4 p-0">
            {STEPS.map((s, i) => (
              <li key={s} className="flex items-center gap-4 text-[17px] text-[#3b4352]">
                <span className="flex size-[30px] flex-none items-center justify-center rounded-full border border-[#e2e6ef] bg-white text-[13px] text-[#2563ff]">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>

          <div className="mt-8 border-t border-[#e6e9f0] py-6">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[22px] font-medium text-[#0b1220]">
              <a href="tel:+8002823949" className="text-inherit">+800 2823949</a>
              <span className="h-7 w-px bg-[#0b1220]" aria-hidden />
              <a href="tel:+97142414120" className="text-inherit">+971 4 241 4120</a>
            </div>
          </div>

          <div className="border-y border-[#e6e9f0] py-7">
            <div className="text-[13px] tracking-[0.18em] text-[#667085]">REACH US</div>
            <div className="mt-5 flex flex-col gap-4 text-[18px]">
              <a href="mailto:info@cubezix.com" className="text-[#0b1220]">info@cubezix.com</a>
              <a href="mailto:support@cubezix.com" className="text-[#0b1220]">support@cubezix.com</a>
              <span className="text-[#667085]">805, The Burlington Tower, Business Bay, Dubai, UAE</span>
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          className="rounded-[28px] border border-[#e6e9f0] bg-white p-8 sm:p-11"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <h3 className="m-0 text-[26px] font-bold tracking-tight text-[#0b1220]">Schedule a free consultation</h3>
          <p className="m-0 mt-3 text-[15px] text-[#667085]">Tell us about your business and we will come back with a scoped proposal.</p>

          <div className="mt-7 grid gap-x-4 gap-y-5 sm:grid-cols-2">
            <Field label="Full name"><input className={field} name="name" placeholder="Your name" required autoComplete="name" /></Field>
            <Field label="Email"><input className={field} type="email" name="email" placeholder="name@email.com" required autoComplete="email" /></Field>
            <Field label="Phone"><input className={field} type="tel" name="phone" placeholder="+971" autoComplete="tel" /></Field>
            <Field label="Service you need"><input className={field} name="service" placeholder="e.g. IT AMC, CCTV, Microsoft 365" /></Field>
            <div className="sm:col-span-2">
              <Field label="Anything we should know">
                <textarea
                  className={`${field} h-[132px] resize-none py-3.5`}
                  name="notes"
                  placeholder="Number of users and sites, current setup, anything urgent."
                />
              </Field>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
            <button type="submit" className="btn btn-primary !h-[54px] !px-9 !text-[18px]">
              {sent ? <><Check size={18} className="mr-2" /> Sent</> : 'Contact Now'}
            </button>
            <a href="mailto:info@cubezix.com" className="text-[16px] text-[#2563ff]">or email info@cubezix.com</a>
          </div>
          <p className={`m-0 mt-4 text-sm text-[#12a37a] transition-opacity ${sent ? 'opacity-100' : 'opacity-0'}`} role="status">
            Thanks. We will be in touch shortly.
          </p>
        </motion.form>
      </div>
    </section>
  )
}
