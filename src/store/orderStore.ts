import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Order, CreateOrderInput, OrderStatus } from '../types/order.types';
import type { CartItem } from '../types';
import { useCartStore } from './cartStore';

/**
 * Generates a unique order number.
 * Format: ORD-{timestamp}-{random}
 * @returns Formatted order number string
 */
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

/**
 * Generates a random unique identifier.
 * @returns Random string ID
 */
function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

/**
 * Order state interface for Zustand store.
 * Manages order history and current order state.
 */
export interface OrderState {
  /** Array of all placed orders */
  orders: Order[];
  /** Most recent/current order */
  currentOrder: Order | null;
  /** Loading state for async operations */
  isLoading: boolean;
  /** Error message if operation failed */
  error: string | null;

  /** Place a new order */
  placeOrder: (input: CreateOrderInput, promoCode?: string) => Promise<Order>;
  /** Get order by ID */
  getOrderById: (orderId: string) => Order | undefined;
  /** Get all orders for a customer email */
  getOrdersByCustomer: (email: string) => Order[];
  /** Clear current order from state */
  clearCurrentOrder: () => void;
}

/**
 * Order store for managing order state.
 * Features:
 * - Place new orders
 * - Order history tracking
 * - LocalStorage persistence
 * - Promo code support
 * - Automatic cart clearing on order placement
 * @returns Zustand store instance
 */
export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      currentOrder: null,
      isLoading: false,
      error: null,

      placeOrder: async (input, promoCode?) => {
        set({ isLoading: true, error: null });

        try {
          const cart = useCartStore.getState().cart;
          if (!cart || cart.items.length === 0) {
            throw new Error('Cart is empty');
          }

          const discount = promoCode ? calculateDiscount(cart.subtotal, promoCode) : 0;
          const totalWithDiscount = cart.total - discount;

          const orderItems: Order['items'] = cart.items.map((item: CartItem) => ({
            id: generateId(),
            productId: item.productId,
            name: item.product.name,
            sku: item.product.sku,
            quantity: item.quantity,
            price: item.price,
            variant: item.variant,
            subtotal: item.subtotal,
          }));

          const newOrder: Order = {
            id: generateId(),
            orderNumber: generateOrderNumber(),
            items: orderItems,
            customer: input.customer,
            shipping: input.shipping,
            billing: input.billing || input.shipping,
            payment: input.payment,
            subtotal: cart.subtotal,
            shippingCost: cart.shipping,
            tax: cart.tax,
            discount,
            total: Math.round(totalWithDiscount),
            status: 'confirmed' as OrderStatus,
            notes: input.notes,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          set((state) => ({
            orders: [...state.orders, newOrder],
            currentOrder: newOrder,
            isLoading: false,
          }));

          useCartStore.getState().clearCart();

          return newOrder;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to place order';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },

      getOrderById: (orderId) => {
        return get().orders.find((order) => order.id === orderId);
      },

      getOrdersByCustomer: (email) => {
        return get().orders.filter(
          (order) => order.customer.email.toLowerCase() === email.toLowerCase()
        );
      },

      clearCurrentOrder: () => {
        set({ currentOrder: null });
      },
    }),
    {
      name: 'ecommerce-orders',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * Calculates discount amount based on promo code.
 * Supported promo codes:
 * - WELCOME10: 10% off
 * - SAVE20: 20% off
 * - SUMMER25: 25% off
 * @param subtotal - Order subtotal in cents
 * @param promoCode - Promo code string
 * @returns Discount amount in cents
 */
function calculateDiscount(subtotal: number, promoCode: string): number {
  const validCodes: Record<string, number> = {
    WELCOME10: 0.1,
    SAVE20: 0.2,
    SUMMER25: 0.25,
  };

  const code = promoCode.toUpperCase().trim();
  if (validCodes[code]) {
    return Math.round(subtotal * validCodes[code]);
  }
  return 0;
}
