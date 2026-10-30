import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { getLeadershipProfiles } from '@/lib/data-store';
import { createMetadata } from '@/lib/seo';
import { Users, Mail, ArrowRight, ShieldCheck, User } from 'lucide-react';

export const revalidate = 300;

export const metadata: Metadata = createMetadata({
  title: 'SPRF Executive Leadership & Student Representatives',
  description:
    'Meet the executive council of the Student Programmer Representative Forum at Venite University, guiding student affairs, technical innovation, and arrival orientation.',
  path: '/leadership',
});

export default async function LeadershipPage() {
  const profiles = await getLeadershipProfiles();

  return (
    <div className="w-full min-h-screen flex flex-col bg-sprf-surface text-sprf-charcoal">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sprf-surface-soft border border-sprf-border text-xs font-semibold text-sprf-navy">
              <Users className="w-3.5 h-3.5 text-sprf-gold" />
              <span>Student Governance</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif text-sprf-navy tracking-tight leading-tight">
              SPRF Executive Leadership
            </h1>
            <p className="text-base text-sprf-muted leading-relaxed font-light">
              The democratically elected student programmer representatives dedicated to serving newly admitted freshers, driving technical capacity, and maintaining university leadership standards.
            </p>
          </div>

          {/* Profiles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="sprf-card rounded-2xl overflow-hidden bg-white flex flex-col justify-between group hover:border-sprf-gold/50 transition-all"
              >
                <div className="space-y-4 p-6 sm:p-7">
                  {/* Avatar / Portrait or Monogram */}
                  <div className="w-16 h-16 rounded-2xl bg-sprf-navy text-sprf-gold border border-sprf-gold/30 flex items-center justify-center font-serif text-2xl font-bold shadow-xs">
                    {profile.name.charAt(0)}
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-bold text-sprf-gold uppercase tracking-wider block">
                      {profile.role}
                    </span>
                    <h3 className="text-xl font-serif text-sprf-navy">{profile.name}</h3>
                  </div>

                  <p className="text-xs text-sprf-muted leading-relaxed font-light">
                    {profile.biography}
                  </p>
                </div>

                <div className="px-6 py-4 bg-sprf-surface border-t border-sprf-border flex items-center justify-between text-xs">
                  {profile.contactUrl ? (
                    <a
                      href={profile.contactUrl}
                      className="inline-flex items-center gap-1.5 font-semibold text-sprf-navy hover:text-sprf-gold transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-sprf-gold" />
                      <span>Contact Representative</span>
                    </a>
                  ) : (
                    <span className="text-sprf-muted font-mono">SPRF Council 2026</span>
                  )}
                  <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Editorial Note */}
          <div className="p-6 rounded-2xl bg-white border border-sprf-border shadow-xs text-xs text-sprf-muted leading-relaxed">
            <p>
              <strong>Administration Note:</strong> Leadership appointments, executive portfolios, and contact addresses are maintained by the SPRF Secretariat. Verified executive officers can update their profiles directly through the authenticated admin portal.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
