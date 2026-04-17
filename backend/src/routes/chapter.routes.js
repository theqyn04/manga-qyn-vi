const express = require('express');
const router = express.Router();
const { uploadCloud } = require('../configs/cloudinary');
const chapterController = require('../controllers/chapter.controller');

// POST 
router.post(
    '/', 
    uploadCloud.array('images', 50), // Cho phép tối đa 50 file với key 'images'
    chapterController.createChapter
);

module.exports = router;