'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Plus, Check } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CategoryDropdownProps {
  value: string;
  onChange: (value: string) => void;
  categories?: string[];
}

const DEFAULT_CATEGORIES = ['Vegetable', 'Fruit', 'Leafy', 'Superfood', 'Spices', 'Grains'];

export default function CategoryDropdown({ value, onChange, categories = DEFAULT_CATEGORIES }: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCategories = categories.filter(cat => 
    cat.toLowerCase().includes(search.toLowerCase())
  );

  const showCreateOption = search && !categories.some(cat => cat.toLowerCase() === search.toLowerCase());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (category: string) => {
    onChange(category);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-base font-bold text-gray-800 mb-2">
        Inventory Category
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full px-5 py-4 bg-gray-50 border rounded-2xl flex items-center justify-between transition-all duration-300",
          isOpen ? "border-forest ring-4 ring-forest/10 bg-white" : "border-gray-200 hover:border-gray-300"
        )}
      >
        <span className={cn("text-lg", value ? "text-forest font-bold" : "text-gray-400 font-medium")}>
          {value || 'Select a category'}
        </span>
        <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 origin-top">
          <div className="p-4 border-b border-gray-50">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search or create category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent focus:border-forest/20 rounded-xl outline-none text-sm font-medium transition-all"
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto p-2">
            {filteredCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleSelect(cat)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-forest/5 text-left transition-colors group"
              >
                <span className={cn(
                  "text-sm font-bold transition-colors",
                  value === cat ? "text-forest" : "text-gray-700 group-hover:text-forest"
                )}>
                  {cat}
                </span>
                {value === cat && <Check className="w-4 h-4 text-forest" />}
              </button>
            ))}

            {showCreateOption && (
              <button
                type="button"
                onClick={() => handleSelect(search)}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-gold/5 hover:bg-gold/10 text-gold transition-colors mt-2"
              >
                <div className="p-1 bg-gold/20 rounded-md">
                  <Plus className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black uppercase tracking-widest opacity-60">Create New</p>
                  <p className="text-sm font-bold">"{search}"</p>
                </div>
              </button>
            )}

            {filteredCategories.length === 0 && !showCreateOption && (
              <div className="p-8 text-center">
                <p className="text-sm text-gray-400 font-medium tracking-tight">No categories found</p>
              </div>
            )}
          </div>
          
          <div className="p-3 bg-gray-50/50 border-t border-gray-50">
            <p className="text-[10px] text-center font-black text-gray-400 uppercase tracking-widest">
              Standard Inventory Tags
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
