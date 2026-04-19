const Manga = require('../models/Manga');
const Chapter = require('../models/Chapter');
const { deleteImage } = require('../configs/cloudinary');

exports.queryMangas = async (query) => {
    const { page = 1, limit = 10, search, genre, sort } = query;
    const filter = {};

    if (search) filter.title = { $regex: search, $options: 'i' };
    if (genre) filter.genres = genre;

    const skip = (page - 1) * limit;
    let sortQuery = { createdAt: -1 };
    if (sort === 'oldest') sortQuery = { createdAt: 1 };
    if (sort === 'az') sortQuery = { title: 1 };

    const mangas = await Manga.find(filter)
        .sort(sortQuery)
        .limit(Number(limit))
        .skip(skip);

    const total = await Manga.countDocuments(filter);

    return {
        mangas,
        pagination: {
            total,
            currentPage: Number(page),
            totalPages: Math.ceil(total / limit)
        }
    };
};

exports.searchMangas = async (query) => {
    const { q, page = 1, limit = 10 } = query;
    
    // Khóa điều kiện: Không có q thì không trả về data
    if (!q || q.trim() === "") {
        return { mangas: [], pagination: { total: 0, currentPage: 1, totalPages: 0 } };
    }

    const filter = {
        title: { $regex: q.trim(), $options: 'i' }
    };

    const skip = (page - 1) * limit;
    const mangas = await Manga.find(filter)
        .limit(Number(limit))
        .skip(skip)
        .sort({ createdAt: -1 });

    const total = await Manga.countDocuments(filter);

    return {
        mangas,
        pagination: { total, currentPage: Number(page), totalPages: Math.ceil(total / limit) }
    };
};


// UPDATE: Cập nhật thông tin
exports.updateManga = async (id, updateData, file) => {
    const manga = await Manga.findById(id);
    if (!manga) return null;

    // Nếu có upload ảnh mới
    if (file) {
        // 1. Xóa ảnh cũ trên Cloudinary
        if (manga.cloudinary_id) {
            await deleteImage(manga.cloudinary_id);
        }
        // 2. Cập nhật thông tin ảnh mới
        updateData.thumbnail = file.path;
        updateData.cloudinary_id = file.filename;
    }

    if (updateData.genres) {
        updateData.genres = updateData.genres.split(',').map(g => g.trim());
    }

    return await Manga.findByIdAndUpdate(id, updateData, { new: true });
};

// DELETE: Xóa truyện
exports.deleteManga = async (id) => {
    const manga = await Manga.findById(id);
    if (!manga) return null;

    // Xóa ảnh trên Cloudinary trước
    if (manga.cloudinary_id) {
        await deleteImage(manga.cloudinary_id);
    }

    return await Manga.findByIdAndDelete(id);
};


exports.getMangaDetail = async (id) => {
    // 1. Tìm thông tin truyện
    const manga = await Manga.findById(id).lean(); // .lean() để trả về JS object thuần, chạy nhanh hơn
    if (!manga) return null;

    // 2. Lấy danh sách chapter liên quan
    const chapters = await Chapter.find({ mangaId: id })
        .select('chapterNumber title createdAt') // Chỉ lấy các trường cần thiết để giảm tải data
        .sort({ chapterNumber: -1 }); // Chương mới nhất lên đầu

    return {
        ...manga,
        chapters
    };
};