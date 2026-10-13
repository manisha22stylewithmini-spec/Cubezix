import {
  ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, Circle, Cloud, CloudUpload, Contact, Cpu, CreditCard,
  Facebook, Globe, Headphones, Layers, LayoutGrid, Linkedin, Menu, Network, Plus, Server, ShieldCheck, TrendingUp,
  Twitter, Users, Wrench, X,
} from 'lucide-react'
import type { ComponentType } from 'react'

type IconCmp = ComponentType<{ size?: number; strokeWidth?: number }>

/** Kebab-case names match the design system's Icon component. Add a glyph here before using it. */
const icons: Record<string, IconCmp> = {
  'arrow-right': ArrowRight, check: Check, 'chevron-down': ChevronDown, 'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight, cloud: Cloud, 'cloud-upload': CloudUpload, contact: Contact, cpu: Cpu,
  'credit-card': CreditCard, facebook: Facebook, globe: Globe, headphones: Headphones, layers: Layers,
  'layout-grid': LayoutGrid, linkedin: Linkedin, menu: Menu, network: Network, plus: Plus, server: Server,
  'shield-check': ShieldCheck, 'trending-up': TrendingUp, twitter: Twitter, users: Users, wrench: Wrench, x: X,
}

export default function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const Cmp = icons[name] ?? Circle
  return <Cmp size={size} strokeWidth={2} aria-hidden />
}
