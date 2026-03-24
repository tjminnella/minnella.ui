//import api from '../services/api';
//import type { Product } from '../types';

import { useEffect, useState } from "react";
import type { Product } from "../types";
import api from "../services/api";
import { Link } from 'react-router-dom';
import { Spinner } from '../components/common/Spinner';
import ProductList from '../components/products/ProductList';

export default function HomePage() {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const allProducts = await api.products.getAll();
        setFeaturedProducts(allProducts.slice(0, 8));
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8 md:p-12 shadow-lg">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to my Store</h1>
          <p className="text-lg md:text-xl text-blue-100 mb-6">
            Welcome to my e-commerce store! This is a demo application built with React and TypeScript, showcasing a variety of products across different categories. Browse our featured products, explore by category, and enjoy a seamless shopping experience. Happy shopping!
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <Link to="/products" className="text-primary-600 hover:text-primary-700 font-medium">
            View All →
          </Link>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : (
          <ProductList products={featuredProducts} />
        )}
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              name: 'Electronics',
              slug: 'electronics',
              image: '/images/categories/electronics.jpg',
            },
            { name: 'Clothing', slug: 'clothing', image: '/images/categories/clothing.jpg' },
            { name: 'Sports', slug: 'sports', image: '/images/categories/sports.jpg' },
            { name: 'Home & Kitchen', slug: 'home', image: '/images/categories/home.jpg' },
          ].map((category) => (
            <Link
              key={category.slug}
              to={`/products?category=${category.slug}`}
              className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">{category.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}