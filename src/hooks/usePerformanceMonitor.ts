import { useEffect } from 'react';

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

export const usePerformanceMonitor = (enabled: boolean = false) => {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const metrics: Partial<PerformanceMetrics> = {};

    // Measure First Contentful Paint (FCP)
    const measureFCP = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          metrics.fcp = fcpEntry.startTime;
          console.log('🎨 First Contentful Paint:', fcpEntry.startTime.toFixed(2), 'ms');
        }
      });
      observer.observe({ entryTypes: ['paint'] });
    };

    // Measure Largest Contentful Paint (LCP)
    const measureLCP = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        metrics.lcp = lastEntry.startTime;
        console.log('🖼️ Largest Contentful Paint:', lastEntry.startTime.toFixed(2), 'ms');
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    };

    // Measure First Input Delay (FID)
    const measureFID = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: PerformanceEventTiming) => {
          metrics.fid = entry.processingStart - entry.startTime;
          console.log('⚡ First Input Delay:', metrics.fid.toFixed(2), 'ms');
        });
      });
      observer.observe({ entryTypes: ['first-input'] });
    };

    // Measure Cumulative Layout Shift (CLS)
    const measureCLS = () => {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: PerformanceEntry & { hadRecentInput?: boolean; value?: number }) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        metrics.cls = clsValue;
        console.log('📏 Cumulative Layout Shift:', clsValue.toFixed(4));
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    };

    // Measure Time to First Byte (TTFB)
    const measureTTFB = () => {
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navigationEntries.length > 0) {
        const navEntry = navigationEntries[0];
        metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
        console.log('🌐 Time to First Byte:', metrics.ttfb.toFixed(2), 'ms');
      }
    };

    // Memory usage (if available)
    const measureMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as Performance & { memory?: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
        console.log('💾 Memory Usage:', {
          used: (memory.usedJSHeapSize / 1024 / 1024).toFixed(2) + ' MB',
          total: (memory.totalJSHeapSize / 1024 / 1024).toFixed(2) + ' MB',
          limit: (memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2) + ' MB',
        });
      }
    };

    // Bundle size analysis
    const analyzeBundleSize = () => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      let totalSize = 0;
      let jsSize = 0;
      let cssSize = 0;
      let imageSize = 0;

      resources.forEach((resource) => {
        const size = resource.transferSize || 0;
        totalSize += size;

        if (resource.name.includes('.js')) jsSize += size;
        else if (resource.name.includes('.css')) cssSize += size;
        else if (resource.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) imageSize += size;
      });

      console.log('📦 Bundle Analysis:', {
        total: (totalSize / 1024).toFixed(2) + ' KB',
        javascript: (jsSize / 1024).toFixed(2) + ' KB',
        css: (cssSize / 1024).toFixed(2) + ' KB',
        images: (imageSize / 1024).toFixed(2) + ' KB',
      });
    };

    // Page load performance
    const measurePageLoad = () => {
      window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log('⏱️ Page Load Time:', loadTime.toFixed(2), 'ms');
        
        // Analyze loading performance
        setTimeout(() => {
          measureTTFB();
          analyzeBundleSize();
          measureMemory();
          
          // Overall performance score
          const score = calculatePerformanceScore(metrics);
          console.log('🏆 Performance Score:', score);
        }, 1000);
      });
    };

    // Calculate performance score (0-100)
    const calculatePerformanceScore = (metrics: Partial<PerformanceMetrics>) => {
      let score = 100;
      
      // FCP scoring (good < 1.8s, needs improvement < 3s, poor >= 3s)
      if (metrics.fcp) {
        if (metrics.fcp > 3000) score -= 20;
        else if (metrics.fcp > 1800) score -= 10;
      }
      
      // LCP scoring (good < 2.5s, needs improvement < 4s, poor >= 4s)
      if (metrics.lcp) {
        if (metrics.lcp > 4000) score -= 25;
        else if (metrics.lcp > 2500) score -= 15;
      }
      
      // FID scoring (good < 100ms, needs improvement < 300ms, poor >= 300ms)
      if (metrics.fid) {
        if (metrics.fid > 300) score -= 20;
        else if (metrics.fid > 100) score -= 10;
      }
      
      // CLS scoring (good < 0.1, needs improvement < 0.25, poor >= 0.25)
      if (metrics.cls) {
        if (metrics.cls > 0.25) score -= 20;
        else if (metrics.cls > 0.1) score -= 10;
      }
      
      return Math.max(0, score);
    };

    // Start monitoring
    measureFCP();
    measureLCP();
    measureFID();
    measureCLS();
    measurePageLoad();

    // Cleanup function
    return () => {
      // Performance observers are automatically cleaned up
      console.log('🔧 Performance monitoring stopped');
    };
  }, [enabled]);
};

// React component wrapper
export const PerformanceMonitor: React.FC<{ enabled?: boolean }> = ({ 
  enabled = process.env.NODE_ENV === 'development' 
}) => {
  usePerformanceMonitor(enabled);
  return null;
};