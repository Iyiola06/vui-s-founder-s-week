'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Travel & Arrival',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill out all required fields before submitting.');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        category: 'Travel & Arrival',
        message: '',
      });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again or reach out via helpline.');
    }
  };

  if (status === 'success') {
    return (
      <div className="sprf-card rounded-2xl p-8 bg-white text-center space-y-4 border-emerald-200">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="text-xl font-serif text-sprf-navy">Inquiry Received Successfully</h4>
        <p className="text-xs text-sprf-muted max-w-md mx-auto leading-relaxed">
          Thank you for contacting SPRF. Your inquiry has been forwarded to our student orientation desk. A representative will respond to your email shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="px-5 py-2.5 rounded-lg bg-sprf-navy text-white text-xs font-semibold hover:bg-sprf-blue transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="sprf-card rounded-2xl p-6 sm:p-8 bg-white space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1.5">
            Your Full Name *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Oluwaseun Adeleke"
            className="w-full px-4 py-3 rounded-xl bg-sprf-surface border border-sprf-border text-sm text-sprf-charcoal focus:outline-none focus:ring-2 focus:ring-sprf-gold/50"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1.5">
            Active Email Address *
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. student@gmail.com"
            className="w-full px-4 py-3 rounded-xl bg-sprf-surface border border-sprf-border text-sm text-sprf-charcoal focus:outline-none focus:ring-2 focus:ring-sprf-gold/50"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-category" className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1.5">
          Inquiry Category *
        </label>
        <select
          id="contact-category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-sprf-surface border border-sprf-border text-sm text-sprf-charcoal focus:outline-none focus:ring-2 focus:ring-sprf-gold/50"
        >
          <option value="Travel & Arrival">Travel Directions & Motor Park Reception</option>
          <option value="Document Clearance">Admission Documents & Clearance Desk</option>
          <option value="Hostel Accommodation">Hostel Room Keys & Bedding Verification</option>
          <option value="SPRF & Tech Cohort">SPRF Technology Tracks & Coding Mentorship</option>
          <option value="General Inquiry">General Orientation Questions</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-1.5">
          How can SPRF assist you? *
        </label>
        <textarea
          id="contact-message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Please describe your question or arrival concern in detail..."
          className="w-full px-4 py-3 rounded-xl bg-sprf-surface border border-sprf-border text-sm text-sprf-charcoal focus:outline-none focus:ring-2 focus:ring-sprf-gold/50 resize-y"
        />
      </div>

      {status === 'error' && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-sprf-navy hover:bg-sprf-blue text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-sm"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-sprf-gold" />
            <span>Transmitting message...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4 text-sprf-gold" />
            <span>Send Inquiry to Helpdesk</span>
          </>
        )}
      </button>
    </form>
  );
}
