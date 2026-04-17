import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MangaDetail from './pages/MangaDetail';
import ChapterDetail from './pages/ChapterDetail';

function App() {
  return (
    <Router>
      {/* Dòng kiểm tra này phải nằm TRONG return 
         và thường là nằm trên hoặc dưới Routes 
      */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/manga/:id" element={<MangaDetail />} />
        <Route path="/chapter/:id" element={<ChapterDetail />} />
      </Routes>
    </Router>
  );
}

export default App;