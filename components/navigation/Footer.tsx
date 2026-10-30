import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import { MapPin, Mail, Phone, ShieldCheck, Compass, Code, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-sprf-navy text-white/90 pt-16 pb-12 border-t border-sprf-navy/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sprf-deep-navy border border-sprf-gold/30 flex items-center justify-center text-sprf-gold font-serif font-bold text-lg">
                S
              </div>
              <div>
                <span className="font-serif font-bold text-xl text-white block leading-tight">
                  SPRF
                </span>
                <span className="text-xs text-sprf-gold font-medium">
                  Student Programmer Representative Forum
                </span>
              </div>
            </div>

            <p className="text-sm text-white/70 max-w-sm leading-relaxed">
              The premier student technological leadership and orientation facilitation body at{' '}
              <span className="text-white font-medium">Venite University, Iloro-Ekiti</span>. Guiding freshers from home to campus and into successful tech careers.
            </p>

            <div className="pt-2 space-y-2 text-xs text-white/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sprf-gold shrink-0 mt-0.5" />
                <span>KM 2, Ayetoro Road, Iloro-Ekiti, Ekiti State, Nigeria</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sprf-gold shrink-0" />
                <a href={`mailto:${siteConfig.contact.officialEmail}`} className="hover:text-sprf-gold transition-colors">
                  {siteConfig.contact.officialEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sprf-gold shrink-0" />
                <a href={`tel:${siteConfig.contact.emergencyHelpline}`} className="hover:text-sprf-gold transition-colors">
                  {siteConfig.contact.emergencyHelpline} (Arrival Helpline)
                </a>
              </div>
            </div>
          </div>

          {/* Orientation Links */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-sprf-gold mb-4">
              Orientation
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link href="/orientation" className="hover:text-white transition-colors">
                  Programme Overview
                </Link>
              </li>
              <li>
                <Link href="/orientation/schedule" className="hover:text-white transition-colors">
                  Full Timetable
                </Link>
              </li>
              <li>
                <Link href="/freshers-guide" className="hover:text-white transition-colors">
                  Freshers’ Guide
                </Link>
              </li>
              <li>
                <Link href="/checklist" className="hover:text-white transition-colors">
                  Arrival Checklist
                </Link>
              </li>
              <li>
                <Link href="/announcements" className="hover:text-white transition-colors">
                  Official Notices
                </Link>
              </li>
            </ul>
          </div>

          {/* Travel & Guides */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-sprf-gold mb-4">
              Travel & Support
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link href="/travel" className="hover:text-white transition-colors flex items-center gap-1">
                  Journey Planner <Compass className="w-3 h-3 text-sprf-gold" />
                </Link>
              </li>
              <li>
                <Link href="/travel/transport" className="hover:text-white transition-colors">
                  Regional Bus Routes
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Student FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Helpdesk & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Admin */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-sprf-gold mb-4">
              Organization
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About SPRF
                </Link>
              </li>
              <li>
                <Link href="/leadership" className="hover:text-white transition-colors">
                  Executive Council
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-sprf-gold transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Admin Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>© 2026 SPRF — Student Programmer Representative Forum, Venite University. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-white/70">
              <span className="w-2 h-2 rounded-full bg-sprf-gold inline-block" />
              West Africa Time (WAT, UTC+1)
            </span>
            <span>·</span>
            <span>Iloro-Ekiti, Nigeria</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
