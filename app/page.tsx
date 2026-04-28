import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { logDatabaseIssue } from '@/lib/db';
import { ArrowRight, Sparkles, MapPin, Ticket, Award, CalendarDays, Mic2, Star, Users2 } from 'lucide-react';
import { FloatingNav } from '@/components/ui/FloatingNav';
import { Footer } from '@/components/ui/Footer';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let eventDays: any[] = [];
  let categories: any[] = [];
  let isDbConnected = true;

  try {
    eventDays = await prisma.eventDay.findMany({
      orderBy: { date: 'asc' },
    });

    categories = await prisma.votingCategory.findMany({
      where: { isOpen: true },
      take: 4,
      include: {
        _count: {
          select: { candidates: true }
        }
      }
    });
  } catch (error) {
    logDatabaseIssue('home page data', error);
    isDbConnected = false;
  }

  // Fallback data if DB is empty or fails
  const fallbackEvents = [
    { title: 'Debate and Talk Show', description: 'Students engage in intellectual discourse on national development.', date: new Date('2026-05-11') },
    { title: 'College Lectures', description: 'Academic showcase from Agriculture, Computing and Engineering.', date: new Date('2026-05-12') },
    { title: 'Talent Show', description: 'A night of music, art, and creative performances.', date: new Date('2026-05-13') },
    { title: 'Cultural Day', description: 'Celebrating our extraordinary Nigerian heritage.', date: new Date('2026-05-14') },
    { title: "Founder's Day Ceremony", description: "The official Founder's Day event.", date: new Date('2026-05-15') },
    { title: 'Sports & Dinner Awards', description: 'Morning athletics followed by the grand elegance dinner.', date: new Date('2026-05-16'), isSaturday: true },
    { title: 'Thanksgiving', description: 'A Sunday service of gratitude to conclude the week.', date: new Date('2026-05-17') },
  ];

  const displayEvents = eventDays.length > 0 ? eventDays : fallbackEvents;

  return (
    <div className="w-full min-h-screen bg-cream text-text-dark font-sans overflow-x-hidden selection:bg-champagne-gold selection:text-text-dark">
      <FloatingNav />
      
      {/* 1. Cinematic Hero */}
      <section className="relative min-h-[95vh] w-full flex flex-col justify-center items-center px-6 pt-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] h-[80vw] max-h-[800px] radial-glow rounded-full opacity-60 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] radial-glow-gold rounded-full opacity-30 pointer-events-none blur-3xl" />
        
        <div className="z-10 flex flex-col items-center text-center max-w-5xl mx-auto w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-warm-border bg-white/30 backdrop-blur-md mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-champagne-gold animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-text-dark/80">Venite University, Iloro-Ekiti</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-text-dark tracking-tighter leading-[1.05] mb-6 drop-shadow-sm">
            Founder&apos;s <br className="hidden md:block"/>
            <span className="italic font-light text-deep-green">Week 2026</span>
          </h1>

          <p className="text-base md:text-xl text-muted-text font-light max-w-2xl balance mb-12 leading-relaxed">
            A week-long celebration of vision, excellence, culture, talent, sports, awards, and thanksgiving.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link href="/programme" className="w-full sm:w-auto px-8 py-4 rounded-full bg-deep-green text-cream font-medium text-sm hover:bg-luxury-green transition-all shadow-xl shadow-deep-green/10 hover:shadow-deep-green/20 hover:-translate-y-0.5 text-center flex items-center justify-center gap-2">
              Explore Programme <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/voting" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-text-dark border border-warm-border font-medium text-sm hover:bg-cream-soft hover:border-champagne-gold transition-all text-center group">
              Vote for Awards <span className="inline-block group-hover:translate-x-1 transition-transform"> </span>
            </Link>
          </div>

          {/* Floating Feature Pills */}
          <div className="mt-20 md:mt-32 flex flex-wrap justify-center gap-4 md:gap-8 opacity-80">
            <div className="flex items-center gap-3 glass-panel px-6 py-3 rounded-full text-sm font-medium">
              <CalendarDays className="w-4 h-4 text-champagne-gold" /> 7 Days
            </div>
            <div className="flex items-center gap-3 glass-panel px-6 py-3 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4 text-champagne-gold" /> Dinner & Awards
            </div>
            <div className="flex items-center gap-3 glass-panel px-6 py-3 rounded-full text-sm font-medium">
              <Award className="w-4 h-4 text-champagne-gold" /> Paid Voting
            </div>
          </div>
        </div>
      </section>

      {/* 2. Visual Programme Rail */}
      <section className="py-32 w-full border-t border-warm-border/50 bg-white/30 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif text-text-dark tracking-tight mb-4">The Schedule</h2>
              <p className="text-muted-text max-w-md">Our curated week of extraordinary events.</p>
            </div>
            <Link href="/programme" className="text-xs uppercase tracking-widest font-bold text-deep-green hover:text-champagne-gold transition-colors flex items-center gap-1 group">
              Full Timetable <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="flex overflow-x-auto pb-12 -mx-6 px-6 lg:mx-0 lg:px-0 gap-6 snap-x snap-mandatory scrollbar-hide">
            {displayEvents.map((day: any, i: number) => {
              const isSaturday = day.title.toLowerCase().includes('saturday') || day.isSaturday;
              return (
                <div key={day.id || i} className={`snap-center shrink-0 w-[85vw] sm:w-[340px] rounded-3xl p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 group ${isSaturday ? 'glass-panel-dark' : 'glass-panel hover:bg-white/80'}`}>
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full ${isSaturday ? 'bg-champagne-gold/20 text-champagne-gold' : 'bg-deep-green/10 text-deep-green'}`}>
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}
                      </span>
                      {isSaturday && <Star className="w-5 h-5 text-champagne-gold fill-champagne-gold" />}
                    </div>
                    <h3 className={`text-xl font-serif leading-tight mb-3 ${isSaturday ? 'text-cream' : 'text-text-dark'}`}>{day.title}</h3>
                    <p className={`text-sm ${isSaturday ? 'text-white/60' : 'text-muted-text'} line-clamp-3`}>{day.description}</p>
                  </div>
                  {isSaturday && (
                    <div className="mt-8 pt-6 border-t border-white/10">
                      <span className="text-xs font-medium text-champagne-gold group-hover:text-white transition-colors">Grand Finale -&gt;</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Founder's Week Bento Section */}
      <section className="py-32 w-full bg-cream-soft relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-text-dark tracking-tight mb-4">Five Pillars of Celebration</h2>
            <p className="text-muted-text max-w-xl mx-auto">Experiencing the best of Venite University.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[240px]">
            <div className="glass-panel p-8 rounded-[32px] md:col-span-2 flex flex-col justify-end bg-gradient-to-br from-white/60 to-transparent">
              <Mic2 className="w-8 h-8 text-deep-green mb-auto" />
              <h3 className="text-2xl font-serif mb-2">Ideas & Dialogue</h3>
              <p className="text-muted-text text-sm max-w-sm">Debates, talk shows, and lectures shaping the national discourse.</p>
            </div>
            <div className="glass-panel p-8 rounded-[32px] flex flex-col justify-end bg-gradient-to-tr from-white/60 to-transparent">
              <Users2 className="w-8 h-8 text-deep-green mb-auto" />
              <h3 className="text-2xl font-serif mb-2">Culture</h3>
              <p className="text-muted-text text-sm">A vibrant display of Nigerian heritage.</p>
            </div>
            <div className="glass-panel p-8 rounded-[32px] flex flex-col justify-end bg-gradient-to-tr from-white/60 to-transparent">
              <Ticket className="w-8 h-8 text-deep-green mb-auto" />
              <h3 className="text-2xl font-serif mb-2">Talent</h3>
              <p className="text-muted-text text-sm">Showcasing creative brilliance.</p>
            </div>
            <div className="glass-panel-dark p-8 rounded-[32px] md:col-span-2 flex flex-col justify-end relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Award className="w-8 h-8 text-champagne-gold mb-auto relative z-10" />
              <div className="relative z-10">
                <h3 className="text-2xl font-serif mb-2 text-cream">Sports & Awards</h3>
                <p className="text-white/60 text-sm max-w-sm">From the track to the red carpet-honoring our finest.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Grand Finale Split Section */}
      <section className="py-32 w-full bg-deep-green text-cream relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] radial-glow-gold rounded-full opacity-20 -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-full border border-champagne-gold/30 text-champagne-gold text-[10px] uppercase font-bold tracking-widest mb-6 bg-champagne-gold/5">Saturday Night</span>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-serif tracking-tight leading-[1.1] mb-6">A Night of <br/><span className="italic text-champagne-gold">Absolute Elegance.</span></h2>
              <p className="text-white/60 text-lg sm:text-xl font-light mb-10 max-w-md">
                The climax of Founder&apos;s Week. Walk the red carpet, celebrate outstanding peers, and experience a dinner crafted for royalty.
              </p>
              <Link href="/dinner-night">
                <button className="px-8 py-4 rounded-full bg-champagne-gold text-deep-green font-bold text-sm hover:bg-white transition-all shadow-xl shadow-champagne-gold/10">
                  Dinner Details
                </button>
              </Link>
            </div>
            
            <div className="relative h-[400px] sm:h-[500px] w-full">
              {/* Abstract Floating Cards representing the night */}
              <div className="absolute top-0 right-0 w-[80%] h-[60%] glass-panel-dark border-white/20 rounded-[32px] p-8 flex flex-col justify-between transform rotate-3 hover:rotate-1 transition-transform duration-500 shadow-2xl">
                <div className="flex justify-between items-center opacity-50">
                  <span className="text-xs uppercase font-bold tracking-widest text-champagne-gold">Dress Code</span>
                  <Star className="w-4 h-4 text-champagne-gold" />
                </div>
                <h3 className="text-3xl font-serif">Black Tie & <br/>Glamour</h3>
              </div>
              <div className="absolute bottom-0 left-0 w-[80%] h-[60%] bg-cream text-text-dark rounded-[32px] p-8 flex flex-col justify-between transform -rotate-3 hover:-rotate-1 transition-transform duration-500 shadow-2xl z-10">
                <div className="flex justify-between items-center opacity-50">
                  <span className="text-xs uppercase font-bold tracking-widest text-deep-green">Awards</span>
                  <Award className="w-4 h-4 text-deep-green" />
                </div>
                <div>
                  <h3 className="text-3xl font-serif mb-2 text-deep-green">Live Recognition</h3>
                  <div className="w-full bg-transparent border border-warm-border h-2 rounded-full overflow-hidden mt-6">
                    <div className="w-[75%] bg-champagne-gold h-full rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Voting Preview */}
      <section className="py-32 w-full relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-text-dark tracking-tight mb-4">Who takes the crown?</h2>
            <p className="text-muted-text max-w-xl mx-auto mb-10">Secure, transparent, and live. Support your favorites across various categories.</p>
            <Link href="/voting">
              <button className="px-8 py-4 rounded-full bg-text-dark text-cream font-medium text-sm hover:bg-champagne-gold hover:text-text-dark transition-all">
                Vote Now via Paystack
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.length > 0 ? categories.map((cat: any) => (
              <div key={cat.id} className="glass-panel p-6 rounded-3xl hover:bg-white/80 transition-all group cursor-default">
                <h4 className="font-serif text-lg text-deep-green mb-1 group-hover:text-champagne-gold transition-colors">{cat.name}</h4>
                <p className="text-xs text-muted-text mb-6">{cat._count.candidates} Nominees</p>
                <div className="space-y-3 pb-2">
                  <div className="w-full bg-warm-border/30 h-1.5 rounded-full overflow-hidden">
                    <div className="w-[80%] bg-deep-green/20 h-full rounded-full" />
                  </div>
                  <div className="w-full bg-warm-border/30 h-1.5 rounded-full overflow-hidden">
                    <div className="w-[40%] bg-deep-green/10 h-full rounded-full" />
                  </div>
                  <div className="w-full bg-warm-border/30 h-1.5 rounded-full overflow-hidden">
                    <div className="w-[20%] bg-deep-green/5 h-full rounded-full" />
                  </div>
                </div>
              </div>
            )) : (
              // Empty state fallbacks
              [1,2,3,4].map(i => (
                <div key={i} className="glass-panel p-6 rounded-3xl opacity-50">
                  <div className="h-6 w-32 bg-warm-border rounded-md mb-2 animate-pulse" />
                  <div className="h-4 w-16 bg-warm-border/50 rounded-md mb-6 animate-pulse" />
                  <div className="space-y-3 pb-2">
                    <div className="w-full bg-warm-border/30 h-1.5 rounded-full overflow-hidden" />
                    <div className="w-full bg-warm-border/30 h-1.5 rounded-full overflow-hidden" />
                    <div className="w-full bg-warm-border/30 h-1.5 rounded-full overflow-hidden" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
