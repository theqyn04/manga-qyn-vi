const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  mangaId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Manga', 
    required: true,
    index: true 
  },
  chapterNumber: { type: Number, required: true },
  chapterTitle: { type: String },
  pages: [{ type: String }], // Mảng các URL ảnh (ví dụ: page1.jpg, page2.jpg)
}, { timestamps: true });

// Đảm bảo trong 1 truyện không có 2 chương trùng số
chapterSchema.index({ mangaId: 1, chapterNumber: 1 }, { unique: true });

module.exports = mongoose.model('Chapter', chapterSchema);