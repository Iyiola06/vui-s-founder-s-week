import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { siteConfig } from '@/lib/config';
import { createMetadata } from '@/lib/seo';
import {
  Users,
  Compass,
  Award,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  BookOpen,
  HeartHandshake,
  MessageSquare,
  GraduationCap,
  Building,
  CheckCircle2,
} from 'lucide-react';

export const revalidate = 300;

export const metadata: Metadata = createMetadata({
  title: 'About SPRF | Student Program Representatives Forum',
  description:
    'Learn about the mission, vision, core values, representation channels, student welfare advocacy, and community building of the Student Program Representatives Forum (SPRF) at Venite University, Iloro-Ekiti.',
  path: '/about',
});

export default function AboutPage() {
  const coreValues = [
    {
      title: '1. Representation',
      description: 'Ensuring that the interests and concerns of students across all programmes are heard, respected, and considered in university decisions.',
      icon: Users,
    },
    {
      title: '2. Unity',
      description: 'Building meaningful relationships, empathy, and cooperation across different faculties, colleges, departments, and academic disciplines.',
      icon: HeartHandshake,
    },
    {
      title: '3. Accountability',
      description: 'Promoting responsible leadership, administrative transparency, active reporting, and unwavering commitment to the students we represent.',
      icon: ShieldCheck,
    },
    {
      title: '4. Inclusivity',
      description: 'Recognising and respecting the diverse backgrounds, perspectives, talents, and unique needs of Venite University’s entire student population.',
      icon: Sparkles,
    },
    {
      title: '5. Service',
      description: 'Prioritising the practical welfare, daily comfort, holistic development, and collective upward progress of every enrolled student.',
      icon: Compass,
    },
    {
      title: '6. Excellence',
      description: 'Encouraging academic responsibility, ethical character, personal growth, and positive contributions to the university and society.',
      icon: Award,
    },
  ];

  const whatWeDoItems = [
    {
      title: 'Student Representation',
      description:
        'We provide a structured, accessible channel through which students across all faculties can communicate their interests, concerns, suggestions, and academic experiences to university authorities.',
      icon: Users,
    },
    {
      title: 'Student Welfare and Advocacy',
      description:
        'We identify issues affecting student welfare—from residential hostel living conditions and health centre support to learning environments—and work through constructive engagement with university management.',
      icon: HeartHandshake,
    },
    {
      title: 'Communication and Engagement',
      description:
        'We strengthen vital communication between students, programme representatives, faculty officers, and the Directorate of Student Affairs, ensuring transparent information flow.',
      icon: MessageSquare,
    },
    {
      title: 'Orientation and Student Integration',
      description:
        'We support newly admitted students as they transition into university life, helping them access verified arrival details, understand campus processes, and become confident members of the Venite community.',
      icon: Compass,
    },
    {
      title: 'Leadership and Participation',
      description:
        'We encourage responsible student leadership, active civic participation, inter-programme collaboration, and constructive engagement in the ongoing development of Venite University.',
      icon: GraduationCap,
    },
    {
      title: 'Community Building',
      description:
        'We organise and promote inclusive initiatives, cultural celebrations, sports mixers, and intellectual forums that strengthen peer relationships and cultivate deep campus belonging.',
      icon: Building,
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col bg-sprf-surface text-sprf-charcoal">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sprf-surface-soft border border-sprf-border text-xs font-semibold text-sprf-navy">
              <Users className="w-3.5 h-3.5 text-sprf-gold" />
              <span>ABOUT SPRF</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif text-sprf-navy tracking-tight leading-tight">
              A Collective Voice. <br />
              <span className="text-sprf-gold italic">A United Student Community.</span>
            </h1>
            <p className="text-base sm:text-lg text-sprf-muted leading-relaxed font-light">
              The Student Program Representatives Forum (SPRF) is the university-wide student representative body of Venite University, established to promote student participation, strengthen communication and ensure that the interests and concerns of students are represented.
            </p>
          </div>

          {/* Official Emblem & Identity Display */}
          <div className="sprf-card rounded-3xl p-8 sm:p-10 bg-white border border-sprf-border shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 flex justify-center">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl p-4 bg-sprf-surface border border-sprf-gold/30 shadow-inner flex items-center justify-center">
                  <Image
                    src={siteConfig.images.logo}
                    alt="Official SPRF Crest - Student Program Representatives Forum"
                    fill
                    sizes="224px"
                    className="object-contain p-2"
                    priority
                  />
                </div>
              </div>
              <div className="md:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sprf-gold/15 text-sprf-navy text-xs font-bold uppercase tracking-wider border border-sprf-gold/30">
                  <Sparkles className="w-3.5 h-3.5 text-sprf-gold" />
                  <span>Official Insignia</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif text-sprf-navy">
                  Student Program Representatives Forum
                </h2>
                <p className="text-xs uppercase font-bold tracking-widest text-sprf-gold">
                  Official Motto: Students • Voice • Progress
                </p>
                <p className="text-xs sm:text-sm text-sprf-muted leading-relaxed font-light">
                  Through a coordinated network of student programme representatives, SPRF provides a platform for students to express their concerns, share ideas, contribute to university development and participate meaningfully in matters affecting their academic and social experiences.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-sprf-navy font-semibold">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Universal Student Representation
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-sprf-gold" /> Venite University, Iloro-Ekiti
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative & Institutional Inclusivity */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-sprf-charcoal/85 leading-relaxed font-light">
              <h2 className="text-2xl sm:text-3xl font-serif text-sprf-navy">
                Every Student. Every Programme. Every Voice.
              </h2>
              <p>
                We believe that every student deserves to be heard, every voice deserves consideration, and every programme deserves representation.
              </p>
              <p>
                Our commitment extends beyond individual departments or academic disciplines. We stand for the collective interests, welfare and progress of the entire Venite University student community—uniting scholars in Health Sciences, Law, Computing &amp; Applied Sciences, Management, Social Sciences, and Agricultural Sciences.
              </p>
              <p>
                Whether advocating for enhanced hostel facilities, coordinating student welfare dialogues, ensuring academic clarity, or facilitating a welcoming arrival for newly admitted freshers, SPRF operates as an accountable and responsive institution dedicated to student service.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/leadership"
                  className="px-6 py-3 rounded-xl bg-sprf-navy hover:bg-sprf-blue text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-colors"
                >
                  <span>Meet the Representative Council</span>
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

            {/* Authentic Venite Photo */}
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-xl border border-sprf-border aspect-[4/3]">
              <Image
                src={siteConfig.images.community}
                alt="Venite University students in academic regalia celebrating matriculation"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sprf-navy/85 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                <span className="font-bold block">Venite University Student Community</span>
                <span className="text-white/80 text-[11px]">United across all academic faculties</span>
              </div>
            </div>
          </div>

          {/* Vision & Mission Split Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="sprf-card rounded-3xl p-8 sm:p-10 bg-white border border-sprf-border shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sprf-navy text-sprf-gold flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-sprf-gold block">
                Guiding Aspiration
              </span>
              <h3 className="text-2xl font-serif text-sprf-navy">OUR VISION</h3>
              <p className="text-sm sm:text-base text-sprf-charcoal/80 leading-relaxed font-light">
                To build a united, inclusive and empowered student community where every student has a voice, every programme is represented and collective participation contributes to a better university experience.
              </p>
            </div>

            {/* Mission */}
            <div className="sprf-card rounded-3xl p-8 sm:p-10 bg-white border border-sprf-border shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sprf-gold/20 text-sprf-navy flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-sprf-navy" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-sprf-gold block">
                Operational Purpose
              </span>
              <h3 className="text-2xl font-serif text-sprf-navy">OUR MISSION</h3>
              <p className="text-sm sm:text-base text-sprf-charcoal/80 leading-relaxed font-light">
                To represent the interests of students, promote their welfare, facilitate effective communication between students and relevant university authorities, encourage responsible student leadership and create opportunities for meaningful student participation in university life.
              </p>
            </div>
          </div>

          {/* Core Values Section */}
          <div className="space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-sprf-gold block mb-1">
                Guiding Principles
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-sprf-navy">
                OUR CORE VALUES
              </h2>
              <p className="text-xs sm:text-sm text-sprf-muted mt-1 max-w-2xl font-light">
                These six institutional commitments govern our representative duties, executive accountability, and relationship with every student at Venite University.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreValues.map((val) => {
                const IconComponent = val.icon;
                return (
                  <div key={val.title} className="sprf-card rounded-2xl p-6 sm:p-7 bg-white space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-sprf-navy/5 text-sprf-navy flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-sprf-gold" />
                    </div>
                    <h3 className="text-lg font-serif text-sprf-navy">{val.title}</h3>
                    <p className="text-xs sm:text-sm text-sprf-muted leading-relaxed font-light">
                      {val.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* What We Do Section */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-sprf-gold block mb-1">
                  Institutional Scope
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif text-sprf-navy">
                  WHAT WE DO
                </h2>
                <p className="text-xs sm:text-sm text-sprf-muted mt-1 max-w-2xl font-light">
                  The practical day-to-day responsibilities and initiatives delivered by SPRF to support student life, representation, and community progress.
                </p>
              </div>

              <Link
                href="/orientation"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sprf-navy hover:text-sprf-gold transition-colors"
              >
                <span>View Orientation Initiatives</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whatWeDoItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.title} className="sprf-card rounded-2xl p-7 bg-white space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-sprf-surface text-sprf-navy flex items-center justify-center border border-sprf-border">
                      <IconComponent className="w-5 h-5 text-sprf-gold" />
                    </div>
                    <h3 className="text-lg font-serif text-sprf-navy">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-sprf-muted leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Institutional Commitment Callout */}
          <div className="p-8 sm:p-10 rounded-3xl bg-sprf-navy text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs uppercase font-bold tracking-widest text-sprf-gold">
                Universal University Representation
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif">
                Have a question, feedback, or welfare concern?
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                Your designated programme representatives and executive officers are here to support you. Visit the SPRF Secretariat in the Student Affairs Building or submit an inquiry through our digital portal.
              </p>
            </div>

            <Link
              href="/contact"
              className="px-7 py-3.5 rounded-xl bg-sprf-gold hover:bg-sprf-gold-light text-sprf-navy text-xs font-bold uppercase tracking-wider flex items-center gap-2 shrink-0 shadow-md transition-all"
            >
              <span>Contact SPRF Desk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
