import { prisma } from './prisma';
import { siteConfig } from './config';

export interface OrientationActivityItem {
  id: string;
  orientationDayId: string;
  title: string;
  description: string;
  startTime: string;
  endTime?: string;
  venue: string;
  category: 'Academic' | 'Induction' | 'Social' | 'Tech' | 'Tour' | 'Welfare';
  speaker?: string;
  isCompulsory: boolean;
  displayOrder: number;
  status: string;
}

export interface OrientationDayItem {
  id: string;
  title: string;
  slug: string;
  eventDate: string;
  description: string;
  venue: string;
  status: string;
  displayOrder: number;
  activities: OrientationActivityItem[];
}

export interface AnnouncementItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: 'Orientation' | 'Registration' | 'Travel' | 'Accommodation' | 'General';
  priority: 'normal' | 'urgent';
  status: 'published' | 'draft';
  publishedAt: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Admissions & Documents' | 'Arrival & Travel' | 'Accommodation' | 'Orientation Week' | 'SPRF & Tech';
  displayOrder: number;
  status: string;
}

export interface LeadershipItem {
  id: string;
  name: string;
  role: string;
  biography: string;
  imagePath?: string;
  contactUrl?: string;
  displayOrder: number;
  status: string;
}

export interface TransportGuideItem {
  id: string;
  originCity: string;
  destination: string;
  providerName: string;
  terminalName: string;
  routeDescription: string;
  estimatedFare?: string;
  currency: string;
  estimatedDuration?: string;
  sourceUrl?: string;
  lastVerifiedAt?: string;
  status: string;
}

export interface ContactMessageItem {
  id: string;
  name: string;
  email: string;
  category: string;
  message: string;
  status: string;
  createdAt: string;
}

