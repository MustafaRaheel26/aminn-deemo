/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Restaurant {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  cuisineType: string;
}

export interface Branch {
  id: string;
  restaurantId: string;
  name: string;
  address: string;
  phone: string;
  activeScreenCount?: number;
}

export interface Screen {
  id: string;
  restaurantId: string;
  branchId: string;
  name: string; // e.g., "Main Counter TV", "Drive Thru Screen", "Drinks Screen", "Promo Screen"
  status: 'online' | 'offline' | 'updating';
  url: string;
  lastUpdated: string;
  orientation: 'landscape' | 'portrait';
  templateId: 'grid-two-col' | 'featured-large' | 'drinks-list';
}

export interface Promotion {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  imageUrl: string;
  discountText: string; // e.g., "20% OFF", "Buy 1 Get 1 Free"
  startDate: string;
  endDate: string;
  branchIds: string[];
  screenIds: string[];
  status: 'active' | 'scheduled' | 'expired';
}

export interface Category {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  iconName: string; // e.g., "Flame", "Layers", "Beef", "Coffee", "Cookie", "Check"
  isActive: boolean;
}

export interface Product {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  status: 'available' | 'sold_out' | 'paused';
  calories?: string;
  isFeatured?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'restaurant_admin';
  restaurantId?: string; // Present only if role is restaurant_admin
  avatarUrl?: string;
}
