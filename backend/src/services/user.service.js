const User = require('../models/User');

class UserService {
  // --- BOOKMARK LOGIC ---
  async toggleBookmark(userId, mangaId) {
    const user = await User.findById(userId);
    if (!user) throw new Error('Người dùng không tồn tại');

    // Kiểm tra xem manga đã có trong bookmark chưa
    const isBookmarked = user.bookmarks.includes(mangaId);

    if (isBookmarked) {
      // Nếu có rồi thì xóa (Pull)
      user.bookmarks.pull(mangaId);
    } else {
      // Nếu chưa có thì thêm (Push)
      user.bookmarks.push(mangaId);
    }

    await user.save();
    return { 
      isBookmarked: !isBookmarked, 
      message: isBookmarked ? 'Đã xóa khỏi danh sách lưu' : 'Đã thêm vào danh sách lưu' 
    };
  }

  // --- READING HISTORY LOGIC ---
  async updateReadingHistory(userId, historyData) {
    const { mangaId, chapterId, chapterNumber } = historyData;
    
    // Tìm user
    const user = await User.findById(userId);
    if (!user) throw new Error('Người dùng không tồn tại');

    // 1. Tìm xem truyện này đã có trong lịch sử chưa
    const existingIndex = user.readingHistory.findIndex(
      (item) => item.mangaId.toString() === mangaId.toString()
    );

    if (existingIndex !== -1) {
      // Nếu đã có, cập nhật chương mới nhất và thời gian
      user.readingHistory[existingIndex].chapterId = chapterId;
      user.readingHistory[existingIndex].chapterNumber = chapterNumber;
      user.readingHistory[existingIndex].updatedAt = Date.now();
      
      // Đưa bản ghi này lên đầu mảng (Lịch sử mới nhất)
      const [updatedItem] = user.readingHistory.splice(existingIndex, 1);
      user.readingHistory.unshift(updatedItem);
    } else {
      // Nếu chưa có, thêm mới vào đầu mảng
      user.readingHistory.unshift({ mangaId, chapterId, chapterNumber });
    }

    // 2. Giới hạn lịch sử (Ví dụ: chỉ giữ 50 truyện gần nhất để tránh lag DB)
    if (user.readingHistory.length > 50) {
      user.readingHistory = user.readingHistory.slice(0, 50);
    }

    await user.save();
    return user.readingHistory[0];
  }
}

module.exports = new UserService();