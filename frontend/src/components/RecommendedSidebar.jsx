import React from 'react';

const RecommendedSidebar = () => {
  const items = [1, 2, 3, 4, 5]; // Giả lập dữ liệu
  
  return (
    <aside className="space-y-6">
      <h3 className="text-[14px] font-bold text-notion-gray300 uppercase tracking-widest border-b border-notion-border pb-2">
        Truyện đề cử
      </h3>
      <div className="space-y-4">
        {items.map((i) => (
          <div key={i} className="flex gap-4 group cursor-pointer p-2 -mx-2 rounded-[8px] hover:bg-notion-warmWhite transition-colors">
            <div className="w-14 h-20 bg-notion-warmWhite border border-notion-border rounded-[4px] overflow-hidden shrink-0 shadow-sm">
              <div className="w-full h-full bg-gray-200 animate-pulse" /> {/* Placeholder cho thumbnail */}
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="text-[14px] font-bold text-notion-black line-clamp-1 group-hover:text-notion-blue transition-colors">
                Tên truyện đề cử {i}
              </h4>
              <p className="text-[12px] text-notion-gray500 mt-1">Chương 120</p>
              <div className="flex items-center gap-1 mt-1 text-[11px] text-notion-gray300">
                <span>⭐ 4.8</span>
                <span>•</span>
                <span>12k views</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default RecommendedSidebar;