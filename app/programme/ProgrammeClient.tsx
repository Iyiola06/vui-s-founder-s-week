'use client';

import React, { useState } from 'react';
import { Clock, MapPin, Star, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ProgrammeClient({ initialEvents }: { initialEvents: any[] }) {
  const [selectedDayId, setSelectedDayId] = useState<string | null>(initialEvents[0]?.id || null);

  const fallbackEvents = [
    { id: '1', title: 'Debate and Talk Show', description: 'Students engage in intellectual discourse on national development.', date: new Date('2026-05-11') },
    { id: '2', title: 'College Lectures', description: 'Academic showcase from Agriculture, Computing and Engineering.', date: new Date('2026-05-12') },
    { id: '3', title: 'Talent Show', description: 'A night of music, art, and creative performances.', date: new Date('2026-05-13') },
    { id: '4', title: 'Cultural Day', description: 'Celebrating our extraordinary Nigerian heritage.', date: new Date('2026-05-14') },
    { id: '5', title: 'Founder\'s Day Ceremony', description: 'The official Founder\'s Day event.', date: new Date('2026-05-15') },
    { id: '6', title: 'Sports & Dinner Awards', description: 'Morning athletics followed by the grand elegance dinner.', date: new Date('2026-05-16'), isSaturday: true },
    { id: '7', title: 'Thanksgiving', description: 'A Sunday service of gratitude to conclude the week.', date: new Date('2026-05-17') },
  ];

  const events = initialEvents.length > 0 ? initialEvents : fallbackEvents;
  const selectedEvent = events.find(e => e.id === selectedDayId) || events[0];

  if (!selectedEvent) return (
    <div className="glass-panel p-12 rounded-3xl text-center">
      <p className="text-lg text-muted-text font-serif">The programme schedule is not yet available.</p>
    </div>
  );

  const isSaturday = selectedEvent.title.toLowerCase().includes('saturday') || selectedEvent.isSaturday;

  return (
    <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
      
      {/* 1. Interactive Day Selector (Left Rail) */}
      <div className="w-full md:w-64 shrink-0">
        <div className="md:sticky md:top-32">
          <span className="text-[10px] uppercase tracking-widest font-bold text-muted-text mb-6 block px-2">Select a Day</span>
          
          <div className="flex md:flex-col overflow-x-auto md:overflow-visible pb-4 md:pb-0 gap-3 scrollbar-hide snap-x">
            {events.map((day) => {
              const dateObj = new Date(day.date);
              const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
              const dayNum = dateObj.getDate();
              const isSelected = selectedDayId === day.id;
              const isSat = day.title.toLowerCase().includes('saturday') || day.isSaturday;

              return (
                <button
                  key={day.id}
                  onClick={() => setSelectedDayId(day.id)}
                  className={`snap-start shrink-0 text-left px-6 py-4 rounded-2xl transition-all duration-300 border-2 ${
                    isSelected 
                      ? (isSat ? 'bg-champagne-gold/10 border-champagne-gold text-text-dark shadow-md shadow-champagne-gold/10' : 'bg-deep-green border-deep-green text-cream shadow-lg shadow-deep-green/20')
                      : 'glass-panel border-transparent text-muted-text hover:border-warm-border hover:bg-white/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-serif text-3xl ${isSelected ? (isSat ? 'text-champagne-gold' : 'text-cream/50') : 'text-muted-text/40'}`}>
                      {dayNum}
                    </span>
                    <div>
                      <span className={`block text-sm font-bold ${isSelected ? (isSat ? 'text-text-dark' : 'text-cream') : 'text-text-dark'}`}>
                        {dayName}
                      </span>
                      {isSat && <span className={`text-[10px] uppercase tracking-widest font-bold block mt-1 ${isSelected ? 'text-champagne-gold' : 'text-champagne-gold/70'}`}>Grand Finale</span>}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Event Detail Stage (Right Area) */}
      <div className="flex-grow">
        <div className={`p-10 md:p-14 rounded-[40px] transition-all duration-700 w-full min-h-[400px] flex flex-col relative overflow-hidden group ${
          isSaturday ? 'glass-panel-dark border-champagne-gold/20 shadow-2xl' : 'glass-panel bg-white/60 mb-8 border-warm-border/50'
        }`}>
          
          {isSaturday && (
            <div className="absolute top-0 right-0 w-[400px] h-[400px] radial-glow-gold rounded-full opacity-30 -translate-y-1/2 translate-x-1/4 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
          )}

          <div className="relative z-10 flex flex-col h-full flex-grow">
            <div className="flex justify-between items-start mb-8">
              <span className={`px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest border ${
                isSaturday ? 'bg-champagne-gold/10 text-champagne-gold border-champagne-gold/30' : 'bg-white border-warm-border text-deep-green'
              }`}>
                {new Date(selectedEvent.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </span>

              {isSaturday && (
                <Sparkles className="w-6 h-6 text-champagne-gold animate-pulse" />
              )}
            </div>

            <h2 className={`text-4xl md:text-6xl font-serif tracking-tight leading-[1.1] mb-6 ${
              isSaturday ? 'text-cream' : 'text-text-dark'
            }`}>
              {selectedEvent.title}
            </h2>
            
            <p className={`text-lg md:text-xl font-light leading-relaxed max-w-xl mb-12 ${
              isSaturday ? 'text-white/70' : 'text-muted-text'
            }`}>
              {selectedEvent.description}
            </p>

            <div className="mt-auto pt-8 flex flex-col sm:flex-row gap-8 border-t border-warm-border/30">
              <div className="flex items-start gap-4">
                <div className={`p-4 rounded-full ${isSaturday ? 'bg-white/5' : 'bg-white'}`}>
                  <Clock className={`w-5 h-5 ${isSaturday ? 'text-champagne-gold' : 'text-deep-green'}`} />
                </div>
                <div>
                  <span className={`block text-[10px] uppercase tracking-widest font-bold mb-1 ${isSaturday ? 'text-cream/40' : 'text-muted-text'}`}>Time</span>
                  <span className={`font-serif text-lg ${isSaturday ? 'text-cream' : 'text-text-dark'}`}>Time to be announced</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className={`p-4 rounded-full ${isSaturday ? 'bg-white/5' : 'bg-white'}`}>
                  <MapPin className={`w-5 h-5 ${isSaturday ? 'text-champagne-gold' : 'text-deep-green'}`} />
                </div>
                <div>
                  <span className={`block text-[10px] uppercase tracking-widest font-bold mb-1 ${isSaturday ? 'text-cream/40' : 'text-muted-text'}`}>Venue</span>
                  <span className={`font-serif text-lg ${isSaturday ? 'text-cream' : 'text-text-dark'}`}>Venue to be announced</span>
                </div>
              </div>
            </div>

            {isSaturday && (
              <div className="mt-12">
                <Link href="/voting" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-champagne-gold text-deep-green font-bold text-sm tracking-wide hover:bg-white hover:-translate-y-1 transition-all shadow-xl shadow-champagne-gold/10">
                  Vote for Dinner Awards <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
