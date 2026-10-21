import {
  Activity, BarChart3, Building2, Cable, Cloud, ClipboardCheck, Compass, Database, Headphones, Headset, HardDrive, Laptop, Layers, Lock,
  Network, Rocket, Server, Settings, ShieldCheck, TrendingUp, Truck, Users, Wifi, Wrench, Zap, Search, FileCheck, MonitorCheck, Globe, Cpu,
} from 'lucide-react'
import type { SvcPage } from './types'

const CAT = 'it-services' as const

export const IT_SERVICES: SvcPage[] = [
  {
    id: 'it-outsourcing', cat: CAT, title: 'IT Outsourcing', note: 'IT Services · Dubai',
    ic: [Users, Headset, ShieldCheck, Cloud, Server, Network, Settings, Database], related: ['it-amc', 'it-support', 'it-consultancy'],
  },
  {
    id: 'new-office', cat: CAT, title: 'New Office IT Setup', note: 'IT Services · Dubai',
    ic: [Building2, Cable, Wifi, ShieldCheck, Database, Server, Laptop, Cloud, Wrench, ClipboardCheck], related: ['structured-cabling', 'wifi', 'it-amc'],
  },
  {
    id: 'it-relocation', cat: CAT, title: 'IT Relocation', note: 'IT Services · Dubai',
    ic: [Truck, ClipboardCheck, Network, Database, Search, Wrench, Rocket], related: ['new-office', 'it-amc', 'structured-cabling'],
  },
  {
    id: 'it-consultancy', cat: CAT, title: 'IT Consultancy', note: 'IT Services · Dubai',
    ic: [Compass, Server, Settings, Cpu, Layers, Cloud, Headphones, ShieldCheck], related: ['it-support', 'cloud-migration', 'it-infrastructure'],
  },
  {
    id: 'it-support', cat: CAT, title: 'Managed IT Services', note: 'IT Services · Dubai',
    ic: [MonitorCheck, Headphones, Compass, Database, ShieldCheck, Server], related: ['it-amc', 'it-system-monitoring', 'it-helpdesk'],
  },
  {
    id: 'it-infrastructure', cat: CAT, title: 'IT Infrastructure', note: 'IT Services · Dubai',
    ic: [Compass, Cable, Headphones, Laptop, Layers, Wifi, HardDrive, ShieldCheck, Network, Wrench, Server], related: ['new-office', 'server-virtualization', 'it-amc'],
  },
  {
    id: 'cloud-migration', cat: CAT, title: 'Cloud Management Services', note: 'IT Services · Dubai',
    ic: [Cloud, Settings, Database, BarChart3, ShieldCheck, Headset, TrendingUp], related: ['cloud-computing', 'microsoft-365', 'backup-dr'],
  },
  {
    id: 'ict-solutions', cat: CAT, title: 'ICT Solutions', note: 'IT Services · Dubai',
    ic: [Network, Lock, Cloud, Globe, Database, Wrench, Zap], related: ['it-infrastructure', 'cyber-security', 'cloud-migration'],
  },
]

export const IT_EXTRA: SvcPage[] = [
  {
    id: 'it-helpdesk', cat: CAT, title: 'IT Helpdesk Services', note: 'IT Services · Dubai',
    ic: [Headset, Headphones, MonitorCheck, Zap, Settings, ClipboardCheck, FileCheck, TrendingUp], related: ['it-amc', 'remote-it-support', 'it-support'],
  },
  {
    id: 'it-system-monitoring', cat: CAT, title: 'IT System Monitoring', note: 'IT Services · Dubai',
    ic: [MonitorCheck, Activity, BarChart3, Server, Database], related: ['it-amc', 'it-helpdesk', 'it-support'],
  },
  {
    id: 'cyber-security', cat: CAT, title: 'Cyber Security', note: 'IT Services · Dubai',
    ic: [Lock, ShieldCheck, Network, Search, FileCheck, Database, HardDrive], related: ['firewall', 'backup-dr', 'it-amc'],
  },
  {
    id: 'network-support', cat: CAT, title: 'Network Support Services', note: 'IT Services · Dubai',
    ic: [Network, Layers, Headset, MonitorCheck, Settings, Lock, Zap], related: ['wifi', 'firewall', 'it-amc'],
  },
  {
    id: 'remote-it-support', cat: CAT, title: 'Remote IT Support', note: 'IT Services · Dubai',
    ic: [Headset, Globe, MonitorCheck, Wrench, Lock, Settings], related: ['it-helpdesk', 'it-amc', 'it-support'],
  },
]
