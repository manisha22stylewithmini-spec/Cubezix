import {
  Banknote, BarChart3, Building2, ClipboardList, Clock, Database, FileText, GraduationCap, HardHat, Handshake, Heart, Landmark, Layers, Lock, MessageCircle,
  Package, Plane, Settings, ShoppingCart, Smartphone, Truck, Users, Wrench, Factory, Fuel, Briefcase, Utensils, CalendarCheck, Fingerprint, UserPlus, Target,
  Megaphone, LifeBuoy, ShieldCheck, Workflow, PieChart, Store,
} from 'lucide-react'
import type { SvcPage } from './types'

const CAT = 'business-applications' as const

export const APPS: SvcPage[] = [
  {
    id: 'erp', cat: CAT, title: 'ERP Solutions', note: 'Business Applications · Dubai',
    ic: [Handshake, ShoppingCart, Package, Users, Database, Factory, ClipboardList, Banknote], related: ['crm', 'hr', 'it-amc'],
  },
  {
    id: 'crm', cat: CAT, title: 'CRM Solutions in Dubai', note: 'Business Applications · Dubai',
    ic: [Target, Handshake, Megaphone, Smartphone, LifeBuoy, ShieldCheck], related: ['erp', 'hr', 'microsoft-365'],
  },
  {
    id: 'hr', cat: CAT, title: 'HR Software in Dubai', note: 'Business Applications · Dubai',
    ic: [Banknote, Clock, CalendarCheck, FileText, UserPlus, Smartphone, Target, Lock, PieChart], related: ['erp', 'crm', 'it-amc'],
  },
]
