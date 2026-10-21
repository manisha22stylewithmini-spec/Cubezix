import { BookOpen, Briefcase, Mail, Users, type LucideIcon } from 'lucide-react'
import { categoryBySlug, categoryPath } from './services'
export interface NavItem { title: string; desc: string; to: string; img?: string; badge?: string; icon?: LucideIcon }
export interface NavGroup {
  label: string
  /** 'mega' = wide panel with thumbnails, 'list' = compact dropdown under the item */
  kind: 'mega' | 'list'
  /** the main page this item opens when clicked; hovering still lists the sub-options */
  to?: string
  eyebrow?: string
  items: NavItem[]
  /** small grey links at the bottom of a list dropdown */
  footer?: { label: string; to: string }[]
}

const asItems = (slug: string, onlyMenu: boolean): NavItem[] => {
  const c = categoryBySlug(slug)!
  return c.services
    .filter((svc) => !onlyMenu || svc.inMenu !== false)
    .map((svc) => ({ title: svc.title, desc: svc.desc, img: svc.img, icon: svc.icon, to: svc.to ?? `${categoryPath(slug)}#${svc.id}` }))
}

export const navGroups: NavGroup[] = [
  ...(['it-services', 'it-infrastructure', 'elv-security'] as const).map((slug): NavGroup => {
    const c = categoryBySlug(slug)!
    return {
      label: c.label,
      to: categoryPath(slug),
      kind: 'mega',
      eyebrow: c.menuEyebrow,
      items: asItems(slug, true),
    }
  }),
  {
    label: 'Business Applications',
    to: categoryPath('business-applications'),
    kind: 'list',
    items: asItems('business-applications', false),
    footer: [{ label: 'Book a free demo', to: '/contact' }, { label: 'All services', to: '/services' }],
  },
  {
    label: 'Insights', to: '/blog', kind: 'list',
    items: [
      { title: 'Blogs', desc: 'Guides, news and IT insights', to: '/blog', icon: BookOpen },
      { title: 'About Us', desc: 'Who we are and how we work', to: '/about', icon: Users },
      { title: 'Careers', desc: 'Join the CubeZix team', to: '/career', icon: Briefcase },
      { title: 'Contact Us', desc: 'Talk to an engineer', to: '/contact', icon: Mail },
    ],
    footer: [{ label: 'Free consultation', to: '/contact' }, { label: 'All services', to: '/services' }],
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
