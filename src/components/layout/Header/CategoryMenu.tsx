import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
  children?: Category[];
}

interface CategoryMenuProps {
  categories: Category[];
  onNavigate?: () => void;
}

export default function CategoryMenu({ categories, onNavigate }: CategoryMenuProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const location = useLocation();

  const parentCategories = categories.filter((cat) => !cat.parentId);

  useEffect(() => {
    onNavigate?.();
  }, [location]);

  return (
    <nav className="hidden lg:block relative">
      <ul className="flex items-center gap-1">
        {parentCategories.map((category) => {
          const hasChildren = category.children && category.children.length > 0;
          const isActive =
            location.pathname === `/categories/${category.slug}` ||
            location.pathname === `/products?category=${category.id}`;

          return (
            <li
              key={category.id}
              className="relative"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Link
                to={`/products?category=${category.id}`}
                onClick={onNavigate}
                className={`
                  flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium
                  transition-colors duration-200
                  ${
                    isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-secondary-600 hover:text-primary-600 hover:bg-secondary-50'
                  }
                `}
              >
                {category.name}
                {hasChildren && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </Link>

              {hasChildren && hoveredCategory === category.id && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-secondary-200 py-2 z-50 animate-scale-in">
                  {category.children!.map((child) => (
                    <Link
                      key={child.id}
                      to={`/products?category=${child.id}`}
                      onClick={onNavigate}
                      className="block px-4 py-2.5 text-sm text-secondary-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
