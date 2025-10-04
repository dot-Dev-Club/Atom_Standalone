import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Upload, Grid, ArrowLeft } from 'lucide-react';
import ImageUpload from './ImageUpload';
import { getGalleryImages } from '@/utils/dataService';

// Default gallery images from assets
const defaultGalleryImages = [
  '/src/assets/PHOTOS/1000040131.jpg',
  '/src/assets/PHOTOS/1000040149.jpg',
  '/src/assets/PHOTOS/1000040167.jpg',
  '/src/assets/PHOTOS/IMG_9452.jpg',
  '/src/assets/PHOTOS/IMG_20250902_094947838.jpg',
  '/src/assets/PHOTOS/IMG_20250902_095043160.jpg',
  '/src/assets/PHOTOS/IMG_20250902_095256976.jpg',
  '/src/assets/PHOTOS/IMG_20250902_095520986.jpg',
  '/src/assets/PHOTOS/IMG_20250902_095546359.jpg',
  '/src/assets/PHOTOS/IMG_20250902_103850197.jpg',
  '/src/assets/PHOTOS/IMG_20250902_104029210.jpg',
  '/src/assets/PHOTOS/IMG_20250902_104102851.jpg',
  '/src/assets/PHOTOS/IMG_20250902_104155194.jpg',
  '/src/assets/PHOTOS/IMG_20250902_104340841.jpg',
  '/src/assets/PHOTOS/IMG_20250902_104419689.jpg',
  '/src/assets/PHOTOS/IMG_20250902_104439233.jpg',
  '/src/assets/PHOTOS/IMG_20250902_104459009.jpg',
  '/src/assets/PHOTOS/IMG_20250902_104634043.jpg',
  '/src/assets/PHOTOS/IMG_20250902_104654023.jpg',
  '/src/assets/PHOTOS/IMG_20250902_104710298.jpg',
  '/src/assets/PHOTOS/IMG_20250902_104839305.jpg',
  '/src/assets/PHOTOS/IMG_20250902_104926951.jpg',
  '/src/assets/PHOTOS/IMG_20250902_105120442.jpg',
  '/src/assets/PHOTOS/IMG_20250902_105151695.jpg',
  '/src/assets/PHOTOS/IMG_20250902_105415430.jpg',
  '/src/assets/PHOTOS/IMG_20250902_153839440.jpg',
  '/src/assets/PHOTOS/IMG_20250902_154406240.jpg',
  '/src/assets/PHOTOS/IMG_20250902_155659059.jpg',
  '/src/assets/PHOTOS/SAVE_20250903_211046.jpg'
];

interface GalleryManagerProps {
  onBackToDashboard: () => void;
}

const GalleryManager: React.FC<GalleryManagerProps> = ({ onBackToDashboard }) => {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  useEffect(() => {
    // Load gallery from localStorage or defaults
    const images = getGalleryImages();
    setGalleryImages(images);
  }, []);

  const handleImagesUploaded = (newImages: string[]) => {
    const updatedGallery = [...galleryImages, ...newImages];
    setGalleryImages(updatedGallery);
    localStorage.setItem('cms_gallery', JSON.stringify(updatedGallery));
  };

  const handleRemoveImage = (index: number) => {
    const updatedGallery = galleryImages.filter((_, i) => i !== index);
    setGalleryImages(updatedGallery);
    localStorage.setItem('cms_gallery', JSON.stringify(updatedGallery));
  };

  return (
    <div className="space-y-4">
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBackToDashboard}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <div className="text-sm text-gray-600">
          Total Images: {galleryImages.length}
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Gallery Management</h2>
        <p className="text-gray-600 text-sm">Manage your website's photo gallery</p>
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload Images
          </TabsTrigger>
          <TabsTrigger value="manage" className="flex items-center gap-2">
            <Grid className="w-4 h-4" />
            Manage Gallery
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-cyan-600" />
                Upload New Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                onImagesUploaded={handleImagesUploaded}
                maxFiles={20}
                maxSizeMB={10}
                existingImages={[]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Grid className="w-5 h-5 text-cyan-600" />
                Gallery Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                onImagesUploaded={handleImagesUploaded}
                existingImages={galleryImages}
                onRemoveExisting={handleRemoveImage}
                maxFiles={50}
                maxSizeMB={10}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GalleryManager;
