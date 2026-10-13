import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, ChevronDown, Menu, Phone, X } from 'lucide-react'
import { navGroups, type NavGroup } from '../data/site'

export function AwardBar() {
  return (
    <div className="award">
      <div className="award-in">
        <span className="award-tag">Award</span>
        <span>Second consecutive year of receiving this prestigious recognition. SMB Connect Award 2024 &amp; 2025.</span>
      </div>
    </div>
  )
}

const PHONE = '+971 4 241 4120'

function Thumb({ src, alt }: { src?: string; alt: string }) {
  return (
    <span className="relative block h-[68px] w-[148px] flex-none overflow-hidden rounded-xl bg-muted ring-1 ring-black/5">
      {src && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover/item:scale-110"
        />
      )}
    </span>
  )
}

function MegaPanel({ group, onClose }: { group: NavGroup; onClose: () => void }) {
  const cols = group.items.length > 4 ? 3 : 2
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_30px_80px_-20px_rgba(15,23,42,0.28)]">
      <div className="px-8 pb-6 pt-6">
        {group.eyebrow && <div className="mb-4 text-[13px] font-semibold text-primary">{group.eyebrow}</div>}
        <div className={`grid gap-x-8 gap-y-3 ${cols === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {group.items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.03 * i }}
            >
              <Link
                to={it.to}
                onClick={onClose}
                className="group/item flex items-start gap-4 rounded-2xl p-2.5 transition-colors hover:bg-slate-50"
              >
                <Thumb src={it.img} alt={it.title} />
                <span className="flex min-w-0 flex-col pt-0.5">
                  <span className="text-[16px] font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover/item:text-primary">
                    {it.title}
                  </span>
                  <span className="mt-1 text-[13.5px] leading-snug text-muted-foreground">{it.desc}</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 bg-slate-50/80 px-8 py-4">
        {group.cta ? (
          <Link to={group.cta.to} onClick={onClose} className="group inline-flex items-center gap-2 text-sm font-semibold text-primary">
            {group.cta.text}
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        ) : <span />}
        <div className="flex items-center gap-5">
          <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="text-sm font-medium text-foreground hover:text-primary">Call {PHONE}</a>
          <Link to="/contact" onClick={onClose} className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-transform hover:-translate-y-0.5">
            Book free demo
          </Link>
        </div>
      </div>
    </div>
  )
}

function ListPanel({ group, onClose }: { group: NavGroup; onClose: () => void }) {
  return (
    <div className="w-[340px] overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.28)]">
      {group.items.map((it, i) => (
        <motion.div key={it.title} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25, delay: 0.04 * i }}>
          <Link to={it.to} onClick={onClose} className="group/item flex items-center justify-between gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-slate-50">
            <span className="flex flex-col">
              <span className="text-[15.5px] font-semibold tracking-tight text-foreground transition-colors group-hover/item:text-primary">{it.title}</span>
              <span className="text-[13px] text-muted-foreground">{it.desc}</span>
            </span>
            <ArrowRight size={15} className="flex-none -translate-x-1 text-primary opacity-0 transition-all group-hover/item:translate-x-0 group-hover/item:opacity-100" />
          </Link>
        </motion.div>
      ))}
      {group.cta && (
        <Link to={group.cta.to} onClick={onClose} className="mt-1 flex items-center gap-2 border-t border-slate-100 px-4 pb-2 pt-3 text-[14px] font-semibold text-primary">
          {group.cta.text} <ArrowRight size={14} />
        </Link>
      )}
    </div>
  )
}

export default function Header() {
  const [open, setOpen] = useState<number | null>(null)
  const [mobile, setMobile] = useState(false)
  const [mobileOpen, setMobileOpen] = useState<number | null>(null)
  const timer = useRef<number | undefined>(undefined)
  const wrap = useRef<HTMLElement>(null)
  const { pathname } = useLocation()
  const here = (to: string) => pathname === to

  const enter = (i: number) => {
    window.clearTimeout(timer.current)
    setOpen(i)
  }
  const leave = () => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setOpen(null), 140)
  }
  const close = () => {
    setOpen(null)
    setMobile(false)
  }

  useEffect(() => { close() }, [pathname])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    const onDoc = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(null)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDoc)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDoc)
    }
  }, [])

  return (
    <header ref={wrap} className="hdr" onMouseLeave={leave}>
      <div className="mx-auto flex h-[84px] max-w-[1440px] items-center justify-between gap-6 px-6 font-sans lg:px-12">
        <Link to="/" aria-label="CubeZix Dubai home" className="flex-none">
          <img src="/assets/cubezix-logo-full.png" alt="CubeZix" className="h-11 w-auto lg:h-12" />
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navGroups.map((g, i) => {
            const active = open === i
            return (
              <div key={g.label} className={g.kind === 'list' ? 'relative' : ''} onMouseEnter={() => enter(i)}>
                {g.to ? (
                  <Link
                    to={g.to}
                    onClick={close}
                    aria-expanded={active}
                    className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-[16px] font-semibold tracking-tight text-inherit transition-colors ${
                      active || here(g.to) ? 'bg-slate-100 text-primary' : 'text-foreground hover:bg-slate-50'
                    }`}
                  >
                    {g.label}
                    <ChevronDown size={16} className={`transition-transform duration-300 ${active ? 'rotate-180' : ''}`} />
                  </Link>
                ) : (
                  <button
                    type="button"
                    aria-expanded={active}
                    onClick={() => setOpen(active ? null : i)}
                    className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-[16px] font-semibold tracking-tight transition-colors ${
                      active ? 'bg-slate-100 text-primary' : 'text-foreground hover:bg-slate-50'
                    }`}
                  >
                    {g.label}
                    <ChevronDown size={16} className={`transition-transform duration-300 ${active ? 'rotate-180' : ''}`} />
                  </button>
                )}
                {g.kind === 'list' && (
                  <AnimatePresence>
                    {active && (
                      <motion.div
                        className="absolute left-0 top-full z-50 pt-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.2 }}
                        onMouseEnter={() => enter(i)}
                      >
                        <ListPanel group={g} onClose={close} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            )
          })}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex">
            <Link to="/contact" className="btn btn-primary !h-12 !px-7 !text-[16px]">Contact us</Link>
          </span>
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={mobile}
            onClick={() => setMobile((m) => !m)}
            className="flex size-11 items-center justify-center rounded-xl border border-slate-200 lg:hidden"
          >
            {mobile ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* desktop mega panels (floating card under the bar, like the reference) */}
      <AnimatePresence>
        {open !== null && navGroups[open].kind === 'mega' && (
          <motion.div
            key={navGroups[open].label}
            className="absolute inset-x-0 top-full z-50 hidden px-6 pt-1 lg:block lg:px-12"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
            onMouseEnter={() => enter(open)}
          >
            <div className="mx-auto max-w-[1280px]">
              <MegaPanel group={navGroups[open]} onClose={close} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* mobile drawer */}
      <AnimatePresence>
        {mobile && (
          <motion.nav
            className="absolute inset-x-0 top-full max-h-[calc(100vh-110px)] overflow-y-auto border-b border-slate-200 bg-white px-6 pb-6 pt-2 font-sans shadow-xl lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            aria-label="Mobile"
          >
            {navGroups.map((g, i) => (
              <div key={g.label} className="border-b border-slate-100">
                <button
                  type="button"
                  onClick={() => setMobileOpen(mobileOpen === i ? null : i)}
                  className="flex w-full items-center justify-between py-4 text-left text-[17px] font-semibold text-foreground"
                >
                  {g.label}
                  <ChevronDown size={18} className={`transition-transform ${mobileOpen === i ? 'rotate-180 text-primary' : ''}`} />
                </button>
                {mobileOpen === i && (
                  <div className="pb-3">
                    {g.to && (
                      <Link to={g.to} onClick={close} className="flex items-center gap-2 py-2.5 text-[15px] font-semibold text-primary">
                        View all {g.label} <ArrowRight size={15} />
                      </Link>
                    )}
                    {g.items.map((it) => (
                      <Link key={it.title} to={it.to} onClick={close} className="flex items-center gap-3 rounded-xl py-2.5">
                        {it.img && <img src={it.img} alt="" className="h-12 w-20 flex-none rounded-lg object-cover" />}
                        <span className="flex flex-col">
                          <span className="text-[15px] font-semibold text-foreground">{it.title}</span>
                          <span className="text-[12.5px] text-muted-foreground">{it.desc}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-5 flex flex-col gap-3">
              <a href="tel:+97142414120" className="flex items-center gap-2 text-[15px] font-medium text-foreground"><Phone size={16} className="text-primary" /> {PHONE}</a>
              <Link to="/contact" onClick={close} className="inline-flex h-12 items-center justify-center rounded-full bg-primary text-[15px] font-semibold text-primary-foreground">Contact Us</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
