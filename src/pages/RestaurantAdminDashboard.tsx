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
  Utensils, 
  Plus, 
  ExternalLink,
  Zap,
  HelpCircle,
  TrendingUp,
  Briefcase,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function RestaurantAdminDashboard() {
  const { 
    restaurants, 
    categories, 
    products, 
    branches, 
    screens, 
    promotions, 
    activeRestaurantId,
    currentUser
  } = useData();

  const currentRestId = activeRestaurantId || 'rest-miracle';
  const myRestaurant = restaurants.find(r => r.id === currentRestId);

  // Scoped calculation
  const myCategories = categories.filter(c => c.restaurantId === currentRestId);
  const myProducts = products.filter(p => p.restaurantId === currentRestId);
  const myBranches = branches.filter(b => b.restaurantId === currentRestId);
  const myScreens = screens.filter(s => s.restaurantId === currentRestId);
  const myPromotions = promotions.filter(p => p.restaurantId === currentRestId);

  return (
    <div className="space-y-6" id="restaurant-admin-dashboard">
      
      {/* Visual Header Welcome banner */}
      <div className="bg-gradient-to-br from-[#EA580C] to-orange-500 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Store className="h-28 w-28 text-white" />
        </div>

        <div className="max-w-xl">
          <span className="bg-white/10 backdrop-blur-md text-orange-50 text-[10px] px-2.5 py-1 rounded-full font-mono uppercase tracking-widest border border-white/10 inline-block font-bold">
            Authorized Tenant Workspace
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight mt-3">
            Welcome back to the {myRestaurant?.name} Hub!
          </h2>
          <p className="text-xs text-orange-50 mt-1 leading-relaxed">
            Real-time display engine fully operational. You are managing digital channels, menus, prices, and special campaigns for the <b>{myRestaurant?.name}</b> franchise node.
          </p>
        </div>

        {/* Quick info status line */}
        <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-white/15 text-xs text-orange-100 font-mono">
          <span className="flex items-center gap-1">
            <Zap className="h-4.5 w-4.5 text-amber-300 animate-pulse" />
            Kitchen-to-TV cloud sync enabled
          </span>
          <span>•</span>
          <span>License Active till Dec 2026</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="tenant-dashboard-metrics">
        
        {/* Products */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Our Catalog Items</span>
            <p className="text-2xl font-black font-display text-slate-950 mt-1">{myProducts.length}</p>
            <span className="text-[10px] text-slate-400 font-mono block mt-0.5">Across {myCategories.length} folders</span>
          </div>
          <div className="bg-orange-50 text-[#EA580C] p-2.5 rounded-xl">
            <Utensils className="h-5.5 w-5.5" />
          </div>
        </div>

        {/* Branches */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Our Branches</span>
            <p className="text-2xl font-black font-display text-slate-950 mt-1">{myBranches.length}</p>
            <span className="text-[10px] text-slate-400 font-mono block mt-0.5">Physical properties</span>
          </div>
          <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl">
            <MapPin className="h-5.5 w-5.5" />
          </div>
        </div>

        {/* Screens */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active Displays</span>
            <p className="text-2xl font-black font-display text-slate-950 mt-1">
              {myScreens.filter(s => s.status === 'online').length} <span className="text-xs text-slate-400 font-normal">/ {myScreens.length}</span>
            </p>
            <span className="text-[10px] text-emerald-600 font-mono block mt-0.5 font-bold">100% online state</span>
          </div>
          <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl">
            <Tv className="h-5.5 w-5.5" />
          </div>
        </div>

        {/* Promo events */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Special Campaigns</span>
            <p className="text-2xl font-black font-display text-slate-950 mt-1">{myPromotions.length}</p>
            <span className="text-[10px] text-slate-400 font-mono block mt-0.5">Active display slates</span>
          </div>
          <div className="bg-purple-50 text-purple-600 p-2.5 rounded-xl">
            <Tag className="h-5.5 w-5.5" />
          </div>
        </div>

      </div>

      {/* Quick Launchpad Portal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Quick actions */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 lg:col-span-2 space-y-4">
          <div>
            <h3 className="text-base font-bold font-display text-slate-950">Merchant Task Launchpad</h3>
            <p className="text-xs text-slate-400">Direct shortcuts to manage menu and retail outputs.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <a 
              href="#/restaurant-detail"
              className="border border-slate-150 p-4 rounded-xl hover:border-[#EA580C] hover:bg-orange-50/10 transition-all block group"
            >
              <div className="flex items-center justify-between">
                <span className="bg-orange-100 text-[#EA580C] p-2 rounded-lg">
                  <Utensils className="h-5 w-5" />
                </span>
                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-[#EA580C] transition-colors" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs mt-3 group-hover:text-[#EA580C]">Review Menu Items & Prices</h4>
              <p className="text-[11px] text-slate-400 mt-1 h-8 overflow-hidden">Override prices, publish new combos, or customize labels for products.</p>
            </a>

            <a 
              href="#/screens"
              className="border border-slate-150 p-4 rounded-xl hover:border-[#EA580C] hover:bg-orange-50/10 transition-all block group"
            >
              <div className="flex items-center justify-between">
                <span className="bg-emerald-100 text-emerald-600 p-2 rounded-lg">
                  <Tv className="h-5 w-5" />
                </span>
                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-[#EA580C] transition-colors" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs mt-3 group-hover:text-[#EA580C]">Manage Digital Counters</h4>
              <p className="text-[11px] text-slate-400 mt-1 h-8 overflow-hidden">Review active browser URLs, inspect heartbeats, and check layout templates.</p>
            </a>

            <a 
              href="#/promotions"
              className="border border-slate-150 p-4 rounded-xl hover:border-[#EA580C] hover:bg-orange-50/10 transition-all block group"
            >
              <div className="flex items-center justify-between">
                <span className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                  <Tag className="h-5 w-5" />
                </span>
                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-[#EA580C] transition-colors" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs mt-3 group-hover:text-[#EA580C]">Trigger Holiday campaign</h4>
              <p className="text-[11px] text-slate-400 mt-1 h-8 overflow-hidden">Add sliding banner widgets, special weekend discounts, or lunch combos.</p>
            </a>

            <a 
              href="#/branches"
              className="border border-slate-150 p-4 rounded-xl hover:border-[#EA580C] hover:bg-orange-50/10 transition-all block group"
            >
              <div className="flex items-center justify-between">
                <span className="bg-blue-100 text-blue-600 p-2 rounded-lg text-blue-605">
                  <MapPin className="h-5 w-5" />
                </span>
                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-[#EA580C] transition-colors" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs mt-3 group-hover:text-[#EA580C]">Configure Branch Locations</h4>
              <p className="text-[11px] text-slate-400 mt-1 h-8 overflow-hidden">Keep address listings and contact telemetry up-to-date.</p>
            </a>

          </div>
        </div>

        {/* Right column: Devices quick list */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 space-y-4">
          <div>
            <h3 className="text-base font-bold font-display text-slate-950">Active Counters</h3>
            <p className="text-xs text-slate-400">Simulate TV Displays live on your storefront.</p>
          </div>

          <div className="space-y-3" id="tenant-screens-quicklist">
            {myScreens.map(scr => (
              <div key={scr.id} className="bg-slate-50 border border-slate-150 p-3 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block truncate">{scr.name}</span>
                  <span className="text-[9px] font-mono text-slate-400">Template ID: {scr.templateId}</span>
                </div>

                <a
                  href={scr.url}
                  className="bg-[#EA580C] hover:bg-[#EA580C]/90 text-white font-bold px-2.5 py-1.5 rounded text-[10px] uppercase font-mono flex items-center gap-0.5"
                >
                  <span>Preview TV</span>
                </a>
              </div>
            ))}
          </div>

          {/* Quick Support Guide */}
          <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-[11px] text-amber-800 flex items-start gap-2">
            <HelpCircle className="h-4.5 w-4.5 text-amber-600 shrink-0 mt-0.5" />
            <p>To demonstrate other restaurants, click on your profile photo in top-right header and select "Reset Demo State" to return to login credentials portal.</p>
          </div>
        </div>

      </div>

    </div>
  );
}
