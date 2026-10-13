import {
  Award, BadgeCheck, Banknote, Building2, Cable, Clock, Cloud, ClipboardCheck, Compass, Database,
  Handshake, Headphones, Laptop, Layers, Phone, PhoneCall, Rocket, Server, Settings,
  Shield, ShieldCheck, TrendingUp, Truck, Users, Video, Wifi, Wrench, type LucideIcon,
} from 'lucide-react'

export interface Service {
  id: string
  title: string
  desc: string
  icon: LucideIcon
  points: [string, string, string]
  /** small artwork shown in the menu and on the card (public/assets/menu) */
  img?: string
  /** show in the header mega menu (default true) */
  inMenu?: boolean
  /** link elsewhere instead of the page anchor */
  to?: string
}

export interface Block { icon: LucideIcon; title: string; text: string }

export interface Category {
  slug: string
  /** nav label */
  label: string
  eyebrowNote: string
  /** hero heading, two lines (second one is highlighted) */
  title: string
  accent: string
  intro: string
  /** light illustration used in the hero */
  art: string
  /** where the illustration sits inside its frame */
  artPos: string
  /** photo band */
  photo: string
  photoAlt: string
  photoTitle: string
  photoText: string
  stats: [string, string][]
  servicesTitle: string
  servicesIntro: string
  services: Service[]
  blocksTitle: string
  blocks: [Block, Block, Block, Block]
  ctaTitle: string
  ctaText: string
  menuEyebrow: string
}

const m = (f: string) => `/assets/menu/${f}.png`

