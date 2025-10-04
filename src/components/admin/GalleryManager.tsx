import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

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

const GalleryManager: React.FC = () => {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    // Load gallery from localStorage or defaults
    const stored = localStorage.getItem('cms_gallery');
    if (stored) {
      setGalleryImages(JSON.parse(stored));
    } else {
      setGalleryImages(defaultGalleryImages);
    }
  }, []);

  const saveGallery = (newGallery: string[]) => {
    setGalleryImages(newGallery);
    localStorage.setItem('cms_gallery', JSON.stringify(newGallery));
  };

  const handleAddImage = () => {
    if (!newImageUrl.trim()) {
      toast.error('Please enter an image URL');
      return;
    }

    if (galleryImages.includes(newImageUrl.trim())) {
      toast.error('Image URL already exists');
      return;
    }

    const newGallery = [...galleryImages, newImageUrl.trim()];
    saveGallery(newGallery);
    setNewImageUrl('');
    toast.success('Image added successfully');
  };

  const handleRemoveImage = (index: number) => {
    const newGallery = galleryImages.filter((_, i) => i !== index);
    saveGallery(newGallery);
    toast.success('Image removed successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="flex-1">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            placeholder="Enter image URL"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddImage()}
          />
        </div>
        <div className="flex items-end">
          <Button onClick={handleAddImage}>
            <Plus className="h-4 w-4 mr-2" />
            Add Image
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Gallery Images ({galleryImages.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {galleryImages.map((imageUrl, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={imageUrl}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/src/assets/placeholder.svg';
                  }}
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => handleRemoveImage(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <CardContent className="p-2">
                <p className="text-xs text-gray-500 truncate">{imageUrl}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryManager;
