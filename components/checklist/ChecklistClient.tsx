'use client';

import React, { useState, useMemo, useSyncExternalStore } from 'react';
import {
  CheckSquare,
  Square,
  RotateCcw,
  Printer,
  FileText,
  Laptop,
  Home,
  HeartPulse,
  Wallet,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: string;
  text: string;
  subtext?: string;
  isCrucial?: boolean;
}

const CHECKLIST_SECTIONS: {
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  items: ChecklistItem[];
}[] = [
  {
    category: 'Admission & Official Documents',
    icon: FileText,
    description: 'Pack all documents in a secure waterproof folder. Bring originals plus at least 4 clear photocopies of each.',
    items: [
      { id: 'doc-1', category: 'Admission', text: 'JAMB Admission Letter (Institution copy with barcode)', isCrucial: true },
      { id: 'doc-2', category: 'Admission', text: 'Venite University Official Admission Letter', isCrucial: true },
      { id: 'doc-3', category: 'Admission', text: "O'Level Result(s) (WAEC / NECO / NABTEB) & Scratch Cards", isCrucial: true },
      { id: 'doc-4', category: 'Admission', text: 'Birth Certificate or Sworn Age Declaration Affidavit', isCrucial: true },
      { id: 'doc-5', category: 'Admission', text: 'Local Government Area (LGA) Identification Certificate' },
      { id: 'doc-6', category: 'Admission', text: 'Twelve (12) recent passport photographs with white background', isCrucial: true },
      { id: 'doc-7', category: 'Admission', text: 'Official Payment Receipts (Tuition, Acceptance & Hostel fees)', isCrucial: true },
      { id: 'doc-8', category: 'Admission', text: 'Attestation / Recommendation Letter from recognized authority' },
    ],
  },
  {
    category: 'Computing & Academic Supplies',
    icon: Laptop,
    description: 'Technical equipment and supplies to hit the ground running with SPRF coding cohorts.',
    items: [
      { id: 'tech-1', category: 'Tech', text: 'Laptop computer & charger with compatible power adapter', isCrucial: true },
      { id: 'tech-2', category: 'Tech', text: 'Power extension box / surge protector', isCrucial: true },
      { id: 'tech-3', category: 'Tech', text: 'USB flash drive (at least 32GB) for academic files and software distribution' },
      { id: 'tech-4', category: 'Tech', text: 'Quality notebooks, pens, highlighters, and document folder' },
      { id: 'tech-5', category: 'Tech', text: 'Rechargeable LED study lamp for nighttime reading in hostel rooms' },
    ],
  },
  {
    category: 'Hostel & Residential Necessities',
    icon: Home,
    description: 'Personal living items. Note: High-wattage heating appliances are prohibited.',
    items: [
      { id: 'res-1', category: 'Hostel', text: 'Bedsheets (standard single bed), pillowcase, and light blanket' },
      { id: 'res-2', category: 'Hostel', text: 'Padlocks with spare keys for your hostel wardrobe and luggage' },
      { id: 'res-3', category: 'Hostel', text: 'Washing bucket, plastic bowl, laundry detergent, and clothes pegs' },
      { id: 'res-4', category: 'Hostel', text: 'Toiletries: bath soap, toothbrush, toothpaste, towels, and slippers' },
      { id: 'res-5', category: 'Hostel', text: 'Plate, spoon, mug, water bottle, and covered food bowl' },
      { id: 'res-6', category: 'Hostel', text: 'Treated mosquito bed net for bedroom comfort' },
    ],
  },
  {
    category: 'Medical & Personal Wellbeing',
    icon: HeartPulse,
    description: 'Health clearances and emergency healthcare essentials.',
    items: [
      { id: 'med-1', category: 'Health', text: 'Personal prescribed medications with doctor prescription slips' },
      { id: 'med-2', category: 'Health', text: 'Basic first-aid travel pouch (pain relief, plasters, antiseptic)' },
      { id: 'med-3', category: 'Health', text: 'Completed medical screening form / questionnaire if pre-distributed' },
    ],
  },
  {
    category: 'Travel, Finance & Final Departure',
    icon: Wallet,
    description: 'Money logistics and travel coordination before setting out for Iloro-Ekiti.',
    items: [
      { id: 'trv-1', category: 'Travel', text: 'Emergency cash in smaller denominations for motor park transfers and tricycles', isCrucial: true },
      { id: 'trv-2', category: 'Travel', text: 'Fully charged mobile phone and high-capacity portable power bank', isCrucial: true },
      { id: 'trv-3', category: 'Travel', text: 'National Identity Number (NIN) slip or valid government ID' },
      { id: 'trv-4', category: 'Travel', text: 'SPRF Arrival Helpline (+234 800 000 7773) saved in your phone contacts', isCrucial: true },
      { id: 'trv-5', category: 'Travel', text: 'Downloaded or screenshotted Google Maps route to Venite University' },
    ],
  },
];

const STORAGE_KEY = 'sprf_arrival_checklist_v1';

function subscribeChecklist(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('sprf-checklist-changed', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('sprf-checklist-changed', callback);
  };
}

function getChecklistSnapshot(): string {
  if (typeof window === 'undefined') return '{}';
  return localStorage.getItem(STORAGE_KEY) || '{}';
}

function getServerChecklistSnapshot(): string {
  return '{}';
}

