import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { logDatabaseIssue } from '@/lib/db';
import { JsonLd } from '@/components/seo/JsonLd';
import { FloatingNav } from '@/components/ui/FloatingNav';
import { Footer } from '@/components/ui/Footer';
import { Calendar } from 'lucide-react';
import ProgrammeClient from './ProgrammeClient';
import { createBreadcrumbJsonLd, createMetadata, siteConfig } from '@/lib/seo';

const fallbackEvents = [
  { id: '1', title: 'Debate and Talk Show', description: 'Students engage in intellectual discourse on national development.', date: new Date('2026-05-11') },
  { id: '2', title: 'College Lectures', description: 'Academic showcase from Agriculture, Computing and Engineering.', date: new Date('2026-05-12') },
  { id: '3', title: 'Talent Show', description: 'A night of music, art, and creative performances.', date: new Date('2026-05-13') },
  { id: '4', title: 'Cultural Day', description: 'Celebrating our extraordinary Nigerian heritage.', date: new Date('2026-05-14') },
  { id: '5', title: "Founder's Day Ceremony", description: "The official Founder's Day event.", date: new Date('2026-05-15') },
  { id: '6', title: 'Sports & Dinner Awards', description: 'Morning athletics followed by the grand elegance dinner.', date: new Date('2026-05-16'), isSaturday: true },
  { id: '7', title: 'Thanksgiving', description: 'A Sunday service of gratitude to conclude the week.', date: new Date('2026-05-17') },
];

export const revalidate = 900;

export const metadata: Metadata = createMetadata({
  title: 'Programme and Event Schedule',
  description:
    "See the full Venite University Founder's Week 2026 programme, including daily events, academic showcases, culture, talent, sports, and thanksgiving.",
  path: '/programme',
  keywords: [
    "Venite University programme",
    "Founder's Week schedule",
    'Venite University event timetable',
  ],
});

export default async function ProgrammePage() {
  let eventDays: any[] = [];

  try {
    eventDays = await prisma.eventDay.findMany({
      orderBy: { date: 'asc' },
    });
  } catch (error) {
    logDatabaseIssue('programme page data', error);
  }

  const scheduleEvents = eventDays.length > 0 ? eventDays : fallbackEvents;
  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Programme', path: '/programme' },
  ]);
  const programmeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: "Venite University Founder's Week 2026 Programme",
    description:
      "Official day-by-day programme for Venite University Founder's Week 2026.",
    url: `${siteConfig.baseUrl}/programme`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: scheduleEvents.map((event, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Event',
          name: event.title,
          description: event.description ?? undefined,
          startDate: new Date(event.date).toISOString(),
          location: {
            '@type': 'Place',
            name: siteConfig.venue.name,
          },
        },
      })),
    },
  };

  return (
    <div className="w-full min-h-screen bg-cream text-text-dark font-sans overflow-x-hidden selection:bg-champagne-gold selection:text-text-dark">
      <FloatingNav />
      <main>
        <JsonLd data={[breadcrumbJsonLd, programmeJsonLd]} />

        {/* Hero */}
        <section className="relative pt-40 pb-20 px-6 max-w-4xl mx-auto text-center flex flex-col items-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[600px] h-[60vw] max-h-[600px] radial-glow rounded-full opacity-40 pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-warm-border bg-white/30 backdrop-blur-md mb-8 z-10">
          <Calendar className="w-4 h-4 text-deep-green" />
          <span className="text-[10px] uppercase font-bold tracking-widest text-text-dark/80">Event Schedule</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif text-text-dark tracking-tighter mb-6 z-10">
          The Official <span className="italic text-deep-green">Programme</span>
        </h1>
        <p className="text-lg text-muted-text font-light leading-relaxed max-w-2xl z-10">
          Explore the complete Venite University Founder&apos;s Week 2026 schedule across seven days of curated events designed to inspire, engage, and celebrate the community.
        </p>
        </section>

        {/* Timeline Section */}
        <section className="px-6 pb-32 max-w-7xl mx-auto relative z-20">
          <ProgrammeClient initialEvents={eventDays} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
