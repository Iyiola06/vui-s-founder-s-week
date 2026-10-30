'use client';

import React, { useState } from 'react';
import { TransportGuideItem } from '@/lib/data-store';
import { createTransportGuide, deleteTransportGuide } from '@/app/admin/actions';
import { Plus, Trash2, Bus, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface Props {
  initialTransports: TransportGuideItem[];
}

export default function AdminTransportClient({ initialTransports }: Props) {
  const [transports, setTransports] = useState<TransportGuideItem[]>(initialTransports);
  const [activeTab, setActiveTab] = useState<'list' | 'create'>('list');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const [form, setForm] = useState({
    originCity: '',
    destination: 'Venite University, Iloro-Ekiti',
    providerName: '',
    terminalName: '',
    routeDescription: '',
    estimatedFare: '',
    estimatedDuration: '',
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      await createTransportGuide(form);
      const newGuide: TransportGuideItem = {
        id: `trans-${Date.now()}`,
        ...form,
        currency: 'NGN',
        lastVerifiedAt: new Date().toISOString().split('T')[0],
        status: 'published',
      };
      setTransports([...transports, newGuide]);
      setMessage({ text: 'Transport route created successfully!', type: 'success' });
      setActiveTab('list');
      setForm({
        originCity: '',
        destination: 'Venite University, Iloro-Ekiti',
        providerName: '',
        terminalName: '',
        routeDescription: '',
        estimatedFare: '',
        estimatedDuration: '',
      });
    } catch (err: any) {
      setMessage({ text: err.message || 'Failed to create route.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, city: string) => {
    if (!confirm(`Delete route for ${city}?`)) return;
    try {
      await deleteTransportGuide(id);
      setTransports(transports.filter((t) => t.id !== id));
      setMessage({ text: 'Transport guide deleted.', type: 'success' });
    } catch (err: any) {
      setMessage({ text: err.message || 'Failed to delete route.', type: 'error' });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-sprf-border pb-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'list' ? 'bg-sprf-navy text-white' : 'bg-white text-sprf-charcoal border border-sprf-border'
            }`}
          >
            All Regional Routes ({transports.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'create' ? 'bg-sprf-navy text-white' : 'bg-white text-sprf-charcoal border border-sprf-border'
            }`}
          >
            + Add New Route
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

      {activeTab === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {transports.map((t) => (
            <div key={t.id} className="sprf-card rounded-2xl p-6 bg-white space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="text-xl font-serif text-sprf-navy">{t.originCity}</h4>
                  <button
                    type="button"
                    onClick={() => handleDelete(t.id, t.originCity)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Delete Route"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-sprf-charcoal font-medium">Terminal: {t.terminalName}</p>
                <p className="text-xs text-sprf-muted font-light leading-relaxed">{t.routeDescription}</p>
                <div className="pt-2 flex items-center gap-3 text-xs font-mono text-sprf-navy">
                  <span>Fare: {t.estimatedFare || 'Varies'}</span>
                  <span>·</span>
                  <span>Est: {t.estimatedDuration || 'Varies'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'create' && (
        <form onSubmit={handleCreate} className="sprf-card rounded-2xl p-6 sm:p-8 bg-white space-y-4 max-w-2xl">
          <h3 className="text-xl font-serif text-sprf-navy">Add Regional Transport Route</h3>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
              Origin City / Hub *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Lagos (Ojota / Berger / Oshodi)"
              value={form.originCity}
              onChange={(e) => setForm({ ...form, originCity: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
                Motor Park Terminal *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ojota Main Inter-State Park"
                value={form.terminalName}
                onChange={(e) => setForm({ ...form, terminalName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
                Provider Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ekiti Commercial Buses / GIGM"
                value={form.providerName}
                onChange={(e) => setForm({ ...form, providerName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
              Route & Connection Instructions *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Explain intermediate junctions (e.g. Ado-Ekiti, Aramoko) and local shuttle connections..."
              value={form.routeDescription}
              onChange={(e) => setForm({ ...form, routeDescription: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
                Estimated Fare Range
              </label>
              <input
                type="text"
                placeholder="e.g. NGN 7,500 – NGN 11,000"
                value={form.estimatedFare}
                onChange={(e) => setForm({ ...form, estimatedFare: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
                Estimated Duration
              </label>
              <input
                type="text"
                placeholder="e.g. 4.5 – 6 hours"
                value={form.estimatedDuration}
                onChange={(e) => setForm({ ...form, estimatedDuration: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm"
              />
            </div>
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
              <span>Save Transport Guide</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
