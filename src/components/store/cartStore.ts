import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Cart, CartItem } from '../../types';
import type { Product, SelectedVariant } from '../../types/product.types';

/** Tax rate for order calculations (8%) */
const TAX_RATE = 0.08;
/** Free shipping threshold in cents ($50.00) */
const SHIPPING_THRESHOLD = 5000;
/** Flat shipping rate in cents ($5.00) */
const FLAT_SHIPPING = 500;

/**
 * Generates a random unique identifier.
 * @returns Random string ID
 */
function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

/**
 * Calculates cart totals including subtotal, tax, shipping, and grand total.
 * Business rules:
 * - Tax is 8% of subtotal
 * - Free shipping for orders >= $50.00 or empty cart
 * - Flat shipping rate of $5.00 otherwise
 * @param items - Array of cart items
 * @returns Object containing items and all calculated totals
 */
function calculateTotals(items: CartItem[]): Omit<Cart, 'id' | 'createdAt' | 'updatedAt'> {
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const shipping = subtotal >= SHIPPING_THRESHOLD || subtotal === 0 ? 0 : FLAT_SHIPPING;
  const total = subtotal + tax + shipping;

  return { items, subtotal, tax, shipping, total };
}

/**
 * Cart state interface for Zustand store.
 * Manages shopping cart state and operations.
 */
export interface CartState {
  /** Current cart object or null if empty */
  cart: Cart | null;
  /** Loading state for async operations */
  isLoading: boolean;

  /** Add a product to the cart */
  addItem: (product: Product, quantity: number, variant?: SelectedVariant) => void;
  /** Remove an item from the cart */
  removeItem: (itemId: string) => void;
  /** Update quantity of a cart item */
  updateQuantity: (itemId: string, quantity: number) => void;
  /** Clear all items from the cart */
  clearCart: () => void;
  /** Get total number of items in cart */
  getTotalItems: () => number;
}

/** LocalStorage key for cart persistence */
const STORAGE_KEY = 'ecommerce-cart';

/**
 * Cart store for managing shopping cart state.
 * Features:
 * - Add/remove/update cart items
 * - Automatic total calculations
 * - LocalStorage persistence
 * - Variant support (size, color, etc.)
 * @returns Zustand store instance
 */
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      isLoading: false,

      addItem: (product, quantity, variant) => {
        set({ isLoading: true });

        const currentCart = get().cart;

        let newItems: CartItem[];

        if (currentCart) {
          const existingItemIndex = currentCart.items.findIndex(
            (item) =>
              item.productId === product.id &&
              JSON.stringify(item.variant) === JSON.stringify(variant)
          );

          if (existingItemIndex >= 0) {
            newItems = currentCart.items.map((item, index) => {
              if (index === existingItemIndex) {
                const newQuantity = Math.min(item.quantity + quantity, product.stock);
                return {
                  ...item,
                  quantity: newQuantity,
                  subtotal: Math.round(newQuantity * item.price),
                };
              }
              return item;
            });
          } else {
            const newItem: CartItem = {
              id: generateId(),
              productId: product.id,
              product,
              quantity,
              variant,
              price: product.price,
              subtotal: Math.round(quantity * product.price),
            };
            newItems = [...currentCart.items, newItem];
          }
        } else {
          const newItem: CartItem = {
            id: generateId(),
            productId: product.id,
            product,
            quantity,
            variant,
            price: product.price,
            subtotal: Math.round(quantity * product.price),
          };
          newItems = [newItem];
        }

        const totals = calculateTotals(newItems);
        const now = new Date().toISOString();

        const newCart: Cart = {
          id: currentCart?.id || generateId(),
          ...totals,
          createdAt: currentCart?.createdAt || now,
          updatedAt: now,
        };

        set({ cart: newCart, isLoading: false });
      },

      removeItem: (itemId) => {
        const currentCart = get().cart;
        if (!currentCart) return;

        const newItems = currentCart.items.filter((item) => item.id !== itemId);
        const totals = calculateTotals(newItems);

        const newCart: Cart | null =
          newItems.length > 0
            ? {
                ...totals,
                id: currentCart.id,
                createdAt: currentCart.createdAt,
                updatedAt: new Date().toISOString(),
              }
            : null;

        set({ cart: newCart, isLoading: false });
      },

      updateQuantity: (itemId, quantity) => {
        const currentCart = get().cart;
        if (!currentCart) return;

        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        const newItems = currentCart.items.map((item) => {
          if (item.id === itemId) {
            const newQuantity = Math.min(quantity, item.product.stock);
            return {
              ...item,
              quantity: newQuantity,
              subtotal: Math.round(newQuantity * item.price),
            };
          }
          return item;
        });

        const totals = calculateTotals(newItems);

        const newCart: Cart = {
          ...totals,
          id: currentCart.id,
          createdAt: currentCart.createdAt,
          updatedAt: new Date().toISOString(),
        };

        set({ cart: newCart, isLoading: false });
      },

      clearCart: () => {
        set({ cart: null, isLoading: false });
      },

      getTotalItems: () => {
        const cart = get().cart;
        if (!cart) return 0;
        return cart.items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
