import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const MangaDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL: /manga/:id
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMangaDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/${id}`);
        setManga(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi lấy chi tiết truyện:", err);
        setLoading(false);
      }
    };
    fetchMangaDetail();
  }, [id]);

  if (loading) return <div className="text-white text-center py-10">Đang tải...</div>;
  if (!manga) return <div className="text-white text-center py-10">Không tìm thấy truyện!</div>;

  return (
    <div className="bg-[#1a1a1a] min-h-screen text-[#ccc]">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb - Giống TruyenQQ */}
        <div className="text-xs mb-4 flex gap-2 items-center text-gray-500">
          <Link to="/" className="hover:text-[#ffd43b]">Trang chủ</Link>
          <span>/</span>
          <span className="text-gray-300">{manga.title}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Cột trái: Ảnh bìa & Trạng thái */}
          <div className="md:col-span-1">
            <img 
              src={manga.thumbnail} 
              alt={manga.title} 
              className="w-full rounded shadow-lg border border-[#333]"
            />
            <div className="mt-4 space-y-2 text-sm">
              <p><strong>Tác giả:</strong> {manga.author || 'Đang cập nhật'}</p>
              <p><strong>Trạng thái:</strong> <span className="text-green-500">Đang tiến hành</span></p>
              <p><strong>Lượt xem:</strong> 1,234,567</p>
            </div>
            <button className="w-full mt-4 bg-[#ffd43b] text-black font-bold py-2 rounded hover:bg-yellow-500 transition-colors uppercase">
              Đọc từ đầu
            </button>
          </div>

          {/* Cột phải: Nội dung & Danh sách chương */}
          <div className="md:col-span-3">
            <h1 className="text-2xl font-bold text-white uppercase mb-4">{manga.title}</h1>
            
            {/* Mô tả truyện */}
            <div className="bg-[#222] p-4 rounded border border-[#333] mb-6">
              <h3 className="text-[#ffd43b] font-bold mb-2 uppercase text-sm">Nội dung</h3>
              <p className="text-sm leading-relaxed">{manga.description || 'Chưa có mô tả cho bộ truyện này.'}</p>
            </div>

            {/* Danh sách chương */}
            <div className="bg-[#222] rounded border border-[#333]">
              <div className="p-3 border-b border-[#333] flex items-center gap-2">
                <span className="text-[#ffd43b]">☰</span>
                <h3 className="font-bold uppercase text-sm">Danh sách chương</h3>
              </div>
              <div className="max-h-[500px] overflow-y-auto">
                {manga.chapters && manga.chapters.length > 0 ? (
                  manga.chapters.map((chapter) => (
                    <div key={chapter._id} className="flex justify-between p-3 border-b border-[#333] hover:bg-[#2a2a2a] text-sm">
                      <Link to={`/chapter/${chapter._id}`} className="hover:text-[#ffd43b]">
                        Chương {chapter.chapterNumber}: {chapter.title}
                      </Link>
                      <span className="text-gray-500 italic text-xs">
                        {new Date(chapter.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="p-4 text-center text-gray-500 italic">Chương đang được cập nhật...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangaDetail;