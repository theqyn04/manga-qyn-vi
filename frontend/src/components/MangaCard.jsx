import React from 'react';
import { Link } from 'react-router-dom';

const MangaCard = ({ manga }) => {
  return (
    <div className="flex gap-4 p-3 bg-white border border-notion-border rounded-xl hover:shadow-md transition-all group">
      {/* Thumbnail */}
      <Link to={`/manga/${manga._id}`} className="w-24 h-32 flex-shrink-0 overflow-hidden rounded-lg border border-notion-border bg-notion-warmWhite">
        <img 
          src={manga.thumbnail || manga.coverImage || manga.image} 
          alt={manga.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => { e.target.src = 'https://placehold.co/200x300?text=No+Cover' }}
        />
      </Link>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <Link to={`/manga/${manga._id}`}>
            <h3 className="text-[15px] font-bold text-notion-black line-clamp-1 group-hover:text-notion-blue transition-colors">
              {manga.title}
            </h3>
          </Link>
          <div className="mt-2 space-y-1.5">
            {/* Giả định chapter là mảng, nếu là string thì render trực tiếp */}
            <div className="flex justify-between items-center group/item">
              <span className="text-[13px] text-notion-gray500 hover:text-notion-orange cursor-pointer">
                {manga.latestChapter || "Chương mới nhất"}
              </span>
              <span className="text-[11px] text-notion-gray400 italic">1 giờ trước</span>
            </div>
          </div>
        </div>
        
        {/* Tags nhỏ (tùy chọn) */}
        <div className="flex gap-2">
          <span className="text-[10px] px-2 py-0.5 bg-notion-warmWhite text-notion-gray500 rounded-full border border-notion-border">
            {manga.status || "Updating"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MangaCard;