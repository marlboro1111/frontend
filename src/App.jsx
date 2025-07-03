import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TrendingArticlesPage from './pages/TrendingArticlesPage';
import VideoTranscriptionPage from './pages/VideoTranscriptionPage';
import TranslateArticlePage from './pages/TranslateArticlePage';
import { fetchTrendingArticles } from './features/articles/articlesSlice';
import UploadToCMSPage from './pages/UploadToCMSPage';


const App = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchTrendingArticles());
  }, [dispatch]);

  return (
    <Router>
      <div className="container mx-auto p-4">
        <header className="bg-gray-800 text-white py-4">
          <h1 className="text-3xl font-bold text-center">Nucleus AI</h1>
          <nav className="flex justify-center space-x-4 mt-4">
            <Link to="/" className="text-lg font-semibold hover:underline">
              Trending Articles
            </Link>
            <Link to="/video-transcription" className="text-lg font-semibold hover:underline">
              Video Transcription
            </Link>
            <Link to="/translate-article" className="text-lg font-semibold hover:underline">
              Translate Article
              </Link>
            <Link to="/upload" className="text-lg font-semibold hover:underline">
            UploadToCMS
            </Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<TrendingArticlesPage />} />
          <Route path="/video-transcription" element={<VideoTranscriptionPage />} />
          <Route path="/translate-article" element={<TranslateArticlePage />} />
          <Route path="/upload" element={<UploadToCMSPage />} />

        </Routes>

        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>Error: {error}</p>}
      </div>
    </Router>
  );
};

export default App;
