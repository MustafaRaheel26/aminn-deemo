/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useData } from '../hooks/useData';
import { PlusCircle, Sparkles, Image, Check, AlertCircle } from 'lucide-react';

interface AddProductModalProps {
  restaurantId: string;
  onClose: () => void;
}

export default function AddProductModal({ restaurantId, onClose }: AddProductModalProps) {
  const { categories, addProduct } = useData();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [calories, setCalories] = useState('450 kcal');
  const [isFeatured, setIsFeatured] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter categories to only current restaurant
  const filteredCategories = categories.filter(c => c.restaurantId === restaurantId);

  // A list of gorgeous working preset images so the client can pick visually and see it updated on TVs instantly!
  const imagePresets = [
    { name: 'Adana Charcoal Kebab', url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop' },
    { name: 'Craft Cheeseburger Roll', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop' },
    { name: "Golden Shaved Döner", url: 'https://images.unsplash.com/photo-1561651823-34fed022540d?w=600&auto=format&fit=crop' },
    { name: 'Crispy Fried Chicken Bucket', url: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=600&auto=format&fit=crop' },
    { name: 'Cajun Loaded Fries', url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop' },
    { name: 'Hot Roasted Espresso', url: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=600&auto=format&fit=crop' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) return setError('Please enter a product name.');
    if (!categoryId) return setError('Please select a valid menu category.');
    if (!price || parseFloat(price) <= 0) return setError('Please specify a positive menu price.');

    // Choose default image if none chosen
    const finalImageUrl = imageUrl || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop';

    addProduct({
      restaurantId,
      categoryId,
      name,
      description,
      price: parseFloat(price),
      imageUrl: finalImageUrl,
      status: 'available',
      calories,
      isFeatured
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 shadow-sm" id="add-product-modal">
      <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header decoration */}
        <div className="bg-slate-950 p-6 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-[#EA580C]" />
            <h3 className="text-lg font-bold font-display">Add New Product to Board</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-all text-xl focus:outline-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4 overflow-y-auto">
          {error && (
            <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-lg text-xs">
              <AlertCircle className="h-4.5 w-4.5 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Form Rows */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Product Title
              </label>
              <input 
                type="text"
                required
                placeholder="e.g. Garlic Butter Lamb Chop"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]/35 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Category
              </label>
              <select
                required
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-700 font-semibold focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]/35"
              >
                <option value="">Select Category...</option>
                {filteredCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Retail Price ($)
              </label>
              <input 
                type="number"
                step="0.01"
                required
                placeholder="14.95"
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]/35"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Caloric Count (Optional)
              </label>
              <input 
                type="text"
                placeholder="550 kcal"
                value={calories}
                onChange={e => setCalories(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]/35"
              />
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input 
                  type="checkbox"
                  checked={isFeatured}
                  onChange={e => setIsFeatured(e.target.checked)}
                  className="h-4 w-4 rounded text-[#EA580C] focus:ring-[#EA580C]/35 accent-[#EA580C]"
                />
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Featured Large On Board</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Gastronomy / Culinary Description
            </label>
            <textarea 
              rows={2}
              placeholder="Detail marinades, cooking styles, organic sourcing, and allergy indices."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]/35 font-sans"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Product Image Address URL
              </label>
              <span className="text-[10px] text-slate-400 font-mono">Accepts Unsplash, CDN</span>
            </div>
            <input 
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]/35"
            />
          </div>

          {/* Preset Visual Chooser */}
          <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-2">
              <Image className="h-3.5 w-3.5 text-[#EA580C]" />
              <span>Or click a working food image preset:</span>
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {imagePresets.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImageUrl(img.url)}
                  className={`border p-1.5 rounded-lg text-left hover:border-[#EA580C]/40 hover:bg-white transition-all flex items-center gap-2 ${imageUrl === img.url ? 'border-[#EA580C] bg-orange-50/60' : 'border-slate-205 bg-white'}`}
                >
                  <img 
                    referrerPolicy="no-referrer"
                    src={img.url} 
                    alt={img.name} 
                    className="w-7 h-7 rounded object-cover shadow-sm"
                  />
                  <span className="text-[10px] font-semibold text-slate-600 truncate">{img.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2.5 rounded-lg text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#EA580C] hover:bg-[#EA580C]/90 text-white font-semibold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>Commit Product</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