export function ChecklistClient() {
  const snapshotStr = useSyncExternalStore(
    subscribeChecklist,
    getChecklistSnapshot,
    getServerChecklistSnapshot
  );

  const checkedItems = useMemo<Record<string, boolean>>(() => {
    try {
      return JSON.parse(snapshotStr);
    } catch {
      return {};
    }
  }, [snapshotStr]);

  const [showResetModal, setShowResetModal] = useState(false);

  // Save changes
  const toggleItem = (id: string) => {
    try {
      const updated = { ...checkedItems, [id]: !checkedItems[id] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('sprf-checklist-changed'));
    } catch (e) {
      console.warn('Could not save checklist');
    }
  };

  const resetChecklist = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event('sprf-checklist-changed'));
    } catch (e) {
      console.warn('Could not reset storage');
    }
    setShowResetModal(false);
  };

  // Calculations
  const allItems = CHECKLIST_SECTIONS.flatMap((s) => s.items);
  const totalCount = allItems.length;
  const completedCount = allItems.filter((i) => checkedItems[i.id]).length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-8">
      {/* Sticky Progress Bar Card */}
      <div className="sprf-card rounded-2xl p-6 bg-white sticky top-20 z-30 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-sprf-gold">
                Preparation Progress
              </span>
              <span className="text-xs text-sprf-muted">·</span>
              <span className="text-xs font-semibold text-sprf-navy">
                {completedCount} of {totalCount} items packed
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif text-sprf-navy">
              {percentage === 100
                ? '🎉 Ready for Venite University!'
                : percentage > 60
                ? 'Almost there! Keep packing.'
                : 'Pack your essentials before departure'}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-lg border border-sprf-border text-xs font-semibold text-sprf-charcoal hover:bg-sprf-surface flex items-center gap-1.5 transition-colors print:hidden"
              title="Print checklist"
            >
              <Printer className="w-3.5 h-3.5 text-sprf-muted" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              className="px-3.5 py-2 rounded-lg border border-sprf-border text-xs font-semibold text-sprf-charcoal hover:bg-sprf-surface flex items-center gap-1.5 transition-colors print:hidden"
              title="Reset progress"
            >
              <RotateCcw className="w-3.5 h-3.5 text-sprf-muted" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full bg-sprf-surface rounded-full h-3.5 overflow-hidden border border-sprf-border/60">
          <div
            className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-sprf-gold to-sprf-navy"
            style={{ width: `${Math.max(percentage, 2)}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[11px] text-sprf-muted mt-2">
          <span>Saved locally on your device</span>
          <span className="font-bold text-sprf-navy font-mono">{percentage}% Completed</span>
        </div>
      </div>

      {/* Sections List */}
      <div className="space-y-6">
        {CHECKLIST_SECTIONS.map((section) => {
          const SectionIcon = section.icon;
          const sectionCompleted = section.items.filter((i) => checkedItems[i.id]).length;

          return (
            <div key={section.category} className="sprf-card rounded-2xl p-6 sm:p-8 bg-white">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-sprf-border">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sprf-navy/5 text-sprf-navy flex items-center justify-center shrink-0 mt-0.5">
                    <SectionIcon className="w-5 h-5 text-sprf-gold" />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif text-sprf-navy">{section.category}</h4>
                    <p className="text-xs text-sprf-muted mt-0.5 leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-sprf-surface text-sprf-charcoal shrink-0">
                  {sectionCompleted} / {section.items.length}
                </span>
              </div>

              <div className="mt-4 divide-y divide-sprf-border/60">
                {section.items.map((item) => {
                  const isChecked = !!checkedItems[item.id];
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      className={`w-full py-3.5 flex items-start gap-3.5 text-left transition-colors group ${
                        isChecked ? 'opacity-60' : 'hover:bg-sprf-surface/40'
                      }`}
                    >
                      <div className="shrink-0 mt-0.5">
                        {isChecked ? (
                          <CheckSquare className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <Square className="w-5 h-5 text-sprf-muted group-hover:text-sprf-gold transition-colors" />
                        )}
                      </div>
                      <div className="flex-1">
                        <span
                          className={`text-sm leading-relaxed block ${
                            isChecked
                              ? 'line-through text-sprf-muted'
                              : 'text-sprf-charcoal font-medium'
                          }`}
                        >
                          {item.text}
                        </span>
                        {item.isCrucial && !isChecked && (
                          <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50">
                            Required on Day 1
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Official Disclaimer */}
      <div className="p-4 rounded-xl bg-sprf-surface border border-sprf-border text-xs text-sprf-muted leading-relaxed">
        <p>
          <strong>Disclaimer:</strong> This interactive arrival checklist is an organizational preparation aid designed by the Student Programmer Representative Forum (SPRF). It does not replace or supersede formal directives issued by the Venite University Directorate of Academic Affairs or Directorate of Student Affairs.
        </p>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-sprf-border space-y-4">
            <h4 className="text-lg font-serif text-sprf-navy">Reset Arrival Checklist?</h4>
            <p className="text-xs text-sprf-muted leading-relaxed">
              This will uncheck all items and reset your packing progress back to 0%. This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded-lg border border-sprf-border text-xs font-semibold text-sprf-charcoal hover:bg-sprf-surface"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={resetChecklist}
                className="px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 shadow-sm"
              >
                Reset Checklist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
