'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { updateSiteSetting } from '../actions';
import { useRouter } from 'next/navigation';

export default function AdminSettingsClient({ initialSettings }: { initialSettings: any }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    dinnerVenue: initialSettings.dinnerVenue || '',
    dinnerTime: initialSettings.dinnerTime || '',
    globalVotingOpen: initialSettings.globalVotingOpen === 'true',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateSiteSetting('dinnerVenue', formData.dinnerVenue);
      await updateSiteSetting('dinnerTime', formData.dinnerTime);
      await updateSiteSetting('globalVotingOpen', formData.globalVotingOpen ? 'true' : 'false');
      
      alert('Settings updated successfully!');
      router.refresh();
      // Optional force reload
      setTimeout(() => window.location.reload(), 500);
    } catch (err) {
      console.error(err);
      alert('Failed to update settings.');
    }
    setIsLoading(false);
  };

  return (
    <GlassCard className="bg-white/60 p-8 border-venite-green/5">
      <h2 className="text-xl font-serif mb-8 text-venite-green">Global Settings</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
           <label className="text-[10px] uppercase font-bold text-venite-green/50 tracking-widest block mb-2">Dinner & Awards Venue</label>
           <input 
             type="text" 
             value={formData.dinnerVenue}
             onChange={e => setFormData({...formData, dinnerVenue: e.target.value})}
             className="w-full bg-venite-green/5 border border-transparent focus:bg-white focus:border-venite-gold rounded-xl px-4 py-3 text-sm transition-colors outline-none"
             placeholder="e.g. Venite University Main Auditorium"
           />
        </div>

        <div>
           <label className="text-[10px] uppercase font-bold text-venite-green/50 tracking-widest block mb-2">Dinner Time</label>
           <input 
             type="text" 
             value={formData.dinnerTime}
             onChange={e => setFormData({...formData, dinnerTime: e.target.value})}
             className="w-full bg-venite-green/5 border border-transparent focus:bg-white focus:border-venite-gold rounded-xl px-4 py-3 text-sm transition-colors outline-none"
             placeholder="e.g. 7:00 PM"
           />
        </div>

        <div className="pt-4 border-t border-venite-green/10">
          <label className="flex items-center gap-3 cursor-pointer bg-venite-green/5 p-4 rounded-xl border border-transparent hover:border-venite-gold transition-colors">
            <input 
              type="checkbox" 
              checked={formData.globalVotingOpen}
              onChange={e => setFormData({...formData, globalVotingOpen: e.target.checked})}
              className="w-4 h-4 rounded text-venite-green focus:ring-venite-gold border-venite-green/20"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-venite-green">Global Voting Master Switch</span>
              <span className="text-xs text-venite-green/60">If off, voting is disabled globally regardless of category settings.</span>
            </div>
          </label>
        </div>

        <PrimaryButton type="submit" disabled={isLoading} className="w-full mt-4">
          {isLoading ? 'Saving...' : 'Save Settings'}
        </PrimaryButton>
      </form>
    </GlassCard>
  );
}
