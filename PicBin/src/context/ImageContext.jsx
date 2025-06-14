import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const ImageContext = createContext();

export const useImage = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImage must be used within an ImageProvider');
  }
  return context;
};

export const ImageProvider = ({ children }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingImages, setLoadingImages] = useState(true);

  // Fetch user's uploaded images
  const fetchMyImages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/images/my-uploads`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      const data = await response.json();
      setUploadedImages(data.images);
    } catch (error) {
      toast.error('Failed to load images');
    } finally {
      setLoadingImages(false);
    }
  };

  // Upload new image
  const uploadImage = async (file) => {
    if (!file) {
      toast.error('Please select an image first');
      return null;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/images/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      toast.success('Image uploaded successfully!');
      // Refresh the images list
      await fetchMyImages();
      return data.data.originalImage;
    } catch (error) {
      toast.error(error.message || 'Upload failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete image
  const deleteImage = async (imageId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/images/delete/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      toast.success('Image deleted successfully');
      // Refresh the images list
      await fetchMyImages();
      return true;
    } catch (error) {
      toast.error('Failed to delete image');
      return false;
    }
  };

  // Copy image URL to clipboard
  const copyImageUrl = (url) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard!');
  };

  // Fetch images when the component mounts
  useEffect(() => {
    fetchMyImages();
  }, []);

  const value = {
    uploadedImages,
    loading,
    loadingImages,
    uploadImage,
    deleteImage,
    copyImageUrl,
    fetchMyImages
  };

  return (
    <ImageContext.Provider value={value}>
      {children}
    </ImageContext.Provider>
  );
};

export default ImageContext; 