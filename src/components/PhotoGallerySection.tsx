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
    <section className="min-h-screen bg-background flex flex-col justify-center items-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
      >
        Event Gallery
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {previewPhotos.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Event ${idx + 1}`}
            className="w-full h-64 object-cover rounded-lg shadow-md border border-gray-200"
            style={{ background: '#f3f4f6' }}
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-8">
        <button
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full text-white font-semibold transition-transform transform hover:scale-105 shadow-lg text-lg"
          onClick={() => navigate("/full-gallery")}
        >
          View More
        </button>
      </div>
    </section>
  );
}

export default PhotoGallerySection;