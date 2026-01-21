import Link from 'next/link';

const categories = [
  {
    name: 'Fruit Powders',
    slug: 'fruit',
    description: 'Natural fruit powders rich in vitamins and antioxidants',
    image: '/categories/fruits.jpg',
  },
  {
    name: 'Vegetable Powders',
    slug: 'vegetable',
    description: 'Nutrient-dense vegetable powders for everyday wellness',
    image: '/categories/vegetables.jpg',
  },
  {
    name: 'Leafy Vegetable Powders',
    slug: 'leafy',
    description: 'Power-packed greens in convenient powder form',
    image: '/categories/leafy.jpg',
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Shop by Category</h2>
          <p className="text-gray-600 text-lg mt-2">
            Explore our complete range of natural raw powders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className="group block"
            >
              <div className="card overflow-hidden">
                <div className="relative h-64 bg-gray-100 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('/categories/${category.slug === 'vegetable' ? 'fruits' : category.slug}.png')` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Category Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-serif text-2xl font-bold mb-2">
                      {category.name}
                    </h3>
                  </div>
                </div>
                
                <div className="p-6 bg-white">
                  <p className="text-gray-600 mb-4">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center text-forest font-semibold group-hover:translate-x-2 transition-transform">
                    Shop Now →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
