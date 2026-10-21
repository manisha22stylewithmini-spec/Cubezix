import {
  Activity, AppWindow, BarChart3, Building2, Cctv, Cloud, Cpu, Database, Headset, Landmark, Lock, Mail, Monitor,
  Network, Phone, Presentation, Printer, ShieldCheck, Stethoscope, Wifi, Wrench, Server, GraduationCap, Factory,
  Truck, Tv, Briefcase, Fuel, MessageSquare, Search, Settings, Users, type LucideIcon,
} from 'lucide-react'

/** What an IT AMC covers day to day (the timeline). Word for word from cubezix.com/it-amc-dubai. */
export const INCLUDED: { tag: string; text: string; icon: LucideIcon }[] = [
  { tag: "24/7 Active Monitoring", icon: Activity, text: "With our rapid response and proactive tech failure prevention, we deliver 24/7 support for networks, servers and eliminates downtime." },
  { tag: "Preventive Maintenance", icon: Wrench, text: "Regular system inspections and scheduled servicing to reduce unexpected downtime." },
  { tag: "Remote and On-site IT Support", icon: Headset, text: "We provide unlimited Remote and Onsite IT Support AMC Services to SME's in Dubai." },
  { tag: "Network Performance Management", icon: Network, text: "Optimize switches, routers, wireless networks, and connectivity for reliable operations." },
  { tag: "Data Back-up & Recovery", icon: Database, text: "We provide specialized and tailored backup support within our system to ensure your company’s data recovery, especially in the event of breakdowns or failures." },
  { tag: "Firewall Management", icon: ShieldCheck, text: "Review configurations, firmware updates, and security policies to strengthen network protection." },
  { tag: "Microsoft 365 Support", icon: Mail, text: "Administration, troubleshooting, licensing assistance, and user management." },
  { tag: "Software & Hardware Installation", icon: Cpu, text: "Software and Hardware installation is performed by IT Professionals to eliminate the risk and worries while installing and upgrading your system." },
  { tag: "Managed Wi-Fi Solutions", icon: Wifi, text: "We implement strategic Wi-Fi systems for reliable connectivity and enhanced office efficiency." },
  { tag: "Cyber Security", icon: Lock, text: "Our expert team provides robust defense strategies, real-time threat monitoring, and proactive incident response to ensure your digital assets remain secure." },
  { tag: "Endpoint Management", icon: Monitor, text: "Manage desktops, laptops, workstations, and user devices for improved performance and security." },
  { tag: "Server Troubleshooting", icon: Server, text: "If your server does not respond well or faces issues such as slow operations, or even regularly crashing, Our IT AMC services help you sort out." },
]

/** The road map on the live page: one signboard and one line each. */
export const WORKFLOW: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Kick off Meeting", icon: Building2, text: "Initial meeting to align expectations, goals, and establish a communication plan." },
  { title: "Client Onboarding", icon: Users, text: "Seamless integration of client data, systems, and communication into our managed services." },
  { title: "IT Infrastructure Audit & Recommendations", icon: Search, text: "Comprehensive review of existing IT infrastructure to identify strengths and weaknesses." },
  { title: "Helpdesk", icon: Headset, text: "Quick resolution of IT issues, minimizing downtime and maintaining business productivity." },
  { title: "Monthly Reports & RMM Tool", icon: BarChart3, text: "Regular updates on IT performance, service usage, and actionable insights." },
  { title: "Dedicated Account Manager", icon: Briefcase, text: "A single point of contact to ensure consistent communication and service delivery." },
  { title: "Service Delivery Team", icon: Settings, text: "Ensuring seamless implementation and management of IT services." },
  { title: "Feedback & Reviews", icon: MessageSquare, text: "Gathering client input to refine and improve service quality continuously." },
]

