'use client';

import React, { useState } from 'react';
import { OrientationDayItem } from '@/lib/data-store';
import {
  createOrientationDay,
  deleteOrientationDay,
  createOrientationActivity,
  deleteOrientationActivity,
} from '@/app/admin/actions';
import {
  Plus,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface Props {
  initialDays: OrientationDayItem[];
}

export default function AdminOrientationClient({ initialDays }: Props) {
  const [days, setDays] = useState<OrientationDayItem[]>(initialDays);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'days' | 'new-day' | 'new-activity'>('days');

  // New Day form state
  const [newDay, setNewDay] = useState({
    title: '',
    slug: '',
    eventDate: '2026-11-16',
    description: '',
    venue: 'Venite University Central Auditorium',
  });

  // New Activity form state
  const [newActivity, setNewActivity] = useState({
    orientationDayId: initialDays[0]?.id || '',
    title: '',
    description: '',
    startTime: '09:00 AM',
    endTime: '11:00 AM',
    venue: 'Central Auditorium',
    category: 'Induction',
    speaker: '',
    isCompulsory: false,
  });

  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleCreateDay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const generatedSlug = newDay.slug.trim() || newDay.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    try {
      await createOrientationDay({
        title: newDay.title,
        slug: generatedSlug,
        eventDate: new Date(newDay.eventDate),
        description: newDay.description,
        venue: newDay.venue,
        status: 'published',
        displayOrder: days.length + 1,
      });

      const created: OrientationDayItem = {
        id: `day-${Date.now()}`,
        title: newDay.title,
        slug: generatedSlug,
        eventDate: newDay.eventDate,
        description: newDay.description,
        venue: newDay.venue,
        status: 'published',
        displayOrder: days.length + 1,
        activities: [],
      };

      setDays([...days, created]);
      setMessage({ text: 'Orientation day created successfully!', type: 'success' });
      setActiveTab('days');
      setNewDay({
        title: '',
        slug: '',
        eventDate: '2026-11-16',
        description: '',
        venue: 'Venite University Central Auditorium',
      });
    } catch (err: any) {
      setMessage({ text: err.message || 'Failed to create day.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteDay = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}" and all its scheduled activities?`)) return;

    try {
      await deleteOrientationDay(id);
      setDays(days.filter((d) => d.id !== id));
      setMessage({ text: 'Orientation day deleted.', type: 'success' });
    } catch (err: any) {
      setMessage({ text: err.message || 'Failed to delete.', type: 'error' });
    }
  };

  const handleCreateActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      await createOrientationActivity({
        orientationDayId: newActivity.orientationDayId,
        title: newActivity.title,
        description: newActivity.description,
        startTime: newActivity.startTime,
        endTime: newActivity.endTime,
        venue: newActivity.venue,
        category: newActivity.category,
        speaker: newActivity.speaker,
        isCompulsory: newActivity.isCompulsory,
      });

      const updated = days.map((d) => {
        if (d.id === newActivity.orientationDayId) {
          const act = {
            id: `act-${Date.now()}`,
            orientationDayId: d.id,
            title: newActivity.title,
            description: newActivity.description,
            startTime: newActivity.startTime,
            endTime: newActivity.endTime,
            venue: newActivity.venue,
            category: newActivity.category as any,
            speaker: newActivity.speaker,
            isCompulsory: newActivity.isCompulsory,
            displayOrder: (d.activities || []).length + 1,
            status: 'published',
          };
          return { ...d, activities: [...(d.activities || []), act] };
        }
        return d;
      });

      setDays(updated);
      setMessage({ text: 'Activity scheduled successfully!', type: 'success' });
      setActiveTab('days');
      setNewActivity({
        orientationDayId: days[0]?.id || '',
        title: '',
        description: '',
        startTime: '09:00 AM',
        endTime: '11:00 AM',
        venue: 'Central Auditorium',
        category: 'Induction',
        speaker: '',
        isCompulsory: false,
      });
    } catch (err: any) {
      setMessage({ text: err.message || 'Failed to schedule activity.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteActivity = async (dayId: string, actId: string) => {
    if (!confirm('Are you sure you want to remove this activity?')) return;
    try {
      await deleteOrientationActivity(actId);
      setDays(
        days.map((d) => (d.id === dayId ? { ...d, activities: d.activities.filter((a) => a.id !== actId) } : d))
      );
    } catch (err: any) {
      setMessage({ text: err.message || 'Failed to delete activity.', type: 'error' });
    }
  };

  return (
    <div className="space-y-8">
      {/* Tab Switcher */}
      <div className="flex items-center justify-between border-b border-sprf-border pb-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('days')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'days' ? 'bg-sprf-navy text-white' : 'bg-white text-sprf-charcoal border border-sprf-border'
            }`}
          >
            All Days ({days.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('new-day')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'new-day' ? 'bg-sprf-navy text-white' : 'bg-white text-sprf-charcoal border border-sprf-border'
            }`}
          >
            + Add New Day
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('new-activity')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'new-activity' ? 'bg-sprf-navy text-white' : 'bg-white text-sprf-charcoal border border-sprf-border'
            }`}
          >
            + Add Activity
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* 1. All Days List */}
      {activeTab === 'days' && (
        <div className="space-y-6">
          {days.map((day, idx) => (
            <div key={day.id} className="sprf-card rounded-2xl p-6 bg-white space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-sprf-border">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-sprf-gold uppercase font-mono">Day 0{idx + 1}</span>
                    <span className="text-xs text-sprf-muted">·</span>
                    <span className="text-xs font-mono text-sprf-muted">
                      {new Date(day.eventDate).toLocaleDateString('en-NG', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif text-sprf-navy">{day.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setNewActivity({ ...newActivity, orientationDayId: day.id });
                      setActiveTab('new-activity');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-sprf-surface text-sprf-navy hover:bg-sprf-surface-soft border border-sprf-border text-xs font-semibold"
                  >
                    + Add Session
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteDay(day.id, day.title)}
                    className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete Day"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Day Activities */}
              <div className="space-y-2">
                <span className="text-[11px] uppercase font-bold text-sprf-muted block">
                  Scheduled Sessions ({(day.activities || []).length}):
                </span>
                {(day.activities || []).length === 0 ? (
                  <p className="text-xs text-sprf-muted italic">No sessions added to this day yet.</p>
                ) : (
                  <div className="space-y-2">
                    {day.activities.map((act) => (
                      <div
                        key={act.id}
                        className="p-3 rounded-xl bg-sprf-surface border border-sprf-border/60 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sprf-navy">{act.startTime}</span>
                            <span className="font-semibold text-sprf-charcoal">{act.title}</span>
                            {act.isCompulsory && (
                              <span className="text-[9px] uppercase font-bold text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                                Required
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-sprf-muted flex items-center gap-2">
                            <span>{act.venue}</span>
                            <span>·</span>
                            <span>{act.category}</span>
                            {act.speaker && <span>· Lead: {act.speaker}</span>}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteActivity(day.id, act.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Delete Activity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. New Day Form */}
      {activeTab === 'new-day' && (
        <form onSubmit={handleCreateDay} className="sprf-card rounded-2xl p-6 sm:p-8 bg-white space-y-4 max-w-2xl">
          <h3 className="text-xl font-serif text-sprf-navy">Create New Orientation Day</h3>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
              Day Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Day 7: Matriculation Thanksgiving & Community Outreach"
              value={newDay.title}
              onChange={(e) => setNewDay({ ...newDay, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
                Calendar Date *
              </label>
              <input
                type="date"
                required
                value={newDay.eventDate}
                onChange={(e) => setNewDay({ ...newDay, eventDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
                Primary Venue
              </label>
              <input
                type="text"
                value={newDay.venue}
                onChange={(e) => setNewDay({ ...newDay, venue: e.target.value })}
                placeholder="e.g. Central Auditorium"
                className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={newDay.description}
              onChange={(e) => setNewDay({ ...newDay, description: e.target.value })}
              placeholder="Summary of what will occur on this orientation day..."
              className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('days')}
              className="px-4 py-2 rounded-xl border border-sprf-border text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-sprf-navy text-white text-xs font-bold uppercase tracking-wider hover:bg-sprf-blue flex items-center gap-2"
            >
              {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin text-sprf-gold" />}
              <span>Save Orientation Day</span>
            </button>
          </div>
        </form>
      )}

      {/* 3. New Activity Form */}
      {activeTab === 'new-activity' && (
        <form onSubmit={handleCreateActivity} className="sprf-card rounded-2xl p-6 sm:p-8 bg-white space-y-4 max-w-2xl">
          <h3 className="text-xl font-serif text-sprf-navy">Schedule New Activity</h3>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
              Assign to Orientation Day *
            </label>
            <select
              value={newActivity.orientationDayId}
              onChange={(e) => setNewActivity({ ...newActivity, orientationDayId: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm"
            >
              {days.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
              Activity Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Vice-Chancellor Address or SPRF Code Sprint"
              value={newActivity.title}
              onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
                Start Time *
              </label>
              <input
                type="text"
                required
                placeholder="09:00 AM"
                value={newActivity.startTime}
                onChange={(e) => setNewActivity({ ...newActivity, startTime: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
                End Time
              </label>
              <input
                type="text"
                placeholder="11:30 AM"
                value={newActivity.endTime}
                onChange={(e) => setNewActivity({ ...newActivity, endTime: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
                Venue *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Central Auditorium or Lab B"
                value={newActivity.venue}
                onChange={(e) => setNewActivity({ ...newActivity, venue: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
                Category *
              </label>
              <select
                value={newActivity.category}
                onChange={(e) => setNewActivity({ ...newActivity, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm"
              >
                <option value="Academic">Academic</option>
                <option value="Induction">Induction</option>
                <option value="Tech">Tech / Programming</option>
                <option value="Tour">Campus Tour</option>
                <option value="Welfare">Welfare & Health</option>
                <option value="Social">Social & Sports</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
              Speaker / Responsible Dept
            </label>
            <input
              type="text"
              placeholder="e.g. Dean of Science / SPRF Executive Lead"
              value={newActivity.speaker}
              onChange={(e) => setNewActivity({ ...newActivity, speaker: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="compulsory-check"
              type="checkbox"
              checked={newActivity.isCompulsory}
              onChange={(e) => setNewActivity({ ...newActivity, isCompulsory: e.target.checked })}
              className="rounded border-sprf-border text-sprf-navy focus:ring-sprf-gold"
            />
            <label htmlFor="compulsory-check" className="text-xs font-semibold text-sprf-charcoal">
              Mark as Compulsory / Statutory University Briefing
            </label>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('days')}
              className="px-4 py-2 rounded-xl border border-sprf-border text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-sprf-navy text-white text-xs font-bold uppercase tracking-wider hover:bg-sprf-blue flex items-center gap-2"
            >
              {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin text-sprf-gold" />}
              <span>Schedule Session</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
