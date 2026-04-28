'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SecondaryButton } from './SecondaryButton';
import { PrimaryButton } from './PrimaryButton';

export function FloatingNav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-4 left-0 right-0 z-50 mx-auto max-w-5xl px-4 sm:px-6 transition-all duration-300",
        )}
      >
        <div className={cn(
          "flex items-center justify-between px-6 py-4 rounded-full transition-all duration-500",
          scrolled ? "bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg shadow-deep-green/5" : "bg-transparent border-transparent"
        )}>
          <div className="flex items-center gap-2">
            <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-text-dark flex items-center gap-3 group">
              <Image
                src="/venite-logo.png"
                alt="Venite University"
                width={158}
                height={61}
                priority
                className="h-10 w-auto object-contain"
              />
              <span className="hidden sm:inline opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300">Founder&apos;s Week</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/programme" className="text-sm font-medium hover:text-champagne-gold transition-colors">Programme</Link>
            <Link href="/voting" className="text-sm font-medium hover:text-champagne-gold transition-colors">Voting</Link>
            <Link href="/dinner-night" className="text-sm font-medium hover:text-champagne-gold transition-colors">Dinner Night</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/voting">
              <button className="px-6 py-2.5 rounded-full text-sm font-medium bg-text-dark text-cream hover:bg-champagne-gold hover:text-text-dark transition-all duration-300 shadow-md">
                Vote Now
              </button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button 
            className="md:hidden flex items-center justify-center p-2 rounded-full hover:bg-black/5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, pointerEvents: mobileMenuOpen ? 'auto' : 'none' }}
        className="fixed inset-0 z-[60] bg-cream-soft/95 backdrop-blur-2xl flex flex-col px-6 py-8"
      >
        <div className="flex justify-end">
          <button 
            className="p-3 rounded-full hover:bg-black/5"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col gap-6 mt-12 px-4">
          <Link href="/programme" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-serif border-b border-warm-border pb-6">Programme</Link>
          <Link href="/voting" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-serif border-b border-warm-border pb-6">Voting</Link>
          <Link href="/dinner-night" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-serif border-b border-warm-border pb-6">Dinner Night</Link>
          <div className="mt-8">
            <Link href="/voting" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full py-4 text-center rounded-full text-lg font-medium bg-text-dark text-cream hover:bg-champagne-gold hover:text-text-dark transition-all duration-300">
                Vote Now
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
}
