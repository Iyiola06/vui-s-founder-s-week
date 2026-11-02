import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { ScheduleClient } from '@/components/schedule/ScheduleClient';
import { getOrientationDays } from '@/lib/data-store';
import { createMetadata } from '@/lib/seo';
import { Calendar, Clock, MapPin, Compass } from 'lucide-react';

export const revalidate = 300;

export const metadata: Metadata = createMetadata({
  title: 'Orientation Schedule & Timetable',
  description:
    'Complete day-by-day timetable for Venite University orientation week, featuring session times, lecture theatre venues, speakers, and compulsory induction briefings.',
  path: '/orientation/schedule',
});

export default async function OrientationSchedulePage() {
  const days = await getOrientationDays();

  return (
    <div className="w-full min-h-screen flex flex-col bg-sprf-surface text-sprf-charcoal">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sprf-surface-soft border border-sprf-border text-xs font-semibold text-sprf-navy">
              <Calendar className="w-3.5 h-3.5 text-sprf-gold" />
              <span>Full Orientation Timetable</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif text-sprf-navy tracking-tight">
              Official Schedule
            </h1>
            <p className="text-base text-sprf-muted leading-relaxed font-light">
              Explore the detailed chronological agenda for the six-day university orientation programme. Filter by day or activity category (Academic, Induction, Community, Tour, Welfare, Social).
            </p>
          </div>

          {/* Resumption & Orientation Dates Notice */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-800 shrink-0 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider font-bold text-amber-900 block">
                  Key Arrival Timeline
                </span>
                <p className="text-sm text-sprf-charcoal leading-relaxed">
                  <strong>Resumption &amp; Hostel Check-in:</strong> Saturday, November 14, 2026.
                  <span className="mx-2 hidden sm:inline">|</span>
                  <br className="sm:hidden" />
                  <strong>Orientation Week:</strong> Monday, November 16 – Saturday, November 21, 2026.
                </p>
              </div>
            </div>
            <Link
              href="/travel"
              className="px-4 py-2 rounded-xl bg-sprf-navy hover:bg-sprf-blue text-white text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>Plan Travel</span>
              <Compass className="w-3.5 h-3.5 text-sprf-gold" />
            </Link>
          </div>

          {/* Interactive Schedule Component */}
          <ScheduleClient days={days} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
