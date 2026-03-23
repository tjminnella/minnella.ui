import type { Product, SelectedVariant } from './product.types';

/**
 * Represents an item in the shopping cart.
 */
export interface CartItem {
  /** Unique cart item identifier */
  id: string;
  /** Reference to the product ID */
  productId: string;
  /** Full product object (denormalized for performance) */
  product: Product;
  /** Quantity of this item */
  quantity: number;
  /** Selected variant options (if applicable) */
  variant?: SelectedVariant;
  /** Unit price in cents */
  price: number;
  /** Line total (price × quantity) in cents */
  subtotal: number;
}

/**
 * Represents the shopping cart state.
 */
export interface Cart {
  /** Unique cart identifier */
  id: string;
  /** All items in the cart */
  items: CartItem[];
  /** Sum of all item subtotals in cents */
  subtotal: number;
  /** Shipping cost in cents */
  shipping: number;
  /** Tax amount in cents */
  tax: number;
  /** Grand total (subtotal + shipping + tax) in cents */
  total: number;
  /** ISO 8601 creation timestamp */
  createdAt: string;
  /** ISO 8601 last update timestamp */
  updatedAt: string;
}
