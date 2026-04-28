import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-text-dark text-cream pt-24 pb-12 mt-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] radial-glow-gold rounded-full opacity-20 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          <div className="lg:col-span-2">
            <Image
              src="/venite-logo.png"
              alt="Venite University"
              width={316}
              height={121}
              className="mb-6 h-16 w-auto object-contain brightness-0 invert"
            />
            <h3 className="text-3xl font-serif mb-6 text-cream-soft tracking-tight">Founder&apos;s Week 2026</h3>
            <p className="text-white/60 max-w-sm mb-8 text-sm">
              A celebration of academic excellence, talent, culture, and thanksgiving in Iloro-Ekiti.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-6">Explore</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/80">
              <li><Link href="/" className="hover:text-champagne-gold transition-colors">Home</Link></li>
              <li><Link href="/programme" className="hover:text-champagne-gold transition-colors">Programme</Link></li>
              <li><Link href="/voting" className="hover:text-champagne-gold transition-colors">Awards Voting</Link></li>
              <li><Link href="/dinner-night" className="hover:text-champagne-gold transition-colors">Dinner Night</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-6">Actions</h4>
            <div className="flex flex-col gap-4">
              <Link href="/voting">
                <button className="flex items-center justify-between w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-champagne-gold/50 transition-all group">
                  <span className="text-sm font-medium">Vote Now</span>
                  <ArrowRight className="w-4 h-4 text-champagne-gold group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40 font-medium">
          <p>(c) {new Date().getFullYear()} Venite University Iloro-Ekiti.</p>
          <div className="flex gap-6">
            <span>Built by SulvaTech</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
