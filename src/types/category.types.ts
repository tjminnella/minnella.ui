/**
 * Represents a product category with hierarchical support.
 */
export interface Category {
  /** Unique category identifier */
  id: string;
  /** Category display name */
  name: string;
  /** URL-friendly slug for routing */
  slug: string;
  /** Optional category description */
  description?: string;
  /** Optional category image URL */
  image?: string;
  /** Parent category ID for hierarchical structure */
  parentId?: string | null;
  /** Whether category is active and visible */
  isActive?: boolean;
  /** Display order for sorting */
  sortOrder?: number;
  /** Child categories (populated in tree views) */
  children?: Category[];
}
