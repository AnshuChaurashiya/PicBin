import React, { useState } from 'react';
import { useImage } from '../context/ImageContext';

const AllImages = () => {
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

      const handleUpload = async () => {
        if(selectedFile) {
            const imageUrl = await uploadImage(selectedFile);
            if (imageUrl) {
                // Clear the form
                setSelectedFile(null);
                setPreview('');
              }
        }
      }

      const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
          setSelectedFile(file);
          const previewUrl = URL.createObjectURL(file);
          setPreview(previewUrl);
        }
      };


  return (
    <>
    <div className="min-h-screen  overflow-hidden  mb-20  py-8 px-4 sm:px-6 lg:px-8">
<div className="  ">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Uploaded Images</h2>
            
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
              <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
              {[...uploadedImages]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 8).map((image) => (
                <div
                  key={image._id}
                  className="break-inside-avoid group relative bg-gray-50 rounded-xl overflow-hidden transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] mb-4"
                >
                  <div className="relative border-gray-200 overflow-hidden  shadow-sm border rounded-xl overflow-hidden">
                    <img
                      src={image.originalImage}
                      alt="Uploaded"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100">
                      <div className="flex space-x-4">
                        <button
                          onClick={() => copyImageUrl(image.originalImage)}
                          className="p-3 bg-white/90 rounded-full hover:bg-white active:bg-white/80 transition-all duration-200 transform hover:scale-110 active:scale-95"
                          title="Copy URL"
                        >
                          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteImage(image._id)}
                          className="p-3 bg-white/90 rounded-full hover:bg-white active:bg-white/80 transition-all duration-200 transform hover:scale-110 active:scale-95"
                          title="Delete image"
                        >
                          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
    </div>
    </>


  )
}

export default AllImages
