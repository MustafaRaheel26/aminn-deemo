/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useData } from "../hooks/useData";
import {
  Store,
  MapPin,
  Tv,
  Tag,
  ExternalLink,
  Plus,
  Sparkles,
  X,
  Check,
  Mail,
  User as UserIcon,
  Info,
  CheckCircle,
  Clock,
  Briefcase,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const PRESET_LOGOS = [
  {
    name: "Italian Pizza",
    url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150&auto=format&fit=crop",
    cuisine: "Artisanal Italian Pizza",
  },
  {
    name: "Sushi Zen",
    url: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=150&auto=format&fit=crop",
    cuisine: "Modern Japanese & Sushi",
  },
  {
    name: "Sweet Crumb",
    url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150&auto=format&fit=crop",
    cuisine: "French Patisserie & Coffee",
  },
  {
    name: "Flame Skewer",
    url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=150&auto=format&fit=crop",
    cuisine: "Premium Charcoal Grills",
  },
  {
    name: "Avocado Bistro",
    url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=150&auto=format&fit=crop",
    cuisine: "Healthy Organic Brunch",
  },
];

export default function RestaurantsPage() {
  const {
    restaurants,
    branches,
    screens,
    promotions,
    setActiveRestaurantId,
    addRestaurant,
    deleteRestaurant,
  } = useData();
  const [showOnboard, setShowOnboard] = useState(false);

  // New tenant form states
  const [restName, setRestName] = useState("");
  const [cuisine, setCuisine] = useState("Gourmet Cafe & Eatery");
  const [logoUrl, setLogoUrl] = useState(PRESET_LOGOS[0].url);
  const [description, setDescription] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminName, setAdminName] = useState("");

  // Onboarding success banner
  const [successInfo, setSuccessInfo] = useState<{
    name: string;
    email: string;
    id: string;
  } | null>(null);

  const handleManage = (id: string) => {
    setActiveRestaurantId(id);
    window.location.hash = "#/restaurant-detail";
  };

  // Pre-generate sample emails based on typing name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setRestName(name);
    if (name.trim()) {
      const sanitized = name.toLowerCase().replace(/\s+/g, "");
      setAdminEmail(`${sanitized}@amin.io`);
      setAdminName(`${name} Manager`);
    } else {
      setAdminEmail("");
      setAdminName("");
    }
  };

  const handleOnboardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!restName.trim()) return;

    // Trigger the dynamic state action to generate restaurant and initial layout data
    const finalEmail =
      adminEmail.trim() ||
      `${restName.toLowerCase().replace(/\s+/g, "")}@amin.io`;
    const finalAdminName = adminName.trim() || `${restName} Manager`;

    const newRestId = addRestaurant(
      {
        name: restName,
        cuisineType: cuisine,
        logoUrl: logoUrl,
        description:
          description ||
          `Premium ${cuisine} brand onboarded securely into the Amin cloud stream.`,
      },
      finalEmail,
      finalAdminName,
    );

    // Save success information to present mock credentials clearly
    setSuccessInfo({
      name: restName,
      email: finalEmail,
      id: newRestId,
    });

    // Clear form
    setRestName("");
    setDescription("");
    setShowOnboard(false);
  };

  return (
    <div className="space-y-6" id="restaurants-page">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-black text-slate-900 tracking-tight">
            Gastrome Tenant Client Base
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Overview of subscribed restaurant brands configured within Amin
            network clusters.
          </p>
        </div>

        <button
          onClick={() => {
            setSuccessInfo(null);
            setShowOnboard(true);
          }}
          className="bg-[#EA580C] hover:bg-[#EA580C]/90 text-white font-bold py-2.5 px-4 rounded-lg text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
          id="trigger-onboard-btn"
        >
          <Plus className="h-4 w-4" />
          <span>Onboard New Tenant</span>
        </button>
      </div>

      {/* Dynamic Success Dialog (Replaces static Alerts!) */}
      <AnimatePresence>
        {successInfo && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-emerald-50 border-2 border-emerald-350 p-6 rounded-2xl relative shadow-md"
            id="onboard-success-alert"
          >
            <button
              onClick={() => setSuccessInfo(null)}
              className="absolute top-4 right-4 text-emerald-500 hover:text-emerald-700 font-bold p-1 shadow-sm rounded-full bg-emerald-100"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-start gap-4">
              <div className="bg-emerald-500 text-white p-2.5 rounded-xl">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-black text-emerald-900 uppercase tracking-wider font-mono">
                  Tenant Core Booted Successfully!
                </h3>
                <p className="text-xs text-emerald-800 max-w-2xl leading-relaxed">
                  The brand <b>{successInfo.name}</b> has been registered inside
                  the secure Amin cloud. We have successfully seeded 1 initial
                  physical HQ branch, 2 food categories, and 3 high-definition
                  sample catalog items so that display screens pull beautiful
                  realistic content immediately!
                </p>

                {/* Practical Credentials Showcase */}
                <div className="bg-white border border-emerald-200 p-4 rounded-xl max-w-xl space-y-2 text-slate-800">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-[#EA580C] font-bold">
                    Tenant Administrative Access Credentials
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 block font-mono text-[9px]">
                        LOGIN EMAIL:
                      </span>
                      <code className="text-orange-600 font-bold select-all text-xs bg-orange-50 px-1 py-0.5 rounded">
                        {successInfo.email}
                      </code>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-mono text-[9px]">
                        LOCK PASSCODE / PIN:
                      </span>
                      <code className="text-slate-800 font-bold text-xs bg-slate-100 px-1 py-0.5 rounded">
                        Any password is accepted (SSO Auth)
                      </code>
                    </div>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      onClick={() => handleManage(successInfo.id)}
                      className="bg-[#EA580C] hover:bg-[#EA580C]/90 text-white text-[10px] font-bold py-1.5 px-3 rounded uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Enter Workspace
                    </button>
                    <button
                      onClick={() => {
                        // Log user out of super admin, and login as the new tenant
                        localStorage.removeItem("amin_user");
                        localStorage.setItem(
                          "amin_user",
                          JSON.stringify({
                            id: `user-gen-${Date.now()}`,
                            name: `${successInfo.name} Manager`,
                            email: successInfo.email,
                            role: "restaurant_admin",
                            restaurantId: successInfo.id,
                            avatarUrl:
                              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop",
                          }),
                        );
                        localStorage.setItem(
                          "amin_active_rest",
                          successInfo.id,
                        );
                        window.location.hash = "#/restaurant-dashboard";
                        window.location.reload();
                      }}
                      className="bg-slate-900 hover:bg-black text-white text-[10px] font-bold py-1.5 px-3 rounded uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Instant Tenant Sign-In
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tenancy Matrix Cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        id="restaurants-cards-grid"
      >
        {restaurants.map((rest) => {
          const bList = branches.filter((b) => b.restaurantId === rest.id);
          const sList = screens.filter((s) => s.restaurantId === rest.id);
          const pList = promotions.filter((p) => p.restaurantId === rest.id);

          return (
            <div
              key={rest.id}
              className="bg-white border border-slate-200 hover:border-[#EA580C]/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative"
            >
              {/* Deletion button if it is target user-added restaurant */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (
                    confirm(
                      `Are you sure you want to completely de-provision "${rest.name}" from the network nodes? This will delete all its categories, products, branches, and screen configs!`,
                    )
                  ) {
                    deleteRestaurant(rest.id);
                  }
                }}
                className="absolute top-3 right-3 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity bg-white/75 backdrop-blur border border-slate-200 rounded-full p-1 h-7 w-7 flex items-center justify-center cursor-pointer shadow-sm z-10"
                title="Delete Tenant"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Banner Top Decoration */}
              <div className="h-2 bg-[#EA580C]" />

              <div className="p-6 space-y-4">
                {/* Brand & Logo */}
                <div className="flex items-center gap-4">
                  <img
                    referrerPolicy="no-referrer"
                    src={rest.logoUrl}
                    alt={rest.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 group-hover:scale-105 transition-transform shrink-0 shadow-inner"
                  />
                  <div>
                    <span className="bg-slate-50 text-slate-500 border border-slate-200 font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                      {rest.cuisineType}
                    </span>
                    <h3 className="text-base font-bold font-display text-slate-900 mt-1">
                      {rest.name}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-500 font-light leading-relaxed h-12 overflow-hidden text-ellipsis">
                  {rest.description}
                </p>

                {/* Counter statistics pill list */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-100 p-3 rounded-xl text-center">
                  <div>
                    <span className="block text-slate-400 text-[9px] uppercase font-mono tracking-wide">
                      Branches
                    </span>
                    <span className="text-base font-extrabold text-slate-900 font-display">
                      {bList.length}
                    </span>
                  </div>
                  <div className="border-x border-slate-200">
                    <span className="block text-slate-400 text-[9px] uppercase font-mono tracking-wide">
                      Screens
                    </span>
                    <span className="text-base font-extrabold text-slate-900 font-display">
                      {sList.length}
                    </span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[9px] uppercase font-mono tracking-wide">
                      Promos
                    </span>
                    <span className="text-base font-extrabold text-slate-900 font-display">
                      {pList.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons footer */}
              <div className="bg-slate-50 border-t border-slate-150 px-6 py-4 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">
                  ID: {rest.id}
                </span>

                <button
                  onClick={() => handleManage(rest.id)}
                  className="bg-white border border-slate-200 hover:bg-orange-50 hover:border-orange-200 text-slate-700 hover:text-[#EA580C] font-bold px-3 py-1.5 rounded-lg text-xs tracking-wider uppercase inline-flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <span>Manage</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide-over Onboarding Modal (REAL solution instead of placeholder alerts) */}
      <AnimatePresence>
        {showOnboard && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col justify-between max-h-[90vh]"
              id="provision-tenant-modal"
            >
              {/* Header */}
              <div className="bg-slate-950 p-6 text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="bg-[#EA580C] p-2 rounded-xl">
                    <Store className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-lg tracking-wider uppercase">
                      Onboard Restaurant Tenant
                    </h3>
                    <p className="text-[10px] text-slate-400 font-mono">
                      Bootscreen initialization and SSO credential assignment
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowOnboard(false)}
                  className="text-slate-400 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form Body */}
              <form
                onSubmit={handleOnboardSubmit}
                className="p-6 overflow-y-auto space-y-4 text-xs font-sans"
              >
                {/* Segment 1: Brand Parameters */}
                <div className="space-y-3.5">
                  <span className="block border-b border-slate-100 pb-1 text-[10px] font-mono tracking-widest uppercase text-slate-400 font-bold">
                    Step 1: Brand Profiles
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                        Restaurant Brand Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Papa's Pizzeria"
                        value={restName}
                        onChange={handleNameChange}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                        Cuisine Segment *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Italian wood-fired pizza"
                        value={cuisine}
                        onChange={(e) => setCuisine(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Short Marketing Description
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Authentic old school hand tossed crust topped with fresh basil and cold-pressed garlic oil."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]"
                    />
                  </div>
                </div>

                {/* Segment 2: Quick Theme & Logos Preset selection */}
                <div className="space-y-2.5">
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-700">
                    Step 2: Choose Preset Brand Logo
                  </label>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Pick one of our visual presets or enter a custom link below.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1 pb-2">
                    {PRESET_LOGOS.map((logo) => (
                      <button
                        key={logo.name}
                        type="button"
                        onClick={() => {
                          setLogoUrl(logo.url);
                          setCuisine(logo.cuisine);
                        }}
                        className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                          logoUrl === logo.url
                            ? "bg-orange-50 border-[#EA580C] ring-1 ring-[#EA580C]"
                            : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <img
                          referrerPolicy="no-referrer"
                          src={logo.url}
                          alt={logo.name}
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                        <div>
                          <span className="font-bold block text-[10px] text-slate-800">
                            {logo.name}
                          </span>
                          <span className="text-[8px] text-slate-450 block truncate max-w-[100px]">
                            {logo.cuisine}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      Custom Logo Image URL
                    </label>
                    <input
                      type="url"
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Segment 3: Admin login config details */}
                <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="block text-[10px] font-mono tracking-wider uppercase text-[#EA580C] font-semibold">
                    Step 3: Auto-Generated Tenant Credentials
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">
                        Admin Email Address (For SSO)
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 pointer-events-none">
                          <Mail className="h-3.5 w-3.5" />
                        </span>
                        <input
                          type="email"
                          required
                          value={adminEmail}
                          onChange={(e) => setAdminEmail(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-2.5 py-1.5 text-slate-900 font-mono text-[11px]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">
                        Admin Representative Name
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 pointer-events-none">
                          <UserIcon className="h-3.5 w-3.5" />
                        </span>
                        <input
                          type="text"
                          required
                          value={adminName}
                          onChange={(e) => setAdminName(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-2.5 py-1.5 text-slate-900 font-sans"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowOnboard(false)}
                    className="border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#EA580C] hover:bg-[#EA580C]/90 text-white px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Complete Tenant Provisioning</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quick onboarding guide */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 text-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm mt-6">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-[#EA580C] uppercase text-[9px] tracking-widest font-mono font-bold block">
            INTELLIGENT ONBOARDING PIPELINE
          </span>
          <h4 className="text-base font-bold font-display text-slate-900">
            Have existing menus in legacy PDF formats?
          </h4>
          <p className="text-xs text-slate-500 max-w-xl font-light leading-relaxed">
            Skip hours of manual copy-paste configuration! Navigate to any
            restaurant workspace, click the "Import Existing Menu" button,
            upload the old PDF menu, and our OCR pipeline handles the rest
            instantly.
          </p>
        </div>

        <button
          onClick={() => handleManage("rest-miracle")}
          className="bg-[#EA580C] hover:bg-[#EA580C]/90 text-white font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-colors shrink-0 shadow-sm cursor-pointer"
        >
          Try Miracle Onboarding Now
        </button>
      </div>
    </div>
  );
}
