import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from '@/lib/admin-auth';
import { siteConfig } from '@/lib/seo';

export const metadata: Metadata = {
  title: {
    default: 'Admin',
    template: `%s | Admin | ${siteConfig.name}`,
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
    <div className="min-h-screen bg-[#FDFCF8] text-[#1F211C] font-sans selection:bg-[#C9A227] selection:text-[#1F211C]">
      {hasSession && (
        <Link
          href="/admin/logout"
          className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-venite-green/10 bg-white/90 text-venite-green shadow-lg shadow-venite-green/10 backdrop-blur transition-colors hover:bg-venite-green hover:text-cream"
          title="Sign out"
          aria-label="Sign out"
        >
          <LogOut className="h-5 w-5" />
        </Link>
      )}
      {children}
    </div>
  );
}
