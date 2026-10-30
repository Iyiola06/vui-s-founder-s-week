'use client';

import React, { useState } from 'react';
import { FileText, Download, Plus, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

interface ResourceItem {
  id: string;
  title: string;
  description: string;
  fileType: string;
  category: string;
}

const defaultResources: ResourceItem[] = [
  {
    id: 'res-1',
    title: '2026/2027 Orientation Programme Guidebook (PDF)',
    description: 'Complete digital prospectus, academic calendar, campus map, and code of conduct for freshers.',
    fileType: 'PDF Document',
    category: 'Academic',
  },
  {
    id: 'res-2',
    title: 'Fresher Physical Clearance & Document Checklist',
    description: 'Printable verification matrix with checklist boxes for all 8 mandatory credential items.',
    fileType: 'Checklist Sheet',
    category: 'Registration',
  },
  {
    id: 'res-3',
    title: 'Venite University Iloro-Ekiti Campus Transit Map',
    description: 'High-resolution architectural map showing gates, auditorium, faculties, and hostels.',
    fileType: 'Campus Map',
    category: 'Travel & Map',
  },
];

export default function AdminResourcesClient() {
  const [resources, setResources] = useState<ResourceItem[]>(defaultResources);
  const [newRes, setNewRes] = useState({
    title: '',
    description: '',
    fileType: 'PDF Document',
    category: 'Academic',
  });
  const [showAdd, setShowAdd] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const item: ResourceItem = {
      id: `res-${Date.now()}`,
      ...newRes,
    };
    setResources([...resources, item]);
    setNewRes({ title: '', description: '', fileType: 'PDF Document', category: 'Academic' });
    setShowAdd(false);
    setMsg('Student resource added successfully.');
    setTimeout(() => setMsg(null), 3000);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Remove this resource item?')) return;
    setResources(resources.filter((r) => r.id !== id));
    setMsg('Resource removed.');
    setTimeout(() => setMsg(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-sprf-border">
        <div>
          <h3 className="text-xl font-serif text-sprf-navy mb-1">Downloadable Guides & Resources</h3>
          <p className="text-xs text-sprf-muted">
            Manage prospectus PDFs, printable clearance sheets, and campus orientation materials.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAdd(!showAdd)}
          className="px-4 py-2 rounded-lg bg-sprf-navy text-white text-xs font-bold uppercase tracking-wider hover:bg-sprf-blue transition-colors"
        >
          {showAdd ? 'Cancel' : '+ Add Resource'}
        </button>
      </div>

      {msg && (
        <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{msg}</span>
        </div>
      )}

      {showAdd && (
        <form onSubmit={handleAdd} className="sprf-card rounded-2xl p-6 bg-white space-y-4 max-w-xl">
          <h4 className="text-base font-serif text-sprf-navy font-bold">Add Student Download Resource</h4>

          <div>
            <label className="text-[11px] font-bold uppercase text-sprf-charcoal block mb-1">Title *</label>
            <input
              type="text"
              required
              value={newRes.title}
              onChange={(e) => setNewRes({ ...newRes, title: e.target.value })}
              placeholder="e.g. Student Handbook 2026/2027"
              className="w-full px-3 py-2 rounded-lg bg-sprf-surface border border-sprf-border text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold uppercase text-sprf-charcoal block mb-1">File Type</label>
              <input
                type="text"
                value={newRes.fileType}
                onChange={(e) => setNewRes({ ...newRes, fileType: e.target.value })}
                placeholder="PDF / Map / Sheet"
                className="w-full px-3 py-2 rounded-lg bg-sprf-surface border border-sprf-border text-xs"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase text-sprf-charcoal block mb-1">Category</label>
              <input
                type="text"
                value={newRes.category}
                onChange={(e) => setNewRes({ ...newRes, category: e.target.value })}
                placeholder="Academic / Registration"
                className="w-full px-3 py-2 rounded-lg bg-sprf-surface border border-sprf-border text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase text-sprf-charcoal block mb-1">Description</label>
            <textarea
              rows={2}
              value={newRes.description}
              onChange={(e) => setNewRes({ ...newRes, description: e.target.value })}
              placeholder="Summary of this downloadable resource..."
              className="w-full px-3 py-2 rounded-lg bg-sprf-surface border border-sprf-border text-xs"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-sprf-navy text-white text-xs font-bold uppercase"
            >
              Save Resource
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resources.map((res) => (
          <div key={res.id} className="sprf-card rounded-2xl p-6 bg-white space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-sprf-gold uppercase">{res.category}</span>
                <span className="font-mono text-[10px] text-sprf-muted">{res.fileType}</span>
              </div>
              <h4 className="text-base font-serif text-sprf-navy font-bold leading-snug">{res.title}</h4>
              <p className="text-xs text-sprf-muted leading-relaxed font-light">{res.description}</p>
            </div>

            <div className="pt-3 border-t border-sprf-border flex justify-between items-center text-xs">
              <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                Available
              </span>
              <button
                type="button"
                onClick={() => handleDelete(res.id)}
                className="text-red-500 hover:text-red-700 p-1"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
