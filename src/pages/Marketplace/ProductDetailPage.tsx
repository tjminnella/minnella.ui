import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import type { Product } from '../../types';
import ProductDetail from '../../components/products/ProductDetail';
import ProductList from '../../components/products/ProductList';
import { Spinner } from '../../components/common/Spinner';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;

      setIsLoading(true);
      try {
        const productData = await api.products.getById(id);
        if (productData) {
          setProduct(productData);

          const related = await api.products.getAll({ category: productData.category });
          setRelatedProducts(related.filter((p: Product) => p.id !== id).slice(0, 4));
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/products"
          className="inline-block bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <Link to="/" className="hover:text-gray-700">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link to="/products" className="hover:text-gray-700">
              Products
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              to={`/products?category=${product.category}`}
              className="hover:text-gray-700 capitalize"
            >
              {product.category}
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium truncate">{product.name}</li>
        </ol>
      </nav>

      {/* Product Detail */}
      <ProductDetail product={product} />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <ProductList products={relatedProducts} />
        </section>
      )}

      {/* Back Button */}
      <div className="mt-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </button>
      </div>
    </div>
  );
}
