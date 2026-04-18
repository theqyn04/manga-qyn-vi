import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    /* sticky + backdrop-blur: Tạo hiệu ứng mờ kính khi cuộn trang 
      h-14: Chiều cao chuẩn 56px của Notion
    */
    <header className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-notion-border h-14">
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Nhóm trái: Logo & Nav */}
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 bg-notion-black rounded-[4px] flex items-center justify-center text-white text-[12px] font-bold transition-transform group-hover:scale-105">
              M
            </div>
            <span className="text-[16px] font-bold tracking-tighter text-notion-black">
              MangaQyn
            </span>
          </Link>

          {/* Menu ẩn trên mobile */}
          <nav className="hidden lg:flex items-center gap-6">
            {['Hot', 'Mới cập nhật', 'Thể loại'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-[14px] font-medium text-notion-gray500 hover:text-notion-black transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Nhóm phải: Search & Auth */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <input 
              type="text" 
              placeholder="Tìm kiếm truyện..." 
              className="bg-notion-warmWhite border border-notion-border rounded-[4px] px-3 py-1.5 text-[13px] w-64 focus:outline-none focus:ring-2 focus:ring-notion-blue/20 transition-all placeholder:text-notion-gray300"
            />
          </div>
          
          <button className="text-[14px] font-semibold text-notion-black hover:bg-notion-warmWhite px-3 py-1.5 rounded-[4px] transition-colors">
            Đăng nhập
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;