// Initial Verified Seed Data for SPRF Venite University
export const defaultOrientationDays: OrientationDayItem[] = [
  {
    id: 'day-1',
    title: 'Day 1: Arrival, Welcome & Residential Check-in',
    slug: 'day-1-arrival-check-in',
    eventDate: '2026-11-16T08:00:00+01:00',
    description: 'Fresh students arrival, campus reception at Main Gate, hostel room allocation, and preliminary credential verification.',
    venue: 'Venite University Reception Ground & Student Affairs Complex',
    status: 'published',
    displayOrder: 1,
    activities: [
      {
        id: 'act-1-1',
        orientationDayId: 'day-1',
        title: 'Arrival & Reception at Main Gate',
        description: 'SPRF Welcome Marshals assist arriving students with luggage, transport coordination, and initial check-in tags.',
        startTime: '08:00 AM',
        endTime: '12:00 PM',
        venue: 'Main Campus Entrance Gate, Ayetoro Road',
        category: 'Welfare',
        speaker: 'SPRF Student Welfare Team',
        isCompulsory: true,
        displayOrder: 1,
        status: 'published',
      },
      {
        id: 'act-1-2',
        orientationDayId: 'day-1',
        title: 'Hostel Allocation & Room Key Issuance',
        description: 'Verification of accommodation clearance slip and collection of room keys at designated hall supervisor desks.',
        startTime: '10:00 AM',
        endTime: '04:00 PM',
        venue: 'Hall of Residence Offices (Male & Female Wings)',
        category: 'Induction',
        speaker: 'Student Affairs Officers',
        isCompulsory: true,
        displayOrder: 2,
        status: 'published',
      },
      {
        id: 'act-1-3',
        orientationDayId: 'day-1',
        title: 'SPRF Tech Helpdesk & Student Portal Activation',
        description: 'Get your official student email, portal credentials, and campus Wi-Fi network setup with SPRF peer tech advisors.',
        startTime: '02:00 PM',
        endTime: '06:00 PM',
        venue: 'SPRF Tech Hub, Computer Lab B',
        category: 'Tech',
        speaker: 'SPRF Technology Directorate',
        isCompulsory: false,
        displayOrder: 3,
        status: 'published',
      },
    ],
  },
  {
    id: 'day-2',
    title: 'Day 2: Official University Matriculation Briefing & VC Address',
    slug: 'day-2-matriculation-briefing-vc-address',
    eventDate: '2026-11-17T09:00:00+01:00',
    description: 'Vice-Chancellor welcome address, introduction of university principal officers, and essential code of conduct briefing.',
    venue: 'University Central Auditorium',
    status: 'published',
    displayOrder: 2,
    activities: [
      {
        id: 'act-2-1',
        orientationDayId: 'day-2',
        title: 'Vice-Chancellor Welcome Address to Freshers',
        description: 'Official welcome to Venite University, institutional vision, academic excellence standards, and core values.',
        startTime: '09:00 AM',
        endTime: '11:00 AM',
        venue: 'University Central Auditorium',
        category: 'Induction',
        speaker: 'The Vice-Chancellor & Principal Officers',
        isCompulsory: true,
        displayOrder: 1,
        status: 'published',
      },
      {
        id: 'act-2-2',
        orientationDayId: 'day-2',
        title: 'Academic Regulations, Grading & Credit System',
        description: 'Understanding semester GPA, continuous assessment, course registration deadlines, and examination rules.',
        startTime: '11:30 AM',
        endTime: '01:30 PM',
        venue: 'University Central Auditorium',
        category: 'Academic',
        speaker: 'Dean of Academic Affairs & Registrar',
        isCompulsory: true,
        displayOrder: 2,
        status: 'published',
      },
      {
        id: 'act-2-3',
        orientationDayId: 'day-2',
        title: 'Campus Tour & Faculty Familiarisation Walk',
        description: 'Guided tour covering the University Library, ICT Centre, Medical Centre, Cafeteria, and Sports Pavilion.',
        startTime: '03:00 PM',
        endTime: '05:30 PM',
        venue: 'Departs from University Central Auditorium',
        category: 'Tour',
        speaker: 'SPRF Student Guides',
        isCompulsory: true,
        displayOrder: 3,
        status: 'published',
      },
    ],
  },
  {
    id: 'day-3',
    title: 'Day 3: Faculty Day & Departmental Induction',
    slug: 'day-3-faculty-departmental-induction',
    eventDate: '2026-11-18T09:30:00+01:00',
    description: 'Meet Deans of Faculty, Heads of Department (HODs), Course Advisors, and departmental student leaders.',
    venue: 'Respective Faculty Lecture Theatres',
    status: 'published',
    displayOrder: 3,
    activities: [
      {
        id: 'act-3-1',
        orientationDayId: 'day-3',
        title: 'Faculty Assemblies & Course Advisor Allocations',
        description: 'Detailed curriculum breakdown for Computing, Engineering, Health Sciences, and Humanities.',
        startTime: '09:30 AM',
        endTime: '12:00 PM',
        venue: 'Faculty Lecture Theatres',
        category: 'Academic',
        speaker: 'Deans & Heads of Departments',
        isCompulsory: true,
        displayOrder: 1,
        status: 'published',
      },
      {
        id: 'act-3-2',
        orientationDayId: 'day-3',
        title: 'Library Onboarding & E-Resources Access',
        description: 'Physical card issuance and access to IEEE Xplore, ScienceDirect, and digital catalogue credentials.',
        startTime: '01:30 PM',
        endTime: '03:30 PM',
        venue: 'Main Library E-Learning Wing',
        category: 'Academic',
        speaker: 'University Librarian',
        isCompulsory: true,
        displayOrder: 2,
        status: 'published',
      },
      {
        id: 'act-3-3',
        orientationDayId: 'day-3',
        title: 'SPRF Developer Orientation & Peer Mentorship Sign-up',
        description: 'Introduction to tech community tracks: Web & Mobile Engineering, AI/Data, Cloud Infrastructure, and Cyber Security.',
        startTime: '04:00 PM',
        endTime: '06:00 PM',
        venue: 'ICT Innovation Theatre',
        category: 'Tech',
        speaker: 'SPRF Executive Council',
        isCompulsory: false,
        displayOrder: 3,
        status: 'published',
      },
    ],
  },
  {
    id: 'day-4',
    title: 'Day 4: Campus Safety, Health & Student Welfare',
    slug: 'day-4-safety-health-student-welfare',
    eventDate: '2026-11-19T09:00:00+01:00',
    description: 'Medical centre registration, fire safety drills, university security protocols, and student rights & responsibilities.',
    venue: 'University Central Auditorium',
    status: 'published',
    displayOrder: 4,
    activities: [
      {
        id: 'act-4-1',
        orientationDayId: 'day-4',
        title: 'Health Services Registration & Mandatory Screening',
        description: 'Medical records filing, emergency response procedures, and National Health Insurance Scheme (NHIS) orientation.',
        startTime: '09:00 AM',
        endTime: '12:00 PM',
        venue: 'University Medical Centre',
        category: 'Welfare',
        speaker: 'Director of Health Services',
        isCompulsory: true,
        displayOrder: 1,
        status: 'published',
      },
      {
        id: 'act-4-2',
        orientationDayId: 'day-4',
        title: 'Campus Security, Fire Safety & Emergency Contacts',
        description: 'Safety guidelines, emergency hotlines, reporting protocols, and campus boundary limits.',
        startTime: '01:30 PM',
        endTime: '03:30 PM',
        venue: 'University Central Auditorium',
        category: 'Induction',
        speaker: 'Chief Security Officer',
        isCompulsory: true,
        displayOrder: 2,
        status: 'published',
      },
    ],
  },
  {
    id: 'day-5',
    title: 'Day 5: SPRF Tech Exhibition & Innovation Showcase',
    slug: 'day-5-sprf-tech-exhibition',
    eventDate: '2026-11-20T10:00:00+01:00',
    description: 'Student programmer showcase, hackathon announcements, lightning tech talks, and open-source project demos.',
    venue: 'Venite University Innovation Hall',
    status: 'published',
    displayOrder: 5,
    activities: [
      {
        id: 'act-5-1',
        orientationDayId: 'day-5',
        title: 'SPRF Student Projects Exhibition & Live Code Demos',
        description: 'Showcase of practical software solutions built by Venite University student programmers.',
        startTime: '10:00 AM',
        endTime: '01:00 PM',
        venue: 'Innovation Hall',
        category: 'Tech',
        speaker: 'SPRF Engineering Leads',
        isCompulsory: false,
        displayOrder: 1,
        status: 'published',
      },
      {
        id: 'act-5-2',
        orientationDayId: 'day-5',
        title: 'Tech Career Pathways: From 100L to Industry Readiness',
        description: 'Interactive fireside chat with alumni engineers and tech industry leaders on software careers.',
        startTime: '02:00 PM',
        endTime: '04:30 PM',
        venue: 'Innovation Hall',
        category: 'Academic',
        speaker: 'SPRF President & Guest Engineers',
        isCompulsory: false,
        displayOrder: 2,
        status: 'published',
      },
    ],
  },
  {
    id: 'day-6',
    title: 'Day 6: Freshers Sports Mixer & Grand Welcome Social',
    slug: 'day-6-sports-welcome-social',
    eventDate: '2026-11-21T08:00:00+01:00',
    description: 'Friendly football match, track games, student society booths, music, cultural expressions, and closing dinner.',
    venue: 'Venite Sports Pavilion & Student Garden',
    status: 'published',
    displayOrder: 6,
    activities: [
      {
        id: 'act-6-1',
        orientationDayId: 'day-6',
        title: 'Freshers vs Seniors Football Match & Track Games',
        description: 'Friendly athletic showcase, team sports, and recreational fitness games.',
        startTime: '08:00 AM',
        endTime: '12:00 PM',
        venue: 'Venite Sports Complex',
        category: 'Social',
        speaker: 'Sports Council',
        isCompulsory: false,
        displayOrder: 1,
        status: 'published',
      },
      {
        id: 'act-6-2',
        orientationDayId: 'day-6',
        title: 'Grand Welcome Evening Social & Awards Reception',
        description: 'Dinner, networking, recognition of orientation facilitators, and official closing ceremony.',
        startTime: '05:00 PM',
        endTime: '08:30 PM',
        venue: 'Venite Hall of Events',
        category: 'Social',
        speaker: 'SPRF Leadership & Student Affairs',
        isCompulsory: false,
        displayOrder: 2,
        status: 'published',
      },
    ],
  },
];

