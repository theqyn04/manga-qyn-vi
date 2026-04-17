const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  mangaId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Manga', 
    required: true,
    index: true 
  },
  chapterNumber: { 
    type: Number, 
    required: true 
  },
  title: { 
    type: String,
    trim: true // Tự động xóa khoảng trắng thừa
  },
  images: [{ 
    type: String,
    required: true 
  }], 
}, { 
  timestamps: true,
  // Tự động sắp xếp theo chapterNumber tăng dần khi query
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index này rất quan trọng: Giúp tìm kiếm chương cực nhanh và tránh trùng số chương trong 1 bộ truyện
chapterSchema.index({ mangaId: 1, chapterNumber: 1 }, { unique: true });

module.exports = mongoose.model('Chapter', chapterSchema);