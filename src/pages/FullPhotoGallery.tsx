import React from "react";
import PhotoGallery from "../components/PhotoGallery";

const images = Object.values(
  import.meta.glob("../assets/PHOTOS/*.{jpg,jpeg,png,gif}", { eager: true, query: "?url", import: "default" })
);

const FullPhotoGallery = () => {
  return (
    <main className="min-h-screen bg-background">
      <h1 className="text-4xl font-bold text-center my-8">Event Gallery</h1>
      <PhotoGallery photos={images} />
    </main>
  );
};

export default FullPhotoGallery;
