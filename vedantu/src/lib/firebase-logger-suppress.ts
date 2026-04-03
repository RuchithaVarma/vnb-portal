// Suppress Firebase Firestore logging at the source
if (typeof window !== 'undefined') {
  // Override Firebase's internal logging before Firebase loads
  const originalDefineProperty = Object.defineProperty;
  
  // Intercept console methods before Firebase initializes
  const firebaseLogMethods = ['log', 'info', 'warn', 'error'];
  const firebaseNamespaces = ['@firebase/firestore', '@firebase/app', '@firebase/auth'];
  
  firebaseLogMethods.forEach(method => {
    const original = console[method];
    
    console[method] = (...args: any[]) => {
      const message = args.join(' ').toLowerCase();
      
      // Check if this is a Firebase log message
      const isFirebaseLog = firebaseNamespaces.some(ns => message.includes(ns)) ||
                           message.includes('firestore') ||
                           message.includes('connection failed') ||
                           message.includes('offline mode') ||
                           message.includes('code=unavailable') ||
                           message.includes('healthy internet connection') ||
                           message.includes('could not reach cloud firestore backend');
      
      // Suppress Firebase logs, allow others
      if (!isFirebaseLog) {
        original.apply(console, args);
      }
    };
  });
  
  // Also override the Firebase logger directly if it exists
  if (window.firebase) {
    originalDefineProperty(window.firebase, 'logger', {
      get: () => () => {},
      set: () => {},
      configurable: true
    });
  }
  
  // Intercept Firebase SDK initialization
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    const url = args[0];
    if (typeof url === 'string' && url.includes('firestore.googleapis.com')) {
      // Silently handle Firestore network errors
      try {
        return await originalFetch.apply(window, args);
      } catch (error) {
        // Suppress network errors for Firestore
        return new Response('{}', { status: 200, statusText: 'OK' });
      }
    }
    return originalFetch.apply(window, args);
  };
}

export {};
