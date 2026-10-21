import {
  Archive, BarChart3, Cable, Cloud, Cpu, Database, FileCheck, Globe, HardDrive, Laptop, Layers, Lock, Mail, Monitor, Network, Package, RefreshCw,
  Search, Server, Settings, Shield, ShieldCheck, Smartphone, Users, Wrench, Zap, Clock, ClipboardCheck, Cog, Truck, KeyRound,
} from 'lucide-react'
import type { SvcPage } from './types'

const CAT = 'it-infrastructure' as const

export const INFRA2: SvcPage[] = [
  {
    id: 'firewall', cat: CAT, title: 'Firewall Installation', note: 'IT Infrastructure · Dubai',
    ic: [Shield, Settings, HardDrive, Laptop, ShieldCheck, Layers, Search, Globe, Lock, Cloud, Users, RefreshCw], related: ['cyber-security', 'network-support', 'it-amc'],
  },
  {
    id: 'microsoft-365', cat: CAT, title: 'Microsoft 365 Services', note: 'IT Infrastructure · Dubai',
    ic: [Mail, Users, Lock, Cloud, Settings, Layers, BarChart3], related: ['cloud-email-hosting', 'cloud-migration', 'it-amc'],
  },
  {
    id: 'backup-dr', cat: CAT, title: 'Data Backup & Disaster Recovery', note: 'IT Infrastructure · Dubai',
    ic: [Database, RefreshCw, Archive, ClipboardCheck, Clock, Settings, ShieldCheck], related: ['server-virtualization', 'cyber-security', 'it-amc'],
  },
  {
    id: 'it-hardware', cat: CAT, title: 'IT Hardware Services', note: 'IT Infrastructure · Dubai',
    ic: [Laptop, Package, Wrench, Cpu, Truck, Monitor, Server, Settings], related: ['it-infrastructure', 'new-office', 'it-amc'],
  },
  {
    id: 'cloud-computing', cat: CAT, title: 'Cloud Computing Solutions', note: 'IT Infrastructure · Dubai',
    ic: [Cloud, Settings, Users, Zap, Globe, Layers, Server], related: ['cloud-migration', 'cloud-email-hosting', 'microsoft-365'],
  },
  {
    id: 'cloud-email-hosting', cat: CAT, title: 'Email Hosting Services', note: 'IT Infrastructure · Dubai',
    ic: [Mail, Server, Smartphone, Lock, Wrench, ShieldCheck, Database], related: ['microsoft-365', 'cloud-computing', 'cyber-security'],
  },
]
