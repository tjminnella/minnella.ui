import { useCartStore } from '../../store/cartStore';
import type { CartItem as CartItemType } from '../../types';

interface CartItemProps {
  item: CartItemType;
}

function formatPrice(price: number): string {
  return `$${(price / 100).toFixed(2)}`;
}

export default function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const primaryImage = item.product.images.find((img) => img.isPrimary) || item.product.images[0];

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(item.id, item.quantity - 1);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 py-4 border-b border-secondary-200 last:border-0">
      <div className="shrink-0 w-full sm:w-24 sm:h-24 bg-secondary-100 rounded-md overflow-hidden">
        <img
          src={primaryImage?.url || '/images/placeholder.jpg'}
          alt={primaryImage?.alt || item.product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-secondary-900 truncate">{item.product.name}</h3>

        {item.variant && Object.keys(item.variant).length > 0 && (
          <div className="mt-1 flex flex-wrap gap-2">
            {Object.entries(item.variant).map(([key, value]) => (
              <span
                key={key}
                className="text-xs text-secondary-500 bg-secondary-100 px-2 py-1 rounded capitalize"
              >
                {key}: {value}
              </span>
            ))}
          </div>
        )}

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center border border-secondary-300 rounded-md">
            <button
              onClick={handleDecrement}
              className="w-9 h-9 flex items-center justify-center hover:bg-secondary-50 disabled:opacity-50 transition-colors"
              disabled={item.quantity <= 1}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="w-12 text-center text-sm font-medium">{item.quantity}</span>
            <button
              onClick={handleIncrement}
              className="w-9 h-9 flex items-center justify-center hover:bg-secondary-50 disabled:opacity-50 transition-colors"
              disabled={item.quantity >= item.product.stock}
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
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleRemove}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Remove
            </button>
            <p className="font-bold text-secondary-900 sm:hidden">{formatPrice(item.subtotal)}</p>
          </div>
        </div>
      </div>

      <div className="shrink-0 text-right hidden sm:block">
        <p className="text-sm text-secondary-500 mb-1">{formatPrice(item.price)} each</p>
        <p className="font-bold text-secondary-900">{formatPrice(item.subtotal)}</p>
      </div>
    </div>
  );
}
