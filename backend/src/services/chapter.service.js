const Chapter = require('../models/Chapter');

exports.createChapter = async (chapterData, files) => {
    if (!files || files.length === 0) {
        throw new Error("Vui lòng upload các trang truyện.");
    }

    // 1. Sắp xếp file theo tên để đảm bảo đúng thứ tự trang (1.jpg, 2.jpg...)
    const sortedFiles = files.sort((a, b) => 
        a.originalname.localeCompare(b.originalname, undefined, { numeric: true })
    );

    const images = [];
    const seenFiles = new Set();

    // 2. Lọc trùng lặp dựa trên tên file và kích thước
    for (const file of sortedFiles) {
        const fileIdentifier = `${file.originalname}-${file.size}`;
        
        if (!seenFiles.has(fileIdentifier)) {
            images.push({
                url: file.path,
                cloudinary_id: file.filename
            });
            seenFiles.add(fileIdentifier);
        } else {
            // Tùy chọn: Bạn có thể log ra để biết file nào bị trùng
            console.log(`Bỏ qua file trùng: ${file.originalname}`);
        }
    }

    // 3. Kiểm tra logic: Một Manga không nên có 2 Chapter trùng số (chapterNumber)
    const existingChapter = await Chapter.findOne({
        mangaId: chapterData.mangaId,
        chapterNumber: chapterData.chapterNumber
    });

    if (existingChapter) {
        throw new Error(`Chapter ${chapterData.chapterNumber} của bộ truyện này đã tồn tại.`);
    }

    return await Chapter.create({
        ...chapterData,
        images: images
    });
};