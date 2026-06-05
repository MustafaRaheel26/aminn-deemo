/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useData } from '../hooks/useData';
import { LogOut, User, Settings, Wifi, Eye, Radio, Server, RefreshCw } from 'lucide-react';

export default function Header() {
  const { currentUser, setCurrentUser, activeRestaurantId, restaurants, setActiveRestaurantId } = useData();

  const handleSignOut = () => {
    setCurrentUser(null);
    window.location.hash = '#/login';
  };

  const activeRestaurantObj = restaurants.find(r => r.id === activeRestaurantId);

  return (
    <header className="bg-white border-b border-slate-200 h-16 px-6 lg:px-8 flex items-center justify-between sticky top-0 z-40 shadow-sm" id="main-header">
      {/* Left side: Context details */}
      <div className="flex items-center gap-4">
        {currentUser?.role === 'super_admin' ? (
          <div className="flex items-center gap-3">
            <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-amber-200 uppercase tracking-wider font-mono">
              <Server className="h-3.5 w-3.5" />
              Super Admin Mode
            </span>
            
            {/* Quick Tenant Switcher Dropdown */}
            <div className="hidden sm:flex items-center gap-2 text-xs border-l border-slate-200 pl-4">
              <span className="text-slate-400">Context Workspace:</span>
              <select
                value={activeRestaurantId || ''}
                onChange={(e) => setActiveRestaurantId(e.target.value || null)}
                className="bg-slate-50 border border-slate-300 rounded px-2 py-1 font-semibold text-slate-700 outline-none focus:border-[#EA580C] cursor-pointer"
                id="header-tenant-switcher"
              >
                <option value="">Global Overview</option>
                {restaurants.map(rest => (
                  <option key={rest.id} value={rest.id}>
                    Manage: {rest.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <span className="text-xs uppercase font-mono tracking-widest text-slate-400">Merchant Hub</span>
            <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#EA580C]" />
              {activeRestaurantObj?.name || 'Loading Restaurant...'}
            </span>
          </div>
        )}
      </div>

      {/* Right side: Connection states & Avatar dropdown */}
      <div className="flex items-center gap-4">
        {/* Network status simulator */}
        <div className="hidden md:flex items-center gap-5 text-xs text-slate-400 pr-4 border-r border-slate-200">
          <span className="flex items-center gap-1.5 font-mono text-emerald-600">
            <Wifi className="h-3.5 w-3.5" />
            Display Link Live
          </span>
          <span className="flex items-center gap-1.5 font-mono">
            <Radio className="h-3.5 w-3.5 text-[#EA580C] animate-pulse" />
            9 Screens Pushing
          </span>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-800">{currentUser?.name}</p>
            <p className="text-[10px] font-mono text-slate-400 lowercase">{currentUser?.email}</p>
          </div>
          
          <div className="relative group">
            <button className="flex items-center focus:outline-none focus:ring-2 focus:ring-[#EA580C]/40 rounded-full transition-all" id="header-user-menu">
              <img
                referrerPolicy="no-referrer"
                src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop'}
                alt="Profile Avatar"
                className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-sm"
              />
            </button>
            
            {/* Popover on hover/focus */}
            <div className="absolute right-0 top-10 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-1 hidden group-hover:block transition-all z-50">
              <div className="px-4 py-2 border-b border-slate-100 text-xs text-slate-400">
                System Options
              </div>
              <button
                onClick={() => {
                  if (currentUser?.role === 'super_admin') {
                    window.location.hash = '#/super-dashboard';
                  } else {
                    window.location.hash = '#/restaurant-dashboard';
                  }
                }}
                className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <User className="h-4.5 w-4.5 text-slate-400" />
                <span>My Dashboard</span>
              </button>
              
              <button
                onClick={() => {
                  try {
                    localStorage.clear();
                    window.location.reload();
                  } catch (e) {}
                }}
                className="w-full text-left px-4 py-2 text-xs text-amber-600 hover:bg-amber-50 flex items-center gap-2"
                id="reset-demo-btn"
              >
                <RefreshCw className="h-4.5 w-4.5 text-amber-500 animate-spin-slow" />
                <span>Reset Demo State</span>
              </button>

              <hr className="border-slate-100 my-1" />
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-semibold"
                id="logout-btn"
              >
                <LogOut className="h-4.5 w-4.5 text-rose-500" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
