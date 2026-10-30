import type { Metadata } from 'next';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { ChecklistClient } from '@/components/checklist/ChecklistClient';
import { createMetadata } from '@/lib/seo';
import { CheckSquare } from 'lucide-react';

export const revalidate = 300;

export const metadata: Metadata = createMetadata({
  title: 'Interactive Arrival Checklist',
  description:
    'Track and check off your required Venite University admission documents, hostel necessities, tech equipment, and travel essentials before departing for Iloro-Ekiti.',
  path: '/checklist',
});

export default function ChecklistPage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-sprf-surface text-sprf-charcoal">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sprf-surface-soft border border-sprf-border text-xs font-semibold text-sprf-navy">
              <CheckSquare className="w-3.5 h-3.5 text-sprf-gold" />
              <span>Interactive Arrival Tool</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif text-sprf-navy tracking-tight">
              Arrival Checklist
            </h1>
            <p className="text-base text-sprf-muted leading-relaxed font-light">
              Check off your documents and essentials as you pack. Progress is saved locally in your browser, and you can print the full checklist anytime.
            </p>
          </div>

          {/* Interactive Checklist Component */}
          <ChecklistClient />
        </div>
      </main>

      <Footer />
    </div>
  );
}
