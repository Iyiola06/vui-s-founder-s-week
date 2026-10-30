'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnnouncementItem } from '@/lib/data-store';
import { Search, Bell, AlertTriangle, ArrowRight, Calendar, Tag } from 'lucide-react';

interface AnnouncementsClientProps {
  announcements: AnnouncementItem[];
}

export function AnnouncementsClient({ announcements }: AnnouncementsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Orientation', 'Registration', 'Travel', 'Accommodation', 'General'];

  const filtered = announcements.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const formatDate = (dateString: string) => {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-NG', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
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
            placeholder="Search official announcements, verification updates, hostel notices..."
            className="w-full px-4 py-3.5 pl-11 rounded-xl bg-sprf-surface border border-sprf-border text-sm text-sprf-charcoal placeholder:text-sprf-muted focus:outline-none focus:ring-2 focus:ring-sprf-gold/50 transition-all"
          />
          <Search className="w-4 h-4 text-sprf-muted absolute left-4 top-1/2 -translate-y-1/2" />
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
              {cat === 'all' ? 'All Notices' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notices Grid */}
      {filtered.length === 0 ? (
        <div className="sprf-card rounded-2xl p-12 text-center bg-white space-y-3">
          <Bell className="w-10 h-10 text-sprf-muted/50 mx-auto" />
          <h4 className="text-lg font-serif text-sprf-navy">No announcements found</h4>
          <p className="text-xs text-sprf-muted max-w-sm mx-auto">
            There are currently no notices matching your filter. Check back frequently for orientation updates.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => {
            const isUrgent = item.priority === 'urgent';

            return (
              <article
                key={item.id}
                className={`sprf-card sprf-card-hover rounded-2xl p-6 sm:p-7 bg-white transition-all ${
                  isUrgent ? 'border-amber-300/80 bg-amber-50/20' : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 mb-3 border-b border-sprf-border/60">
                  <div className="flex items-center gap-2">
                    {isUrgent && (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                        <AlertTriangle className="w-3 h-3 text-amber-700" /> Urgent Notice
                      </span>
                    )}
                    <span className="text-xs font-semibold text-sprf-gold uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  <span className="text-xs text-sprf-muted flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3 text-sprf-muted" /> {formatDate(item.publishedAt)}
                  </span>
                </div>

                <Link href={`/announcements/${item.slug}`} className="group block">
                  <h3 className="text-xl sm:text-2xl font-serif text-sprf-navy group-hover:text-sprf-blue transition-colors mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-sprf-charcoal/80 leading-relaxed font-light mb-4 line-clamp-2">
                    {item.summary}
                  </p>

                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sprf-navy group-hover:text-sprf-gold transition-colors">
                    <span>Read full official notice</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
