import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-500 dark:text-slate-400 text-center md:text-left">
            <p>© {new Date().getFullYear()} Docln.net - Thư viện số của trường.</p>
            <p className="mt-1 italic">Tất cả tài liệu phục vụ mục đích học tập và nghiên cứu.</p>
          </div>
          <div className="flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#copyright" className="hover:text-blue-600 transition-colors">Bản quyền</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">Liên hệ</a>
            <a href="#feedback" className="hover:text-blue-600 transition-colors">Góp ý</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;