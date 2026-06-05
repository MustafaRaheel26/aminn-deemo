/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useData } from '../hooks/useData';
import { 
  Store, 
  Utensils, 
  MapPin, 
  Tv, 
  Tag, 
  Plus, 
  FileSpreadsheet, 
  FileText, 
  Trash2, 
  Edit, 
  AlertCircle,
  FolderOpen,
  Info,
  ExternalLink,
  ChevronRight,
  Filter,
  Check,
  Search,
  Sparkles
} from 'lucide-react';
import AddProductModal from '../components/AddProductModal';
import PdfImportWizard from '../components/PdfImportWizard';
import { motion, AnimatePresence } from 'motion/react';

export default function RestaurantDetailPage() {
  const { 
    restaurants, 
    categories, 
    products, 
    branches, 
    screens, 
    promotions, 
    activeRestaurantId, 
    deleteProduct,
    addCategory
  } = useData();

  // Current states
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'branches' | 'screens' | 'promotions'>('products');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportWizard, setShowImportWizard] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Category quick-creator input state
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  const currentRestaurantId = activeRestaurantId || 'rest-miracle'; // fallback to first restaurant in demo for safety
  const currentRestaurant = restaurants.find(r => r.id === currentRestaurantId);

  // Filter lists by current tenant
  const tenantCategories = categories.filter(c => c.restaurantId === currentRestaurantId);
  const tenantProducts = products.filter(p => p.restaurantId === currentRestaurantId);
  const tenantBranches = branches.filter(b => b.restaurantId === currentRestaurantId);
  const tenantScreens = screens.filter(s => s.restaurantId === currentRestaurantId);
  const tenantPromotions = promotions.filter(p => p.restaurantId === currentRestaurantId);

  // Apply visual category filter
  const processedProducts = tenantProducts.filter(p => {
    const matchesCategory = selectedCategoryFilter ? p.categoryId === selectedCategoryFilter : true;
    const matchesSearch = searchQuery 
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    addCategory({
      restaurantId: currentRestaurantId,
      name: newCatName,
      description: newCatDesc || 'Custom gourmet category',
      iconName: 'Flame',
      isActive: true
    });

    setNewCatName('');
    setNewCatDesc('');
    alert(`Category "${newCatName}" added successfully.`);
  };

  return (
    <div className="space-y-6" id="restaurant-detail-page">
      
      {/* Brand Hero Overview Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img 
            referrerPolicy="no-referrer"
            src={currentRestaurant?.logoUrl} 
            alt={currentRestaurant?.name} 
            className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-display font-extrabold text-slate-950 tracking-tight">
                {currentRestaurant?.name} — Control Center
              </h2>
              <span className="bg-orange-50 text-[#EA580C] border border-orange-100 text-[10px] uppercase font-mono font-bold px-2.5 py-0.5 rounded-full">
                Active Tenant Node
              </span>
            </div>
            <p className="text-xs text-slate-500 font-light mt-1 max-w-2xl">{currentRestaurant?.description}</p>
          </div>
        </div>

        {/* Rapid PDF Onboarding Button */}
        <button
          onClick={() => setShowImportWizard(true)}
          className="bg-[#EA580C] hover:bg-[#EA580C]/90 text-white font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm group shrink-0"
          id="btn-import-menu-wizard"
        >
          <Sparkles className="h-4.5 w-4.5 text-amber-200 group-hover:rotate-12 transition-transform" />
          <span>Import Existing PDF Menu</span>
        </button>
      </div>

      {/* Detail Tab Switches */}
      <div className="bg-slate-200/60 p-1.5 rounded-xl grid grid-cols-2 md:grid-cols-5 gap-1 shadow-inner border border-slate-200" id="detail-tabs-switcher">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'products'
              ? 'bg-slate-950 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-950 hover:bg-slate-300/30'
          }`}
          id="tab-btn-products"
        >
          <Utensils className="h-4 w-4" />
          <span>Menu Products</span>
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'categories'
              ? 'bg-slate-950 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-950 hover:bg-slate-300/30'
          }`}
          id="tab-btn-categories"
        >
          <FolderOpen className="h-4 w-4" />
          <span>Categories</span>
        </button>

        <button
          onClick={() => setActiveTab('branches')}
          className={`flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'branches'
              ? 'bg-slate-950 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-950 hover:bg-slate-300/30'
          }`}
          id="tab-btn-branches"
        >
          <MapPin className="h-4 w-4" />
          <span>Our Branches</span>
        </button>

        <button
          onClick={() => setActiveTab('screens')}
          className={`flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'screens'
              ? 'bg-slate-950 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-950 hover:bg-slate-300/30'
          }`}
          id="tab-btn-screens"
        >
          <Tv className="h-4 w-4" />
          <span>Screens TV</span>
        </button>

        <button
          onClick={() => setActiveTab('promotions')}
          className={`flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'promotions'
              ? 'bg-slate-950 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-950 hover:bg-slate-300/30'
          }`}
          id="tab-btn-promotions"
        >
          <Tag className="h-4 w-4" />
          <span>Promotions</span>
        </button>
      </div>

      {/* Dynamic Tab Panes */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 md:p-6 min-h-[400px]">
        
        {/* ——— TABS 1: PRODUCTS TABLE ——— */}
        {activeTab === 'products' && (
          <div className="space-y-4" id="pane-products">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              
              {/* Left Search and Filters */}
              <div className="flex flex-wrap items-center gap-2 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Search className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search menu items..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]/35 transition-all font-sans"
                  />
                </div>

                {/* Categories filtering bar */}
                <select
                  value={selectedCategoryFilter}
                  onChange={e => setSelectedCategoryFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 font-semibold px-3 py-2 rounded-lg text-xs outline-none focus:border-[#EA580C] max-w-xs"
                >
                  <option value="">All Categories</option>
                  {tenantCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Add menu item trigger */}
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-[#EA580C] hover:bg-[#EA580C]/90 text-white font-bold py-2 px-4 rounded-lg text-xs uppercase tracking-wider transition-all flex items-center gap-1 shadow-sm shrink-0 self-start md:self-auto cursor-pointer"
                id="add-product-btn"
              >
                <Plus className="h-4 w-4" />
                <span>Add Product</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm" id="tenant-products-table">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-mono text-[10px] uppercase font-semibold border-b border-slate-200">
                    <th className="px-6 py-3.5">Product Image</th>
                    <th className="px-6 py-3.5">Product Name</th>
                    <th className="px-6 py-3.5">Category</th>
                    <th className="px-6 py-3.5">Retail Price</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {processedProducts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                        <Utensils className="h-8 w-8 mx-auto text-slate-300 mb-2" />
                        <span className="block font-bold">No products detected.</span>
                        <p className="text-[11px] text-slate-400 font-sans mt-0.5">Use the orange PDF wizard above or click "Add Product" to inject catalog elements.</p>
                      </td>
                    </tr>
                  ) : (
                    processedProducts.map(p => {
                      const catSymbol = tenantCategories.find(c => c.id === p.categoryId);
                      return (
                        <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-3.5">
                            <img 
                              referrerPolicy="no-referrer"
                              src={p.imageUrl} 
                              alt={p.name} 
                              className="w-10 h-10 rounded-lg object-cover border border-slate-150 shadow-inner"
                            />
                          </td>
                          <td className="px-6 py-3.5">
                            <span className="font-bold text-slate-900 block text-sm">{p.name}</span>
                            <span className="block text-slate-400 font-light mt-0.5 truncate max-w-sm" title={p.description}>
                              {p.description}
                            </span>
                          </td>
                          <td className="px-6 py-3.5">
                            <span className="bg-slate-100 text-slate-600 font-mono text-[10px] border border-slate-150 px-2.5 py-1 rounded">
                              {catSymbol ? catSymbol.name : 'Unallocated Category'}
                            </span>
                          </td>
                          <td className="px-6 py-3.5 font-mono font-bold text-slate-900">
                            ${p.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-3.5">
                            <span className="bg-emerald-50 text-emerald-800 font-mono text-[9px] font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase">
                              {p.status}
                            </span>
                          </td>
                          <td className="px-6 py-3.5 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button 
                                onClick={() => {
                                  alert(`"Edit Product" action modal would be displayed in production. Current product UUID is: ${p.id}. Feel free to use the quick Delete action or Add more items.`);
                                }}
                                className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2 rounded transition-all"
                                title="Edit Item"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                                    deleteProduct(p.id);
                                  }
                                }}
                                className="text-rose-400 hover:text-rose-600 hover:bg-rose-50 p-2 rounded transition-all"
                                title="Delete Item"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ——— TABS 2: CATEGORIES ——— */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="pane-categories">
            
            {/* Left side: Category List */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider font-display">Active Menu Chapters</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tenantCategories.map(cat => {
                  const prodsCount = products.filter(p => p.categoryId === cat.id).length;
                  return (
                    <div key={cat.id} className="border border-slate-150 p-4 rounded-xl hover:border-[#EA580C]/40 transition-all bg-slate-50/50 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-sm font-display">{cat.name}</span>
                          <span className="text-[10px] bg-slate-200 text-slate-800 font-mono px-2 py-0.5 rounded-full font-bold">
                            {prodsCount} items
                          </span>
                        </div>
                        <p className="text-slate-500 text-xs font-light mt-1.5">{cat.description}</p>
                      </div>

                      <div className="border-t border-slate-150 pt-2.5 mt-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>Folder ID: {cat.id}</span>
                        <span className="text-emerald-600 font-semibold uppercase">Active on TVs</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right side: Add Category Quick Form */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-mono">Create New Categorization</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Define screen folders to group items logically.</p>
              </div>

              <form onSubmit={handleCreateCategory} className="space-y-3">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Category Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Traditional Mezes"
                    value={newCatName}
                    onChange={e => setNewCatName(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]/35"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Brief Catchphrase
                  </label>
                  <input
                    type="text"
                    placeholder="Handmade fresh shared starters"
                    value={newCatDesc}
                    onChange={e => setNewCatDesc(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]/35"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#EA580C] hover:bg-[#EA580C]/90 text-white font-semibold py-2.5 px-3 rounded-lg text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1 shadow-sm"
                >
                  <Plus className="h-4 w-4" />
                  <span>Push Category Folder</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ——— TABS 3: BRANCHES ——— */}
        {activeTab === 'branches' && (
          <div className="space-y-4" id="pane-branches">
            <div>
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider font-display">Branch Terminal Registry</h4>
              <p className="text-xs text-slate-400 mt-0.5">Physical retail properties serving this tenant's menu displays.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tenantBranches.map(branch => {
                const bScreens = screens.filter(s => s.branchId === branch.id);
                return (
                  <div key={branch.id} className="border border-slate-200 bg-white hover:border-slate-300 shadow-sm rounded-xl p-5 space-y-3.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-900 text-sm font-display">{branch.name}</span>
                        <span className="bg-orange-50 text-[#EA580C] border border-orange-100 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full">
                          {bScreens.length} Device Interfaces
                        </span>
                      </div>

                      <div className="space-y-1.5 pt-3.5 text-xs font-sans text-slate-500">
                        <p className="flex items-start gap-1.5 leading-relaxed">
                          <MapPin className="h-4 w-4 text-slate-450 mt-0.5 shrink-0" />
                          <span>{branch.address}</span>
                        </p>
                        <p>Tel: {branch.phone}</p>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-3 flex flex-wrap gap-1.5">
                      <span className="text-[10px] font-mono text-slate-400 block w-full mb-1">CONNECTED DEVICES:</span>
                      {bScreens.map(scr => (
                        <span key={scr.id} className="bg-slate-100 text-slate-600 font-mono text-[9px] px-2 py-0.5 rounded border border-slate-150">
                          {scr.name.split(' (')[0]}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ——— TABS 4: SCREENS ——— */}
        {activeTab === 'screens' && (
          <div className="space-y-4" id="pane-screens">
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
              <div>
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider font-display">Connected Digital Terminals</h4>
                <p className="text-xs text-slate-400 mt-0.5">Allocated menu display screens running active render boards.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tenantScreens.map(scr => {
                const bSymbol = tenantBranches.find(b => b.id === scr.branchId);
                return (
                  <div key={scr.id} className="border border-slate-150 p-4 rounded-xl bg-slate-50/50 flex flex-col justify-between gap-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-extrabold text-slate-900 text-sm">{scr.name}</h5>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">Location: {bSymbol?.name || 'Central'}</p>
                      </div>

                      <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold inline-block border ${
                        scr.status === 'online' 
                           ? 'bg-emerald-50 text-emerald-800 border-emerald-150' 
                          : scr.status === 'updating'
                          ? 'bg-amber-50 text-amber-800 border-amber-100 animate-pulse'
                          : 'bg-slate-100 text-slate-400'
                      }`}>
                        {scr.status.toUpperCase()}
                      </span>
                    </div>

                    {/* URL line */}
                    <div className="bg-white border border-slate-200 p-2 rounded-lg text-xs font-mono flex items-center justify-between text-slate-500 overflow-hidden text-ellipsis">
                      <span className="truncate max-w-[200px]" title={scr.url}>{scr.url}</span>
                      <span className="text-[9px] uppercase font-bold text-slate-400 pl-2 shrink-0">Screen Code</span>
                    </div>

                    <div className="border-t border-slate-150 pt-3 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Model Refresh Rate: <b className="font-mono text-slate-600">60Hz</b></span>
                      
                      <button
                        onClick={() => {
                          window.location.hash = scr.url;
                        }}
                        className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 transition-all text-[11px]"
                      >
                        <span>Preview Screen TV</span>
                        <ExternalLink className="h-3 w-3 text-orange-450" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ——— TABS 5: PROMOTIONS ——— */}
        {activeTab === 'promotions' && (
          <div className="space-y-4" id="pane-promotions">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider font-display">Active campaigns & Event Slates</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tenantPromotions.map(promo => {
                const pBranchList = tenantBranches.filter(b => promo.branchIds.includes(b.id));
                const pScreenList = tenantScreens.filter(s => promo.screenIds.includes(s.id));
                
                return (
                  <div key={promo.id} className="border border-slate-200 bg-white rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-all">
                    <img 
                      referrerPolicy="no-referrer"
                      src={promo.imageUrl} 
                      alt={promo.name} 
                      className="w-full md:w-36 h-36 object-cover border-b md:border-b-0 md:border-r shrink-0 border-slate-200"
                    />

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="bg-orange-50 text-[#EA580C] border border-orange-100 font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                            {promo.discountText}
                          </span>
                          <span className="text-[10px] text-emerald-600 font-bold font-mono">ACTIVE</span>
                        </div>
                        <h5 className="font-extrabold text-slate-900 text-sm mt-1.5">{promo.name}</h5>
                        <p className="text-slate-400 text-[11px] leading-relaxed font-light mt-1">{promo.description}</p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-400 space-y-1">
                        <p>Dates: <span className="text-slate-600">{promo.startDate}</span> to <span className="text-slate-600">{promo.endDate}</span></p>
                        <p>Target Screens: <span className="text-[#EA580C] font-bold font-sans">
                          {pScreenList.map(s => s.name.split(' (')[0]).join(', ') || 'All Connected Screens'}
                        </span></p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* RENDER MODAL LAYERS */}
      <AnimatePresence>
        {showAddModal && (
          <AddProductModal 
            restaurantId={currentRestaurantId} 
            onClose={() => setShowAddModal(false)}
          />
        )}

        {showImportWizard && (
          <PdfImportWizard 
            restaurantId={currentRestaurantId} 
            onClose={() => setShowImportWizard(false)}
            onComplete={() => {
              setShowImportWizard(false);
              setActiveTab('products');
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
