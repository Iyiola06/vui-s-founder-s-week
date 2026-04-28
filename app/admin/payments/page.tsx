import { prisma } from '@/lib/prisma';
import { logDatabaseIssue } from '@/lib/db';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminPaymentsPage() {
  let transactions: any[] = [];
  try {
    transactions = await prisma.voteTransaction.findMany({
      orderBy: { createdAt: 'desc' },
      include: { candidate: { include: { category: true } } },
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
        <GlassCard className="bg-white/50 p-8 border-venite-green/5 overflow-hidden">
             <div className="overflow-x-auto">
               <table className="w-full text-left text-xs">
                 <thead>
                   <tr className="border-b border-venite-green/10 text-[10px] uppercase tracking-widest text-venite-green/50">
                     <th className="pb-3 pr-4 font-bold">Ref / Email</th>
                     <th className="pb-3 pr-4 font-bold">Candidate</th>
                     <th className="pb-3 pr-4 font-bold text-right">Votes</th>
                     <th className="pb-3 pr-4 font-bold text-right">Amount</th>
                     <th className="pb-3 pr-4 font-bold">Date</th>
                     <th className="pb-3 font-bold">Status</th>
                   </tr>
                 </thead>
                 <tbody>
                   {transactions.map(tx => (
                     <tr key={tx.id} className="border-b border-venite-green/5 last:border-0 hover:bg-white/50 transition-colors">
                       <td className="py-4 pr-4">
                         <p className="font-mono text-[10px] opacity-60 mb-1">{tx.reference}</p>
                         <p className="font-bold">{tx.email}</p>
                       </td>
                       <td className="py-4 pr-4">
                         <p className="font-bold">{tx.candidate?.name || 'Unknown'}</p>
                         <p className="text-[10px] opacity-60 uppercase tracking-widest">{tx.candidate?.category?.name || 'Deleted Category'}</p>
                       </td>
                       <td className="py-4 pr-4 font-mono font-bold text-right text-lg">{tx.voteQuantity}</td>
                       <td className="py-4 pr-4 font-mono font-bold text-right">NGN {tx.amount.toLocaleString()}</td>
                       <td className="py-4 pr-4 text-[10px] opacity-60 whitespace-nowrap">
                         {new Date(tx.createdAt).toLocaleString()}
                       </td>
                       <td className="py-4 text-right">
                         <span className={`inline-block py-1 px-3 rounded-full text-[10px] uppercase tracking-widest font-bold ${
                           tx.status === 'success' ? 'bg-green-100 text-green-700 border border-green-200' :
                           tx.status === 'failed' ? 'bg-red-100 text-red-700 border border-red-200' :
                           'bg-yellow-100 text-yellow-700 border border-yellow-200'
                         }`}>
                           {tx.status}
                         </span>
                       </td>
                     </tr>
                   ))}
                   {transactions.length === 0 && (
                     <tr>
                       <td colSpan={6} className="text-center py-8 opacity-50">No transactions recorded yet.</td>
                     </tr>
                   )}
                 </tbody>
               </table>
             </div>
          </GlassCard>
      </section>
    </div>
  );
}
