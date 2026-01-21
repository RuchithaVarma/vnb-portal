import { notFound } from 'next/navigation';
import { products, getProductBySlug } from '@/lib/products';
import { CheckCircle } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ProductClient from '@/components/ProductClient';

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product Detail */}
        <div className="bg-white rounded-xl shadow-card overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image Section */}
            <div className="aspect-square bg-cream-100 rounded-lg flex items-center justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-forest/30 to-gold/30 rounded-full"></div>
            </div>

            {/* Product Info & Client Interaction */}
            <div className="space-y-6">
              <div>
                <h1 className="font-serif text-4xl font-bold text-forest mb-2">
                  {product.name}
                </h1>
                <p className="text-gray-600 text-lg">{product.description}</p>
              </div>

              <ProductClient product={product} />
            </div>
          </div>

          {/* Benefits Section */}
          <div className="border-t border-gray-200 p-8">
            <h2 className="font-serif text-2xl font-bold text-forest mb-4">
              Health Benefits
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="section-title mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
