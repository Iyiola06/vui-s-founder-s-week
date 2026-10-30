import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { JourneyPlanner } from '@/components/travel/JourneyPlanner';
import { getOrientationDays, getAnnouncements } from '@/lib/data-store';
import { siteConfig as seoConfig, createMetadata, absoluteUrl } from '@/lib/seo';
import { siteConfig } from '@/lib/config';
import {
  Compass,
  Calendar,
  CheckSquare,
  ArrowRight,
  MapPin,
  Clock,
  ShieldCheck,
  BookOpen,
  Code2,
  Users,
  Bell,
  Sparkles,
  FileText,
  AlertTriangle,
} from 'lucide-react';

export const revalidate = 300;

export const metadata: Metadata = createMetadata({
  title: 'SPRF | Student Programmer Representative Forum, Venite University',
  description:
    'Your official guide to SPRF orientation, student arrival, campus directions, announcements, and essential information for Venite University, Iloro-Ekiti.',
  path: '/',
});

export default async function HomePage() {
  const [days, announcements] = await Promise.all([
    getOrientationDays(),
    getAnnouncements(),
  ]);

  const featuredDays = days.slice(0, 3);
  const featuredAnnouncements = announcements.slice(0, 3);

  return (
    <div className="w-full min-h-screen flex flex-col bg-sprf-surface text-sprf-charcoal">
      <Navbar />

      <main className="flex-1">
        {/* 1. Cinematic Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-sprf-border/60">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[900px] h-[500px] radial-glow-gold rounded-full opacity-40 pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Headlines & CTAs */}
              <div className="lg:col-span-7 space-y-6 text-left">
                {/* Location Identifier */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sprf-surface-soft border border-sprf-border text-xs font-semibold text-sprf-navy shadow-xs">
                  <MapPin className="w-3.5 h-3.5 text-sprf-gold shrink-0" />
                  <span>Venite University · Iloro-Ekiti, Ekiti State, Nigeria</span>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-sprf-gold">
                    Student Programmer Representative Forum (SPRF)
                  </p>
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-sprf-navy tracking-tight leading-[1.08] text-balance">
                    Your Journey. <br />
                    Your Community. <br />
                    <span className="text-sprf-gold italic">Your Future.</span>
                  </h1>
                </div>

                <p className="text-base sm:text-lg text-sprf-muted leading-relaxed font-light max-w-xl">
                  Welcome to Venite University. Your official digital guide to orientation week, campus arrival logistics, peer tech mentorship, and starting your university journey with confidence.
                </p>

                {/* Date-Aware Orientation Bar */}
                <div className="p-4 rounded-2xl bg-white border border-sprf-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 max-w-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sprf-navy/5 text-sprf-navy flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-sprf-gold" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-bold text-sprf-muted block">
                        Official Orientation Window
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-sprf-navy">
                        {siteConfig.orientationDatesText}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
                    Verified Schedule
                  </span>
                </div>

                {/* Primary & Secondary CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <Link
                    href="/orientation"
                    className="px-7 py-4 rounded-xl bg-sprf-navy hover:bg-sprf-blue text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                  >
                    <span>Explore Orientation</span>
                    <ArrowRight className="w-4 h-4 text-sprf-gold" />
                  </Link>

                  <Link
                    href="/travel"
                    className="px-7 py-4 rounded-xl bg-white border border-sprf-border text-sprf-charcoal text-xs font-bold uppercase tracking-wider hover:bg-sprf-surface hover:border-sprf-gold flex items-center justify-center gap-2 transition-all"
                  >
                    <Compass className="w-4 h-4 text-sprf-navy" />
                    <span>Plan Your Journey</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Visual Asset */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/80 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
                  <Image
                    src={siteConfig.images.hero}
                    alt="Venite University students in collaborative study commons"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sprf-navy/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 text-xs text-sprf-navy flex items-center justify-between">
                    <div>
                      <span className="font-bold block">SPRF Student Leadership</span>
                      <span className="text-sprf-muted text-[11px]">Mentoring 100L Freshers</span>
                    </div>
                    <Link href="/about" className="text-[11px] font-bold text-sprf-gold hover:underline">
                      Learn More →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Key Pillars / Five Questions Section */}
        <section className="py-16 bg-white border-b border-sprf-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3 p-6 rounded-2xl bg-sprf-surface border border-sprf-border/60">
                <div className="w-10 h-10 rounded-xl bg-sprf-navy text-sprf-gold flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif text-sprf-navy">Arrive With Confidence</h3>
                <p className="text-xs text-sprf-muted leading-relaxed font-light">
                  Direct Google Maps navigation from Lagos, Ibadan, Abuja, or any Nigerian hub straight to the university gates, plus verified transit advice.
                </p>
                <Link href="/travel" className="inline-flex items-center gap-1 text-xs font-bold text-sprf-navy hover:text-sprf-gold pt-1">
                  View Travel Planner <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3 p-6 rounded-2xl bg-sprf-surface border border-sprf-border/60">
                <div className="w-10 h-10 rounded-xl bg-sprf-navy text-sprf-gold flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif text-sprf-navy">Structured Timetable</h3>
                <p className="text-xs text-sprf-muted leading-relaxed font-light">
                  A day-by-day itinerary of official matriculation briefings, faculty tours, medical screenings, and student society mixers.
                </p>
                <Link href="/orientation/schedule" className="inline-flex items-center gap-1 text-xs font-bold text-sprf-navy hover:text-sprf-gold pt-1">
                  Explore Full Schedule <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3 p-6 rounded-2xl bg-sprf-surface border border-sprf-border/60">
                <div className="w-10 h-10 rounded-xl bg-sprf-navy text-sprf-gold flex items-center justify-center">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif text-sprf-navy">SPRF Peer Mentorship</h3>
                <p className="text-xs text-sprf-muted leading-relaxed font-light">
                  Join student programmer cohorts, access developer packs, Wi-Fi onboarding, and accelerate your tech trajectory from Day 1.
                </p>
                <Link href="/about" className="inline-flex items-center gap-1 text-xs font-bold text-sprf-navy hover:text-sprf-gold pt-1">
                  Discover SPRF Tracks <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. The Signature Feature: Interactive Journey Planner Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-sprf-surface border-b border-sprf-border">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-sprf-gold block mb-2">
                Travel & Campus Arrival
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-sprf-navy tracking-tight">
                Getting to Venite should be the easy part.
              </h2>
              <p className="text-sm text-sprf-muted mt-3 leading-relaxed font-light">
                Whether travelling from Lagos, Ibadan, Akure, Abuja, or across Nigeria, explore our interactive campus map and interstate routes directly on-page, or launch guaranteed turn-by-turn GPS navigation in Google Maps, Apple Maps, or Waze.
              </p>
            </div>

            <JourneyPlanner />

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-sprf-muted">
              <span>Looking for verified regional bus parks and fares?</span>
              <Link href="/travel/transport" className="font-semibold text-sprf-navy hover:text-sprf-gold flex items-center gap-1">
                Read the Regional Transport Guide <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* 4. Orientation Highlights Preview */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-sprf-border">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sprf-gold block mb-1">
                  6 Days of Induction
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif text-sprf-navy">
                  Programme Highlights
                </h2>
              </div>
              <Link
                href="/orientation/schedule"
                className="text-xs uppercase font-bold tracking-wider text-sprf-navy hover:text-sprf-gold flex items-center gap-1"
              >
                <span>View Full Timetable</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredDays.map((day, index) => (
                <div
                  key={day.id}
                  className="sprf-card sprf-card-hover rounded-2xl p-6 bg-white flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-sprf-gold uppercase tracking-wider">
                        Day 0{index + 1}
                      </span>
                      <span className="font-mono text-sprf-muted">
                        {new Date(day.eventDate).toLocaleDateString('en-NG', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>

                    <h3 className="text-xl font-serif text-sprf-navy">{day.title}</h3>

                    <p className="text-xs text-sprf-muted leading-relaxed font-light line-clamp-3">
                      {day.description}
                    </p>

                    <div className="pt-2 border-t border-sprf-border/60 space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-sprf-charcoal/70 block">
                        Featured Sessions:
                      </span>
                      {(day.activities || []).slice(0, 2).map((act) => (
                        <div key={act.id} className="text-xs text-sprf-charcoal flex items-start gap-2">
                          <Clock className="w-3.5 h-3.5 text-sprf-gold shrink-0 mt-0.5" />
                          <span className="font-medium truncate">{act.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/orientation/day/${day.slug}`}
                    className="mt-6 pt-3 border-t border-sprf-border text-xs font-bold text-sprf-navy hover:text-sprf-gold flex items-center justify-between"
                  >
                    <span>View Day Agenda</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Freshers Arrival Checklist Teaser */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-sprf-surface border-b border-sprf-border">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-lg border border-sprf-border aspect-[4/3]">
                <Image
                  src={siteConfig.images.prep}
                  alt="Student packing essentials and documents"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-bold uppercase tracking-wider text-sprf-gold block">
                  Arrival Readiness
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif text-sprf-navy leading-tight">
                  Never forget a document.
                </h2>
                <p className="text-sm text-sprf-muted leading-relaxed font-light">
                  Use our interactive arrival checklist to track your JAMB slips, original O&apos;Level certificates, passport photographs, hostel necessities, and tech tools. Saved directly on your device.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-xs font-medium text-sprf-charcoal">
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>8 mandatory admission documents with photocopy counts</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-medium text-sprf-charcoal">
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Residence hall items & electrical wattage safety guide</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-medium text-sprf-charcoal">
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Printable format with real-time percentage progress bar</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  <Link
                    href="/checklist"
                    className="px-6 py-3.5 rounded-xl bg-sprf-navy hover:bg-sprf-blue text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm"
                  >
                    <CheckSquare className="w-4 h-4 text-sprf-gold" />
                    <span>Open Interactive Checklist</span>
                  </Link>

                  <Link
                    href="/freshers-guide"
                    className="px-6 py-3.5 rounded-xl bg-white border border-sprf-border text-sprf-charcoal text-xs font-bold uppercase tracking-wider hover:bg-sprf-surface"
                  >
                    <span>Read Freshers’ Guide</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Official Announcements Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-sprf-border">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sprf-gold block mb-1">
                  Official Communication
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif text-sprf-navy">
                  Latest Announcements
                </h2>
              </div>
              <Link
                href="/announcements"
                className="text-xs uppercase font-bold tracking-wider text-sprf-navy hover:text-sprf-gold flex items-center gap-1"
              >
                <span>View All Notices</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredAnnouncements.map((ann) => (
                <article
                  key={ann.id}
                  className="sprf-card sprf-card-hover rounded-2xl p-6 bg-white flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-sprf-gold uppercase tracking-wider">
                        {ann.category}
                      </span>
                      {ann.priority === 'urgent' && (
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                          Urgent
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-serif text-sprf-navy leading-snug">
                      {ann.title}
                    </h3>

                    <p className="text-xs text-sprf-muted leading-relaxed font-light line-clamp-3">
                      {ann.summary}
                    </p>
                  </div>

                  <Link
                    href={`/announcements/${ann.slug}`}
                    className="mt-6 pt-3 border-t border-sprf-border text-xs font-bold text-sprf-navy hover:text-sprf-gold flex items-center justify-between"
                  >
                    <span>Read notice</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Student Support / Contact Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-sprf-surface">
          <div className="max-w-7xl mx-auto">
            <div className="p-8 sm:p-12 rounded-3xl bg-sprf-navy text-white text-center space-y-6 relative overflow-hidden">
              <div className="max-w-2xl mx-auto space-y-3 relative z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-sprf-gold block">
                  SPRF Student Desk
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif text-white">
                  We are here to support your arrival.
                </h2>
                <p className="text-sm text-white/70 leading-relaxed font-light">
                  Have questions regarding your travel route, clearance documents, or arrival schedule? The SPRF executive team and arrival marshals are standing by to guide you.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2 relative z-10">
                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-xl bg-sprf-gold hover:bg-sprf-gold-light text-sprf-navy text-xs font-bold uppercase tracking-wider shadow-md transition-colors"
                >
                  Contact SPRF Helpdesk
                </Link>
                <Link
                  href="/faq"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-colors"
                >
                  Browse FAQs
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
