import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { UserContexData } from '../context/UserContex';
import { useImage } from '../context/ImageContext';
import axios from 'axios';

const UserProfile = () => {
  const { user, setUser } = React.useContext(UserContexData);
  const { uploadedImages, loadingImages, deleteImage, copyImageUrl } = useImage();

  const [isEditing, setIsEditing] = useState(false);
  const [edituserData, setedituserData] = useState({
    name: "",
    email: ""
  });

  useEffect(() => {
    if (user) {
      setedituserData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setedituserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const UserSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/user/profile/update`, edituserData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setUser(response.data);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Profile Information</h1>
              <p className="mt-1 text-sm text-gray-500">Manage your account settings and preferences</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="mt-4 sm:mt-0 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={UserSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    name="name"
                    value={edituserData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={edituserData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">Username</p>
                <p className="mt-1 text-md font-semibold text-gray-900">{user.name}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">Email</p>
                <p className="mt-1 text-md font-semibold text-gray-900">{user.email}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">Total Uploads</p>
                <p className="mt-1 text-md font-semibold text-gray-900">{uploadedImages.length}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="mt-1 text-md font-semibold text-gray-900">
                  {new Date(user.joinDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Uploaded Images Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900"> Recent Uploaded Images</h2>
              <p className="mt-1 text-sm text-gray-500">Manage your uploaded images</p>
            </div>
          </div>

          {loadingImages ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading your images...</p>
            </div>
          ) : uploadedImages.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 text-gray-400">
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="mt-4 text-gray-600">No images uploaded yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...uploadedImages]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by most recent
  .slice(0, 4).map((image) => (
                <div
                  key={image._id}
                  className="group relative bg-gray-50 rounded-xl overflow-hidden transform transition-all duration-200 hover:scale-[1.02]"
                >
                  <div className="aspect-w-16 aspect-h-9 border-gray-200 shadow-2xs border rounded-xl overflow-hidden">
                      <img
                        src={image.originalImage}
                        alt="Uploaded"
                        className="w-full h-full md:h-[150px] object-cover md:object-contain bg-white"
                      />
                    </div>
                    <div className="absolute inset-0  backdrop-blur-sm   bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => copyImageUrl(image.originalImage)}
                        className="p-2.5 bg-white rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-110"
                        title="Copy URL"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteImage(image._id)}
                        className="p-2.5 bg-white rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-110"
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
  );
};

export default UserProfile; 