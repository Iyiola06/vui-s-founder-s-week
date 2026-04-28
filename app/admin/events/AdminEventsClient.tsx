'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { Trash2, Calendar, Plus } from 'lucide-react';
import { createEventDay, deleteEventDay } from '../actions';
import { useRouter } from 'next/navigation';

export default function AdminEventsClient({ initialEvents }: { initialEvents: any[] }) {
  const router = useRouter();
  const [events, setEvents] = useState(initialEvents);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({ title: '', date: '', description: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createEventDay({
        title: formData.title,
        date: new Date(formData.date),
        description: formData.description,
      });
      setIsAdding(false);
      setFormData({ title: '', date: '', description: '' });
      router.refresh();
      // Optimistic upate missing for brevity, we trust refresh
      setTimeout(() => window.location.reload(), 500);
    } catch (err) {
      console.error(err);
      alert('Failed to add event.');
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await deleteEventDay(id);
      router.refresh();
      setTimeout(() => window.location.reload(), 500);
    } catch (err) {
       console.error(err);
       alert('Failed to delete event.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 flex flex-col gap-4">
        {events.length === 0 ? (
          <p className="text-sm opacity-50 p-8 text-center border border-venite-green/10 rounded-3xl">No events added yet.</p>
        ) : (
          events.map(event => (
            <GlassCard key={event.id} className="bg-white/60 p-6 flex justify-between items-center group">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-venite-green/10 text-venite-green rounded-full flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-venite-green">{event.title}</h4>
                  <p className="text-xs uppercase tracking-widest opacity-60">{new Date(event.date).toLocaleDateString()}</p>
                </div>
              </div>
              <button 
                onClick={() => handleDelete(event.id)}
                className="w-10 h-10 rounded-full border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-colors"
                title="Delete Event"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </GlassCard>
          ))
        )}
      </div>

      <div>
        <GlassCard className="bg-white border-venite-green/10 sticky top-8">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-serif text-lg text-venite-green">Add New Event</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
               <label className="text-[10px] uppercase font-bold text-venite-green/50 tracking-widest block mb-2">Event Title</label>
               <input 
                 type="text" 
                 required
                 value={formData.title}
                 onChange={e => setFormData({...formData, title: e.target.value})}
                 className="w-full bg-venite-green/5 border border-transparent focus:bg-white focus:border-venite-gold rounded-xl px-4 py-3 text-sm transition-colors outline-none"
                 placeholder="e.g. Cultural Day"
               />
            </div>
            <div>
               <label className="text-[10px] uppercase font-bold text-venite-green/50 tracking-widest block mb-2">Event Date</label>
               <input 
                 type="date" 
                 required
                 value={formData.date}
                 onChange={e => setFormData({...formData, date: e.target.value})}
                 className="w-full bg-venite-green/5 border border-transparent focus:bg-white focus:border-venite-gold rounded-xl px-4 py-3 text-sm transition-colors outline-none"
               />
            </div>
            <div>
               <label className="text-[10px] uppercase font-bold text-venite-green/50 tracking-widest block mb-2">Description</label>
               <textarea 
                 value={formData.description}
                 onChange={e => setFormData({...formData, description: e.target.value})}
                 className="w-full bg-venite-green/5 border border-transparent focus:bg-white focus:border-venite-gold rounded-xl px-4 py-3 text-sm transition-colors outline-none min-h-[100px]"
                 placeholder="Short description of the day's activities"
               />
            </div>
            <PrimaryButton type="submit" disabled={isLoading} className="w-full mt-2">
              {isLoading ? 'Saving...' : 'Save Event'}
            </PrimaryButton>
          </form>
        </GlassCard>
      </div>

    </div>
  );
}
