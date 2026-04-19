import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MangaCard from '../components/MangaCard';
import RecommendedSidebar from '../components/RecommendedSidebar';

const HomePage = () => {
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const res = await axios.get('http://localhost:5000/');
        setMangas(res.data.data);
      } catch (err) {
        console.error("Lỗi:", err);
      }
    };
    fetchMangas();
  }, []);

  // Lọc lấy 7 truyện đầu tiên làm truyện phổ biến (Mô phỏng slider)
  const popularMangas = mangas.slice(0, 7);

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* 1. TRUYỆN PHỔ BIẾN */}
      <section className="max-w-[1200px] mx-auto px-6 pt-10 pb-12">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1.5 h-6 bg-notion-blue rounded-full"></div>
          <h2 className="text-[20px] font-bold text-notion-black tracking-tight">Truyện phổ biến</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {popularMangas.map((manga) => (
            <Link key={manga._id} to={`/manga/${manga._id}`} className="group block">
              <div className="aspect-[3/4] overflow-hidden rounded-lg border border-notion-border bg-[#F7F6F3] shadow-sm relative">
                <img
                  // Lưu ý: Kiểm tra chính xác tên biến ảnh từ API (thumbnail, coverImage, hay image)
                  src={manga.thumbnail || manga.coverImage || manga.image}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  alt={manga.title}
                  onError={(e) => { e.target.src = 'https://placehold.co/300x400?text=No+Image' }} // Fallback nếu ảnh lỗi
                />
              </div>
              <h3 className="mt-2 text-[13px] font-bold text-notion-black truncate leading-tight group-hover:text-notion-blue">
                {manga.title}
              </h3>
              <p className="text-[11px] text-notion-gray500 mt-1">
                {manga.latestChapter || 'Chương mới nhất'}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* MAIN LAYOUT: TRUYỆN MỚI & SIDEBAR */}
      <div className="bg-notion-warmWhite/40 border-t border-notion-border">
        <main className="max-w-[1200px] mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* 2. TRUYỆN MỚI CẬP NHẬT (Bên trái) */}
            <section className="flex-1">
              <div className="flex justify-between items-end mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-notion-orange rounded-full"></div>
                  <h2 className="text-[24px] font-bold text-notion-black tracking-tight">Truyện mới cập nhật</h2>
                </div>
                <Link to="/latest" className="text-[14px] text-notion-blue font-semibold hover:underline">
                  Xem tất cả →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {mangas.map((manga) => (
                  <MangaCard key={manga._id} manga={manga} />
                ))}
              </div>

              {/* Nút tải thêm hoặc phân trang */}
              <button className="w-full mt-10 py-3 text-[14px] font-medium text-notion-gray500 border border-notion-border rounded-lg bg-white hover:bg-notion-warmWhite transition-all active:scale-[0.98]">
                Xem thêm truyện cập nhật
              </button>
            </section>

            {/* 3. SIDEBAR (Bên phải) */}
            <aside className="w-full lg:w-[320px]">
              <RecommendedSidebar allMangas={mangas} />
            </aside>

          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;