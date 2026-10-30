'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaqItem } from '@/lib/data-store';
import { Search, ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

interface FaqClientProps {
  faqs: FaqItem[];
}

export function FaqClient({ faqs }: FaqClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(faqs[0]?.id || null);

  const categories = [
    'all',
    'Admissions & Documents',
    'Arrival & Travel',
    'Accommodation',
    'Orientation Week',
    'SPRF & Tech',
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-8">
      {/* Search & Category Filter */}
      <div className="sprf-card rounded-2xl p-6 bg-white space-y-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g., hostel keys, JAMB letter, shuttle bus, Wi-Fi)..."
            className="w-full px-4 py-3.5 pl-11 rounded-xl bg-sprf-surface border border-sprf-border text-sm text-sprf-charcoal placeholder:text-sprf-muted focus:outline-none focus:ring-2 focus:ring-sprf-gold/50 transition-all"
          />
          <Search className="w-4 h-4 text-sprf-muted absolute left-4 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-sprf-muted hover:text-sprf-navy"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-sprf-navy text-white font-semibold'
                  : 'bg-sprf-surface text-sprf-charcoal/70 hover:text-sprf-navy hover:bg-sprf-surface-soft'
              }`}
            >
              {cat === 'all' ? 'All Questions' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion Questions */}
      {filteredFaqs.length === 0 ? (
        <div className="sprf-card rounded-2xl p-12 text-center bg-white space-y-3">
          <HelpCircle className="w-10 h-10 text-sprf-muted/50 mx-auto" />
          <h4 className="text-lg font-serif text-sprf-navy">No answers match your search</h4>
          <p className="text-xs text-sprf-muted max-w-sm mx-auto">
            Try checking for different terms or reach out directly to the SPRF student helpdesk.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sprf-navy text-white text-xs font-semibold hover:bg-sprf-blue transition-colors mt-2"
          >
            <MessageSquare className="w-3.5 h-3.5 text-sprf-gold" />
            <span>Contact Helpdesk</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;

            return (
              <div
                key={faq.id}
                className="sprf-card rounded-2xl bg-white overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isExpanded}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 hover:bg-sprf-surface/40 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-sprf-gold block">
                      {faq.category}
                    </span>
                    <h4 className="text-base sm:text-lg font-serif text-sprf-navy">
                      {faq.question}
                    </h4>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-full bg-sprf-surface text-sprf-navy flex items-center justify-center shrink-0 mt-1 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 bg-sprf-navy text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-sprf-charcoal/80 leading-relaxed font-light border-t border-sprf-border/60">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Still need help callout */}
      <div className="sprf-card rounded-2xl p-6 sm:p-8 bg-sprf-surface text-center space-y-3">
        <h4 className="text-lg font-serif text-sprf-navy">Have a question that is not covered here?</h4>
        <p className="text-xs text-sprf-muted max-w-md mx-auto leading-relaxed">
          The SPRF Helpdesk is active every day during orientation and arrival week. Send us a message and a peer advisor will respond swiftly.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sprf-navy text-white text-xs font-semibold hover:bg-sprf-blue transition-colors shadow-sm"
        >
          <MessageSquare className="w-3.5 h-3.5 text-sprf-gold" />
          <span>Ask the SPRF Helpdesk</span>
        </Link>
      </div>
    </div>
  );
}
