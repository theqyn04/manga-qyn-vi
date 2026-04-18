const userService = require('../services/user.service');

exports.handleBookmark = async (req, res) => {
  try {
    const { mangaId } = req.body;
    if (!mangaId) return res.status(400).json({ message: 'Thiếu ID truyện' });

    const result = await userService.toggleBookmark(req.user.id, mangaId);
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.trackHistory = async (req, res) => {
  try {
    const { mangaId, chapterId, chapterNumber } = req.body;
    
    if (!mangaId || !chapterId) {
      return res.status(400).json({ message: 'Thông tin lịch sử không đầy đủ' });
    }

    const latestHistory = await userService.updateReadingHistory(req.user.id, {
      mangaId,
      chapterId,
      chapterNumber
    });

    res.status(200).json({ success: true, data: latestHistory });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};