// Wording and figures are taken from the live site (cubezix.com): 8+ years, 1500+ projects, 98% satisfaction,
// 15 minute response, 24/7 L1/L2/L3 support, 45% less infrastructure cost.
export const CATEGORIES: Category[] = [
  {
    slug: 'it-services',
    label: 'IT Services',
    eyebrowNote: 'Managed IT & support',
    title: 'IT services that keep your business',
    accent: 'running, every day.',
    intro:
      'From annual maintenance contracts to outsourcing, consultancy and relocation, CubeZix provides IT services in Dubai with 24/7 L1, L2 and L3 engineers, so your systems stay up and problems are fixed before they stop work.',
    art: '/assets/contact-hero-bg.png',
    artPos: '78% 50%',
    photo: '/assets/how-we-work.png',
    photoAlt: 'A busy open-plan office supported by CubeZix engineers',
    photoTitle: 'Engineers who know your estate',
    photoText: 'Dedicated engineers, proactive monitoring and one escalation path, whether you run one floor or ten sites.',
    stats: [['15 min', 'Response time'], ['24/7', 'Dedicated IT support'], ['1500+', 'Completed projects']],
    servicesTitle: 'Everything under IT Services',
    servicesIntro: 'Pick the service you need, or combine several under a single annual contract.',
    services: [
      { id: 'it-amc', title: 'IT AMC', icon: ShieldCheck, img: m('it-amc'), desc: 'Annual Maintenance Contract with 24/7 L1, L2 and L3 engineers: reliable support for your IT systems.', points: ['24/7 monitoring to prevent failures and downtime', 'Unlimited remote and onsite support', 'Backup, firewall management and Microsoft 365 support'] },
      { id: 'it-outsourcing', title: 'IT Outsourcing', icon: Users, img: m('it-outsourcing'), desc: 'Expert IT services for optimal efficiency, without an in-house IT department.', points: ['Lower cost than in-house staff and infrastructure', 'Certified professionals across many sectors', 'Dedicated, remote or onsite engineers'] },
      { id: 'new-office', title: 'New Office IT Setup', icon: Building2, img: m('new-office'), desc: 'Tailored IT infrastructure design: end-to-end planning, installation and support for new offices.', points: ['Planning and custom infrastructure design', 'Cabling, Wi-Fi, security and backup installed', 'Work scheduled around your business hours'] },
      { id: 'it-relocation', title: 'IT Relocation', icon: Truck, img: m('it-relocation'), desc: 'Reliable IT office relocation: planning, removal, transport and reinstallation.', points: ['Advance planning and equipment inventory', 'Extra copies of critical data secured', 'After-hours or weekend moves with aftercare'] },
      { id: 'it-consultancy', title: 'IT Consultancy', icon: Compass, img: m('it-consultancy'), desc: 'Your partner in IT excellence: advice to improve infrastructure, systems and processes.', points: ['Strategic IT planning aligned with business goals', 'Network and system security', 'Cloud consulting and migration'] },
      { id: 'it-support', title: 'IT Support', icon: Headphones, img: m('it-support'), desc: 'Managed IT support with proactive monitoring, helpdesk and outsourced IT around the clock.', points: ['Proactive IT monitoring and management', 'Helpdesk and IT strategy advisory', 'Backup, disaster recovery and server maintenance'] },
      { id: 'it-infrastructure', title: 'IT Infrastructure', icon: Server, img: m('it-infrastructure'), desc: 'Robust infrastructure for seamless operations: design, installation and support.', to: '/services/it-infrastructure', points: ['Structured cabling, managed Wi-Fi and CCTV', '24x7 help desk and network management', 'Firewalls, VPNs and threat monitoring'] },
      { id: 'cloud-migration', title: 'Cloud Migration', icon: Cloud, img: m('cloud-migration'), desc: 'Expert cloud management that keeps your cloud running efficiently, securely and at scale.', points: ['Integrates with your existing IT systems', 'Multi-cloud management with 24/7 access', 'Firewalls, encryption and multi-factor authentication'] },
      { id: 'ict-solutions', title: 'ICT Solutions', icon: Layers, img: m('ict-solutions'), desc: 'IT infrastructure, communication networks and managed services, integrated for your business.', points: ['Customized IT solutions for each business', 'Cybersecurity and scalable cloud services', 'Network management and 24/7 technical support'] },
    ],
    blocksTitle: 'Why businesses run IT with CubeZix',
    blocks: [
      { icon: Clock, title: '15-minute response', text: 'Every request is picked up fast by L1, L2 and L3 engineers who already know your setup.' },
      { icon: ClipboardCheck, title: 'Prevent, don’t just fix', text: '24/7 monitoring, scheduled health checks and restore tests catch issues before your team feels them.' },
      { icon: TrendingUp, title: 'Predictable cost', text: 'Flexible annual contracts with a clear scope, so IT spend stops being a surprise.' },
      { icon: Settings, title: 'Scales with you', text: 'Dedicated, remote or onsite engineers that grow or shrink as your business does.' },
    ],
    ctaTitle: 'Let’s take IT off your plate',
    ctaText: 'Tell us about your team and sites. We’ll come back with a scoped IT services proposal, not a template.',
    menuEyebrow: 'Managed IT & support',
  },
  {
    slug: 'it-infrastructure',
    label: 'IT Infrastructure',
    eyebrowNote: 'Infrastructure & setup',
    title: 'Infrastructure built right,',
    accent: 'the first time.',
    intro:
      'CubeZix designs, installs and supports IT infrastructure for businesses of all sizes: networks, Wi-Fi, firewalls, telephony, cloud and backup, built to scale with your users, services and capacity.',
    art: '/assets/it-infra-hero-bg.png',
    artPos: '88% 50%',
    photo: '/assets/about-company-photo.jpg',
    photoAlt: 'A modern Dubai office with a server rack beside the workspace',
    photoTitle: 'From cabling to cloud',
    photoText: 'Every build is tested before go-live and handed over with documentation your team can actually use.',
    stats: [['8+ yrs', 'Field experience'], ['45%', 'Less infrastructure cost'], ['24/7', 'Help desk support']],
    servicesTitle: 'Everything under IT Infrastructure',
    servicesIntro: 'Core building blocks for offices, branches and warehouses.',
    services: [
      { id: 'new-office', title: 'New Office IT Setup', icon: Building2, img: m('new-office'), desc: 'Tailored IT infrastructure design: end-to-end planning, installation and support for new offices.', points: ['Planning and custom infrastructure design', 'Cabling, Wi-Fi, security and backup installed', 'Tested before go-live, with AMC support after'] },
      { id: 'server-virtualization', title: 'Server Virtualization Services', icon: Server, img: m('server-virtualization'), desc: 'Optimize your IT infrastructure for efficiency and scalability by consolidating servers.', points: ['Run several systems and applications on one server', 'High availability and fault tolerance', 'Backup, monitoring and patching included'] },
      { id: 'office-telephone', title: 'Office Telephone System', icon: Phone, img: m('office-telephone'), desc: 'Seamless communication solutions for modern workplaces: PABX, IP PBX and VoIP.', points: ['Call transfers, routing and extension directories', 'Programmable speed dialing', 'Ongoing support and maintenance'] },
      { id: 'wifi', title: 'Wi-Fi Solutions', icon: Wifi, img: m('wifi'), desc: 'Fast, secure and reliable wireless networks for offices, warehouses, hotels and healthcare.', points: ['Site surveys, RF planning and installation', 'Separate guest and internal networks', 'Scalable design with a 15-minute response'] },
      { id: 'firewall', title: 'Firewall Installation', icon: Shield, img: m('firewall'), desc: 'Protecting your network: firewall installation, configuration and monitoring.', points: ['Hardware, software, next-gen and UTM firewalls', 'Secure remote access with VPN', 'Partners: Fortinet, Palo Alto Networks, Cisco'] },
      { id: 'microsoft-365', title: 'Microsoft 365 Services', icon: Cloud, img: m('microsoft-365'), desc: 'Connectivity with expert Microsoft 365 solutions: migration, setup and local support.', points: ['Seamless Office 365 migration', 'MFA and data encryption configured', 'Collaboration tools and ongoing support'] },
      { id: 'backup-dr', title: 'Data Backup & Disaster Recovery', icon: Database, img: m('backup-dr'), desc: 'Reliable data backup and disaster recovery using Acronis and VMware.', points: ['Continuous backup with offsite protection', 'Customized recovery for critical applications', 'Central management and reduced downtime'] },
      { id: 'it-hardware', title: 'IT Hardware Services', icon: Laptop, img: m('it-hardware'), desc: 'Comprehensive solutions for all your IT hardware needs.', points: ['Procurement through leading manufacturers', 'Precisely configured assets from integration labs', 'Lifecycle management through disposal'] },
    ],
    blocksTitle: 'How we deliver infrastructure projects',
    blocks: [
      { icon: Compass, title: 'Assess and design', text: 'We map what you run today and design infrastructure around your needs and your timetable.' },
      { icon: Wrench, title: 'Build and test', text: 'Professional installation of cabling, Wi-Fi, security and backup, tested before go-live.' },
      { icon: Rocket, title: 'Go live smoothly', text: 'Work scheduled around business hours, often after hours, to keep disruption low.' },
      { icon: BadgeCheck, title: 'Support afterwards', text: 'Ongoing support through an annual maintenance contract, with a 15-minute response.' },
    ],
    ctaTitle: 'Planning a new office or an upgrade?',
    ctaText: 'Share your floor plan or headcount and we’ll prepare an infrastructure plan and a clear quote.',
    menuEyebrow: 'Infrastructure & setup',
  },
  {
    slug: 'elv-security',
    label: 'ELV & Security',
    eyebrowNote: 'Security & surveillance',
    title: 'ELV and security systems',
    accent: 'you can rely on.',
    intro:
      'Structured cabling, telephony and SIRA-approved CCTV for Dubai businesses, designed, installed and maintained by CubeZix, with troubleshooting and support available 24/7.',
    art: '/assets/services-hero-bg.png',
    artPos: '82% 50%',
    photo: '/assets/blog-detail-hero.jpg',
    photoAlt: 'An engineer monitoring a control room of servers and screens',
    photoTitle: 'Watched, logged and accountable',
    photoText: 'Surveillance systems designed with your premises and regulator in mind, with remote access you can use from anywhere.',
    stats: [['SIRA', 'Approved CCTV'], ['24/7', 'Troubleshooting'], ['1500+', 'Completed projects']],
    servicesTitle: 'Everything under ELV & Security',
    servicesIntro: 'Cabling, telephony and surveillance for offices, retail and warehouses.',
    services: [
      { id: 'structured-cabling', title: 'Structured Cabling', icon: Cable, img: m('structured-cabling'), desc: 'Efficient cabling for reliable connectivity: design, installation, testing and cabinet setup.', points: ['UTP, F/UTP, STP and fibre optic', 'Offices, villas, data centres and warehouses', '24/7 troubleshooting and maintenance'] },
      { id: 'telephone-solutions', title: 'Telephone Solutions', icon: PhoneCall, img: m('telephone-solutions'), desc: 'Seamless communication solutions for modern workplaces.', points: ['PABX and IP PBX platforms', 'VoIP and call centre solutions', 'Ongoing support and maintenance'] },
      { id: 'cctv', title: 'CCTV Installation Dubai', icon: Video, img: m('cctv'), desc: 'Security surveillance for your business: design, installation and upkeep.', points: ['Expert planning services', 'Remote monitoring and real-time internet viewing', '24/7 surveillance'] },
      { id: 'sira-cctv', title: 'SIRA Approved CCTV Installation', icon: ShieldCheck, img: m('sira-cctv'), desc: 'SIRA approved CCTV installation in Dubai, with certification consultancy.', points: ['Expert assessment of your security needs', 'Full compliance with local rules', 'Ongoing maintenance services'] },
    ],
    blocksTitle: 'Built to standard, supported for good',
    blocks: [
      { icon: Award, title: 'SIRA compliant', text: 'Systems that meet SIRA requirements, with certification consultancy handled for you.' },
      { icon: Cable, title: 'Future-proof cabling', text: 'Scalable cabling for voice, data and video, with SIRA-compliant runs for surveillance.' },
      { icon: Video, title: 'Clear, usable footage', text: 'Camera placement planned around what you need to see, with remote access and live viewing.' },
      { icon: Handshake, title: 'One accountable team', text: 'Cabling, telephony and CCTV from one contractor, with 24/7 support after handover.' },
    ],
    ctaTitle: 'Need cabling, telephony or CCTV?',
    ctaText: 'Send us the site address and we’ll arrange a survey and a written quote, including SIRA approval where required.',
    menuEyebrow: 'Security & surveillance',
  },
  {
    slug: 'business-applications',
    label: 'Business Applications',
    eyebrowNote: 'CRM & HR',
    title: 'Business applications that run',
    accent: 'your whole business.',
    intro:
      'Finance, HR, sales and inventory in one connected system, customized to your processes. CubeZix provides CRM and HR software with 24/7 support from a Dubai-based team.',
    art: '/assets/about-hero-bg.png',
    artPos: '84% 50%',
    photo: '/assets/how-we-work.png',
    photoAlt: 'Teams collaborating in a modern open office',
    photoTitle: 'From complexity to clarity',
    photoText: 'Software customized to your business processes and industry, with live access to your business data in one place.',
    stats: [['98%', 'Client satisfaction'], ['24/7', 'Dubai-based support'], ['90', 'Verified reviews']],
    servicesTitle: 'Everything under Business Applications',
    servicesIntro: 'Systems for your customers and your people, customized to how you work.',
    services: [
      { id: 'crm', title: 'CRM Solutions in Dubai', icon: Handshake, desc: 'From complexity to clarity: CRM software that boosts sales productivity and automates customer management.', points: ['Lead and opportunity tracking with automated follow-ups', 'Email and WhatsApp campaigns with lead scoring', 'Mobile access, helpdesk and SLA tracking'] },
      { id: 'hr', title: 'HR Software in Dubai', icon: Users, desc: 'Customized HRMS that simplifies HR, payroll and workforce management.', points: ['WPS payroll automation', 'UAE labour law compliance, including gratuity', 'Mobile employee self-service'] },
    ],
    blocksTitle: 'How an implementation works',
    blocks: [
      { icon: Compass, title: 'Map your process', text: 'Software is configured around your workflow, not the other way round.' },
      { icon: Database, title: 'One connected system', text: 'Finance, HR, procurement, inventory and sales in a single, centralized view.' },
      { icon: Users, title: 'Train your team', text: 'Role-based onboarding so adoption sticks after go-live.' },
      { icon: Banknote, title: 'Scales as you grow', text: 'Flexible and scalable, with 24/7 support from a Dubai-based team.' },
    ],
    ctaTitle: 'Ready to replace the spreadsheets?',
    ctaText: 'Tell us which team feels the pain most. We’ll show how CRM or HR would run on one system.',
    menuEyebrow: 'Business applications',
  },
]

export const categoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug)
export const categoryPath = (slug: string) => `/services/${slug}`
