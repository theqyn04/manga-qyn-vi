import React from 'react';
import { Link } from 'react-router-dom';

const MangaCard = ({ manga }) => {
  return (
    <Link 
      to={`/manga/${manga._id}`} 
      className="group flex flex-col w-full bg-white transition-all duration-200"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[3/4.2] rounded-[10px] overflow-hidden border border-notion-border bg-notion-warmWhite shadow-notion transition-all duration-300 group-hover:translate-y-[-4px] group-hover:shadow-xl">
        <img 
          src={manga.thumbnail} 
          alt={manga.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/300x420?text=No+Image'; }}
        />
        
        {/* Badge tùy chọn (Ví dụ: New hoặc Hot) */}
        <div className="absolute top-2.5 right-2.5">
          <span className="bg-white/90 backdrop-blur-[4px] px-2 py-1 rounded-[4px] text-[10px] font-bold border border-notion-border shadow-sm uppercase tracking-wider text-notion-black">
            New
          </span>
        </div>
      </div>

      {/* Text Content Section */}
      <div className="mt-3 px-0.5">
        <h3 className="text-[16px] font-bold tracking-notionCard leading-[1.3] text-notion-black group-hover:text-notion-blue transition-colors line-clamp-2">
          {manga.title}
        </h3>
        
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[13px] text-notion-gray500 font-medium tracking-tight">
            Chương {manga.latestChapter || '??'}
          </span>
          <span className="w-1 h-1 rounded-full bg-notion-gray300"></span>
          <span className="text-[12px] text-notion-gray300 font-normal">
            {manga.updatedAt || 'Vừa xong'}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MangaCard;