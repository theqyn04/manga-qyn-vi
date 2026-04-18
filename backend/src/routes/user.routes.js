const express = require('express');
const userController = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// Route cho Bookmark
router.post('/bookmark', protect, userController.handleBookmark);

// Route cập nhật lịch sử (Thường gọi API này khi User click vào 1 chương truyện)
router.post('/history', protect, userController.trackHistory);

module.exports = router;