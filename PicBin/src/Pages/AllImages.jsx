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
    <div className="min-h-screen   py-8 px-4 sm:px-6 lg:px-8">
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
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {uploadedImages.map((image) => (
                  <div key={image._id} className="relative group">
                    <div className="aspect-w-16 aspect-h-9 border-gray-200 shadow-2xs border rounded-xl overflow-hidden">
                      <img
                        src={image.originalImage}
                        alt="Uploaded"
                        className="w-full h-full md:h-[200px] object-cover md:object-contain bg-white"
                      />
                    </div>
                    <div className="absolute inset-0  backdrop-blur-sm overflow-hidden bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => copyImageUrl(image.originalImage)}
                          className="p-2 bg-white cursor-pointer rounded-full hover:bg-gray-100 transition-colors"
                          title="Copy URL"
                        >
                          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteImage(image._id)}
                          className="p-2 bg-white cursor-pointer  rounded-full hover:bg-gray-100 transition-colors"
                          title="Delete image"
                        >
                          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    </>


  )
}

export default AllImages