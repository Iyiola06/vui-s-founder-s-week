import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { getAnnouncementBySlug } from '@/lib/data-store';
import { createMetadata } from '@/lib/seo';
import {
  ArrowLeft,
  Calendar,
  AlertTriangle,
  Tag,
  Share2,
  Building,
} from 'lucide-react';

export const revalidate = 120;

interface AnnouncementDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AnnouncementDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const ann = await getAnnouncementBySlug(slug);

  if (!ann) {
    return createMetadata({
      title: 'Announcement Not Found',
      description: 'The requested official announcement could not be located.',
      path: `/announcements/${slug}`,
    });
  }

  return createMetadata({
    title: ann.title,
    description: ann.summary,
    path: `/announcements/${slug}`,
  });
}

export default async function IndividualAnnouncementPage({ params }: AnnouncementDetailProps) {
  const { slug } = await params;
  const ann = await getAnnouncementBySlug(slug);

  if (!ann) {
    notFound();
  }

  const formattedDate = new Date(ann.publishedAt).toLocaleDateString('en-NG', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const isUrgent = ann.priority === 'urgent';

  return (
    <div className="w-full min-h-screen flex flex-col bg-sprf-surface text-sprf-charcoal">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Back Link */}
          <div>
            <Link
              href="/announcements"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sprf-navy hover:text-sprf-gold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Announcements</span>
            </Link>
          </div>

          {/* Article Header Card */}
          <article className="sprf-card rounded-3xl p-8 sm:p-10 bg-white space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-sprf-border/60">
              <div className="flex items-center gap-2">
                {isUrgent && (
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-amber-100 text-amber-900 border border-amber-300">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-700" /> Urgent Notice
                  </span>
                )}
                <span className="text-xs font-semibold text-sprf-gold uppercase tracking-wider">
                  {ann.category}
                </span>
              </div>

              <div className="text-xs text-sprf-muted font-mono flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-sprf-muted" />
                <span>{formattedDate}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif text-sprf-navy leading-tight">
              {ann.title}
            </h1>

            <p className="text-base text-sprf-charcoal/80 font-medium leading-relaxed bg-sprf-surface p-4 rounded-xl border border-sprf-border/60">
              {ann.summary}
            </p>

            <div className="pt-2 text-sm sm:text-base text-sprf-charcoal/90 leading-relaxed font-light whitespace-pre-line space-y-4">
              {ann.content}
            </div>

            {/* Issuer Signature */}
            <div className="pt-6 border-t border-sprf-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-sprf-muted">
              <div>
                <span className="font-bold text-sprf-navy block">Issued by: SPRF Secretariat</span>
                <span>Student Programmer Representative Forum, Venite University</span>
              </div>

              <div className="inline-flex items-center gap-1 text-emerald-800 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <span>Verified Official Notice</span>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
