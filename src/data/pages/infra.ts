import {
  Activity, AppWindow, BarChart3, Cloud, Cpu, Database, FileCheck, Globe, HardDrive, Headset, Laptop, Layers, Lock, Mail, Monitor, Network,
  Phone, PhoneCall, Server, Settings, Shield, ShieldCheck, Smartphone, Users, Wifi, Wrench, Zap, Search, Clock, Cable, Package, RefreshCw, Archive,
} from 'lucide-react'
import type { SvcPage } from './types'

const CAT = 'it-infrastructure' as const

export const INFRA: SvcPage[] = [
  {
    id: 'server-virtualization', cat: CAT, title: 'Server Virtualization Services', note: 'IT Infrastructure · Dubai',
    ic: [Server, Layers, Zap, Settings, HardDrive, Database, RefreshCw, Activity], related: ['backup-dr', 'it-infrastructure', 'cloud-migration'],
  },
  {
    id: 'office-telephone', cat: CAT, title: 'Office Telephone System', note: 'IT Infrastructure · Dubai',
    ic: [Phone, PhoneCall, Users, Zap, Settings, Headset, Wrench, Cloud], related: ['structured-cabling', 'wifi', 'it-amc'],
  },
  {
    id: 'wifi', cat: CAT, title: 'Wi-Fi Solutions', note: 'IT Infrastructure · Dubai',
    ic: [Wifi, Search, Network, Settings, Monitor, Lock, RefreshCw, Globe], related: ['structured-cabling', 'network-support', 'it-amc'],
  },
]