export const defaultAnnouncements: AnnouncementItem[] = [
  {
    id: 'ann-1',
    title: 'Official SPRF Arrival Marshals Stationed at Iloro-Ekiti Junction & Campus Gate',
    slug: 'sprf-arrival-marshals-stationed',
    summary: 'Designated student marshals wearing official SPRF badges are on duty to guide arriving freshers from motor parks to campus.',
    content: `All newly admitted students arriving in Iloro-Ekiti for the 2026/2027 Academic Session are advised that official SPRF Welcome Marshals are stationed at the Iloro-Ekiti Central Motor Junction and the Main University Gate on Ayetoro Road.

Marshals are equipped with identification tags and will assist with campus direction, luggage logistics, and immediate clearance desk directions. Do not hand personal valuables or admission credentials to unverified persons.

For immediate arrival assistance or questions about motor park drop-offs, call the SPRF Arrival Helpline at +234 800 000 7773.`,
    category: 'Travel',
    priority: 'urgent',
    status: 'published',
    publishedAt: '2026-10-28T09:00:00+01:00',
  },
  {
    id: 'ann-2',
    title: 'Mandatory Admission Credentials Verification Checklist Released',
    slug: 'admission-credentials-verification-checklist',
    summary: 'The Academic Affairs division has published the complete list of original documents required for in-person clearance.',
    content: `Please ensure you have both originals and at least four (4) photocopies of each of the following documents before reporting to the verification desk:
1. JAMB Admission Letter (Institution Copy)
2. Venite University Provisional Admission Notification
3. O'Level Result(s) (WAEC/NECO/NABTEB) with scratch card verification slips
4. Birth Certificate or Declared Age Affidavit
5. Local Government Origin Certificate
6. Letter of Attestation/Recommendation from a Clergy or Legal Practitioner
7. Twelve (12) recent passport photographs (white background)
8. Proof of School & Hostel Fee payment receipts.`,
    category: 'Registration',
    priority: 'normal',
    status: 'published',
    publishedAt: '2026-10-25T11:30:00+01:00',
  },
  {
    id: 'ann-3',
    title: 'Hostel Room Keys & Bedding Allocation Schedule',
    slug: 'hostel-room-keys-allocation-schedule',
    summary: 'Hostels open from 8:00 AM on Monday. Please confirm your hostel fee verification before heading to the hall warden office.',
    content: `Hostel accommodation desks in the University Residence Halls will commence room key issuance starting 8:00 AM on Monday, November 16, 2026.

Important Reminders:
- Students must present their validated accommodation receipt.
- Standard university mattresses are provided; students are required to bring bedsheets, pillowcases, and personal blankets.
- Electrical appliances exceeding 500W (e.g. hotplates, boiling rings) are strictly prohibited in the halls of residence as per university fire safety codes.`,
    category: 'Accommodation',
    priority: 'normal',
    status: 'published',
    publishedAt: '2026-10-22T14:00:00+01:00',
  },
  {
    id: 'ann-4',
    title: 'SPRF Technology Orientation & Peer Mentorship Track Registration',
    slug: 'sprf-technology-orientation-peer-mentorship',
    summary: 'Join peer coding cohorts, receive free software development tooling kits, and participate in our 100L programmer accelerator.',
    content: `The Student Programmer Representative Forum invites all newly admitted students in Computing, Software Engineering, Cybersecurity, and tech-curious departments to our orientation sessions on Day 3 and Day 5.

Participants will receive:
- Free GitHub Student Developer Pack activation guidance
- Introduction to campus coding hubs and hackathons
- Peer mentorship pairings with senior engineering students
- Hands-on workshops in Web Development, Mobile Apps, and Artificial Intelligence.`,
    category: 'Orientation',
    priority: 'normal',
    status: 'published',
    publishedAt: '2026-10-20T16:00:00+01:00',
  },
];

