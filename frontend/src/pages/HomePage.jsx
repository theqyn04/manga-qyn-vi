import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const res = await axios.get('http://localhost:5000/');
        setMangas(res.data.data);
      } catch (err) {
        console.error("Lỗi lấy dữ liệu:", err);
      }
    };
    fetchMangas();
  }, []);

  return (
    <div className="bg-[#1a1a1a] min-h-screen text-[#ccc] font-sans">
      {/* Header đen đặc trưng */}
      <header className="bg-[#222] border-b border-[#333] sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-[#ebebeb] text-2xl font-black tracking-tighter cursor-pointer">
              TRUYEN<span className="text-[#ffd43b]">QQ</span>
            </h1>
            <nav className="hidden lg:flex gap-6 text-sm font-semibold uppercase">
              <a href="#" className="hover:text-white">Hot</a>
              <a href="#" className="hover:text-white">Mới cập nhật</a>
              <a href="#" className="hover:text-white">Con gái</a>
              <a href="#" className="hover:text-white">Con trai</a>
            </nav>
          </div>
          <div className="relative w-1/3 hidden md:block">
            <input 
              type="text" 
              placeholder="Tìm kiếm..." 
              className="w-full bg-[#333] text-sm px-4 py-2 rounded focus:outline-none border border-transparent focus:border-[#ffd43b]"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-4 border-b border-[#333] pb-2">
          <h2 className="text-[#ffd43b] text-lg font-bold uppercase flex items-center gap-2">
            <span className="w-1 h-5 bg-[#ffd43b] inline-block"></span>
            Truyện mới cập nhật
          </h2>
          <a href="#" className="text-xs hover:text-white italic">Xem tất cả {">"}</a>
        </div>

        {/* Grid Manga - Sát với bản gốc nhất */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
          {mangas.map((manga) => (
            <Link to={`/manga/${manga._id}`} key={manga._id} className="relative group cursor-pointer">
              {/* Ảnh bìa */}
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-lg border border-[#333]">
                <img 
                  src={manga.thumbnail} 
                  alt={manga.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Overlay Lượt xem & Tim ở chân ảnh */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 flex justify-between text-[10px] text-white">
                  <span className="flex items-center gap-1">👁 12.5k</span>
                  <span className="flex items-center gap-1">❤ 1.2k</span>
                </div>
              </div>

              {/* Thông tin dưới ảnh */}
              <div className="mt-2 text-center">
                <h3 className="text-[14px] font-bold text-[#ebebeb] leading-tight line-clamp-2 group-hover:text-[#ffd43b] transition-colors">
                  {manga.title}
                </h3>
                {/* Hiển thị chương mới nhất */}
                <div className="mt-1">
                  <span className="text-[12px] text-[#999] hover:text-[#ffd43b]">Chương 100</span>
                </div>
              </div>
              </Link>
            
            
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;