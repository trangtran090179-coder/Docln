import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Book } from '../../types';
import { useAppStore } from '../../contexts/appStore';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { favorites, toggleFavorite } = useAppStore();
  const isFavorite = favorites.includes(book.id);

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="card group relative overflow-hidden flex flex-col h-full p-3 cursor-pointer"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=No+Cover';
          }}
        />
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={(e) => { e.preventDefault(); toggleFavorite(book.id); }}
          className={`absolute top-2 right-2 p-2 rounded-full shadow-lg transition-all ${
            isFavorite
            ? 'bg-red-500 text-white scale-110'
            : 'bg-white/80 dark:bg-slate-800/80 text-slate-400 hover:text-red-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </motion.button>
      </div>

      <div className="flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-[10px] uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400">
            {book.category}
          </span>
          <h3 className="font-bold text-slate-800 dark:text-slate-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {book.title}
          </h3>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 flex-grow">
          {book.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100 dark:border-slate-700">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
            {book.author}
          </span>
          <Link
            to={`/book/${book.id}`}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;