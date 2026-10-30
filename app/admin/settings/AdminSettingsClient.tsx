'use client';

import React, { useState } from 'react';
import { updateSiteSettings } from '@/app/admin/actions';
import { Settings, Save, CheckCircle, AlertCircle, Loader2, Compass } from 'lucide-react';

interface Props {
  initialSettings: Record<string, string>;
}

export default function AdminSettingsClient({ initialSettings }: Props) {
  const [form, setForm] = useState({
    institution: initialSettings.institution || 'Venite University',
    address: initialSettings.address || 'KM 2, Ayetoro Road, Iloro-Ekiti, Ekiti State, Nigeria',
    googleMapsDestination: initialSettings.googleMapsDestination || 'Venite University, KM 2, Ayetoro Road, Iloro-Ekiti, Ekiti State, Nigeria',
    orientationDatesText: initialSettings.orientationDatesText || 'Monday, November 16 – Saturday, November 21, 2026',
    officialEmail: initialSettings.officialEmail || 'sprf@venite.edu.ng',
    emergencyHelpline: initialSettings.emergencyHelpline || '+234 800 000 7773',
    sessionName: initialSettings.sessionName || '2026/2027 Academic Session',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      await updateSiteSettings(form);
      setMessage({ text: 'Central portal configuration saved successfully!', type: 'success' });
    } catch (err: any) {
      setMessage({ text: err.message || 'Failed to save settings.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-serif text-sprf-navy mb-1">Central Portal Settings</h3>
        <p className="text-xs text-sprf-muted">
          Update central university address, verified Google Maps pin query, orientation calendar dates, and official helpline numbers.
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

      <form onSubmit={handleSubmit} className="sprf-card rounded-2xl p-6 sm:p-8 bg-white space-y-6 max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
              Google Maps Destination String (Signature Feature) *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={form.googleMapsDestination}
                onChange={(e) => setForm({ ...form, googleMapsDestination: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm font-mono text-sprf-navy"
              />
            </div>
            <p className="text-[11px] text-sprf-muted mt-1">
              This exact text is URL-encoded when users click &quot;Get Directions&quot; on the public Journey Planner.
            </p>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
              Campus Physical Address *
            </label>
            <input
              type="text"
              required
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
                Orientation Window Label *
              </label>
              <input
                type="text"
                required
                value={form.orientationDatesText}
                onChange={(e) => setForm({ ...form, orientationDatesText: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
                Current Academic Session *
              </label>
              <input
                type="text"
                required
                value={form.sessionName}
                onChange={(e) => setForm({ ...form, sessionName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
                Official Helpdesk Email *
              </label>
              <input
                type="email"
                required
                value={form.officialEmail}
                onChange={(e) => setForm({ ...form, officialEmail: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
                Arrival 24/7 Emergency Helpline *
              </label>
              <input
                type="text"
                required
                value={form.emergencyHelpline}
                onChange={(e) => setForm({ ...form, emergencyHelpline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm font-mono"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-sprf-border flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 rounded-xl bg-sprf-navy text-white text-xs font-bold uppercase tracking-wider hover:bg-sprf-blue flex items-center gap-2 shadow-sm"
          >
            {isSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-sprf-gold" />
            ) : (
              <Save className="w-3.5 h-3.5 text-sprf-gold" />
            )}
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
