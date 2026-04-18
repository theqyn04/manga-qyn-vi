const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
    minlength: 3 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true 
  },
  password: { 
    type: String, 
    required: true,
    select: false // Không tự động trả về password khi query
  },
  avatar: { 
    type: String, 
    default: 'https://default-avatar-url.com' 
  },
  role: { 
    type: String, 
    enum: ['user', 'admin', 'moderator'], 
    default: 'user' 
  },
  
  // Danh sách ID các bộ truyện đã lưu
  bookmarks: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Manga' 
  }],

  // Lịch sử đọc chi tiết
  readingHistory: [{
    mangaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga' },
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
    chapterNumber: Number,
    updatedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

// Index để tìm kiếm lịch sử đọc nhanh hơn
userSchema.index({ "readingHistory.mangaId": 1 });

userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  const bcrypt = require('bcryptjs');
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('User', userSchema);