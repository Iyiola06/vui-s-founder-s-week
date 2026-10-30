'use client';

import React, { useState } from 'react';
import { ContactMessageItem } from '@/lib/data-store';
import { markContactMessageStatus } from '@/app/admin/actions';
import { MessageSquare, Mail, Calendar, CheckCircle2, Clock } from 'lucide-react';

interface Props {
  initialMessages: ContactMessageItem[];
}

export default function AdminMessagesClient({ initialMessages }: Props) {
  const [messages, setMessages] = useState<ContactMessageItem[]>(initialMessages);
  const [selectedMsg, setSelectedMsg] = useState<ContactMessageItem | null>(initialMessages[0] || null);

  const handleToggleStatus = async (msg: ContactMessageItem) => {
    const newStatus = msg.status === 'unread' ? 'read' : 'replied';
    try {
      await markContactMessageStatus(msg.id, newStatus);
      setMessages(
        messages.map((m) => (m.id === msg.id ? { ...m, status: newStatus } : m))
      );
      if (selectedMsg?.id === msg.id) {
        setSelectedMsg({ ...selectedMsg, status: newStatus });
      }
    } catch (e) {
      console.warn('Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-serif text-sprf-navy mb-1">Incoming Student Inquiries</h3>
        <p className="text-xs text-sprf-muted">
          Messages received from students and parents via the public contact and arrival support form.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="sprf-card rounded-2xl p-12 text-center bg-white border border-sprf-border text-xs text-sprf-muted">
          No inquiries received yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Messages List Column */}
          <div className="lg:col-span-5 space-y-3">
            {messages.map((msg) => {
              const isSelected = selectedMsg?.id === msg.id;
              const isUnread = msg.status === 'unread';

              return (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMsg(msg)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-white border-sprf-navy shadow-sm'
                      : isUnread
                      ? 'bg-white border-amber-200 hover:border-sprf-gold'
                      : 'bg-sprf-surface/60 border-sprf-border hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-sprf-navy truncate">{msg.name}</span>
                    <span className="text-[10px] font-mono text-sprf-muted">
                      {new Date(msg.createdAt).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-sprf-gold block mb-1">
                    {msg.category}
                  </span>

                  <p className="text-xs text-sprf-muted line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>

                  <div className="mt-2 flex items-center justify-between text-[10px]">
                    <span className="text-sprf-muted font-mono truncate max-w-[180px]">{msg.email}</span>
                    <span
                      className={`px-2 py-0.5 rounded font-bold uppercase text-[9px] ${
                        isUnread ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {msg.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Reader Column */}
          <div className="lg:col-span-7">
            {selectedMsg ? (
              <div className="sprf-card rounded-2xl p-6 sm:p-8 bg-white space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-sprf-border">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-sprf-gold">
                      {selectedMsg.category}
                    </span>
                    <h4 className="text-xl font-serif text-sprf-navy">{selectedMsg.name}</h4>
                    <a
                      href={`mailto:${selectedMsg.email}`}
                      className="text-xs text-sprf-navy font-mono hover:underline flex items-center gap-1"
                    >
                      <Mail className="w-3.5 h-3.5 text-sprf-gold" /> {selectedMsg.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(selectedMsg)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                        selectedMsg.status === 'unread'
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'bg-sprf-surface text-sprf-charcoal hover:bg-sprf-surface-soft border border-sprf-border'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>
                        {selectedMsg.status === 'unread' ? 'Mark as Read' : 'Toggle Status'}
                      </span>
                    </button>
                    <a
                      href={`mailto:${selectedMsg.email}?subject=RE: SPRF Venite University Inquiry - ${selectedMsg.category}`}
                      className="px-4 py-1.5 rounded-lg bg-sprf-navy text-white text-xs font-bold uppercase tracking-wider hover:bg-sprf-blue flex items-center gap-1"
                    >
                      <span>Reply</span>
                    </a>
                  </div>
                </div>

                <div className="text-sm text-sprf-charcoal/90 leading-relaxed font-light whitespace-pre-line bg-sprf-surface p-5 rounded-xl border border-sprf-border/60">
                  {selectedMsg.message}
                </div>

                <div className="text-xs text-sprf-muted font-mono flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-sprf-muted" />
                  <span>Received: {new Date(selectedMsg.createdAt).toLocaleString('en-NG')}</span>
                </div>
              </div>
            ) : (
              <div className="sprf-card rounded-2xl p-12 text-center bg-white text-xs text-sprf-muted">
                Select an inquiry from the list to view its complete content.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