export const defaultFaqs: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How do I locate Venite University once I arrive in Ekiti State?',
    answer: 'Venite University is located at KM 2, Ayetoro Road, Iloro-Ekiti, Ekiti State. From Ado-Ekiti, board a vehicle heading to Iloro-Ekiti or Aramoko/Ijero axis. Drop off at Iloro-Ekiti junction, where local campus shuttles and tricycles directly serve the university gate (KM 2, Ayetoro Road). You can use our interactive Travel Guide on this portal to generate live driving or transit directions in Google Maps.',
    category: 'Arrival & Travel',
    displayOrder: 1,
    status: 'published',
  },
  {
    id: 'faq-2',
    question: 'What happens if I arrive after official hours or late at night?',
    answer: 'We strongly advise scheduling your journey to arrive before 5:00 PM for optimal road safety and immediate check-in. If you experience travel delays and arrive after hours, report immediately to the 24/7 Campus Security Post at the Main Gate. Security personnel will verify your admission slip and provide safe temporary reception until morning clearance begins.',
    category: 'Arrival & Travel',
    displayOrder: 2,
    status: 'published',
  },
  {
    id: 'faq-3',
    question: 'What documents are compulsory for Day 1 physical clearance?',
    answer: 'You must bring: (1) JAMB Admission Letter, (2) Venite University Admission Letter, (3) O\'Level Statement of Results, (4) Birth Certificate or Age Declaration, (5) Local Government Certificate, (6) 12 passport photographs, (7) Medical fitness report if completed, and (8) Official payment receipts for acceptance, tuition, and accommodation fees.',
    category: 'Admissions & Documents',
    displayOrder: 3,
    status: 'published',
  },
  {
    id: 'faq-4',
    question: 'Are orientation activities compulsory for all newly admitted students?',
    answer: 'Yes. Core orientation events marked "Compulsory" (such as the Vice-Chancellor’s Address, Academic Regulations Briefing, and Medical Centre Registration) are statutory university requirements. Attendance is logged and constitutes part of your matriculation eligibility.',
    category: 'Orientation Week',
    displayOrder: 4,
    status: 'published',
  },
  {
    id: 'faq-5',
    question: 'What is SPRF and how does it support students?',
    answer: 'SPRF stands for Student Programmer Representative Forum. It is the premier student-led technological leadership forum at Venite University. SPRF represents student interests in digital learning, hosts coding workshops, provides peer mentorship, organizes hackathons, and manages technology platforms that enhance student campus life.',
    category: 'SPRF & Tech',
    displayOrder: 5,
    status: 'published',
  },
  {
    id: 'faq-6',
    question: 'What electrical appliances are permitted in university hostels?',
    answer: 'Laptops, phone chargers, rechargeable reading lamps, and standard electric fans are permitted. High-wattage heating appliances—such as electric boiling rings, hotplates, electric cookers, and pressing irons exceeding rated capacity—are prohibited by university residence hall safety regulations.',
    category: 'Accommodation',
    displayOrder: 6,
    status: 'published',
  },
];

