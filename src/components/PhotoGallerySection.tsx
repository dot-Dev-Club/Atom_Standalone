import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// List of image URLs from public/PHOTOS
// Dynamically import all images from src/assets/PHOTOS for a clean, consistent gallery
const allImages = Object.values(
  import.meta.glob("../assets/PHOTOS/*.{jpg,jpeg,png,gif}", { eager: true, query: "?url", import: "default" })
);

const previewCount = 6; // 3×2 grid layout

const PhotoGallerySection = () => {
  const navigate = useNavigate();
  const [previewPhotos, setPreviewPhotos] = React.useState([]);

  React.useEffect(() => {
    let isMounted = true;
    Promise.all(
      allImages.map(
        (src) =>
          new Promise((resolve) => {
            const img = new window.Image();
            img.src = String(src);
            img.onload = () => resolve({ 
              src, 
              aspectRatio: img.naturalWidth / img.naturalHeight,
              width: img.naturalWidth,
              height: img.naturalHeight
            });
            img.onerror = () => resolve(null);
          })
      )
    ).then((results) => {
      if (isMounted) {
        const validPhotos = results.filter(Boolean).slice(0, previewCount);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {previewPhotos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              whileHover={{ scale: 1.03, y: -5 }}
              onClick={() => navigate("/full-gallery")}
            >
              <img
                src={photo.src}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center mt-8 sm:mt-12 px-4">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full text-white font-semibold transition-all duration-300 shadow-lg text-sm sm:text-base lg:text-lg hover:shadow-xl"
          onClick={() => navigate("/full-gallery")}
        >
          View Complete Gallery
        </motion.button>
      </div>
    </section>
  );
}

export default PhotoGallerySection;