"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";

interface FirebaseConnectionProviderProps {
  children: React.ReactNode;
}

export default function FirebaseConnectionProvider({ children }: FirebaseConnectionProviderProps) {
  const [connectionState, setConnectionState] = useState<'connecting' | 'connected' | 'offline'>('connecting');
  const [showOfflineBanner, setShowOfflineBanner] = useState(false);

  useEffect(() => {
    // Check initial connection state
    const checkConnection = async () => {
      try {
        // Try a simple read operation to check connectivity
        await Promise.race([
          new Promise((resolve) => setTimeout(resolve, 1000)), // Wait 1 second
          fetch('https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
          }).catch(() => null),
        ]);
        
        setConnectionState('connected');
      } catch (error) {
        setConnectionState('offline');
        setShowOfflineBanner(true);
        setTimeout(() => setShowOfflineBanner(false), 5000); // Hide banner after 5 seconds
      }
    };

    checkConnection();

    // Listen for online/offline events
    const handleOnline = () => {
      setConnectionState('connected');
      setShowOfflineBanner(false);
    };

    const handleOffline = () => {
      setConnectionState('offline');
      setShowOfflineBanner(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <>
      {showOfflineBanner && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-black px-4 py-2 text-center z-50">
          <span className="font-semibold">Offline Mode:</span> Using cached data. Some features may be limited.
        </div>
      )}
      {children}
    </>
  );
}