export const defaultLeadership: LeadershipItem[] = [
  {
    id: 'lead-1',
    name: 'President, SPRF',
    role: 'Executive President & Student Programmer Representative',
    biography: 'Leads SPRF executive administration, student representation with university governance, digital student welfare initiatives, and student technical capacity development at Venite University.',
    imagePath: '/images/hero_sprf_students_1793296260047.jpg',
    contactUrl: 'mailto:president@sprf-venite.org',
    displayOrder: 1,
    status: 'published',
  },
  {
    id: 'lead-2',
    name: 'Vice President (Administration)',
    role: 'Vice President & Orientation Operations Lead',
    biography: 'Directs orientation week logistics, fresher onboarding programs, inter-faculty student coordination, and welfare marshals.',
    imagePath: '/images/tech_code_workshop_1793296261772.jpg',
    contactUrl: 'mailto:vp@sprf-venite.org',
    displayOrder: 2,
    status: 'published',
  },
  {
    id: 'lead-3',
    name: 'General Secretary',
    role: 'General Secretary & Records Director',
    biography: 'Oversees official communications, meeting archives, fresher inquiries documentation, and liaison with the Directorate of Student Affairs.',
    contactUrl: 'mailto:secretary@sprf-venite.org',
    displayOrder: 3,
    status: 'published',
  },
  {
    id: 'lead-4',
    name: 'Director of Technology & Systems',
    role: 'Chief Technology Officer',
    biography: 'Leads development of student software platforms, portal tech support, campus coding bootcamps, and developer track mentorship.',
    contactUrl: 'mailto:tech@sprf-venite.org',
    displayOrder: 4,
    status: 'published',
  },
  {
    id: 'lead-5',
    name: 'Director of Student Welfare & Logistics',
    role: 'Welfare & Arrival Logistics Lead',
    biography: 'Coordinates arrival travel assistance, hostel welfare oversight, food vendor hygiene verification, and student emergency response.',
    contactUrl: 'mailto:welfare@sprf-venite.org',
    displayOrder: 5,
    status: 'published',
  },
];

