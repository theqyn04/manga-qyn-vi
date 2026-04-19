import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { MANGA_CATEGORIES } from '../constants/categories';

const RecommendedSidebar = ({ allMangas = [] }) => {
  // Logic lấy ngẫu nhiên 5 truyện từ danh sách backend
  const recommendedMangas = useMemo(() => {
    if (!allMangas.length) return [];
    return [...allMangas]
      .sort(() => 0.5 - Math.random()) // Xáo trộn mảng
      .slice(0, 5); // Lấy 5 truyện đầu sau khi xáo
  }, [allMangas]);

  return (
    <div className="space-y-10">
      {/* TRUYỆN ĐỀ CỬ */}
      <section>
        <h3 className="text-[16px] font-bold text-notion-black mb-4 uppercase tracking-wider">
          Truyện đề cử
        </h3>
        <div className="space-y-4">
          {recommendedMangas.map((manga) => (
            <Link 
              key={manga._id} 
              to={`/manga/${manga._id}`} 
              className="flex gap-3 group items-start"
            >
              <div className="w-16 h-20 flex-shrink-0 rounded overflow-hidden border border-notion-border bg-notion-warmWhite">
                <img 
                  src={manga.thumbnail || manga.coverImage} 
                  alt={manga.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[13px] font-bold text-notion-black truncate group-hover:text-notion-blue transition-colors">
                  {manga.title}
                </h4>
                <p className="text-[11px] text-notion-gray500 mt-0.5">
                  Chương {manga.latestChapter?.match(/\d+/)?.[0] || '??'}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-0.5 text-orange-400">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-[11px] font-medium text-notion-black">4.8</span>
                  </div>
                  <span className="text-[11px] text-notion-gray400">• 12k views</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* THỂ LOẠI (Giữ nguyên hoặc dùng grid-cols-2 như trước) */}
      <section>
        <h3 className="text-[16px] font-bold text-notion-black mb-4 uppercase tracking-wider">
          Thể loại truyện
        </h3>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 border border-notion-border rounded-lg p-3 bg-white">
          {MANGA_CATEGORIES.slice(0, 18).map((cat) => (
            <Link 
              key={cat.id} 
              to={`/category/${cat.id}`}
              className="text-[12px] text-notion-gray500 hover:text-notion-black hover:bg-notion-warmWhite px-2 py-1.5 rounded transition-all"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RecommendedSidebar;