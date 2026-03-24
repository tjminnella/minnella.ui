// Mock data for the e-commerce prototype
// This replaces JSON Server for static deployment

import type { Product, Category } from '../types';

export const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Electronic devices and gadgets',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'clothing',
    name: 'Clothing',
    slug: 'clothing',
    description: 'Fashion and apparel',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400',
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 'books',
    name: 'Books',
    slug: 'books',
    description: 'Books and literature',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
    isActive: true,
    sortOrder: 3,
  },
  {
    id: 'home',
    name: 'Home & Garden',
    slug: 'home',
    description: 'Home decor and garden supplies',
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400',
    isActive: true,
    sortOrder: 4,
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Cat Picture',
    description:
      'Beautiful cat artwork, perfect for home or office decor',
    shortDescription: 'Beautiful cat artwork',
    price: 29999,
    compareAtPrice: 34999,
    category: 'electronics',
    categories: ['electronics'],
    images: [
      {
        id: 'img-1-1',
        url: 'https://s3.us-east-1.amazonaws.com/tjminnella.com/CatPicture.jpeg?w=800',
        alt: 'Wireless Headphones - Front View',
        isPrimary: true,
      },
      {
        id: 'img-1-2',
        url: 'https://s3.us-east-1.amazonaws.com/tjminnella.com/CatPicture.jpeg?w=800',
        alt: 'Wireless Headphones - Side View',
        isPrimary: false,
      },
    ],
    stock: 50,
    sku: 'WH-001',
    specifications: {
      'Battery Life': '30 hours',
      Connectivity: 'Bluetooth 5.0',
      Weight: '250g',
      Warranty: '2 years',
    },
    tags: ['audio', 'wireless', 'premium'],
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-02-25T00:00:00Z',
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Elephant Bookend',
    description:
      'Beautiful elephant bookend, perfect for home or office decor',
    shortDescription: 'Beautiful elephant bookend',
    price: 39999,
    category: 'electronics',
    categories: ['electronics'],
    images: [
      {
        id: 'img-2-1',
        url: 'https://s3.us-east-1.amazonaws.com/tjminnella.com/ElephantBookend.jpeg?w=800',
        alt: 'Smart Watch Pro',
        isPrimary: true,
      },
    ],
    stock: 35,
    sku: 'SW-002',
    specifications: {
      Display: '1.4" AMOLED',
      Battery: '7 days',
      'Water Resistance': '5 ATM',
      Sensors: 'Heart rate, GPS, Accelerometer',
    },
    tags: ['wearable', 'fitness', 'smart'],
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-02-25T00:00:00Z',
    rating: 4.7,
  },
  {
    id: '3',
    name: 'Jad Elephant',
    description:
      'Durable water-resistant backpack with padded laptop compartment up to 15.6 inches',
    shortDescription: 'Durable water-resistant laptop backpack',
    price: 7999,
    category: 'electronics',
    categories: ['electronics'],
    images: [
      {
        id: 'img-3-1',
        url: 'https://s3.us-east-1.amazonaws.com/tjminnella.com/ElephantJade.jpeg?w=800',
        alt: 'Laptop Backpack',
        isPrimary: true,
      },
    ],
    stock: 100,
    sku: 'LB-003',
    specifications: {
      Capacity: '30L',
      'Laptop Size': 'Up to 15.6"',
      Material: 'Water-resistant nylon',
      Dimensions: '45 x 30 x 15 cm',
    },
    tags: ['accessories', 'travel'],
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-02-25T00:00:00Z',
    rating: 4.3,
  },
  {
    id: '4',
    name: 'Fairy Statue',
    description:
      'Elegant fairy statue, perfect for home or garden decoration',
    shortDescription: 'Elegant fairy statue',
    price: 12999,
    category: 'home',
    categories: ['home'],
    images: [
      {
        id: 'img-4-1',
        url: 'https://s3.us-east-1.amazonaws.com/tjminnella.com/FarieStatue.jpeg?w=800',
        alt: 'Fairy Statue',
        isPrimary: true,
      },
    ],
    stock: 45,
    sku: 'KB-004',
    specifications: {
      'Switch Type': 'Blue Mechanical',
      Backlight: 'RGB',
      Connection: 'USB-C',
      Keys: '104 keys',
    },
    tags: ['gaming', 'peripherals'],
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-02-25T00:00:00Z',
    rating: 4.6,
  },
  {
    id: '5',
    name: 'Flower Picture',
    description: 'Beautiful flower artwork, perfect for home or office decor',
    shortDescription: 'Beautiful flower artwork',
    price: 2499,
    category: 'clothing',
    categories: ['clothing'],
    images: [
      {
        id: 'img-5-1',
        url: 'https://s3.us-east-1.amazonaws.com/tjminnella.com/flowerPicture.jpeg?w=800',
        alt: 'Cotton T-Shirt',
        isPrimary: true,
      },
    ],
    stock: 200,
    sku: 'TS-005',
    variants: [
      {
        id: 'var-5-size',
        type: 'size',
        options: ['S', 'M', 'L', 'XL'],
      },
      {
        id: 'var-5-color',
        type: 'color',
        options: ['Black', 'White', 'Gray', 'Navy'],
      },
    ],
    specifications: {
      Material: '100% Organic Cotton',
      Fit: 'Regular',
      Care: 'Machine washable',
    },
    tags: ['casual', 'basics'],
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-02-25T00:00:00Z',
    rating: 4.4,
  },
  {
    id: '6',
    name: 'Landscape Picture',
    description: 'Beautiful landscape artwork, perfect for home or office decor',
    shortDescription: 'Beautiful landscape artwork',
    price: 5999,
    category: 'clothing',
    categories: ['clothing'],
    images: [
      {
        id: 'img-6-1',
        url: 'https://s3.us-east-1.amazonaws.com/tjminnella.com/LandscapePicture.jpeg?w=800',
        alt: 'Landscape Picture',
        isPrimary: true,
      },
    ],
    stock: 150,
    sku: 'DJ-006',
    variants: [
      {
        id: 'var-6-size',
        type: 'size',
        options: ['28', '30', '32', '34', '36'],
      },
      {
        id: 'var-6-color',
        type: 'color',
        options: ['Blue', 'Black', 'Gray'],
      },
    ],
    specifications: {
      Material: '98% Cotton, 2% Elastane',
      Fit: 'Classic',
      Rise: 'Mid-rise',
    },
    tags: ['denim', 'casual'],
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-02-25T00:00:00Z',
    rating: 4.5,
  },
  {
    id: '7',
    name: 'Small Picture',
    description:
      'Lightweight running shoes with cushioned sole for maximum comfort during workouts',
    shortDescription: 'Lightweight cushioned running shoes',
    price: 8999,
    category: 'clothing',
    categories: ['clothing'],
    images: [
      {
        id: 'img-7-1',
        url: 'https://s3.us-east-1.amazonaws.com/tjminnella.com/SmallPicture.jpeg?w=800',
        alt: 'Running Shoes',
        isPrimary: true,
      },
    ],
    stock: 80,
    sku: 'RS-007',
    variants: [
      {
        id: 'var-7-size',
        type: 'size',
        options: ['7', '8', '9', '10', '11', '12'],
      },
      {
        id: 'var-7-color',
        type: 'color',
        options: ['Black', 'White', 'Red', 'Blue'],
      },
    ],
    specifications: {
      'Upper Material': 'Breathable mesh',
      Sole: 'EVA cushioning',
      Weight: '280g per shoe',
    },
    tags: ['sports', 'footwear'],
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-02-25T00:00:00Z',
    rating: 4.7,
  },
  {
    id: '8',
    name: 'Vanity Desk',
    description: 'Warm insulated jacket for cold weather with water-resistant outer shell',
    shortDescription: 'Warm insulated winter jacket',
    price: 14999,
    category: 'clothing',
    categories: ['clothing'],
    images: [
      {
        id: 'img-8-1',
        url: 'https://s3.us-east-1.amazonaws.com/tjminnella.com/VanityDesk.jpeg?w=800',
        alt: 'Vanity Desk',
        isPrimary: true,
      },
    ],
    stock: 60,
    sku: 'WJ-008',
    variants: [
      {
        id: 'var-8-size',
        type: 'size',
        options: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        id: 'var-8-color',
        type: 'color',
        options: ['Black', 'Navy', 'Gray'],
      },
    ],
    specifications: {
      Insulation: 'Synthetic down',
      Shell: 'Water-resistant polyester',
      Features: 'Hood, multiple pockets',
    },
    tags: ['winter', 'outerwear'],
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-02-25T00:00:00Z',
    rating: 4.6,
  },
  {
    id: '9',
    name: 'The Great Gatsby',
    description: 'Classic American novel by F. Scott Fitzgerald, a timeless tale of the Jazz Age',
    shortDescription: 'Classic American novel by F. Scott Fitzgerald',
    price: 1499,
    category: 'books',
    categories: ['books'],
    images: [
      {
        id: 'img-9-1',
        url: 'https://s3.us-east-1.amazonaws.com/tjminnella.com/CatPicture.jpeg?w=800',
        alt: 'The Great Gatsby Book Cover',
        isPrimary: true,
      },
    ],
    stock: 500,
    sku: 'BK-009',
    specifications: {
      Author: 'F. Scott Fitzgerald',
      Pages: '180',
      Publisher: 'Scribner',
      Language: 'English',
    },
    tags: ['fiction', 'classic'],
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-02-25T00:00:00Z',
    rating: 4.8,
  },
  {
    id: '10',
    name: 'Thinking, Fast and Slow',
    description: 'Classic American novel by F. Scott Fitzgerald, a timeless tale of the Jazz Age',
    shortDescription: 'Behavioral economics by Daniel Kahneman',
    price: 1899,
    category: 'books',
    categories: ['books'],
    images: [
      {
        id: 'img-10-1',
        url: 'https://s3.us-east-1.amazonaws.com/tjminnella.com/CatPicture.jpeg?w=800',
        alt: 'Thinking Fast and Slow Book Cover',
        isPrimary: true,
      },
    ],
    stock: 300,
    sku: 'BK-010',
    specifications: {
      Author: 'Daniel Kahneman',
      Pages: '499',
      Publisher: 'Farrar, Straus and Giroux',
      Language: 'English',
    },
    tags: ['non-fiction', 'psychology'],
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-02-25T00:00:00Z',
    rating: 4.7,
  },
  {
    id: '11',
    name: 'Ceramic Plant Pot',
    description:
      'Handmade ceramic pot perfect for indoor plants, available in multiple sizes and colors',
    shortDescription: 'Handmade ceramic plant pot',
    price: 3499,
    category: 'home',
    categories: ['home'],
    images: [
      {
        id: 'img-11-1',
        url: 'https://s3.us-east-1.amazonaws.com/tjminnella.com/CatPicture.jpeg?w=800',
        alt: 'Ceramic Plant Pot',
        isPrimary: true,
      },
    ],
    stock: 120,
    sku: 'PP-011',
    variants: [
      {
        id: 'var-11-size',
        type: 'size',
        options: ['Small', 'Medium', 'Large'],
      },
      {
        id: 'var-11-color',
        type: 'color',
        options: ['White', 'Terracotta', 'Gray', 'Blue'],
      },
    ],
    specifications: {
      Material: 'Ceramic',
      Drainage: 'Yes',
      Finish: 'Glazed',
    },
    tags: ['decor', 'plants'],
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-02-25T00:00:00Z',
    rating: 4.5,
  },
  {
    id: '12',
    name: 'LED Desk Lamp',
    description:
      'Adjustable LED desk lamp with touch control, USB charging port, and multiple brightness levels',
    shortDescription: 'Adjustable LED lamp with touch control',
    price: 4999,
    category: 'home',
    categories: ['home'],
    images: [
      {
        id: 'img-12-1',
        url: 'https://s3.us-east-1.amazonaws.com/tjminnella.com/CatPicture.jpeg?w=800',
        alt: 'LED Desk Lamp',
        isPrimary: true,
      },
    ],
    stock: 90,
    sku: 'DL-012',
    specifications: {
      Power: '12W LED',
      'Brightness Levels': '5',
      'Color Temperature': '3000K-6000K',
      Features: 'USB charging port, Touch control',
    },
    tags: ['lighting', 'office'],
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-02-25T00:00:00Z',
    rating: 4.4,
  },
];

// Helper functions
export const getProducts = (): Product[] => products;

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter((p) => p.category === categoryId);
};

export const getFeaturedProducts = (): Product[] => {
  // Return products with high ratings as "featured"
  return products.filter((p) => p.rating >= 4.6);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
};

export const getCategories = (): Category[] => categories;

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find((c) => c.id === id);
};
