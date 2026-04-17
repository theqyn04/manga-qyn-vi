const express = require('express');
const router = express.Router();
const { uploadCloud } = require('../configs/cloudinary');
const { getAllManga , getMangaById , createManga , updateManga , deleteManga } = require('../controllers/manga.controller');

// GET 
router.get('/', getAllManga);

// GET /:id
router.get('/:id', getMangaById);

// POST - Tạo mới một bộ truyện, bao gồm upload ảnh bìa lên Cloudinary
router.post('/', (req, res, next) => {
  uploadCloud.single('thumbnail')(req, res, (err) => {
    if (err) {
      // Nếu có lỗi lúc upload (sai key, sai định dạng, Cloudinary từ chối...)
      console.error("MULTER ERROR:", err);
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
}, createManga);


// Sử dụng PATCH cho update để cập nhật từng phần
router.patch('/:id', uploadCloud.single('thumbnail'), updateManga);

// Sử dụng DELETE cho xóa
router.delete('/:id', deleteManga);


module.exports = router;