export const SLA_INTRO = 'Unlike generic IT support promises, our SLA benchmarks clearly define how quickly we respond and escalate issues, ensuring accountability and reliable IT support.'
export const SLA: { priority: string; level: string; tone: 'red' | 'amber' | 'blue' | 'green'; desc: string; owner: string }[] = [
  { priority: 'CRITICAL', level: 'Business Critical', tone: 'red', desc: 'Affecting all business users', owner: 'Team Lead / Service Delivery Manager' },
  { priority: 'HIGH', level: 'Post Working Hours', tone: 'amber', desc: 'Critical impact outside business hours', owner: 'Service Delivery Manager' },
  { priority: 'MEDIUM', level: 'Partially Critical', tone: 'blue', desc: 'Impacting multiple users', owner: 'Dedicated IT Support Engineer' },
  { priority: 'LOW', level: 'Normal', tone: 'green', desc: 'Affecting 1-2 systems', owner: 'Helpdesk Team' },
]

export const COVERAGE_GROUPS = ['All', 'Workplace & devices', 'Network & security', 'Software & cloud'] as const
export const COVERAGE: { title: string; text: string; group: (typeof COVERAGE_GROUPS)[number]; icon: LucideIcon }[] = [
  { title: "IT AMC for Meeting Room Solutions", text: "VoIP systems, conferencing tools, and AV setup management.", group: "Workplace & devices", icon: Presentation },
  { title: "IT AMC for Computers & Workstations", text: "Regular maintenance and support for desktops and laptops.", group: "Workplace & devices", icon: Monitor },
  { title: "IT AMC for Networking Equipment", text: "Coverage for routers, switches, firewalls, and other network devices.", group: "Network & security", icon: Network },
  { title: "IT AMC for CCTV Systems", text: "Installation, maintenance, and support for surveillance solutions.", group: "Network & security", icon: Cctv },
  { title: "IT AMC for Hardware Components", text: "Printers, scanners, and other peripherals", group: "Workplace & devices", icon: Printer },
  { title: "IT AMC for Software Applications", text: "Updates, patches, and troubleshooting for operating systems and business apps.", group: "Software & cloud", icon: AppWindow },
  { title: "IT AMC for Cyber Security", text: "Proactive monitoring, endpoint protection, and compliance support.", group: "Network & security", icon: Lock },
  { title: "IT AMC for Cloud Management", text: "Administration and support for cloud platforms, storage, and backup solutions.", group: "Software & cloud", icon: Cloud },
  { title: "IT AMC for Telephone Systems", text: "VoIP systems, conferencing tools, and AV setup management.", group: "Workplace & devices", icon: Phone },
]

export const SWITCH_STEPS: { title: string; text: string; tags: string[]; icon: LucideIcon }[] = [
  { title: "Step 1 — IT & Network Audit", icon: Activity, text: "Review and document your current IT environment, including covered endpoints, servers, networks, cloud services, firewalls, backups, and other systems.", tags: ["Endpoints", "Servers", "Networks", "Cloud Services", "Firewalls", "Backups"] },
  { title: "Step 2 — Knowledge & Credential Transfer", icon: Lock, text: "Review existing documentation and authorized administrative access while establishing CubeZix support and monitoring processes.", tags: ["Documentation Review", "Admin Access Transfer", "Monitoring Setup", "Support Workflows"] },
  { title: "Step 3 — Support Cutover", icon: Headset, text: "Move employee support requests to the CubeZix helpdesk with documented escalation paths, account management, and defined support procedures.", tags: ["Helpdesk Migration", "Escalation Pathways", "Account Management", "SLA Agreement"] },
]

