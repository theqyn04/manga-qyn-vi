import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MangaCard from '../components/MangaCard';

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

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-24 text-center px-6 border-b border-notion-border/50">
        <h1 className="text-[56px] md:text-[72px] font-bold tracking-tight leading-[1.1] mb-6">
          Đọc truyện, <span className="text-notion-blue">tinh tế</span> hơn.
        </h1>
        <p className="text-notion-gray500 text-[20px] max-w-[700px] mx-auto leading-relaxed">
          Không gian đọc truyện tối giản, tập trung vào nội dung và sự thoải mái cho đôi mắt.
        </p>
      </section>

      {/* Main Content */}
      <main className="bg-notion-warmWhite py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-[32px] font-bold tracking-tight mb-2">Truyện mới cập nhật</h2>
              <p className="text-notion-gray500">Cập nhật mỗi ngày từ các nguồn uy tín.</p>
            </div>
            <Link to="#" className="text-notion-blue font-semibold hover:underline">Xem tất cả →</Link>
          </div>

          {/* 2. Sử dụng MangaCard trong grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {mangas.map((manga) => (
              <MangaCard key={manga._id} manga={manga} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;