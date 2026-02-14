'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Instagram, Play } from 'lucide-react';
import { products } from '@/lib/products';
import { getSocialFeedItems, SocialFeedItem } from '@/lib/firestore/social-feed';

export default function InstagramFeed() {
  const [feedItems, setFeedItems] = useState<SocialFeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const items = await getSocialFeedItems();
        if (items.length > 0) {
          setFeedItems(items);
        } else {
          // Fallback to products if no feed items
          const fallbackItems = products.slice(0, 6).map(p => ({
            id: String(p.id),
            imageUrl: p.image,
            type: 'image' as const,
            createdAt: new Date().toISOString()
          }));
          setFeedItems(fallbackItems);
        }
      } catch (error) {
        console.error("Error fetching social feed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  // Calculate scroll duration and distance based on item count
  // Each item is w-64 (256px) + space-x-6 (24px) = 280px
  const itemWidth = 280;
  const scrollDistance = feedItems.length * itemWidth;
  const duration = feedItems.length * 5; // 5 seconds per item for smooth speed

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <Instagram className="w-8 h-8 text-forest mx-auto mb-4" />
        <h2 className="section-title">@BloomsEnergy</h2>
        <p className="text-gray-600">Join our community of wellness enthusiasts</p>
      </div>

      <div className="relative">
        <div className="flex overflow-hidden">
          <motion.div 
            className="flex space-x-6 px-4"
            animate={{ x: [0, -scrollDistance] }}
            transition={{ 
              duration: duration, 
              repeat: Infinity, 
              ease: "linear",
              repeatType: "loop"
            }}
          >
            {/* Render 3 sets to ensure no gaps on wide screens */}
            {[...feedItems, ...feedItems, ...feedItems].map((item, index) => (
              <div 
                key={`${item.id}-${index}`}
                className="flex-shrink-0 w-64 h-64 relative rounded-xl overflow-hidden group cursor-pointer bg-gray-100"
              >
                {item.type === 'video' ? (
                  <video 
                    src={item.imageUrl}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    muted
                    loop
                    onMouseOver={event => (event.target as HTMLVideoElement).play()}
                    onMouseOut={event => (event.target as HTMLVideoElement).pause()}
                  />
                ) : (
                  <Image
                    src={item.imageUrl}
                    alt="Social Feed"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  {item.type === 'video' ? (
                    <Play className="w-8 h-8 text-white fill-current" />
                  ) : (
                    <Instagram className="w-8 h-8 text-white" />
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
