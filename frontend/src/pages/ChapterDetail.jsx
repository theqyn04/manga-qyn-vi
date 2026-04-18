import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChapterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        setLoading(true);
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

  if (loading) return <div className="bg-notion-white min-h-screen flex items-center justify-center text-notion-gray500 font-medium">Đang tải trang...</div>;
  if (!chapter) return <div className="bg-notion-white min-h-screen flex items-center justify-center text-notion-gray500">Dữ liệu chương không khả dụng.</div>;

  return (
    <div className="bg-notion-warmWhite min-h-screen text-notion-black antialiased font-sans">
      {/* Notion-Style Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-notion-border">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(`/manga/${chapter.mangaId}`)}
              className="text-notion-gray500 hover:text-notion-black transition-colors text-sm flex items-center gap-1"
            >
              <span>←</span> <span className="hidden sm:inline">Quay lại</span>
            </button>
            <div className="w-[1px] h-4 bg-notion-border"></div>
            <h1 className="text-[14px] font-bold tracking-tight line-clamp-1">
              {chapter.mangaTitle || 'Đang đọc'} — Chương {chapter.chapterNumber}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Đây là nơi đặt Dropdown chọn chương nhanh nếu bạn muốn mở rộng sau này */}
            <span className="text-[12px] font-bold text-notion-gray300 uppercase tracking-widest bg-notion-warmWhite px-2 py-1 rounded">
              Long Strip
            </span>
          </div>
        </div>
      </header>

      {/* Main Reader - Focus Mode */}
      <main className="max-w-[800px] mx-auto bg-white shadow-notion notion-strip min-h-screen">
        {chapter.images && chapter.images.length > 0 ? (
          chapter.images.map((url, index) => (
            <img 
              key={index} 
              src={url} 
              alt={`Trang ${index + 1}`} 
              loading="lazy" 
              className="border-b border-notion-border/10"
            />
          ))
        ) : (
          <div className="py-40 text-center text-notion-gray300 italic">
            Chưa có hình ảnh cho chương này.
          </div>
        )}
      </main>
      
      {/* Footer Navigation - Minimalist Card */}
      <footer className="py-24 bg-notion-warmWhite text-center px-6">
        <div className="max-w-[400px] mx-auto bg-white p-8 rounded-[12px] border border-notion-border shadow-notion">
          <p className="text-notion-gray500 text-[15px] mb-6">
            Bạn đã đọc xong <span className="font-bold text-notion-black">Chương {chapter.chapterNumber}</span>
          </p>
          <div className="flex flex-col gap-3">
            <button className="bg-notion-blue text-white px-6 py-2.5 rounded-[4px] font-bold hover:bg-notion-blueActive transition-all">
              Chương tiếp theo →
            </button>
            <Link 
              to={`/manga/${chapter.mangaId}`}
              className="text-notion-gray300 hover:text-notion-gray500 text-[14px] font-medium transition-colors"
            >
              Trở về danh mục truyện
            </Link>
          </div>
        </div>
        <p className="mt-12 text-[12px] text-notion-gray300">© 2026 MangaQyn — Minimalist Reader Mode</p>
      </footer>
    </div>
  );
};

export default ChapterDetail;