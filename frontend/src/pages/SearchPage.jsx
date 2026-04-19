import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import MangaCard from '../components/MangaCard';
import { Loader2, ChevronLeft, ChevronRight, SearchX } from 'lucide-react';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        // Giả sử API hỗ trợ phân trang: /search?q=...&page=...
        const res = await axios.get(`http://localhost:5000/search?q=${query}&page=${page}`);
        setMangas(res.data.data);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error("Lỗi tìm kiếm:", err);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchSearchResults();
  }, [query, page]);

  return (
    <main className="max-w-[1200px] mx-auto px-6 py-10 min-h-screen">
      {/* Header trang tìm kiếm */}
      <header className="mb-10 border-b border-notion-border pb-6">
        <h1 className="text-[32px] font-bold text-notion-black tracking-tight">
          Kết quả tìm kiếm cho: <span className="text-notion-blue">"{query}"</span>
        </h1>
        <p className="text-notion-gray500 mt-2">
          Tìm thấy {mangas.length} kết quả phù hợp.
        </p>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-notion-blue" />
          <p className="text-notion-gray500 animate-pulse">Đang lục tìm trong thư viện...</p>
        </div>
      ) : mangas.length > 0 ? (
        <>
          {/* Grid hiển thị kết quả */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {mangas.map((manga) => (
              <MangaCard key={manga._id} manga={manga} />
            ))}
          </div>

          {/* Thanh phân trang (Pagination) */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 border border-notion-border rounded-md hover:bg-notion-warmWhite disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded-md text-[14px] font-medium transition-all ${
                      page === i + 1 
                      ? 'bg-notion-black text-white' 
                      : 'hover:bg-notion-warmWhite text-notion-gray500'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 border border-notion-border rounded-md hover:bg-notion-warmWhite disabled:opacity-30 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      ) : (
        /* Trạng thái không tìm thấy kết quả */
        <div className="text-center py-20 bg-notion-warmWhite/30 rounded-xl border border-dashed border-notion-border">
          <SearchX className="w-16 h-16 text-notion-gray300 mx-auto mb-4" />
          <h3 className="text-[18px] font-bold text-notion-black">Không tìm thấy kết quả nào</h3>
          <p className="text-notion-gray500 mt-2 max-w-[400px] mx-auto text-[14px]">
            Rất tiếc, chúng mình không tìm thấy truyện nào khớp với từ khóa của bạn. Thử tìm kiếm bằng tên khác xem sao?
          </p>
          <Link to="/" className="inline-block mt-6 px-6 py-2 bg-notion-black text-white rounded-md text-[14px] font-bold hover:opacity-90 transition-all">
            Quay lại trang chủ
          </Link>
        </div>
      )}
    </main>
  );
};

export default SearchPage;