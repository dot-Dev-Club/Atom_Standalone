import React, { Suspense, lazy, ComponentType } from 'react';
import { motion } from 'framer-motion';

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <motion.div
      className="w-8 h-8 border-2 border-blue-200 border-t-blue-500 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
    <span className="ml-3 text-sm text-gray-600">Loading...</span>
  </div>
);

// Error boundary for lazy components
class LazyComponentErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ComponentType }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Lazy component loading error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const Fallback = this.props.fallback || (() => (
        <div className="p-4 text-center text-red-600">
          Failed to load component. Please refresh the page.
        </div>
      ));
      return <Fallback />;
    }

    return this.props.children;
  }
}

// HOC for lazy loading components with enhanced features
export const createLazyComponent = <T extends ComponentType<any>>(


  importFunc: () => Promise<{ default: T }>,
  options: {
    fallback?: React.ComponentType;
    errorBoundary?: boolean;
    preload?: boolean;
    delay?: number;
  } = {}
) => {
  const {
    fallback: FallbackComponent = LoadingSpinner,
    errorBoundary = true,
    preload = false,
    delay = 0
  } = options;

  // Create lazy component
  const LazyComponent = lazy(() => {
    if (delay > 0) {
      return new Promise<{ default: T }>(resolve => {
        setTimeout(() => {
          importFunc().then(resolve);
        }, delay);
      });
    }
    return importFunc();
  });

  // Preload function
  const preloadComponent = () => {
    importFunc().catch(console.error);
  };

  // If preload is enabled, start loading immediately
  if (preload) {
    preloadComponent();
  }

  // Wrapped component
  const WrappedComponent = (props: React.ComponentProps<T>) => {
    const content = (
      <Suspense fallback={<FallbackComponent />}>
        <LazyComponent {...props} />
      </Suspense>
    );

    if (errorBoundary) {
      return (
        <LazyComponentErrorBoundary fallback={FallbackComponent}>
          {content}
        </LazyComponentErrorBoundary>
      );
    }

    return content;
  };

  // Attach preload method to component
  (WrappedComponent as any).preload = preloadComponent;

  return WrappedComponent;
};

// Utility for route-based code splitting
export const createLazyRoute = (
  importFunc: () => Promise<{ default: ComponentType<any> }>,
  preload = false
) => {
  return createLazyComponent(importFunc, {
    fallback: () => (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <p className="text-gray-600">Loading page...</p>
        </motion.div>
      </div>
    ),
    preload,
  });
};

// Hook for preloading components on hover/interaction
export const usePreloadOnHover = (preloadFn: () => void) => {
  const handleMouseEnter = React.useCallback(() => {
    preloadFn();
  }, [preloadFn]);

  return { onMouseEnter: handleMouseEnter };
};

// Component for preloading multiple components
export const ComponentPreloader: React.FC<{
  components: Array<{ preload: () => void }>;
  trigger?: 'mount' | 'idle' | 'visible';
  delay?: number;
}> = ({ components, trigger = 'mount', delay = 0 }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const preloadComponents = () => {
      setTimeout(() => {
        components.forEach(component => {
          if (component.preload) {
            component.preload();
          }
        });
      }, delay);
    };

    switch (trigger) {
      case 'mount':
        preloadComponents();
        break;
      
      case 'idle':
        if ('requestIdleCallback' in window) {
          requestIdleCallback(preloadComponents);
        } else {
          setTimeout(preloadComponents, 100);
        }
        break;
      
      case 'visible': {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !isVisible) {
              setIsVisible(true);
              preloadComponents();
              observer.disconnect();
            }
          },
          { threshold: 0.1 }
        );
        
        if (ref.current) {
          observer.observe(ref.current);
        }
        
        return () => observer.disconnect();
      }
    }
  }, [components, trigger, delay, isVisible]);

  if (trigger === 'visible') {
    return <div ref={ref} style={{ height: 1, width: 1 }} />;
  }

  return null;
};

// Utility for creating lazy-loaded sections
export const createLazySection = (
  importFunc: () => Promise<{ default: ComponentType<any> }>,
  sectionName: string
) => {
  return createLazyComponent(importFunc, {
    fallback: () => (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[200px] flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            className="w-8 h-8 border-2 border-blue-200 border-t-blue-500 rounded-full mx-auto mb-3"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <p className="text-sm text-gray-600">Loading {sectionName}...</p>
        </div>
      </motion.div>
    ),
    errorBoundary: true,
  });
};