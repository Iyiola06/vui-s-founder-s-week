'use client';

import React, { useState } from 'react';
import { LeadershipItem } from '@/lib/data-store';
import { updateLeadershipProfile } from '@/app/admin/actions';
import { Users, Edit3, CheckCircle, AlertCircle, Loader2, Save } from 'lucide-react';

interface Props {
  initialProfiles: LeadershipItem[];
}

export default function AdminLeadershipClient({ initialProfiles }: Props) {
  const [profiles, setProfiles] = useState<LeadershipItem[]>(initialProfiles);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    role: '',
    biography: '',
    contactUrl: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const startEdit = (profile: LeadershipItem) => {
    setEditingId(profile.id);
    setEditForm({
      name: profile.name,
      role: profile.role,
      biography: profile.biography,
      contactUrl: profile.contactUrl || '',
    });
    setMessage(null);
  };

  const handleSave = async (id: string) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      await updateLeadershipProfile(id, editForm);
      setProfiles(
        profiles.map((p) => (p.id === id ? { ...p, ...editForm } : p))
      );
      setMessage({ text: 'Leadership profile updated successfully!', type: 'success' });
      setEditingId(null);
    } catch (err: any) {
      setMessage({ text: err.message || 'Failed to update profile.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-serif text-sprf-navy mb-1">
          SPRF Executive Council Management
        </h3>
        <p className="text-xs text-sprf-muted">
          Update executive names, official portfolios, contact addresses, and biographies (including the SPRF President profile).
        </p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profiles.map((profile) => {
          const isEditing = editingId === profile.id;

          return (
            <div key={profile.id} className="sprf-card rounded-2xl p-6 bg-white space-y-4">
              {isEditing ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-sprf-charcoal block mb-1">Name</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-sprf-surface border border-sprf-border text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-sprf-charcoal block mb-1">Role / Portfolio</label>
                    <input
                      type="text"
                      value={editForm.role}
                      onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-sprf-surface border border-sprf-border text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-sprf-charcoal block mb-1">Contact Email / URL</label>
                    <input
                      type="text"
                      value={editForm.contactUrl}
                      onChange={(e) => setEditForm({ ...editForm, contactUrl: e.target.value })}
                      placeholder="mailto:president@sprf-venite.org"
                      className="w-full px-3 py-2 rounded-lg bg-sprf-surface border border-sprf-border text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-sprf-charcoal block mb-1">Biography</label>
                    <textarea
                      rows={3}
                      value={editForm.biography}
                      onChange={(e) => setEditForm({ ...editForm, biography: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-sprf-surface border border-sprf-border text-xs leading-relaxed"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1.5 rounded-lg border border-sprf-border text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => handleSave(profile.id)}
                      className="px-4 py-1.5 rounded-lg bg-sprf-navy text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin text-sprf-gold" /> : <Save className="w-3.5 h-3.5 text-sprf-gold" />}
                      <span>Save Changes</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-sprf-gold block font-mono">{profile.role}</span>
                      <h4 className="text-lg font-serif text-sprf-navy">{profile.name}</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => startEdit(profile)}
                      className="px-3 py-1.5 rounded-lg bg-sprf-surface hover:bg-sprf-surface-soft border border-sprf-border text-xs font-semibold text-sprf-navy flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-sprf-gold" />
                      <span>Edit</span>
                    </button>
                  </div>

                  <p className="text-xs text-sprf-muted leading-relaxed font-light">{profile.biography}</p>

                  <div className="pt-2 border-t border-sprf-border/60 text-xs text-sprf-muted font-mono truncate">
                    {profile.contactUrl || 'No contact URL set'}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
