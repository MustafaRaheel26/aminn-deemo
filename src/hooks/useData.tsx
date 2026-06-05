/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Restaurant, Category, Product, Branch, Screen, Promotion, User } from '../types';
import { mockRestaurants, mockCategories, mockProducts, mockBranches, mockScreens, mockPromotions, mockUsers } from '../data/mockData';

interface DataContextType {
  restaurants: Restaurant[];
  categories: Category[];
  products: Product[];
  branches: Branch[];
  screens: Screen[];
  promotions: Promotion[];
  currentUser: User | null;
  activeRestaurantId: string | null;
  loading: boolean;
  
  // Custom dynamic users base
  dynamicUsers: User[];
  
  setCurrentUser: (user: User | null) => void;
  setActiveRestaurantId: (id: string | null) => void;
  
  // Restaurants Management
  addRestaurant: (restaurant: Omit<Restaurant, 'id'>, adminEmail?: string, adminName?: string) => string;
  updateRestaurant: (id: string, partial: Partial<Restaurant>) => void;
  deleteRestaurant: (id: string) => void;
  
  // Products API
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Categories API
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, partial: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  // Branches API
  addBranch: (branch: Omit<Branch, 'id'>) => void;
  updateBranch: (id: string, partial: Partial<Branch>) => void;
  deleteBranch: (id: string) => void;
  
  // Screens API
  addScreen: (screen: Omit<Screen, 'id'>) => void;
  updateScreen: (id: string, partial: Partial<Screen>) => void;
  deleteScreen: (id: string) => void;
  
  // Promotions API
  addPromotion: (promo: Omit<Promotion, 'id'>) => void;
  deletePromotion: (id: string) => void;

  // Bulk PDF Import Simulation
  importPdfMenu: (parsedCategories: Omit<Category, 'id'>[], parsedProducts: Omit<Product, 'id'>[]) => void;
  