export const defaultTransportGuides: TransportGuideItem[] = [
  {
    id: 'trans-1',
    originCity: 'Lagos (Ojota / Berger / Oshodi)',
    destination: 'Venite University, Iloro-Ekiti',
    providerName: 'Ekiti State Mass Transit / Commercial Inter-State Buses',
    terminalName: 'Ojota Motor Park or Berger Bus Stop, Lagos',
    routeDescription: 'Board a direct vehicle heading to Ado-Ekiti or Aramoko-Ekiti via Sagamu-Benin expressway to Ore, or via Ibadan-Iwo-Osogbo route. From Ado-Ekiti Central, connect local transport to Iloro-Ekiti. Drop off at Venite University Gate on Ayetoro Road.',
    estimatedFare: 'NGN 7,500 – NGN 11,000 (Subject to current fuel tariffs)',
    currency: 'NGN',
    estimatedDuration: '4.5 – 6 hours depending on traffic',
    sourceUrl: 'https://maps.google.com',
    lastVerifiedAt: '2026-10-25',
    status: 'published',
  },
  {
    id: 'trans-2',
    originCity: 'Ibadan (Iwo Road / Ojoo)',
    destination: 'Venite University, Iloro-Ekiti',
    providerName: 'Iwo Road Ekiti Express Transit',
    terminalName: 'Iwo Road Main Interchange, Ibadan',
    routeDescription: 'Take direct transit to Ado-Ekiti or Ijero-Ekiti. You can also disembark at Aramoko-Ekiti and board a connecting tricycle or shuttle direct to Iloro-Ekiti (approx. 15-20 minutes).',
    estimatedFare: 'NGN 4,500 – NGN 7,000',
    currency: 'NGN',
    estimatedDuration: '2.5 – 3.5 hours',
    sourceUrl: 'https://maps.google.com',
    lastVerifiedAt: '2026-10-25',
    status: 'published',
  },
  {
    id: 'trans-3',
    originCity: 'Abuja (Utako / Jabi / Area 1)',
    destination: 'Venite University, Iloro-Ekiti',
    providerName: 'Inter-State Commercial Parks / Peace Mass / GIGM to Akure or Ado',
    terminalName: 'Utako / Jabi Parks, Abuja',
    routeDescription: 'Board morning bus to Ado-Ekiti or Akure via Lokoja-Okene-Owo route. From Ado-Ekiti, board local taxis/minibuses heading to Iloro-Ekiti and request drop-off at Venite University.',
    estimatedFare: 'NGN 14,000 – NGN 19,000',
    currency: 'NGN',
    estimatedDuration: '7 – 9 hours',
    sourceUrl: 'https://maps.google.com',
    lastVerifiedAt: '2026-10-25',
    status: 'published',
  },
  {
    id: 'trans-4',
    originCity: 'Akure (Arakale / Ondo Road)',
    destination: 'Venite University, Iloro-Ekiti',
    providerName: 'Akure Regional Commercial Taxis',
    terminalName: 'Arakale Motor Park, Akure',
    routeDescription: 'Board a vehicle to Ado-Ekiti (approx. 45 mins), then connect to Iloro-Ekiti from Ado-Ekiti Central / Fajuyi Park directly to Ayetoro Road, Iloro-Ekiti.',
    estimatedFare: 'NGN 2,500 – NGN 4,000 total',
    currency: 'NGN',
    estimatedDuration: '1.5 – 2 hours',
    sourceUrl: 'https://maps.google.com',
    lastVerifiedAt: '2026-10-25',
    status: 'published',
  },
];

// In-Memory Storage for Runtime Updates (guarantees dynamic updates work even when external DB is in read-only or container state)
let memoryOrientationDays = [...defaultOrientationDays];
let memoryAnnouncements = [...defaultAnnouncements];
let memoryFaqs = [...defaultFaqs];
let memoryLeadership = [...defaultLeadership];
let memoryTransport = [...defaultTransportGuides];
let memoryMessages: ContactMessageItem[] = [];
let memorySettings: Record<string, string> = {
  address: siteConfig.address,
  googleMapsDestination: siteConfig.googleMapsDestination,
  orientationDatesText: siteConfig.orientationDatesText,
  officialEmail: siteConfig.contact.officialEmail,
  emergencyHelpline: siteConfig.contact.emergencyHelpline,
  sessionName: siteConfig.sessionName,
};

