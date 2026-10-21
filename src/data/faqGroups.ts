import type { FaqCat, FaqItem } from '../components/FaqSection'

const RULES: { id: string; label: string; icon: string; re: RegExp; sub: string }[] = [
  { id: 'cost', label: 'Cost & Plans', icon: 'credit-card', re: /cost|price|pricing|how much|payment|cheaper|upgrade or downgrade/i, sub: 'What it costs and how the plans work.' },
  { id: 'security', label: 'Security & Safety', icon: 'shield-check', re: /secur|complian|legal|backup|recover|encrypt|ransom|firewall|risk|protect/i, sub: 'How your data and systems stay protected.' },
  { id: 'why', label: 'Why & Benefits', icon: 'trending-up', re: /^why |benefit|advantage|differen|how do i choose|how can .* benefit|important/i, sub: 'Why it matters and how to choose.' },
  { id: 'coverage', label: 'Coverage & Fit', icon: 'network', re: /devices|areas|industr|types of business|which |where |suitable|small business|customiz|tailor|scal|work with|integrat/i, sub: 'What is covered, where, and who it suits.' },
  { id: 'support', label: 'Support & Delivery', icon: 'headphones', re: /support|24\/7|response|contact|help ?desk|monitor|downtime|report|dedicated|manager|engineer|migrat|transition|implementation|how long|timeline|emergenc|resolv/i, sub: 'How we work with you, day to day.' },
]
const BASICS = { id: 'basics', label: 'The Basics', icon: 'layout-grid', sub: 'What it is and what it covers.' }

/** Splits a long list of questions into a few topics, so no one has to scroll a wall of questions. */
export function groupFaqs(list: FaqItem[]): { cats: FaqCat[]; items: Record<string, FaqItem[]> } {
  const one = { cats: [{ id: 'all', label: 'Questions', icon: 'layout-grid', heading: 'Questions' }], items: { all: list } as Record<string, FaqItem[]> }
  if (list.length <= 3) return one
  const buckets: Record<string, FaqItem[]> = { basics: [], cost: [], security: [], why: [], coverage: [], support: [] }
  for (const f of list) {
    const hit = RULES.find((r) => r.re.test(f.q))
    buckets[hit ? hit.id : 'basics'].push(f)
  }
  // a topic with a single question goes back to the basics
  for (const r of RULES) if (buckets[r.id].length < 2) { buckets.basics.push(...buckets[r.id]); buckets[r.id] = [] }
  const order = [BASICS, ...RULES].filter((c) => buckets[c.id].length > 0)
  if (order.length < 2 || Math.max(...order.map((c) => buckets[c.id].length)) > Math.max(4, Math.ceil(list.length / 2))) {
    // keywords did not spread the questions: split them in order, in groups of about five
    const names = [
      { id: 'basics', label: 'The Basics', icon: 'layout-grid', sub: 'What it is and what it covers.' },
      { id: 'planning', label: 'Planning & Setup', icon: 'wrench', sub: 'How it is planned, installed and tuned.' },
      { id: 'more', label: 'Support & More', icon: 'headphones', sub: 'Support, upkeep and everything else.' },
    ]
    const n = Math.min(3, Math.max(2, Math.ceil(list.length / 5)))
    const size = Math.ceil(list.length / n)
    const cats = names.slice(0, n)
    return {
      cats: cats.map((c) => ({ id: c.id, label: c.label, icon: c.icon, heading: c.label, sub: c.sub })),
      items: Object.fromEntries(cats.map((c, i) => [c.id, list.slice(i * size, (i + 1) * size)])),
    }
  }
  return {
    cats: order.map((c) => ({ id: c.id, label: c.label, icon: c.icon, heading: `${c.label}`, sub: c.sub })),
    items: Object.fromEntries(order.map((c) => [c.id, buckets[c.id]])),
  }
}
