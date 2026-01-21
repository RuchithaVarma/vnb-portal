import Link from 'next/link';
import ProductCard from './ProductCard';
import { getFeaturedProducts } from '@/lib/products';

export default function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Featured Products</h2>
          <p className="text-gray-600 text-lg mt-2">
            Handpicked selection of our most popular raw powders
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/shop"
            className="btn-secondary inline-block"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
