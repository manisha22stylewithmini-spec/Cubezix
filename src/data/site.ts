import { categoryBySlug, categoryPath } from './services'
export interface NavItem { title: string; desc: string; to: string; img?: string; badge?: string }
export interface NavGroup {
  label: string
  /** 'mega' = wide panel with thumbnails, 'list' = compact dropdown under the item */
  kind: 'mega' | 'list'
  /** the main page this item opens when clicked; hovering still lists the sub-options */
  to?: string
  eyebrow?: string
  cta?: { text: string; to: string }
  items: NavItem[]
}

const asItems = (slug: string, onlyMenu: boolean): NavItem[] => {
  const c = categoryBySlug(slug)!
  return c.services
    .filter((svc) => !onlyMenu || svc.inMenu !== false)
    .map((svc) => ({ title: svc.title, desc: svc.desc, img: svc.img, to: svc.to ?? `${categoryPath(slug)}#${svc.id}` }))
}

export const navGroups: NavGroup[] = [
  ...(['it-services', 'it-infrastructure', 'elv-security'] as const).map((slug): NavGroup => {
    const c = categoryBySlug(slug)!
    return {
      label: c.label,
      to: categoryPath(slug),
      kind: 'mega',
      eyebrow: c.menuEyebrow,
      cta: { text: `View all ${c.label}`, to: categoryPath(slug) },
      items: asItems(slug, true),
    }
  }),
  {
    label: 'Business Applications',
    to: categoryPath('business-applications'),
    kind: 'list',
    cta: { text: 'View all business applications', to: categoryPath('business-applications') },
    items: asItems('business-applications', false),
  },
  {
    label: 'Insights', kind: 'list',
    items: [
      { title: 'Blogs', desc: 'Guides, news and IT insights', to: '/blog' },
      { title: 'About Us', desc: 'Who we are and how we work', to: '/about' },
      { title: 'Careers', desc: 'Join the CubeZix team', to: '/career' },
      { title: 'Contact Us', desc: 'Talk to an engineer', to: '/contact' },
    ],
  },
]

export const navLinks = [
  { label: 'HOME', to: '/' },
  { label: 'BLOGS', to: '/blog' },
  { label: 'ABOUT US', to: '/about' },
  { label: 'CONTACT US', to: '/contact' },
  { label: 'CAREER', to: '/career' },
]

export const footerLinks = {
  site: [
    { label: 'Home', to: '/' }, { label: 'About', to: '/about' }, { label: 'Services', to: '/services' },
    { label: 'Projects', to: '/' }, { label: 'Blog', to: '/blog' },
  ],
  services: [
    { label: 'All services', to: '/services' },
    { label: 'IT Services', to: '/services/it-services' },
    { label: 'IT Infrastructure', to: '/services/it-infrastructure' },
    { label: 'ELV & Security', to: '/services/elv-security' },
    { label: 'Business Applications', to: '/services/business-applications' },
  ],
}
