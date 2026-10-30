'use client';

import React, { useState } from 'react';
import { FaqItem } from '@/lib/data-store';
import { createFaq, deleteFaq } from '@/app/admin/actions';
import {
  Plus,
  Trash2,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';

interface Props {
  initialFaqs: FaqItem[];
}

export default function AdminFaqsClient({ initialFaqs }: Props) {
  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs);
  const [activeTab, setActiveTab] = useState<'list' | 'create'>('list');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const [form, setForm] = useState({
    question: '',
    answer: '',
    category: 'Arrival & Travel',
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      await createFaq({
        question: form.question,
        answer: form.answer,
        category: form.category,
        displayOrder: faqs.length + 1,
      });

      const newFaq: FaqItem = {
        id: `faq-${Date.now()}`,
        question: form.question,
        answer: form.answer,
        category: form.category as any,
        displayOrder: faqs.length + 1,
        status: 'published',
      };

      setFaqs([...faqs, newFaq]);
      setMessage({ text: 'FAQ added successfully!', type: 'success' });
      setActiveTab('list');
      setForm({ question: '', answer: '', category: 'Arrival & Travel' });
    } catch (err: any) {
      setMessage({ text: err.message || 'Failed to create FAQ.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, question: string) => {
    if (!confirm(`Are you sure you want to delete this FAQ: "${question}"?`)) return;

    try {
      await deleteFaq(id);
      setFaqs(faqs.filter((f) => f.id !== id));
      setMessage({ text: 'FAQ deleted.', type: 'success' });
    } catch (err: any) {
      setMessage({ text: err.message || 'Failed to delete FAQ.', type: 'error' });
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
            All Questions ({faqs.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'create' ? 'bg-sprf-navy text-white' : 'bg-white text-sprf-charcoal border border-sprf-border'
            }`}
          >
            + Add New FAQ
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
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="sprf-card rounded-2xl p-6 bg-white flex items-start justify-between gap-4">
              <div className="space-y-1 max-w-3xl">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sprf-gold block">
                  {faq.category}
                </span>
                <h4 className="text-base font-serif text-sprf-navy font-bold">{faq.question}</h4>
                <p className="text-xs text-sprf-muted leading-relaxed font-light">{faq.answer}</p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(faq.id, faq.question)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg shrink-0"
                title="Delete FAQ"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'create' && (
        <form onSubmit={handleCreate} className="sprf-card rounded-2xl p-6 sm:p-8 bg-white space-y-4 max-w-2xl">
          <h3 className="text-xl font-serif text-sprf-navy">Create New Knowledge Base FAQ</h3>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
              Category *
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm"
            >
              <option value="Arrival & Travel">Arrival & Travel</option>
              <option value="Admissions & Documents">Admissions & Documents</option>
              <option value="Accommodation">Accommodation & Hostels</option>
              <option value="Orientation Week">Orientation Week</option>
              <option value="SPRF & Tech">SPRF & Tech Cohorts</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
              Question *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Can parents accompany students into the hostel rooms?"
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1">
              Answer *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Provide a clear, accurate, and concise answer for arriving students..."
              value={form.answer}
              onChange={(e) => setForm({ ...form, answer: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-sprf-surface border border-sprf-border text-sm leading-relaxed"
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
              <span>Save FAQ</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
