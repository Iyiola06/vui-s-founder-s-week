import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { getTransportGuides } from '@/lib/data-store';
import { siteConfig } from '@/lib/config';
import { createMetadata } from '@/lib/seo';
import {
  Bus,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Banknote,
  Calendar,
  Compass,
} from 'lucide-react';

export const revalidate = 300;

export const metadata: Metadata = createMetadata({
  title: 'Regional Transport & Motor Park Guide',
  description:
    'Verified public transport routes, commercial motor park terminals, transfer points, and fare estimates for students travelling to Venite University from Lagos, Ibadan, Abuja, and Akure.',
  path: '/travel/transport',
});

export default async function TransportGuidePage() {
  const guides = await getTransportGuides();

  return (
    <div className="w-full min-h-screen flex flex-col bg-sprf-surface text-sprf-charcoal">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sprf-surface-soft border border-sprf-border text-xs font-semibold text-sprf-navy">
              <Bus className="w-3.5 h-3.5 text-sprf-gold" />
              <span>Public Transit Logistics</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif text-sprf-navy tracking-tight">
              Regional Transport Guide
            </h1>
            <p className="text-base text-sprf-muted leading-relaxed font-light">
              Practical onward travel information compiled by SPRF student marshals to assist freshers travelling via commercial bus parks across Nigeria to Iloro-Ekiti.
            </p>
          </div>

          {/* Important Advice Callout */}
          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>Important Road Safety Advisory for Arriving Freshers</span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed font-light">
              Always board vehicles exclusively inside registered, recognized commercial motor parks (e.g. NURTW/RTEAN terminals or verified private bus fleets). Avoid roadside pickups. Ensure you notify family members of your bus registration number before departure, and schedule your trip to arrive in Iloro-Ekiti during daylight hours (before 5:00 PM).
            </p>
          </div>

          {/* Transport Routes Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-sprf-border">
              <h2 className="text-xl sm:text-2xl font-serif text-sprf-navy">Verified Major Routes</h2>
              <span className="text-xs text-sprf-muted font-mono">{guides.length} Regional Routes</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guides.map((route) => (
                <div
                  key={route.id}
                  className="sprf-card rounded-2xl p-6 sm:p-7 bg-white space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-xs font-bold text-sprf-gold uppercase tracking-wider">
                        Origin Departure
                      </span>
                      {route.lastVerifiedAt && (
                        <span className="text-[10px] text-sprf-muted font-mono flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Verified: {route.lastVerifiedAt}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-serif text-sprf-navy">{route.originCity}</h3>

                    <div className="space-y-1 text-xs">
                      <div className="flex items-start gap-1.5 text-sprf-charcoal">
                        <MapPin className="w-3.5 h-3.5 text-sprf-gold shrink-0 mt-0.5" />
                        <span><strong>Terminal:</strong> {route.terminalName}</span>
                      </div>
                      <div className="flex items-start gap-1.5 text-sprf-muted">
                        <Bus className="w-3.5 h-3.5 text-sprf-muted shrink-0 mt-0.5" />
                        <span><strong>Provider:</strong> {route.providerName}</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-sprf-surface border border-sprf-border/60 text-xs text-sprf-charcoal/80 leading-relaxed font-light">
                      <p className="font-semibold text-sprf-navy mb-1">Route & Connections:</p>
                      <p>{route.routeDescription}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-sprf-surface-soft border border-sprf-border/60">
                        <span className="text-[10px] uppercase font-bold text-sprf-muted block">Estimated Fare</span>
                        <span className="font-semibold text-sprf-navy font-mono">{route.estimatedFare || 'Market rate'}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-sprf-surface-soft border border-sprf-border/60">
                        <span className="text-[10px] uppercase font-bold text-sprf-muted block">Duration</span>
                        <span className="font-semibold text-sprf-navy">{route.estimatedDuration || 'Variable'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-sprf-border flex justify-between items-center text-xs">
                    <span className="text-sprf-muted">Destination: Iloro-Ekiti Gate</span>
                    <Link
                      href="/travel"
                      className="font-bold text-sprf-navy hover:text-sprf-gold flex items-center gap-1"
                    >
                      <span>Map Route</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Route Link CTA */}
          <div className="p-8 rounded-2xl bg-white border border-sprf-border shadow-xs text-center space-y-4">
            <h3 className="text-xl font-serif text-sprf-navy">Need GPS turn-by-turn directions?</h3>
            <p className="text-xs text-sprf-muted max-w-md mx-auto leading-relaxed">
              Use our interactive Journey Planner to open driving or transit routes customized to your exact starting location in Google Maps.
            </p>
            <Link
              href="/travel"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sprf-navy text-white text-xs font-bold uppercase tracking-wider hover:bg-sprf-blue transition-colors shadow-sm"
            >
              <Compass className="w-4 h-4 text-sprf-gold" />
              <span>Launch Journey Planner</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
