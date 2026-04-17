const chapterService = require('../services/chapter.service');

exports.createChapter = async (req, res) => {
    try {
        // req.body chứa: mangaId, chapterNumber, title...
        // req.files chứa mảng các file đã upload thành công
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