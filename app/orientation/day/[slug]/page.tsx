import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { getOrientationDayBySlug, getOrientationDays } from '@/lib/data-store';
import { createMetadata } from '@/lib/seo';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle,
  ArrowLeft,
  Compass,
  FileCheck,
  AlertCircle,
} from 'lucide-react';

export const revalidate = 300;

interface DayPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: DayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const day = await getOrientationDayBySlug(slug);

  if (!day) {
    return createMetadata({
      title: 'Day Not Found',
      description: 'The requested orientation day agenda could not be located.',
      path: `/orientation/day/${slug}`,
    });
  }

  return createMetadata({
    title: day.title,
    description: day.description,
    path: `/orientation/day/${slug}`,
  });
}

export default async function IndividualDayPage({ params }: DayPageProps) {
  const { slug } = await params;
  const day = await getOrientationDayBySlug(slug);

  if (!day) {
    notFound();
  }

  const formattedDate = new Date(day.eventDate).toLocaleDateString('en-NG', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="w-full min-h-screen flex flex-col bg-sprf-surface text-sprf-charcoal">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Back Navigation */}
          <div>
            <Link
              href="/orientation/schedule"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sprf-navy hover:text-sprf-gold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Schedule</span>
            </Link>
          </div>

          {/* Header Card */}
          <div className="sprf-card rounded-3xl p-8 sm:p-10 bg-white space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-sprf-gold uppercase tracking-wider">
                Orientation Day Agenda
              </span>
              <span className="text-sprf-muted">·</span>
              <span className="font-mono text-sprf-navy font-semibold">{formattedDate}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif text-sprf-navy leading-tight">
              {day.title}
            </h1>

            <p className="text-base text-sprf-muted leading-relaxed font-light">
              {day.description}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-sprf-charcoal border-t border-sprf-border">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sprf-gold" />
                <span>{day.venue || 'Venite Main Campus, Iloro-Ekiti'}</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono">
                <Clock className="w-4 h-4 text-sprf-gold" />
                <span>{day.activities.length} Scheduled Sessions</span>
              </div>
            </div>
          </div>

          {/* Chronological Agenda */}
          <div className="space-y-6">
            <h2 className="text-2xl font-serif text-sprf-navy">Chronological Agenda</h2>

            <div className="space-y-4">
              {day.activities.map((act, index) => (
                <div
                  key={act.id}
                  className="sprf-card rounded-2xl p-6 bg-white space-y-3 relative overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-sprf-border/60">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-6 h-6 rounded-full bg-sprf-navy text-sprf-gold flex items-center justify-center font-bold text-[11px]">
                        {index + 1}
                      </span>
                      <span className="font-mono font-bold text-sprf-navy text-sm">
                        {act.startTime} {act.endTime ? `– ${act.endTime}` : ''}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-sprf-surface text-sprf-charcoal font-medium">
                        {act.category}
                      </span>
                    </div>

                    {act.isCompulsory && (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 self-start sm:self-auto">
                        <CheckCircle className="w-3 h-3 text-amber-600" /> Statutory Requirement
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-serif text-sprf-navy">{act.title}</h3>

                  {act.description && (
                    <p className="text-sm text-sprf-charcoal/80 leading-relaxed font-light">
                      {act.description}
                    </p>
                  )}

                  <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-sprf-muted">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-sprf-gold" />
                      <strong className="text-sprf-charcoal">{act.venue}</strong>
                    </span>

                    {act.speaker && (
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-sprf-muted" />
                        <span>Lead: {act.speaker}</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Required Preparations Card */}
          <div className="sprf-card rounded-2xl p-6 sm:p-8 bg-sprf-surface border border-sprf-border space-y-3">
            <div className="flex items-center gap-2 font-serif text-lg text-sprf-navy">
              <FileCheck className="w-5 h-5 text-sprf-gold" />
              <span>Recommended Preparation</span>
            </div>
            <p className="text-xs text-sprf-muted leading-relaxed">
              Arrive at venues at least 15 minutes prior to scheduled start times. Carry your admission notification slip, student lanyard (once issued), and writing supplies for all official briefings.
            </p>
            <div className="pt-2 flex gap-3">
              <Link
                href="/checklist"
                className="text-xs font-bold text-sprf-navy hover:text-sprf-gold underline underline-offset-4"
              >
                Review Arrival Checklist →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
