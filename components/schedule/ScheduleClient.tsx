'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { OrientationDayItem, OrientationActivityItem } from '@/lib/data-store';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle,
  Filter,
  List,
  CalendarDays,
  ArrowRight,
  BookOpen,
  Award,
  Users,
  Code2,
  Compass,
} from 'lucide-react';

interface ScheduleClientProps {
  days: OrientationDayItem[];
}

export function ScheduleClient({ days }: ScheduleClientProps) {
  const [selectedDayId, setSelectedDayId] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'timeline' | 'list'>('timeline');

  const categories = ['all', 'Academic', 'Induction', 'Tech', 'Tour', 'Welfare', 'Social'];

  // Flatten or filter activities
  const allActivitiesWithDay = days.flatMap((day) =>
    (day.activities || []).map((act) => ({
      ...act,
      dayTitle: day.title,
      daySlug: day.slug,
      dayDate: day.eventDate,
    }))
  );

  const filteredActivities = allActivitiesWithDay.filter((act) => {
    const matchesDay = selectedDayId === 'all' || act.orientationDayId === selectedDayId;
    const matchesCategory = selectedCategory === 'all' || act.category === selectedCategory;
    return matchesDay && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Academic':
        return BookOpen;
      case 'Induction':
        return Award;
      case 'Tech':
        return Code2;
      case 'Tour':
        return Compass;
      case 'Social':
        return Users;
      default:
        return Calendar;
    }
  };

  return (
    <div className="space-y-8">
      {/* Control Bar: Day Filter + Category Filter + View Toggle */}
      <div className="sprf-card rounded-2xl p-5 bg-white space-y-4">
        {/* Day Selector Tabs */}
        <div>
          <span className="text-[11px] uppercase font-bold tracking-wider text-sprf-muted block mb-2">
            Select Programme Day:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            <button
              type="button"
              onClick={() => setSelectedDayId('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDayId === 'all'
                  ? 'bg-sprf-navy text-white shadow-sm'
                  : 'bg-sprf-surface text-sprf-charcoal/80 hover:bg-sprf-surface-soft'
              }`}
            >
              All Days ({allActivitiesWithDay.length})
            </button>
            {days.map((day, idx) => (
              <button
                key={day.id}
                type="button"
                onClick={() => setSelectedDayId(day.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedDayId === day.id
                    ? 'bg-sprf-navy text-white shadow-sm'
                    : 'bg-sprf-surface text-sprf-charcoal/80 hover:bg-sprf-surface-soft'
                }`}
              >
                Day {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filters + View Mode Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-sprf-border">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-semibold text-sprf-muted mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-all ${
                  selectedCategory === cat
                    ? 'bg-sprf-gold text-sprf-navy font-bold'
                    : 'bg-sprf-surface text-sprf-charcoal/70 hover:text-sprf-navy'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 p-1 bg-sprf-surface rounded-lg border border-sprf-border self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('timeline')}
              className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === 'timeline'
                  ? 'bg-white text-sprf-navy shadow-xs'
                  : 'text-sprf-muted hover:text-sprf-navy'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" /> Timeline
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-sprf-navy shadow-xs'
                  : 'text-sprf-muted hover:text-sprf-navy'
              }`}
            >
              <List className="w-3.5 h-3.5" /> List
            </button>
          </div>
        </div>
      </div>

      {/* Main Schedule Content */}
      {filteredActivities.length === 0 ? (
        <div className="sprf-card rounded-2xl p-12 text-center bg-white space-y-3">
          <Calendar className="w-10 h-10 text-sprf-muted/50 mx-auto" />
          <h4 className="text-lg font-serif text-sprf-navy">No activities match your filters</h4>
          <p className="text-xs text-sprf-muted max-w-sm mx-auto">
            Try resetting your day or category selection to view all scheduled orientation sessions.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedDayId('all');
              setSelectedCategory('all');
            }}
            className="text-xs font-bold text-sprf-navy underline underline-offset-4"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'timeline' ? (
        /* Timeline View */
        <div className="space-y-6">
          {filteredActivities.map((act) => {
            const CatIcon = getCategoryIcon(act.category);

            return (
              <div
                key={act.id}
                className="sprf-card sprf-card-hover rounded-2xl p-6 sm:p-7 bg-white relative overflow-hidden group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  {/* Left: Timing & Category */}
                  <div className="sm:w-56 shrink-0 space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sprf-surface text-sprf-navy text-xs font-semibold">
                      <CatIcon className="w-3.5 h-3.5 text-sprf-gold" />
                      <span>{act.category}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-bold text-sprf-navy font-mono">
                      <Clock className="w-4 h-4 text-sprf-gold shrink-0" />
                      <span>{act.startTime} {act.endTime ? `– ${act.endTime}` : ''}</span>
                    </div>

                    <div className="text-xs text-sprf-muted font-medium">
                      <Link
                        href={`/orientation/day/${act.daySlug}`}
                        className="hover:text-sprf-navy hover:underline transition-colors block truncate"
                        title={act.dayTitle}
                      >
                        {act.dayTitle}
                      </Link>
                    </div>

                    {act.isCompulsory && (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                        <CheckCircle className="w-3 h-3 text-amber-600" /> Compulsory
                      </span>
                    )}
                  </div>

                  {/* Right: Content details */}
                  <div className="flex-1 space-y-2.5">
                    <h4 className="text-xl font-serif text-sprf-navy group-hover:text-sprf-blue transition-colors">
                      {act.title}
                    </h4>

                    {act.description && (
                      <p className="text-sm text-sprf-charcoal/80 leading-relaxed font-light">
                        {act.description}
                      </p>
                    )}

                    <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-sprf-muted border-t border-sprf-border/60">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-sprf-gold" />
                        <span className="font-medium text-sprf-charcoal">{act.venue}</span>
                      </span>

                      {act.speaker && (
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-sprf-muted" />
                          <span>{act.speaker}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List / Table View */
        <div className="sprf-card rounded-2xl bg-white overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sprf-surface text-sprf-charcoal/70 uppercase tracking-wider font-bold border-b border-sprf-border">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Time</th>
                  <th className="py-3.5 px-4 font-bold">Activity</th>
                  <th className="py-3.5 px-4 font-bold">Category</th>
                  <th className="py-3.5 px-4 font-bold">Venue</th>
                  <th className="py-3.5 px-4 font-bold">Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sprf-border/60">
                {filteredActivities.map((act) => (
                  <tr key={act.id} className="hover:bg-sprf-surface/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-sprf-navy whitespace-nowrap">
                      {act.startTime} {act.endTime ? `– ${act.endTime}` : ''}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-sprf-navy block text-sm">{act.title}</span>
                      <span className="text-[11px] text-sprf-muted block mt-0.5 line-clamp-1">
                        {act.description}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-sprf-surface font-medium text-sprf-charcoal">
                        {act.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-sprf-charcoal whitespace-nowrap">
                      {act.venue}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {act.isCompulsory ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Mandatory
                        </span>
                      ) : (
                        <span className="text-[10px] text-sprf-muted">General</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
