import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// List of image URLs from public/PHOTOS
// Dynamically import all images from src/assets/PHOTOS for a clean, consistent gallery
const allImages = Object.values(
  import.meta.glob("../assets/PHOTOS/*.{jpg,jpeg,png,gif,JPG,JPEG,PNG,GIF}", { eager: true, query: "?url", import: "default" })
);

// Debug logging
console.log('PhotoGallerySection: Total images found:', allImages.length);
console.log('PhotoGallerySection: First 3 images:', allImages.slice(0, 3));

const previewCount = 6; // 3×2 grid layout

const PhotoGallerySection = () => {
  const navigate = useNavigate();
  const [previewPhotos, setPreviewPhotos] = React.useState([]);

  const handleNavigateToGallery = () => {
    console.log('PhotoGallerySection: Navigating to /full-gallery');
    navigate("/full-gallery");
  };

  React.useEffect(() => {
    let isMounted = true;
    console.log('PhotoGallerySection: Starting to load images...');
    Promise.all(
      allImages.map(
        (src, idx) =>
          new Promise((resolve) => {
            const img = new window.Image();
            img.src = String(src);
            console.log(`PhotoGallerySection: Loading image ${idx + 1}/${allImages.length}:`, src);
            img.onload = () => {
              console.log(`PhotoGallerySection: ✓ Image ${idx + 1} loaded successfully`);
              resolve({ 
                src, 
                aspectRatio: img.naturalWidth / img.naturalHeight,
                width: img.naturalWidth,
                height: img.naturalHeight
              });
            };
            img.onerror = (err) => {
              console.error(`PhotoGallerySection: ✗ Image ${idx + 1} failed to load:`, src, err);
              resolve(null);
            };
          })
      )
    ).then((results) => {
      if (isMounted) {
        const validPhotos = results.filter(Boolean).slice(0, previewCount);
        console.log('PhotoGallerySection: Valid photos loaded:', validPhotos.length);
        console.log('PhotoGallerySection: Photos data:', validPhotos);
        setPreviewPhotos(validPhotos);
      }
    });
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="min-h-screen bg-background flex flex-col justify-center items-center py-12 sm:py-16 lg:py-20">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 gradient-text px-4"
      >
        Photo Gallery
      </motion.h2>
      
      {/* 3×2 Grid Gallery */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {previewPhotos.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p className="text-xl">Loading gallery images...</p>
            <p className="text-sm mt-2">Found {allImages.length} images in total</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {previewPhotos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group relative"
                whileHover={{ scale: 1.03, y: -5 }}
                onClick={handleNavigateToGallery}
              >
                <img
                  src={photo.src}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  onError={(e) => {
                    console.error('PhotoGallerySection: Image render failed:', photo.src);
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center items-center mt-8 sm:mt-12 px-4">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full text-white font-semibold transition-all duration-300 shadow-lg text-sm sm:text-base lg:text-lg hover:shadow-xl"
          onClick={handleNavigateToGallery}
        >
          View Complete Gallery
        </motion.button>
      </div>
    </section>
  );
}

export default PhotoGallerySection;