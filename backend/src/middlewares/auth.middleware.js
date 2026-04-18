const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) return res.status(401).json({ message: 'Bạn chưa đăng nhập.' });

    // Giải mã token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Kiểm tra user còn tồn tại không
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) return res.status(401).json({ message: 'Người dùng không còn tồn tại.' });

    // Gán thông tin user vào request để dùng cho các bước sau
    req.user = currentUser;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles là một mảng: ['admin', 'moderator']
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Bạn không có quyền thực hiện hành động này.' });
    }
    next();
  };
};