  // Reset demo state
  resetAllData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [screens, setScreens] = useState<Screen[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [dynamicUsers, setDynamicUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeRestaurantId, setActiveRestaurantId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize from Mock Storage or LocalStorage to maintain persistence during live review
  useEffect(() => {
    try {
      const savedRestaurants = localStorage.getItem('amin_restaurants');
      const savedCategories = localStorage.getItem('amin_categories');
      const savedProducts = localStorage.getItem('amin_products');
      const savedBranches = localStorage.getItem('amin_branches');
      const savedScreens = localStorage.getItem('amin_screens');
      const savedPromotions = localStorage.getItem('amin_promotions');
      const savedDynamicUsers = localStorage.getItem('amin_dynamic_users');
      const savedUser = localStorage.getItem('amin_user');
      const savedActiveRest = localStorage.getItem('amin_active_rest');

      if (savedRestaurants) setRestaurants(JSON.parse(savedRestaurants));
      else setRestaurants(mockRestaurants);

      if (savedCategories) setCategories(JSON.parse(savedCategories));
      else setCategories(mockCategories);

      if (savedProducts) setProducts(JSON.parse(savedProducts));
      else setProducts(mockProducts);

      if (savedBranches) setBranches(JSON.parse(savedBranches));
      else setBranches(mockBranches);

      if (savedScreens) setScreens(JSON.parse(savedScreens));
      else setScreens(mockScreens);

      if (savedPromotions) setPromotions(JSON.parse(savedPromotions));
      else setPromotions(mockPromotions);

      if (savedDynamicUsers) {
        setDynamicUsers(JSON.parse(savedDynamicUsers));
      } else {
        setDynamicUsers(mockUsers);
      }

      if (savedUser) setCurrentUser(JSON.parse(savedUser));
      // Default to no user initially to show the gorgeous business login page
      
      if (savedActiveRest) setActiveRestaurantId(savedActiveRest);
    } catch (e) {
      console.error("Local storage read error", e);
      // Fallback
      setRestaurants(mockRestaurants);
      setCategories(mockCategories);
      setProducts(mockProducts);
      setBranches(mockBranches);
      setScreens(mockScreens);
      setPromotions(mockPromotions);
      setDynamicUsers(mockUsers);
    } finally {
      setLoading(false);
    }
  }, []);

  // Sync to local storage
  const saveState = (key: string, val: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error("Local storage write error", e);
    }
  };

  const handleSetCurrentUser = (user: User | null) => {
    setCurrentUser(user);
    if (user) {
      saveState('amin_user', user);
      if (user.role === 'restaurant_admin' && user.restaurantId) {
        setActiveRestaurantId(user.restaurantId);
        localStorage.setItem('amin_active_rest', user.restaurantId);
      }
    } else {
      localStorage.removeItem('amin_user');
      localStorage.removeItem('amin_active_rest');
      setActiveRestaurantId(null);
    }
  };

  const handleSetActiveRestaurantId = (id: string | null) => {
    setActiveRestaurantId(id);
    if (id) {
      localStorage.setItem('amin_active_rest', id);
    } else {
      localStorage.removeItem('amin_active_rest');
    }
  };

  // Add Restaurant (with sample menu seeding & dedicated tenant user configuration)
  const addRestaurant = (newRest: Omit<Restaurant, 'id'>, adminEmail?: string, adminName?: string) => {
    const restId = `rest-gen-${Date.now()}`;
    const formattedRest: Restaurant = {
      ...newRest,
      id: restId
    };

    // Update Restaurants
    const updatedRestaurants = [...restaurants, formattedRest];
    setRestaurants(updatedRestaurants);
    saveState('amin_restaurants', updatedRestaurants);

    // Create custom user account for new brand so they can log in immediately
    const emailToUse = adminEmail?.trim() || `${newRest.name.toLowerCase().replace(/\s+/g, '')}@amin.io`;
    const nameToUse = adminName?.trim() || `${newRest.name} Admin`;
    
    const newUser: User = {
      id: `user-gen-${Date.now()}`,
      name: nameToUse,
      email: emailToUse,
      role: 'restaurant_admin',
      restaurantId: restId,
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop'
    };

    const updatedUsers = [...dynamicUsers, newUser];
    setDynamicUsers(updatedUsers);
    saveState('amin_dynamic_users', updatedUsers);

    // Auto-seed physical Branch Location
    const firstBranch: Branch = {
      id: `br-gen-${Date.now()}`,
      restaurantId: restId,
      name: `${newRest.name} Dowtown HQ`,
      address: '742 Foodie Avenue, Suite A',
      phone: '+1 (555) 912-4011',
      activeScreenCount: 0
    };
    const updatedBranches = [...branches, firstBranch];
    setBranches(updatedBranches);
    saveState('amin_branches', updatedBranches);

    // Auto-seed sample Categories to make it ready out-of-the-box
    const sampleCat1Id = `cat-gen-${Date.now()}-1`;
    const sampleCat2Id = `cat-gen-${Date.now()}-2`;

    const seedCategories: Category[] = [
      {
        id: sampleCat1Id,
        restaurantId: restId,
        name: 'House Favorites',
        description: 'Locally sourced freshly cooked specialties',
        iconName: 'Flame',
        isActive: true
      },
      {
        id: sampleCat2Id,
        restaurantId: restId,
        name: 'Gourmet Beverages',
        description: 'House-infused botanicals & refreshers',
        iconName: 'Coffee',
        isActive: true
      }
    ];

    const updatedCategories = [...categories, ...seedCategories];
    setCategories(updatedCategories);
    saveState('amin_categories', updatedCategories);

    // Auto-seed sample Products
    const seedProducts: Product[] = [
      {
        id: `prod-gen-${Date.now()}-1`,
        restaurantId: restId,
        categoryId: sampleCat1Id,
        name: 'Amin Signature Tasting Plate',
        description: 'Finest handpicked ingredients slow cooked over stone fires with fresh aromatic butter sauce.',
        price: 18.99,
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop',
        status: 'available',
        calories: '540 kcal',
        isFeatured: true
      },
      {
        id: `prod-gen-${Date.now()}-2`,
        restaurantId: restId,
        categoryId: sampleCat1Id,
        name: 'Ember-Grilled Artisan Skewer',
        description: 'Tender house cuts marinated in olive oil, garlic blend, sea salt, and dynamic peppers.',
        price: 21.50,
        imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop',
        status: 'available',
        calories: '610 kcal',
        isFeatured: true
      },
      {
        id: `prod-gen-${Date.now()}-3`,
        restaurantId: restId,
        categoryId: sampleCat2Id,
        name: 'Amin Sea Salted Refresher',
        description: 'Fresh pressed organic citrus blended with double filtered mountain water and touch of salt.',
        price: 4.50,
        imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop',
        status: 'available',
        calories: '110 kcal'
      }
    ];

    const updatedProducts = [...seedProducts, ...products];
    setProducts(updatedProducts);
    saveState('amin_products', updatedProducts);

    return restId;
  };

  const updateRestaurant = (id: string, partial: Partial<Restaurant>) => {
    const updated = restaurants.map(r => r.id === id ? { ...r, ...partial } : r);
    setRestaurants(updated);
    saveState('amin_restaurants', updated);
  };

  const deleteRestaurant = (id: string) => {
    const updated = restaurants.filter(r => r.id !== id);
    setRestaurants(updated);
    saveState('amin_restaurants', updated);
    
    // Also cleanup cascades
    const remainingProducts = products.filter(p => p.restaurantId !== id);
    setProducts(remainingProducts);
    saveState('amin_products', remainingProducts);

    const remainingCategories = categories.filter(c => c.restaurantId !== id);
    setCategories(remainingCategories);
    saveState('amin_categories', remainingCategories);

    const remainingBranches = branches.filter(b => b.restaurantId !== id);
    setBranches(remainingBranches);
    saveState('amin_branches', remainingBranches);

    const remainingScreens = screens.filter(s => s.restaurantId !== id);
    setScreens(remainingScreens);
    saveState('amin_screens', remainingScreens);

    const remainingPromotions = promotions.filter(p => p.restaurantId !== id);
    setPromotions(remainingPromotions);
    saveState('amin_promotions', remainingPromotions);
  };

  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const prod: Product = {
      ...newProd,
      id: `prod-gen-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };
    const updated = [prod, ...products];
    setProducts(updated);
    saveState('amin_products', updated);
  };

  const updateProduct = (id: string, partial: Partial<Product>) => {
    const updated = products.map(p => p.id === id ? { ...p, ...partial } : p);
    setProducts(updated);
    saveState('amin_products', updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    saveState('amin_products', updated);
  };

  const addCategory = (newCat: Omit<Category, 'id'>) => {
    const cat: Category = {
      ...newCat,
      id: `cat-gen-${Date.now()}`
    };
    const updated = [...categories, cat];
    setCategories(updated);
    saveState('amin_categories', updated);
  };

  const updateCategory = (id: string, partial: Partial<Category>) => {
    const updated = categories.map(c => c.id === id ? { ...c, ...partial } : c);
    setCategories(updated);
    saveState('amin_categories', updated);
  };

  const deleteCategory = (id: string) => {
    const updated = categories.filter(c => c.id !== id);
    setCategories(updated);
    saveState('amin_categories', updated);
  };

  const addBranch = (newBranch: Omit<Branch, 'id'>) => {
    const branch: Branch = {
      ...newBranch,
      id: `br-gen-${Date.now()}`,
      activeScreenCount: 0
    };
    const updated = [...branches, branch];
    setBranches(updated);
    saveState('amin_branches', updated);
  };

  const updateBranch = (id: string, partial: Partial<Branch>) => {
    const updated = branches.map(b => b.id === id ? { ...b, ...partial } : b);
    setBranches(updated);
    saveState('amin_branches', updated);
  };

  const deleteBranch = (id: string) => {
    const updated = branches.filter(b => b.id !== id);
    setBranches(updated);
    saveState('amin_branches', updated);
  };

  const addScreen = (newScreen: Omit<Screen, 'id'>) => {
    const screen: Screen = {
      ...newScreen,
      id: `scr-gen-${Date.now()}`
    };
    
    // Increment active screen count of its parent branch
    const updatedBranches = branches.map(b => {
      if (b.id === newScreen.branchId) {
        return { ...b, activeScreenCount: (b.activeScreenCount || 0) + 1 };
      }
      return b;
    });
    setBranches(updatedBranches);
    saveState('amin_branches', updatedBranches);

    const updatedScreens = [...screens, screen];
    setScreens(updatedScreens);
    saveState('amin_screens', updatedScreens);
  };

  const updateScreen = (id: string, partial: Partial<Screen>) => {
    const updated = screens.map(s => s.id === id ? { ...s, ...partial } : s);
    setScreens(updated);
    saveState('amin_screens', updated);
  };

  const deleteScreen = (id: string) => {
    const screenObj = screens.find(s => s.id === id);
    const updatedScreens = screens.filter(s => s.id !== id);
    setScreens(updatedScreens);
    saveState('amin_screens', updatedScreens);

    if (screenObj) {
      const updatedBranches = branches.map(b => {
        if (b.id === screenObj.branchId) {
          const count = b.activeScreenCount || 0;
          return { ...b, activeScreenCount: count > 0 ? count - 1 : 0 };
        }
        return b;
      });
      setBranches(updatedBranches);
      saveState('amin_branches', updatedBranches);
    }
  };

  const addPromotion = (newPromo: Omit<Promotion, 'id'>) => {
    const promo: Promotion = {
      ...newPromo,
      id: `promo-gen-${Date.now()}`
    };
    const updated = [promo, ...promotions];
    setPromotions(updated);
    saveState('amin_promotions', updated);
  };

  const deletePromotion = (id: string) => {
    const updated = promotions.filter(p => p.id !== id);
    setPromotions(updated);
    saveState('amin_promotions', updated);
  };

  const importPdfMenu = (parsedCats: Omit<Category, 'id'>[], parsedProds: Omit<Product, 'id'>[]) => {
    // Generate actual Category IDs and Products
    const generatedCats: Category[] = parsedCats.map(cat => ({
      ...cat,
      id: `cat-imported-${Date.now()}-${Math.floor(Math.random() * 10000)}`
    }));

    const generatedProds: Product[] = parsedProds.map(prod => {
      // Try to find the matching category name among imported categories to link them
      const tempCat = parsedCats.find(c => c.name === prod.categoryId); // temporarily has cat name as categoryId
      const matchingRealCat = generatedCats.find(c => c.name === (tempCat?.name || prod.categoryId));
      
      return {
        ...prod,
        id: `prod-imported-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        categoryId: matchingRealCat ? matchingRealCat.id : prod.categoryId
      };
    });

    const newCatsList = [...categories, ...generatedCats];
    const newProdsList = [...generatedProds, ...products];

    setCategories(newCatsList);
    setProducts(newProdsList);

    saveState('amin_categories', newCatsList);
    saveState('amin_products', newProdsList);
  };

  const resetAllData = () => {
    localStorage.removeItem('amin_restaurants');
    localStorage.removeItem('amin_categories');
    localStorage.removeItem('amin_products');
    localStorage.removeItem('amin_branches');
    localStorage.removeItem('amin_screens');
    localStorage.removeItem('amin_promotions');
    localStorage.removeItem('amin_dynamic_users');
    localStorage.removeItem('amin_user');
    localStorage.removeItem('amin_active_rest');
    
    setRestaurants(mockRestaurants);
    setCategories(mockCategories);
    setProducts(mockProducts);
    setBranches(mockBranches);
    setScreens(mockScreens);
    setPromotions(mockPromotions);
    setDynamicUsers(mockUsers);
    setCurrentUser(null);
    setActiveRestaurantId(null);
  };

  return (
    <DataContext.Provider value={{
      restaurants,
      categories,
      products,
      branches,
      screens,
      promotions,
      currentUser,
      activeRestaurantId,
      loading,
      dynamicUsers,
      setCurrentUser: handleSetCurrentUser,
      setActiveRestaurantId: handleSetActiveRestaurantId,
      addRestaurant,
      updateRestaurant,
      deleteRestaurant,
      addProduct,
      updateProduct,
      deleteProduct,
      addCategory,
      updateCategory,
      deleteCategory,
      addBranch,
      updateBranch,
      deleteBranch,
      addScreen,
      updateScreen,
      deleteScreen,
      addPromotion,
      deletePromotion,
      importPdfMenu,
      resetAllData
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
