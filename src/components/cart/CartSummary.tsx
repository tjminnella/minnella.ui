import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { Button } from '../common/Button';

interface CartSummaryProps {
  className?: string;
}

function formatPrice(price: number): string {
  return `$${(price / 100).toFixed(2)}`;
}

export default function CartSummary({ className = '' }: CartSummaryProps) {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoApplied, setPromoApplied] = useState('');

  if (!cart) return null;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoApplied('');

    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }

    if (promoCode.toUpperCase() === 'SAVE10') {
      setPromoApplied('Promo code applied! 10% discount');
    } else {
      setPromoError('Invalid promo code');
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

      <div className="space-y-3 py-4 border-t border-b border-gray-200">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{formatPrice(cart.subtotal)}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>
            {cart.shipping === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              formatPrice(cart.shipping)
            )}
          </span>
        </div>

        {cart.shipping > 0 && (
          <p className="text-xs text-gray-500">
            Add {formatPrice(5000 - cart.subtotal)} more for free shipping
          </p>
        )}

        <div className="flex justify-between text-gray-600">
          <span>Tax (8%)</span>
          <span>{formatPrice(cart.tax)}</span>
        </div>
      </div>

      {promoApplied && (
        <div className="mt-3 p-2 bg-green-50 text-green-700 text-sm rounded">{promoApplied}</div>
      )}

      {promoError && (
        <div className="mt-3 p-2 bg-red-50 text-red-700 text-sm rounded">{promoError}</div>
      )}

      <form onSubmit={handleApplyPromo} className="mt-4 flex gap-2">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Promo code"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <Button type="submit" variant="secondary" size="sm">
          Apply
        </Button>
      </form>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>{formatPrice(cart.total)}</span>
        </div>

        <Button onClick={handleCheckout} variant="primary" size="lg" className="w-full">
          Proceed to Checkout
        </Button>

        <button
          onClick={() => navigate('/products')}
          className="w-full text-center text-sm text-primary-600 hover:text-primary-700"
        >
          or Continue Shopping
        </button>
      </div>
    </div>
  );
}
