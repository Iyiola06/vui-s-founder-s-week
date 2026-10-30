import type { Metadata } from 'next';
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
              Explore the detailed chronological agenda for all six orientation days. Filter by day or activity category (Academic, Induction, Tech, Tour, Welfare, Social).
            </p>
          </div>

          {/* Interactive Schedule Component */}
          <ScheduleClient days={days} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
