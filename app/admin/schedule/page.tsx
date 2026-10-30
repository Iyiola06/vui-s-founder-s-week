import Link from 'next/link';
import { getOrientationDays } from '@/lib/data-store';
import AdminOrientationClient from '../orientation/AdminOrientationClient';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminSchedulePage() {
  const days = await getOrientationDays();

  return (
    <div className="w-full min-h-screen bg-sprf-surface text-sprf-charcoal pb-24">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center border-b border-sprf-border bg-white">
        <Link
          href="/admin"
          className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-sprf-navy hover:text-sprf-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Admin Dashboard</span>
        </Link>
        <div className="text-lg font-serif font-bold text-sprf-navy">
          Schedule & Activity <span className="text-sprf-gold italic">Manager</span>
        </div>
      </nav>

      <section className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        <AdminOrientationClient initialDays={days} />
      </section>
    </div>
  );
}
