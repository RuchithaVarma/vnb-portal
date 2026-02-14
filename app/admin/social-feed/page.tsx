'use client';

import { useState, useEffect } from 'react';
import { getSocialFeedItems, addSocialFeedItem, deleteSocialFeedItem, SocialFeedItem } from '@/lib/firestore/social-feed';
import SocialMediaUpload from '@/components/admin/SocialMediaUpload';
import { Loader2, Trash2, Video, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

export default function SocialFeedAdminPage() {
  const [items, setItems] = useState<SocialFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      const feedItems = await getSocialFeedItems();
      setItems(feedItems);
    } catch (error) {
      console.error("Failed to fetch items", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleUploadComplete = async (url: string, type: 'image' | 'video') => {
    try {
      await addSocialFeedItem({
        imageUrl: url,
        type,
        caption: '' // Optional caption, we can add a modal for this later if needed
      });
      fetchItems();
    } catch (error) {
      console.error("Failed to add item", error);
      alert("Failed to save item info to database");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    setDeleteLoading(id);
    try {
      await deleteSocialFeedItem(id);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error("Failed to delete item", error);
      alert("Failed to delete item");
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-forest mb-2">Social Feed</h1>
        <p className="text-gray-600">Manage images and videos displayed in the "Join our community" section.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-card">
        <h2 className="text-xl font-bold text-forest mb-4">Add New Item</h2>
        <SocialMediaUpload onUploadComplete={handleUploadComplete} />
      </div>

      <div>
        <h2 className="text-xl font-bold text-forest mb-4">Current Feed ({items.length})</h2>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-forest" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
            <p className="text-gray-500">No items found. Upload some!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item.id} className="group relative bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 aspect-square">
                {item.type === 'video' ? (
                  <video 
                    src={item.imageUrl} 
                    className="w-full h-full object-cover"
                    controls={false}
                    muted
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={item.imageUrl}
                      alt="Social Feed Item"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                   <div className="absolute top-2 right-2 bg-white/20 p-1.5 rounded-full backdrop-blur-md">
                      {item.type === 'video' ? <Video className="w-4 h-4 text-white" /> : <ImageIcon className="w-4 h-4 text-white" />}
                   </div>

                   <button
                    onClick={() => item.id && handleDelete(item.id)}
                    disabled={deleteLoading === item.id}
                    className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-transform hover:scale-110 shadow-lg"
                  >
                    {deleteLoading === item.id ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
