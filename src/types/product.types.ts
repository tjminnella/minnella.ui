/**
 * Represents a product in the e-commerce store.
 */
export interface Product {
  /** Unique product identifier */
  id: string;
  /** Full product name */
  name: string;
  /** Detailed product description */
  description: string;
  /** Brief description for listings */
  shortDescription: string;
  /** Price in cents (e.g., 1299 = $12.99) */
  price: number;
  /** Original price for sale comparison, in cents */
  compareAtPrice?: number | null;
  /** Primary category ID */
  category: string;
  /** All associated category IDs */
  categories: string[];
  /** Product images */
  images: ProductImage[];
  /** Available stock quantity */
  stock: number;
  /** Stock keeping unit identifier */
  sku: string;
  /** Available product variants (size, color, etc.) */
  variants?: ProductVariant[];
  /** Product specifications as key-value pairs */
  specifications: Record<string, string>;
  /** Search and filter tags */
  tags: string[];
  /** Whether the product is active and visible */
  isActive: boolean;
  /** ISO 8601 creation timestamp */
  createdAt: string;
  /** ISO 8601 last update timestamp */
  updatedAt: string;
  /** Average customer rating (0-5) */
  rating: number;
}

/**
 * Represents a product image.
 */
export interface ProductImage {
  /** Unique image identifier */
  id: string;
  /** Image URL */
  url: string;
  /** Alt text for accessibility */
  alt: string;
  /** Whether this is the primary/product thumbnail image */
  isPrimary: boolean;
}

/**
 * Represents a product variant type (e.g., size, color).
 */
export interface ProductVariant {
  /** Unique variant identifier */
  id: string;
  /** Type of variant */
  type: 'size' | 'color' | 'material';
  /** Available options for this variant */
  options: string[];
}

/**
 * Represents a customer's selected variant combination.
 */
export interface SelectedVariant {
  /** Selected size option */
  size?: string;
  /** Selected color option */
  color?: string;
  /** Selected material option */
  material?: string;
}
