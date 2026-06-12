/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useData } from "../hooks/useData";
import {
  LayoutDashboard,
  Store,
  Tv,
  Tag,
  MapPin,
  UserSquare2,
  Sliders,
  LogOut,
  Sparkles,
  HelpCircle,
  Cpu,
  ChevronRight,
  RefreshCw,
  Utensils,
} from "lucide-react";

interface SidebarProps {
  currentPath: string;
  className?: string;
}

export default function Sidebar({ currentPath, className = "" }: SidebarProps) {
  const {
    currentUser,
    setCurrentUser,
    activeRestaurantId,
    restaurants,
    setActiveRestaurantId,
  } = useData();

  const handleSignOut = () => {
    setCurrentUser(null);
    window.location.hash = "#/login";
  };

  const activeRest = restaurants.find((r) => r.id === activeRestaurantId);

  // Super Admin Navigation
  const superNavItems = [
    {
      name: "Super Admin Dashboard",
      icon: LayoutDashboard,
      path: "#/super-dashboard",
    },
    { name: "Manage Restaurants", icon: Store, path: "#/restaurants" },
    { name: "Branches Registry", icon: MapPin, path: "#/branches" },
    { name: "Digital Screens Grid", icon: Tv, path: "#/screens" },
    { name: "Running Promotions", icon: Tag, path: "#/promotions" },
  ];

  // Restaurant Admin Navigation
  const tenantNavItems = [
    {
      name: "Restaurant Overview",
      icon: LayoutDashboard,
      path: "#/restaurant-dashboard",
    },
    { name: "Manage Menu Board", icon: Utensils, path: "#/restaurant-detail" },
    { name: "Our Branches", icon: MapPin, path: "#/branches" },
    { name: "Our Digital Screens", icon: Tv, path: "#/screens" },
    { name: "Our Promotions & Deals", icon: Tag, path: "#/promotions" },
  ];

  const currentNav =
    currentUser?.role === "super_admin" ? superNavItems : tenantNavItems;

  return (
    <aside
      className={`w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 h-screen sticky top-0 text-slate-600 z-30 ${className}`}
      id="main-sidebar"
    >
      {/* Top Brand Logo */}
      <div>
        <div className="p-6 flex items-center gap-3 border-b border-slate-200">
          <div className="w-8 h-8 bg-[#EA580C] rounded-lg flex items-center justify-center shrink-0">
            <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">
            Amin<span className="text-[#EA580C]">.</span>
          </span>
        </div>

        {/* Tenant status box (small banner detailing current scope) */}
        <div className="p-4 mx-3 mt-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <div className="flex items-center gap-2 mb-1.5 text-slate-400 font-medium">
            <Cpu className="h-3.5 w-3.5 text-[#EA580C]" />
            <span className="uppercase text-[9px] font-mono tracking-wide">
              ACTIVE TENANT SCOPE
            </span>
          </div>
          {currentUser?.role === "super_admin" ? (
            activeRestaurantId ? (
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 truncate text-xs">
                  {activeRest?.name}
                </span>
                <button
                  onClick={() => setActiveRestaurantId(null)}
                  className="text-[9px] text-[#EA580C] hover:text-[#ea580c]/80 font-bold"
                >
                  Clear
                </button>
              </div>
            ) : (
              <span className="text-amber-600 font-semibold text-[11px]">
                Global Management (All tenants)
              </span>
            )
          ) : (
            <span className="font-bold text-slate-900 text-xs">
              {activeRest?.name || "Authorized Tenant"}
            </span>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="mt-6 px-4 space-y-1">
          {currentNav.map((item, idx) => {
            const isActive =
              currentPath === item.path ||
              (item.path === "#/restaurant-detail" &&
                currentPath.startsWith("#/restaurant-detail"));
            const IconComponent = item.icon;
            return (
              <a
                key={idx}
                href={item.path}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? "bg-orange-50 text-[#EA580C]"
                    : "hover:bg-slate-50 hover:text-slate-900 text-slate-600"
                }`}
                id={`sidebar-link-${idx}`}
              >
                <div className="flex items-center gap-3">
                  <IconComponent
                    className={`h-4 w-4 ${isActive ? "text-[#EA580C]" : "text-slate-400"}`}
                  />
                  <span>{item.name}</span>
                </div>
                {isActive && (
                  <ChevronRight className="h-3 w-3 text-[#EA580C]" />
                )}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile / Quick Log out */}
      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs flex flex-col gap-2.5">
          <div className="flex items-center gap-3">
            <img
              referrerPolicy="no-referrer"
              src={
                currentUser?.avatarUrl ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop"
              }
              alt="Avatar"
              className="w-8 h-8 rounded-full border border-slate-300 object-cover"
            />
            <div className="overflow-hidden flex-1">
              <p className="text-slate-800 text-sm font-semibold truncate leading-tight">
                {currentUser?.name}
              </p>
              <p className="text-xs text-slate-500 truncate leading-tight">
                {currentUser?.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full bg-[#EA580C] hover:bg-[#EA580C]/90 transition-all text-white py-1.5 px-3 rounded-lg text-[10px] font-bold tracking-wider uppercase flex items-center justify-center gap-1"
            id="sidebar-signout-btn"
          >
            <LogOut className="h-3 w-3" />
            <span>Terminate Cloud Session</span>
          </button>
        </div>

        {/* Fine attribution link */}
        <p className="text-center text-[9px] text-slate-400 font-mono mt-3">
          Powered by Amin Menu boards
        </p>
      </div>
    </aside>
  );
}
