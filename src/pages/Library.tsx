import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  History,
  Trash2,
  BookOpen,
  Clock,
  ChevronRight
} from 'lucide-react';
import { MOCK_BOOKS } from '../constants/books';
import { useAppStore } from '../contexts/appStore';

const Library: React.FC = () => {
  const { favorites, progress, toggleFavorite, clearAllHistory, resetProgress } = useAppStore();
  const [activeTab, setActiveTab] = useState<'favorites' | 'history'>('favorites');

  const favoriteBooks = MOCK_BOOKS.filter(book => favorites.includes(book.id));

  const historyBooks = Object.entries(progress)
    .map(([id, prog]) => {
      const book = MOCK_BOOKS.find(b => b.id === id);
      return book ? { ...book, ...prog } : null;
    })
    .filter((b): b is any => b !== null)
    .sort((a, b) => new Date(b.lastReadAt).getTime() - new Date(a.lastReadAt).getTime());

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Thư viện cá nhân</h1>
          <p className="text-slate-500 dark:text-slate-400">Quản lý sách yêu thích và tiến độ đọc của bạn</p>
        </div>

        <button
          onClick={() => {
            if (confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử đọc và yêu thích?')) {
              clearAllHistory();
            }
          }}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors border border-red-200 dark:border-red-800"
        >
          <Trash2 className="w-4 h-4" />
          Xóa toàn bộ dữ liệu
        </button>
      </div>

      <div className="flex p-1 bg-slate-200 dark:bg-slate-800 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'favorites'
              ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Heart className={`w-4 h-4 ${activeTab === 'favorites' ? 'fill-current' : ''}`} />
          Yêu thích
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'history'
              ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <History className="w-4 h-4" />
          Lịch sử đọc
        </button>
      </div>

      <div className="space-y-6">
        {activeTab === 'favorites' ? (
          <>
            {favoriteBooks.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {favoriteBooks.map(book => (
                  <div key={book.id} className="group relative">
                    <div className="card p-3 h-full flex flex-col">
                      <div className="relative aspect-[3/4] mb-3 overflow-hidden rounded-lg">
                        <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <button
                          onClick={() => toggleFavorite(book.id)}
                          className="absolute top-2 right-2 p-1.5 bg-white/90 dark:bg-slate-800/90 rounded-full text-red-500 shadow-sm"
                        >
                          <Heart className="w-3 h-3 fill-current" />
                        </button>
                      </div>
                      <h3 className="font-bold text-sm line-clamp-2 mb-3 flex-grow">{book.title}</h3>
                      <Link
                        to={`/book/${book.id}`}
                        className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center justify-center gap-1 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <BookOpen className="w-3 h-3" />
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Heart className="w-12 h-12 text-slate-300" />}
                title="Chưa có sách yêu thích"
                description="Hãy khám phá thư viện và nhấn nút trái tim để lưu những cuốn sách bạn yêu thích vào đây."
              />
            )}
          </>
        ) : (
          <>
            {historyBooks.length > 0 ? (
              <div className="space-y-3">
                {historyBooks.map((item) => (
                  <div key={item.id} className="card p-4 flex items-center justify-between group transition-all hover:border-blue-300 dark:hover:border-blue-700">
                    <div className="flex items-center gap-4">
                      <img src={item.coverUrl} alt={item.title} className="w-12 h-16 object-cover rounded shadow-sm" />
                      <div className="space-y-1">
                        <h3 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.lastReadAt ? new Date(item.lastReadAt).toLocaleDateString('vi-VN') : '...'}
                          </span>
                          {item.chapterId && (
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-3 h-3" />
                              {item.chapters?.find((c: any) => c.id === item.chapterId)?.title || 'Đang đọc...'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => resetProgress(item.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                        title="Đặt lại tiến độ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <Link
                        to={`/read/${item.id}/${item.chapterId || ''}`}
                        className="btn-secondary py-1.5 px-3 text-xs flex items-center gap-1"
                      >
                        Đọc tiếp <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<History className="w-12 h-12 text-slate-300" />}
                title="Lịch sử đọc trống"
                description="Bạn chưa đọc cuốn sách nào. Hãy bắt đầu hành trình khám phá tri thức ngay bây giờ!"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

const EmptyState = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="text-center py-20 space-y-4">
    <div className="inline-block p-6 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">{description}</p>
    <Link to="/" className="btn-primary inline-block mt-4">Khám phá sách</Link>
  </div>
);

export default Library;