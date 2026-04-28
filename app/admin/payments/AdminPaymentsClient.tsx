'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Edit2 } from 'lucide-react';
import { updateVoteTransaction } from '../actions';
import { useRouter } from 'next/navigation';

type PaymentFormData = {
  email: string;
  amount: string;
  voteQuantity: string;
  status: string;
  candidateId: string;
};

const statuses = ['pending', 'success', 'failed', 'abandoned'];

export default function AdminPaymentsClient({ transactions, candidates }: { transactions: any[], candidates: any[] }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<PaymentFormData>({
    email: '',
    amount: '',
    voteQuantity: '1',
    status: 'pending',
    candidateId: candidates[0]?.id || '',
  });

  const handleEdit = (transaction: any) => {
    setEditingId(transaction.id);
    setFormData({
      email: transaction.email,
      amount: String(transaction.amount),
      voteQuantity: String(transaction.voteQuantity),
      status: transaction.status,
      candidateId: transaction.candidateId || candidates[0]?.id || '',
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      email: '',
      amount: '',
      voteQuantity: '1',
      status: 'pending',
      candidateId: candidates[0]?.id || '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    if (!formData.candidateId) return alert('Please select a candidate.');

    const amount = Number(formData.amount);
    const voteQuantity = Number(formData.voteQuantity);

    if (!Number.isFinite(amount) || amount < 0) {
      return alert('Enter a valid amount.');
    }

    if (!Number.isInteger(voteQuantity) || voteQuantity < 1) {
      return alert('Vote quantity must be at least 1.');
    }

    setIsLoading(true);
    try {
      await updateVoteTransaction(editingId, {
        email: formData.email,
        amount,
        voteQuantity,
        status: formData.status,
        candidateId: formData.candidateId,
      });
      handleCancelEdit();
      router.refresh();
      setTimeout(() => window.location.reload(), 500);
    } catch (err) {
      console.error(err);
      alert('Failed to update transaction.');
    }
    setIsLoading(false);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <GlassCard className="xl:col-span-2 bg-white/50 p-8 border-venite-green/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-venite-green/10 text-[10px] uppercase tracking-widest text-venite-green/50">
                <th className="pb-3 pr-4 font-bold">Ref / Email</th>
                <th className="pb-3 pr-4 font-bold">Candidate</th>
                <th className="pb-3 pr-4 font-bold text-right">Votes</th>
                <th className="pb-3 pr-4 font-bold text-right">Amount</th>
                <th className="pb-3 pr-4 font-bold">Date</th>
                <th className="pb-3 pr-4 font-bold">Status</th>
                <th className="pb-3 font-bold text-right">Edit</th>
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
                  <td className="py-4 pr-4">
                    <span className={`inline-block py-1 px-3 rounded-full text-[10px] uppercase tracking-widest font-bold ${
                      tx.status === 'success' ? 'bg-green-100 text-green-700 border border-green-200' :
                      tx.status === 'failed' ? 'bg-red-100 text-red-700 border border-red-200' :
                      'bg-yellow-100 text-yellow-700 border border-yellow-200'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button
                      onClick={() => handleEdit(tx)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-venite-green/20 text-venite-green/70 transition-colors hover:border-venite-green hover:bg-venite-green/5"
                      title="Edit Transaction"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 opacity-50">No transactions recorded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <GlassCard className="bg-white border-venite-green/10 sticky top-8 h-fit">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-serif text-lg text-venite-green">Edit Transaction</h3>
          {editingId && (
            <button onClick={handleCancelEdit} className="text-xs uppercase tracking-widest font-bold opacity-50 hover:opacity-100">Cancel</button>
          )}
        </div>

        {!editingId ? (
          <p className="text-sm text-venite-green/60">Select a payment row to edit its status, candidate, amount, or vote quantity.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-venite-green/50 tracking-widest block mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-venite-green/5 border border-transparent focus:bg-white focus:border-venite-gold rounded-xl px-4 py-3 text-sm transition-colors outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-venite-green/50 tracking-widest block mb-2">Candidate</label>
              <select
                required
                value={formData.candidateId}
                onChange={e => setFormData({ ...formData, candidateId: e.target.value })}
                className="w-full bg-venite-green/5 border border-transparent focus:bg-white focus:border-venite-gold rounded-xl px-4 py-3 text-sm transition-colors outline-none"
              >
                {candidates.length === 0 && <option value="">No candidates available</option>}
                {candidates.map(candidate => (
                  <option key={candidate.id} value={candidate.id}>
                    {candidate.name} ({candidate.category?.name || 'Uncategorized'})
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-venite-green/50 tracking-widest block mb-2">Votes</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.voteQuantity}
                  onChange={e => setFormData({ ...formData, voteQuantity: e.target.value })}
                  className="w-full bg-venite-green/5 border border-transparent focus:bg-white focus:border-venite-gold rounded-xl px-4 py-3 text-sm transition-colors outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-venite-green/50 tracking-widest block mb-2">Amount</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={formData.amount}
                  onChange={e => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full bg-venite-green/5 border border-transparent focus:bg-white focus:border-venite-gold rounded-xl px-4 py-3 text-sm transition-colors outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-venite-green/50 tracking-widest block mb-2">Status</label>
              <select
                required
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-venite-green/5 border border-transparent focus:bg-white focus:border-venite-gold rounded-xl px-4 py-3 text-sm transition-colors outline-none"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <PrimaryButton type="submit" disabled={isLoading || candidates.length === 0} className="w-full mt-4">
              {isLoading ? 'Saving...' : 'Update Transaction'}
            </PrimaryButton>
          </form>
        )}
      </GlassCard>
    </div>
  );
}
