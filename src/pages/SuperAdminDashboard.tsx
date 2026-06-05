/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useData } from '../hooks/useData';
import { 
  Store, 
  MapPin, 
  Tv, 
  Tag, 
  Plus, 
  ArrowRight, 
  Server, 
  Settings, 
  FileCheck, 
  Users, 
  Flame, 
  ExternalLink,
  Lock,
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import { motion } from 'motion/react';

export default function SuperAdminDashboard() {
  const { restaurants, branches, screens, promotions, setActiveRestaurantId } = useData();

  // Metrics
  const totalRestaurants = restaurants.length;
  const totalBranches = branches.length;
  const activeScreensCount = screens.filter(s => s.status === 'online').length;
  const totalPromotions = promotions.length;

  const navigateToTenant = (id: string) => {
    setActiveRestaurantId(id);
    window.location.hash = '#/restaurant-detail';
  };

  return (
    <div className="space-y-6" id="super-admin-dashboard">
      
      {/* Intro Banner Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 text-slate-850 relative overflow-hidden shadow-sm" id="intro-banner">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Server className="h-32 w-32 text-slate-400" />
        </div>

        <div className="max-w-2xl">
          <span className="bg-orange-50 text-[#EA580C] font-mono text-[10px] px-2.5 py-1 rounded-full uppercase tracking-widest border border-orange-100 inline-block font-bold">
            Amin Global Core Node
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-black tracking-tight text-slate-900 mt-2.5">
            HQ Central Management Control
          </h2>
          <p className="text-xs text-slate-500 mt-2 pb-4 leading-relaxed">
            Monitor, override, and provision multi-tenant nodes. You possess top-level clearance to manipulate active menus, configure digital counter displays, parse vintage menus using OCR models, and assign campaigns across all connected branches instantly.
          </p>
        </div>

        {/* Info row */}
        <div className="flex flex-wrap gap-4 text-xs font-mono border-t border-slate-100 pt-4">
          <span className="text-emerald-600 flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            VOD Streaming Servers Active
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500">Database Core: Relational Scale-to-Zero Node</span>
          <span className="text-slate-300">•</span>
          <span className="text-[#EA580C] font-bold">Merchant Token Session Active</span>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="saas-metrics-row">
        
        {/* Total Restaurants */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Tenants Count</span>
            <p className="text-3xl font-display font-black text-slate-950 mt-1">{totalRestaurants}</p>
            <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">Miracle, Chef's, Mac In Chicken</span>
          </div>
          <div className="bg-orange-50 text-[#EA580C] p-3 rounded-xl border border-orange-100">
            <Store className="h-6 w-6" />
          </div>
        </div>

        {/* Total Branches */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active Branches</span>
            <p className="text-3xl font-display font-black text-slate-950 mt-1">{totalBranches}</p>
            <span className="text-[10px] text-emerald-600 font-mono mt-0.5 block font-semibold">100% Locations Live</span>
          </div>
          <div className="bg-blue-50 text-blue-600 p-3 rounded-xl border border-blue-100">
            <MapPin className="h-6 w-6" />
          </div>
        </div>

        {/* Active Screens */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Counters & Screens</span>
            <p className="text-3xl font-display font-black text-slate-950 mt-1">{activeScreensCount} <span className="text-xs text-slate-400 font-normal">/ {screens.length}</span></p>
            <span className="text-[10px] text-emerald-600 font-mono mt-0.5 block font-semibold">{screens.filter(s => s.status === 'online').length} Board Devices Active</span>
          </div>
          <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl border border-emerald-100">
            <Tv className="h-6 w-6" />
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active Deals</span>
            <p className="text-3xl font-display font-black text-slate-950 mt-1">{totalPromotions}</p>
            <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">Running menu ticker events</span>
          </div>
          <div className="bg-purple-50 text-purple-600 p-3 rounded-xl border border-purple-100">
            <Tag className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Main Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Recent Tenants list */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold font-display text-slate-950">Tenant Client Onboarding Registry</h3>
              <p className="text-xs text-slate-400">Manage individual subscription profiles, products catalog, and digital units.</p>
            </div>
            
            <button 
              onClick={() => { window.location.hash = '#/restaurants'; }}
              className="text-[#EA580C] hover:text-[#EA580C]/90 text-xs font-bold inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100" id="super-recent-restaurants">
            {restaurants.map((rest) => {
              const bCount = branches.filter(b => b.restaurantId === rest.id).length;
              const sCount = screens.filter(s => s.restaurantId === rest.id).length;
              const pCount = promotions.filter(p => p.restaurantId === rest.id).length;

              return (
                <div key={rest.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 group">
                  <div className="flex items-center gap-4">
                    <img 
                      referrerPolicy="no-referrer"
                      src={rest.logoUrl} 
                      alt={rest.name} 
                      className="w-12 h-12 rounded-xl object-cover border border-slate-250 shadow-sm shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#EA580C] transition-colors">{rest.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5 font-light max-w-sm truncate">{rest.description}</p>
                      
                      <div className="flex items-center gap-3.5 mt-2 text-[10px] font-mono text-slate-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-slate-500" />
                          {bCount} Branches
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Tv className="h-3 w-3 text-slate-500" />
                          {sCount} Screens Active
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Tag className="h-3 w-3 text-slate-500" />
                          {pCount} Promos
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigateToTenant(rest.id)}
                    className="bg-slate-50 border border-slate-200 hover:bg-orange-50 hover:border-orange-200 text-slate-600 hover:text-[#EA580C] font-semibold px-3 py-1.5 rounded-lg text-xs tracking-wide self-start sm:self-center transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Manage Client</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Platform State Overview & Live Screen Telemetry list */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 space-y-4">
          <div>
            <h3 className="text-base font-bold font-display text-slate-950">Active Display Stream</h3>
            <p className="text-xs text-slate-400">Live operational status of digital boards across terminals.</p>
          </div>

          <div className="space-y-3" id="super-displays-feed">
            {screens.slice(0, 4).map((screen) => {
              const rest = restaurants.find(r => r.id === screen.restaurantId);
              const branch = branches.find(b => b.id === screen.branchId);
              
              return (
                <div key={screen.id} className="bg-slate-50 border border-slate-150 p-3 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block truncate max-w-[150px]">{screen.name}</span>
                      <span className="text-[9px] font-mono text-slate-400">{rest?.name} • {branch?.name}</span>
                    </div>

                    <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold ${
                      screen.status === 'online' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-150' 
                        : screen.status === 'updating'
                        ? 'bg-amber-50 text-amber-700 border border-amber-150 animate-pulse'
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      {screen.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-[10px] font-mono text-slate-400">
                    <span>Template: {screen.templateId}</span>
                    <a 
                      href={screen.url} 
                      className="text-[#EA580C] font-semibold hover:underline flex items-center gap-0.5"
                    >
                      <span>Preview</span>
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Info Box */}
          <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-[11px] text-amber-800 space-y-1">
            <span className="font-bold flex items-center gap-1">
              <Lock className="h-3.5 w-3.5 text-amber-600" />
              Relational DB Security Armed
            </span>
            <p className="text-amber-700">Any product added here updates the visual layout and database schema immediately. Digital counters consume this downstream.</p>
          </div>
        </div>

      </div>

    </div>
  );
}
