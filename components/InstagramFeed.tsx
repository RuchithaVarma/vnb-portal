import { Instagram } from 'lucide-react';

const instagramPosts = [
  { id: 1, url: '#' },
  { id: 2, url: '#' },
  { id: 3, url: '#' },
  { id: 4, url: '#' },
  { id: 5, url: '#' },
  { id: 6, url: '#' },
];

export default function InstagramFeed() {
  return (
    <section className="py-16 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-forest/10 rounded-full mb-4">
            <Instagram className="w-6 h-6 text-forest" />
          </div>
          <h2 className="section-title">Follow Us @bloomsenergy</h2>
          <p className="text-gray-600 text-lg mt-2 font-medium">
            Join our community for daily dose of health and wellness
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              className="group relative aspect-square overflow-hidden rounded-lg bg-gray-200"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-forest/20 opacity-30 group-hover:opacity-10 transition-opacity">
                <LeafPlaceholder />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeafPlaceholder() {
  return (
    <svg className="w-12 h-12 text-forest/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1.08 11.23A7 7 0 0 1 11 20z" />
      <path d="M11 20l-1-7.5" />
    </svg>
  );
}
