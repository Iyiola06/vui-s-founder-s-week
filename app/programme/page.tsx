import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { logDatabaseIssue } from '@/lib/db';
import { FloatingNav } from '@/components/ui/FloatingNav';
import { Footer } from '@/components/ui/Footer';
import { Calendar } from 'lucide-react';
import ProgrammeClient from './ProgrammeClient';

export const dynamic = 'force-dynamic';

export default async function ProgrammePage() {
  let eventDays: any[] = [];
  let isDbConnected = true;

  try {
    eventDays = await prisma.eventDay.findMany({
      orderBy: { date: 'asc' },
    });
  } catch (error) {
    logDatabaseIssue('programme page data', error);
    isDbConnected = false;
  }

  return (
    <div className="w-full min-h-screen bg-cream text-text-dark font-sans overflow-x-hidden selection:bg-champagne-gold selection:text-text-dark">
      <FloatingNav />
      
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
          Seven days of curated events designed to inspire, engage, and celebrate the Venite University community.
        </p>
      </section>

      {/* Timeline Section */}
      <section className="px-6 pb-32 max-w-7xl mx-auto relative z-20">
        <ProgrammeClient initialEvents={eventDays} />
      </section>

      <Footer />
    </div>
  );
}
