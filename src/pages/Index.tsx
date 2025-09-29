import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Achievements } from '@/components/Achievements';
import { Coordinators } from '@/components/Coordinators';
import { Clubs } from '@/components/Clubs';
import { Contact } from '@/components/Contact'
import PhotoGallerySection from '@/components/PhotoGallerySection';
import { ThreeDBackground } from '@/components/ThreeDBackground';
import { useImageProtection } from '@/hooks/useImageProtection';
import { 
  PerformanceProvider, 
  CriticalResourcePreloader, 
  PerformanceMonitor,
  performanceUtils 
} from '@/utils/performanceOptimization';
import { createLazySection } from '@/utils/lazyLoading';
import React from 'react';

// Create lazy-loaded sections for better performance
const LazyAchievements = createLazySection(
  () => import('@/components/Achievements').then(module => ({ default: module.Achievements })),
  'Achievements'
);

const LazyPhotoGallery = createLazySection(
  () => import('@/components/PhotoGallerySection').then(module => ({ default: module.default })),
  'Photo Gallery'
);

const LazyCoordinators = createLazySection(
  () => import('@/components/Coordinators').then(module => ({ default: module.Coordinators })),
  'Coordinators'
);

const LazyClubs = createLazySection(
  () => import('@/components/Clubs').then(module => ({ default: module.Clubs })),
  'Clubs'
);

const LazyContact = createLazySection(
  () => import('@/components/Contact').then(module => ({ default: module.Contact })),
  'Contact'
);

const LazyThreeDBackground = createLazySection(
  () => import('@/components/ThreeDBackground').then(module => ({ default: module.ThreeDBackground })),
  '3D Background'
);

const Index = () => {
  // Enable comprehensive image protection
  useImageProtection({
    disableRightClick: true,
    disableDrag: true,
    disableSelect: true,
    disablePrintScreen: true,
    disableDevTools: true,
    showWarningOnRightClick: true,
  });

  // Preload critical sections on hover
  const preloadSections = React.useCallback(() => {
    (LazyAchievements as any).preload?.();
    (LazyPhotoGallery as any).preload?.();
    (LazyCoordinators as any).preload?.();
  }, []);

  React.useEffect(() => {
    // Preload critical sections after initial render
    const timer = setTimeout(preloadSections, 2000);
    return () => clearTimeout(timer);
  }, [preloadSections]);

  return (
    <PerformanceProvider>
      <PerformanceMonitor />
      <CriticalResourcePreloader
        fonts={[
          // Add any critical fonts here
        ]}
        images={[
          // Add any critical images here
          '/src/assets/atom-logo.png',
          '/src/assets/hero-background.jpg'
        ]}
      />
      
      <main className="min-h-screen bg-background overflow-x-hidden">
        {/* Critical above-the-fold content - loaded immediately */}
        <Hero />
        <About />
        
        {/* Container for sections with 3D background */}
        <div className="relative">
          {/* 3D Background only for the sections below - lazy loaded */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <LazyThreeDBackground />
          </div>
          
          {/* Content sections with relative positioning - lazy loaded */}
          <div className="relative z-10">
            <LazyAchievements />
            <LazyPhotoGallery />
            <LazyCoordinators />
            <LazyClubs />
            <LazyContact />
          </div>
        </div>
      </main>
    </PerformanceProvider>
  );
};

export default Index;
