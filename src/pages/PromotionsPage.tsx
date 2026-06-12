/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useData } from "../hooks/useData";
import {
  Tag,
  MapPin,
  Tv,
  Calendar,
  AlertCircle,
  Plus,
  Info,
  CheckCircle,
  Trash2,
} from "lucide-react";

export default function PromotionsPage() {
  const {
    promotions,
    branches,
    screens,
    restaurants,
    activeRestaurantId,
    addPromotion,
    deletePromotion,
  } = useData();
  const [showAddForm, setShowAddForm] = useState(false);

  // Promotion form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [discountText, setDiscountText] = useState("");
  const [startDate, setStartDate] = useState("2026-06-01");
  const [endDate, setEndDate] = useState("2026-08-30");
  const [selectedRestId, setSelectedRestId] = useState(
    activeRestaurantId || "rest-miracle",
  );

  // Filter list depending on tenant scope
  const filteredPromos = activeRestaurantId
    ? promotions.filter((p) => p.restaurantId === activeRestaurantId)
    : promotions;

  const currentRestObj = restaurants.find((r) => r.id === activeRestaurantId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !discountText.trim()) return;

    // Grab default gourmet food banner illustrations
    const presetImages = [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=600&auto=format&fit=crop",
    ];
    const finalImageUrl =
      presetImages[Math.floor(Math.random() * presetImages.length)];

    addPromotion({
      restaurantId: activeRestaurantId || selectedRestId,
      name,
      description,
      imageUrl: finalImageUrl,
      discountText,
      startDate,
      endDate,
      branchIds: [],
      screenIds: [],
      status: "active",
    });

    setName("");
    setDescription("");
    setDiscountText("");
    setShowAddForm(false);
    alert(`Promotion "${name}" added to active display slates folder.`);
  };

  return (
    <div className="space-y-6" id="promotions-manager-page">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-extrabold text-slate-950 tracking-tight">
            {activeRestaurantId
              ? `${currentRestObj?.name} Promotion Campaigns`
              : "Global Campaigns & Slates"}
          </h2>
          <p className="text-xs text-slate-500">
            Push ticker overrides, special combo graphics, and pricing banners
            targeting digital storefront displays.
          </p>
        </div>

        {/* Form toggle */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#EA580C] hover:bg-[#EA580C]/90 text-white font-semibold py-2 px-4 rounded-lg text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
          id="add-promo-trigger"
        >
          <Plus className="h-4 w-4" />
          <span>{showAddForm ? "Cancel Campaign" : "Launch Campaign"}</span>
        </button>
      </div>

      {/* Add Promotion Form */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 p-6 rounded-2xl shadow-md space-y-4 max-w-2xl"
          id="add-promotion-form"
        >
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest font-mono">
            Launch New Ticker Campaign
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {!activeRestaurantId && (
              <div className="col-span-1 md:col-span-2">
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Target Tenant Restaurant *
                </label>
                <select
                  value={selectedRestId}
                  onChange={(e) => setSelectedRestId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-700 font-semibold"
                >
                  {restaurants.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Campaign Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Midnight Shawarma Deal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]/35"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Discount Badging Text *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 20% OFF or Save $5.50"
                value={discountText}
                onChange={(e) => setDiscountText(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]/35"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Brief Description (Shows in sliding TV tickers)
              </label>
              <input
                type="text"
                placeholder="Enter delicious details to display on commercial screens..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]/35"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs font-mono"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="border border-slate-300 text-slate-705 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#EA580C] hover:bg-[#EA580C]/95 text-white px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Authorize Slate Campaign
            </button>
          </div>
        </form>
      )}

      {/* Grid listing */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        id="promotions-cards-grid"
      >
        {filteredPromos.map((promo) => {
          const parentRest = restaurants.find(
            (r) => r.id === promo.restaurantId,
          );
          const pBranches = branches.filter(
            (b) =>
              b.restaurantId === promo.restaurantId &&
              (promo.branchIds.length === 0 || promo.branchIds.includes(b.id)),
          );
          const pScreens = screens.filter(
            (s) =>
              s.restaurantId === promo.restaurantId &&
              (promo.screenIds.length === 0 || promo.screenIds.includes(s.id)),
          );

          return (
            <div
              key={promo.id}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col sm:flex-row hover:border-[#EA580C]/40 transition-all"
            >
              {/* Graphic Banner */}
              <div className="relative w-full sm:w-44 h-44 sm:h-auto overflow-hidden shrink-0 bg-slate-100 border-b sm:border-b-0 sm:border-r border-slate-200">
                <img
                  referrerPolicy="no-referrer"
                  src={promo.imageUrl}
                  alt={promo.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#EA580C] text-white text-[10px] font-bold font-mono px-2.5 py-1 rounded shadow-md uppercase">
                  {promo.discountText}
                </span>
              </div>

              {/* Data Side */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono font-bold text-slate-400">
                      {parentRest?.name} Brand Ticker
                    </span>
                    <span className="text-emerald-700 font-mono text-[9px] font-bold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded uppercase">
                      Active
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 font-display leading-snug">
                    {promo.name}
                  </h3>
                  <p
                    className="text-slate-500 text-xs font-light leading-relaxed truncate max-w-sm"
                    title={promo.description}
                  >
                    {promo.description}
                  </p>
                </div>

                {/* Allocated Targets lists */}
                <div className="border-t border-slate-100 pt-3 space-y-2 text-[10px] font-mono text-slate-450">
                  <p className="flex items-center gap-1.5 text-slate-500">
                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                    <span>
                      Run: {promo.startDate} to {promo.endDate}
                    </span>
                  </p>

                  <p className="truncate">
                    <MapPin className="h-3.5 w-3.5 inline mr-1 text-slate-450" />
                    Locations:{" "}
                    <span className="text-slate-700 font-semibold">
                      {pBranches
                        .map((b) => b.name.split(" ")[1] || b.name)
                        .join(", ") || "All Branches"}
                    </span>
                  </p>

                  <p className="truncate">
                    <Tv className="h-3.5 w-3.5 inline mr-1 text-slate-450" />
                    Screens:{" "}
                    <span className="text-[#EA580C] font-bold">
                      {pScreens.map((s) => s.name.split(" (")[0]).join(", ") ||
                        "All Connected Screens"}
                    </span>
                  </p>
                </div>

                {/* Option to delete mock promotion to keep testing highly flexible */}
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => {
                      if (confirm(`Cancel campaign: ${promo.name}?`)) {
                        deletePromotion(promo.id);
                      }
                    }}
                    className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 px-2 py-1 rounded transition-all text-xs font-mono flex items-center gap-1"
                    title="Terminate campaign"
                    id={`delete-promo-${promo.id}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Drop Campaign</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
