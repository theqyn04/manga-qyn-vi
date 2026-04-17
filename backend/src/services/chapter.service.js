const Chapter = require('../models/Chapter');
const { cloudinary } = require('../configs/cloudinary');
const fs = require('fs');

// Logic lấy danh sách chương của 1 truyện
exports.getChaptersByMangaId = async (mangaId) => {
  return await Chapter.find({ mangaId })
    .select('chapterNumber chapterTitle createdAt')
    .sort({ chapterNumber: -1 });
};

// Logic lấy nội dung chi tiết 1 chương để đọc
exports.getChapterById = async (id) => {
  const chapter = await Chapter.findById(id);
  if (!chapter) throw new Error("Không tìm thấy chương này");
  return chapter;
};

exports.createChapter = async (chapterData, files) => {
  // Kiểm tra nếu không có file nào được gửi lên
  if (!files || files.length === 0) {
    throw new Error("Vui lòng upload ít nhất một ảnh cho chương!");
  }

  const { mangaId, chapterNumber, chapterTitle } = chapterData;

  try {
    const existingChapter = await Chapter.findOne({ mangaId, chapterNumber });
    if (existingChapter) {
      throw new Error(`Chương số ${chapterNumber} đã tồn tại!`);
    }

    const imageUrls = [];
    
    // Upload lần lượt để giữ đúng thứ tự trang truyện
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: `manga-qyn/chapters/${mangaId}/ch-${chapterNumber}`,
      });
      imageUrls.push(result.secure_url);
      
      // Xóa file ngay sau khi upload xong 1 ảnh để giải phóng bộ nhớ
      if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    }

    const newChapter = new Chapter({
      mangaId,
      chapterNumber,
      chapterTitle,
      images: imageUrls 
    });

    return await newChapter.save();
  } catch (error) {
    // Dọn dẹp nếu lỗi
    if (files) {
      files.forEach(f => { if (fs.existsSync(f.path)) fs.unlinkSync(f.path); });
    }
    throw error;
  }
};