'use client';

import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { User, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface Candidate {
  id: string;
  name: string;
  department: string | null;
  level: string | null;
  voteCount: number;
}

interface Category {
  id: string;
  name: string;
  pricePerVote: number;
  candidates: Candidate[];
}

export default function VotingClient({ initialCategories }: { initialCategories: Category[] }) {
  const searchParams = useSearchParams();
  const paymentReference = searchParams.get('reference');

  const [categories] = useState<Category[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(categories[0] || null);
  
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [voteQuantity, setVoteQuantity] = useState<number>(1);
  const [voterName, setVoterName] = useState('');
  const [voterEmail, setVoterEmail] = useState('');
  
  const [isPaying, setIsPaying] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<{status: 'idle' | 'success' | 'failed', message?: string}>({
    status: paymentReference ? 'idle' : 'idle'
  });

  React.useEffect(() => {
    if (paymentReference) {
      fetch(`/api/paystack/verify?reference=${paymentReference}`)
        .then(res => res.json())
        .then(data => {
          if(data.status === 'success') {
            setPaymentStatus({status: 'success', message: 'Your payment was successful and votes have been recorded.'});
          } else {
             setPaymentStatus({status: 'failed', message: 'Payment verification failed.'});
          }
        })
        .catch(() => setPaymentStatus({status: 'failed', message: 'Failed to verify payment.'}))
    }
  }, [paymentReference]);

  const handleVoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !selectedCandidate || voteQuantity < 1) return;
    
    setIsPaying(true);
    setPaymentStatus({ status: 'idle' });

    try {
      const res = await fetch('/api/paystack/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryId: selectedCategory.id,
          candidateId: selectedCandidate.id,
          voteQuantity,
          voterName,
          voterEmail,
        })
      });
      
      const data = await res.json();
      
      if (data.authorizationUrl) {
         window.location.href = data.authorizationUrl;
      } else {
         setPaymentStatus({ status: 'failed', message: data.error || 'Failed to initialize payment' });
         setIsPaying(false);
      }
    } catch (err) {
      setPaymentStatus({ status: 'failed', message: 'A network error occurred' });
      setIsPaying(false);
    }
  };

  if (categories.length === 0) {
    return (
      <div className="glass-panel p-16 text-center rounded-[32px] max-w-2xl mx-auto">
        <h3 className="text-2xl font-serif text-text-dark mb-2">No Categories Available</h3>
        <p className="text-muted-text">Voting has not opened for any categories yet.</p>
      </div>
    );
  }

  const chartData = selectedCategory?.candidates.map(c => ({
    name: c.name,
    votes: c.voteCount
  })) || [];

  return (
    <div className="flex flex-col gap-12">
      
      {paymentStatus.status === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-2xl flex items-center gap-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
          <div>
            <h3 className="font-bold">Payment Successful</h3>
            <p className="text-sm opacity-80">{paymentStatus.message}</p>
          </div>
        </div>
      )}

      {paymentStatus.status === 'failed' && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-2xl flex items-center gap-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
          <div>
            <h3 className="font-bold">Payment Error</h3>
            <p className="text-sm opacity-80">{paymentStatus.message}</p>
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex overflow-x-auto pb-4 gap-3 scrollbar-hide snap-x">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => { setSelectedCategory(cat); setSelectedCandidate(null); }}
            className={`snap-start px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-all shadow-sm ${
              selectedCategory?.id === cat.id 
              ? 'bg-deep-green text-cream shadow-deep-green/20 scale-100 ring-2 ring-deep-green ring-offset-2 ring-offset-cream' 
              : 'bg-white border border-warm-border text-text-dark hover:border-champagne-gold hover:bg-cream-soft scale-[0.98]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* Candidates Grid */}
        <div className="xl:col-span-8 flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-serif text-text-dark">{selectedCategory?.name} Nominees</h2>
            <span className="text-[10px] uppercase font-bold tracking-widest text-muted-text bg-white px-3 py-1 rounded-full border border-warm-border">
              {selectedCategory?.candidates.length} Total
            </span>
          </div>
          
          {selectedCategory?.candidates.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-[32px]">
              <p className="text-muted-text font-medium">There are no candidates in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedCategory?.candidates.map(candidate => (
                <div 
                  key={candidate.id}
                  onClick={() => setSelectedCandidate(candidate)}
                  className={`p-6 rounded-[24px] border-2 transition-all cursor-pointer flex flex-col justify-between h-full min-h-[200px] ${
                    selectedCandidate?.id === candidate.id 
                    ? 'border-champagne-gold bg-champagne-gold/5 shadow-lg shadow-champagne-gold/10 transform scale-[1.02]' 
                    : 'border-white glass-panel hover:border-champagne-gold/40 hover:bg-white/80'
                  }`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-[20px] bg-champagne-gold/10 border border-champagne-gold/20 flex flex-col items-center justify-center shrink-0">
                      <span className="font-serif text-2xl text-deep-green leading-none mb-0.5">{candidate.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-serif text-xl text-text-dark leading-tight mb-1">{candidate.name}</h4>
                      {(candidate.department || candidate.level) && (
                        <p className="text-[10px] uppercase font-bold text-muted-text tracking-widest">
                          {candidate.department} {candidate.level ? `- ${candidate.level}` : ''}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end pt-4 border-t border-warm-border/50">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest block text-muted-text mb-1">Current Votes</span>
                      <span className="font-serif text-3xl text-deep-green leading-none">{candidate.voteCount}</span>
                    </div>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                       selectedCandidate?.id === candidate.id ? 'bg-champagne-gold border-champagne-gold text-white' : 'border-warm-border text-transparent bg-white'
                    }`}>
                       <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results Chart */}
          {selectedCategory && selectedCategory.candidates.length > 0 && (
            <div className="mt-8 p-8 md:p-10 glass-panel rounded-[32px]">
              <h3 className="text-[10px] uppercase tracking-widest font-bold text-muted-text mb-8">Live Standings</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }} barCategoryGap="20%">
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 13, fill: '#1F211C', fontFamily: 'serif' }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      cursor={{fill: 'transparent'}}
                      contentStyle={{ borderRadius: '16px', border: '1px solid #E8DDC7', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)', backgroundColor: '#FDFCF8', color: '#1F211C', padding: '12px 16px' }}
                      itemStyle={{ color: '#0F5132', fontWeight: 600, fontFamily: 'serif', fontSize: '18px' }}
                    />
                    <Bar dataKey="votes" radius={[0, 8, 8, 0]} barSize={24} background={{ fill: '#e8ddc7', opacity: 0.3, radius: 8 }}>
                       {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.name === selectedCandidate?.name ? '#C9A227' : '#0F5132'} fillOpacity={entry.name === selectedCandidate?.name ? 1 : 0.4} />
                        ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* Voting Form Sidebar */}
        <div className="xl:col-span-4 mt-12 xl:mt-0">
          <div className="sticky top-32">
            <div className="glass-panel p-8 md:p-10 rounded-[32px] border-white/80 shadow-xl shadow-deep-green/5">
              <h3 className="font-serif text-3xl text-text-dark mb-8 pb-6 border-b border-warm-border">Cast Your Vote</h3>
              
              {!selectedCandidate ? (
                <div className="text-center py-16 px-4">
                  <div className="w-20 h-20 bg-white border border-warm-border rounded-[24px] flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <User className="w-8 h-8 text-muted-text opacity-50" />
                  </div>
                  <p className="text-muted-text font-medium text-sm">Select a candidate from the grid to proceed with your premium vote.</p>
                </div>
              ) : (
                <form onSubmit={handleVoteSubmit} className="flex flex-col gap-8">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-muted-text tracking-widest block mb-3">Selected Nominee</label>
                    <div className="font-serif text-2xl text-deep-green bg-white p-4 rounded-2xl border border-warm-border">{selectedCandidate.name}</div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-muted-text tracking-widest block mb-3">Number of Votes</label>
                    <div className="flex items-center gap-4 bg-white p-2 border border-warm-border rounded-2xl">
                       <button type="button" onClick={() => setVoteQuantity(Math.max(1, voteQuantity - 1))} className="w-12 h-12 rounded-xl bg-cream-soft text-text-dark text-xl flex items-center justify-center hover:bg-warm-border transition-colors">-</button>
                       <input 
                         type="number" 
                         min="1" 
                         value={voteQuantity} 
                         onChange={(e) => setVoteQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                         className="flex-1 text-center bg-transparent font-serif text-3xl focus:outline-none"
                       />
                       <button type="button" onClick={() => setVoteQuantity(voteQuantity + 1)} className="w-12 h-12 rounded-xl bg-cream-soft text-text-dark text-xl flex items-center justify-center hover:bg-warm-border transition-colors">+</button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-warm-border/50">
                    <label className="text-[10px] uppercase font-bold text-muted-text tracking-widest block mb-3">Your Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={voterName}
                      onChange={(e) => setVoterName(e.target.value)}
                      className="w-full bg-white border border-warm-border focus:border-champagne-gold focus:ring-4 focus:ring-champagne-gold/10 rounded-2xl px-5 py-4 text-sm transition-all outline-none"
                      placeholder="e.g. Adebayo Kunle"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-muted-text tracking-widest block mb-3">Your Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={voterEmail}
                      onChange={(e) => setVoterEmail(e.target.value)}
                      className="w-full bg-white border border-warm-border focus:border-champagne-gold focus:ring-4 focus:ring-champagne-gold/10 rounded-2xl px-5 py-4 text-sm transition-all outline-none"
                      placeholder="e.g. kunle@example.com"
                    />
                  </div>

                  <div className="bg-deep-green p-6 rounded-2xl mt-4 flex flex-col gap-2 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 group-hover:scale-150 transition-transform duration-700" />
                     <span className="text-[10px] font-bold uppercase tracking-widest text-cream/70 relative z-10">Total Required</span>
                     <span className="font-serif text-4xl text-champagne-gold relative z-10 flex items-center gap-2">
                       <span className="text-2xl font-sans text-cream/50">NGN</span>
                       {(voteQuantity * (selectedCategory?.pricePerVote || 500)).toLocaleString()}
                     </span>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isPaying} 
                    className="w-full py-5 rounded-full bg-champagne-gold text-deep-green font-bold text-sm tracking-wide hover:bg-[#D4AC2A] transition-colors shadow-lg shadow-champagne-gold/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isPaying ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Processing Payment...</>
                    ) : (
                      'Proceed to Paystack'
                    )}
                  </button>
                  
                  <p className="text-[10px] text-center text-muted-text px-4 leading-relaxed">
                    By proceeding, you agree to our voting rules. Transactions are secured by Paystack and non-refundable.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
