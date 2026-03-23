import React from 'react';
import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../utils/formatPrice';

interface OrderSummaryProps {
  promoCode?: string | null;
  compact?: boolean;
}

function calculateDiscount(subtotal: number, code: string): number {
  const validCodes: Record<string, number> = {
    WELCOME10: 0.1,
    SAVE20: 0.2,
    SUMMER25: 0.25,
  };
  const upperCode = code.toUpperCase().trim();
  if (validCodes[upperCode]) {
    return Math.round(subtotal * validCodes[upperCode]);
  }
  return 0;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ promoCode, compact = false }) => {
  const cart = useCartStore((state) => state.cart);

  if (!cart) {
    return <div className="text-center py-8 text-gray-500">Your cart is empty</div>;
  }

  const discount = promoCode ? calculateDiscount(cart.subtotal, promoCode) : 0;
  const totalWithDiscount = cart.total - discount;

  if (compact) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{formatPrice(cart.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">
              {cart.shipping === 0 ? 'Free' : formatPrice(cart.shipping)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">{formatPrice(cart.tax)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount ({promoCode})</span>
              <span className="font-medium">-{formatPrice(discount)}</span>
            </div>
          )}
          <div className="border-t pt-2 flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span className="text-primary-600">{formatPrice(totalWithDiscount)}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

      <div className="space-y-4 mb-6">
        <div className="max-h-64 overflow-y-auto space-y-3">
          {cart.items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                {item.product.images && item.product.images.length > 0 ? (
                  <img
                    src={item.product.images[0].url}
                    alt={item.product.images[0].alt || item.product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">{item.product.name}</h4>
                {item.variant && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {item.variant.color && `Color: ${item.variant.color}`}
                    {item.variant.size &&
                      `${item.variant.color ? ' • ' : ''}Size: ${item.variant.size}`}
                  </p>
                )}
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                  <span className="text-sm font-medium">{formatPrice(item.subtotal)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-4 space-y-3">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium">{formatPrice(cart.subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="font-medium">
            {cart.shipping === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              formatPrice(cart.shipping)
            )}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span className="font-medium">{formatPrice(cart.tax)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount ({promoCode})</span>
            <span className="font-medium">-{formatPrice(discount)}</span>
          </div>
        )}
        <div className="border-t pt-3 flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span className="text-primary-600">{formatPrice(totalWithDiscount)}</span>
        </div>
      </div>

      {cart.shipping >= 5000 && cart.shipping === 0 && (
        <p className="mt-4 text-sm text-green-600 text-center">
          ✓ You've qualified for free shipping!
        </p>
      )}
    </div>
  );
};

export default OrderSummary;
