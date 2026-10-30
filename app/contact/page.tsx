import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { ContactForm } from '@/components/contact/ContactForm';
import { siteConfig } from '@/lib/config';
import { createMetadata } from '@/lib/seo';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  HelpCircle,
  MessageSquare,
  Building,
} from 'lucide-react';

export const revalidate = 300;

export const metadata: Metadata = createMetadata({
  title: 'Contact SPRF & Student Support Desk',
  description:
    'Reach the Student Programmer Representative Forum at Venite University for arrival coordination, document verification guidance, and student support.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-sprf-surface text-sprf-charcoal">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sprf-surface-soft border border-sprf-border text-xs font-semibold text-sprf-navy">
              <MessageSquare className="w-3.5 h-3.5 text-sprf-gold" />
              <span>SPRF Helpdesk & Inquiries</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif text-sprf-navy tracking-tight">
              Contact & Student Support
            </h1>
            <p className="text-base text-sprf-muted leading-relaxed font-light">
              Have an arrival inquiry, need assistance locating the campus, or seeking guidance on your admission clearance? Contact the SPRF executive desk below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Contact Info Bento */}
            <div className="lg:col-span-5 space-y-6">
              <div className="sprf-card rounded-2xl p-6 sm:p-7 bg-white space-y-4">
                <h3 className="text-xl font-serif text-sprf-navy">Official Channels</h3>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sprf-navy/5 text-sprf-navy flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-4 h-4 text-sprf-gold" />
                    </div>
                    <div>
                      <span className="font-bold text-sprf-navy block">Official SPRF Email</span>
                      <a
                        href={`mailto:${siteConfig.contact.officialEmail}`}
                        className="text-sprf-muted hover:text-sprf-navy transition-colors font-mono"
                      >
                        {siteConfig.contact.officialEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sprf-navy/5 text-sprf-navy flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-4 h-4 text-sprf-gold" />
                    </div>
                    <div>
                      <span className="font-bold text-sprf-navy block">24/7 Arrival Helpline</span>
                      <a
                        href={`tel:${siteConfig.contact.emergencyHelpline}`}
                        className="text-sprf-muted hover:text-sprf-navy transition-colors font-mono"
                      >
                        {siteConfig.contact.emergencyHelpline}
                      </a>
                      <span className="text-[11px] text-emerald-700 block">Monitored by SPRF Marshals</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sprf-navy/5 text-sprf-navy flex items-center justify-center shrink-0 mt-0.5">
                      <Building className="w-4 h-4 text-sprf-gold" />
                    </div>
                    <div>
                      <span className="font-bold text-sprf-navy block">Physical Secretariat</span>
                      <p className="text-sprf-muted leading-relaxed font-light">
                        {siteConfig.contact.officeLocation}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sprf-navy/5 text-sprf-navy flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4 text-sprf-gold" />
                    </div>
                    <div>
                      <span className="font-bold text-sprf-navy block">Desk Working Hours</span>
                      <p className="text-sprf-muted leading-relaxed font-light">
                        {siteConfig.contact.hours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct FAQ shortcut */}
              <div className="p-6 rounded-2xl bg-sprf-surface border border-sprf-border space-y-2">
                <div className="flex items-center gap-2 font-serif text-base text-sprf-navy">
                  <HelpCircle className="w-4 h-4 text-sprf-gold" />
                  <span>Looking for quick answers?</span>
                </div>
                <p className="text-xs text-sprf-muted leading-relaxed font-light">
                  Most arrival concerns, document requirements, and hostel policies are already documented in our student knowledge base.
                </p>
                <Link
                  href="/faq"
                  className="inline-block pt-1 text-xs font-bold text-sprf-navy hover:text-sprf-gold underline underline-offset-4"
                >
                  Visit the FAQ Section →
                </Link>
              </div>
            </div>

            {/* Right: Functional Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
