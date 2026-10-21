import type { LucideIcon } from 'lucide-react'

/** Where a service page lives and which icons its lists use. The words themselves are in live.ts. */
export interface SvcPage {
  /** same id as the service in data/services.ts; also the last part of the URL */
  id: string
  cat: 'it-services' | 'it-infrastructure' | 'elv-security' | 'business-applications'
  title: string
  note: string
  /** icons cycled over the lists */
  ic: LucideIcon[]
  related: string[]
}

export interface LiveSection {
  eyebrow: string
  title: string
  paras: string[]
  list: string[]
  cards: { t: string; d: string }[]
  /** label of the call-to-action button that followed this section on the live page */
  cta: string
}

/** A page's text, copied word for word from cubezix.com. */
export interface LivePage {
  tag: string
  h1: string
  hero: string[]
  heroCards: { t: string; d: string; p: string }[]
  sections: LiveSection[]
  faqs: { q: string; a: ['p', string][] | (['p', string] | ['ul', string[]])[] }[]
}
