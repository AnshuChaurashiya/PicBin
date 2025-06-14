const express = require('express');
const router = express.Router();
const { uploadImage, getMyImages, detletImages } = require('../controller/ImageController');
const upload = require('../middleware/uploadMiddleware');
const  authUser  = require('../middleware/auth');

router.post('/upload', authUser.authUser, upload.single('file'), uploadImage);
router.get('/my-uploads', authUser.authUser, getMyImages);
router.delete('/delete/:imageId', authUser.authUser, detletImages);

module.exports = router;
