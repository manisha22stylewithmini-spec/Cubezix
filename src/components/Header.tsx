import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import { navGroups, type NavGroup, type NavItem } from '../data/site'

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

/** line icon in a quiet brand-blue outline, as in the reference menu */
function ItemIcon({ icon: Icon }: { icon?: NavItem['icon'] }) {
  return (
    <span className="mt-0.5 flex size-7 flex-none items-center justify-center text-[#4f5bd5] transition-transform duration-300 group-hover/item:scale-110">
      {Icon ? <Icon size={22} strokeWidth={1.6} /> : null}
    </span>
  )
}

function MegaPanel({ group, onClose }: { group: NavGroup; onClose: () => void }) {
  const cols = group.items.length > 4 ? 3 : 2
  return (
    <div className="overflow-hidden rounded-[22px] border border-[#e4e6ef] bg-white shadow-[0_24px_60px_-28px_rgba(15,23,42,0.22)]">
      <div className="px-9 pb-7 pt-7">
        {group.eyebrow && <div className="mb-5 text-[13px] font-semibold text-[#4f5bd5]">{group.eyebrow}</div>}
        <div className={`grid gap-x-8 gap-y-1 ${cols === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {group.items.map((it, i) => (
            <motion.div key={it.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.025 * i }}>
              <Link to={it.to} onClick={onClose} className="group/item flex items-start gap-4 rounded-2xl px-3 py-3.5 transition-colors hover:bg-[#f5f6fb]">
                <ItemIcon icon={it.icon} />
                <span className="flex min-w-0 flex-col">
                  <span className="flex items-center gap-2 text-[16.5px] font-semibold leading-snug tracking-tight text-[#0a0b3d] transition-colors group-hover/item:text-[#4f5bd5]">
                    {it.title}
                    {it.badge && <span className="rounded-md bg-[#fdf3d0] px-2 py-0.5 text-[12px] font-semibold text-[#0a0b3d]">{it.badge}</span>}
                  </span>
                  <span className="mt-1 text-[14px] leading-snug text-[#6b6f80]">{it.desc}</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#e4e6ef] bg-[#f6f6fb] px-9 py-4">
        <span className="flex items-center gap-4 text-[14.5px] text-[#0a0b3d]">
          <b className="font-semibold">Prefer to talk?</b>
          <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="text-[#4f5bd5] underline decoration-[#c7cbf0] underline-offset-4 hover:decoration-[#4f5bd5]">{PHONE}</a>
        </span>
        <div className="flex items-center gap-5">
          <Link to="/contact" onClick={onClose} className="text-[14.5px] font-semibold text-[#0a0b3d] hover:text-[#4f5bd5]">Schedule a demo</Link>
          <Link to="/contact" onClick={onClose} className="rounded-xl bg-[#4f5bd5] px-5 py-2.5 text-[14.5px] font-semibold text-white shadow-[0_10px_22px_-10px_rgba(79,91,213,0.8)] transition-transform hover:-translate-y-0.5">
            Get a free quote
          </Link>
        </div>
      </div>
    </div>
  )
}

function ListPanel({ group, onClose }: { group: NavGroup; onClose: () => void }) {
  return (
    <div className="w-[360px] overflow-hidden rounded-[22px] border border-[#e4e6ef] bg-white shadow-[0_24px_60px_-28px_rgba(15,23,42,0.22)]">
      <div className="p-3">
        {group.items.map((it, i) => (
          <motion.div key={it.title} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.22, delay: 0.035 * i }}>
            <Link to={it.to} onClick={onClose} className="group/item flex items-start gap-4 rounded-2xl px-3 py-3 transition-colors hover:bg-[#f5f6fb]">
              <ItemIcon icon={it.icon} />
              <span className="flex flex-col">
                <span className="text-[16px] font-semibold tracking-tight text-[#0a0b3d] transition-colors group-hover/item:text-[#4f5bd5]">{it.title}</span>
                <span className="mt-0.5 text-[13.5px] leading-snug text-[#6b6f80]">{it.desc}</span>
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
      {group.footer && (
        <div className="flex flex-col gap-1 border-t border-[#e4e6ef] bg-[#f6f6fb] px-6 py-3">
          {group.footer.map((f) => (
            <Link key={f.label} to={f.to} onClick={onClose} className="py-1.5 text-[14px] text-[#6b6f80] transition-colors hover:text-[#4f5bd5]">{f.label}</Link>
          ))}
        </div>
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
                    className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-[16px] font-semibold tracking-tight transition-colors ${
                      active || (open === null && here(g.to)) ? 'bg-[#f0f1f8] text-[#0a0b3d]' : 'text-[#0a0b3d] hover:bg-[#f6f6fb]'
                    }`}
                  >
                    {g.label}
                    <ChevronDown size={16} className={`text-[#9a9db0] transition-transform duration-300 ${active ? 'rotate-180' : ''}`} />
                  </Link>
                ) : (
                  <button
                    type="button"
                    aria-expanded={active}
                    onClick={() => setOpen(active ? null : i)}
                    className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-[16px] font-semibold tracking-tight transition-colors ${
                      active ? 'bg-[#f0f1f8] text-[#0a0b3d]' : 'text-[#0a0b3d] hover:bg-[#f6f6fb]'
                    }`}
                  >
                    {g.label}
                    <ChevronDown size={16} className={`text-[#9a9db0] transition-transform duration-300 ${active ? 'rotate-180' : ''}`} />
                  </button>
                )}
                {g.kind === 'list' && (
                  <AnimatePresence>
                    {active && (
                      <motion.div
                        className="absolute left-0 top-full z-50 pt-2"
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
                {/* the label itself opens the main page; the chevron only expands the sub-options */}
                <div className="flex items-center justify-between">
                  {g.to ? (
                    <Link to={g.to} onClick={close} className="flex-1 py-4 text-left text-[17px] font-semibold text-foreground">{g.label}</Link>
                  ) : (
                    <button type="button" onClick={() => setMobileOpen(mobileOpen === i ? null : i)} className="flex-1 py-4 text-left text-[17px] font-semibold text-foreground">{g.label}</button>
                  )}
                  <button
                    type="button"
                    aria-label={`Show ${g.label} options`}
                    aria-expanded={mobileOpen === i}
                    onClick={() => setMobileOpen(mobileOpen === i ? null : i)}
                    className="flex size-11 items-center justify-center"
                  >
                    <ChevronDown size={18} className={`transition-transform ${mobileOpen === i ? 'rotate-180 text-primary' : ''}`} />
                  </button>
                </div>
                {mobileOpen === i && (
                  <div className="pb-3">
                    {g.items.map((it) => (
                      <Link key={it.title} to={it.to} onClick={close} className="flex items-center gap-3 rounded-xl py-2.5">
                
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
