import React, { useState, useMemo } from 'react';
import {
  Plus,
  Trash2,
  Edit3,
  Download,
  Upload,
  Save,
  X,
  AlertCircle,
  Search,
  Book as BookIcon
} from 'lucide-react';
import { Book } from '../types';
import { MOCK_BOOKS } from '../constants/books';

const Admin: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(MOCK_BOOKS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Book>>({
    title: '',
    author: '',
    description: '',
    category: '',
    coverUrl: '',
    documentUrl: '',
    type: 'book',
    status: 'completed',
    copyright: '',
    source: '',
    tags: [],
  });

  const filteredBooks = useMemo(() => {
    return books.filter(b =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [books, searchQuery]);

  const handleOpenModal = (book?: Book) => {
    setError(null);
    if (book) {
      setEditingBook(book);
      setFormData(book);
    } else {
      setEditingBook(null);
      setFormData({
        title: '', author: '', description: '', category: '',
        coverUrl: '', documentUrl: '', type: 'book', status: 'completed',
        copyright: '', source: '', tags: [],
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.author || !formData.category) {
      setError('Vui lòng nhập đầy đủ Tiêu đề, Tác giả và Thể loại');
      return;
    }

    if (editingBook) {
      setBooks(prev => prev.map(b => b.id === editingBook.id ? { ...b, ...formData } as Book : b));
    } else {
      const newBook: Book = {
        ...formData as Book,
        id: Date.now().toString(),
        tags: formData.tags || [],
      };
      setBooks(prev => [...prev, newBook]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa cuốn sách này?')) {
      setBooks(prev => prev.filter(b => b.id !== id));
    }
  };

  const exportJSON = () => {
    const dataStr = JSON.stringify(books, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'books.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json)) {
          setBooks(json);
          alert('Nhập dữ liệu thành công!');
        } else {
          throw new Error('Định dạng JSON không hợp lệ (phải là một mảng)');
        }
      } catch (err: any) {
        alert('Lỗi: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Quản trị Thư viện</h1>
          <p className="text-slate-500 dark:text-slate-400">Công cụ chỉnh sửa dữ liệu tĩnh cho quản trị viên</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <label className="btn-secondary flex items-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4" /> Nhập JSON
            <input type="file" accept=".json" onChange={importJSON} className="hidden" />
          </label>
          <button onClick={exportJSON} className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" /> Xuất JSON
          </button>
          <button onClick={() => handleOpenModal()} className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Thêm sách mới
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm để quản lý..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="text-sm font-medium text-slate-500">
          Tổng số: <span className="text-blue-600 font-bold">{books.length}</span> cuốn
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Sách</th>
                <th className="px-6 py-4">Thể loại</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredBooks.map(book => (
                <tr key={book.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={book.coverUrl} alt="" className="w-10 h-14 object-cover rounded shadow-sm" />
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-100">{book.title}</p>
                        <p className="text-xs text-slate-500">{book.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md">{book.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold uppercase ${book.status === 'completed' ? 'text-green-500' : 'text-amber-500'}`}>
                      {book.status === 'completed' ? 'Hoàn thành' : 'Đang cập nhật'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleOpenModal(book)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg" title="Sửa">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(book.id)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg" title="Xóa">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <BookIcon className="w-5 h-5 text-blue-500" />
                {editingBook ? 'Chỉnh sửa sách' : 'Thêm sách mới'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6">
              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-3 text-sm font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Tiêu đề *</label>
                    <input type="text" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Tác giả *</label>
                    <input type="text" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Thể loại *</label>
                    <input type="text" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">URL Ảnh bìa</label>
                    <input type="text" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" value={formData.coverUrl} onChange={e => setFormData({...formData, coverUrl: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Loại tài liệu</label>
                    <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})}>
                      <option value="book">Sách đơn</option>
                      <option value="story">Truyện nhiều chương</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Trạng thái</label>
                    <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})}>
                      <option value="completed">Hoàn thành</option>
                      <option value="ongoing">Đang cập nhật</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">URL Tài liệu</label>
                    <input type="text" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" value={formData.documentUrl} onChange={e => setFormData({...formData, documentUrl: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Nguồn tài liệu</label>
                    <input type="text" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})} />
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Mô tả chi tiết</label>
                <textarea rows={4} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Thông tin bản quyền</label>
                <input type="text" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" value={formData.copyright} onChange={e => setFormData({...formData, copyright: e.target.value})} />
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="btn-secondary">Hủy</button>
              <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                <Save className="w-4 h-4" /> Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;