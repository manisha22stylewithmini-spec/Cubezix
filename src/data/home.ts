export const stats = [
  { value: '9+', label: 'Years Experience' },
  { value: '24/7', label: 'IT AMC Support' },
  { value: '98%', label: 'Client satisfaction' },
  { value: '1800+', label: 'Projects completed' },
]

export const partners = [
  { icon: 'server', name: 'Microsoft 365' }, { icon: 'cloud', name: 'AWS' }, { icon: 'network', name: 'Cisco' },
  { icon: 'shield-check', name: 'Fortinet' }, { icon: 'layers', name: 'VMware' }, { icon: 'cloud-upload', name: 'Google Cloud' },
  { icon: 'layout-grid', name: 'Zoho' }, { icon: 'contact', name: 'Salesforce' },
]

export const steps = [
  { title: 'Discovery and Analysis', body: "Perform a analysis of the client's existing IT systems.", img: 'consult-discovery.jpg', alt: 'Discovery workshop board' },
  { title: 'Tailored IT Solutions', body: 'Clients benefit from customized IT strategies that align with their specific business goals.', img: 'consult-tailored.jpg', alt: 'Team delivery board' },
  { title: 'Expertise and Innovation', body: 'Clients gain a competitive edge by implementing cutting-edge solutions that enhance their IT infrastructure and future-proof their operations.', img: 'consult-expertise.jpg', alt: 'CubeZix enterprise technology partner' },
]

export const model = [
  { company: 'Team', quote: 'Introduction', body: 'You meet the engineers who will own your estate day to day.', keys: ['Named Engineers', 'Account Owner', 'Kick-off', 'Coverage Hours', 'Escalation'], img: 'model-01-introduction.jpg' },
  { company: 'Support', quote: 'Process', body: 'A single documented path from request to resolution.', keys: ['Intake', 'Triage', 'Priority', 'Resolution', 'Review'], img: 'model-02-process.jpg' },
  { company: 'Helpdesk', quote: 'Ticket intake', body: 'Open tickets by email, chat or phone.', keys: ['Email', 'Chat', 'Phone', 'Ticket ID', 'Acknowledgement'], img: 'model-03-ticket-intake.jpg' },
  { company: 'Remote Support', quote: 'Management', body: 'Most issues are resolved remotely before anyone has to travel.', keys: ['Remote Session', 'Patching', 'Monitoring', 'Config Changes', 'Handover'], img: 'model-04-management.jpg' },
  { company: 'IT Infrastructure', quote: 'Document', body: 'Your estate is documented so nothing depends on memory.', keys: ['Asset Register', 'Network Map', 'Licences', 'Runbooks', 'Change Log'], img: 'model-05-document.jpg' },
  { company: 'Preventive', quote: 'Maintenance', body: 'Scheduled checks keep systems healthy instead of reacting to failures.', keys: ['Health Checks', 'Backups', 'Firmware', 'Capacity', 'Reporting'], img: 'model-06-maintenance.jpg' },
]

export const testimonials = [
  { quote: 'From the initial IT consultation to the seamless implementation, CubeZix demonstrated a deep understanding of our unique IT Infrastructure needs. Their expertise in network security, cloud computing, and IT infrastructure management has significantly enhanced our operational efficiency.', name: 'Samarth V', role: 'Assistant Finance Manager, Al Rama International FZCO', initials: 'SV' },
  { quote: "CubeZix's responsiveness is impressive; they are always quick to address any issues that arise, minimizing downtime and keeping our operations seamless. Beyond just maintenance, CubeZix offers valuable advice and proactive solutions, helping us stay ahead with the latest technology and best practices.", name: 'Tarek Nachnouchi', role: 'Chief Product Officer, Arabyads', initials: 'TN' },
  { quote: "CubeZix's proactive maintenance approach is a standout feature. They regularly monitor our systems, perform routine check-ups, and provide detailed reports on our IT health. Their dedication to proactive maintenance and their ability to deliver outstanding results have truly exceeded our expectations.", name: 'Aman Nasser', role: 'Director, International Textile Exports Ltd', initials: 'AN' },
  { quote: 'Migrating our infrastructure to the cloud with CubeZix was seamless. Their team planned every step, kept downtime to a minimum, and our systems have been faster and more reliable since.', name: 'Farah Idris', role: 'Operations Lead, Meridian Holdings', initials: 'FI' },
]

