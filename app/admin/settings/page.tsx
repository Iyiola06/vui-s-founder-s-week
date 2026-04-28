import { prisma } from '@/lib/prisma';
import { logDatabaseIssue } from '@/lib/db';
import Link from 'next/link';
import { ArrowLeft, Settings } from 'lucide-react';
import AdminSettingsClient from './AdminSettingsClient';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  let settings: any[] = [];
  try {
    settings = await prisma.siteSetting.findMany();
  } catch (err) {
    logDatabaseIssue('admin settings page', err);
  }

  // Convert settings array into a key-value object
  const settingsObj = settings.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {});

  return (
    <div className="w-full mx-auto min-h-screen bg-cream text-venite-green font-sans overflow-x-hidden">
      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-20">
        <Link href="/admin" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-venite-green hover:text-venite-gold transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Admin Dashboard
        </Link>
        <div className="text-xl font-serif font-medium tracking-tight">
          Site <span className="italic text-venite-gold">Settings</span>
        </div>
      </nav>

      <section className="px-6 py-6 max-w-3xl mx-auto">
        <AdminSettingsClient initialSettings={settingsObj} />
      </section>
    </div>
  );
}
