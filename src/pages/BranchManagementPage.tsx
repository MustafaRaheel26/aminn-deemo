/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useData } from "../hooks/useData";
import {
  MapPin,
  Phone,
  Building2,
  Plus,
  Users,
  Tv,
  CheckCircle,
  Info,
} from "lucide-react";

export default function BranchManagementPage() {
  const {
    branches,
    restaurants,
    screens,
    activeRestaurantId,
    addBranch,
    currentUser,
  } = useData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedRestId, setSelectedRestId] = useState(
    activeRestaurantId || "rest-miracle",
  );

  // Filter list depending on tenant scope
  const filteredBranches = activeRestaurantId
    ? branches.filter((b) => b.restaurantId === activeRestaurantId)
    : branches;

  const currentRestObj = restaurants.find((r) => r.id === activeRestaurantId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !address.trim()) return;

    addBranch({
      restaurantId: selectedRestId,
      name,
      address,
      phone: phone || "+1 (555) 700-0000",
    });

    setName("");
    setAddress("");
    setPhone("");
    setShowAddForm(false);
    alert(`Branch "${name}" added successfully.`);
  };

  return (
    <div className="space-y-6" id="branches-registry-page">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-extrabold text-slate-950 tracking-tight">
            {activeRestaurantId
              ? `${currentRestObj?.name} Branches`
              : "Global Branches Registry"}
          </h2>
          <p className="text-xs text-slate-500">
            {activeRestaurantId
              ? `Retail locations configured under ${currentRestObj?.name}'s sub-license.`
              : "Master listing of physical merchant properties connected across overall system network clusters."}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#EA580C] hover:bg-[#EA580C]/90 text-white font-semibold py-2 px-4 rounded-lg text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
          id="add-branch-trigger"
        >
          <Plus className="h-4 w-4" />
          <span>{showAddForm ? "Close Form" : "Register Branch"}</span>
        </button>
      </div>

      {/* Add Branch Inline Form */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 p-6 rounded-2xl shadow-md space-y-4 max-w-2xl"
          id="add-branch-form"
        >
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest font-mono">
            Provision New Branch Node
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* If global view, let us select which client has this branch */}
            {!activeRestaurantId && (
              <div className="col-span-1 md:col-span-2">
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Owner Restaurant Client *
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
                Branch Label / Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Miracle Airport Drive"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]/35"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Contact Phone
              </label>
              <input
                type="text"
                placeholder="+1 (555) 728-1000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]/35"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Full Physical Address *
              </label>
              <input
                type="text"
                required
                placeholder="Suite 40, Broad Street Terminal, NY"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]/35"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="border border-slate-300 text-slate-705 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#EA580C] hover:bg-[#EA580C]/90 text-white px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Save New Location
            </button>
          </div>
        </form>
      )}

      {/* Grid List */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        id="branches-cards-grid"
      >
        {filteredBranches.map((branch) => {
          const bScreens = screens.filter((s) => s.branchId === branch.id);
          const parentRest = restaurants.find(
            (r) => r.id === branch.restaurantId,
          );

          return (
            <div
              key={branch.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 hover:border-[#EA580C]/40 hover:shadow transition-all relative flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header Row */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] uppercase font-mono font-bold text-slate-400 block tracking-wide">
                      {parentRest?.name || "SaaS Client"} Location
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 font-display mt-0.5">
                      {branch.name}
                    </h3>
                  </div>

                  <span className="bg-slate-100 border border-slate-200 text-slate-700 font-mono text-[10px] font-bold px-2 py-0.5 rounded-md">
                    Active Node
                  </span>
                </div>

                <hr className="border-slate-100" />

                {/* Sub-details */}
                <div className="space-y-2 text-xs font-sans text-slate-500">
                  <p className="flex items-start gap-2 leading-relaxed">
                    <MapPin className="h-4.5 w-4.5 text-slate-450 shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-slate-450 shrink-0" />
                    <span>{branch.phone}</span>
                  </p>
                </div>
              </div>

              {/* Connected TV screens status */}
              <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono text-slate-400 flex items-center gap-1">
                  <Tv className="h-3.5 w-3.5 text-slate-500" />
                  <span>{bScreens.length} Digital TV screens</span>
                </span>

                <span className="text-emerald-700 font-mono text-[10px] font-semibold flex items-center gap-1 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                  <CheckCircle className="h-3 w-3 text-emerald-600" />
                  Live Sync
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Alert Box */}
      <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-250 flex items-start gap-3 text-xs max-w-4xl">
        <Info className="h-4.5 w-4.5 text-emerald-600 mt-0.5 shrink-0" />
        <div className="space-y-1">
          <span className="font-bold">Multi-Branch Deployment Pipeline</span>
          <p className="font-sans leading-relaxed text-emerald-700 font-light">
            Each physical branch operates independently on Amin display
            architecture. Pushing products, edits, or pricing updates inside a
            restaurant's master menu propagates changes downstream immediately,
            ensuring synchronous cashier billing and TV displays in restaurant
            layouts.
          </p>
        </div>
      </div>
    </div>
  );
}
