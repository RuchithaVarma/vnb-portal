'use client';

import { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface SimpleImageUploadProps {
  currentImage?: string;
  onImageUploaded: (url: string) => void;
}

export default function SimpleImageUpload({ currentImage, onImageUploaded }: SimpleImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(currentImage || '');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError('Image must be less than 5MB');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setPreview(dataUrl);
        onImageUploaded(dataUrl);
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setError('Failed to process image. Please try again.');
      setLoading(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setPreview(url);
    onImageUploaded(url);
  };

  const clearImage = () => {
    setPreview('');
    onImageUploaded('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <label className="block text-base font-bold text-forest">Product Image</label>
        {loading && <span className="text-xs text-forest animate-pulse flex items-center">
          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
          Processing...
        </span>}
      </div>

      {/* URL Input Option */}
      <div className="space-y-3 p-4 bg-gold/5 rounded-2xl border border-gold/10">
        <label className="block text-sm font-semibold text-gold-800">Or enter image URL:</label>
        <input
          type="url"
          value={preview}
          onChange={handleUrlChange}
          className="w-full px-4 py-3 border border-gold/20 rounded-xl text-sm focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {/* File Upload Option */}
      <div className="border-2 border-dashed border-forest/20 rounded-2xl p-8 bg-forest/5 hover:bg-forest/10 transition-all duration-300 group relative">
        {preview ? (
          <div className="relative aspect-square w-full max-w-[240px] mx-auto bg-white rounded-xl shadow-card overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
            <Image 
              src={preview} 
              alt="Preview" 
              fill 
              className="object-contain p-4"
              onError={() => setError('Invalid image URL')}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <label className="p-3 bg-white text-forest rounded-full shadow-lg cursor-pointer hover:bg-forest hover:text-white transition-all transform hover:scale-110">
                <Upload className="w-5 h-5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={loading}
                />
              </label>
              <button
                type="button"
                onClick={clearImage}
                className="p-3 bg-white text-red-500 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all transform hover:scale-110"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-forest/60 py-8">
            <div className="p-5 bg-forest/10 rounded-full mb-4 group-hover:bg-forest group-hover:text-white transition-all duration-300 shadow-soft">
              <Upload className="w-8 h-8" />
            </div>
            <p className="text-lg font-bold text-forest">Click to upload image</p>
            <p className="text-sm opacity-70">PNG, JPG up to 5MB</p>
            <input
              type="file"
              accept="image/*"
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
