import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { logDatabaseIssue } from '@/lib/db';
import { FloatingNav } from '@/components/ui/FloatingNav';
import { Footer } from '@/components/ui/Footer';
import { ArrowLeft, MapPin, Clock, Calendar, Star, ShieldCheck, CheckCircle2, Music, Wine, Award } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DinnerNightPage() {
  let categories: any[] = [];
  try {
    categories = await prisma.votingCategory.findMany({
      where: { isOpen: true },
      orderBy: { name: 'asc' }
    });
  } catch (error) {
    logDatabaseIssue('dinner night page categories', error);
  }

  return (
    <div className="w-full min-h-screen bg-deep-green text-cream font-sans overflow-x-hidden selection:bg-champagne-gold selection:text-deep-green">
      <FloatingNav />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden min-h-[90vh] flex flex-col items-center justify-center text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] h-[80vw] max-h-[800px] radial-glow-gold rounded-full opacity-20 pointer-events-none blur-3xl" />
        
        <div className="z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-champagne-gold/30 bg-champagne-gold/5 backdrop-blur-md mb-8">
            <Star className="w-4 h-4 text-champagne-gold" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-champagne-gold">The Grand Finale</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif tracking-tighter leading-[1.05] mb-8">
            Dinner & <br/>
            <span className="italic text-champagne-gold">Awards</span> Night
          </h1>
          
          <p className="text-lg md:text-2xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed mb-12">
            A refined evening of celebration, recognition, elegance, and community to close out Founder&apos;s Week.
          </p>

          <Link href="/voting">
            <button className="px-10 py-5 rounded-full bg-champagne-gold text-deep-green font-bold text-sm tracking-wide hover:bg-white hover:-translate-y-1 transition-all shadow-xl shadow-champagne-gold/10">
              Vote for Awards
            </button>
          </Link>
        </div>
      </section>

      {/* Event Details Bento */}
      <section className="py-20 px-6 max-w-6xl mx-auto relative z-20 -mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel-dark p-8 rounded-[32px] flex flex-col justify-end h-64 border-white/10 group">
            <Calendar className="w-8 h-8 text-champagne-gold mb-auto opacity-50 group-hover:opacity-100 transition-opacity" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2">Date</span>
            <p className="font-serif text-3xl">Saturday Night</p>
          </div>
          <div className="glass-panel-dark p-8 rounded-[32px] flex flex-col justify-end h-64 border-white/10 group">
            <Clock className="w-8 h-8 text-champagne-gold mb-auto opacity-50 group-hover:opacity-100 transition-opacity" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2">Time</span>
            <p className="font-serif text-3xl">7:00 PM</p>
          </div>
          <div className="glass-panel-dark p-8 rounded-[32px] flex flex-col justify-end h-64 border-white/10 group">
            <MapPin className="w-8 h-8 text-champagne-gold mb-auto opacity-50 group-hover:opacity-100 transition-opacity" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2">Venue</span>
            <p className="font-serif text-3xl text-white/80 text-xl">Main University Hall</p>
          </div>
          <div className="glass-panel-dark p-8 rounded-[32px] flex flex-col justify-end h-64 border-champagne-gold/30 bg-gradient-to-br from-champagne-gold/10 to-transparent group">
            <Star className="w-8 h-8 text-champagne-gold mb-auto opacity-50 group-hover:opacity-100 transition-opacity" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-champagne-gold/60 mb-2">Dress Code</span>
            <p className="font-serif text-3xl text-champagne-gold">Elegant & Formal</p>
          </div>
        </div>
      </section>

      {/* Categories of Excellence */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif tracking-tight mb-6 mt-12">Excellence Recognized</h2>
          <p className="text-white/60 max-w-xl mx-auto text-lg leading-relaxed">
            Discover the prestigious awards to be presented. Your premium vote decides the winners of the night.
          </p>
        </div>
        
        {categories.length === 0 ? (
          <div className="text-center text-white/40 font-serif italic text-xl">Categories will be announced soon.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="p-8 rounded-[32px] glass-panel-dark border-white/10 hover:border-champagne-gold/30 transition-colors group cursor-default">
                <h3 className="font-serif text-3xl text-cream mb-4 group-hover:text-champagne-gold transition-colors">{category.name}</h3>
                <p className="text-sm text-white/40 leading-relaxed font-light">{category.description}</p>
                <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-champagne-gold">Vote Now</span>
                  <ArrowLeft className="w-4 h-4 text-champagne-gold rotate-180" />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-20 text-center">
          <Link href="/voting">
             <button className="px-8 py-4 bg-transparent border border-white/20 text-cream rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/5 hover:border-champagne-gold/50 transition-all">
               Begin Voting
             </button>
          </Link>
        </div>
      </section>

      {/* Programme Section */}
      <section className="py-32 bg-cream text-text-dark border-t border-warm-border/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] radial-glow rounded-full opacity-40 -translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-6">Evening Timeline</h2>
            <p className="text-muted-text max-w-md mx-auto">An exquisite sequence of events for the grand finale.</p>
          </div>

          <div className="space-y-12 relative">
            <div className="absolute left-[39px] top-8 bottom-8 w-[2px] bg-warm-border/50"></div>
            
            <div className="flex gap-12 relative z-10 items-start group">
              <div className="w-20 h-20 rounded-full bg-cream border-4 border-cream flex items-center justify-center shrink-0 shadow-[0_0_0_2px_theme(colors.warm.border)] group-hover:shadow-[0_0_0_2px_theme(colors.deep.green)] transition-shadow">
                <Wine className="w-8 h-8 text-deep-green" />
              </div>
              <div className="pt-5">
                <h4 className="text-3xl font-serif text-text-dark mb-3">Arrival & Red Carpet</h4>
                <p className="text-base text-muted-text">Guests arrive and take photos on the red carpet. Welcome drinks served.</p>
              </div>
            </div>

            <div className="flex gap-12 relative z-10 items-start group">
              <div className="w-20 h-20 rounded-full bg-cream border-4 border-cream flex items-center justify-center shrink-0 shadow-[0_0_0_2px_theme(colors.warm.border)] group-hover:shadow-[0_0_0_2px_theme(colors.deep.green)] transition-shadow">
                <Music className="w-8 h-8 text-deep-green" />
              </div>
              <div className="pt-5">
                <h4 className="text-3xl font-serif text-text-dark mb-3">Dinner Commences</h4>
                <p className="text-base text-muted-text">A curated three-course meal begins with light ambient music.</p>
              </div>
            </div>

            <div className="flex gap-12 relative z-10 items-start group">
              <div className="w-20 h-20 rounded-full bg-cream border-4 border-cream flex items-center justify-center shrink-0 shadow-[0_0_0_2px_theme(colors.warm.border)] group-hover:shadow-[0_0_0_2px_theme(colors.champagne.gold)] transition-shadow">
                <Award className="w-8 h-8 text-champagne-gold" />
              </div>
              <div className="pt-5">
                <h4 className="text-3xl font-serif text-champagne-gold mb-3">Awards Presentation</h4>
                <p className="text-base text-muted-text">Winners for Founder&apos;s Week categories are announced and celebrated.</p>
              </div>
            </div>

            <div className="flex gap-12 relative z-10 items-start group">
              <div className="w-20 h-20 rounded-full bg-cream border-4 border-cream flex items-center justify-center shrink-0 shadow-[0_0_0_2px_theme(colors.warm.border)] group-hover:shadow-[0_0_0_2px_theme(colors.deep.green)] transition-shadow">
                <Star className="w-8 h-8 text-deep-green" />
              </div>
              <div className="pt-5">
                <h4 className="text-3xl font-serif text-text-dark mb-3">Entertainment & Toast</h4>
                <p className="text-base text-muted-text">Live performances, networking, and the final toast to the future.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voting CTA Panel */}
      <section className="py-24 px-6 max-w-5xl mx-auto mb-20 relative z-10">
        <div className="bg-deep-green border border-champagne-gold/20 rounded-[32px] p-12 text-center shadow-2xl shadow-deep-green/50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] radial-glow-gold rounded-full opacity-20 -translate-y-1/2 translate-x-1/4 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
          
          <div className="relative z-10">
            <h3 className="font-serif text-4xl md:text-5xl text-cream mb-6">Your vote shapes the night.</h3>
            <p className="text-white/60 mb-10 max-w-md mx-auto text-lg font-light">
              Securely cast your vote to crown the finest of Founder&apos;s Week.
            </p>
            
            <Link href="/voting">
              <button className="px-10 py-5 rounded-full bg-champagne-gold text-deep-green font-bold text-sm tracking-wide hover:bg-white hover:-translate-y-1 transition-all shadow-xl shadow-champagne-gold/10 inline-flex items-center gap-3">
                <ShieldCheck className="w-5 h-5" />
                Vote Securely
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
