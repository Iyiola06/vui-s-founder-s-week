import { prisma } from '@/lib/prisma';
import { logDatabaseIssue } from '@/lib/db';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import AdminPaymentsClient from './AdminPaymentsClient';

export const dynamic = 'force-dynamic';

export default async function AdminPaymentsPage() {
  let transactions: any[] = [];
  let candidates: any[] = [];
  try {
    transactions = await prisma.voteTransaction.findMany({
      orderBy: { createdAt: 'desc' },
      include: { candidate: { include: { category: true } } },
    });
    candidates = await prisma.candidate.findMany({
      include: { category: true },
      orderBy: { name: 'asc' },
    });
  } catch (err) {
    logDatabaseIssue('admin payments page', err);
  }

  return (
    <div className="w-full mx-auto min-h-screen bg-cream text-venite-green font-sans overflow-x-hidden">
      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-20">
        <Link href="/admin" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-venite-green hover:text-venite-gold transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Admin Dashboard
        </Link>
        <div className="text-xl font-serif font-medium tracking-tight">
          All <span className="italic text-venite-gold">Payments</span>
        </div>
      </nav>

      <section className="px-6 py-6 max-w-7xl mx-auto">
        <AdminPaymentsClient transactions={transactions} candidates={candidates} />
      </section>
    </div>
  );
}
