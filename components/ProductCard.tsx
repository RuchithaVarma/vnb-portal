import Link from 'next/link';
import { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="product-card group block"
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-cream-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-gradient-to-br from-forest/20 to-gold/20 rounded-full"></div>
        </div>
        
        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-3 right-3 bg-gold text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {discountPercentage}% OFF
          </div>
        )}

        {/* Size Badge */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-forest text-xs font-semibold px-3 py-1 rounded-full">
          {product.sizes[1]}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-forest text-lg mb-2 group-hover:text-forest-700 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Pricing */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-forest">
            ₹{product.price}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* FSSAI Badge */}
        {product.fssai && (
          <div className="mt-3 inline-flex items-center text-xs text-green-600 font-medium">
            <span className="mr-1">✓</span> FSSAI Certified
          </div>
        )}
      </div>
    </Link>
  );
}
