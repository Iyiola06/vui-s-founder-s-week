'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Compass, Shield, Calendar, MapPin } from 'lucide-react';
import { siteConfig } from '@/lib/config';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Orientation', href: '/orientation' },
    { label: 'Schedule', href: '/orientation/schedule' },
    { label: 'Travel Guide', href: '/travel' },
    { label: 'Freshers’ Guide', href: '/freshers-guide' },
    { label: 'Checklist', href: '/checklist' },
    { label: 'Notices', href: '/announcements' },
    { label: 'About', href: '/about' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-sprf-border shadow-sm py-3'
            : 'bg-white/80 backdrop-blur-sm border-b border-sprf-border/60 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark & Official Emblem */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative w-11 h-11 rounded-xl bg-white flex items-center justify-center p-1 shadow-sm border border-sprf-gold/40 group-hover:border-sprf-gold transition-colors overflow-hidden shrink-0">
              <Image
                src={siteConfig.images.logo}
                alt="SPRF Logo - Student Program Representatives Forum"
                fill
                sizes="44px"
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-lg text-sprf-navy tracking-tight group-hover:text-sprf-gold transition-colors leading-tight">
                  SPRF
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-sprf-gold/15 text-sprf-navy border border-sprf-gold/30">
                  Official
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-sprf-muted hidden sm:inline">
                Venite University
              </span>
            </div>
          </Link>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-sprf-charcoal/80">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap transition-colors py-1 relative ${
                    isActive
                      ? 'text-sprf-navy font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-sprf-gold'
                      : 'hover:text-sprf-navy text-sprf-charcoal/70'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/travel"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sprf-navy text-white text-xs font-semibold hover:bg-sprf-blue transition-all shadow-sm hover:shadow-md"
            >
              <Compass className="w-3.5 h-3.5 text-sprf-gold" />
              <span>Plan Your Journey</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-sprf-navy hover:bg-sprf-surface-soft transition-colors"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden pt-20 animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-white border-b border-sprf-border shadow-xl px-6 py-6 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 pb-5 mb-5 border-b border-sprf-border">
              <div className="relative w-12 h-12 rounded-xl bg-white p-1 shadow-xs border border-sprf-gold/30 shrink-0">
                <Image
                  src={siteConfig.images.logo}
                  alt="SPRF Logo"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-base text-sprf-navy leading-tight">
                  SPRF Venite University
                </span>
                <span className="text-[10px] text-sprf-gold font-bold uppercase tracking-wider">
                  Students • Voice • Progress
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1 pb-6 border-b border-sprf-border">
              <span className="text-[11px] uppercase tracking-wider font-bold text-sprf-muted mb-2">
                Navigation
              </span>
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-sprf-navy text-white font-semibold'
                        : 'text-sprf-charcoal hover:bg-sprf-surface'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-6 flex flex-col gap-3">
              <Link
                href="/travel"
                className="w-full py-3 rounded-xl bg-sprf-navy text-white text-sm font-bold flex items-center justify-center gap-2 text-center shadow-md"
              >
                <Compass className="w-4 h-4 text-sprf-gold" />
                <span>Interactive Journey Planner</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <div className="flex items-center justify-between text-xs text-sprf-muted pt-2 px-1">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sprf-gold" /> Iloro-Ekiti, Nigeria
                </span>
                <Link href="/admin/login" className="hover:text-sprf-navy font-medium underline underline-offset-2">
                  Admin Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
