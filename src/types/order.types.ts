import type { SelectedVariant } from './product.types';

/**
 * Represents an item in a customer order.
 */
export interface OrderItem {
  /** Unique order item identifier */
  id: string;
  /** Reference to the product ID */
  productId: string;
  /** Product name at time of order (denormalized) */
  name: string;
  /** Product SKU at time of order */
  sku: string;
  /** Quantity ordered */
  quantity: number;
  /** Unit price in cents */
  price: number;
  /** Selected variant options */
  variant?: SelectedVariant;
  /** Line total in cents */
  subtotal: number;
}

/**
 * Customer contact information.
 */
export interface CustomerInfo {
  /** Customer email address */
  email: string;
  /** Customer phone number (optional) */
  phone?: string;
}

/**
 * Shipping or billing address information.
 */
export interface ShippingInfo {
  /** Customer's first name */
  firstName: string;
  /** Customer's last name */
  lastName: string;
  /** Street address line 1 */
  address1: string;
  /** Street address line 2 (apartment, suite, etc.) */
  address2?: string;
  /** City name */
  city: string;
  /** State or province */
  state: string;
  /** Postal or ZIP code */
  postalCode: string;
  /** Country code (ISO 3166-1 alpha-2) */
  country: string;
  /** Contact phone number (optional) */
  phone?: string;
}

/**
 * Payment method information.
 */
export interface PaymentInfo {
  /** Payment method type */
  method: 'card' | 'paypal' | 'bank_transfer' | 'cod';
  /** Last 4 digits of card (for card payments) */
  last4?: string;
  /** Card brand (visa, mastercard, etc.) */
  brand?: string;
}

/**
 * Order status in the fulfillment workflow.
 * - pending: Order placed, awaiting confirmation
 * - confirmed: Order confirmed, preparing for shipment
 * - processing: Order being prepared/packaged
 * - shipped: Order shipped, in transit
 * - delivered: Order delivered to customer
 * - cancelled: Order cancelled before delivery
 * - refunded: Order refunded after delivery
 */
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

/**
 * Represents a complete customer order.
 */
export interface Order {
  /** Unique order identifier */
  id: string;
  /** Human-readable order number (e.g., "ORD-ABC123") */
  orderNumber: string;
  /** All items in the order */
  items: OrderItem[];
  /** Customer contact information */
  customer: CustomerInfo;
  /** Shipping address */
  shipping: ShippingInfo;
  /** Billing address (defaults to shipping if not provided) */
  billing?: ShippingInfo;
  /** Payment information */
  payment: PaymentInfo;
  /** Subtotal before tax, shipping, and discounts (cents) */
  subtotal: number;
  /** Shipping cost in cents */
  shippingCost: number;
  /** Tax amount in cents */
  tax: number;
  /** Discount amount in cents */
  discount: number;
  /** Grand total in cents */
  total: number;
  /** Current order status */
  status: OrderStatus;
  /** Customer notes or special instructions */
  notes?: string;
  /** ISO 8601 creation timestamp */
  createdAt: string;
  /** ISO 8601 last update timestamp */
  updatedAt: string;
}

/**
 * Input data for creating a new order.
 */
export interface CreateOrderInput {
  /** Order items with product IDs and quantities */
  items: {
    productId: string;
    quantity: number;
    variant?: SelectedVariant;
  }[];
  /** Customer contact information */
  customer: CustomerInfo;
  /** Shipping address */
  shipping: ShippingInfo;
  /** Billing address (optional, defaults to shipping) */
  billing?: ShippingInfo;
  /** Payment information */
  payment: PaymentInfo;
  /** Selected shipping method */
  shippingMethod: 'standard' | 'express' | 'overnight';
  /** Optional order notes */
  notes?: string;
}
