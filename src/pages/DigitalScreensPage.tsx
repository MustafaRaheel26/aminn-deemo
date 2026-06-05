/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useData } from '../hooks/useData';
import { 
  Tv, 
  Plus, 
  ExternalLink, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Wifi, 
  MapPin, 
  Smartphone, 
  Info,
  Layers
} from 'lucide-react';
import { motion } from 'motion/react';

export default function DigitalScreensPage() {
  const { screens, branches, restaurants, activeRestaurantId, addScreen } = useData();
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Custom Screen form state
  const [name, setName] = useState('');
  const [branchId, setBranchId] = useState('');
  const [templateId, setTemplateId] = useState<'grid-two-col' | 'featured-large' | 'drinks-list'>('grid-two-col');

  // Filter list depending on tenant scope
  const filteredScreens = activeRestaurantId 
    ? screens.filter(s => s.restaurantId === activeRestaurantId)
    : screens;

  const currentRestObj = restaurants.find(r => r.id === activeRestaurantId);
  const tenantBranches = branches.filter(b => b.restaurantId === (activeRestaurantId || 'rest-miracle'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !branchId) return;

    const chosenRestId = activeRestaurantId || 'rest-miracle';

    addScreen({
      restaurantId: chosenRestId,
      branchId,
      name,
      status: 'online',
      url: `#/preview/scr-gen-${Date.now()}`,
      lastUpdated: 'Just now',
      orientation: 'landscape',
      templateId
    });

    setName('');
    setBranchId('');
    setShowAddForm(false);
    alert(`Digital screen "${name}" configured and booted online!`);
  };

  return (
    <div className="space-y-6" id="digital-screens-page">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-extrabold text-slate-950 tracking-tight">
            {activeRestaurantId ? `${currentRestObj?.name} Digital Display Nodes` : 'SaaS TV Grid Terminal'}
          </h2>
          <p className="text-xs text-slate-500 font-light mt-0.5">
            Monitor browser endpoints, template structures, and cloud heartbeats of digital storefront hardware.
          </p>
        </div>

        {/* Form toggler */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#EA580C] hover:bg-[#EA580C]/90 text-white font-semibold py-2.5 px-4 rounded-lg text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
          id="add-screen-trigger"
        >
          <Plus className="h-4 w-4" />
          <span>{showAddForm ? 'Close Setup' : 'Provision Screen'}</span>
        </button>
      </div>

      {/* Add Screen Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4 max-w-2xl" id="add-screen-form">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest font-mono">Bootscreen Configuration Parameters</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                TV Screen Name *
              </label>
              <input 
                type="text"
                required
                placeholder="e.g. Overhead Counter Board 3"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]/35"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Target Branch Location *
              </label>
              <select
                required
                value={branchId}
                onChange={e => setBranchId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-305 rounded-lg p-2.5 text-xs text-slate-700 font-semibold focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]/35"
              >
                <option value="">Select branch...</option>
                {tenantBranches.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>

            <div className="col-span-1 md:col-span-3">
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Screen Template Layout
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="border border-slate-200 p-3 rounded-xl flex items-center gap-3.5 cursor-pointer hover:bg-slate-50">
                  <input 
                    type="radio" 
                    name="tmpl" 
                    checked={templateId === 'grid-two-col'} 
                    onChange={() => setTemplateId('grid-two-col')}
                    className="accent-[#EA580C] h-4 w-4"
                  />
                  <div>
                    <span className="font-bold text-slate-800 text-xs block">Grid Dual-Column</span>
                    <span className="text-[10px] text-slate-400">Perfect for heavy catalogs</span>
                  </div>
                </label>

                <label className="border border-slate-200 p-3 rounded-xl flex items-center gap-3.5 cursor-pointer hover:bg-slate-50">
                  <input 
                    type="radio" 
                    name="tmpl" 
                    checked={templateId === 'featured-large'} 
                    onChange={() => setTemplateId('featured-large')}
                    className="accent-[#EA580C] h-4 w-4"
                  />
                  <div>
                    <span className="font-bold text-slate-800 text-xs block">Promo Special Banner</span>
                    <span className="text-[10px] text-slate-400">Features huge center deals</span>
                  </div>
                </label>

                <label className="border border-slate-200 p-3 rounded-xl flex items-center gap-3.5 cursor-pointer hover:bg-slate-50">
                  <input 
                    type="radio" 
                    name="tmpl" 
                    checked={templateId === 'drinks-list'} 
                    onChange={() => setTemplateId('drinks-list')}
                    className="accent-[#EA580C] h-4 w-4"
                  />
                  <div>
                    <span className="font-bold text-slate-800 text-xs block">Drinks & Cafe List</span>
                    <span className="text-[10px] text-slate-400">Designed for side beverage screens</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button 
              type="button" 
              onClick={() => setShowAddForm(false)}
              className="border border-slate-300 text-slate-750 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="bg-[#EA580C] hover:bg-[#EA580C]/90 text-white px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Boot Display Online
            </button>
          </div>
        </form>
      )}

      {/* Screen Devices GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="screens-terminal-grid">
        {filteredScreens.map(scr => {
          const parentRest = restaurants.find(r => r.id === scr.restaurantId);
          const parentBranch = branches.find(b => b.id === scr.branchId);

          return (
            <div 
              key={scr.id}
              className="bg-white border border-slate-200 hover:border-[#EA580C]/40 transition-all rounded-3xl p-5 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                {/* Physical TV Model decoration header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="bg-slate-100 p-2 rounded-xl text-slate-500 border border-slate-250 shrink-0">
                      <Tv className="h-5 w-5 text-[#EA580C]" />
                    </div>
                    <div>
                      <span className="bg-slate-100 border border-slate-200 text-slate-500 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded leading-none">
                        {parentRest?.name} • Node
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-sm mt-0.5">{scr.name}</h4>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded font-mono text-[10px] font-bold border ${
                    scr.status === 'online' 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-150' 
                      : scr.status === 'updating'
                      ? 'bg-amber-50 text-amber-800 border-amber-100 animate-pulse'
                      : 'bg-slate-120 text-slate-400'
                  }`}>
                    ● {scr.status.toUpperCase()}
                  </span>
                </div>

                {/* Sub details */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase font-mono tracking-wider">Assigned Branch</span>
                    <span className="font-semibold text-slate-800 truncate block mt-0.5">
                      <MapPin className="h-3 w-3 inline text-slate-400 mr-1 pb-0.5" />
                      {parentBranch?.name || 'Central Headquarter'}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase font-mono tracking-wider">Sync Heartbeat</span>
                    <span className="font-semibold text-slate-600 block mt-0.5">
                      <Wifi className="h-3 w-3 inline text-emerald-500 mr-1" />
                      {scr.lastUpdated}
                    </span>
                  </div>

                  <div className="col-span-2">
                    <span className="block text-[10px] text-slate-400 uppercase font-mono tracking-wider">Installed Display URL (Downstream Iframe)</span>
                    <div className="bg-slate-50 border border-slate-150 p-2 rounded-lg font-mono text-[11px] text-slate-500 mt-1 flex items-center justify-between overflow-hidden text-ellipsis">
                      <span className="truncate pr-4 select-all">{scr.url}</span>
                      <span className="text-[9px] font-bold text-slate-300 font-sans uppercase shrink-0">Web Code</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Display card control actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5 text-slate-550" />
                  <span>Template ID: <b className="font-sans text-slate-600 font-bold">{scr.templateId}</b></span>
                </div>

                <button
                  onClick={() => {
                    window.location.hash = scr.url;
                  }}
                  className="bg-[#EA580C] hover:bg-[#EA580C]/90 text-white font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>Preview Screen</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Hardware Optimization Guideline */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 space-y-2 max-w-4xl shadow-xl">
        <h5 className="text-sm font-semibold tracking-wide uppercase font-mono text-orange-400">Commercial TV Hardware Sizing Guidelines</h5>
        <p className="text-xs text-slate-300 leading-relaxed font-light">
          Any consumer or industrial TV display panel (43", 55", or 65" Android TV, LG webOS, or Samsung Tizen) can consume this high-fidelity layout. Boot the TV browser, navigate to your screen's Unique Web URL, and trigger F11 for distraction-free edge-to-edge counter displays. Menus sync in real time of 250ms when kitchen pricing changes.
        </p>
      </div>

    </div>
  );
}
