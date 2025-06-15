const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadImage, getMyImages, detletImages } = require('../controller/ImageController');
const UserController = require('../controller/User_Controller');

// Upload middleware configuration
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });
 
router.post('/upload', UserController.AuthUser, upload.single('file'), uploadImage);
router.get('/my-uploads', UserController.AuthUser, getMyImages);
router.delete('/delete/:imageId', UserController.AuthUser, detletImages);

module.exports = router;
