'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Edit2, Trash2, User } from 'lucide-react';
import { createCandidate, deleteCandidate, updateCandidate } from '../actions';
import { useRouter } from 'next/navigation';

type CandidateFormData = {
  name: string;
  department: string;
  level: string;
  categoryId: string;
};

export default function AdminCandidatesClient({ initialCandidates, categories }: { initialCandidates: any[], categories: any[] }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<CandidateFormData>({
    name: '',
    department: '',
    level: '',
    categoryId: categories[0]?.id || '',
  });

  const handleEdit = (candidate: any) => {
    setEditingId(candidate.id);
    setFormData({
      name: candidate.name,
      department: candidate.department || '',
      level: candidate.level || '',
      categoryId: candidate.categoryId || categories[0]?.id || '',
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', department: '', level: '', categoryId: categories[0]?.id || '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryId) return alert('Please select a category');
    setIsLoading(true);

    try {
      const payload = {
        name: formData.name,
        department: formData.department,
        level: formData.level,
        categoryId: formData.categoryId,
      };

      if (editingId) {
        await updateCandidate(editingId, payload);
      } else {
        await createCandidate(payload);
      }

      handleCancelEdit();
      router.refresh();
      setTimeout(() => window.location.reload(), 500);
    } catch (err) {
      console.error(err);
      alert(editingId ? 'Failed to update candidate.' : 'Failed to add candidate.');
    }

    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this candidate?')) return;
    try {
      await deleteCandidate(id);
      router.refresh();
      setTimeout(() => window.location.reload(), 500);
    } catch (err) {
      console.error(err);
      alert('Failed to delete candidate.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 flex flex-col gap-4">
        {initialCandidates.length === 0 ? (
          <p className="text-sm opacity-50 p-8 text-center border border-venite-green/10 rounded-3xl">No candidates added yet.</p>
        ) : (
          initialCandidates.map(cand => (
            <GlassCard key={cand.id} className="bg-white/60 p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 group">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-venite-green/10 text-venite-green rounded-full flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-venite-green">{cand.name}</h4>
                  <div className="text-[10px] uppercase tracking-widest opacity-60 flex gap-2 items-center mt-1">
                    <span className="font-bold text-venite-green">{cand.category?.name}</span>
                    {cand.department && (
                      <>
                        <span>-</span>
                        <span>{cand.department}</span>
                      </>
                    )}
                    {cand.level && (
                      <>
                        <span>-</span>
                        <span>{cand.level}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(cand)}
                  className="w-10 h-10 rounded-full border border-venite-green/20 text-venite-green/70 flex items-center justify-center hover:bg-venite-green/5 hover:border-venite-green transition-colors"
                  title="Edit Candidate"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(cand.id)}
                  className="w-10 h-10 rounded-full border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-colors"
                  title="Delete Candidate"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </GlassCard>
          ))
        )}
      </div>

      <div>
        <GlassCard className="bg-white border-venite-green/10 sticky top-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-serif text-lg text-venite-green">{editingId ? 'Edit Candidate' : 'Add Candidate'}</h3>
            {editingId && (
              <button onClick={handleCancelEdit} className="text-xs uppercase tracking-widest font-bold opacity-50 hover:opacity-100">Cancel</button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-venite-green/50 tracking-widest block mb-2">Category</label>
              <select
                required
                value={formData.categoryId}
                onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full bg-venite-green/5 border border-transparent focus:bg-white focus:border-venite-gold rounded-xl px-4 py-3 text-sm transition-colors outline-none"
              >
                {categories.length === 0 && <option value="">No categories available</option>}
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-venite-green/50 tracking-widest block mb-2">Candidate Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-venite-green/5 border border-transparent focus:bg-white focus:border-venite-gold rounded-xl px-4 py-3 text-sm transition-colors outline-none"
                placeholder="e.g. John Doe"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-venite-green/50 tracking-widest block mb-2">Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={e => setFormData({ ...formData, department: e.target.value })}
                  className="w-full bg-venite-green/5 border border-transparent focus:bg-white focus:border-venite-gold rounded-xl px-4 py-3 text-sm transition-colors outline-none"
                  placeholder="e.g. Computing"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-venite-green/50 tracking-widest block mb-2">Level</label>
                <input
                  type="text"
                  value={formData.level}
                  onChange={e => setFormData({ ...formData, level: e.target.value })}
                  className="w-full bg-venite-green/5 border border-transparent focus:bg-white focus:border-venite-gold rounded-xl px-4 py-3 text-sm transition-colors outline-none"
                  placeholder="e.g. 400L"
                />
              </div>
            </div>
            <PrimaryButton type="submit" disabled={isLoading || categories.length === 0} className="w-full mt-4">
              {isLoading ? 'Saving...' : editingId ? 'Update Candidate' : 'Add Candidate'}
            </PrimaryButton>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}
