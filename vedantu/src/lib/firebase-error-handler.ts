// Suppress Firebase installation errors globally
if (typeof window !== "undefined") {
  // Store original console methods
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  // Override console.error to filter out Firebase installation errors
  console.error = (...args) => {
    const errorString = args.join(" ").toLowerCase();

    // Filter out Firebase installation errors completely
    if (
      errorString.includes("installations/app-offline") ||
      errorString.includes("firebaseerror: installations") ||
      errorString.includes("could not process request. application offline") ||
      errorString.includes("firebase installations")
    ) {
      // Completely suppress these errors
      return;
    }

    // Log other errors normally
    originalConsoleError.apply(console, args);
  };

  // Also filter warnings
  console.warn = (...args) => {
    const warnString = args.join(" ").toLowerCase();

    // Filter out Firebase installation warnings
    if (
      warnString.includes("installations/app-offline") ||
      warnString.includes("firebaseerror: installations") ||
      warnString.includes("could not process request. application offline") ||
      warnString.includes("firebase installations")
    ) {
      // Completely suppress these warnings
      return;
    }

    // Log other warnings normally
    originalConsoleWarn.apply(console, args);
  };

  // Handle unhandled promise rejections related to Firebase
  window.addEventListener("unhandledrejection", (event) => {
    const reasonString = event.reason?.message?.toLowerCase() || "";

    if (
      reasonString.includes("installations/app-offline") ||
      reasonString.includes("firebaseerror: installations") ||
      reasonString.includes("could not process request. application offline")
    ) {
      // Prevent the error from showing
      event.preventDefault();
      return;
    }
  });

  // Handle window.onerror for Firebase errors
  window.onerror = (...args) => {
    const message = args[0];
    const messageString = message?.toString().toLowerCase() || "";

    if (
      messageString.includes("installations/app-offline") ||
      messageString.includes("firebaseerror: installations") ||
      messageString.includes("could not process request. application offline")
    ) {
      // Return true to prevent the default error handling
      return true;
    }

    // Return false to let the default error handling continue
    return false;
  };
}

export {};
