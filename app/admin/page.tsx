import { prisma } from '@/lib/prisma';
import { logDatabaseIssue } from '@/lib/db';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ArrowLeft, Users, CheckCircle2, Ticket, Settings } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  let stats = {
    totalRevenue: 0,
    totalVotes: 0,
    transactions: 0,
    candidates: 0,
    categories: 0,
  };

  let recentTransactions: any[] = [];
  let categories: any[] = [];
  let isDbConnected = true;

  try {
    const transactions = await prisma.voteTransaction.findMany({
      orderBy: { createdAt: 'desc' },
      include: { candidate: { include: { category: true } } },
      take: 20,
    });

    categories = await prisma.votingCategory.findMany({
      include: {
        _count: { select: { candidates: true } },
        candidates: {
          orderBy: { voteCount: 'desc' },
        }
      },
      orderBy: { name: 'asc' },
    });

    const successTransactions = await prisma.voteTransaction.findMany({
      where: { status: 'success' },
    });

    stats.transactions = await prisma.voteTransaction.count();
    stats.totalRevenue = successTransactions.reduce((acc, curr) => acc + curr.amount, 0);
    stats.totalVotes = successTransactions.reduce((acc, curr) => acc + curr.voteQuantity, 0);
    stats.categories = categories.length;
    stats.candidates = categories.reduce((acc, curr) => acc + curr.candidates.length, 0);
    
    recentTransactions = transactions;
  } catch (error) {
    logDatabaseIssue('admin dashboard data', error);
    isDbConnected = false;
  }

  return (
    <div className="w-full mx-auto min-h-screen bg-cream text-venite-green font-sans overflow-x-hidden">
      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-20">
        <Link href="/" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-venite-green hover:text-venite-gold transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Site
        </Link>
        <div className="text-xl font-serif font-medium tracking-tight">
          Admin <span className="italic text-venite-gold">Dashboard</span>
        </div>
      </nav>

      <section className="px-6 py-6 max-w-7xl mx-auto">
        {!isDbConnected && (
          <div className="bg-red-50 text-red-800 px-6 py-4 rounded-2xl text-sm font-medium mb-8">
            Database connection failed. Please configure DATABASE_URL.
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link href="/admin/payments">
            <GlassCard className="bg-white/60 p-6 flex items-center gap-4 border-venite-green/5 hover:border-venite-gold/50 hover:bg-white/80 transition-all cursor-pointer h-full">
              <div className="w-12 h-12 bg-venite-green/10 text-venite-green rounded-full flex items-center justify-center shrink-0">
                <span className="font-serif text-xl border">NGN</span>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-50">Total Revenue</p>
                <p className="text-2xl font-serif">NGN {stats.totalRevenue.toLocaleString()}</p>
              </div>
            </GlassCard>
          </Link>
          
          <Link href="/admin/payments">
            <GlassCard className="bg-white/60 p-6 flex items-center gap-4 border-venite-green/5 hover:border-venite-gold/50 hover:bg-white/80 transition-all cursor-pointer h-full">
              <div className="w-12 h-12 bg-venite-green/10 text-venite-green rounded-full flex items-center justify-center shrink-0">
                <Ticket className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-50">Paid Votes</p>
                <p className="text-2xl font-serif">{stats.totalVotes.toLocaleString()}</p>
              </div>
            </GlassCard>
          </Link>

          <Link href="/admin/categories">
            <GlassCard className="bg-white/60 p-6 flex items-center gap-4 border-venite-green/5 hover:border-venite-gold/50 hover:bg-white/80 transition-all cursor-pointer h-full">
              <div className="w-12 h-12 bg-venite-green/10 text-venite-green rounded-full flex items-center justify-center shrink-0">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-50">Categories</p>
                <p className="text-2xl font-serif">{stats.categories}</p>
              </div>
            </GlassCard>
          </Link>

          <Link href="/admin/candidates">
            <GlassCard className="bg-white/60 p-6 flex items-center gap-4 border-venite-green/5 hover:border-venite-gold/50 hover:bg-white/80 transition-all cursor-pointer h-full">
              <div className="w-12 h-12 bg-venite-green/10 text-venite-green rounded-full flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-50">Candidates</p>
                <p className="text-2xl font-serif">{stats.candidates}</p>
              </div>
            </GlassCard>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link href="/admin/events">
            <PrimaryButton className="text-xs">Manage Programme Events</PrimaryButton>
          </Link>
          <Link href="/admin/categories">
             <PrimaryButton className="text-xs bg-venite-green/10 text-venite-green hover:bg-venite-green/20">Manage Categories</PrimaryButton>
          </Link>
          <Link href="/admin/candidates">
             <PrimaryButton className="text-xs bg-venite-green/10 text-venite-green hover:bg-venite-green/20">Manage Candidates</PrimaryButton>
          </Link>
          <Link href="/admin/payments">
             <PrimaryButton className="text-xs bg-venite-green/10 text-venite-green hover:bg-venite-green/20">View All Payments</PrimaryButton>
          </Link>
          <Link href="/admin/settings">
             <PrimaryButton className="text-xs bg-venite-green/10 text-venite-green hover:bg-venite-green/20">Site Settings</PrimaryButton>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Categories & Results */}
          <GlassCard className="bg-white/50 p-8 border-venite-green/5 overflow-hidden">
             <h2 className="text-xl font-serif mb-6 text-venite-green">Live Vote Results</h2>
             <div className="flex flex-col gap-6 max-h-[600px] overflow-y-auto pr-2 scrollbar-hide">
               {categories.length === 0 ? (
                 <p className="text-sm opacity-50">No categories found.</p>
               ) : (
                 categories.map(cat => (
                   <div key={cat.id} className="border border-venite-green/10 rounded-2xl p-5 bg-white shadow-sm">
                     <div className="flex justify-between items-center mb-4">
                       <h3 className="font-bold text-sm text-venite-green">{cat.name}</h3>
                       <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-sm ${cat.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                         {cat.isOpen ? 'Voting Open' : 'Closed'}
                       </span>
                     </div>
                     <div className="flex flex-col gap-2">
                       {cat.candidates.length === 0 ? (
                         <p className="text-xs opacity-40">No candidates added.</p>
                       ) : (
                         cat.candidates.map((cand: any, idx: number) => (
                           <div key={cand.id} className="flex justify-between items-center text-xs p-2 bg-venite-green/5 rounded-lg">
                             <div className="flex items-center gap-3">
                                <span className="font-bold opacity-30 w-4">{idx + 1}</span>
                                <span>{cand.name}</span>
                             </div>
                             <span className="font-mono font-bold text-venite-green bg-venite-gold/20 px-2 py-0.5 rounded">{cand.voteCount}</span>
                           </div>
                         ))
                       )}
                     </div>
                   </div>
                 ))
               )}
             </div>
          </GlassCard>

          {/* Recent Transactions */}
          <GlassCard className="bg-white/50 p-8 border-venite-green/5 overflow-hidden">
             <h2 className="text-xl font-serif mb-6 text-venite-green">Recent Transactions</h2>
             <div className="overflow-x-auto">
               <table className="w-full text-left text-xs">
                 <thead>
                   <tr className="border-b border-venite-green/10 text-[10px] uppercase tracking-widest text-venite-green/50">
                     <th className="pb-3 pr-4 font-bold">Ref / Email</th>
                     <th className="pb-3 pr-4 font-bold">Candidate</th>
                     <th className="pb-3 pr-4 font-bold text-right">Votes</th>
                     <th className="pb-3 pr-4 font-bold text-right">Amount</th>
                     <th className="pb-3 font-bold">Status</th>
                   </tr>
                 </thead>
                 <tbody>
                   {recentTransactions.map(tx => (
                     <tr key={tx.id} className="border-b border-venite-green/5 last:border-0 hover:bg-white/50 transition-colors">
                       <td className="py-3 pr-4 truncate max-w-[120px]">
                         <p className="font-mono truncate">{tx.reference.substring(0, 16)}...</p>
                         <p className="opacity-60 truncate">{tx.email}</p>
                       </td>
                       <td className="py-3 pr-4">
                         <p className="font-bold">{tx.candidate?.name || 'Unknown'}</p>
                         <p className="text-[10px] opacity-60 uppercase tracking-widest truncate">{tx.candidate?.category?.name}</p>
                       </td>
                       <td className="py-3 pr-4 font-mono font-bold text-right">{tx.voteQuantity}</td>
                       <td className="py-3 pr-4 font-mono font-bold text-right">NGN {tx.amount}</td>
                       <td className="py-3 text-right">
                         <span className={`inline-block py-0.5 px-2 rounded-full text-[10px] uppercase tracking-widest font-bold ${
                           tx.status === 'success' ? 'bg-green-100 text-green-700' :
                           tx.status === 'failed' ? 'bg-red-100 text-red-700' :
                           'bg-yellow-100 text-yellow-700'
                         }`}>
                           {tx.status}
                         </span>
                       </td>
                     </tr>
                   ))}
                   {recentTransactions.length === 0 && (
                     <tr>
                       <td colSpan={5} className="text-center py-8 opacity-50">No transactions recorded yet.</td>
                     </tr>
                   )}
                 </tbody>
               </table>
             </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
