/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Restaurant, Category, Product, Branch, Screen, Promotion, User } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-super',
    name: 'Amin Admin',
    email: 'super@amin.io',
    role: 'super_admin',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop'
  },
  {
    id: 'user-miracle',
    name: 'Sarah Miracle',
    email: 'miracle@amin.io',
    role: 'restaurant_admin',
    restaurantId: 'rest-miracle',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop'
  },
  {
    id: 'user-chef',
    name: 'Chef Ahmet',
    email: 'chef@amin.io',
    role: 'restaurant_admin',
    restaurantId: 'rest-chef',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop'
  },
  {
    id: 'user-mac',
    name: 'Marcus Chen',
    email: 'mac@amin.io',
    role: 'restaurant_admin',
    restaurantId: 'rest-mac',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop'
  }
];

// Mock Restaurants
export const mockRestaurants: Restaurant[] = [
  {
    id: 'rest-miracle',
    name: 'Miracle',
    logoUrl: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=150&auto=format&fit=crop',
    description: 'Mediterranean gourmet grilling with clean, hand-cut, organic spices and charcoal perfection.',
    cuisineType: 'Mediterranean Grill / Cafe'
  },
  {
    id: 'rest-chef',
    name: "Chef's Döner",
    logoUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=150&auto=format&fit=crop',
    description: 'An authentic taste of classic Berlin & Istanbul style craft shaved meat, home-baked bread, and secret garlic sauce.',
    cuisineType: 'Turkish Döner & Street Food'
  },
  {
    id: 'rest-mac',
    name: 'Mac In Chicken',
    logoUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=150&auto=format&fit=crop',
    description: 'Irresistibly spicy buttermilk pressure-fried chicken, savory waffle fries, and glazed honey biscuits.',
    cuisineType: 'American QSR & Fried Chicken'
  }
];

// Real Categories
export const mockCategories: Category[] = [
  // Miracle
  { id: 'cat-m1', restaurantId: 'rest-miracle', name: 'Kebabs & Grills', description: 'Charcoal-grilled premium cuts', iconName: 'Flame', isActive: true },
  { id: 'cat-m2', restaurantId: 'rest-miracle', name: 'Meze & Salads', description: 'Fresh, cold small-plate sharing dishes', iconName: 'Layers', isActive: true },
  { id: 'cat-m3', restaurantId: 'rest-miracle', name: 'Gourmet Flatbreads', description: 'Stone-oven baked with garlic oil', iconName: 'Cookie', isActive: true },
  { id: 'cat-m4', restaurantId: 'rest-miracle', name: 'Fine Drinks & Tea', description: 'House botanicals and Turkish premium blends', iconName: 'Coffee', isActive: true },

  // Chef's Döner
  { id: 'cat-c1', restaurantId: 'rest-chef', name: 'Premium Döner Wraps', description: 'Shaved meats with fresh red cabbage, onion, and signature sauce', iconName: 'Flame', isActive: true },
  { id: 'cat-c2', restaurantId: 'rest-chef', name: 'Döner Plates & Bowls', description: 'Generous portions served over buttery rice or crispy fries', iconName: 'Layers', isActive: true },
  { id: 'cat-c3', restaurantId: 'rest-chef', name: 'Sides & Turkish Tea', description: 'Authentic treats and accompaniments', iconName: 'Coffee', isActive: true },

  // Mac In Chicken
  { id: 'cat-a1', restaurantId: 'rest-mac', name: 'Buttermilk Fried Chicken', description: 'Legendary pressure-fried crispy chicken buckets', iconName: 'Flame', isActive: true },
  { id: 'cat-a2', restaurantId: 'rest-mac', name: 'Spicy Hamburgers', description: 'Craft potato bun burgers with hot maple glaze', iconName: 'Beef', isActive: true },
  { id: 'cat-a3', restaurantId: 'rest-mac', name: 'Waffle Fries & Sides', description: 'Golden, seasoned crispy finger-foods', iconName: 'Cookie', isActive: true }
];