export const QA: { q: string; a: ['p', string][] }[] = [
 {
  "q": "What exactly is an IT AMC, and what does it cover?",
  "a": [
   [
    "p",
    "An IT AMC, or Annual Maintenance Contract, is a service level agreement between your organization and an IT service provider. Our IT AMC designs contribute to high-quality IT performance while also improving the overall workplace environment. The services included vary depending on the terms of your contract, but typically include remote support, a dedicated IT engineer, periodic system check-ups, and regular IT system reports and training"
   ]
  ]
 },
 {
  "q": "Why do I need an IT AMC in Dubai?",
  "a": [
   [
    "p",
    "An IT AMC helps businesses in Dubai reduce downtime, improve cybersecurity, and keep their IT infrastructure operating efficiently. It includes proactive services such as preventive maintenance, server and network monitoring, operating system and firmware updates, backup verification, endpoint management, Microsoft 365 support, firewall management, and helpdesk assistance. By identifying potential issues before they disrupt operations, an IT AMC supports business continuity, extends the life of IT equipment, and allows your team to focus on core business activities instead of recurring IT problems."
   ]
  ]
 },
 {
  "q": "What devices are covered by your IT AMC support?",
  "a": [
   [
    "p",
    "CubeZix offers professionally managed IT support for your entire office IT infrastructure, including PCs, laptops, servers, switches, routers, printers, IP phones, CCTV, and biometrics devices, among other IT peripherals."
   ]
  ]
 },
 {
  "q": "What will IT AMC services involves?",
  "a": [
   [
    "p",
    "CubeZix offers a variety of IT AMC contract options that are tailored to your specific business requirements. These agreements cover a variety of IT AMC services, including:"
   ],
   [
    "p",
    "Unlimited remote support On-site visit/consultation by a dedicated IT engineer IT audits and training are performed on a regular basis. Preventive maintenance and monthly reports"
   ]
  ]
 },
 {
  "q": "How do I get in touch with CubeZix for IT AMC support?",
  "a": [
   [
    "p",
    "Consumer satisfaction is a top priority for the CubeZix team. For professional IT AMC support"
   ],
   [
    "p",
    "Use our 24/7 Chat support or Call us on our helpline number Email us at @ info@cubezix.com You can also use our ticketing tool to put in a request for remote support of all IT peripherals."
   ]
  ]
 },
 {
  "q": "Which areas in Dubai does CubeZix offer its IT AMC services and support?",
  "a": [
   [
    "p",
    "CubeZix provides IT AMC services in Dubai across almost every major business and industrial zone in the city. We currently serve satisfied IT AMC clients in areas such as Dubai Industrial City, Dubai Investments Park (DIP), Business Bay, Academic City, DIFC, Jumeirah Lakes Towers (JLT), Dubai Internet City, Dubai Healthcare City, Dubai Production City, and several other fast-growing commercial districts. We also offer our IT AMC Services across all emirates in UAE like Dubai, Sharjah, Abu Dhabi, Fujairah, Umm Al Quwain, Ajman and Ras Al Khaimah."
   ],
   [
    "p",
    "Our team ensures quick response times, reliable on-site support, and proactive maintenance for businesses of all sizes—no matter where they are located in Dubai."
   ]
  ]
 },
 {
  "q": "Do we have a dedicated It manager and engineer?",
  "a": [
   [
    "p",
    "CubeZix offers a variety of IT AMC packages that are tailored to various business models. The majority of these packages include on-site or emergency IT support from a dedicated IT manager and engineer. These requirements can be easily customized for the IT AMC you select."
   ]
  ]
 },
 {
  "q": "Is it possible to upgrade or downgrade my IT AMC service?",
  "a": [
   [
    "p",
    "You can easily scale your IT AMC services in response to business changes or developments. You can set up a call with our team to discuss your options by using our remote support services."
   ]
  ]
 },
 {
  "q": "What types of businesses in Dubai benefit most from IT AMC services?",
  "a": [
   [
    "p",
    "From startups to large enterprises, IT AMC supports any business that relies on technology for operations, including financial institutions, healthcare, educational institutions, real estate industry, Oil & Gas industry, manufacturing industry, insurance industry, logistics industry, retail industry and many more."
   ]
  ]
 },
 {
  "q": "What is the typical response time under Cubezix’s IT AMC?",
  "a": [
   [
    "p",
    "We offer SLA-backed response times with 24/7 support to ensure critical issues are addressed promptly, minimizing disruption to your business."
   ]
  ]
 },
 {
  "q": "Can IT AMC contracts be customized according to my company’s IT setup?",
  "a": [
   [
    "p",
    "Absolutely. Cubezix tailors IT AMC contracts based on the number of devices, type of infrastructure, and industry-specific requirements."
   ]
  ]
 },
 {
  "q": "Will CubeZix provide reports and analytics on my IT systems?",
  "a": [
   [
    "p",
    "Yes. Our IT AMC includes detailed reporting on system health, device performance, cybersecurity incidents, and overall IT infrastructure efficiency."
   ]
  ]
 },
 {
  "q": "How does CubeZix differentiate from other IT AMC providers in Dubai?",
  "a": [
   [
    "p",
    "We combine proactive maintenance, cybersecurity services, 24/7 support, client dashboards, and industry-specific expertise to deliver superior value."
   ]
  ]
 },
 {
  "q": "What is the IT AMC Dubai contact number for Cubezix?",
  "a": [
   [
    "p",
    "To get professional IT Annual Maintenance Contract (AMC) services in Dubai, you can reach Cubezix at their IT AMC Dubai contact number +9714241420"
   ]
  ]
 },
 {
  "q": "What is the typical IT AMC cost for businesses in Dubai?",
  "a": [
   [
    "p",
    "The IT AMC cost varies depending on the size of your organization, the number of devices, and the level of support required."
   ]
  ]
 }
]

