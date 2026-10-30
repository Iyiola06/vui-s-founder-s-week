import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { JourneyPlanner } from '@/components/travel/JourneyPlanner';
import { getOrientationDays, getAnnouncements, getLeadershipProfiles } from '@/lib/data-store';
import { siteConfig as seoConfig, createMetadata } from '@/lib/seo';
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
  Users,
  Bell,
  Sparkles,
  HeartHandshake,
  MessageSquare,
  Award,
  GraduationCap,
} from 'lucide-react';

export const revalidate = 300;

export const metadata: Metadata = createMetadata({
  title: 'SPRF | Student Program Representatives Forum, Venite University',
  description:
    'The official platform of the Student Program Representatives Forum, Venite University. Discover our leadership, student representation, welfare initiatives, orientation programmes and student community activities.',
  path: '/',
});

export default async function HomePage() {
  const [days, announcements, leaders] = await Promise.all([
    getOrientationDays(),
    getAnnouncements(),
    getLeadershipProfiles(),
  ]);

  const featuredDays = days.slice(0, 3);
  const featuredAnnouncements = announcements.slice(0, 3);
  const executiveLeaders = leaders.slice(0, 4);

  return (
    <div className="w-full min-h-screen flex flex-col bg-sprf-surface text-sprf-charcoal">
      <Navbar />

      <main className="flex-1">
        {/* 1. Official Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-sprf-border/60">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[900px] h-[500px] radial-glow-gold rounded-full opacity-35 pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Headlines & Actions */}
              <div className="lg:col-span-7 space-y-6 text-left">
                {/* Location Identifier */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sprf-surface-soft border border-sprf-border text-xs font-semibold text-sprf-navy shadow-xs">
                  <MapPin className="w-3.5 h-3.5 text-sprf-gold shrink-0" />
                  <span>Venite University · Iloro-Ekiti, Ekiti State, Nigeria</span>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-sprf-gold">
                      Student Program Representatives Forum (SPRF)
                    </p>
                    <span className="text-xs text-sprf-muted">·</span>
                    <span className="text-[11px] font-semibold text-sprf-navy/80 uppercase tracking-wider">
                      Students • Voice • Progress
                    </span>
                  </div>
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-sprf-navy tracking-tight leading-[1.08] text-balance">
                    YOUR VOICE. <br />
                    YOUR REPRESENTATION. <br />
                    <span className="text-sprf-gold italic">OUR UNIVERSITY.</span>
                  </h1>
                </div>

                <p className="text-base sm:text-lg text-sprf-muted leading-relaxed font-light max-w-xl">
                  The Student Program Representatives Forum is the collective voice of Venite University students. We bring programmes, perspectives and people together to promote student welfare, responsible leadership and a stronger university community.
                </p>

                {/* Primary & Secondary CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <Link
                    href="/about"
                    className="px-7 py-4 rounded-xl bg-sprf-navy hover:bg-sprf-blue text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                  >
                    <span>Discover SPRF</span>
                    <ArrowRight className="w-4 h-4 text-sprf-gold" />
                  </Link>

                  <Link
                    href="/orientation"
                    className="px-7 py-4 rounded-xl bg-white border border-sprf-border text-sprf-charcoal text-xs font-bold uppercase tracking-wider hover:bg-sprf-surface hover:border-sprf-gold flex items-center justify-center gap-2 transition-all"
                  >
                    <Compass className="w-4 h-4 text-sprf-navy" />
                    <span>Explore Orientation</span>
                  </Link>
                </div>

                {/* Date-Aware Resumption & Orientation Notice Bar */}
                <div className="p-4 rounded-2xl bg-white border border-sprf-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 max-w-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sprf-navy/5 text-sprf-navy flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-sprf-gold" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] uppercase tracking-wider font-bold text-sprf-muted block">
                          Campus Resumption &amp; Orientation Schedule
                        </span>
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                          Confirmed
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-sprf-navy flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span><strong>Resumption:</strong> Sat, Nov 14, 2026</span>
                        <span className="hidden sm:inline text-sprf-muted">·</span>
                        <span><strong>Orientation:</strong> Mon, Nov 16 – Sat, Nov 21</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/orientation/schedule"
                    className="text-[11px] font-bold text-sprf-navy hover:text-sprf-gold bg-sprf-surface px-3 py-1.5 rounded-lg border border-sprf-border self-start sm:self-auto transition-colors whitespace-nowrap"
                  >
                    View Schedule →
                  </Link>
                </div>
              </div>

              {/* Right Column: Authentic Venite University Hero Image */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/80 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
                  <Image
                    src={siteConfig.images.hero}
                    alt="Venite University matriculating students celebrating academic milestone in Iloro-Ekiti"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sprf-navy/85 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 text-xs text-sprf-navy flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-8 h-8 rounded-lg bg-white p-0.5 border border-sprf-gold/40 shrink-0">
                        <Image
                          src={siteConfig.images.logo}
                          alt="SPRF Logo"
                          fill
                          sizes="32px"
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <span className="font-bold block">Venite University Students</span>
                        <span className="text-sprf-muted text-[10px]">Universal Representation Across All Faculties</span>
                      </div>
                    </div>
                    <Link href="/about" className="text-[11px] font-bold text-sprf-gold hover:underline shrink-0">
                      Our Story →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. What We Stand For: Three Pillars of General Representation */}
        <section className="py-16 bg-white border-b border-sprf-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-sprf-gold">
                Universal Mandate
              </span>
              <h2 className="text-3xl font-serif text-sprf-navy">
                What We Stand For
              </h2>
              <p className="text-xs sm:text-sm text-sprf-muted font-light">
                SPRF exists for every student at Venite University—fostering academic cooperation, student welfare, and responsible leadership across all colleges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3 p-6 rounded-2xl bg-sprf-surface border border-sprf-border/70 hover:border-sprf-gold/60 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-sprf-navy text-sprf-gold flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif text-sprf-navy">1. Every Programme Represented</h3>
                <p className="text-xs text-sprf-muted leading-relaxed font-light">
                  A structured network of designated student representatives across Health Sciences, Law, Computing, Management, Social Sciences, and Agriculture.
                </p>
                <Link href="/about" className="inline-flex items-center gap-1 text-xs font-bold text-sprf-navy hover:text-sprf-gold pt-1">
                  How Representation Works <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3 p-6 rounded-2xl bg-sprf-surface border border-sprf-border/70 hover:border-sprf-gold/60 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-sprf-navy text-sprf-gold flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif text-sprf-navy">2. Student Welfare &amp; Advocacy</h3>
                <p className="text-xs text-sprf-muted leading-relaxed font-light">
                  Constructive engagement with university authorities to support hostel accommodation, health screening, dining services, and campus safety.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-1 text-xs font-bold text-sprf-navy hover:text-sprf-gold pt-1">
                  Submit a Welfare Inquiry <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3 p-6 rounded-2xl bg-sprf-surface border border-sprf-border/70 hover:border-sprf-gold/60 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-sprf-navy text-sprf-gold flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif text-sprf-navy">3. Orientation &amp; Integration</h3>
                <p className="text-xs text-sprf-muted leading-relaxed font-light">
                  Dedicated arrival marshals, interactive transit guidance, verified timetables, and onboarding checklists to help freshers transition smoothly.
                </p>
                <Link href="/orientation" className="inline-flex items-center gap-1 text-xs font-bold text-sprf-navy hover:text-sprf-gold pt-1">
                  Orientation Resources <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. The Signature Feature: Interactive Journey Planner & Campus Navigation */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-sprf-surface border-b border-sprf-border">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-sprf-gold block mb-2">
                Travel &amp; Campus Arrival
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-sprf-navy tracking-tight">
                Getting to Venite should be the easy part.
              </h2>
              <p className="text-sm text-sprf-muted mt-3 leading-relaxed font-light">
                Whether travelling from Lagos, Ibadan, Akure, Abuja, or across Nigeria, explore our interactive campus map and highway corridors directly on this portal, or launch guaranteed turn-by-turn GPS navigation in Google Maps, Apple Maps, or Waze.
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
                  Orientation Programme Highlights
                </h2>
                <p className="text-xs text-sprf-muted mt-1 font-light">
                  One of SPRF’s core responsibilities is supporting incoming freshers with a well-structured onboarding itinerary.
                </p>
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

        {/* 5. Freshers Arrival Checklist Teaser with Authentic Photo */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-sprf-surface border-b border-sprf-border">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-lg border border-sprf-border aspect-[4/3]">
                <Image
                  src={siteConfig.images.campus}
                  alt="Authentic exterior of Venite University, Iloro-Ekiti"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sprf-navy/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                  <span className="font-bold block">Venite University, Iloro-Ekiti</span>
                  <span className="text-white/80 text-[11px]">KM 2 Ayetoro Road, Ekiti State, Nigeria</span>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-bold uppercase tracking-wider text-sprf-gold block">
                  Arrival Readiness
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif text-sprf-navy leading-tight">
                  Never forget a document.
                </h2>
                <p className="text-sm text-sprf-muted leading-relaxed font-light">
                  Use our interactive arrival checklist to track your JAMB slips, original O&apos;Level certificates, passport photographs, hostel necessities, and study materials. Saved directly on your device.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-xs font-medium text-sprf-charcoal">
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>8 mandatory admission documents with photocopy counts</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-medium text-sprf-charcoal">
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Residence hall items &amp; electrical safety guide</span>
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

        {/* 6. Meet the Leadership Structure */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-sprf-border">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sprf-gold block mb-1">
                  Representative Council
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif text-sprf-navy">
                  SPRF Executive Leadership
                </h2>
                <p className="text-xs text-sprf-muted mt-1 font-light">
                  Elected and appointed student representatives serving the general student community across Venite University.
                </p>
              </div>
              <Link
                href="/leadership"
                className="text-xs uppercase font-bold tracking-wider text-sprf-navy hover:text-sprf-gold flex items-center gap-1"
              >
                <span>View Full Executive Council</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {executiveLeaders.map((leader) => (
                <div
                  key={leader.id}
                  className="sprf-card rounded-2xl p-6 bg-white border border-sprf-border space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-sprf-gold/15 text-sprf-navy border border-sprf-gold/30 inline-block">
                      {leader.role}
                    </span>
                    <h3 className="text-lg font-serif text-sprf-navy">{leader.name}</h3>
                    <p className="text-xs text-sprf-muted leading-relaxed font-light line-clamp-3">
                      {leader.biography}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-sprf-border/60 text-xs text-sprf-navy font-semibold flex items-center justify-between">
                    <span>Venite University</span>
                    <Link href="/leadership" className="text-sprf-gold hover:underline">
                      Profile →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Official Announcements Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-sprf-surface border-b border-sprf-border">
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

        {/* 8. Student Support / Contact Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="p-8 sm:p-12 rounded-3xl bg-sprf-navy text-white text-center space-y-6 relative overflow-hidden">
              <div className="max-w-2xl mx-auto space-y-3 relative z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-sprf-gold block">
                  SPRF Student Desk
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif text-white">
                  We are here to represent and support you.
                </h2>
                <p className="text-sm text-white/70 leading-relaxed font-light">
                  Have questions regarding your travel route, clearance documents, or student welfare on campus? Your programme representatives and executive officers are here to assist.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2 relative z-10">
                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-xl bg-sprf-gold hover:bg-sprf-gold-light text-sprf-navy text-xs font-bold uppercase tracking-wider shadow-md transition-colors"
                >
                  Contact SPRF Desk
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