// Real Products with reliable, fast Unsplash URLs
export const mockProducts: Product[] = [
  // Miracle Products - Kebabs & Grills
  {
    id: 'prod-m1',
    restaurantId: 'rest-miracle',
    categoryId: 'cat-m1',
    name: 'Adana Kebab Skewer',
    description: 'Minced premium lamb mixed with hot red pepper and grilled flawlessly over smoking oak coals.',
    price: 19.50,
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop',
    status: 'available',
    calories: '650 kcal',
    isFeatured: true
  },
  {
    id: 'prod-m2',
    restaurantId: 'rest-miracle',
    categoryId: 'cat-m1',
    name: 'Gourmet Lamb Shish',
    description: 'Tender cubes of grass-fed lamb marinated in garlic, rosemary oil, and roasted on wide steel blades.',
    price: 24.00,
    imageUrl: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600&auto=format&fit=crop',
    status: 'available',
    calories: '720 kcal',
    isFeatured: true
  },
  {
    id: 'prod-m3',
    restaurantId: 'rest-miracle',
    categoryId: 'cat-m1',
    name: 'Charcoal Chicken Wings',
    description: 'Juicy wings slow-roasted over real charcoal, brushed with hot pepper paste-butter glaze.',
    price: 16.50,
    imageUrl: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&auto=format&fit=crop',
    status: 'available',
    calories: '580 kcal'
  },

  // Miracle - Meze & Salads
  {
    id: 'prod-m4',
    restaurantId: 'rest-miracle',
    categoryId: 'cat-m2',
    name: 'Classic Hummus Plate',
    description: 'Organic chickpeas whipped with premium sesame tahini, wild cumin, cold-pressed olive oil, and hot pine nuts.',
    price: 9.00,
    imageUrl: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600&auto=format&fit=crop',
    status: 'available',
    calories: '310 kcal'
  },
  {
    id: 'prod-m5',
    restaurantId: 'rest-miracle',
    categoryId: 'cat-m2',
    name: 'Mediterranean Garden Salad',
    description: 'Crisp English cucumbers, vine tomatoes, local feta, Kalamata olives, and fresh pomegranate molasses drizzle.',
    price: 11.50,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop',
    status: 'available',
    calories: '180 kcal'
  },

  // Miracle - Flatbreads
  {
    id: 'prod-m6',
    restaurantId: 'rest-miracle',
    categoryId: 'cat-m3',
    name: 'Minced Beef Lahmacun',
    description: 'Paper-thin flatbread topped with finely minced beef, sweet bell pepper, parsley, and garlic, baked in stone deck.',
    price: 14.00,
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop',
    status: 'available',
    calories: '490 kcal'
  },

  // Miracle - Drinks
  {
    id: 'prod-m7',
    restaurantId: 'rest-miracle',
    categoryId: 'cat-m4',
    name: 'Premium Brewed Turkish Tea',
    description: 'Fragrant double-pot steep of Rize black leaves. Served in traditional tulip glassware.',
    price: 4.00,
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop',
    status: 'available',
    calories: '0 kcal'
  },
  {
    id: 'prod-m8',
    restaurantId: 'rest-miracle',
    categoryId: 'cat-m4',
    name: 'Salted Foam Ayran',
    description: 'Cold-whisked probiotic yogurt, filtered mountain water, and sea salt with fresh mint sprig.',
    price: 4.50,
    imageUrl: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=600&auto=format&fit=crop',
    status: 'available',
    calories: '120 kcal'
  },

  // Chef's Döner - Signature Wraps
  {
    id: 'prod-c1',
    restaurantId: 'rest-chef',
    categoryId: 'cat-c1',
    name: "Classic Chef's Beef Wrap",
    description: 'Thinly sliced master beef döner, shredded lettuce, ripe-red tomatoes, pickled cucumber, garlic house sauce, in a toasted Turkish lavash.',
    price: 12.90,
    imageUrl: 'https://images.unsplash.com/photo-1561651823-34fed022540d?w=600&auto=format&fit=crop',
    status: 'available',
    calories: '590 kcal',
    isFeatured: true
  },
  {
    id: 'prod-c2',
    restaurantId: 'rest-chef',
    categoryId: 'cat-c1',
    name: 'Cheesy Melt Döner Wrap',
    description: 'Spit-fired tender döner meat layered with melted premium cheddar cheese sauce, crisp purple cabbage, and hot chili oil.',
    price: 14.50,
    imageUrl: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=600&auto=format&fit=crop',
    status: 'available',
    calories: '710 kcal',
    isFeatured: true
  },

  // Chef's Döner - Plates
  {
    id: 'prod-c3',
    restaurantId: 'rest-chef',
    categoryId: 'cat-c2',
    name: "Original Istanbul Döner Plate",
    description: 'Slices of crispy rotisserie beef piled on toasted garlic bread cubes, sweet tomato marinara, and double-strained yogurt.',
    price: 18.00,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop',
    status: 'available',
    calories: '840 kcal'
  },
  {
    id: 'prod-c4',
    restaurantId: 'rest-chef',
    categoryId: 'cat-c2',
    name: 'Döner Over French Fries',
    description: 'Heaping bowl of hand-cut standard salty fries, loaded with spicy döner shavings and smothered in spicy secret orange sauce.',
    price: 15.50,
    imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop',
    status: 'available',
    calories: '890 kcal'
  },

  // Chef's Döner - Sides & Tea
  {
    id: 'prod-c5',
    restaurantId: 'rest-chef',
    categoryId: 'cat-c3',
    name: 'Crispy Falafel Balls',
    description: 'Deep-fried golden organic fava bean and herb patties. Served with rich green tahini.',
    price: 6.90,
    imageUrl: 'https://images.unsplash.com/photo-1547058886-af77813b91d2?w=600&auto=format&fit=crop',
    status: 'available',
    calories: '280 kcal'
  },

  // Mac In Chicken - Fried Chicken
  {
    id: 'prod-a1',
    restaurantId: 'rest-mac',
    categoryId: 'cat-a1',
    name: '6pc Crispy Buttermilk Golden Drums',
    description: 'A half-dozen double-dipped premium farm-raised chicken drumsticks fried to deep amber golden, tender juice core.',
    price: 15.99,
    imageUrl: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=600&auto=format&fit=crop',
    status: 'available',
    calories: '810 kcal',
    isFeatured: true
  },
  {
    id: 'prod-a2',
    restaurantId: 'rest-mac',
    categoryId: 'cat-a1',
    name: 'Amin Spicy Chicken Wings (10pcs)',
    description: 'Brinded in organic cayenne pepper slurry, flaked in spiced wheat, fried, and glazed in volcanic orange bird-eye sauce.',
    price: 13.99,
    imageUrl: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=600&auto=format&fit=crop',
    status: 'available',
    calories: '690 kcal',
    isFeatured: true
  },

  // Mac In Chicken - Burger
  {
    id: 'prod-a3',
    restaurantId: 'rest-mac',
    categoryId: 'cat-a2',
    name: 'Volcano Hot Glazed Chicken Burger',
    description: 'Huge crispy double-fried chicken breast bathed in spiced butter, sweet garlic pickle chips, spicy slaw on pillowy potato roll.',
    price: 11.49,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop',
    status: 'available',
    calories: '640 kcal'
  },
  {
    id: 'prod-a4',
    restaurantId: 'rest-mac',
    categoryId: 'cat-a2',
    name: 'Royal Cheddar Bacon Crunch',
    description: 'Crispy breast fillet under warm premium applewood smoked bacon, layered high with melted mature Irish cheddar sheets and aioli.',
    price: 12.99,
    imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop',
    status: 'available',
    calories: '750 kcal'
  },

  // Mac In Chicken - Extras
  {
    id: 'prod-a5',
    restaurantId: 'rest-mac',
    categoryId: 'cat-a3',
    name: 'Cajun Seasoned Waffle Fries',
    description: 'Lattice-sliced premium russet potato grids, fired golden, double tossed with smoked oak paprika, garlic, onion dust.',
    price: 5.49,
    imageUrl: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&auto=format&fit=crop',
    status: 'available',
    calories: '380 kcal'
  }
];

