'use client';
import { useEffect } from 'react';
import { incrementVisitorCount } from '@/lib/firestore/analytics';

export default function VisitorCounter() {
  useEffect(() => {
    // "Perfect" Visitor Count Logic: Daily Unique Visitor per Browser
    // 1. Get today's date string (e.g., "2024-02-14")
    const today = new Date().toISOString().split('T')[0];
    const storageKey = `visited_${today}`;

    // 2. Check if this browser has already been counted *today*
    const hasVisitedToday = localStorage.getItem(storageKey);

    if (!hasVisitedToday) {
      // 3. If not, increment the counter in the database
      incrementVisitorCount();
      
      // 4. Mark this browser as visited for today
      localStorage.setItem(storageKey, 'true');
    }
  }, []);
  
  return null;
}
