import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Heart,
  Clock,
  ShieldCheck,
  FileText,
  User,
  ChevronRight
} from 'lucide-react';
import { MOCK_BOOKS } from '../constants/books';
import { useAppStore } from '../contexts/appStore';
import type { Book } from '../types';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { favorites, toggleFavorite, progress } = useAppStore();

  const book = MOCK_BOOKS.find(b => b.id === id);

  if (!book) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold">Không tìm thấy sách</h2>
        <Link to="/" className="btn-primary inline-block">Quay lại trang chủ</Link>
      </div>
    );
  }

  const isFavorite = favorites.includes(book.id);
  const userProgress = progress[book.id];
  const lastReadChapter = userProgress?.chapterId;

  const handleRead = () => {
    if (book.type === 'story') {
      // Nếu là truyện, đọc từ chương cuối cùng đã đọc hoặc chương 1
      const chapterId = lastReadChapter || book.chapters?.[0]?.id;
      navigate(`/read/${book.id}/${chapterId}`);
    } else {
      // Nếu là sách đơn, vào trình đọc PDF/EPUB
      navigate(`/read/${book.id}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Quay lại
      </button>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Cover */}
        <div className="md:col-span-4 space-y-6">
          <div className="card p-2 bg-white dark:bg-slate-800 shadow-xl">
            <img
              src={book.coverUrl}
              alt={book.title}
              className="w-full rounded-lg object-cover aspect-[3/4]"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=No+Cover'; }}
            />
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleRead}
              className="btn-primary w-full py-4 text-lg font-bold flex items-center justify-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              {lastReadChapter ? 'Đọc tiếp' : 'Bắt đầu đọc'}
            </button>
            <button
              onClick={() => toggleFavorite(book.id)}
              className={`btn-secondary w-full py-3 flex items-center justify-center gap-2 ${isFavorite ? 'text-red-500 font-bold' : ''}`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              {isFavorite ? 'Đã trong yêu thích' : 'Thêm vào yêu thích'}
            </button>
          </div>
        </div >

        {/* Right Column: Info */}
        <div className="md:col-span-8 space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full uppercase">
                {book.category}
              </span>
              {book.status === 'ongoing' && (
                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-bold rounded-full uppercase">
                  Đang cập nhật
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              {book.title}
            </h1>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <User className="w-4 h-4" />
              <span className="font-medium">{book.author}</span>
            </div >
          </div >

          <div className="card p-6 space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              Giới thiệu
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {book.description}
            </p>
          </div >

          {/* Chapters List (only for story) */}
          {book.type === 'story' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                Danh sách chương
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {book.chapters?.map(chapter => (
                  <Link
                    key={chapter.id}
                    to={`/read/${book.id}/${chapter.id}`}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                      lastReadChapter === chapter.id
                        ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-400 w-6">{chapter.order}.</span>
                      <span className={`font-medium ${lastReadChapter === chapter.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-200'}`}>
                        {chapter.title}
                      </span>
                    </div >
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                ))}
              </div >
            </div >
          )}

          {/* Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="card p-4 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-500 shrink-0" />
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Bản quyền</p>
                <p className="text-sm font-medium">{book.copyright}</p>
              </div >
            </div >
            <div className="card p-4 flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-indigo-500 shrink-0" />
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Nguồn tài liệu</p>
                <p className="text-sm font-medium">{book.source}</p>
              </div >
            </div >
          </div >
        </div >
      </div >
    </div>
  );
};

export default BookDetail;