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
  if (!files || files.length === 0) {
    throw new Error("Vui lòng upload ít nhất một ảnh cho chương!");
  }

  const { mangaId, chapterNumber, chapterTitle } = chapterData;

  try {
    const existingChapter = await Chapter.findOne({ mangaId, chapterNumber });
    if (existingChapter) throw new Error(`Chương số ${chapterNumber} đã tồn tại!`);

    // 1. Tạo danh sách các Promise upload
    const uploadPromises = files.map((file) => 
      cloudinary.uploader.upload(file.path, {
        folder: `manga-qyn/chapters/${mangaId}/ch-${chapterNumber}`,
      }).then(result => {
        // Xóa file ngay sau khi upload thành công một cái
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
        return result.secure_url;
      })
    );

    // 2. Thực thi tất cả cùng lúc
    const imageUrls = await Promise.all(uploadPromises);

    const newChapter = new Chapter({
      mangaId,
      chapterNumber,
      chapterTitle,
      images: imageUrls 
    });

    return await newChapter.save();
  } catch (error) {
    // Dọn dẹp tất cả file tạm nếu có lỗi xảy ra giữa chừng
    if (files) {
      files.forEach(f => { if (fs.existsSync(f.path)) fs.unlinkSync(f.path); });
    }
    throw error;
  }
};