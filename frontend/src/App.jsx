import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

import HomePage from './pages/HomePage';
import MangaDetail from './pages/MangaDetail';
import ChapterDetail from './pages/ChapterDetail';
import Header from './components/Header';
import Footer from './components/Footer';

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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Thanh loading bar */}
      <LoadingBar
        color="#0077ff" // Màu xanh Notion hoặc bạn có thể dùng màu vàng #ffd43b
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={3}
        shadow={true}
      />

      {!isReading && <Header />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/manga/:id" element={<MangaDetail />} />
          <Route path="/chapter/:id" element={<ChapterDetail />} />
        </Routes>
      </main>

      {!isReading && <Footer />}
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