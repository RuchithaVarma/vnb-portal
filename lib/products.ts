export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  sizes: string[];
  category: string;
  fssai: boolean;
  featured: boolean;
  inStock: boolean;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Moringa Leaf Powder',
    slug: 'moringa-leaf-powder',
    description: 'Pure, nutrient-rich moringa leaf powder packed with vitamins and antioxidants. Perfect for smoothies and wellness drinks.',
    price: 299,
    originalPrice: 399,
    discount: 25,
    sizes: ['100g', '250g', '500g', '1kg'],
    category: 'leafy-vegetables',
    fssai: true,
    featured: true,
    inStock: true,
  },
  {
    id: '2',
    name: 'Amla Powder',
    slug: 'amla-powder',
    description: 'Premium Indian gooseberry powder, rich in vitamin C and natural antioxidants. Supports immunity and skin health.',
    price: 349,
    originalPrice: 449,
    discount: 22,
    sizes: ['100g', '250g', '500g', '1kg'],
    category: 'fruits',
    fssai: true,
    featured: true,
    inStock: true,
  },
  {
    id: '3',
    name: 'Wheatgrass Powder',
    slug: 'wheatgrass-powder',
    description: 'Fresh wheatgrass powder, a powerhouse of chlorophyll and nutrients. Ideal for detox and daily wellness.',
    price: 399,
    originalPrice: 549,
    discount: 27,
    sizes: ['100g', '250g', '500g', '1kg'],
    category: 'leafy-vegetables',
    fssai: true,
    featured: true,
    inStock: true,
  },
  {
    id: '4',
    name: 'Beetroot Powder',
    slug: 'beetroot-powder',
    description: 'Natural beetroot powder for vibrant color and nutrition. Rich in nitrates and antioxidants for athletic performance.',
    price: 279,
    originalPrice: 379,
    discount: 26,
    sizes: ['100g', '250g', '500g', '1kg'],
    category: 'vegetables',
    fssai: true,
    featured: true,
    inStock: true,
  },
  {
    id: '5',
    name: 'Spinach Powder',
    slug: 'spinach-powder',
    description: 'Dehydrated spinach powder, rich in iron and vitamins. Easy way to add greens to any meal or smoothie.',
    price: 249,
    originalPrice: 329,
    discount: 24,
    sizes: ['100g', '250g', '500g', '1kg'],
    category: 'leafy-vegetables',
    fssai: true,
    featured: false,
    inStock: true,
  },
  {
    id: '6',
    name: 'Turmeric Powder',
    slug: 'turmeric-powder',
    description: 'Pure turmeric powder with curcumin, known for anti-inflammatory properties. Perfect for golden milk and cooking.',
    price: 199,
    originalPrice: 259,
    discount: 23,
    sizes: ['100g', '250g', '500g', '1kg'],
    category: 'vegetables',
    fssai: true,
    featured: false,
    inStock: true,
  },
  {
    id: '7',
    name: 'Mango Powder',
    slug: 'mango-powder',
    description: 'Dried raw mango powder (amchur) with tangy flavor. Rich in vitamin C and perfect for Indian cuisine.',
    price: 229,
    originalPrice: 299,
    discount: 23,
    sizes: ['100g', '250g', '500g', '1kg'],
    category: 'fruits',
    fssai: true,
    featured: false,
    inStock: true,
  },
  {
    id: '8',
    name: 'Carrot Powder',
    slug: 'carrot-powder',
    description: 'Nutrient-dense carrot powder, rich in beta-carotene and vitamin A. Great for natural color and nutrition.',
    price: 259,
    originalPrice: 339,
    discount: 24,
    sizes: ['100g', '250g', '500g', '1kg'],
    category: 'vegetables',
    fssai: true,
    featured: false,
    inStock: true,
  },
];

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured);
}

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(product => product.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
}
