import React, { useState, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Upload,
  X,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  FileImage,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface ImageUploadProps {
  onImagesUploaded: (images: string[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  acceptedTypes?: string[];
  existingImages?: string[];
  onRemoveExisting?: (index: number) => void;
}

interface UploadedFile {
  file: File;
  preview: string;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImagesUploaded,
  maxFiles = 10,
  maxSizeMB = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  existingImages = [],
  onRemoveExisting
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `Invalid file type. Accepted: ${acceptedTypes.join(', ')}`;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `File too large. Max size: ${maxSizeMB}MB`;
    }
    return null;
  };

  const processFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        // Compress/resize image if needed (basic implementation)
        resolve(result);
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => !validateFile(file));

    if (validFiles.length === 0) {
      toast.error('No valid files selected');
      return;
    }

    if (uploadedFiles.length + validFiles.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`);
      return;
    }

    setIsUploading(true);

    const newUploadedFiles: UploadedFile[] = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      status: 'uploading' as const
    }));

    setUploadedFiles(prev => [...prev, ...newUploadedFiles]);

    // Process files
    const processedImages: string[] = [];

    for (let i = 0; i < newUploadedFiles.length; i++) {
      const uploadedFile = newUploadedFiles[i];
      try {
        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 50));
          setUploadedFiles(prev =>
            prev.map(f =>
              f.file === uploadedFile.file
                ? { ...f, progress }
                : f
            )
          );
        }

        const processedImage = await processFile(uploadedFile.file);
        processedImages.push(processedImage);

        setUploadedFiles(prev =>
          prev.map(f =>
            f.file === uploadedFile.file
              ? { ...f, status: 'success' as const, progress: 100 }
              : f
          )
        );
      } catch (error) {
        setUploadedFiles(prev =>
          prev.map(f =>
            f.file === uploadedFile.file
              ? {
                  ...f,
                  status: 'error' as const,
                  error: error instanceof Error ? error.message : 'Upload failed'
                }
              : f
          )
        );
      }
    }

    setIsUploading(false);
    if (processedImages.length > 0) {
      onImagesUploaded(processedImages);
      toast.success(`Successfully uploaded ${processedImages.length} image(s)`);
    }
  }, [uploadedFiles, maxFiles, onImagesUploaded]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  }, [handleFiles]);

  const removeFile = (index: number) => {
    setUploadedFiles(prev => {
      const newFiles = [...prev];
      const removed = newFiles.splice(index, 1)[0];
      URL.revokeObjectURL(removed.preview);
      return newFiles;
    });
  };

  const removeExistingImage = (index: number) => {
    if (onRemoveExisting) {
      onRemoveExisting(index);
      toast.success('Image removed');
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <Card
        className={`border-2 border-dashed transition-all duration-300 ${
          isDragOver
            ? 'border-cyan-400 bg-cyan-50/50'
            : 'border-gray-300 hover:border-cyan-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardContent className="p-8">
          <div className="text-center">
            <motion.div
              animate={{
                scale: isDragOver ? 1.1 : 1,
                rotate: isDragOver ? 5 : 0
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mx-auto w-16 h-16 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mb-4"
            >
              <Upload className={`w-8 h-8 ${isDragOver ? 'text-cyan-600' : 'text-gray-400'}`} />
            </motion.div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {isDragOver ? 'Drop images here' : 'Upload Images'}
            </h3>

            <p className="text-gray-600 mb-4">
              Drag and drop images here, or click to browse
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <Badge variant="secondary">JPEG</Badge>
              <Badge variant="secondary">PNG</Badge>
              <Badge variant="secondary">WebP</Badge>
              <Badge variant="secondary">GIF</Badge>
              <Badge variant="outline">Max {maxSizeMB}MB each</Badge>
            </div>

            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              <FileImage className="w-4 h-4 mr-2" />
              Choose Files
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={acceptedTypes.join(',')}
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>

      {/* Upload Progress */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <h4 className="text-sm font-medium text-gray-700">Upload Progress</h4>
            {uploadedFiles.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-10 h-10 bg-white rounded border overflow-hidden">
                  <img
                    src={file.preview}
                    alt={file.file.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>

                  {file.status === 'uploading' && (
                    <div className="mt-2">
                      <Progress value={file.progress} className="h-1" />
                      <p className="text-xs text-gray-600 mt-1">{file.progress}%</p>
                    </div>
                  )}

                  {file.status === 'error' && (
                    <Alert className="mt-2 border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-700 text-xs">
                        {file.error}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {file.status === 'success' && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  {file.status === 'error' && (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Existing Images */}
      {existingImages.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Existing Images</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {existingImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group"
              >
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`Existing ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/src/assets/placeholder.svg';
                    }}
                  />
                </div>
                {onRemoveExisting && (
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeExistingImage(index)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
