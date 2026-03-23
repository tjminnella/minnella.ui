import { useState } from 'react';
import type { Product, SelectedVariant } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { Button } from '../common/Button';
import { useToast } from '../common/Toast/Toast';

interface ProductDetailProps {
  product: Product;
}

function formatPrice(price: number): string {
  return `$${(price / 100).toFixed(2)}`;
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < fullStars
              ? 'text-yellow-400'
              : i === fullStars && hasHalfStar
                ? 'text-yellow-400'
                : 'text-secondary-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-secondary-500 ml-2">({rating} reviews)</span>
    </div>
  );
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToast().showToast;
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<SelectedVariant>({});

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant);
    showToast({
      type: 'success',
      title: 'Added to cart',
      message: `${quantity} × ${product.name} added to your cart`,
    });
  };

  const handleVariantSelect = (variantType: string, option: string) => {
    setSelectedVariant((prev) => ({
      ...prev,
      [variantType]: option,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-secondary-100 rounded-lg overflow-hidden">
            <img
              src={product.images[selectedImage]?.url || '/images/placeholder.jpg'}
              alt={product.images[selectedImage]?.alt || product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index
                      ? 'border-primary-500 ring-2 ring-primary-500/20'
                      : 'border-transparent hover:border-secondary-300'
                  }`}
                >
                  <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-sm text-primary-600 font-medium uppercase tracking-wide">
              {product.category}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-3">{product.name}</h1>

          <div className="mb-4">
            <StarRating rating={product.rating} />
          </div>

          <div className="flex items-baseline gap-3 mb-6 flex-wrap">
            <span className="text-2xl sm:text-3xl font-bold text-secondary-900">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <>
                <span className="text-lg sm:text-xl text-secondary-500 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
                {discount > 0 && (
                  <span className="bg-red-100 text-red-600 text-sm font-bold px-2.5 py-1 rounded-full">
                    Save {discount}%
                  </span>
                )}
              </>
            )}
          </div>

          <p className="text-secondary-600 mb-6 leading-relaxed">{product.description}</p>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-4 mb-6">
              {product.variants.map((variant) => (
                <div key={variant.id}>
                  <span className="text-sm font-medium text-secondary-700 block mb-2">
                    {variant.type.charAt(0).toUpperCase() + variant.type.slice(1)}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map((option) => {
                      const isSelected =
                        selectedVariant[variant.type as keyof SelectedVariant] === option;
                      return (
                        <button
                          key={option}
                          onClick={() => handleVariantSelect(variant.type, option)}
                          className={`px-4 py-2 text-sm rounded-md border transition-all duration-200 ${
                            isSelected
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-secondary-300 hover:border-secondary-400'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mb-6">
            <span className="text-sm font-medium text-secondary-700 block mb-2">Quantity</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-md border border-secondary-300 flex items-center justify-center hover:bg-secondary-50 transition-colors"
                disabled={quantity <= 1}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-10 h-10 rounded-md border border-secondary-300 flex items-center justify-center hover:bg-secondary-50 transition-colors"
                disabled={quantity >= product.stock}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
              <span className="text-sm text-secondary-500 ml-2">
                {product.stock > 0 ? (
                  <>
                    <span className="text-green-600 font-medium">In Stock</span> ({product.stock}{' '}
                    available)
                  </>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </span>
            </div>
          </div>

          {/* Add to Cart */}
          <Button
            onClick={handleAddToCart}
            variant="primary"
            size="lg"
            className="w-full mb-4"
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>

          <p className="text-sm text-secondary-500 text-center">SKU: {product.sku}</p>
        </div>
      </div>

      {/* Specifications */}
      {Object.keys(product.specifications).length > 0 && (
        <div className="border-t border-secondary-200 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <h2 className="text-xl font-bold text-secondary-900 mb-4">Specifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between py-2.5 border-b border-secondary-100 last:border-0"
              >
                <span className="text-secondary-600 text-sm">{key}</span>
                <span className="font-medium text-secondary-900 text-sm">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {product.tags.length > 0 && (
        <div className="border-t border-secondary-200 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-secondary-100 text-secondary-600 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
