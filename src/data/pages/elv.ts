import {
  Building2, Cable, Camera, ClipboardCheck, Cctv, Clock, Eye, Fingerprint, Home, KeyRound, Lock, MonitorPlay, Network, Phone, Radio, Scale, ScanFace,
  Search, ShieldCheck, Tv, Users, Warehouse, Wifi, Wrench, Zap, Award, FileCheck, Server, Video, Fence, DoorOpen, Layers, Globe,
} from 'lucide-react'
import type { SvcPage } from './types'

const CAT = 'elv-security' as const

export const ELV: SvcPage[] = [
  {
    id: 'structured-cabling', cat: CAT, title: 'Structured Cabling', note: 'ELV & Security · Dubai',
    ic: [Cable, Wifi, Wrench, Camera, Phone, Home, Zap, MonitorPlay, Server, Warehouse], related: ['cctv', 'wifi', 'new-office'],
  },
  {
    id: 'cctv', cat: CAT, title: 'CCTV Installation Dubai', note: 'ELV & Security · Dubai',
    ic: [Cctv, Camera, Eye, MonitorPlay, Radio, Video], related: ['sira-cctv', 'structured-cabling', 'access-control'],
  },
  {
    id: 'sira-cctv', cat: CAT, title: 'SIRA Approved CCTV Installation', note: 'ELV & Security · Dubai',
    ic: [ShieldCheck, Award, Scale, Users, FileCheck, Wrench, Cctv], related: ['cctv', 'structured-cabling', 'access-control'],
  },
  {
    id: 'access-control', cat: CAT, title: 'Access Control System', note: 'ELV & Security · Dubai',
    ic: [KeyRound, Fingerprint, Radio, Fence, DoorOpen, Layers, Globe, ScanFace], related: ['cctv', 'sira-cctv', 'structured-cabling'],
  },
]
