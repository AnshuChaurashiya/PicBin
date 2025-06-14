const cloudinary = require('cloudinary').v2;
const ImageModel = require('../models/ImageUrl.model'); // Make sure file name matches
const UserModel = require('../models/User_Models');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.uploadImage = async (req, res) => {
  try {
    const file = req.file.path;
    const result = await cloudinary.uploader.upload(file, {
      folder: 'user_uploads',
      transformation: [
        { quality: "auto" },
        { fetch_format: "auto" }
      ]
    });

    // Save image data to DB
    const imageDoc = await ImageModel.create({
      originalImage: result.secure_url,
      enhancedImageUrl: result.secure_url, // You can update this if enhancement applied
      uploadedBy: req.user._id
    });

    // Optional: Track upload count or image list in user profile
    await UserModel.findByIdAndUpdate(req.user._id, {
      $inc: { imageUploadCount: 1 }
    });

    res.status(201).json({
      message: "Image uploaded successfully",
      data: imageDoc
    });
  } catch (err) {
    console.error("Image upload error:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};


exports.getMyImages = async (req, res) => {
    const images = await ImageModel.find({ uploadedBy: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ count: images.length, images });
  };

exports.detletImages = async (req, res) => {
  try {
    const { imageId } = req.params;
    
    // Find the image first to get the Cloudinary URL
    const image = await ImageModel.findOne({ 
      _id: imageId,
      uploadedBy: req.user._id 
    });

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Extract public_id from Cloudinary URL
    const publicId = image.originalImage.split('/').slice(-1)[0].split('.')[0];

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Delete from database
    await ImageModel.findByIdAndDelete(imageId);

    // Update user's upload count
    await UserModel.findByIdAndUpdate(req.user._id, {
      $inc: { imageUploadCount: -1 }
    });

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (err) {
    console.error("Image deletion error:", err);
    res.status(500).json({ message: "Deletion failed", error: err.message });
  }
};
  