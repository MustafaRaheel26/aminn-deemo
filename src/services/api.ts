/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Restaurant, Category, Product, Branch, Screen, Promotion, User } from '../types';
import { mockRestaurants, mockCategories, mockProducts, mockBranches, mockScreens, mockPromotions, mockUsers } from '../data/mockData';

/**
 * Service API layer providing simulated HTTP requests to demonstrate
 * full-stack integration readiness. In a production environment,
 * these functions would execute real fetch() requests or GraphQL mutations.
 */
export const apiService = {
  // Authentication
  async login(email: string, password?: string): Promise<{ user: User; token: string }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const cleanedEmail = email.trim().toLowerCase();
        
        let userList = mockUsers;
        try {
          const stored = localStorage.getItem('amin_dynamic_users');
          if (stored) {
            userList = JSON.parse(stored);
          }
        } catch (e) {
          console.error("Failed to parse dynamic users", e);
        }

        const found = userList.find(u => u.email.toLowerCase() === cleanedEmail);
        if (found) {
          resolve({ user: found, token: `simulated_jwt_token_for_${found.id}` });
        } else {
          reject(new Error('Unauthorized. This credential combination is invalid for Amin cloud domain. Please verify your email and lock phrase.'));
        }
      }, 400);
    });
  },

  // Restaurants
  async getRestaurants(): Promise<Restaurant[]> {
    return new Promise(resolve => setTimeout(() => resolve([...mockRestaurants]), 100));
  },

  // Categories
  async getCategories(restaurantId?: string): Promise<Category[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        let list = [...mockCategories];
        if (restaurantId) {
          list = list.filter(c => c.restaurantId === restaurantId);
        }
        resolve(list);
      }, 100);
    });
  },

  // Products
  async getProducts(restaurantId?: string): Promise<Product[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        let list = [...mockProducts];
        if (restaurantId) {
          list = list.filter(p => p.restaurantId === restaurantId);
        }
        resolve(list);
      }, 100);
    });
  },

  // Branches
  async getBranches(restaurantId?: string): Promise<Branch[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        let list = [...mockBranches];
        if (restaurantId) {
          list = list.filter(b => b.restaurantId === restaurantId);
        }
        resolve(list);
      }, 100);
    });
  },

  // Screens
  async getScreens(restaurantId?: string): Promise<Screen[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        let list = [...mockScreens];
        if (restaurantId) {
          list = list.filter(s => s.restaurantId === restaurantId);
        }
        resolve(list);
      }, 100);
    });
  },

  // Promotions
  async getPromotions(restaurantId?: string): Promise<Promotion[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        let list = [...mockPromotions];
        if (restaurantId) {
          list = list.filter(p => p.restaurantId === restaurantId);
        }
        resolve(list);
      }, 100);
    });
  }
};
