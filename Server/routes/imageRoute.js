const express = require('express');
const router = express.Router();
const { uploadImage, getMyImages, detletImages } = require('../controller/ImageController');
const upload = require('../middleware/uploadMiddleware');
const authUser = require('../middleware/Auth');

router.post('/upload', authUser, upload.single('file'), uploadImage);
router.get('/my-uploads', authUser, getMyImages);
router.delete('/delete/:imageId', authUser, detletImages);

module.exports = router;
