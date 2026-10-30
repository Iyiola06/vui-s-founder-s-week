import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { LogOut, Home, Shield } from 'lucide-react';
import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from '@/lib/admin-auth';
import { siteConfig } from '@/lib/seo';

export const metadata: Metadata = {
  title: {
    default: 'SPRF Admin',
    template: `%s | SPRF Admin | ${siteConfig.name}`,
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      nosnippet: true,
    },
  },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const hasSession = await isValidAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);

  return (
    <div className="min-h-screen bg-sprf-surface text-sprf-charcoal font-sans selection:bg-sprf-gold/30 selection:text-sprf-navy">
      {hasSession && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
          <Link
            href="/"
            className="inline-flex h-11 px-4 items-center gap-2 rounded-full border border-sprf-border bg-white/95 text-sprf-navy text-xs font-bold shadow-lg shadow-sprf-navy/5 backdrop-blur transition-all hover:bg-sprf-navy hover:text-white"
            title="View Public Site"
          >
            <Home className="h-4 w-4 text-sprf-gold" />
            <span>Public Site</span>
          </Link>
          <Link
            href="/admin/logout"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sprf-border bg-white/95 text-sprf-navy shadow-lg shadow-sprf-navy/5 backdrop-blur transition-all hover:bg-red-600 hover:text-white hover:border-red-600"
            title="Sign out of Admin"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      )}
      {children}
    </div>
  );
}
