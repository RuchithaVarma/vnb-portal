"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Edit,
  MoreVertical,
  Loader2,
  ImagePlus,
  X,
  GripVertical,
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import {
  getItems,
  addItem,
  updateItem,
  deleteItem,
} from "@/lib/firestoreService";
import { HeroSlide } from "@/types";

export default function HeroManagement() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const imageFileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState<HeroSlide | null>(null);
  const [formState, setFormState] = useState<Partial<HeroSlide>>({
    bgImage: "",
    badge: "",
    title: "",
    titleHighlights: [],
    desc: "",
    order: 0,
  });
  const [highlightsInput, setHighlightsInput] = useState("");

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      alert("File size must be less than 5MB. Please choose a smaller image.");
      if (imageFileInputRef.current) imageFileInputRef.current.value = "";
      return;
    }

    // Check file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPG, PNG, or WebP).");
      if (imageFileInputRef.current) imageFileInputRef.current.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        // Check image dimensions
        const width = img.width;
        const height = img.height;

        // Recommended: 1920x1080 (16:9), Minimum: 1280x720
        if (width < 1280 || height < 720) {
          alert(
            `Image dimensions too small. Current: ${width}x${height}px. Minimum required: 1280x720px. Recommended: 1920x1080px.`,
          );
          if (imageFileInputRef.current) imageFileInputRef.current.value = "";
          return;
        }

        // Auto-resize large images
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1080;
        let newWidth = width;
        let newHeight = height;

        if (width > MAX_WIDTH) {
          newHeight = Math.round((height * MAX_WIDTH) / width);
          newWidth = MAX_WIDTH;
        }
        if (newHeight > MAX_HEIGHT) {
          newWidth = Math.round((newWidth * MAX_HEIGHT) / newHeight);
          newHeight = MAX_HEIGHT;
        }

        canvas.width = newWidth;
        canvas.height = newHeight;
        canvas.getContext("2d")?.drawImage(img, 0, 0, newWidth, newHeight);

        // Compress to 85% quality for web
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        setImagePreview(dataUrl);
        setFormState((prev) => ({ ...prev, bgImage: dataUrl }));

        // Show success message with dimensions
        console.log(
          `Image processed: ${newWidth}x${newHeight}px, optimized for web`,
        );
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImagePreview("");
    setFormState((prev) => ({ ...prev, bgImage: "" }));
    if (imageFileInputRef.current) imageFileInputRef.current.value = "";
  };

  useEffect(() => {
    if (selectedSlide) {
      setFormState(selectedSlide);
      setHighlightsInput(selectedSlide.titleHighlights.join(", "));
      setImagePreview(selectedSlide.bgImage || "");
    } else {
      setFormState({
        bgImage: "",
        badge: "",
        title: "",
        titleHighlights: [],
        desc: "",
        order: slides.length,
      });
      setHighlightsInput("");
      setImagePreview("");
    }
  }, [selectedSlide, slides.length]);

  const fetchSlides = async () => {
    setLoading(true);
    try {
      const data = await getItems<HeroSlide>("hero_slides");
      // Sort by order
      const sorted = data.sort((a, b) => (a.order || 0) - (b.order || 0));
      setSlides(sorted);
    } catch (error) {
      console.error("Error fetching hero slides:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id?: string) => {
    if (!id) return;
    if (confirm("Are you sure you want to delete this slide?")) {
      try {
        await deleteItem("hero_slides", id);
        alert("Slide deleted successfully!");
        fetchSlides();
      } catch (error) {
        alert("Failed to delete slide.");
      }
    }
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedHighlights = highlightsInput
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean);
    const payload = {
      ...formState,
      bgImage:
        imagePreview ||
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80", // default fallback
      titleHighlights: updatedHighlights,
      order: Number(formState.order) || 0,
    } as Omit<HeroSlide, "id">;

    setIsSaving(true);
    try {
      if (selectedSlide?.id) {
        await updateItem("hero_slides", selectedSlide.id, payload);
        alert("Slide updated successfully!");
      } else {
        await addItem("hero_slides", payload);
        alert("Slide added successfully!");
      }
      setIsModalOpen(false);
      fetchSlides();
    } catch (error) {
      alert("Failed to save slide.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout title="Hero Banner Management">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Hero Banner Slides</h1>
            <p className="text-gray-500 mt-1">
              Manage the homepage hero section {loading && "(Loading...)"}
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedSlide(null);
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Slide
          </button>
        </div>

        {/* Image Specifications Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
            <ImagePlus className="w-5 h-5 mr-2" />
            Hero Banner Image Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="font-medium text-blue-800">Recommended Size</p>
              <p className="text-blue-600">1920×1080px (16:9)</p>
            </div>
            <div>
              <p className="font-medium text-blue-800">Minimum Size</p>
              <p className="text-blue-600">1280×720px</p>
            </div>
            <div>
              <p className="font-medium text-blue-800">File Size Limit</p>
              <p className="text-blue-600">Maximum 5MB</p>
            </div>
            <div>
              <p className="font-medium text-blue-800">Supported Formats</p>
              <p className="text-blue-600">JPG, PNG, WebP</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-blue-200">
            <p className="text-xs text-blue-700">
              <strong>Note:</strong> Images are automatically optimized for web
              performance. Large images will be resized to 1920×1080px and
              compressed to 85% quality.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="relative h-48 bg-gray-200">
                {slide.bgImage ? (
                  <img
                    src={slide.bgImage}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    No Image
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs font-bold">
                  Order: {slide.order || idx}
                </div>
              </div>
              <div className="p-4 flex-1">
                <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full mb-2">
                  {slide.badge}
                </span>
                <h3 className="font-bold text-lg mb-2">{slide.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {slide.desc}
                </p>
              </div>
              <div className="border-t p-4 bg-gray-50 flex items-center space-x-2">
                <button
                  onClick={() => {
                    setSelectedSlide(slide);
                    setIsModalOpen(true);
                  }}
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 text-sm flex items-center justify-center font-medium"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteItem(slide.id)}
                  className="px-3 py-2 border border-red-200 bg-red-50 rounded-lg hover:bg-red-100 text-red-600"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {slides.length === 0 && !loading && (
            <div className="col-span-1 border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center">
              <ImagePlus className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">
                No slides found
              </h3>
              <p className="text-sm text-gray-500 mt-1 mb-4">
                Add the first slide to control your hero banner.
              </p>
              <button
                onClick={() => {
                  setSelectedSlide(null);
                  setIsModalOpen(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Slide
              </button>
            </div>
          )}
        </div>

        {/* Modal Form */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-4 border-b pb-4">
                <h3 className="text-xl font-bold">
                  {selectedSlide ? "Edit Slide" : "Add Slide"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-800 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full p-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSaveItem} className="space-y-4">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Background Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={imageFileInputRef}
                    onChange={handleImageUpload}
                  />
                  <div
                    onClick={() => imageFileInputRef.current?.click()}
                    className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors overflow-hidden"
                  >
                    {imagePreview ? (
                      <>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 hover:bg-black/50 transition-all flex items-center justify-center">
                          <span className="text-white text-sm font-medium opacity-0 hover:opacity-100 transition-opacity">
                            Change Image
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            clearImage();
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center text-gray-400">
                        <ImagePlus className="w-10 h-10 mb-2" />
                        <span className="text-sm font-medium">
                          Click to upload background
                        </span>
                        <div className="text-xs mt-2 text-center space-y-1">
                          <p className="font-semibold text-gray-600">
                            Image Requirements:
                          </p>
                          <p>• Recommended: 1920×1080px (16:9)</p>
                          <p>• Minimum: 1280×720px</p>
                          <p>• Max file size: 5MB</p>
                          <p>• Formats: JPG, PNG, WebP</p>
                          <p>• Auto-optimization enabled</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. India's #1 Learning Platform"
                      value={formState.badge || ""}
                      onChange={(e) =>
                        setFormState({ ...formState, badge: e.target.value })
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Order/Position (0, 1, 2...)
                    </label>
                    <input
                      type="number"
                      required
                      value={formState.order || 0}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          order: Number(e.target.value),
                        })
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Main Title
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Learn with Joy & Excellence"
                    value={formState.title || ""}
                    onChange={(e) =>
                      setFormState({ ...formState, title: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Title Highlights (comma separated)
                  </label>
                  <p className="text-xs text-gray-500 mb-1">
                    Words in the title that should be colored yellow
                  </p>
                  <input
                    type="text"
                    placeholder="Joy, Excellence"
                    value={highlightsInput}
                    onChange={(e) => setHighlightsInput(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formState.desc || ""}
                    onChange={(e) =>
                      setFormState({ ...formState, desc: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex justify-end space-x-3 mt-6 border-t pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Slide"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
