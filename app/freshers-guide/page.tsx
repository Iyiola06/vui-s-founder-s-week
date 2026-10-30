import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { siteConfig } from '@/lib/config';
import { createMetadata } from '@/lib/seo';
import {
  BookOpen,
  FileText,
  Home,
  ShieldCheck,
  CheckSquare,
  ArrowRight,
  HeartPulse,
  Laptop,
  AlertCircle,
  HelpCircle,
  Compass,
} from 'lucide-react';

export const revalidate = 300;

export const metadata: Metadata = createMetadata({
  title: 'Freshers’ Guide: 9 Steps from Home to Campus',
  description:
    'Comprehensive step-by-step onboarding guide for newly admitted Venite University students, covering document clearance, hostel allocation, academic onboarding, and safety.',
  path: '/freshers-guide',
});

const GUIDE_CHAPTERS = [
  {
    number: '01',
    title: 'Before Leaving Home',
    icon: Home,
    content: `Careful preparation at home prevents severe clearance bottlenecks on campus. Ensure all admission fees (acceptance fee, tuition instalment, and accommodation) are paid through authorized university banking channels. Print out four (4) hard copies of every payment receipt with bank transaction reference numbers clearly visible. Back up digital PDF scans of all admission documents to Google Drive or cloud storage.`,
  },
  {
    number: '02',
    title: 'Mandatory Admission & Registration Documents',
    icon: FileText,
    content: `You will undergo physical document scrutiny before you are issued your student identification card and matriculation number. Arrange the following in a durable waterproof plastic file:
• Original JAMB Admission Letter (Institution copy)
• Venite University Official Admission Offer
• O'Level statement of result(s) (WAEC / NECO / NABTEB)
• Scratch cards for online verification of result(s)
• Birth Certificate or sworn declaration of age
• Certificate of origin issued by your Local Government Area
• Twelve (12) recent colored passport photographs (white background)
• Attestation letter of good character from a cleric, legal practitioner, or high-ranking civil servant.`,
  },
  {
    number: '03',
    title: 'Personal Living Essentials',
    icon: CheckSquare,
    content: `Hostels provide a standard single mattress and wardrobe space. You are required to bring:
• Bedsheets, pillowcases, and a light blanket
• Padlocks with at least two spare keys
• Personal hygiene items, washing bucket, pegs, and laundry detergents
• Plates, spoons, food flask, and an insulated water bottle
• Rechargeable reading lamp and surge protector.
Important Warning: Electric boiling rings, electric hotplates, cookers, and high-wattage immersion coils are prohibited by university fire safety regulations.`,
  },
  {
    number: '04',
    title: 'Travel Preparation & Arrival Timing',
    icon: Compass,
    content: `Ekiti State is centrally accessible from Osun, Ondo, Kogi, and Kwara borders. When travelling, dress comfortably, keep emergency cash separated in smaller denominations, and ensure your phone is charged.
Target to arrive in Iloro-Ekiti between 8:00 AM and 5:00 PM. SPRF Welcome Marshals are stationed at the main gate until 6:00 PM. If delayed past 6:00 PM, report to the Main Gate Security Post immediately.`,
  },
  {
    number: '05',
    title: 'Hostel Allocation & Room Check-in',
    icon: Home,
    content: `Proceed directly from the reception gate to the Hall Warden’s Office in your assigned hall of residence. Present your accommodation receipt and provisional admission letter. You will receive your room inventory slip, conduct a joint inspection of room fixtures with the hall supervisor, and collect your room key.`,
  },
  {
    number: '06',
    title: 'Day 1 & First 48 Hours On Campus',
    icon: BookOpen,
    content: `Your first 48 hours set the tone for your university life:
1. Locate your assigned room and unpack essential bedding.
2. Familiarize yourself with campus water points, dining halls, and student marts.
3. Visit the SPRF Tech Helpdesk in Computer Lab B to set up your student email and Wi-Fi credentials.
4. Keep original documents securely locked in your wardrobe when attending orientation events.`,
  },
  {
    number: '07',
    title: 'Academic Onboarding & Faculty Induction',
    icon: Laptop,
    content: `During Day 3 of Orientation Week, report to your Faculty Lecture Theatre to meet your Dean, Head of Department, and assigned Course Advisor. Your Course Advisor will guide you through the Course Registration Form (CRF), total required credit units, prerequisites, and semester continuous assessment scoring.`,
  },
  {
    number: '08',
    title: 'Campus Health, Medical Screening & NHIS',
    icon: HeartPulse,
    content: `All students must complete medical profiling at the University Medical Centre during orientation. The screening includes basic vitals, blood grouping, chest X-ray verification, and eye screening. Register your emergency contacts with the medical records desk and obtain your health centre clinic card.`,
  },
  {
    number: '09',
    title: 'Campus Safety & SPRF Peer Support',
    icon: ShieldCheck,
    content: `Venite University enforces strict security protocols to guarantee a peaceful, disciplined academic environment. Cultism, unauthorized secret societies, drug abuse, examination malpractice, and cyber fraud carry zero-tolerance expulsion penalties.
Whenever you need advice, technical guidance, or peer support, contact SPRF. We exist to protect, guide, and mentor student programmers and scholars throughout their university stay.`,
  },
];

