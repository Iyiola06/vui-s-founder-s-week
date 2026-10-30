import type { Metadata } from 'next';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { AnnouncementsClient } from '@/components/announcements/AnnouncementsClient';
import { getAnnouncements } from '@/lib/data-store';
import { createMetadata } from '@/lib/seo';
import { Bell } from 'lucide-react';

export const revalidate = 120;

export const metadata: Metadata = createMetadata({
  title: 'Official Announcements & Orientation Notices',
  description:
    'Read verified official notices, arrival marshal advisories, hostel clearance schedules, and technical track updates from the SPRF Secretariat.',
  path: '/announcements',
});

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <div className="w-full min-h-screen flex flex-col bg-sprf-surface text-sprf-charcoal">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sprf-surface-soft border border-sprf-border text-xs font-semibold text-sprf-navy">
              <Bell className="w-3.5 h-3.5 text-sprf-gold" />
              <span>Official Communications</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif text-sprf-navy tracking-tight">
              Announcements
            </h1>
            <p className="text-base text-sprf-muted leading-relaxed font-light">
              Official circulars, orientation schedule updates, arrival guidance, and credential verification notices published by the SPRF Secretariat.
            </p>
          </div>

          {/* Interactive Announcements Component */}
          <AnnouncementsClient announcements={announcements} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