// Branches
export const mockBranches: Branch[] = [
  // Miracle
  {
    id: 'br-mir-1',
    restaurantId: 'rest-miracle',
    name: 'Miracle Downtown',
    address: '405 Grand Avenue, Suite A, Metropolitan Core',
    phone: '+1 (555) 728-1021',
    activeScreenCount: 4
  },
  {
    id: 'br-mir-2',
    restaurantId: 'rest-miracle',
    name: 'Miracle City Center',
    address: 'Level 2 Food Galleria, City Plaza Mall',
    phone: '+1 (555) 728-4034',
    activeScreenCount: 2
  },
  {
    id: 'br-mir-3',
    restaurantId: 'rest-miracle',
    name: 'Miracle International Airport',
    address: 'Terminal 3 Gates Retail Area B, Flightway Blvd',
    phone: '+1 (555) 728-9008',
    activeScreenCount: 3
  },

  // Chef's Döner
  {
    id: 'br-chef-1',
    restaurantId: 'rest-chef',
    name: "Chef's Döner Kreuzberg Express",
    address: '102 Oranienstraße, District Berlin Core',
    phone: '+49 (30) 1988-2931',
    activeScreenCount: 3
  },
  {
    id: 'br-chef-2',
    restaurantId: 'rest-chef',
    name: "Chef's Döner Central Station Boulevard",
    address: 'Platform Shop Area 49, Main Terminal Concourse',
    phone: '+49 (30) 1988-7744',
    activeScreenCount: 2
  },

  // Mac In Chicken
  {
    id: 'br-mac-1',
    restaurantId: 'rest-mac',
    name: 'Mac In Chicken West Plaza Drive-Thru',
    address: '8900 West Highway Road, Circle Lane',
    phone: '+1 (800) 555-1200',
    activeScreenCount: 4
  },
  {
    id: 'br-mac-2',
    restaurantId: 'rest-mac',
    name: 'Mac In Chicken Downtown Food Court',
    address: '11 Financial St, Central Food Hall Floor 1',
    phone: '+1 (800) 555-1215',
    activeScreenCount: 1
  }
];

