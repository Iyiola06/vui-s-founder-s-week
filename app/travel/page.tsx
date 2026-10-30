import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { JourneyPlanner } from '@/components/travel/JourneyPlanner';
import { siteConfig } from '@/lib/config';
import { createMetadata } from '@/lib/seo';
import {
  Compass,
  MapPin,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Phone,
  Bus,
  CheckCircle,
  ArrowRight,
  Building,
} from 'lucide-react';

export const revalidate = 300;

export const metadata: Metadata = createMetadata({
  title: 'Travel & Campus Arrival Guide',
  description:
    'Plan your journey to Venite University, Iloro-Ekiti from any Nigerian city with real-time Google Maps directions, campus entrance details, and 24/7 arrival protocols.',
  path: '/travel',
});

export default function TravelPage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-sprf-surface text-sprf-charcoal">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sprf-surface-soft border border-sprf-border text-xs font-semibold text-sprf-navy">
              <Compass className="w-3.5 h-3.5 text-sprf-gold" />
              <span>Journey Planner & Navigation</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif text-sprf-navy tracking-tight">
              Travelling to <span className="text-sprf-gold italic">Venite University</span>
            </h1>
            <p className="text-base text-sprf-muted leading-relaxed font-light">
              We are excited to welcome you to our Iloro-Ekiti campus. Explore our interactive on-site campus map, regional highway networks, and key university landmarks below, or launch external GPS navigation in Google Maps, Apple Maps, or Waze.
            </p>
          </div>

          {/* Interactive Route Planner Component */}
          <JourneyPlanner />

          {/* Campus Arrival Protocols Bento */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif text-sprf-navy">
                Essential Campus Arrival Protocols
              </h2>
              <p className="text-xs text-sprf-muted mt-1">
                Please review these practical instructions before departing your home city.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Entrance Gate */}
              <div className="sprf-card rounded-2xl p-6 sm:p-7 bg-white space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sprf-navy/5 text-sprf-navy flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-sprf-gold" />
                </div>
                <h3 className="text-lg font-serif text-sprf-navy">1. Identifying the Campus Entrance</h3>
                <p className="text-xs text-sprf-muted leading-relaxed font-light">
                  Venite University is located at <strong>KM 2, Ayetoro Road, Iloro-Ekiti</strong>. The campus features a clearly marked ceremonial gatehouse with official signage. Commercial tricycles and shuttles from Iloro-Ekiti junction drop students directly at the gate.
                </p>
              </div>

              {/* Where to Report */}
              <div className="sprf-card rounded-2xl p-6 sm:p-7 bg-white space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sprf-navy/5 text-sprf-navy flex items-center justify-center">
                  <Building className="w-5 h-5 text-sprf-gold" />
                </div>
                <h3 className="text-lg font-serif text-sprf-navy">2. Where to Report First</h3>
                <p className="text-xs text-sprf-muted leading-relaxed font-light">
                  Upon arrival at the main gate, report to the <strong>SPRF Welcome Desk</strong>. Student marshals will check your provisional admission slip, provide luggage tags, and escort you to the Student Affairs desk for residential room key collection.
                </p>
              </div>

              {/* Late Night Arrivals */}
              <div className="sprf-card rounded-2xl p-6 sm:p-7 bg-white space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-700" />
                </div>
                <h3 className="text-lg font-serif text-sprf-navy">3. Arriving After Official Hours</h3>
                <p className="text-xs text-sprf-muted leading-relaxed font-light">
                  If travel delays cause you to arrive after <strong>6:00 PM</strong>, do not panic. The campus main gate security post is manned 24/7. Present your admission notification and NIN slip. Officers will coordinate safe overnight holding in the designated fresher lounge.
                </p>
              </div>

              {/* Verified Helpline */}
              <div className="sprf-card rounded-2xl p-6 sm:p-7 bg-white space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sprf-navy/5 text-sprf-navy flex items-center justify-center">
                  <Phone className="w-5 h-5 text-sprf-gold" />
                </div>
                <h3 className="text-lg font-serif text-sprf-navy">4. Arrival Emergency Helpline</h3>
                <p className="text-xs text-sprf-muted leading-relaxed font-light">
                  If your vehicle breaks down or your driver is uncertain of the Iloro-Ekiti turnoff from Ado-Ekiti or Aramoko, call the SPRF Logistics Desk immediately at{' '}
                  <a href={`tel:${siteConfig.contact.emergencyHelpline}`} className="font-bold text-sprf-navy underline">
                    {siteConfig.contact.emergencyHelpline}
                  </a>.
                </p>
              </div>

              {/* Regional Bus Parks */}
              <div className="sprf-card rounded-2xl p-6 sm:p-7 bg-white space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sprf-navy/5 text-sprf-navy flex items-center justify-center">
                  <Bus className="w-5 h-5 text-sprf-gold" />
                </div>
                <h3 className="text-lg font-serif text-sprf-navy">5. Regional Transit Guide</h3>
                <p className="text-xs text-sprf-muted leading-relaxed font-light">
                  Read our curated breakdown of verified commercial motor parks in Lagos (Ojota/Berger), Ibadan (Iwo Road), Akure, Abuja (Utako), and Ado-Ekiti, including route warnings and connecting shuttles.
                </p>
                <Link
                  href="/travel/transport"
                  className="text-xs font-bold text-sprf-navy hover:text-sprf-gold flex items-center gap-1 pt-2"
                >
                  <span>Explore Bus Routes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Campus Visual */}
              <div className="sprf-card rounded-2xl overflow-hidden relative aspect-[4/3] border border-sprf-border">
                <Image
                  src={siteConfig.images.campus}
                  alt="Scenic view of Venite University academic campus"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sprf-navy/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
                  <span className="font-bold block">Venite University, Iloro-Ekiti</span>
                  <span className="text-white/80 text-[11px]">Serene learning environment in Ekiti hills</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
