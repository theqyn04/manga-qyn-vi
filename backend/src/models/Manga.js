const mongoose = require('mongoose');
const slugify = require('slugify');

const mangaSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  slug: { type: String, unique: true },
  author: { type: String, default: 'Đang cập nhật' },
  description: { type: String, trim: true },
  thumbnail: { type: String, required: true }, // URL ảnh từ Cloudinary
  status: { 
    type: String, 
    enum: ['Ongoing', 'Completed', 'Dropped'], 
    default: 'Ongoing' 
  },
  genres: [{ type: String, index: true }],
  views: { type: Number, default: 0 },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  lastUpdate: { type: Date, default: Date.now }
}, { timestamps: true });


mangaSchema.pre('save', function(next) {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true, strict: true, locale: 'vi' });
    }  
});

module.exports = mongoose.model('Manga', mangaSchema);