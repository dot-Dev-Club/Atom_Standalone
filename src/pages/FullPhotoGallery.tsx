import React, { useState } from "react";
import PhotoGallery from "../components/PhotoGallery";

const images = Object.values(
  import.meta.glob("../assets/PHOTOS/*.{jpg,jpeg,png,gif}", { eager: true, query: "?url", import: "default" })
);

const FullPhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <main className="min-h-screen bg-background">
      <h1 className="text-4xl font-bold text-center my-8">Event Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src as string} // Cast to string
            alt={`Event ${idx + 1}`}
            className="w-full h-64 object-cover rounded-lg shadow-md border border-gray-200 cursor-pointer"
            onClick={() => handleImageClick(src as string)} // Cast to string
          />
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected Event"
              className="max-w-full max-h-screen rounded-lg shadow-lg"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-white text-black rounded-full p-2 shadow-md w-10 h-10 flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default FullPhotoGallery;