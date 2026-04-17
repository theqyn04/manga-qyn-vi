import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ChapterDetail = () => {
  const { id } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        setLoading(true);
        // Gọi API lấy chi tiết chapter
        const res = await axios.get(`http://localhost:5000/chapters/${id}`);
        setChapter(res.data.data);
      } catch (err) {
        console.error("Lỗi FE:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchChapter();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div className="text-white text-center py-20">Đang tải ảnh...</div>;
  if (!chapter) return <div className="text-white text-center py-20">Không tìm thấy dữ liệu chương.</div>;

  return (
    <div className="bg-black min-h-screen text-gray-200">
      {/* Header điều hướng nhanh */}
      <div className="sticky top-0 z-50 bg-[#1a1a1a]/95 p-4 border-b border-gray-800 flex justify-between items-center">
        <Link to={`/manga/${chapter.mangaId}`} className="text-[#ffd43b] font-bold">
          ← Thoát
        </Link>
        <h1 className="text-sm font-semibold">Chương {chapter.chapterNumber}</h1>
        <div className="w-10"></div> {/* Giữ cân bằng layout */}
      </div>

      {/* Hiển thị danh sách ảnh - Long Strip */}
      <div className="max-w-[800px] mx-auto flex flex-col items-center">
        {chapter.images && chapter.images.length > 0 ? (
          chapter.images.map((url, index) => (
            <img 
              key={index} 
              src={url} 
              alt={`Trang ${index + 1}`} 
              className="w-full h-auto block" 
              loading="lazy" 
              // Fix lỗi ảnh bị khoảng trắng nhỏ giữa các tấm
              style={{ display: 'block' }}
            />
          ))
        ) : (
          <div className="py-20 text-gray-500">Chương này chưa có dữ liệu ảnh.</div>
        )}
      </div>
      
      {/* Footer điều hướng */}
      <div className="py-10 bg-[#1a1a1a] text-center border-t border-gray-800">
         <p className="mb-4">Bạn đã đọc xong chương {chapter.chapterNumber}</p>
         <Link 
            to={`/manga/${chapter.mangaId}`}
            className="bg-[#ffd43b] text-black px-6 py-2 rounded font-bold"
         >
            Quay lại danh sách chương
         </Link>
      </div>
    </div>
  );
};

export default ChapterDetail;