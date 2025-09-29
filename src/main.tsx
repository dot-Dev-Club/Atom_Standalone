import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/image-protection.css";
import { performanceUtils } from "./utils/performanceOptimization.tsx";

// Log bundle information and performance metrics
performanceUtils.logBundleInfo();

// Performance monitoring
if (typeof window !== 'undefined') {
  // Monitor Core Web Vitals
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'largest-contentful-paint') {
        console.log('LCP:', entry.startTime);
      }
      if (entry.entryType === 'first-input') {
        const fidEntry = entry as any;
        console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
      }
      if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
        console.log('CLS:', (entry as any).value);
      }
    });
  });

  try {
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
  } catch (e) {
    // Fallback for browsers that don't support these entry types
    console.log('Performance Observer not fully supported');
  }

  // Report initial performance metrics
  window.addEventListener('load', () => {
    setTimeout(() => {
      const metrics = performanceUtils.measurePerformance();
      if (metrics) {
        console.group('🚀 Initial Load Performance');
        console.log('DOM Content Loaded:', metrics.domContentLoaded.toFixed(2), 'ms');
        console.log('Load Complete:', metrics.loadComplete.toFixed(2), 'ms');
        console.log('First Paint:', metrics.firstPaint.toFixed(2), 'ms');
        console.log('First Contentful Paint:', metrics.firstContentfulPaint.toFixed(2), 'ms');
        console.groupEnd();
      }
    }, 0);
  });
}

createRoot(document.getElementById("root")!).render(<App />);
