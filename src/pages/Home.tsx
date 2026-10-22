import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BookCard from '../components/book/BookCard';
import { MOCK_BOOKS, CATEGORIES } from '../constants/books';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const filteredBooks = useMemo(() => {
    return MOCK_BOOKS.filter(book => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'Tất cả' || book.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative py-16 px-6 rounded-3xl overflow-hidden text-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl"
      >
        <div className="absolute inset-0 opacity-20">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1], 
              x: [0, 30, 0], 
              y: [0, -30, 0] 
            }} 
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl"
          ></motion.div>
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1], 
              x: [0, -30, 0], 
              y: [0, 30, 0] 
            }} 
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400 rounded-full blur-3xl"
          ></motion.div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight"
          >
            Khám Phá Kho Tàng <br />
            <span className="text-blue-200">Tri Thức Số</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg text-blue-100 opacity-90 max-w-2xl mx-auto"
          >
            Thư viện số hiện đại dành cho học sinh và giáo viên. Truy cập hàng ngàn cuốn sách,
            truyện và tài liệu học tập mọi lúc, mọi nơi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="relative max-w-xl mx-auto mt-8 group"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Tìm kiếm tên sách, tác giả hoặc chủ đề..."
              className="w-full pl-12 pr-6 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl shadow-xl focus:ring-4 focus:ring-blue-500/30 outline-none transition-all text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Filter Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              Thư viện sách
            </h2>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mr-2">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium whitespace-nowrap">Thể loại:</span>
            </div>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Book Grid */}
        <AnimatePresence mode="popLayout">
          {filteredBooks.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            >
              {filteredBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <BookCard book={book} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 space-y-4"
            >
              <div className="inline-block p-4 bg-slate-100 dark:bg-slate-800 rounded-full">
                <Search className="w-12 h-12 text-slate-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Không tìm thấy kết quả</h3>
                <p className="text-slate-500 dark:text-slate-400">
                  Hãy thử thay đổi từ khóa tìm kiếm hoặc chọn thể loại khác.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </div>
  );
};

export default Home;