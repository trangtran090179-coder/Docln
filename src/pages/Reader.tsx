import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Settings, X, Loader2 } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import { MOCK_BOOKS } from '../constants/books';
import { useAppStore } from '../contexts/appStore';

// Cấu hình worker cho PDF.js (Sử dụng CDN để đảm bảo hoạt động trên GitHub Pages)
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const Reader: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { settings, updateSettings } = useAppStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const book = MOCK_BOOKS.find(b => b.id === bookId);

  useEffect(() => {
    if (!book || book.type === 'story') return;

    const loadPdf = async () => {
      try {
        setLoading(true);
        const pdfUrl = book.documentUrl.startsWith('http')
          ? book.documentUrl
          : `${window.location.origin}${book.documentUrl}`;
        const loadingTask = pdfjsLib.getDocument({ url: pdfUrl });
        const pdf = await loadingTask.promise;
        setNumPages(pdf.numPages);
        setLoading(false);
      } catch (err) {
        console.error('Error loading PDF:', err);
        setError('Không thể tải file PDF. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    loadPdf();
  }, [book]);

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <h2 className="text-2xl font-bold">Không tìm thấy tài liệu</h2>
        <Link to="/" className="btn-primary">Quay lại trang chủ</Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      settings.theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(`/book/${bookId}`)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-sm font-bold truncate max-w-xs">
              {book.title}
            </h2>
          </div>
          <button onClick={() => setIsSettingsOpen(true)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative mx-auto py-16 max-w-3xl flex flex-col items-center space-y-8">
        {book.type === 'story' ? (
          <div className="space-y-6 w-full">
            <h1 className="text-3xl font-extrabold text-center mb-12">
              {book.chapters?.[0]?.title || 'Nội dung truyện'}
            </h1>
            <div style={{ fontSize: `${settings.fontSize}px`, lineHeight: settings.lineHeight }} className="leading-relaxed">
              <p>{book.chapters?.[0]?.content || 'Đang tải nội dung...'}</p>
            </div>
          </div>
        ) : (
          <>
            {loading && (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                <p className="font-medium animate-pulse">Đang chuẩn bị trang sách...</p>
              </div>
            )}
            {error && (
              <div className="text-center py-20 space-y-4">
                <p className="text-red-500 font-bold">{error}</p>
                <button onClick={() => window.location.reload()} className="btn-primary">Thử lại</button>
              </div>
            )}
            {!loading && !error && (
              <div className="flex flex-col gap-4 w-full">
                {Array.from({ length: numPages }, (_, i) => (
                  <PdfPage key={i} pageNumber={i + 1} pdfUrl={book.documentUrl.startsWith('http')
                  ? book.documentUrl
                  : `${window.location.origin}${book.documentUrl}`} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {isSettingsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Settings className="w-5 h-5" /> Tùy chỉnh
              </h3>
              <button onClick={() => setIsSettingsOpen(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Cỡ chữ</span>
                <input
                  type="range" min="12" max="32"
                  value={settings.fontSize}
                  onChange={(e) => updateSettings({ fontSize: parseInt(e.target.value) })}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PdfPage: React.FC<{ pageNumber: number, pdfUrl: string }> = ({ pageNumber, pdfUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const renderPage = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({ url: pdfUrl });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(pageNumber);
        
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context as any,
          viewport: viewport as any
        } as any).promise;
      } catch (err) {
        console.error(`Error rendering page ${pageNumber}:`, err);
      }
    };

    renderPage();
  }, [pageNumber, pdfUrl]);

  return (
    <div className="shadow-lg bg-white rounded-sm border border-slate-200">
      <canvas ref={canvasRef} className="w-full h-auto block" />
    </div>
  );
};

export default Reader;