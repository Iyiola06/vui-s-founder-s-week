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
  Layers,
  Sparkles,
  Share2,
  Route,
  ArrowRight,
  ShieldCheck,
  Building,
  CheckCircle2,
  Info,
} from 'lucide-react';

interface JourneyPlannerProps {
  customDestination?: string;
  className?: string;
}

type TravelMode = 'driving' | 'transit' | 'walking' | 'bicycling';
type MapViewTab = 'google' | 'osm' | 'corridor';

export function JourneyPlanner({ customDestination, className = '' }: JourneyPlannerProps) {
  // Destination coordinates: 7.9050° N, 5.1150° E
  // Using exact coordinates guarantees Google Maps navigation resolves immediately without "Can't seem to find that place" errors
  const destinationCoords = siteConfig.googleMapsDestinationCoords;
  const destinationQuery = customDestination || destinationCoords;
  const campusLandmarks = siteConfig.campusLandmarks;
  const startingHubs = siteConfig.popularStartingLocations;

  const [origin, setOrigin] = useState('Ojota, Lagos, Nigeria');
  const [travelMode, setTravelMode] = useState<TravelMode>('driving');
  const [activeMapTab, setActiveMapTab] = useState<MapViewTab>('google');
  const [selectedLandmarkId, setSelectedLandmarkId] = useState<string>('gate');
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCoords, setCopiedCoords] = useState(false);

  // Selected landmark details
  const selectedLandmark =
    campusLandmarks.find((l) => l.id === selectedLandmarkId) || campusLandmarks[0];

  // Selected hub data if matching origin
  const selectedHub = startingHubs.find(
    (h) => h.query.toLowerCase() === origin.trim().toLowerCase() || origin.toLowerCase().includes(h.label.toLowerCase().slice(0, 5))
  );

  // Build external URLs
  // 1. Google Maps Directions with coordinates: ALWAYS resolves reliably in Google Maps without "Can't seem to find that place"
  const buildGoogleMapsNavUrl = (originText: string, mode: TravelMode) => {
    const encodedOrigin = encodeURIComponent(originText.trim() || 'My Location');
    return `https://www.google.com/maps/dir/?api=1&origin=${encodedOrigin}&destination=${destinationCoords}&travelmode=${mode}`;
  };

  // 2. Google Maps Place Search fallback
  const buildGoogleMapsSearchUrl = () => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Venite University, Iloro-Ekiti, Ekiti State')}`;
  };

  // 3. Apple Maps
  const buildAppleMapsUrl = (originText: string) => {
    const encodedOrigin = encodeURIComponent(originText.trim() || '');
    return `https://maps.apple.com/?saddr=${encodedOrigin}&daddr=${destinationCoords}&q=${encodeURIComponent('Venite University, Iloro-Ekiti')}`;
  };

  // 4. Waze
  const buildWazeUrl = () => {
    const [lat, lng] = destinationCoords.split(',');
    return `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
  };

  const handleUseMyLocation = () => {
    setLocationError(null);
    setInputError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser. Please select or type your city.');
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
            setLocationError('Location permission denied. You can select your city from the presets below.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('GPS signal unavailable. Please select your departure city or landmark.');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out. Please select your city manually.');
            break;
          default:
            setLocationError('Unable to detect location. Please select your starting city.');
        }
      },
      { timeout: 12000, enableHighAccuracy: true, maximumAge: 60000 }
    );
  };

  const handleCopyNavUrl = () => {
    const url = buildGoogleMapsNavUrl(origin, travelMode);
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyCoordinates = () => {
    navigator.clipboard.writeText(`${siteConfig.coordinates.formatted} (${siteConfig.coordinates.lat}, ${siteConfig.coordinates.lng})`);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2500);
  };

  const handleOpenGoogleMaps = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setInputError(null);

    const trimmed = origin.trim();
    if (!trimmed) {
      setInputError('Please enter or select your departure city first.');
      return;
    }

    const navUrl = buildGoogleMapsNavUrl(trimmed, travelMode);
    window.open(navUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Main Interactive Planner Box */}
      <div className="sprf-card rounded-3xl p-6 sm:p-8 lg:p-10 bg-white shadow-xl border border-sprf-border">
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-sprf-border">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sprf-gold mb-1.5">
              <Compass className="w-4 h-4" />
              <span>Interactive Campus Route Planner</span>
              <span className="text-sprf-muted">·</span>
              <span className="text-emerald-700 font-semibold">Live Integrated Navigation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-sprf-navy">
              Plan Your Route to Venite University
            </h2>
            <p className="text-xs sm:text-sm text-sprf-muted mt-1 font-light">
              Explore the campus map directly on this portal, plan your interstate corridor, or launch turn-by-turn navigation in external apps.
            </p>
          </div>

          {/* Travel Mode Selector */}
          <div className="flex items-center gap-1 p-1 bg-sprf-surface rounded-xl border border-sprf-border self-start lg:self-center">
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
              <span>Drive</span>
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
              <span>Transit</span>
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
              <span>Walk</span>
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
              <span>Bike</span>
            </button>
          </div>
        </div>

        {/* Origin & Destination Inputs Grid */}
        <div className="pt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 1. Origin Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="origin-input" className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal flex items-center gap-1.5">
                <span>1. Starting City / Motor Park</span>
              </label>
              <button
                type="button"
                onClick={handleUseMyLocation}
                disabled={isLocating}
                className="inline-flex items-center gap-1 text-xs font-semibold text-sprf-navy hover:text-sprf-gold disabled:opacity-50 transition-colors"
              >
                <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin text-sprf-gold' : ''}`} />
                <span>{isLocating ? 'Detecting GPS...' : 'Use My GPS Location'}</span>
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
              <p className="text-xs font-medium text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {inputError}
              </p>
            )}

            {locationError && (
              <p className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200/60 flex items-start gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> {locationError}
              </p>
            )}

            {/* Quick Hub Buttons */}
            <div>
              <span className="text-[11px] font-semibold text-sprf-muted block mb-1.5 uppercase tracking-wide">
                Popular Nigerian Departure Hubs:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {startingHubs.map((hub) => {
                  const isSelected = origin === hub.query;
                  return (
                    <button
                      key={hub.label}
                      type="button"
                      onClick={() => {
                        setOrigin(hub.query);
                        setInputError(null);
                      }}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                        isSelected
                          ? 'bg-sprf-navy text-white border-sprf-navy font-semibold shadow-xs'
                          : 'bg-white text-sprf-charcoal/80 border-sprf-border hover:border-sprf-gold hover:text-sprf-navy'
                      }`}
                    >
                      {hub.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 2. Destination Pin & Guaranteed Routing Coordinates */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal">
                2. Destination (Fixed Campus Pin)
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3 text-emerald-700" />
                <span>Verified GPS Pin</span>
              </span>
            </div>

            <div className="p-4 rounded-xl bg-sprf-surface border border-sprf-border/90 space-y-2">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-sprf-navy text-sprf-gold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Building className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-sprf-navy">
                      Venite University Campus
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCoordinates}
                      className="text-[11px] font-medium text-sprf-navy hover:text-sprf-gold flex items-center gap-1 transition-colors"
                      title="Copy coordinates"
                    >
                      {copiedCoords ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCoords ? 'Copied' : 'Copy GPS'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-sprf-charcoal font-medium">
                    KM 2, Ayetoro Road, Iloro-Ekiti, Ekiti State, Nigeria
                  </p>
                  <p className="text-[11px] font-mono text-sprf-muted pt-0.5">
                    Coordinates: {siteConfig.coordinates.formatted} ({siteConfig.coordinates.lat}, {siteConfig.coordinates.lng})
                  </p>
                </div>
              </div>

              {/* Fix notice info */}
              <div className="pt-2 border-t border-sprf-border/60 flex items-start gap-1.5 text-[11px] text-sprf-muted leading-relaxed">
                <Info className="w-3.5 h-3.5 text-sprf-gold shrink-0 mt-0.5" />
                <span>
                  <strong>Search Accuracy Notice:</strong> To prevent maps from failing with &quot;Can&apos;t seem to find that place&quot;, our system directly routes to Venite University&apos;s verified GPS coordinates (<strong>{destinationCoords}</strong>).
                </span>
              </div>
            </div>

            {/* Selected Departure Trip Overview */}
            {selectedHub && (
              <div className="p-3.5 rounded-xl bg-sprf-surface-soft border border-sprf-border/70 text-xs space-y-1.5 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-sprf-navy font-bold">
                  <span className="flex items-center gap-1.5">
                    <Route className="w-3.5 h-3.5 text-sprf-gold" />
                    <span>Estimated Journey: {selectedHub.label}</span>
                  </span>
                  <span className="text-emerald-700">{selectedHub.estHours}</span>
                </div>
                <div className="flex items-center gap-4 text-sprf-muted text-[11px]">
                  <span>Distance: ~{selectedHub.distanceKm} km</span>
                  <span>·</span>
                  <span>Recommended departure: <strong className="text-sprf-charcoal">{selectedHub.recommendedDepart}</strong></span>
                </div>
                <p className="text-[11px] text-sprf-charcoal/80 pt-0.5">
                  <span className="font-semibold text-sprf-navy">Highway Corridor:</span> {selectedHub.corridor}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* ON-SITE MAP INTEGRATION SECTION */}
        {/* ------------------------------------------------------------------ */}
        <div className="mt-8 pt-8 border-t border-sprf-border space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sprf-navy">
                <Layers className="w-4 h-4 text-sprf-gold" />
                <span>On-Site Interactive Map & Campus Explorer</span>
              </div>
              <p className="text-xs text-sprf-muted mt-0.5">
                Explore campus landmarks, surrounding road networks, and key access routes right inside this portal.
              </p>
            </div>

            {/* View Mode Selector */}
            <div className="flex items-center gap-1 p-1 bg-sprf-surface rounded-xl border border-sprf-border self-start sm:self-center">
              <button
                type="button"
                onClick={() => setActiveMapTab('google')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeMapTab === 'google'
                    ? 'bg-sprf-navy text-white shadow-xs'
                    : 'text-sprf-charcoal/70 hover:text-sprf-navy'
                }`}
              >
                <span>Live Map View</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMapTab('osm')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeMapTab === 'osm'
                    ? 'bg-sprf-navy text-white shadow-xs'
                    : 'text-sprf-charcoal/70 hover:text-sprf-navy'
                }`}
              >
                <span>Road Grid</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMapTab('corridor')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeMapTab === 'corridor'
                    ? 'bg-sprf-navy text-white shadow-xs'
                    : 'text-sprf-charcoal/70 hover:text-sprf-navy'
                }`}
              >
                <span>Transit Corridor</span>
              </button>
            </div>
          </div>

          {/* Interactive Map Frame */}
          <div className="relative rounded-2xl overflow-hidden border border-sprf-border shadow-md bg-sprf-surface min-h-[380px] sm:min-h-[440px] flex flex-col">
            {activeMapTab === 'google' && (
              <div className="relative w-full h-[380px] sm:h-[440px]">
                <iframe
                  title="Venite University Google Map Integration"
                  src={`https://maps.google.com/maps?q=${siteConfig.coordinates.lat},${siteConfig.coordinates.lng}&hl=en&z=15&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
                {/* Floating On-Map Badge */}
                <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-sprf-border text-xs flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-sprf-navy">Venite University, Iloro-Ekiti</span>
                  <span className="text-sprf-muted text-[11px]">KM 2 Ayetoro Road</span>
                </div>
              </div>
            )}

            {activeMapTab === 'osm' && (
              <div className="relative w-full h-[380px] sm:h-[440px]">
                <iframe
                  title="OpenStreetMap Road Grid"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=5.0800%2C7.8800%2C5.1400%2C7.9300&layer=mapnik&marker=${siteConfig.coordinates.lat}%2C${siteConfig.coordinates.lng}`}
                  className="w-full h-full border-0"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-sprf-border text-xs flex items-center gap-2">
                  <span className="font-bold text-sprf-navy">OpenStreetMap Regional Grid</span>
                  <span className="text-sprf-muted text-[11px]">Iloro-Ekiti / Ayetoro Corridor</span>
                </div>
              </div>
            )}

            {activeMapTab === 'corridor' && (
              <div className="p-6 sm:p-8 bg-gradient-to-br from-sprf-navy to-sprf-blue text-white flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase font-bold tracking-wider text-sprf-gold">
                      Visual Transit Pipeline
                    </span>
                    <span className="text-xs text-white/80">
                      Destination: Venite University Gate 1
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-serif mb-2">
                    {origin.split(',')[0] || 'Your Origin'} to Venite University Route Corridors
                  </h4>
                  <p className="text-xs text-white/70 max-w-2xl leading-relaxed">
                    Follow the verified transit junctions to reach the university safely. When arriving at Aramoko-Ekiti or Ado-Ekiti, take a commercial taxi or bus directly to <strong>Iloro-Ekiti</strong>.
                  </p>

                  {/* Corridor Stepper */}
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-sprf-gold">Stage 1: Departure</span>
                      <p className="font-bold text-sm">{origin.split(',')[0] || 'Starting Point'}</p>
                      <p className="text-[11px] text-white/70">Board registered interstate bus heading towards Ekiti or Ondo State.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-sprf-gold">Stage 2: Key Hub</span>
                      <p className="font-bold text-sm">Akure / Ado-Ekiti</p>
                      <p className="text-[11px] text-white/70">Central transit stop. Proceed to Old Garage or Fajuyi Park for onward transit.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-sprf-gold">Stage 3: Junction</span>
                      <p className="font-bold text-sm">Aramoko / Iloro</p>
                      <p className="text-[11px] text-white/70">Take Iloro-Ekiti bus/cab (approx. ₦500 – ₦800). Tell the driver Venite University.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/15 backdrop-blur-sm border border-sprf-gold/50 space-y-1 shadow-lg">
                      <span className="text-[10px] uppercase font-bold text-sprf-gold">Stage 4: Arrival</span>
                      <p className="font-bold text-sm flex items-center gap-1">
                        <span>Campus Main Gate</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-sprf-gold" />
                      </p>
                      <p className="text-[11px] text-white/90">KM 2 Ayetoro Road. Report to the SPRF Welcome Desk immediately.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-white/70 gap-2">
                  <span>Helpline in case of route confusion: <strong>{siteConfig.contact.emergencyHelpline}</strong></span>
                  <span className="text-sprf-gold font-medium">Marshals stationed at Iloro Junction</span>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Campus Landmark Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sprf-charcoal">
                Campus Points of Interest (Click to inspect):
              </span>
              <span className="text-xs text-sprf-muted">
                {campusLandmarks.length} primary campus zones
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {campusLandmarks.map((landmark) => {
                const isActive = landmark.id === selectedLandmarkId;
                return (
                  <button
                    key={landmark.id}
                    type="button"
                    onClick={() => setSelectedLandmarkId(landmark.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isActive
                        ? 'bg-sprf-navy text-white border-sprf-navy shadow-sm'
                        : 'bg-white hover:bg-sprf-surface text-sprf-charcoal border-sprf-border'
                    }`}
                  >
                    <span className={`text-[10px] uppercase font-bold tracking-wider block truncate ${isActive ? 'text-sprf-gold' : 'text-sprf-muted'}`}>
                      {landmark.tag}
                    </span>
                    <span className="text-xs font-bold block truncate mt-0.5">
                      {landmark.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Landmark Details Card */}
            <div className="p-4 rounded-xl bg-sprf-surface border border-sprf-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-sprf-navy">
                    {selectedLandmark.name}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-sprf-navy/10 text-sprf-navy">
                    {selectedLandmark.location}
                  </span>
                </div>
                <p className="text-xs text-sprf-charcoal/80 leading-relaxed font-light">
                  {selectedLandmark.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                <span className="text-[11px] font-mono text-sprf-muted bg-white px-2.5 py-1 rounded-md border border-sprf-border">
                  GPS: {selectedLandmark.coords}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* COMPANION NAVIGATION APPS ("OPEN MAPS AS AN ADDITION") */}
        {/* ------------------------------------------------------------------ */}
        <div className="mt-8 pt-8 border-t border-sprf-border">
          <div className="p-5 sm:p-6 rounded-2xl bg-sprf-surface-soft border border-sprf-border/90 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sprf-gold">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open In External Navigation Apps (Companion Launchers)</span>
                </div>
                <h3 className="text-base sm:text-lg font-serif text-sprf-navy">
                  Turn-by-Turn Mobile GPS Navigation
                </h3>
                <p className="text-xs text-sprf-muted font-light">
                  Need live voice guidance on your phone? Launch external navigation apps below. We use verified GPS coordinates to ensure maps never fails with &quot;place not found&quot;.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyNavUrl}
                  className="px-3 py-2 rounded-lg border border-sprf-border bg-white text-xs font-semibold text-sprf-charcoal hover:bg-sprf-surface flex items-center gap-1.5 transition-colors"
                  title="Copy navigation link"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-sprf-muted" />}
                  <span>{copiedLink ? 'Link Copied' : 'Share Route'}</span>
                </button>
              </div>
            </div>

            {/* Action Buttons Suite */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {/* 1. Google Maps Direct Route (Guaranteed GPS Route) */}
              <button
                type="button"
                onClick={handleOpenGoogleMaps}
                className="w-full px-4 py-3 rounded-xl bg-sprf-navy hover:bg-sprf-blue text-white text-xs font-bold flex items-center justify-between shadow-md hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-2 text-left">
                  <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
                    <Navigation className="w-3.5 h-3.5 text-sprf-gold group-hover:rotate-45 transition-transform" />
                  </div>
                  <div>
                    <span className="block font-bold">Google Maps</span>
                    <span className="text-[10px] text-white/70 block">Direct GPS Navigation</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-sprf-gold" />
              </button>

              {/* 2. Apple Maps */}
              <a
                href={buildAppleMapsUrl(origin)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-3 rounded-xl bg-white hover:bg-sprf-surface border border-sprf-border text-sprf-charcoal text-xs font-bold flex items-center justify-between shadow-xs transition-all group"
              >
                <div className="flex items-center gap-2 text-left">
                  <div className="w-6 h-6 rounded-md bg-sprf-surface flex items-center justify-center">
                    <Compass className="w-3.5 h-3.5 text-sprf-navy" />
                  </div>
                  <div>
                    <span className="block font-bold">Apple Maps</span>
                    <span className="text-[10px] text-sprf-muted block">iOS Navigation</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-sprf-muted group-hover:text-sprf-navy" />
              </a>

              {/* 3. Waze */}
              <a
                href={buildWazeUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-3 rounded-xl bg-white hover:bg-sprf-surface border border-sprf-border text-sprf-charcoal text-xs font-bold flex items-center justify-between shadow-xs transition-all group"
              >
                <div className="flex items-center gap-2 text-left">
                  <div className="w-6 h-6 rounded-md bg-sprf-surface flex items-center justify-center">
                    <Car className="w-3.5 h-3.5 text-sprf-navy" />
                  </div>
                  <div>
                    <span className="block font-bold">Waze App</span>
                    <span className="text-[10px] text-sprf-muted block">Real-time Traffic</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-sprf-muted group-hover:text-sprf-navy" />
              </a>

              {/* 4. Google Maps Search */}
              <a
                href={buildGoogleMapsSearchUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-3 rounded-xl bg-white hover:bg-sprf-surface border border-sprf-border text-sprf-charcoal text-xs font-bold flex items-center justify-between shadow-xs transition-all group"
              >
                <div className="flex items-center gap-2 text-left">
                  <div className="w-6 h-6 rounded-md bg-sprf-surface flex items-center justify-center">
                    <MapPin className="w-3.5 h-3.5 text-sprf-gold" />
                  </div>
                  <div>
                    <span className="block font-bold">Search Place</span>
                    <span className="text-[10px] text-sprf-muted block">Google Search Pin</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-sprf-muted group-hover:text-sprf-navy" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
