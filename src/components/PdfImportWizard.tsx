/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useData } from '../hooks/useData';
import { 
  FileText, 
  Upload, 
  Loader2, 
  CheckCircle, 
  ChevronRight, 
  Cpu, 
  Edit, 
  Sparkles, 
  AlertTriangle, 
  ArrowRight,
  Info,
  Trash2,
  ListRestart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PdfImportWizardProps {
  restaurantId: string;
  onClose: () => void;
  onComplete: () => void;
}

export default function PdfImportWizard({ restaurantId, onClose, onComplete }: PdfImportWizardProps) {
  const { importPdfMenu, categories, restaurants } = useData();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  
  // Custom states for wizard items
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [detectedCategories, setDetectedCategories] = useState<any[]>([]);
  const [detectedProducts, setDetectedProducts] = useState<any[]>([]);

  const activeRest = restaurants.find(r => r.id === restaurantId);

  // Ready-to-inject simulation presets
  const simulationPresets = {
    miracleOld: {
      fileName: 'miracle_menu_original_2025.pdf',
      categories: [
        { name: 'Kebabs & Grills', explanation: 'Found 4 menu titles in bold top header' },
        { name: 'Cold Mezes', explanation: 'Found 3 items with cumin and yogurt descriptors' },
        { name: 'Fresh Craft Drinks', explanation: 'Discovered coffee & tea line items' }
      ],
      products: [
        { name: 'Adana Meatball Kebab', description: 'Hand-ground spicy minced lamb spiced with fresh flat parsley and red chili peppers', price: 18.00, categoryId: 'Kebabs & Grills', imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop' },
        { name: 'Urfa Mild Lamb Skewer', description: 'Tender non-spicy lamb skewered and char-grilled over premium wood coal embers', price: 19.50, categoryId: 'Kebabs & Grills', imageUrl: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600&auto=format&fit=crop' },
        { name: 'Garlic Yogurt Cacik', description: 'Chilled strained yogurt folded with cucumber shreds, fresh garlic cloves, and extra virgin mint oil', price: 7.50, categoryId: 'Cold Mezes', imageUrl: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=600&auto=format&fit=crop' },
        { name: 'Stuffed Vine Leaves', description: 'Grandma recipe hand-wrapped grape leaves stuffed with organic pine nuts, sweet black currants, and aromatic rice', price: 9.00, categoryId: 'Cold Mezes', imageUrl: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600&auto=format&fit=crop' },
        { name: 'Double Steamed Espresso', description: 'High-pressure shot of roasted Ethiopian dark bean blend', price: 5.00, categoryId: 'Fresh Craft Drinks', imageUrl: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=600&auto=format&fit=crop' }
      ]
    },
    burgerWingsdiner: {
      fileName: 'all_day_fried_combos.pdf',
      categories: [
        { name: 'Crispy Combos', explanation: 'Identified from bucket keyword layouts' },
        { name: 'Mega Sides', explanation: 'Identified after french fries & waffle items' }
      ],
      products: [
        { name: '12pc Spicy Cajun Wings Bucket', description: 'Double breaded deep fried wings tossed in cajun and smoke dust', price: 16.99, categoryId: 'Crispy Combos', imageUrl: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=600&auto=format&fit=crop' },
        { name: 'Golden Onion Ring Basket', description: 'Oversized buttermilk soaked battered Spanish onion rings crispy breading', price: 6.99, categoryId: 'Mega Sides', imageUrl: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&auto=format&fit=crop' }
      ]
    }
  };

  const handleUploadClick = (presetType: 'miracleOld' | 'burgerWingsdiner') => {
    setIsProcessing(true);
    const preset = simulationPresets[presetType];
    setSelectedFile(preset.fileName);
    setProcessingStatus('Starting high-fidelity OCR scanning...');

    setTimeout(() => {
      setProcessingStatus('Structuring content (Multi-Tenant Vision Parser v3.1)...');
      setTimeout(() => {
        setProcessingStatus('Decrypting price matrix grids & descriptions...');
        setTimeout(() => {
          setDetectedCategories(preset.categories);
          setDetectedProducts(preset.products);
          setIsProcessing(false);
          setStep(2);
        }, 600);
      }, 700);
    }, 650);
  };

  const handleApplyImport = () => {
    const formattedCategories = detectedCategories.map(cat => ({
      restaurantId,
      name: cat.name,
      description: `Imported from ${selectedFile}`,
      iconName: 'Flame',
      isActive: true
    }));

    const formattedProducts = detectedProducts.map(prod => ({
      restaurantId,
      categoryId: prod.categoryId, // temporary category ID is actually name
      name: prod.name,
      description: prod.description,
      price: prod.price,
      imageUrl: prod.imageUrl,
      status: 'available' as const,
      isFeatured: false
    }));

    importPdfMenu(formattedCategories, formattedProducts);
    setStep(4);
  };

  const handleEditProductPrice = (index: number, newPrice: string) => {
    const updated = [...detectedProducts];
    updated[index].price = parseFloat(newPrice) || 0;
    setDetectedProducts(updated);
  };

  const handleEditProductName = (index: number, newName: string) => {
    const updated = [...detectedProducts];
    updated[index].name = newName;
    setDetectedProducts(updated);
  };

  const handleRemoveProduct = (index: number) => {
    const updated = detectedProducts.filter((_, i) => i !== index);
    setDetectedProducts(updated);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto" id="pdf-import-wizard">
      <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-4xl shadow-2xl relative overflow-hidden flex flex-col my-8">
        
        {/* Banner header decoration */}
        <div className="bg-[#EA580C] text-white p-6 relative">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Cpu className="h-24 w-24" />
          </div>
          <div className="flex items-center gap-2 mb-1.5 grayscale-0">
            <Sparkles className="h-5 w-5 text-amber-200 animate-pulse" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-orange-100 font-bold bg-white/10 px-2.5 py-0.5 rounded-full">
              PDF AI Parser Engine v4.2
            </span>
          </div>
          <h2 className="text-2xl font-display font-extrabold tracking-tight">
            Import Existing PDF Menu — {activeRest?.name}
          </h2>
          <p className="text-orange-50 text-xs mt-1">
            Bulk onboard menu contents dynamically. Upload a vintage flyer, standard PDF menu, or chalkboard layout and let our AI categorize and generate items for screens.
          </p>
        </div>

        {/* Wizard Step Progression Bar */}
        <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-6 overflow-x-auto w-full max-w-3xl pr-2 no-scrollbar">
            <div className={`flex items-center gap-1.5 font-semibold shrink-0 ${step >= 1 ? 'text-[#EA580C]' : 'text-slate-400'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-[#EA580C] text-white font-mono' : 'bg-slate-200 text-slate-500'}`}>1</div>
              <span>Upload PDF</span>
            </div>
            <ChevronRight className="h-3 w-3 shrink-0 text-slate-400" />

            <div className={`flex items-center gap-1.5 font-semibold shrink-0 ${step >= 2 ? 'text-[#EA580C]' : 'text-slate-400'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#EA580C] text-white font-mono' : 'bg-slate-200 text-slate-500'}`}>2</div>
              <span>Detected Channels</span>
            </div>
            <ChevronRight className="h-3 w-3 shrink-0 text-slate-400" />

            <div className={`flex items-center gap-1.5 font-semibold shrink-0 ${step >= 3 ? 'text-[#EA580C]' : 'text-slate-400'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-[#EA580C] text-white font-mono' : 'bg-slate-200 text-slate-500'}`}>3</div>
              <span>Review Catalog & Pricing</span>
            </div>
            <ChevronRight className="h-3 w-3 shrink-0 text-slate-400" />

            <div className={`flex items-center gap-1.5 font-semibold shrink-0 ${step === 4 ? 'text-emerald-700' : 'text-slate-400'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 4 ? 'bg-emerald-600 text-white font-mono' : 'bg-slate-200 text-slate-500'}`}>4</div>
              <span>Complete!</span>
            </div>
          </div>

          <div className="font-mono text-slate-400 hidden sm:block">
            STEP {step}/4
          </div>
        </div>

        {/* Dynamic Step Panels */}
        <div className="p-6 md:p-8 flex-1 min-h-[350px]">
          <AnimatePresence mode="wait">
            {isProcessing ? (
              <motion.div 
                key="processing"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center py-12"
              >
                <div className="bg-orange-50 p-4 rounded-full border border-orange-100 text-[#EA580C] mb-4 animate-bounce">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
                <h4 className="text-base font-bold text-slate-900 font-display">Deep Learning OCR in Progress...</h4>
                <p className="text-xs text-slate-500 font-mono mt-1 max-w-sm">{processingStatus}</p>
                <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-4">
                  <div className="h-full bg-[#EA580C] animate-[pulse_1.5s_infinite] w-32 rounded-full" />
                </div>
              </motion.div>
            ) : (
              <>
                {/* STEP 1: UPLOAD PDF AREA */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="border-2 border-dashed border-slate-200 hover:border-[#EA580C]/40 transition-all rounded-xl p-8 bg-slate-50/50 flex flex-col items-center justify-center text-center cursor-pointer relative group">
                      <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 text-slate-400 group-hover:text-[#EA580C] group-hover:bg-orange-50 transition-all mb-4">
                        <Upload className="h-8 w-8" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">Drag and Drop PDF Menu</h4>
                      <p className="text-xs text-slate-400 max-w-xs font-light">Supports vector PDF, raw camera images, and historical flyers (max 10MB)</p>
                      
                      <div className="mt-4 flex gap-2">
                        <span className="bg-white border border-slate-200 text-slate-500 text-[10px] px-2.5 py-1 rounded-md font-mono">FILE.pdf</span>
                        <span className="bg-white border border-slate-200 text-slate-500 text-[10px] px-2.5 py-1 rounded-md font-mono">JPG / PNG</span>
                      </div>
                    </div>

                    {/* Pre-configured Playable Menu Prompts */}
                    <div>
                      <div className="flex items-center gap-1 text-xs text-slate-600 font-bold uppercase tracking-wider mb-3">
                        <Cpu className="h-4 w-4 text-[#EA580C]" />
                        <span>Interactive Demo: Simulation Presets (No real files needed!)</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div 
                          onClick={() => handleUploadClick('miracleOld')}
                          className="border border-slate-200 hover:border-[#EA580C]/40 hover:bg-orange-50/40 p-4 rounded-xl cursor-pointer transition-all flex items-start gap-3.5 group"
                        >
                          <div className="bg-orange-100 text-[#EA580C] p-2 rounded-lg group-hover:scale-105 transition-all shrink-0">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-800 text-xs block group-hover:text-[#EA580C]">Miracle Archive Menu</span>
                            <span className="text-[10px] font-mono text-slate-400 block mt-0.5">Filename: miracle_menu_original_2025.pdf</span>
                            <span className="text-[11px] text-slate-500 block mt-1.5 font-sans font-light leading-relaxed">
                              Scans 5 items in 3 custom categories: Kebabs, Meze plates, and hot Turkish tea.
                            </span>
                          </div>
                        </div>

                        <div 
                          onClick={() => handleUploadClick('burgerWingsdiner')}
                          className="border border-slate-200 hover:border-[#EA580C]/40 hover:bg-orange-50/40 p-4 rounded-xl cursor-pointer transition-all flex items-start gap-3.5 group"
                        >
                          <div className="bg-slate-100 text-slate-500 p-2 rounded-lg group-hover:scale-105 transition-all shrink-0 group-hover:bg-orange-100 group-hover:text-[#EA580C]">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-800 text-xs block group-hover:text-[#EA580C]">Diner Combos Flyer</span>
                            <span className="text-[10px] font-mono text-slate-400 block mt-0.5">Filename: all_day_fried_combos.pdf</span>
                            <span className="text-[11px] text-slate-500 block mt-1.5 font-sans font-light leading-relaxed">
                              Instantly imports fried wings & side rings baskets directly into categories.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: DETECTED CATEGORIES */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl text-emerald-800 text-xs shadow-sm">
                      <CheckCircle className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-emerald-950">Neural Schema Extraction Complete!</span>
                        <p className="text-[11px] text-emerald-700/90 mt-0.5">Our deep learning model scanned <b>{detectedProducts.length} items</b> and detected <b>{detectedCategories.length} logical categories</b> inside <i>{selectedFile}</i>.</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <span className="text-xs uppercase font-semibold text-slate-500 block">Configure Extracted Categories</span>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {detectedCategories.map((cat, idx) => (
                          <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col justify-between shadow-sm">
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-900 font-display">{cat.name}</span>
                                <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 border border-emerald-110 px-1.5 rounded">98% Conf</span>
                              </div>
                              <p className="text-[10px] text-slate-400 mt-1 font-mono">{cat.explanation}</p>
                            </div>
                            
                            <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center gap-1">
                              <span className="text-[10px] text-slate-400">Target Folder:</span>
                              <span className="text-[10px] font-bold text-[#EA580C] bg-orange-50 border border-orange-100 px-1.5 py-0.5 rounded uppercase font-mono">Menu Board</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 p-3 rounded-lg text-amber-800 text-[11px] font-sans shadow-sm">
                      <Info className="h-4 w-4 text-amber-600 shrink-0" />
                      <span>In Step 3, you can edit product titles, customize parsed prices, or drop items you do not wish to push onto live counters today.</span>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <button 
                        onClick={() => setStep(1)}
                        className="border border-slate-305 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-xs font-semibold"
                      >
                        Back
                      </button>
                      <button 
                        onClick={() => setStep(3)}
                        className="bg-[#EA580C] hover:bg-[#EA580C]/90 text-white px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2"
                      >
                        <span>Analyze Identified Products</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: REVIEW PRODUCTS MAPPING AND PRICES */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex justify-between items-center bg-slate-50 border border-slate-200 p-3 rounded-lg shadow-sm">
                      <span className="text-xs font-bold text-slate-800 font-display flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-[#EA580C]" />
                        <span>Extracted Catalog Preview ({detectedProducts.length} Items)</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">Click to override items or delete files.</span>
                    </div>

                    {/* Table of items */}
                    <div className="border border-slate-200 rounded-xl overflow-hidden max-h-[280px] overflow-y-auto shadow-sm">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-500 font-mono text-[10px] uppercase font-semibold border-b border-slate-200">
                            <th className="px-4 py-2.5">Item Name</th>
                            <th className="px-4 py-2.5">Mapped Category</th>
                            <th className="px-4 py-2.5">Extracted Description</th>
                            <th className="px-4 py-2.5 w-24">Price ($)</th>
                            <th className="px-4 py-2.5 w-16 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs">
                          {detectedProducts.map((p, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="px-4 py-3 font-semibold text-slate-900">
                                <input 
                                  type="text" 
                                  value={p.name} 
                                  onChange={(e) => handleEditProductName(idx, e.target.value)}
                                  className="bg-transparent border-b border-transparent focus:border-slate-300 font-semibold text-slate-800 py-0.5 px-1 outline-none w-full"
                                />
                              </td>
                              <td className="px-4 py-3">
                                <span className="bg-orange-50 text-[#EA580C] font-mono text-[10px] px-2 py-0.5 rounded border border-orange-100">
                                  {p.categoryId}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-slate-400 truncate max-w-xs" title={p.description}>
                                {p.description}
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-1">
                                  <span className="text-slate-450 font-mono">$</span>
                                  <input 
                                    type="number"
                                    step="0.01"
                                    value={p.price} 
                                    onChange={(e) => handleEditProductPrice(idx, e.target.value)}
                                    className="bg-slate-50 border border-slate-200 rounded-md font-mono py-1 px-1.5 text-xs text-slate-800 outline-none w-16 focus:bg-white focus:border-[#EA580C]"
                                  />
                                </div>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <button 
                                  onClick={() => handleRemoveProduct(idx)}
                                  className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-1.5 rounded transition-all"
                                  title="Delete item"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <button 
                        onClick={() => setStep(2)}
                        className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-xs font-semibold"
                      >
                        Back
                      </button>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={onClose}
                          className="border border-slate-300 hover:bg-slate-50 text-slate-500 px-4 py-2 rounded-lg text-xs font-semibold"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={handleApplyImport}
                          className="bg-[#EA580C] hover:bg-[#EA580C]/90 text-white px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-sm"
                        >
                          <CheckCircle className="h-4.5 w-4.5 text-white" />
                          <span>Commit To Active Board</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: IMPORT COMPLETE SUCCESS CARD */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-8"
                  >
                    <div className="bg-emerald-50 text-emerald-600 p-4 rounded-full border border-emerald-100 mb-4 animate-[bounce_1s]">
                      <CheckCircle className="h-10 w-10 text-emerald-600" />
                    </div>
                    
                    <h3 className="text-xl font-display font-extrabold text-slate-900">Catalogs Synced Perfectly!</h3>
                    <p className="text-xs text-slate-500 mt-1.5 max-w-md font-light leading-relaxed">
                      Successfully injected the categories and catalog elements from <b>{selectedFile}</b> directly into <b>{activeRest?.name}'s</b> unified digital storage database.
                    </p>

                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mt-6 w-full max-w-sm text-left shadow-sm">
                      <h5 className="text-xs font-extrabold text-slate-800 mb-2 uppercase font-mono tracking-wider text-center border-b border-slate-200 pb-1.5">
                        COMMITTED STATS
                      </h5>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="bg-white p-2.5 rounded-lg border border-slate-150">
                          <span className="text-lg font-bold font-display text-[#EA580C]">+{detectedCategories.length}</span>
                          <span className="block text-[10px] text-slate-400 font-mono uppercase">Categories</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-slate-150">
                          <span className="text-lg font-bold font-display text-[#EA580C]">+{detectedProducts.length}</span>
                          <span className="block text-[10px] text-slate-400 font-mono uppercase">Menu Items</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-3">
                      <button
                        onClick={onComplete}
                        className="bg-[#EA580C] hover:bg-[#EA580C]/90 text-white px-5 py-2.5 rounded-lg text-xs font-semibold shadow-sm"
                      >
                        View Interactive Menu Board Grid
                      </button>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Modal absolute close */}
        {step !== 4 && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-1.5 transition-all focus:outline-none"
            aria-label="Close modal"
          >
            <span className="font-mono text-sm leading-none block px-1">×</span>
          </button>
        )}
      </div>
    </div>
  );
}
