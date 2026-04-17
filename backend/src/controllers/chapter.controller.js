const chapterService = require('../services/chapter.service');

exports.getChaptersByManga = async (req, res) => {
  try {
    const { mangaId } = req.params;
    const chapters = await chapterService.getChaptersByMangaId(mangaId);

    res.status(200).json({
      success: true,
      data: chapters
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getChapterDetail = async (req, res) => {
  try {
    const chapter = await chapterService.getChapterById(req.params.id);
    res.status(200).json({ success: true, data: chapter });
  } catch (error) {
    const status = error.message === "Không tìm thấy chương này" ? 404 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};

exports.createChapter = async (req, res) => {
    try {
        const chapter = await chapterService.createChapter(req.body, req.files);

        res.status(201).json({
            success: true,
            message: "Tạo Chapter thành công!",
            data: chapter
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};