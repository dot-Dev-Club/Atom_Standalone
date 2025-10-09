// Image optimization utilities

export interface ImageOptimizationConfig {
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  width?: number;
  height?: number;
  lazy?: boolean;
  placeholder?: boolean;
}

// Generate optimized image sources
export const generateImageSources = (
  src: string, 
  config: ImageOptimizationConfig = {}
): { src: string; srcSet: string; sizes: string } => {
  const { quality = 85, format = 'webp', width, height } = config;
  
  // For static assets, we'll create different sized versions
  const baseName = src.split('.').slice(0, -1).join('.');
  const extension = src.split('.').pop();
  
  // Generate srcSet for different screen densities
  const generateSrcSet = () => {
    if (!width) return src;
    
    const sizes = [1, 1.5, 2, 3]; // 1x, 1.5x, 2x, 3x
    return sizes
      .map(scale => {
        const scaledWidth = Math.round(width * scale);
        return `${baseName}_${scaledWidth}.${format || extension} ${scale}x`;
      })
      .join(', ');
  };
  
  // Generate sizes attribute for responsive images
  const generateSizes = () => {
    if (!width) return '100vw';
    
    return [
      `(max-width: 640px) 100vw`,
      `(max-width: 768px) 50vw`,
      `(max-width: 1024px) 33vw`,
      `${width}px`
    ].join(', ');
  };
  
  return {
    src: format ? `${baseName}.${format}` : src,
    srcSet: generateSrcSet(),
    sizes: generateSizes()
  };
};

// Create placeholder blur data URL
export const createBlurDataURL = (width = 10, height = 10): string => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Create a simple gradient blur effect
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f3f4f6');
  gradient.addColorStop(0.5, '#e5e7eb');
  gradient.addColorStop(1, '#d1d5db');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL('image/jpeg', 0.1);
};

// Preload critical images
export const preloadImages = (urls: string[], priority: 'high' | 'low' = 'high'): Promise<void[]> => {
  return Promise.all(
    urls.map(url => 
      new Promise<void>((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        link.fetchPriority = priority;
        
        link.onload = () => resolve();
        link.onerror = () => reject(new Error(`Failed to preload ${url}`));
        
        document.head.appendChild(link);
      })
    )
  );
};

// Image compression utility (client-side)
export const compressImage = (
  file: File, 
  maxWidth = 1920, 
  maxHeight = 1080, 
  quality = 0.8
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Compression failed'));
        },
        'image/webp',
        quality
      );
    };
    
    img.onerror = () => reject(new Error('Image load failed'));
    img.src = URL.createObjectURL(file);
  });
};

// Intersection Observer for lazy loading
export class LazyLoadObserver {
  private observer: IntersectionObserver;
  private callbacks = new Map<Element, () => void>();
  
  constructor(options: IntersectionObserverInit = {}) {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const callback = this.callbacks.get(entry.target);
            if (callback) {
              callback();
              this.unobserve(entry.target);
            }
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
        ...options,
      }
    );
  }
  
  observe(element: Element, callback: () => void) {
    this.callbacks.set(element, callback);
    this.observer.observe(element);
  }
  
  unobserve(element: Element) {
    this.callbacks.delete(element);
    this.observer.unobserve(element);
  }
  
  disconnect() {
    this.observer.disconnect();
    this.callbacks.clear();
  }
}

// Create global lazy load observer instance
export const globalLazyObserver = new LazyLoadObserver();

// Image format detection
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

export const supportsAVIF = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const avif = new Image();
    avif.onload = avif.onerror = () => {
      resolve(avif.height === 2);
    };
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });
};

// Get optimal image format
export const getOptimalFormat = async (): Promise<'avif' | 'webp' | 'jpeg'> => {
  if (await supportsAVIF()) return 'avif';
  if (await supportsWebP()) return 'webp';
  return 'jpeg';
};