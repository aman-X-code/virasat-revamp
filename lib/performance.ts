// Simple performance monitoring for the event website
// This helps track page load times and identify performance issues

interface PerformanceMetrics {
  pageLoadTime: number;
  domContentLoaded: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
}

export function trackPagePerformance(): PerformanceMetrics {
  if (typeof window === 'undefined') {
    return { pageLoadTime: 0, domContentLoaded: 0 };
  }

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paintEntries = performance.getEntriesByType('paint');
  
  const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
  const lcp = performance.getEntriesByType('largest-contentful-paint')[0];

  return {
    pageLoadTime: navigation ? navigation.loadEventEnd - navigation.fetchStart : 0,
    domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.fetchStart : 0,
    firstContentfulPaint: fcp ? fcp.startTime : undefined,
    largestContentfulPaint: lcp ? lcp.startTime : undefined,
  };
}

export function logPerformanceMetrics(pageName: string) {
  if (process.env.NODE_ENV === 'development') {
    const metrics = trackPagePerformance();
    // Performance metrics logged for ${pageName}
  }
}

// Track Core Web Vitals
export function trackWebVitals() {
  if (typeof window === 'undefined') return;

  // Track Largest Contentful Paint
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            const lcp = entry.startTime;
            if (process.env.NODE_ENV === 'development') {
              // LCP tracked
            }
          }
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
      // Silently fail if PerformanceObserver is not supported
    }
  }
}