// Database or Fallback Queries
export async function getOrientationDays(): Promise<OrientationDayItem[]> {
  try {
    const days = await (prisma as any).orientationDay.findMany({
      where: { status: 'published' },
      include: {
        activities: {
          where: { status: 'published' },
          orderBy: { displayOrder: 'asc' },
        },
      },
      orderBy: { displayOrder: 'asc' },
    });
    if (days && days.length > 0) {
      return days.map((d: any) => ({
        ...d,
        eventDate: d.eventDate.toISOString ? d.eventDate.toISOString() : String(d.eventDate),
        activities: (d.activities || []).map((a: any) => ({ ...a })),
      }));
    }
  } catch (err) {
    console.warn('[DataStore] Reading orientation days from memory store');
  }
  return memoryOrientationDays;
}

export async function getOrientationDayBySlug(slug: string): Promise<OrientationDayItem | null> {
  const days = await getOrientationDays();
  return days.find((d) => d.slug === slug) || null;
}

export async function getAnnouncements(): Promise<AnnouncementItem[]> {
  try {
    const records = await (prisma as any).announcement.findMany({
      where: { status: 'published' },
      orderBy: { publishedAt: 'desc' },
    });
    if (records && records.length > 0) {
      return records.map((r: any) => ({
        ...r,
        publishedAt: r.publishedAt.toISOString ? r.publishedAt.toISOString() : String(r.publishedAt),
      }));
    }
  } catch (err) {
    console.warn('[DataStore] Reading announcements from memory store');
  }
  return memoryAnnouncements.filter((a) => a.status === 'published');
}

export async function getAnnouncementBySlug(slug: string): Promise<AnnouncementItem | null> {
  const all = await getAnnouncements();
  return all.find((a) => a.slug === slug) || null;
}

export async function getFaqs(): Promise<FaqItem[]> {
  try {
    const records = await (prisma as any).faq.findMany({
      where: { status: 'published' },
      orderBy: { displayOrder: 'asc' },
    });
    if (records && records.length > 0) {
      return records;
    }
  } catch (err) {
    console.warn('[DataStore] Reading FAQs from memory store');
  }
  return memoryFaqs.filter((f) => f.status === 'published');
}

export async function getLeadershipProfiles(): Promise<LeadershipItem[]> {
  try {
    const records = await (prisma as any).leadershipProfile.findMany({
      where: { status: 'published' },
      orderBy: { displayOrder: 'asc' },
    });
    if (records && records.length > 0) {
      return records;
    }
  } catch (err) {
    console.warn('[DataStore] Reading leadership from memory store');
  }
  return memoryLeadership.filter((l) => l.status === 'published');
}

export async function getTransportGuides(): Promise<TransportGuideItem[]> {
  try {
    const records = await (prisma as any).transportGuide.findMany({
      where: { status: 'published' },
      orderBy: { originCity: 'asc' },
    });
    if (records && records.length > 0) {
      return records;
    }
  } catch (err) {
    console.warn('[DataStore] Reading transport guides from memory store');
  }
  return memoryTransport.filter((t) => t.status === 'published');
}

export async function getSiteSettings(): Promise<Record<string, string>> {
  try {
    const records = await (prisma as any).siteSetting.findMany();
    if (records && records.length > 0) {
      const result: Record<string, string> = { ...memorySettings };
      for (const r of records) {
        result[r.key] = r.value;
      }
      return result;
    }
  } catch (err) {
    console.warn('[DataStore] Reading site settings from memory store');
  }
  return memorySettings;
}

export async function saveContactMessage(name: string, email: string, category: string, message: string): Promise<ContactMessageItem> {
  const newMsg: ContactMessageItem = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name,
    email,
    category,
    message,
    status: 'unread',
    createdAt: new Date().toISOString(),
  };

  try {
    await (prisma as any).contactMessage.create({
      data: {
        name,
        email,
        category,
        message,
        status: 'unread',
      },
    });
  } catch (err) {
    console.warn('[DataStore] Saved message to memory store');
  }

  memoryMessages.unshift(newMsg);
  return newMsg;
}

export async function getContactMessages(): Promise<ContactMessageItem[]> {
  try {
    const records = await (prisma as any).contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    if (records && records.length > 0) {
      return records.map((r: any) => ({
        ...r,
        createdAt: r.createdAt.toISOString ? r.createdAt.toISOString() : String(r.createdAt),
      }));
    }
  } catch (err) {
    console.warn('[DataStore] Reading messages from memory store');
  }
  return memoryMessages;
}
