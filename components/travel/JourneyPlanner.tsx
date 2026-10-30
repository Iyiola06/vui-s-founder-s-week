'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/lib/config';
import {
  MapPin,
  Navigation,
  Compass,
  Car,
  Bus,
  Footprints,
  Bike,
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
  Clock,
  ShieldAlert,
} from 'lucide-react';

interface JourneyPlannerProps {
  customDestination?: string;
  className?: string;
}

type TravelMode = 'driving' | 'transit' | 'walking' | 'bicycling';

export function JourneyPlanner({ customDestination, className = '' }: JourneyPlannerProps) {
  const destination = customDestination || siteConfig.googleMapsDestination;
  const [origin, setOrigin] = useState('');
  const [travelMode, setTravelMode] = useState<TravelMode>('driving');
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Quick suggestions for Nigerian starting points
  const suggestions = siteConfig.popularStartingLocations;

  const handleUseMyLocation = () => {
    setLocationError(null);
    setInputError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser. Please enter your city manually.');
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const coordsOrigin = `${latitude.toFixed(6)},${longitude.toFixed(6)}`;
        setOrigin(coordsOrigin);
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location permission was denied. You can still type your city or park name below.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('GPS signal unavailable. Please type your departure city or landmark.');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out. Please enter your starting point manually.');
            break;
          default:
            setLocationError('Unable to retrieve location. Please type your starting location.');
        }
      },
      { timeout: 12000, enableHighAccuracy: true, maximumAge: 60000 }
    );
  };

  const buildGoogleMapsUrl = (originText: string, mode: TravelMode) => {
    const encodedOrigin = encodeURIComponent(originText.trim());
    const encodedDest = encodeURIComponent(destination);
    return `https://www.google.com/maps/dir/?api=1&origin=${encodedOrigin}&destination=${encodedDest}&travelmode=${mode}`;
  };

  const handleGetDirections = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setInputError(null);

    const trimmed = origin.trim();
    if (!trimmed) {
      setInputError('Please enter your departure city, motor park, or landmark.');
      return;
    }

    const mapsUrl = buildGoogleMapsUrl(trimmed, travelMode);
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = () => {
    const trimmed = origin.trim() || 'Your Location';
    const mapsUrl = buildGoogleMapsUrl(trimmed, travelMode);
    navigator.clipboard.writeText(mapsUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={`sprf-card rounded-3xl p-6 sm:p-8 lg:p-10 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sprf-border">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sprf-gold mb-1">
            <Compass className="w-4 h-4" />
            <span>Interactive Campus Route Planner</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif text-sprf-navy">
            Plan Your Journey to Venite University
          </h3>
        </div>

        {/* Travel Mode Selector */}
        <div className="flex items-center gap-1 p-1 bg-sprf-surface rounded-xl border border-sprf-border self-start sm:self-center">
          <button
            type="button"
            onClick={() => setTravelMode('driving')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              travelMode === 'driving'
                ? 'bg-sprf-navy text-white shadow-sm'
                : 'text-sprf-charcoal/70 hover:text-sprf-navy'
            }`}
            title="Driving Directions"
          >
            <Car className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Drive</span>
          </button>

          <button
            type="button"
            onClick={() => setTravelMode('transit')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              travelMode === 'transit'
                ? 'bg-sprf-navy text-white shadow-sm'
                : 'text-sprf-charcoal/70 hover:text-sprf-navy'
            }`}
            title="Public Transit Directions"
          >
            <Bus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Transit</span>
          </button>

          <button
            type="button"
            onClick={() => setTravelMode('walking')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              travelMode === 'walking'
                ? 'bg-sprf-navy text-white shadow-sm'
                : 'text-sprf-charcoal/70 hover:text-sprf-navy'
            }`}
            title="Walking Directions"
          >
            <Footprints className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Walk</span>
          </button>

          <button
            type="button"
            onClick={() => setTravelMode('bicycling')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              travelMode === 'bicycling'
                ? 'bg-sprf-navy text-white shadow-sm'
                : 'text-sprf-charcoal/70 hover:text-sprf-navy'
            }`}
            title="Cycling Directions"
          >
            <Bike className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bike</span>
          </button>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleGetDirections} className="pt-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Origin Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="origin-input" className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal">
                1. Where are you travelling from?
              </label>
              <button
                type="button"
                onClick={handleUseMyLocation}
                disabled={isLocating}
                className="inline-flex items-center gap-1 text-xs font-semibold text-sprf-navy hover:text-sprf-gold disabled:opacity-50 transition-colors"
              >
                <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin text-sprf-gold' : ''}`} />
                <span>{isLocating ? 'Detecting GPS...' : 'Use My Current Location'}</span>
              </button>
            </div>

            <div className="relative">
              <input
                id="origin-input"
                type="text"
                value={origin}
                onChange={(e) => {
                  setOrigin(e.target.value);
                  if (inputError) setInputError(null);
                }}
                placeholder="e.g. Ojota Lagos, Iwo Road Ibadan, Utako Abuja..."
                className={`w-full px-4 py-3.5 pl-10 rounded-xl bg-sprf-surface border text-sm text-sprf-charcoal placeholder:text-sprf-muted/70 focus:outline-none focus:ring-2 focus:ring-sprf-gold/50 transition-all ${
                  inputError ? 'border-red-500 bg-red-50/30' : 'border-sprf-border'
                }`}
              />
              <MapPin className="w-4 h-4 text-sprf-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {inputError && (
              <p className="mt-2 text-xs font-medium text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {inputError}
              </p>
            )}

            {locationError && (
              <p className="mt-2 text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200/60 flex items-start gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> {locationError}
              </p>
            )}

            {/* Quick Suggestions */}
            <div className="mt-3">
              <span className="text-[11px] font-medium text-sprf-muted block mb-1.5">
                Common departure hubs:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {suggestions.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setOrigin(item.query);
                      setInputError(null);
                    }}
                    className={`text-xs px-2.5 py-1 rounded-md border transition-all ${
                      origin === item.query
                        ? 'bg-sprf-navy text-white border-sprf-navy'
                        : 'bg-white text-sprf-charcoal/80 border-sprf-border hover:border-sprf-gold hover:text-sprf-navy'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Destination Display */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal block mb-2">
              2. Fixed Destination
            </span>
            <div className="p-4 rounded-xl bg-sprf-surface border border-sprf-border/80 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-sprf-navy text-sprf-gold flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-sprf-navy">
                    Venite University Campus
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Official Pin
                  </span>
                </div>
                <p className="text-xs text-sprf-charcoal/80 leading-relaxed font-mono">
                  {destination}
                </p>
                <p className="text-[11px] text-sprf-muted pt-1">
                  Landmark: Main Entrance Gate, Ayetoro Road, adjacent to Iloro-Ekiti Central.
                </p>
              </div>
            </div>

            {/* Travel Advisory Callout */}
            <div className="mt-4 p-3.5 rounded-xl bg-sprf-surface-soft border border-sprf-border/60 text-xs text-sprf-charcoal/80 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-sprf-navy">
                <Clock className="w-3.5 h-3.5 text-sprf-gold" />
                <span>Arrival Timing Advisory</span>
              </div>
              <p className="text-sprf-muted leading-relaxed">
                Aim to arrive in Iloro-Ekiti before <strong>5:00 PM</strong> for daylight check-in. SPRF Marshals are on duty at the main gate from 8:00 AM to 6:00 PM.
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-sprf-border">
          <p className="text-xs text-sprf-muted">
            Clicking &quot;Get Directions&quot; opens real-time turn-by-turn navigation in Google Maps.
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex-1 sm:flex-none px-4 py-3 rounded-xl border border-sprf-border bg-white text-xs font-semibold text-sprf-charcoal hover:bg-sprf-surface flex items-center justify-center gap-2 transition-colors"
              title="Copy Directions Link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-sprf-muted" />}
              <span>{copied ? 'Link Copied!' : 'Copy Route Link'}</span>
            </button>

            <button
              type="submit"
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-sprf-navy hover:bg-sprf-blue text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-4 h-4 text-sprf-gold" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
