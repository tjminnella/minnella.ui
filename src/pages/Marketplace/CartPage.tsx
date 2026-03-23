import { Link } from 'react-router-dom';
//import { useCartStore } from '../store/cartStore';
import { useCartStore } from '../../store/cartStore';
//import CartItem from '../components/cart/CartItem';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import { Button } from '../../components/common/Button';

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <svg
            className="w-24 h-24 mx-auto text-secondary-300 mb-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>

          <h1 className="text-2xl font-bold text-secondary-900 mb-2">Your cart is empty</h1>
          <p className="text-secondary-500 mb-6">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>

          <Link to="/products">
            <Button variant="primary" size="lg">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Shopping Cart</h1>
          <p className="text-sm text-secondary-500 mt-1">
            {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        <button
          onClick={handleClearCart}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-4 sm:p-6">
            <div className="space-y-4">
              {cart.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-secondary-200">
              <Link to="/products">
                <Button variant="secondary" size="sm">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <CartSummary />
          </div>
        </div>
      </div>

      {/* Mobile Checkout Bar - Fixed at bottom on mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-secondary-200 p-4 lg:hidden safe-bottom">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-secondary-500">Total</p>
            <p className="text-xl font-bold text-secondary-900">${(cart.total / 100).toFixed(2)}</p>
          </div>
          <Link to="/checkout" className="flex-1 max-w-xs">
            <Button variant="primary" size="lg" className="w-full">
              Checkout
            </Button>
          </Link>
        </div>
      </div>

      {/* Spacer for mobile checkout bar */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}
