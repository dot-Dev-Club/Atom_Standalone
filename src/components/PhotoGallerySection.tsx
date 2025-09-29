import React from "react";
import { motion } from "framer-motion";
import PhotoGallery from "./PhotoGallery";
import { useNavigate } from "react-router-dom";

// List of image URLs from public/PHOTOS
// Dynamically import all images from src/assets/PHOTOS for a clean, consistent gallery
const allImages = Object.values(
  import.meta.glob("../assets/PHOTOS/*.{jpg,jpeg,png,gif}", { eager: true, query: "?url", import: "default" })
);

const previewCount = 8;

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
            img.onload = () => resolve(img.naturalWidth > img.naturalHeight ? src : null);
            img.onerror = () => resolve(null);
          })
      )
    ).then((results) => {
      if (isMounted) setPreviewPhotos(results.filter(Boolean).slice(0, previewCount));
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
        Event Gallery
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {previewPhotos.map((src, idx) => (
          <motion.img
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            src={src}
            alt={`Event ${idx + 1}`}
            className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg shadow-md border border-gray-200 hover:scale-105 transition-transform duration-300"
            style={{ background: '#f3f4f6' }}
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-6 sm:mt-8 px-4">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full text-white font-semibold transition-all duration-300 shadow-lg text-sm sm:text-base lg:text-lg"
          onClick={() => navigate("/full-gallery")}
        >
          View More
        </motion.button>
      </div>
    </section>
  );
}

export default PhotoGallerySection;