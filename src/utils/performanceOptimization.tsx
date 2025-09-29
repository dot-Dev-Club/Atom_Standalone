import React from 'react';

// Performance configuration
export const performanceConfig = {
  // Image optimization settings
  images: {
    lazyLoad: true,
    webpSupport: true,
    avifSupport: true,
    quality: 85,
    blur: true,
    placeholder: 'blur', // 'blur' | 'skeleton' | 'none'
  },
  
  // Code splitting settings
  codeSplitting: {
    routeLevel: true,
    componentLevel: true,
    vendorChunks: true,
    preloadCritical: true,
  },
  
  // Performance monitoring
  monitoring: {
    enabled: process.env.NODE_ENV === 'production',
    reportInterval: 30000, // 30 seconds
    vitals: ['FCP', 'LCP', 'FID', 'CLS', 'TTFB'],
  },
  
  // Bundle optimization
  bundle: {
    compression: true,
    treeshaking: true,
    minification: true,
    modernBuild: true,
  }
};

// Performance provider context
const PerformanceContext = React.createContext({
  config: performanceConfig,
  isOptimized: false,
});

// Performance provider component
export const PerformanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOptimized, setIsOptimized] = React.useState(false);
  
  React.useEffect(() => {
    // Set optimization flag based on browser capabilities
    const checkOptimizationSupport = async () => {
      // Check WebP support
      const webpSupported = await new Promise<boolean>(resolve => {
        const webp = new Image();
        webp.onload = webp.onerror = () => resolve(webp.height === 2);
        webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
      });
      
      const intersectionObserverSupported = 'IntersectionObserver' in window;
      
      setIsOptimized(webpSupported && intersectionObserverSupported);
    };

    checkOptimizationSupport();
  }, []);

  const value = {
    config: performanceConfig,
    isOptimized,
  };

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  );
};

// Hook to use performance context
export const usePerformance = () => {
  const context = React.useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};

// Optimized image component
export const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}> = (props) => {
  const { config } = usePerformance();
  
  if (!config.images.lazyLoad || props.priority) {
    // For critical images, load immediately
    return <img {...props} loading={props.priority ? 'eager' : 'lazy'} />;
  }
  
  // Use basic lazy loading for now
  return <img {...props} loading="lazy" />;
};

// Performance utilities
export const performanceUtils = {
  // Preload critical resources
  preloadCriticalResources: (resources: string[]) => {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      
      // Determine resource type
      if (resource.match(/\.(woff2?|ttf|otf)$/)) {
        link.as = 'font';
        link.type = resource.includes('.woff2') ? 'font/woff2' : 'font/woff';
        link.crossOrigin = 'anonymous';
      } else if (resource.match(/\.(css)$/)) {
        link.as = 'style';
      } else if (resource.match(/\.(js)$/)) {
        link.as = 'script';
      } else if (resource.match(/\.(jpg|jpeg|png|webp|avif)$/)) {
        link.as = 'image';
      }
      
      document.head.appendChild(link);
    });
  },

  // Prefetch non-critical resources
  prefetchResources: (resources: string[]) => {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = resource;
      document.head.appendChild(link);
    });
  },

  // Check browser support for modern features
  checkBrowserSupport: async () => {
    const webpSupported = await new Promise<boolean>(resolve => {
      const webp = new Image();
      webp.onload = webp.onerror = () => resolve(webp.height === 2);
      webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });

    const avifSupported = await new Promise<boolean>(resolve => {
      const avif = new Image();
      avif.onload = avif.onerror = () => resolve(avif.height === 2);
      avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    });

    return {
      webp: webpSupported,
      avif: avifSupported,
      intersectionObserver: 'IntersectionObserver' in window,
      serviceWorker: 'serviceWorker' in navigator,
      modernJS: 'noModule' in HTMLScriptElement.prototype,
    };
  },

  // Bundle size monitoring
  logBundleInfo: async () => {
    if (process.env.NODE_ENV === 'development') {
      console.group('📦 Bundle Information');
      console.log('Build mode:', process.env.NODE_ENV);
      console.log('Timestamp:', new Date().toISOString());
      
      const support = await performanceUtils.checkBrowserSupport();
      
      Object.entries(support).forEach(([feature, supported]) => {
        const label = feature.charAt(0).toUpperCase() + feature.slice(1).replace(/([A-Z])/g, ' $1');
        console.log(`${label}:`, supported ? '✅' : '❌');
      });
      
      console.groupEnd();
    }
  },

  // Simple performance measurement
  measurePerformance: () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
      };
    }
    return null;
  },
};

// Critical resource preloader component
export const CriticalResourcePreloader: React.FC<{
  fonts?: string[];
  images?: string[];
  styles?: string[];
  scripts?: string[];
}> = ({ fonts = [], images = [], styles = [], scripts = [] }) => {
  React.useEffect(() => {
    const allResources = [...fonts, ...images, ...styles, ...scripts];
    if (allResources.length > 0) {
      performanceUtils.preloadCriticalResources(allResources);
    }
  }, [fonts, images, styles, scripts]);

  return null;
};

// Performance monitoring component
export const PerformanceMonitor: React.FC = () => {
  React.useEffect(() => {
    const logPerformance = () => {
      const metrics = performanceUtils.measurePerformance();
      if (metrics) {
        console.group('🚀 Performance Metrics');
        console.log('DOM Content Loaded:', metrics.domContentLoaded.toFixed(2), 'ms');
        console.log('Load Complete:', metrics.loadComplete.toFixed(2), 'ms');
        console.log('First Paint:', metrics.firstPaint.toFixed(2), 'ms');
        console.log('First Contentful Paint:', metrics.firstContentfulPaint.toFixed(2), 'ms');
        console.groupEnd();
      }
    };

    // Log performance after page load
    if (document.readyState === 'complete') {
      setTimeout(logPerformance, 100);
    } else {
      window.addEventListener('load', () => setTimeout(logPerformance, 100));
    }

    // Log browser support
    performanceUtils.logBundleInfo();
  }, []);

  return null;
};