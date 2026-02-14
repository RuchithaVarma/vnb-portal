'use client';

import { useState } from 'react';
import { uploadImage } from '@/lib/storage';
import { Upload, X, Loader2, Video, Image as ImageIcon, Play } from 'lucide-react';
import Image from 'next/image';

interface SocialMediaUploadProps {
  onUploadComplete: (url: string, type: 'image' | 'video') => void;
}

export default function SocialMediaUpload({ onUploadComplete }: SocialMediaUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<{ url: string, type: 'image' | 'video' } | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      setError('Please upload an image or video file');
      return;
    }

    if (file.size > 20 * 1024 * 1024) { // 20MB limit
      setError('File must be less than 20MB');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Upload to 'products' folder (using standard uploadImage) to avoid permission/CORS issues
      const url = await uploadImage(file);
      const type = isImage ? 'image' : 'video';
      setPreview({ url, type });
      onUploadComplete(url, type);
      
      // Reset input
      e.target.value = '';
    } catch (err) {
      console.error(err);
      setError('Failed to upload file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearMedia = () => {
    setPreview(null);
    // Note: We don't trigger onUploadComplete with empty string here as the parent manages the list
    // This is just clearing the *upload* preview for the next item
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-base font-bold text-forest">Social Feed Media</label>
        {loading && <span className="text-xs text-forest animate-pulse flex items-center">
          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
          Uploading...
        </span>}
      </div>

      <div className="border-2 border-dashed border-forest/20 rounded-2xl p-8 bg-forest/5 hover:bg-forest/10 transition-all duration-300 group relative">
        {preview ? (
          <div className="relative aspect-square w-full max-w-[240px] mx-auto bg-white rounded-xl shadow-card overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
            {preview.type === 'video' ? (
              <div className="relative w-full h-full bg-black">
                <video src={preview.url} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="w-8 h-8 text-white opacity-70" />
                </div>
              </div>
            ) : (
              <Image 
                src={preview.url} 
                alt="Preview" 
                fill 
                className="object-cover"
              />
            )}
            
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <label className="p-3 bg-white text-forest rounded-full shadow-lg cursor-pointer hover:bg-forest hover:text-white transition-all transform hover:scale-110">
                <Upload className="w-5 h-5" />
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={loading}
                />
              </label>
              <button
                type="button"
                onClick={clearMedia}
                className="p-3 bg-white text-forest rounded-full shadow-lg hover:bg-forest hover:text-white transition-all transform hover:scale-110"
                title="Upload another"
              >
                {/* We use a plus/refresh icon logically, but for clearing preview to upload new, X is fine or just upload button */}
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none">
                <span className="text-[10px] bg-black/50 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                    Upload Successful! Ready to add another.
                </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-forest/60 py-8">
            <div className="p-5 bg-forest/10 rounded-full mb-4 group-hover:bg-forest group-hover:text-white transition-all duration-300 shadow-soft flex space-x-2">
              <ImageIcon className="w-6 h-6" />
              <Video className="w-6 h-6" />
            </div>
            <p className="text-lg font-bold text-forest">Click to upload Image or Video</p>
            <p className="text-sm opacity-70">Up to 20MB</p>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={loading}
            />
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-2 rounded-lg text-sm flex items-center shadow-sm">
          <X className="w-4 h-4 mr-2" />
          {error}
        </div>
      )}
    </div>
  );
}
