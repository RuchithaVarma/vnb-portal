import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProduct, getProducts } from '@/lib/firestore/products';
import { CheckCircle, ShieldCheck, Leaf } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ProductClient from '@/components/ProductClient';

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  // Fetch all products for "Related Products"
  // optimization: could create a dedicated firestore query for this
  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Product Detail */}
        <div className="bg-white rounded-3xl shadow-card overflow-hidden mb-16 border border-forest/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 lg:p-12">
            {/* Image Section */}
            <div className="relative aspect-square bg-cream-50 rounded-2xl overflow-hidden flex items-center justify-center group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-12 transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>

            {/* Product Info & Client Interaction */}
            <div className="flex flex-col justify-center">
              <div className="mb-8">
                <div className="text-gold font-medium uppercase tracking-widest text-sm mb-2">
                  {product.category}
                </div>
                <h1 className="font-sans text-4xl lg:text-5xl font-bold text-forest mb-4">
                  {product.name}
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              <ProductClient product={product} />
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 text-gray-500 text-sm">
                  <ShieldCheck className="w-5 h-5 text-gold" />
                  <span>Quality Guaranteed</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500 text-sm">
                  <Leaf className="w-5 h-5 text-gold" />
                  <span>100% Organic</span>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-cream-50/50 border-t border-forest/5 p-8 lg:p-12">
            <h2 className="font-sans text-2xl font-bold text-forest mb-8 flex items-center">
              <span className="w-8 h-8 bg-forest text-white rounded-full inline-flex items-center justify-center text-sm mr-3">✓</span>
              Pure Potency & Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-soft border border-forest/5 flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="animate-fade-in-up">
            <h2 className="section-title mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
