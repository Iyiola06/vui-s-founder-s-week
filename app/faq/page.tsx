import type { Metadata } from 'next';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { FaqClient } from '@/components/faq/FaqClient';
import { getFaqs } from '@/lib/data-store';
import { createMetadata } from '@/lib/seo';
import { HelpCircle } from 'lucide-react';

export const revalidate = 300;

export const metadata: Metadata = createMetadata({
  title: 'Frequently Asked Questions (FAQ)',
  description:
    'Answers to common questions regarding Venite University arrival routes, admission document verification, hostel room allocation, orientation activities, and SPRF tech cohorts.',
  path: '/faq',
});

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <div className="w-full min-h-screen flex flex-col bg-sprf-surface text-sprf-charcoal">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sprf-surface-soft border border-sprf-border text-xs font-semibold text-sprf-navy">
              <HelpCircle className="w-3.5 h-3.5 text-sprf-gold" />
              <span>Student Knowledge Base</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif text-sprf-navy tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-base text-sprf-muted leading-relaxed font-light">
              Clear, verified answers to the most common questions raised by freshers and parents regarding travel, clearance documents, residence halls, and orientation week.
            </p>
          </div>

          {/* Interactive FAQ Component */}
          <FaqClient faqs={faqs} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
