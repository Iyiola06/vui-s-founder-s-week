'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Trash2, Edit2, Settings } from 'lucide-react';
import { createCategory, updateCategory, deleteCategory } from '../actions';
import { useRouter } from 'next/navigation';

export default function AdminCategoriesClient({ initialCategories }: { initialCategories: any[] }) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({ name: '', description: '', pricePerVote: 500, isOpen: false });

  const handleEdit = (cat: any) => {
    setEditingId(cat.id);
    setFormData({
      name: cat.name,
      description: cat.description || '',
      pricePerVote: cat.pricePerVote,
      isOpen: cat.isOpen
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', description: '', pricePerVote: 500, isOpen: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingId) {
        await updateCategory(editingId, {
          name: formData.name,
          description: formData.description,
          pricePerVote: Number(formData.pricePerVote),
          isOpen: formData.isOpen,
        });
      } else {
        await createCategory({
          name: formData.name,
          description: formData.description,
          pricePerVote: Number(formData.pricePerVote),
          isOpen: formData.isOpen,
        });
      }
      handleCancelEdit();
      router.refresh();
      setTimeout(() => window.location.reload(), 500);
    } catch (err) {
      console.error(err);
      alert('Operation failed.');
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? All its candidates will also be affected if relation is cascade. Continue?')) return;
    try {
      await deleteCategory(id);
      router.refresh();
      setTimeout(() => window.location.reload(), 500);
    } catch (err) {
       console.error(err);
       alert('Failed to delete category.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 flex flex-col gap-4">
        {categories.length === 0 ? (
          <p className="text-sm opacity-50 p-8 text-center border border-venite-green/10 rounded-3xl">No categories added yet.</p>
        ) : (
          categories.map(cat => (
            <GlassCard key={cat.id} className="bg-white/60 p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 group">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-venite-green/10 text-venite-green rounded-full flex items-center justify-center shrink-0">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-venite-green">{cat.name}</h4>
                  <div className="text-[10px] uppercase tracking-widest opacity-60 flex gap-2 items-center mt-1">
                    <span>NGN{cat.pricePerVote} / vote</span>
                    <span>-</span>
                    <span className={cat.isOpen ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>
                      {cat.isOpen ? 'Open' : 'Closed'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(cat)}
                  className="w-10 h-10 rounded-full border border-venite-green/20 text-venite-green/70 flex items-center justify-center hover:bg-venite-green/5 hover:border-venite-green transition-colors"
                  title="Edit Category"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(cat.id)}
                  className="w-10 h-10 rounded-full border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-colors"
                  title="Delete Category"
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
             <h3 className="font-serif text-lg text-venite-green">
               {editingId ? 'Edit Category' : 'Add Category'}
             </h3>
             {editingId && (
               <button onClick={handleCancelEdit} className="text-xs uppercase tracking-widest font-bold opacity-50 hover:opacity-100">Cancel</button>
             )}
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
               <label className="text-[10px] uppercase font-bold text-venite-green/50 tracking-widest block mb-2">Name</label>
               <input 
                 type="text" 
                 required
                 value={formData.name}
                 onChange={e => setFormData({...formData, name: e.target.value})}
                 className="w-full bg-venite-green/5 border border-transparent focus:bg-white focus:border-venite-gold rounded-xl px-4 py-3 text-sm transition-colors outline-none"
                 placeholder="e.g. Most Innovative Student"
               />
            </div>
            <div>
               <label className="text-[10px] uppercase font-bold text-venite-green/50 tracking-widest block mb-2">Price Per Vote (NGN)</label>
               <input 
                 type="number" 
                 required
                 min="100"
                 value={formData.pricePerVote}
                 onChange={e => setFormData({...formData, pricePerVote: e.target.value as any})}
                 className="w-full bg-venite-green/5 border border-transparent focus:bg-white focus:border-venite-gold rounded-xl px-4 py-3 text-sm transition-colors outline-none"
               />
            </div>
            <label className="flex items-center gap-3 cursor-pointer mt-2 bg-venite-green/5 p-4 rounded-xl border border-transparent hover:border-venite-gold transition-colors">
              <input 
                type="checkbox" 
                checked={formData.isOpen}
                onChange={e => setFormData({...formData, isOpen: e.target.checked})}
                className="w-4 h-4 rounded text-venite-green focus:ring-venite-gold border-venite-green/20"
              />
              <span className="text-sm font-bold text-venite-green">Voting is Open</span>
            </label>

            <div>
               <label className="text-[10px] uppercase font-bold text-venite-green/50 tracking-widest block mb-2 mt-4">Description (Optional)</label>
               <textarea 
                 value={formData.description}
                 onChange={e => setFormData({...formData, description: e.target.value})}
                 className="w-full bg-venite-green/5 border border-transparent focus:bg-white focus:border-venite-gold rounded-xl px-4 py-3 text-sm transition-colors outline-none min-h-[80px]"
                 placeholder="Short description"
               />
            </div>
            <PrimaryButton type="submit" disabled={isLoading} className="w-full mt-2">
              {isLoading ? 'Saving...' : (editingId ? 'Update Category' : 'Add Category')}
            </PrimaryButton>
          </form>
        </GlassCard>
      </div>

    </div>
  );
}
