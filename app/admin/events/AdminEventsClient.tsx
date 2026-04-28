'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Trash2, Calendar, Edit2 } from 'lucide-react';
import { createEventDay, deleteEventDay, updateEventDay } from '../actions';
import { useRouter } from 'next/navigation';

type EventFormData = {
  title: string;
  date: string;
  description: string;
};

function toDateInputValue(value: string | Date) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toISOString().slice(0, 10);
}

export default function AdminEventsClient({ initialEvents }: { initialEvents: any[] }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<EventFormData>({ title: '', date: '', description: '' });

  const handleEdit = (event: any) => {
    setEditingId(event.id);
    setFormData({
      title: event.title,
      date: toDateInputValue(event.date),
      description: event.description || '',
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '', date: '', description: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        title: formData.title,
        date: new Date(`${formData.date}T00:00:00`),
        description: formData.description,
      };

      if (editingId) {
        await updateEventDay(editingId, payload);
      } else {
        await createEventDay(payload);
      }

      handleCancelEdit();
      router.refresh();
      setTimeout(() => window.location.reload(), 500);
    } catch (err) {
      console.error(err);
      alert(editingId ? 'Failed to update event.' : 'Failed to add event.');
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
        {initialEvents.length === 0 ? (
          <p className="text-sm opacity-50 p-8 text-center border border-venite-green/10 rounded-3xl">No events added yet.</p>
        ) : (
          initialEvents.map(event => (
            <GlassCard key={event.id} className="bg-white/60 p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 group">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-venite-green/10 text-venite-green rounded-full flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-venite-green">{event.title}</h4>
                  <p className="text-xs uppercase tracking-widest opacity-60">{new Date(event.date).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(event)}
                  className="w-10 h-10 rounded-full border border-venite-green/20 text-venite-green/70 flex items-center justify-center hover:bg-venite-green/5 hover:border-venite-green transition-colors"
                  title="Edit Event"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="w-10 h-10 rounded-full border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-colors"
                  title="Delete Event"
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
            <h3 className="font-serif text-lg text-venite-green">{editingId ? 'Edit Event' : 'Add New Event'}</h3>
            {editingId && (
              <button onClick={handleCancelEdit} className="text-xs uppercase tracking-widest font-bold opacity-50 hover:opacity-100">Cancel</button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-venite-green/50 tracking-widest block mb-2">Event Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
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
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-venite-green/5 border border-transparent focus:bg-white focus:border-venite-gold rounded-xl px-4 py-3 text-sm transition-colors outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-venite-green/50 tracking-widest block mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-venite-green/5 border border-transparent focus:bg-white focus:border-venite-gold rounded-xl px-4 py-3 text-sm transition-colors outline-none min-h-[100px]"
                placeholder="Short description of the day's activities"
              />
            </div>
            <PrimaryButton type="submit" disabled={isLoading} className="w-full mt-2">
              {isLoading ? 'Saving...' : editingId ? 'Update Event' : 'Save Event'}
            </PrimaryButton>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}
