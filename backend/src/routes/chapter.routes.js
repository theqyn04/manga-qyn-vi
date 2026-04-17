const express = require('express');
const router = express.Router();
const { uploadDisk } = require('../configs/cloudinary');
const chapterController = require('../controllers/chapter.controller');

// GET danh sách chương của 1 truyện
router.get('/manga/:mangaId', chapterController.getChaptersByManga);

// GET chi tiết 1 chương
router.get('/:id', chapterController.getChapterDetail);

// POST tạo chương mới
router.post(
    '/', 
    uploadDisk.array('images', 50), // Cho phép tối đa 50 file với key 'images'
    chapterController.createChapter
);

module.exports = router;