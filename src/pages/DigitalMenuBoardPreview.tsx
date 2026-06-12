/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useData } from "../hooks/useData";
import {
  Tv,
  Sparkles,
  ChevronLeft,
  Clock,
  Flame,
  HelpCircle,
  Settings,
  Monitor,
  Sliders,
  ChevronRight,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PreviewProps {
  screenId?: string; // e.g., 'scr-mir-1'
}

export default function DigitalMenuBoardPreview({ screenId }: PreviewProps) {
  const { screens, restaurants, categories, products, promotions } = useData();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Simulation Controller States
  const [selectedRestId, setSelectedRestId] = useState("rest-miracle");
  const [tvSizing, setTvSizing] = useState<"43inch" | "55inch">("55inch");
  const [activeLayout, setActiveLayout] = useState<
    "grid-two-col" | "featured-large" | "drinks-list"
  >("grid-two-col");
  const [showConfig, setShowConfig] = useState(true);

  // If a screenId is supplied, pre-configure states to match that screen's settings!
  useEffect(() => {
    if (screenId) {
      const matchedScreen = screens.find((s) => s.id === screenId);
      if (matchedScreen) {
        setSelectedRestId(matchedScreen.restaurantId);
        setActiveLayout(matchedScreen.templateId);
      }
    }
  }, [screenId, screens]);

  // Digital clock tick
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter food data for simulator
  const activeRest = restaurants.find((r) => r.id === selectedRestId);
  const matchedCategories = categories.filter(
    (c) => c.restaurantId === selectedRestId && c.isActive,
  );
  const matchedProducts = products.filter(
    (p) => p.restaurantId === selectedRestId && p.status === "available",
  );
  const matchedPromos = promotions.filter(
    (p) => p.restaurantId === selectedRestId && p.status === "active",
  );

  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <div
      className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between font-sans overflow-hidden select-none relative"
      id="menu-board-tv-preview"
    >
      {/* BACKGROUND ABSTRACT GLOWS */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#EA580C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-950/5 rounded-full blur-3xl pointer-events-none" />

      {/* TOP RETAIL HEADER */}
      <header className="border-b border-neutral-900 bg-black/40 backdrop-blur-md h-20 px-8 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4 animate-flicker">
          <img
            referrerPolicy="no-referrer"
            src={
              activeRest?.logoUrl ||
              "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=150&auto=format&fit=crop"
            }
            alt={activeRest?.name}
            className="w-12 h-12 object-cover rounded-xl border border-neutral-800"
          />
          <div>
            <h1 className="text-2xl font-display font-extrabold uppercase tracking-widest text-[#FFF] leading-none mb-0.5">
              {activeRest?.name || "Loading Gourmet..."}
            </h1>
            <span className="block text-[10px] font-mono tracking-widest uppercase text-orange-400 font-bold">
              ★ {activeRest?.cuisineType || "Artisanal Gastronomy"}
            </span>
          </div>
        </div>

        {/* Dynamic promotional badge or current clock */}
        <div className="flex items-center gap-6">
          {matchedPromos.length > 0 && (
            <div className="hidden md:flex items-center gap-1.5 bg-gradient-to-r from-[#EA580C] to-amber-600 border border-[#EA580C]/35 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider font-display shrink-0 shadow-lg">
              <Sparkles className="h-4 w-4 text-amber-200 animate-spin-slow" />
              <span>{matchedPromos[0].discountText}</span>
            </div>
          )}

          {/* UTC/Local TV Clock */}
          <div className="bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl text-center flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#EA580C]" />
            <span className="font-mono text-sm tracking-widest text-emerald-400 font-extrabold">
              {formatter.format(currentTime)}
            </span>
          </div>
        </div>
      </header>

      {/* MAIN DATA GRID - ADAPTS TO SIMULATION TEMPLATE */}
      <main
        className={`flex-1 p-8 grid gap-8 overflow-hidden z-10 ${
          tvSizing === "43inch" ? "max-w-5xl mx-auto w-full" : "w-full"
        }`}
      >
        {/* TEMPLATE A: DUAL-COLUMN GRID (Excellent for standard menu lists) */}
        {activeLayout === "grid-two-col" && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full auto-rows-max"
            id="tv-layout-grid-dual"
          >
            {matchedCategories.slice(0, 3).map((cat) => {
              const catProds = matchedProducts.filter(
                (p) => p.categoryId === cat.id,
              );
              return (
                <div
                  key={cat.id}
                  className="bg-neutral-900/50 border border-neutral-900 p-5 rounded-2xl flex flex-col justify-between"
                >
                  <div>
                    {/* Category Header */}
                    <div className="flex items-center gap-2 pb-3.5 border-b border-neutral-800 mb-4">
                      <Flame className="h-4 w-4 text-[#EA580C] shrink-0" />
                      <h4 className="font-display font-black text-white text-base tracking-wider uppercase">
                        {cat.name}
                      </h4>
                    </div>

                    {/* Products List */}
                    <div className="space-y-4">
                      {catProds.slice(0, 4).map((p) => (
                        <div
                          key={p.id}
                          className="flex gap-3 items-start group"
                        >
                          {p.imageUrl && (
                            <img
                              referrerPolicy="no-referrer"
                              src={p.imageUrl}
                              alt={p.name}
                              className="w-12 h-12 rounded-lg object-cover border border-neutral-850 shadow-inner group-hover:scale-105 transition-transform shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2">
                              <span className="font-bold text-white text-xs block leading-tight truncate">
                                {p.name}
                              </span>
                              <span className="font-mono text-xs font-black text-orange-400 shrink-0 pl-1">
                                ${p.price.toFixed(2)}
                              </span>
                            </div>
                            <p className="text-[10px] text-neutral-400 leading-normal font-light truncate mt-0.5">
                              {p.description}
                            </p>
                            {p.calories && (
                              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider block mt-0.5">
                                {p.calories}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TEMPLATE B: LARGE FEATURED PROMOTION (Excellent for visual drives and banners) */}
        {activeLayout === "featured-large" && (
          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full items-stretch"
            id="tv-layout-featured-large"
          >
            {/* Visual Featured High-res card */}
            <div className="lg:col-span-2 rounded-3xl border border-neutral-900 overflow-hidden bg-neutral-900/40 relative flex flex-col justify-end p-8 group">
              <div className="absolute inset-0">
                <img
                  referrerPolicy="no-referrer"
                  src={
                    matchedProducts[0]?.imageUrl ||
                    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop"
                  }
                  alt="Featured culinary plate"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent" />
              </div>

              <div className="relative z-10 space-y-2">
                <span className="bg-[#EA580C] text-white font-mono text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider inline-block">
                  Signature Specialty Item
                </span>
                <h3 className="text-3xl md:text-4xl font-display font-black tracking-tight text-white leading-none">
                  {matchedProducts[0]?.name || "Adana Charcoal Kebab"}
                </h3>
                <p className="text-neutral-300 text-xs font-light max-w-xl leading-relaxed">
                  {matchedProducts[0]?.description ||
                    "Premium grass-fed lamb minced with red peppers on steel blades."}
                </p>
                <div className="pt-4 flex items-center gap-4">
                  <span className="text-3xl font-mono font-black text-orange-400">
                    ${matchedProducts[0]?.price.toFixed(2) || "19.50"}
                  </span>
                  <span className="text-neutral-500 font-mono text-xs uppercase bg-neutral-900/80 px-2 rounded">
                    {matchedProducts[0]?.calories || "650 kcal"}
                  </span>
                </div>
              </div>
            </div>

            {/* Side-bar scrolling items */}
            <div className="bg-neutral-900/50 border border-neutral-900 rounded-3xl p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h4 className="font-display font-black text-white text-sm uppercase tracking-widest border-b border-neutral-800 pb-2.5">
                  Chef Choice Combos
                </h4>

                <div className="space-y-5">
                  {matchedProducts.slice(1, 4).map((p) => (
                    <div key={p.id} className="flex gap-3 items-center">
                      <img
                        referrerPolicy="no-referrer"
                        src={p.imageUrl}
                        alt={p.name}
                        className="w-14 h-14 object-cover rounded-xl border border-neutral-800"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-white text-xs block leading-tight truncate">
                          {p.name}
                        </span>
                        <p className="text-[10px] text-neutral-400 mt-0.5 truncate">
                          {p.description}
                        </p>
                        <span className="text-[10.5px] font-mono font-bold text-orange-400 block mt-1">
                          ${p.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TEMPLATE C: BEVERAGE DRINKS COUNTER (Compact side board) */}
        {activeLayout === "drinks-list" && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full"
            id="tv-layout-drinks"
          >
            <div className="bg-neutral-900/40 border border-neutral-900 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
              <div>
                <h4 className="font-display font-black text-white text-base uppercase tracking-widest border-b border-neutral-800 pb-3 mb-4">
                  Cold Craft Beverages
                </h4>

                <div className="space-y-4 text-xs font-sans">
                  {matchedProducts
                    .filter(
                      (p) =>
                        p.categoryId.toLowerCase().includes("drink") ||
                        p.categoryId.toLowerCase().includes("tea") ||
                        p.name.toLowerCase().includes("tea") ||
                        p.name.toLowerCase().includes("ayran") ||
                        p.name.toLowerCase().includes("ring") ||
                        p.categoryId.toLowerCase().includes("side"),
                    )
                    .slice(0, 5)
                    .map((p) => (
                      <div
                        key={p.id}
                        className="flex justify-between items-center bg-black/25 p-2 rounded-lg"
                      >
                        <div>
                          <span className="font-bold text-white text-xs">
                            {p.name}
                          </span>
                          <p className="text-[10px] text-neutral-450 truncate max-w-xs">
                            {p.description}
                          </p>
                        </div>
                        <span className="font-mono font-bold text-orange-400">
                          ${p.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Quick Promo banner overlay */}
            <div className="bg-gradient-to-br from-orange-950 via-neutral-950 to-neutral-950 border border-neutral-900 rounded-3xl p-8 flex flex-col justify-between items-center text-center">
              <div className="space-y-4">
                <span className="bg-orange-500/20 text-orange-400 border border-[#EA580C]/30 px-3 py-1 rounded text-[10px] uppercase font-mono font-bold">
                  Weekly Refreshments
                </span>
                <h3 className="text-2xl font-display font-black text-white leading-tight uppercase">
                  Buy 1 Get 1 Free on Ayran drinks!
                </h3>
                <p className="text-slate-400 text-xs font-light max-w-xs leading-relaxed">
                  Simmered in double pots, salted sea-salt foam Ayran is perfect
                  complement with charcoal lamb skewer.
                </p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl w-full">
                <span className="text-[10px] uppercase font-mono text-neutral-400">
                  Available at all checkout branches
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* BOTTOM RUNNING TICKER MARQUEE */}
      <footer className="h-10 bg-[#EA580C] text-white flex items-center font-mono text-xs uppercase tracking-wider relative overflow-hidden z-10 border-t border-orange-700 select-none">
        <div className="whitespace-nowrap flex animate-[marquee_20s_linear_infinite]">
          {matchedPromos.map((promo) => (
            <span key={promo.id} className="inline-block px-12 font-semibold">
              🔥 {promo.name}: {promo.description} • {promo.discountText} •
              VALID TILL {promo.endDate} ★
            </span>
          ))}
          {/* Fallback scroll if no promotional items exist */}
          {matchedPromos.length === 0 && (
            <span className="inline-block px-12 font-semibold">
              ★ AMIN CLOUD NETWORK SYSTEM SECURE • INSTANT SCREEN SYNC
              FUNCTIONAL • RE-SYNC HEARTBEAT STABLE • TERMINAL BOOT CODE G-451 ★
            </span>
          )}
        </div>
      </footer>

      {/* FLOATING SAAS CLIENT ADJUSTER REMOTE (subtle overlay designed to look like hardware simulator controller) */}
      <AnimatePresence>
        {showConfig && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-14 right-6 bg-slate-900/95 border border-slate-800 p-4 rounded-2xl shadow-2xl z-50 max-w-sm text-xs text-slate-300 backdrop-blur-md"
            id="floating-tv-remote"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
              <span className="font-bold text-white font-display uppercase tracking-wider flex items-center gap-1">
                <Tv className="h-4 w-4 text-[#EA580C] animate-pulse" />
                <span>Amin Device Remote</span>
              </span>
              <button
                onClick={() => setShowConfig(false)}
                className="text-slate-500 hover:text-white font-bold px-1"
                title="Hide remote"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              {/* Option 1: Select Tenant Restaurant */}
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-mono font-bold mb-1">
                  Active Display Feed
                </label>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    onClick={() => setSelectedRestId("rest-miracle")}
                    className={`p-1.5 rounded font-bold text-[10px] ${selectedRestId === "rest-miracle" ? "bg-[#EA580C] text-white" : "bg-slate-800 hover:bg-slate-700 text-slate-400"}`}
                  >
                    Miracle
                  </button>
                  <button
                    onClick={() => setSelectedRestId("rest-chef")}
                    className={`p-1.5 rounded font-bold text-[10px] ${selectedRestId === "rest-chef" ? "bg-[#EA580C] text-white" : "bg-slate-800 hover:bg-slate-700 text-slate-400"}`}
                  >
                    Chef's
                  </button>
                  <button
                    onClick={() => setSelectedRestId("rest-mac")}
                    className={`p-1.5 rounded font-bold text-[10px] ${selectedRestId === "rest-mac" ? "bg-[#EA580C] text-white" : "bg-[#EA580C]/20 hover:bg-[#EA580C]/40 text-slate-400"}`}
                  >
                    Mac Chicken
                  </button>
                </div>
              </div>

              {/* Option 2: Choose TV size ratio */}
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-mono font-bold mb-1">
                  TV Dimensions Simulator
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setTvSizing("43inch")}
                    className={`p-1.5 rounded font-bold ${tvSizing === "43inch" ? "bg-[#EA580C] text-white" : "bg-slate-800"}`}
                  >
                    Standard (43")
                  </button>
                  <button
                    onClick={() => setTvSizing("55inch")}
                    className={`p-1.5 rounded font-bold ${tvSizing === "55inch" ? "bg-[#EA580C] text-white" : "bg-slate-800"}`}
                  >
                    Industrial (55")
                  </button>
                </div>
              </div>

              {/* Option 3: Select layout templates */}
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-mono font-bold mb-1">
                  Layout Template Options
                </label>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    onClick={() => setActiveLayout("grid-two-col")}
                    className={`p-1 font-mono text-[9px] ${activeLayout === "grid-two-col" ? "bg-slate-100 text-slate-900 font-bold" : "bg-slate-800 text-slate-400"}`}
                  >
                    Col Grid
                  </button>
                  <button
                    onClick={() => setActiveLayout("featured-large")}
                    className={`p-1 font-mono text-[9px] ${activeLayout === "featured-large" ? "bg-slate-100 text-slate-900 font-bold" : "bg-slate-800 text-slate-400"}`}
                  >
                    Large Hero
                  </button>
                  <button
                    onClick={() => setActiveLayout("drinks-list")}
                    className={`p-1 font-mono text-[9px] ${activeLayout === "drinks-list" ? "bg-slate-100 text-slate-900 font-bold" : "bg-slate-800 text-slate-400"}`}
                  >
                    Drinks Slate
                  </button>
                </div>
              </div>

              <hr className="border-slate-800" />

              <div className="flex justify-between items-center pt-1.5">
                <button
                  onClick={() => {
                    const savedUser = localStorage.getItem("amin_user");
                    if (savedUser) {
                      const userObj = JSON.parse(savedUser);
                      window.location.hash =
                        userObj.role === "super_admin"
                          ? "#/super-dashboard"
                          : "#/restaurant-dashboard";
                    } else {
                      window.location.hash = "#/super-dashboard";
                    }
                  }}
                  className="bg-slate-100 hover:bg-white text-slate-950 font-bold py-1.5 px-3 rounded-lg flex items-center gap-1 cursor-pointer transition-all uppercase tracking-wide text-[10px]"
                >
                  <ChevronLeft className="h-3.5 w-3.5 shrink-0" />
                  <span>HQ Admin Hub</span>
                </button>

                <span className="text-[10px] text-slate-500 font-mono font-bold">
                  1080p Streamed Link
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button to restore Remote Config Panel if closed */}
      {!showConfig && (
        <button
          onClick={() => setShowConfig(true)}
          className="fixed bottom-6 right-6 bg-[#EA580C] text-white rounded-full p-3 shadow-2xl hover:bg-[#EA580C]/90 transition-all z-40 focus:outline-none border border-[#EA580C]/80 animate-[bounce_1.5s_infinite]"
          title="Restore device controller"
        >
          <Sliders className="h-5 w-5 animate-pulse" />
        </button>
      )}

      {/* Traditional Marquee Keyframe Inject */}
      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </div>
  );
}