export const faqCats = [
  { id: 'services', icon: 'layout-grid', label: 'Services', heading: 'Service questions', sub: 'What CubeZix covers and how engagements are scoped.' },
  { id: 'amc', icon: 'shield-check', label: 'IT AMC', heading: 'IT AMC questions', sub: 'Coverage, response times and what a maintenance contract includes.' },
  { id: 'infra', icon: 'cpu', label: 'Infrastructure', heading: 'Infrastructure questions', sub: 'Servers, networks, cabling and the estate we manage.' },
  { id: 'billing', icon: 'credit-card', label: 'Contracts', heading: 'Contract questions', sub: 'Terms, billing and how contracts are structured.' },
]

export const faqs: Record<string, { q: string; a: string }[]> = {
  services: [
    { q: 'What services does CubeZix deliver?', a: 'IT AMC, outsourcing, consultancy and support, plus infrastructure, structured cabling, security systems, cloud and ERP — all under one contract.' },
    { q: 'Which regions do you cover?', a: 'We deliver across the MENA region, with the delivery team and support desk based in Dubai and extended-hours coverage from India.' },
    { q: 'How does an engagement start?', a: 'With an assessment of your current IT infrastructure, workflows and pain points. The proposal follows that assessment, not a template.' },
    { q: 'Can you take on part of our estate only?', a: 'Yes. Many clients start with the area that hurts most — the helpdesk, the network, or backup — and expand from there.' },
    { q: 'Do you work with our existing IT team?', a: 'Yes. We can run the whole estate or sit alongside an internal team, taking specific layers such as monitoring or infrastructure.' },
  ],
  amc: [
    { q: 'What does an IT AMC include?', a: 'Preventive maintenance, scheduled health checks, remote and onsite support, and documented reporting on the health of your systems.' },
    { q: 'How fast do you respond?', a: 'Median first response is 15 minutes during business hours. Priority levels and coverage hours are agreed in the contract.' },
    { q: 'Is support available 24/7?', a: '24/7 escalation is available as part of the AMC. Standard coverage follows business hours with an out-of-hours path for service-down incidents.' },
    { q: 'How do we raise a ticket?', a: 'By email, chat or phone. Every request gets a ticket ID and an acknowledgement, then follows one documented path to resolution.' },
    { q: 'Can the AMC be customised?', a: 'Yes. Coverage is scoped to the size of your estate — basic, standard and premium packages exist, and each can be adjusted.' },
  ],
  infra: [
    { q: 'What does IT infrastructure cover here?', a: 'Servers and virtualization, networking and Wi-Fi, firewalls, telephony, Microsoft 365, backup and disaster recovery, and hardware.' },
    { q: 'Do you handle new office setups?', a: 'Yes. From structured cabling and racks through to devices, connectivity and user accounts on day one.' },
    { q: 'Is your cabling work certified?', a: 'Yes. Cabling is documented and certified on handover, and CCTV installations are delivered to SIRA-approved standards.' },
    { q: 'Can you migrate us to the cloud?', a: 'Yes. Cloud migration is planned against your current estate, then executed in stages so operations keep running.' },
    { q: 'How is our estate documented?', a: 'Asset registers, network maps, licences, runbooks and a change log — so nothing depends on one person remembering it.' },
  ],
  billing: [
    { q: 'How is pricing structured?', a: 'Contracts are scoped to your estate and coverage hours. Pricing is quoted as a range until the assessment is complete.' },
    { q: 'What contract lengths do you offer?', a: 'Annual maintenance contracts are the norm, with the scope reviewed as the estate changes.' },
    { q: 'What happens at renewal?', a: 'We review the coverage against what actually happened during the year, then adjust scope before renewing.' },
    { q: 'Can we scale coverage mid-contract?', a: 'Yes. Adding sites, users or services is handled as a scope change rather than a new contract.' },
    { q: 'Who is our point of contact?', a: 'Engineers are named on the accounts they run, with a single escalation path rather than a shared inbox.' },
  ],
}
