const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Import Routes
const mangaRoutes = require('./routes/manga.routes');
const chapterRoutes = require('./routes/chapter.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// 1. MIDDLEWARES BẢO MẬT & LOGGING
app.use(helmet()); 
app.use(morgan('dev')); 
app.use(cors());

// 2. GIẢI MÃ DỮ LIỆU
// Tăng limit nếu bạn upload nhiều ảnh cùng lúc để tránh lỗi 413 Payload Too Large
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ extended: true, limit: '50mb' })); 

// 3. ĐỊNH NGHĨA ROUTES
// Chia prefix rõ ràng để dễ quản lý API versioning sau này
app.use('/', mangaRoutes);
app.use('/chapters', chapterRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// 4. XỬ LÝ ROUTE KHÔNG TỒN TẠI (404)
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'API Endpoint không tồn tại. Vui lòng kiểm tra lại URL.'
    });
});

// 5. XỬ LÝ LỖI TẬP TRUNG (GLOBAL ERROR HANDLER)
app.use((err, req, res, next) => {
    console.error('>>> GLOBAL ERROR:', err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message, // Trả về message lỗi thật để debug trên Postman
        stack: process.env.NODE_ENV === 'development' ? err.stack : {} 
    });
    // Nếu là lỗi của Multer (ví dụ: quá dung lượng, sai định dạng)
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'File quá lớn!' });
    }

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Lỗi hệ thống nội bộ'
    });
});

module.exports = app;