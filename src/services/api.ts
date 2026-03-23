// API service layer
// For production deployment, uses local mock data instead of JSON Server

import type { Product, Category, Cart, Order } from '../types';
import {
  getProducts,
  getProductById,
  getProductsByCategory,
  getFeaturedProducts,
  searchProducts,
  getCategories,
  getCategoryById,
} from '../data/mockData';

// Simulate API delay for realistic UX
const simulateDelay = (ms: number = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Products API
export const productsApi = {
  async getAll(params?: {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  }): Promise<Product[]> {
    await simulateDelay();
    
    let results = getProducts();

    // Filter by category
    if (params?.category) {
      results = results.filter((p) => p.category === params.category);
    }

    // Filter by search
    if (params?.search) {
      const query = params.search.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by price range
    if (params?.minPrice !== undefined) {
      results = results.filter((p) => p.price >= params.minPrice!);
    }
    if (params?.maxPrice !== undefined) {
      results = results.filter((p) => p.price <= params.maxPrice!);
    }

    // Sort
    if (params?.sort) {
      switch (params.sort) {
        case 'price-asc':
          results.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          results.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          results.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          results.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'rating':
          results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        default:
          break;
      }
    }

    return results;
  },

  async getById(id: string): Promise<Product | null> {
    await simulateDelay();
    return getProductById(id) || null;
  },

  async getFeatured(): Promise<Product[]> {
    await simulateDelay();
    return getFeaturedProducts();
  },

  async search(query: string): Promise<Product[]> {
    await simulateDelay();
    return searchProducts(query);
  },
};

// Categories API
export const categoriesApi = {
  async getAll(): Promise<Category[]> {
    await simulateDelay();
    return getCategories();
  },

  async getById(id: string): Promise<Category | null> {
    await simulateDelay();
    return getCategoryById(id) || null;
  },

  async getWithProducts(id: string): Promise<{
    category: Category;
    products: Product[];
  } | null> {
    await simulateDelay();
    const category = getCategoryById(id);
    if (!category) return null;

    const products = getProductsByCategory(id);
    return { category, products };
  },
};

// Cart API (localStorage-based)
export const cartApi = {
  async get(): Promise<Cart | null> {
    await simulateDelay(100);
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : null;
  },

  async save(cart: Cart): Promise<Cart> {
    await simulateDelay(100);
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  },

  async clear(): Promise<void> {
    await simulateDelay(100);
    localStorage.removeItem('cart');
  },
};

// Orders API (localStorage-based for demo)
export const ordersApi = {
  async create(order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    await simulateDelay(500);
    
    const newOrder: Order = {
      ...order,
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    const orders = await this.getAll();
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));

    return newOrder;
  },

  async getById(id: string): Promise<Order | null> {
    await simulateDelay();
    const orders = await this.getAll();
    return orders.find((o) => o.id === id) || null;
  },

  async getAll(): Promise<Order[]> {
    await simulateDelay();
    const ordersData = localStorage.getItem('orders');
    return ordersData ? JSON.parse(ordersData) : [];
  },
};

export default {
  products: productsApi,
  categories: categoriesApi,
  cart: cartApi,
  orders: ordersApi,
};
