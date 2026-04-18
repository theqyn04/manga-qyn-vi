const express = require('express');
const authController = require('../controllers/auth.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

const router = express.Router();

// Public Routes
router.post('/signup', authController.register);
router.post('/login', authController.login);

// Routes yêu cầu đăng nhập (User/Mod/Admin)
router.get('/my-bookmarks', protect, (req, res) => {
  res.json({ bookmarks: req.user.bookmarks });
});

router.delete('/delete-user/:id', protect, restrictTo('admin'), authController.deleteUser);


module.exports = router;