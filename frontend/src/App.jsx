import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

import HomePage from './pages/HomePage';
import MangaDetail from './pages/MangaDetail';
import ChapterDetail from './pages/ChapterDetail';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthPage from './pages/AuthPage';
import SearchPage from './pages/SearchPage';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

const BookmarkPage = () => <div className="p-10 text-2xl font-bold">Thư viện của bạn</div>;

function AppContent() {
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  // Mỗi khi URL thay đổi, chạy thanh loading
  useEffect(() => {
    setProgress(30); // Bắt đầu chạy

    // Giả lập thời gian tải trang hoặc chờ dữ liệu
    const timer = setTimeout(() => {
      setProgress(100); // Hoàn thành
    }, 400);

    return () => clearTimeout(timer);
  }, [location]);

  const isReading = location.pathname.startsWith('/chapter/');

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="flex flex-col min-h-screen">
      <LoadingBar
        color="#0075de" 
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={3}
      />

      {/* Ẩn Header/Footer nếu đang đọc truyện HOẶC đang ở trang Auth */}
      {!isReading && !isAuthPage && <Header />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/manga/:id" element={<MangaDetail />} />
          <Route path="/chapter/:id" element={<ChapterDetail />} />
          <Route path="/login" element={<AuthPage isLogin={true} />} />
          <Route path="/signup" element={<AuthPage isLogin={false} />} />
          <Route path="/search" element={<SearchPage />} />

          <Route path="/my-bookmarks" element={
            <ProtectedRoute>
              <BookmarkPage />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isReading && !isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;