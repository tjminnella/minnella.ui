import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
  children?: Category[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

export default function MobileMenu({ isOpen, onClose, categories }: MobileMenuProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const location = useLocation();

  const parentCategories = categories.filter((cat) => !cat.parentId);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    onClose();
  }, [location]);

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      <div className="absolute top-0 right-0 h-full w-full max-w-xs bg-white shadow-xl animate-slide-in-from-right">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-secondary-200">
            <span className="text-lg font-bold text-primary-600">Menu</span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              <li>
                <Link
                  to="/"
                  onClick={onClose}
                  className="block px-4 py-3 rounded-lg text-secondary-600 hover:text-primary-600 hover:bg-primary-50 transition-colors font-medium"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  onClick={onClose}
                  className="block px-4 py-3 rounded-lg text-secondary-600 hover:text-primary-600 hover:bg-primary-50 transition-colors font-medium"
                >
                  All Products
                </Link>
              </li>
            </ul>

            <div className="mt-6">
              <h3 className="px-4 text-xs font-semibold text-secondary-400 uppercase tracking-wider mb-2">
                Categories
              </h3>
              <ul className="space-y-1">
                {parentCategories.map((category) => {
                  const hasChildren = category.children && category.children.length > 0;
                  const isExpanded = expandedCategories.has(category.id);

                  return (
                    <li key={category.id}>
                      <div
                        className="flex items-center justify-between px-4 py-3 rounded-lg text-secondary-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        onClick={() => (hasChildren ? toggleCategory(category.id) : onClose())}
                      >
                        <Link
                          to={`/products?category=${category.id}`}
                          onClick={onClose}
                          className="flex-1 font-medium"
                        >
                          {category.name}
                        </Link>
                        {hasChildren && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCategory(category.id);
                            }}
                            className={`p-1 rounded transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                      {hasChildren && isExpanded && (
                        <ul className="ml-4 mt-1 space-y-1 animate-slide-in-from-top">
                          {category.children!.map((child) => (
                            <li key={child.id}>
                              <Link
                                to={`/products?category=${child.id}`}
                                onClick={onClose}
                                className="block px-4 py-2.5 text-sm text-secondary-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="px-4 text-xs font-semibold text-secondary-400 uppercase tracking-wider mb-2">
                Support
              </h3>
              <ul className="space-y-1">
                {['About', 'FAQ', 'Shipping', 'Returns', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link
                      to={`/${item.toLowerCase()}`}
                      onClick={onClose}
                      className="block px-4 py-3 rounded-lg text-secondary-600 hover:text-primary-600 hover:bg-primary-50 transition-colors font-medium"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="p-4 border-t border-secondary-200 bg-secondary-50">
            <p className="text-sm text-secondary-500 text-center">© 2026 E-Commerce Prototype</p>
          </div>
        </div>
      </div>
    </div>
  );
}
