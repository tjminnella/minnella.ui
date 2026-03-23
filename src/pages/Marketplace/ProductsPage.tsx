import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
//import api from '../services/api';
import api from '../../services/api';
import type { Product } from '../../types';
import ProductList from '../../components/products/ProductList';

const CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'sports', label: 'Sports' },
  { value: 'home', label: 'Home & Kitchen' },
  { value: 'books', label: 'Books' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'bags', label: 'Bags' },
];

const SORT_OPTIONS = [
  { value: '', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const selectedCategory = searchParams.get('category') || '';
  const searchQuery = searchParams.get('q') || '';
  const sortBy = searchParams.get('sort') || '';

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const allProducts = await api.products.getAll({
          category: selectedCategory || undefined,
          search: searchQuery || undefined,
          sort: sortBy || undefined,
        });

        setProducts(allProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [selectedCategory, searchQuery, sortBy]);

  const handleCategoryChange = (category: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (category) {
      newParams.set('category', category);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  const handleSortChange = (sort: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (sort) {
      newParams.set('sort', sort);
    } else {
      newParams.delete('sort');
    }
    setSearchParams(newParams);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('q') as string;

    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set('q', query);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
        <p className="text-gray-600">
          {products.length} {products.length === 1 ? 'product' : 'products'} found
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <input
              type="text"
              name="q"
              defaultValue={searchQuery}
              placeholder="Search products..."
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Active Filters */}
      {(selectedCategory || searchQuery) && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedCategory && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
              Category: {CATEGORIES.find((c) => c.value === selectedCategory)?.label}
              <button onClick={() => handleCategoryChange('')} className="hover:text-primary-900">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
              Search: {searchQuery}
              <button
                onClick={() => {
                  const newParams = new URLSearchParams(searchParams);
                  newParams.delete('q');
                  setSearchParams(newParams);
                }}
                className="hover:text-primary-900"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </span>
          )}
        </div>
      )}

      {/* Product Grid */}
      <ProductList
        products={products}
        isLoading={isLoading}
        emptyMessage="Try adjusting your filters or search query"
      />
    </div>
  );
}
