import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore, type CartState } from '../../../store/cartStore';
import type { CartItem, ProductImage } from '../../../types';
import type { Category } from '../../../types/category.types';
import logoGif from '../../../assets/logo.gif';
import SearchBar from '../../common/SearchBar/SearchBar';
import CategoryMenu from './CategoryMenu';
import MobileMenu from './MobileMenu';

function formatPrice(price: number): string {
  return `$${(price / 100).toFixed(2)}`;
}

const CATEGORIES: Category[] = [
  { id: 'electronics', name: 'Electronics', slug: 'electronics', parentId: null },
  { id: 'audio', name: 'Audio', slug: 'audio', parentId: 'electronics' },
  { id: 'wearables', name: 'Wearables', slug: 'wearables', parentId: 'electronics' },
  { id: 'computers', name: 'Computers', slug: 'computers', parentId: 'electronics' },
  { id: 'clothing', name: 'Clothing', slug: 'clothing', parentId: null },
  { id: 'men', name: "Men's", slug: 'mens-clothing', parentId: 'clothing' },
  { id: 'women', name: "Women's", slug: 'womens-clothing', parentId: 'clothing' },
  { id: 'bags', name: 'Bags', slug: 'bags', parentId: null },
  { id: 'accessories', name: 'Accessories', slug: 'accessories', parentId: null },
  { id: 'lifestyle', name: 'Lifestyle', slug: 'lifestyle', parentId: null },
];

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cart = useCartStore((state: CartState) => state.cart);
  const getTotalItems = useCartStore((state: CartState) => state.getTotalItems);
  const removeItem = useCartStore((state: CartState) => state.removeItem);

  const totalItems = getTotalItems();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRemoveFromDropdown = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    removeItem(itemId);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-secondary-200 bg-white/90 backdrop-blur-md">
        <div className="container mx-auto">
          <div className="h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-secondary-100 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-secondary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <Link to="/" className="shrink-0" aria-label="Shop home">
                <img src={logoGif} alt="Shop logo" className="h-10 w-auto object-contain" />
              </Link>

              <CategoryMenu categories={CATEGORIES} />
            </div>

            <div className="hidden md:block flex-1 max-w-md mx-4">
              <SearchBar />
            </div>

            <div className="flex items-center gap-2">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="relative flex items-center gap-2 p-2 rounded-lg text-secondary-600 hover:text-primary-600 hover:bg-secondary-50 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>

                  {totalItems > 0 && (
                    <span className="absolute top-1 right-1 bg-primary-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>
                  )}
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-secondary-200 overflow-hidden animate-scale-in">
                    <div className="p-4 border-b border-secondary-200">
                      <h3 className="font-bold text-secondary-900">Shopping Cart</h3>
                    </div>

                    {!cart || cart.items.length === 0 ? (
                      <div className="p-6 text-center">
                        <svg
                          className="w-12 h-12 mx-auto text-secondary-300 mb-2"
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
                        <p className="text-secondary-500 text-sm">Your cart is empty</p>
                        <Link
                          to="/products"
                          className="block mt-2 text-primary-600 text-sm font-medium hover:text-primary-700"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Start Shopping →
                        </Link>
                      </div>
                    ) : (
                      <>
                        <div className="max-h-80 overflow-y-auto">
                          {cart.items.map((item: CartItem) => {
                            const primaryImage =
                              item.product.images.find((img: ProductImage) => img.isPrimary) ||
                              item.product.images[0];
                            return (
                              <div
                                key={item.id}
                                className="flex gap-3 p-3 border-b border-secondary-100 last:border-0"
                              >
                                <div className="w-16 h-16 bg-secondary-100 rounded-md overflow-hidden shrink-0">
                                  <img
                                    src={primaryImage?.url || '/images/placeholder.jpg'}
                                    alt={primaryImage?.alt || item.product.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-medium text-secondary-900 truncate">
                                    {item.product.name}
                                  </h4>
                                  <p className="text-xs text-secondary-500 mt-1">
                                    Qty: {item.quantity} × {formatPrice(item.price)}
                                  </p>
                                  {item.variant && Object.keys(item.variant).length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {Object.entries(item.variant).map(([key, value]) => (
                                        <span
                                          key={key}
                                          className="text-xs text-secondary-400 capitalize"
                                        >
                                          {key}: {value as string}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <button
                                  onClick={(e) => handleRemoveFromDropdown(item.id, e)}
                                  className="text-secondary-400 hover:text-red-600 shrink-0 transition-colors"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              </div>
                            );
                          })}
                        </div>

                        <div className="p-4 bg-secondary-50">
                          <div className="flex justify-between mb-3">
                            <span className="text-secondary-600">Subtotal</span>
                            <span className="font-bold text-secondary-900">
                              {formatPrice(cart.subtotal)}
                            </span>
                          </div>
                          <Link
                            to="/cart"
                            className="block w-full text-center bg-primary-600 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-primary-700 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            View Cart
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              <Link
                to="/products"
                className="md:hidden p-2 rounded-lg text-secondary-600 hover:text-primary-600 hover:bg-secondary-50 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div className="md:hidden pb-3">
            <SearchBar />
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        categories={CATEGORIES}
      />
    </>
  );
}