// Digital Screens
export const mockScreens: Screen[] = [
  // Miracle Downtown
  {
    id: 'scr-mir-1',
    restaurantId: 'rest-miracle',
    branchId: 'br-mir-1',
    name: 'Main Counter TV (Landscape)',
    status: 'online',
    url: '#/preview/scr-mir-1',
    lastUpdated: '10 mins ago',
    orientation: 'landscape',
    templateId: 'grid-two-col'
  },
  {
    id: 'scr-mir-2',
    restaurantId: 'rest-miracle',
    branchId: 'br-mir-1',
    name: 'Drive Thru Screen',
    status: 'online',
    url: '#/preview/scr-mir-2',
    lastUpdated: '4 mins ago',
    orientation: 'landscape',
    templateId: 'featured-large'
  },
  {
    id: 'scr-mir-3',
    restaurantId: 'rest-miracle',
    branchId: 'br-mir-1',
    name: 'Drinks Menu Board',
    status: 'online',
    url: '#/preview/scr-mir-3',
    lastUpdated: 'Just now',
    orientation: 'landscape',
    templateId: 'drinks-list'
  },
  {
    id: 'scr-mir-4',
    restaurantId: 'rest-miracle',
    branchId: 'br-mir-1',
    name: 'Seasonal Promo Screen',
    status: 'updating',
    url: '#/preview/scr-mir-4',
    lastUpdated: 'Connecting...',
    orientation: 'landscape',
    templateId: 'featured-large'
  },

  // Chef's Döner
  {
    id: 'scr-chef-1',
    restaurantId: 'rest-chef',
    branchId: 'br-chef-1',
    name: 'Main Cashier Board',
    status: 'online',
    url: '#/preview/scr-chef-1',
    lastUpdated: '30 mins ago',
    orientation: 'landscape',
    templateId: 'grid-two-col'
  },
  {
    id: 'scr-chef-2',
    restaurantId: 'rest-chef',
    branchId: 'br-chef-1',
    name: 'Salad & Drinks Counter',
    status: 'online',
    url: '#/preview/scr-chef-2',
    lastUpdated: '1 hour ago',
    orientation: 'landscape',
    templateId: 'drinks-list'
  },
  {
    id: 'scr-chef-3',
    restaurantId: 'rest-chef',
    branchId: 'br-chef-1',
    name: 'Queue & Promo Display',
    status: 'offline',
    url: '#/preview/scr-chef-3',
    lastUpdated: 'Yesterday',
    orientation: 'landscape',
    templateId: 'featured-large'
  },

  // Mac In Chicken
  {
    id: 'scr-mac-1',
    restaurantId: 'rest-mac',
    branchId: 'br-mac-1',
    name: 'Overhead Counter TV 1',
    status: 'online',
    url: '#/preview/scr-mac-1',
    lastUpdated: '2 mins ago',
    orientation: 'landscape',
    templateId: 'grid-two-col'
  },
  {
    id: 'scr-mac-2',
    restaurantId: 'rest-mac',
    branchId: 'br-mac-1',
    name: 'Overhead Counter TV 2',
    status: 'online',
    url: '#/preview/scr-mac-2',
    lastUpdated: '2 mins ago',
    orientation: 'landscape',
    templateId: 'drinks-list'
  },
  {
    id: 'scr-mac-3',
    restaurantId: 'rest-mac',
    branchId: 'br-mac-1',
    name: 'Drive Thru Pre-Order Board',
    status: 'online',
    url: '#/preview/scr-mac-3',
    lastUpdated: 'Just now',
    orientation: 'landscape',
    templateId: 'featured-large'
  }
];