export const PLANS = ['Comprehensive IT AMC', 'Non-Comprehensive IT AMC', 'Reliable Remote Support', '24/7 Critical On-site Support', 'Outsourced IT Support Engineer', 'L1, L2 and L3 IT Support']

export const INDUSTRIES: { label: string; text: string; icon: LucideIcon }[] = [
  { label: "Financial Services & Insurance", icon: Landmark, text: "Ensure secure, compliant, and high-performing IT infrastructure with proactive IT AMC services that support uninterrupted banking, accounting, insurance and financial operations." },
  { label: "Healthcare", icon: Stethoscope, text: "Keep healthcare systems, medical workstations, and patient data secure with reliable IT AMC services designed to maximize uptime and operational efficiency." },
  { label: "Real Estate", icon: Building2, text: "Maintain uninterrupted access to CRM platforms, property management software, and communication systems with comprehensive IT AMC solutions for real estate businesses." },
  { label: "Petroleum and Oil & Gas", icon: Fuel, text: "Protect and strengthen operations with robust IT infrastructure maintenance, network monitoring, and cybersecurity tailored for the petroleum and oil & gas industry." },
  { label: "Manufacturing & Distribution", icon: Factory, text: "Minimize production downtime and improve operational efficiency through proactive maintenance of manufacturing IT systems, servers, and business networks." },
  { label: "Logistics & Retail", icon: Truck, text: "Keep supply chains moving and retail operations running smoothly with reliable IT support for POS systems, warehouses, inventory software, and business networks." },
  { label: "Educational Institutions", icon: GraduationCap, text: "Enhance teaching, learning, and administration with dependable IT AMC services that support smart classrooms, campus networks, and educational technology platforms." },
  { label: "Media & Entertainment", icon: Tv, text: "Maintain high-performance IT systems that support content creation, digital collaboration, media production, and uninterrupted business operations." },
  { label: "Public Sector", icon: Briefcase, text: "Improve service delivery and protect critical government IT infrastructure with secure, proactive, and scalable IT AMC solutions." },
  { label: "Trading", icon: BarChart3, text: "Support fast-paced trading operations with reliable IT infrastructure, secure connectivity, and proactive maintenance that minimizes downtime and maximizes productivity." },
]
