import React, { useState } from 'react';
import { useImage } from '../context/ImageContext';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');
  const { 
    uploadedImages, 
    loading, 
    loadingImages, 
    uploadImage, 
    deleteImage, 
    copyImageUrl 
  } = useImage();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const imageUrl = await uploadImage(selectedFile);
      if (imageUrl) {
        // Clear the form
        setSelectedFile(null);
        setPreview('');
      }
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div className="p-3">
        <div className="max-w-4xl mx-auto">
          {/* Upload Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Upload Your Image</h1>
            
            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors duration-200">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="cursor-pointer block"
              >
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <svg
                      className="w-16 h-16 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <div className="text-gray-600">
                    <p className="text-lg font-medium">Click to select an image</p>
                    <p className="text-sm mt-2">or drag and drop</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    Supports: JPG, PNG, GIF, WEBP (max 5MB)
                  </p>
                </div>
              </label>
            </div>

            {/* Preview Area */}
            {preview && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Preview</h2>
                <div className="relative rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-64 object-contain"
                  />
                </div>
                <button
                  onClick={handleUpload}
                  disabled={loading}
                  className={`mt-4 w-full py-3 px-6 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Uploading...' : 'Upload Image'}
                </button>
              </div>
            )}
          </div>

          {/* Uploaded Images Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Uploaded Images</h2>
            
            {loadingImages ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading your images...</p>
              </div>
            ) : uploadedImages.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No images uploaded yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...uploadedImages]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by most recent
  .slice(0, 3).map((image) => (
                  <div key={image._id} className="relative group">
                    <div className="aspect-w-16 aspect-h-9 border-gray-200 shadow-2xs border rounded-xl overflow-hidden">
                      <img
                        src={image.originalImage}
                        alt="Uploaded"
                        className="w-full h-full md:h-[150px] object-cover md:object-contain bg-white"
                      />
                    </div>
                    <div className="absolute inset-0  backdrop-blur-sm   bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => copyImageUrl(image.originalImage)}
                          className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                          title="Copy URL"
                        >
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteImage(image._id)}
                          className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                          title="Delete image"
                        >
                          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
