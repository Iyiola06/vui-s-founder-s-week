'use client';

import React, { useState } from 'react';
import { AnnouncementItem } from '@/lib/data-store';
import { createAnnouncement, deleteAnnouncement } from '@/app/admin/actions';
import {
  Plus,
  Trash2,
  Bell,
  AlertTriangle,
  Calendar,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';

interface Props {
  initialAnnouncements: AnnouncementItem[];
}

export default function AdminAnnouncementsClient({ initialAnnouncements }: Props) {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(initialAnnouncements);
  const [activeTab, setActiveTab] = useState<'list' | 'create'>('list');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    category: 'Orientation',
    priority: 'normal',
    status: 'published',
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const generatedSlug = form.slug.trim() || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    try {
      await createAnnouncement({
        title: form.title,
        slug: generatedSlug,
        summary: form.summary,
        content: form.content,
        category: form.category,
        priority: form.priority,
        status: form.status,
      });

      const newAnn: AnnouncementItem = {
        id: `ann-${Date.now()}`,
        title: form.title,
        slug: generatedSlug,
        summary: form.summary,
        content: form.content,
        category: form.category as any,
        priority: form.priority as any,
        status: form.status as any,
        publishedAt: new Date().toISOString(),
      };

      setAnnouncements([newAnn, ...announcements]);
      setMessage({ text: 'Announcement published successfully!', type: 'success' });
      setActiveTab('list');
      setForm({
        title: '',
        slug: '',
        summary: '',
        content: '',
        category: 'Orientation',
        priority: 'normal',
        status: 'published',
      });
    } catch (err: any) {
      setMessage({ text: err.message || 'Failed to publish announcement.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await deleteAnnouncement(id);
      setAnnouncements(announcements.filter((a) => a.id !== id));
      setMessage({ text: 'Announcement deleted.', type: 'success' });
    } catch (err: any) {
      setMessage({ text: err.message || 'Failed to delete announcement.', type: 'error' });
    }
  };

  return (
    <div className="space-y-8">
      {/* Tab Switcher */}
      <div className="flex items-center justify-between border-b border-sprf-border pb-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'list' ? 'bg-sprf-navy text-white' : 'bg-white text-sprf-charcoal border border-sprf-border'
            }`}
          >
            All Notices ({announcements.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'create' ? 'bg-sprf-navy text-white' : 'bg-white text-sprf-charcoal border border-sprf-border'
            }`}
          >
            + Create New Notice
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

      {/* 1. Announcements List */}
      {activeTab === 'list' && (
        <div className="space-y-4">
          {announcements.length === 0 ? (
            <div className="p-12 text-center text-xs text-sprf-muted bg-white rounded-2xl border border-sprf-border">
              No announcements published yet.
            </div>
          ) : (
            announcements.map((ann) => (
              <div
                key={ann.id}
                className="sprf-card rounded-2xl p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-sprf-gold uppercase">{ann.category}</span>
                    <span className="text-sprf-muted">·</span>
                    <span className="text-sprf-muted font-mono">
                      {new Date(ann.publishedAt).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    {ann.priority === 'urgent' && (
                      <span className="text-[10px] font-bold uppercase text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Urgent
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-serif text-sprf-navy">{ann.title}</h4>
                  <p className="text-xs text-sprf-muted line-clamp-1">{ann.summary}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => handleDelete(ann.id, ann.title)}
                    className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete Announcement"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 2. Create Announcement Form */}
      {activeTab === 'create' && (
        <form onSubmit={handleCreate} className="sprf-card rounded-2xl p-6 sm:p-8 bg-white space-y-4 max-w-2xl">
          <h3 className="text-xl font-serif text-sprf-navy">Publish Official Announcement</h3>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Schedule for Medical Screening & Hostel Clearance"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
                Category *
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm"
              >
                <option value="Orientation">Orientation</option>
                <option value="Registration">Registration & Documents</option>
                <option value="Travel">Travel & Logistics</option>
                <option value="Accommodation">Hostel Accommodation</option>
                <option value="General">General Notice</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
                Priority Level *
              </label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm"
              >
                <option value="normal">Normal Notice</option>
                <option value="urgent">Urgent Announcement (Highlighted)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
              Short Summary * (1-2 sentences)
            </label>
            <input
              type="text"
              required
              placeholder="Brief summary appearing on homepage cards..."
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
              Full Official Content *
            </label>
            <textarea
              required
              rows={6}
              placeholder="Complete circular text, step-by-step instructions, and contact details..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm font-light leading-relaxed"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('list')}
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
              <span>Publish Notice</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
