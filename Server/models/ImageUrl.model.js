const mongoose = require('mongoose');

/**
 * Schema for storing image URLs, enhanced versions, and user ownership
 */
const ImageUrlSchema = new mongoose.Schema({
  originalImage: {
    type: String,
    required: true,
  },
  enhancedImageUrl: {
    type: String,
    required: true,
    unique: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Refers to the User model
    required: true,
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('ImageUrl', ImageUrlSchema);
