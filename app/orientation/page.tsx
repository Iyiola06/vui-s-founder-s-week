import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { getOrientationDays } from '@/lib/data-store';
import { siteConfig } from '@/lib/config';
import { createMetadata } from '@/lib/seo';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  ArrowRight,
  Award,
  BookOpen,
  Code2,
  Users,
  Building,
} from 'lucide-react';

export const revalidate = 300;

export const metadata: Metadata = createMetadata({
  title: 'Orientation Week Overview',
  description:
    'Complete guide to the 2026/2027 SPRF Orientation Week at Venite University, including daily agendas, matriculation briefings, and campus tours.',
  path: '/orientation',
});

export default async function OrientationPage() {
  const days = await getOrientationDays();

  return (
    <div className="w-full min-h-screen flex flex-col bg-sprf-surface text-sprf-charcoal">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header Banner */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sprf-surface-soft border border-sprf-border text-xs font-semibold text-sprf-navy">
              <Calendar className="w-3.5 h-3.5 text-sprf-gold" />
              <span>Official 6-Day Programme</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif text-sprf-navy tracking-tight">
              Orientation <span className="text-sprf-gold italic">Week 2026</span>
            </h1>
            <p className="text-base text-sprf-muted leading-relaxed font-light">
              Welcome to the beginning of your academic and professional journey at Venite University. SPRF has curated six comprehensive days to help you settle into campus, complete verification, and connect with your peers.
            </p>
          </div>

          {/* Key Facts Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="sprf-card rounded-2xl p-6 bg-white space-y-2">
              <span className="text-[11px] uppercase tracking-wider font-bold text-sprf-muted block">
                Orientation Window
              </span>
              <p className="text-lg font-serif text-sprf-navy">Nov 16 – Nov 21, 2026</p>
              <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Confirmed Calendar
              </p>
            </div>

            <div className="sprf-card rounded-2xl p-6 bg-white space-y-2">
              <span className="text-[11px] uppercase tracking-wider font-bold text-sprf-muted block">
                Total Days
              </span>
              <p className="text-lg font-serif text-sprf-navy">{days.length} Curated Days</p>
              <p className="text-xs text-sprf-muted">Academic & Social Events</p>
            </div>

            <div className="sprf-card rounded-2xl p-6 bg-white space-y-2">
              <span className="text-[11px] uppercase tracking-wider font-bold text-sprf-muted block">
                Principal Venue
              </span>
              <p className="text-lg font-serif text-sprf-navy">Central Auditorium</p>
              <p className="text-xs text-sprf-muted">Venite Main Campus</p>
            </div>

            <div className="sprf-card rounded-2xl p-6 bg-white space-y-2">
              <span className="text-[11px] uppercase tracking-wider font-bold text-sprf-muted block">
                Coordination Body
              </span>
              <p className="text-lg font-serif text-sprf-navy">SPRF & Student Affairs</p>
              <p className="text-xs text-sprf-muted">Peer Support Marshals</p>
            </div>
          </div>

          {/* Day-by-Day Agenda Cards */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif text-sprf-navy">Daily Itinerary</h2>
                <p className="text-xs text-sprf-muted mt-1">
                  Click on any day to explore detailed hourly activities and requirements.
                </p>
              </div>
              <Link
                href="/orientation/schedule"
                className="px-5 py-2.5 rounded-xl bg-sprf-navy text-white text-xs font-bold uppercase tracking-wider hover:bg-sprf-blue transition-colors flex items-center gap-2 self-start sm:self-auto"
              >
                <span>Full Schedule View</span>
                <ArrowRight className="w-3.5 h-3.5 text-sprf-gold" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {days.map((day, idx) => (
                <div
                  key={day.id}
                  className="sprf-card sprf-card-hover rounded-2xl p-6 sm:p-7 bg-white flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs pb-3 border-b border-sprf-border/60">
                      <span className="font-bold text-sprf-gold uppercase tracking-wider">
                        Day 0{idx + 1}
                      </span>
                      <span className="font-mono text-sprf-muted">
                        {new Date(day.eventDate).toLocaleDateString('en-NG', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>

                    <h3 className="text-xl font-serif text-sprf-navy leading-snug">
                      {day.title}
                    </h3>

                    <p className="text-xs text-sprf-muted leading-relaxed font-light">
                      {day.description}
                    </p>

                    <div className="space-y-2 pt-2">
                      <div className="flex items-center gap-2 text-xs text-sprf-charcoal">
                        <MapPin className="w-3.5 h-3.5 text-sprf-gold shrink-0" />
                        <span className="truncate">{day.venue || 'Venite Main Campus'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-sprf-muted font-mono">
                        <Clock className="w-3.5 h-3.5 text-sprf-gold shrink-0" />
                        <span>{(day.activities || []).length} Scheduled Sessions</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/orientation/day/${day.slug}`}
                    className="mt-6 pt-3 border-t border-sprf-border text-xs font-bold text-sprf-navy hover:text-sprf-gold flex items-center justify-between"
                  >
                    <span>View Day Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
