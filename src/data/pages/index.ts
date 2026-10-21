import { IT_SERVICES, IT_EXTRA } from './itServices'
import { INFRA } from './infra'
import { INFRA2 } from './infra2'
import { ELV } from './elv'
import { APPS } from './apps'
import { ShieldCheck } from 'lucide-react'
import type { SvcPage } from './types'

export type { SvcPage } from './types'

export const PAGES: SvcPage[] = [...IT_SERVICES, ...IT_EXTRA, ...INFRA, ...INFRA2, ...ELV, ...APPS]

export const pagePath = (p: Pick<SvcPage, 'cat' | 'id'>) => `/services/${p.cat}/${p.id}`
/** the IT AMC page has its own hand-built template; this stub lets other pages link to it */
const AMC = { id: 'it-amc', cat: 'it-services', title: 'IT AMC', intro: 'One annual contract for preventive maintenance, 24/7 monitoring, unlimited remote and on-site support and monthly reports.', ic: [ShieldCheck] } as unknown as SvcPage
export const pageById = (id: string) => (id === 'it-amc' ? AMC : PAGES.find((p) => p.id === id))
/** which page a service id opens (a few services share a page) */
const ALIAS: Record<string, string> = { 'telephone-solutions': 'office-telephone' }
export const pagePathById = (id: string) => {
  const p = pageById(ALIAS[id] ?? id)
  return p ? pagePath(p) : undefined
}
