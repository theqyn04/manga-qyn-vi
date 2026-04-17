const mangaService = require('../services/manga.service');
const Manga = require('../models/Manga');
const Chapter = require('../models/Chapter');

//Get all manga with pagination, search, filter, sort
exports.getAllManga = async (req, res) => {
    try {
        const result = await mangaService.queryMangas(req.query);
        res.status(200).json({
            success: true,
            count: result.mangas.length,
            pagination: result.pagination,
            data: result.mangas
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Tạo mới một bộ truyện, bao gồm upload ảnh bìa lên Cloudinary
exports.createManga = async (req, res) => {
    try {
        if (!req.file) throw new Error("Vui lòng upload ảnh bìa.");

        const mangaData = {
            ...req.body,
            genres: req.body.genres ? req.body.genres.split(',').map(g => g.trim()) : [],
            thumbnail: req.file.path,
            cloudinary_id: req.file.filename
        };

        const newManga = await Manga.create(mangaData);
        res.status(201).json({ success: true, data: newManga });
    } catch (error) {
        console.log("FULL ERROR LOG:", error); // Xem lỗi thật ở Terminal
    res.status(500).json({ 
        success: false, 
        message: error.message, // Trả về message thật để bạn đọc trên Postman
        errorDetails: error 
    });
    }
};


exports.updateManga = async (req, res) => {
    try {
        const updated = await mangaService.updateManga(req.params.id, req.body, req.file);
        if (!updated) return res.status(404).json({ success: false, message: "Không tìm thấy truyện" });

        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteManga = async (req, res) => {
    try {
        const deleted = await mangaService.deleteManga(req.params.id);
        if (!deleted) return res.status(404).json({ success: false, message: "Không tìm thấy truyện" });

        res.status(200).json({ success: true, message: "Xóa truyện thành công" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


exports.getMangaById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await mangaService.getMangaDetail(id);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy bộ truyện này.'
            });
        }

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        // Bắt lỗi nếu ID truyền vào sai định dạng MongoDB (CastError)
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ success: false, message: 'ID không hợp lệ.' });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};