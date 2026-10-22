import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Heart, Moon, Sun, Menu, X } from 'lucide-react';
import { useAppStore } from '../../contexts/appStore';

const Navbar: React.FC = () => {
  const { settings, updateSettings } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';
    updateSettings({ theme: newTheme });
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-blue-600 rounded-lg group-hover:rotate-12 transition-transform">
              <BookOpen className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Docln.net
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Tìm sách, tác giả..."
                className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-full text-sm w-64 transition-all outline-none"
              />
            </div>
            <Link to="/library" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
              <Heart className="w-4 h-4" />
              Thư viện
            </Link>
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors">
              {settings.theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
              {settings.theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-4 py-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Tìm sách, tác giả..." className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm outline-none" />
          </div>
          <Link to="/library" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium block py-2">
            <Heart className="w-4 h-4" />
            Thư viện cá nhân
          </Link>
          <Link to="/about" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium block py-2">
            Giới thiệu
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;