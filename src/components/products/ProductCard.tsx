import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import type { Product } from '../../types';
import { Button } from '../common/Button';

/** Props for the ProductCard component */
interface ProductCardProps {
  /** Product data to display */
  product: Product;
}

/**
 * Formats a price value (in cents) to a Yen currency string.
 * @param price - Price amount in cents
 * @returns Formatted price string with Yen symbol
 */
function formatPrice(price: number): string {
  return `$${(price / 100).toFixed(2)}`;
}

/**
 * Displays a star rating visualization.
 * @param rating - Rating value from 0 to 5
 */
function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < fullStars
              ? 'text-yellow-400'
              : i === fullStars && hasHalfStar
                ? 'text-yellow-400'
                : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-gray-500 ml-1">({rating})</span>
    </div>
  );
}

/**
 * ProductCard displays a product in a card format with image, title, price, rating, and add-to-cart button.
 * @param product - The product data to display
 * @returns A styled product card component
 */
export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={primaryImage?.url || '/images/placeholder.jpg'}
            alt={primaryImage?.alt || product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
          {product.stock === 0 && (
            <span className="absolute top-2 right-2 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">
              Out of Stock
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2">
          <StarRating rating={product.rating || 0} />
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          variant="primary"
          className="mt-4 w-full"
          size="sm"
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
}
