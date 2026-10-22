import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/common/MainLayout';
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import Reader from './pages/Reader';
import Library from './pages/Library';
import About from './pages/About';
import Admin from './pages/Admin';
import { useAppStore } from './contexts/appStore';

function App() {
  const { settings } = useAppStore();

  useEffect(() => {
    // Đồng bộ theme từ store vào thẻ html khi app khởi chạy
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (settings.theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // Handle 'system' theme
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [settings.theme]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="book/:id" element={<BookDetail />} />
          <Route path="read/:bookId/:chapterId?" element={<Reader />} />
          <Route path="library" element={<Library />} />
          <Route path="about" element={<About />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;