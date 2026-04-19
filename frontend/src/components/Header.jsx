import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Search, Bookmark, LogIn, UserPlus, Loader2 } from 'lucide-react';
import axios from 'axios';
import { MANGA_CATEGORIES } from '../constants/categories';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  // States cho tìm kiếm
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim().length > 0) {
      setShowDropdown(false); // Đóng dropdown gợi ý ngay lập tức
      navigate(`/search?q=${encodeURIComponent(query.trim())}`); // Chuyển sang trang SearchPage
    }
  };

  // Đóng dropdown khi click ra ngoài vùng tìm kiếm
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Logic Debouncing: Đợi người dùng dừng gõ 400ms mới gọi API
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.trim().length > 1) {
        setLoading(true);
        try {
          // Điều chỉnh endpoint /search theo backend của bạn
          const res = await axios.get(`http://localhost:5000/search?q=${query}`);
          setResults(res.data.data.slice(0, 6)); // Lấy 6 kết quả đầu
          setShowDropdown(true);
        } catch (err) {
          console.error("Lỗi tìm kiếm:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <header className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-notion-border h-14 font-sans">
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">

        {/* Nhóm TRÁI: Logo & Menu (Giữ nguyên) */}
        <div className="flex items-center gap-6 h-full">
          <Link to="/" className="flex items-center gap-2 group mr-4 transition-opacity hover:opacity-80">
            <div className="w-6 h-6 bg-notion-black rounded-[4px] flex items-center justify-center text-white text-[12px] font-bold shadow-sm">M</div>
            <span className="text-[15px] font-bold tracking-tight text-notion-black">MangaQyn</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 h-full">
            <Link to="/hot" className="text-[14px] font-medium text-notion-gray500 hover:text-notion-black hover:bg-notion-warmWhite px-3 py-1.5 rounded-[4px] transition-all">Hot</Link>
            <Link to="/new" className="text-[14px] font-medium text-notion-gray500 hover:text-notion-black hover:bg-notion-warmWhite px-3 py-1.5 rounded-[4px] transition-all">Mới cập nhật</Link>

            {/* DROP DOWN THỂ LOẠI (Giữ nguyên) */}
            <div className="relative group flex items-center h-full">
              <button className="flex items-center gap-1 text-[14px] font-medium text-notion-gray500 group-hover:text-notion-black group-hover:bg-notion-warmWhite px-3 py-1.5 rounded-[4px] transition-all">
                Thể loại <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-[calc(100%-8px)] left-0 w-[500px] bg-white border border-notion-border rounded-lg shadow-notion opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-[110]">
                <div className="max-height-[400px] overflow-y-auto p-3 custom-scrollbar">
                  <div className="grid grid-cols-3 gap-x-4 gap-y-0.5">
                    {MANGA_CATEGORIES.map((cat) => (
                      <Link key={cat.id} to={`/category/${cat.id}`} className="text-[13px] text-notion-gray500 hover:text-notion-black hover:bg-notion-warmWhite px-3 py-1.5 rounded-[4px] transition-colors whitespace-nowrap">
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Nhóm PHẢI: Search & Auth */}
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block mr-2 group" ref={searchRef}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-notion-gray300 group-focus-within:text-notion-blue transition-colors" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tìm kiếm..."
              className="bg-notion-warmWhite border border-notion-border rounded-[4px] pl-9 pr-3 py-1.5 text-[13px] w-48 focus:w-64 focus:outline-none focus:ring-2 focus:ring-notion-blue/20 transition-all placeholder:text-notion-gray300"
            />
            {loading && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 animate-spin text-notion-blue" />
            )}

            {/* SEARCH DROPDOWN RESULTS */}
            {showDropdown && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white border border-notion-border rounded-lg shadow-notion overflow-hidden z-[150]">
                {results.length > 0 ? (
                  <div className="py-2">
                    {results.map((manga) => (
                      <button
                        key={manga._id}
                        onClick={() => {
                          navigate(`/manga/${manga._id}`);
                          setShowDropdown(false);
                          setQuery('');
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-notion-warmWhite transition-colors text-left border-b border-notion-border/30 last:border-0"
                      >
                        <img
                          src={manga.thumbnail || manga.coverImage}
                          alt=""
                          className="w-8 h-10 object-cover rounded border border-notion-border shadow-sm"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-bold text-notion-black truncate">{manga.title}</div>
                          <div className="text-[11px] text-notion-gray500 italic truncate">{manga.latestChapter || 'Chương mới'}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-[12px] text-notion-gray500 italic">Không tìm thấy truyện phù hợp.</div>
                )}
              </div>
            )}
          </div>

          {/* Auth Section (Giữ nguyên) */}
          {user ? (
            <div className="flex items-center gap-2">
              <Link to="/my-bookmarks" className="flex items-center gap-1.5 text-[14px] font-medium text-notion-gray500 hover:text-notion-black hover:bg-notion-warmWhite px-3 py-1.5 rounded-[4px] transition-all">
                <Bookmark className="w-4 h-4" /> <span className="hidden sm:inline">Thư viện</span>
              </Link>
              <div className="w-8 h-8 bg-notion-warm-dark rounded-full flex items-center justify-center text-white text-[12px] font-bold shadow-sm cursor-pointer hover:opacity-90">
                {user.username?.[0].toUpperCase()}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="flex items-center gap-1.5 text-[14px] font-semibold text-notion-black hover:bg-notion-warmWhite px-3 py-1.5 rounded-[4px]"><LogIn className="w-4 h-4" /> Đăng nhập</Link>
              <Link to="/signup" className="flex items-center gap-1.5 text-[14px] font-bold bg-notion-blue text-white px-4 py-1.5 rounded-[4px] shadow-sm transition-all active:scale-95"><UserPlus className="w-4 h-4" /> Đăng ký</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;