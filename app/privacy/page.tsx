import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { createMetadata } from '@/lib/seo';
import { ShieldCheck } from 'lucide-react';

export const revalidate = 86400;

export const metadata: Metadata = createMetadata({
  title: 'Privacy Policy',
  description:
    'Privacy Policy of the Student Programmer Representative Forum (SPRF) Orientation & Arrival Portal for Venite University.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-sprf-surface text-sprf-charcoal">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sprf-surface-soft border border-sprf-border text-xs font-semibold text-sprf-navy">
              <ShieldCheck className="w-3.5 h-3.5 text-sprf-gold" />
              <span>Data Protection & Privacy</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif text-sprf-navy">
              Privacy Policy
            </h1>
            <p className="text-xs text-sprf-muted font-mono">
              Last updated: October 2026 · Student Programmer Representative Forum (SPRF)
            </p>
          </div>

          <div className="sprf-card rounded-2xl p-8 sm:p-10 bg-white text-sm text-sprf-charcoal/85 leading-relaxed font-light space-y-6">
            <section className="space-y-2">
              <h2 className="text-lg font-serif text-sprf-navy font-bold">1. Introduction</h2>
              <p>
                The Student Programmer Representative Forum (&quot;SPRF&quot;, &quot;we&quot;, &quot;our&quot;) is committed to protecting the privacy of students, guardians, and visitors using the Venite University Orientation &amp; Student Arrival Portal. This policy explains our minimal data collection practices.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-serif text-sprf-navy font-bold">2. Geolocation &amp; Travel Planner Privacy</h2>
              <p>
                When you use the &quot;Use My Current Location&quot; feature in our interactive Journey Planner, your browser requests access to device coordinates. This data is processed <strong>strictly in your browser</strong> to construct the destination link for Google Maps. <strong>We do not collect, transmit, log, or store your GPS coordinates or live location on our servers.</strong>
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-serif text-sprf-navy font-bold">3. Local Storage for Arrival Checklists</h2>
              <p>
                Your progress on the Arrival Checklist is saved locally on your device using browser <code className="bg-sprf-surface px-1.5 py-0.5 rounded text-xs font-mono">localStorage</code>. This data remains on your personal phone or computer, does not require an account, and can be cleared at any time by clicking the &quot;Reset&quot; button.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-serif text-sprf-navy font-bold">4. Contact Inquiries &amp; Helpdesk Submissions</h2>
              <p>
                If you choose to submit an inquiry through our Contact form, we collect only your provided name, email address, inquiry category, and message text. This information is used exclusively by authorized SPRF officers to answer your question and coordinate arrival support. We do not sell, rent, or share this data with third parties.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-serif text-sprf-navy font-bold">5. Contact Information</h2>
              <p>
                For privacy inquiries regarding this portal, please contact the SPRF Technology Directorate at{' '}
                <a href="mailto:privacy@sprf-venite.org" className="text-sprf-navy font-semibold underline">
                  privacy@sprf-venite.org
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
