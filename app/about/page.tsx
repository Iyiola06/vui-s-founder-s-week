import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { siteConfig } from '@/lib/config';
import { createMetadata } from '@/lib/seo';
import {
  Code2,
  Users,
  Compass,
  Award,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export const revalidate = 300;

export const metadata: Metadata = createMetadata({
  title: 'About SPRF | Student Programmer Representative Forum',
  description:
    'Learn about the mission, technological leadership, peer mentorship cohorts, and student advocacy of the Student Programmer Representative Forum at Venite University.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-sprf-surface text-sprf-charcoal">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Header */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sprf-surface-soft border border-sprf-border text-xs font-semibold text-sprf-navy">
              <Code2 className="w-3.5 h-3.5 text-sprf-gold" />
              <span>Student Leadership & Innovation</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif text-sprf-navy tracking-tight leading-tight">
              About the Student Programmer Representative Forum
            </h1>
            <p className="text-base sm:text-lg text-sprf-muted leading-relaxed font-light">
              SPRF is the recognized technological student leadership body of Venite University, Iloro-Ekiti. We foster engineering excellence, advocate for student digital welfare, and bridge the gap between academic theory and world-class software careers.
            </p>
          </div>

          {/* Editorial Visual & Mission Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-serif text-sprf-navy">
                Our Mission & Purpose
              </h2>
              <div className="text-sm text-sprf-charcoal/80 leading-relaxed font-light space-y-4">
                <p>
                  Founded by passionate student computer scientists, software engineers, and digital innovators, the Student Programmer Representative Forum exists to cultivate a rigorous, supportive technological ecosystem at Venite University.
                </p>
                <p>
                  During Orientation Week, SPRF takes the lead in student arrival logistics—providing transit guidance, campus marshals, portal activation helpdesks, and practical checklists so every fresher begins university life on solid footing.
                </p>
                <p>
                  Throughout the semester, we run peer code reviews, collaborative open-source sprints, industry hackathons, and guest masterclasses with senior engineers across Africa and globally.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/leadership"
                  className="px-6 py-3 rounded-xl bg-sprf-navy hover:bg-sprf-blue text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-colors"
                >
                  <span>Meet Our Leadership</span>
                  <ArrowRight className="w-3.5 h-3.5 text-sprf-gold" />
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-xl bg-white border border-sprf-border text-sprf-charcoal text-xs font-bold uppercase tracking-wider hover:bg-sprf-surface transition-colors"
                >
                  Contact SPRF Desk
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-xl border border-sprf-border aspect-[4/3]">
              <Image
                src={siteConfig.images.workshop}
                alt="Students coding together in Venite tech laboratory"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sprf-navy/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                <span className="font-bold block">Venite University Computing Lab</span>
                <span className="text-white/80 text-[11px]">SPRF Developer Tracks in action</span>
              </div>
            </div>
          </div>

          {/* Four Core Pillars Bento */}
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-serif text-sprf-navy">
              Our Four Core Pillars
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="sprf-card rounded-2xl p-7 bg-white space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sprf-navy/5 text-sprf-navy flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-sprf-gold" />
                </div>
                <h3 className="text-xl font-serif text-sprf-navy">1. Engineering Rigour</h3>
                <p className="text-xs text-sprf-muted leading-relaxed font-light">
                  We champion clean software engineering, algorithmic problem solving, modern full-stack development, and disciplined software architecture from the very first semester.
                </p>
              </div>

              <div className="sprf-card rounded-2xl p-7 bg-white space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sprf-navy/5 text-sprf-navy flex items-center justify-center">
                  <Users className="w-5 h-5 text-sprf-gold" />
                </div>
                <h3 className="text-xl font-serif text-sprf-navy">2. Peer Mentorship</h3>
                <p className="text-xs text-sprf-muted leading-relaxed font-light">
                  Senior students mentor 100-level freshers through weekly study groups, code walkthroughs, debugging circles, and open-source contributions.
                </p>
              </div>

              <div className="sprf-card rounded-2xl p-7 bg-white space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sprf-navy/5 text-sprf-navy flex items-center justify-center">
                  <Compass className="w-5 h-5 text-sprf-gold" />
                </div>
                <h3 className="text-xl font-serif text-sprf-navy">3. Practical Campus Solutions</h3>
                <p className="text-xs text-sprf-muted leading-relaxed font-light">
                  We build real digital platforms—like this arrival portal, timetable utilities, and student tools—proving our tech competence through production-grade engineering.
                </p>
              </div>

              <div className="sprf-card rounded-2xl p-7 bg-white space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sprf-navy/5 text-sprf-navy flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-sprf-gold" />
                </div>
                <h3 className="text-xl font-serif text-sprf-navy">4. Student Representation</h3>
                <p className="text-xs text-sprf-muted leading-relaxed font-light">
                  We advocate on behalf of students for modern laboratory hardware, reliable campus Wi-Fi access, cloud resource credits, and enriched educational curricula.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
