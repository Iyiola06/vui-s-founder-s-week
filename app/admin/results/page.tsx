import { prisma } from '@/lib/prisma';
import { logDatabaseIssue } from '@/lib/db';
import Link from 'next/link';
import { ArrowLeft, Trophy } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export const dynamic = 'force-dynamic';

export default async function AdminResultsPage() {
  let categories: any[] = [];
  try {
    categories = await prisma.votingCategory.findMany({
      include: {
        candidates: {
          orderBy: { voteCount: 'desc' },
        }
      },
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    logDatabaseIssue('admin results page', error);
  }

  return (
    <div className="w-full mx-auto min-h-screen bg-cream text-venite-green font-sans overflow-x-hidden">
      <nav className="max-w-5xl mx-auto px-6 py-8 flex justify-between items-center relative z-20">
        <Link href="/admin" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-venite-green hover:text-venite-gold transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>
        <div className="text-xl font-serif font-medium tracking-tight">
          Voting <span className="italic text-venite-gold">Results</span>
        </div>
      </nav>

      <div className="px-6 py-6 max-w-5xl mx-auto space-y-12 mb-20">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-serif text-venite-green mb-2">Live Rankings</h1>
            <p className="text-sm opacity-60">Real-time candidate standings based on verified Paystack transactions.</p>
          </div>
          <button className="px-5 py-2.5 bg-venite-green text-cream rounded-full text-xs uppercase tracking-widest font-bold hover:bg-venite-gold transition-colors flex items-center gap-2">
            <Trophy className="w-4 h-4" /> Export Report
          </button>
        </div>

        {categories.length === 0 ? (
          <GlassCard className="p-12 text-center text-sm opacity-50 bg-white/50">
            No categories available to show results.
          </GlassCard>
        ) : (
          categories.map((category) => {
            const totalVotes = category.candidates.reduce((sum: number, c: any) => sum + c.voteCount, 0);
            
            return (
              <GlassCard key={category.id} className="bg-white/50 border-venite-green/5 p-8">
                <div className="flex justify-between items-baseline mb-6 border-b border-venite-green/10 pb-4">
                  <h2 className="text-2xl font-serif text-venite-green">{category.name}</h2>
                  <span className="text-sm font-mono font-bold text-venite-gold bg-venite-gold/10 px-3 py-1 rounded-full">{totalVotes} Total Votes</span>
                </div>
                
                <div className="space-y-6">
                  {category.candidates.length === 0 ? (
                    <p className="text-sm opacity-40 italic">No candidates in this category.</p>
                  ) : (
                    category.candidates.map((candidate: any, index: number) => {
                      const percentage = totalVotes > 0 ? (candidate.voteCount / totalVotes) * 100 : 0;
                      return (
                        <div key={candidate.id} className="relative">
                          <div className="flex justify-between items-center mb-2 z-10 relative">
                            <div className="flex items-center gap-4">
                              <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${index === 0 ? 'bg-venite-gold text-cream' : 'bg-venite-green/10 text-venite-green'}`}>
                                {index + 1}
                              </span>
                              <span className="font-bold text-venite-green">{candidate.name}</span>
                              <span className="text-[10px] uppercase tracking-widest opacity-50 hidden sm:inline-block">
                                {candidate.department} {candidate.level ? `- ${candidate.level}` : ''}
                              </span>
                            </div>
                            <span className="font-mono font-bold text-venite-green text-lg">{candidate.voteCount}</span>
                          </div>
                          
                          {/* Premium Bar */}
                          <div className="w-full bg-venite-green/5 rounded-full h-3 overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ${index === 0 ? 'bg-venite-gold' : 'bg-venite-green'}`}
                              style={{ width: `${Math.max(percentage, 1)}%` }} // Minimum 1% to show bar slightly
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </GlassCard>
            );
          })
        )}
      </div>
    </div>
  );
}
