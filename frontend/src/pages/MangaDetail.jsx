import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const MangaDetail = () => {
  const { id } = useParams();
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

  if (loading) return <div className="text-notion-gray500 text-center py-20 font-medium">Đang tải...</div>;
  if (!manga) return <div className="text-notion-gray500 text-center py-20 font-medium">Không tìm thấy truyện!</div>;

  return (
    <div className="bg-white min-h-screen text-notion-black antialiased font-sans">
      <div className="max-w-[1100px] mx-auto px-6 py-12">
        
        {/* Breadcrumb - Notion Style (Xám mảnh) */}
        <div className="text-[14px] mb-8 flex gap-2 items-center text-notion-gray500">
          <Link to="/" className="hover:text-notion-black transition-colors">Trang chủ</Link>
          <span className="text-notion-border">/</span>
          <span className="text-notion-black font-medium">{manga.title}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Cột trái: Ảnh bìa & Trạng thái Properties */}
          <div className="md:col-span-3">
            <div className="rounded-[12px] overflow-hidden border border-notion-border shadow-notion">
              <img 
                src={manga.thumbnail} 
                alt={manga.title} 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Properties Table - Đặc trưng của Notion */}
            <div className="mt-8 space-y-1 border-t border-notion-border pt-4">
              <div className="flex py-2 text-[14px] border-b border-notion-border/30">
                <span className="w-24 text-notion-gray500 shrink-0">👤 Tác giả</span>
                <span className="font-medium">{manga.author || 'Đang cập nhật'}</span>
              </div>
              <div className="flex py-2 text-[14px] border-b border-notion-border/30">
                <span className="w-24 text-notion-gray500 shrink-0">🟢 Trạng thái</span>
                <span className="font-medium text-notion-blue">Đang tiến hành</span>
              </div>
              <div className="flex py-2 text-[14px] border-b border-notion-border/30">
                <span className="w-24 text-notion-gray500 shrink-0">👁️ Lượt xem</span>
                <span className="font-medium">1,234,567</span>
              </div>
            </div>

            <button className="w-full mt-8 bg-notion-blue text-white font-bold py-2.5 rounded-[4px] hover:bg-notion-blueActive transition-all shadow-sm">
              ĐỌC TỪ ĐẦU
            </button>
          </div>

          {/* Cột phải: Nội dung & Danh sách chương */}
          <div className="md:col-span-9">
            <h1 className="text-[42px] font-bold text-notion-black tracking-notionSub leading-tight mb-8">
              {manga.title}
            </h1>
            
            {/* Mô tả truyện - Box trắng ấm */}
            <div className="bg-notion-warmWhite p-6 rounded-[8px] border border-notion-border mb-12">
              <h3 className="text-notion-gray500 font-bold mb-3 uppercase text-[12px] tracking-wider">Mô tả nội dung</h3>
              <p className="text-[16px] leading-[1.6] text-notion-warmDark">
                {manga.description || 'Chưa có mô tả cho bộ truyện này.'}
              </p>
            </div>

            {/* Danh sách chương - Table style */}
            <div className="mb-4 flex items-center gap-3">
              <h3 className="text-[22px] font-bold tracking-notionCard">Danh sách chương</h3>
              <span className="px-2 py-0.5 bg-notion-warmWhite border border-notion-border rounded-[4px] text-[12px] text-notion-gray500">
                {manga.chapters?.length || 0}
              </span>
            </div>

            <div className="border border-notion-border rounded-[8px] overflow-hidden shadow-sm bg-white">
              {/* Table Header */}
              <div className="grid grid-cols-12 bg-notion-warmWhite px-4 py-2 border-b border-notion-border text-[12px] font-bold text-notion-gray500 uppercase">
                <div className="col-span-9">Tên chương</div>
                <div className="col-span-3 text-right">Ngày cập nhật</div>
              </div>

              {/* Scrollable List */}
              <div className="max-h-[600px] overflow-y-auto divide-y divide-notion-border">
                {manga.chapters && manga.chapters.length > 0 ? (
                  manga.chapters.map((chapter) => (
                    <Link 
                      key={chapter._id} 
                      to={`/chapter/${chapter._id}`}
                      className="grid grid-cols-12 px-4 py-3 hover:bg-notion-warmWhite transition-colors items-center group"
                    >
                      <div className="col-span-9 text-[15px] font-medium text-notion-black group-hover:text-notion-blue transition-colors">
                        Chương {chapter.chapterNumber}{chapter.title ? `: ${chapter.title}` : ''}
                      </div>
                      <div className="col-span-3 text-right text-[13px] text-notion-gray300">
                        {new Date(chapter.createdAt).toLocaleDateString('vi-VN')}
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-8 text-center text-notion-gray300 italic text-[14px]">
                    Dữ liệu chương đang được cập nhật...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-20 border-t border-notion-border text-center">
        <p className="text-notion-gray300 text-[14px]">© 2026 MangaQyn — Minimalist Experience</p>
      </footer>
    </div>
  );
};

export default MangaDetail;