// Promotions
export const mockPromotions: Promotion[] = [
  {
    id: 'promo-1',
    restaurantId: 'rest-miracle',
    name: 'Lunch Kebab Special Offer',
    description: 'Get any classic skewer with brewed Turkish tea and hand-whipped hummus premium side for a special combo price.',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop',
    discountText: 'Special Price $22.95',
    startDate: '2026-06-01',
    endDate: '2026-08-30',
    branchIds: ['br-mir-1', 'br-mir-2'],
    screenIds: ['scr-mir-1', 'scr-mir-2'],
    status: 'active'
  },
  {
    id: 'promo-2',
    restaurantId: 'rest-miracle',
    name: 'Miracle Family Combo Feast',
    description: 'Four Adana skewers, large Mediterranean garden salad, basket of hot stone flatbread, and four iced cups of salted foaming ayran.',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop',
    discountText: 'Save $18.50 On Meal',
    startDate: '2026-06-05',
    endDate: '2026-06-25',
    branchIds: ['br-mir-1', 'br-mir-3'],
    screenIds: ['scr-mir-1', 'scr-mir-4'],
    status: 'active'
  },
  {
    id: 'promo-3',
    restaurantId: 'rest-chef',
    name: 'Weekend Döner Dribble',
    description: 'Two Premium Döner Wraps, double portion of French Fries with orange house sauce, and two imported sodas.',
    imageUrl: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=600&auto=format&fit=crop',
    discountText: 'Buy 1, Second 50% OFF',
    startDate: '2026-06-06',
    endDate: '2026-07-27',
    branchIds: ['br-chef-1'],
    screenIds: ['scr-chef-1', 'scr-chef-3'],
    status: 'scheduled'
  },
  {
    id: 'promo-4',
    restaurantId: 'rest-mac',
    name: 'Buttermilk Drum Party Pack',
    description: '12 pieces of fresh double-dipped drumsticks, family cajun seasoned waffle fries, and 4 fresh biscuits with hot maple honey pots.',
    imageUrl: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=600&auto=format&fit=crop',
    discountText: 'FREE Large Waffle Fries',
    startDate: '2026-05-15',
    endDate: '2026-06-30',
    branchIds: ['br-mac-1'],
    screenIds: ['scr-mac-1', 'scr-mac-3'],
    status: 'active'
  }
];
