import React, { useRef, useEffect } from 'react';

interface ProtectedImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  onContextMenu?: (e: React.MouseEvent) => void;
  draggable?: boolean;
}

export const ProtectedImage: React.FC<ProtectedImageProps> = ({
  src,
  alt = '',
  className = '',
  style = {},
  onContextMenu,
  draggable = false,
  ...props
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    const canvas = canvasRef.current;

    if (!img || !canvas) return;

    const handleImageLoad = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas dimensions to match image
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      // Draw image to canvas
      ctx.drawImage(img, 0, 0);

      // Add watermark overlay (optional)
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = '#0B63FF';
      ctx.font = '48px Arial';
      ctx.fillText('ATOM CLUB', canvas.width / 4, canvas.height / 2);
      ctx.globalAlpha = 1;

      // Hide the original image
      img.style.display = 'none';
    };

    img.addEventListener('load', handleImageLoad);

    return () => {
      img.removeEventListener('load', handleImageLoad);
    };
  }, [src]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onContextMenu) {
      onContextMenu(e);
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleSelectStart = (e: Event) => {
    e.preventDefault();
  };

  useEffect(() => {
    const handleGlobalSelectStart = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener('selectstart', handleGlobalSelectStart);
    
    return () => {
      document.removeEventListener('selectstart', handleGlobalSelectStart);
    };
  }, []);

  return (
    <div 
      className={`relative select-none ${className}`}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        ...style
      }}
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
    >
      {/* Hidden original image for canvas rendering */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={{ display: 'none' }}
        draggable={false}
      />
      
      {/* Canvas that displays the image */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          touchAction: 'none',
        }}
        draggable={false}
        {...props}
      />
      
      {/* Invisible overlay to prevent right-click on canvas */}
      <div 
        className="absolute inset-0 bg-transparent"
        onContextMenu={handleContextMenu}
        onDragStart={handleDragStart}
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          touchAction: 'none',
        }}
      />
    </div>
  );
};