export default function FreshersGuidePage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-sprf-surface text-sprf-charcoal">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sprf-surface-soft border border-sprf-border text-xs font-semibold text-sprf-navy">
              <BookOpen className="w-3.5 h-3.5 text-sprf-gold" />
              <span>Comprehensive Fresher Manual</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif text-sprf-navy tracking-tight">
              Freshers’ Guide
            </h1>
            <p className="text-base text-sprf-muted leading-relaxed font-light">
              Essential knowledge, verified document requirements, residential policies, and practical advice to transition smoothly into Venite University life.
            </p>
          </div>

          {/* Quick Actions Card */}
          <div className="p-6 rounded-2xl bg-white border border-sprf-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-sprf-gold block">
                Interactive Companion Tool
              </span>
              <p className="text-sm font-semibold text-sprf-navy">
                Packing for Iloro-Ekiti? Check off your items step by step.
              </p>
            </div>
            <Link
              href="/checklist"
              className="px-5 py-2.5 rounded-xl bg-sprf-navy text-white text-xs font-bold uppercase tracking-wider hover:bg-sprf-blue flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
            >
              <CheckSquare className="w-4 h-4 text-sprf-gold" />
              <span>Open Arrival Checklist</span>
            </Link>
          </div>

          {/* Guide Chapters */}
          <div className="space-y-8">
            {GUIDE_CHAPTERS.map((chapter) => {
              const Icon = chapter.icon;

              return (
                <section
                  key={chapter.number}
                  className="sprf-card rounded-2xl p-6 sm:p-8 bg-white space-y-4"
                >
                  <div className="flex items-start gap-4 pb-4 border-b border-sprf-border">
                    <span className="font-mono text-2xl font-bold text-sprf-gold/80">
                      {chapter.number}
                    </span>
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 text-xs text-sprf-muted font-medium">
                        <Icon className="w-3.5 h-3.5 text-sprf-gold" />
                        <span>SPRF Onboarding Chapter</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-serif text-sprf-navy">
                        {chapter.title}
                      </h2>
                    </div>
                  </div>

                  <div className="text-sm text-sprf-charcoal/80 leading-relaxed font-light whitespace-pre-line space-y-2">
                    {chapter.content}
                  </div>
                </section>
              );
            })}
          </div>

          {/* FAQ Link Footer Callout */}
          <div className="p-8 rounded-2xl bg-sprf-surface border border-sprf-border text-center space-y-3">
            <h3 className="text-xl font-serif text-sprf-navy">Still have specific questions?</h3>
            <p className="text-xs text-sprf-muted max-w-md mx-auto leading-relaxed">
              Browse our frequently asked questions on registration fees, portal activation, student Wi-Fi, and orientation activities.
            </p>
            <div className="pt-2 flex justify-center gap-4">
              <Link
                href="/faq"
                className="px-6 py-2.5 rounded-xl bg-sprf-navy text-white text-xs font-semibold hover:bg-sprf-blue"
              >
                Browse All FAQs
              </Link>
              <Link
                href="/contact"
                className="px-6 py-2.5 rounded-xl border border-sprf-border text-sprf-charcoal text-xs font-semibold hover:bg-white"
              >
                Ask a Peer Advisor
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
