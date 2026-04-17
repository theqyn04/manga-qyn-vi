const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  mangaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga', index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, trim: true },
  replies: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);