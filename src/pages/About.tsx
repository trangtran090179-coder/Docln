import React from 'react';
import {
  BookOpen,
  Target,
  HandHelping,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-16 py-4">
      {/* Header Section */}
      <section className="text-center space-y-4">
        <div className="inline-block p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
          <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Về Thư viện Số <span className="text-blue-600">Docln.net</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Hệ sinh thái đọc sách trực tuyến hiện đại, nơi tri thức được số hóa để tiếp cận dễ dàng hơn cho mọi học sinh và giáo viên.
        </p>
      </section>

      {/* Goals Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card p-8 space-y-4 border-l-4 border-l-blue-500">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 w-fit rounded-xl text-blue-600 dark:text-blue-400">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">Mục tiêu</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Xóa bỏ rào cản về khoảng cách và thời gian trong việc tiếp cận tài liệu. Chúng tôi mong muốn xây dựng một văn hóa đọc bền vững trong môi trường số cho toàn thể học sinh.
          </p>
        </div>

        <div className="card p-8 space-y-4 border-l-4 border-l-indigo-500">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 w-fit rounded-xl text-indigo-600 dark:text-indigo-400">
            <HandHelping className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">Ý nghĩa</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Không chỉ là nơi lưu trữ, Docln.net là công cụ hỗ trợ tự học, khuyến khích sự tò mò và tinh thần tự nghiên cứu thông qua các nguồn tài liệu chuẩn hóa.
          </p>
        </div>
      </section>

      {/* User Guide Section */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Hướng dẫn sử dụng</h2>
          <p className="text-slate-500 dark:text-slate-400">Bắt đầu hành trình đọc sách chỉ với vài bước đơn giản</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              title: 'Tìm kiếm',
              desc: 'Sử dụng thanh tìm kiếm tại trang chủ để tìm sách theo tên hoặc tác giả.',
              icon: <SearchIcon />
            },
            {
              step: '02',
              title: 'Khám phá',
              desc: 'Xem chi tiết nội dung, thể loại và danh sách chương trước khi đọc.',
              icon: <BookOpenIcon />
            },
            {
              step: '03',
              title: 'Trải nghiệm',
              desc: 'Đọc với chế độ tập trung, tùy chỉnh cỡ chữ và lưu tiến độ tự động.',
              icon: <CheckCircle2 className="w-6 h-6 text-green-500" />
            }
          ].map((item, idx) => (
            <div key={idx} className="card p-6 space-y-4 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 text-6xl font-black text-slate-100 dark:text-slate-800 group-hover:text-blue-100 dark:group-hover:text-slate-700 transition-colors">
                {item.step}
              </div>
              <div className="relative z-10">{item.icon}</div>
              <h4 className="font-bold text-lg text-slate-800 dark:text-white relative z-10">{item.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 relative z-10 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div >
      </section>

      {/* Contact Section */}
      <section className="card p-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-500" />
            Liên hệ & Góp ý
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Chúng tôi luôn lắng nghe ý kiến để hoàn thiện hơn mỗi ngày</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold">Email</p>
              <p className="text-sm font-medium">support@docln.net</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold">Điện thoại</p>
              <p className="text-sm font-medium">0123 456 789</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold">Địa chỉ</p>
              <p className="text-sm font-medium">Phòng Thư viện, Tầng 2</p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center pb-12">
        <Link to="/" className="group inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline">
          Quay lại trang chủ
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div >
    </div >
  );
};

const SearchIcon = () => (
  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
    <Target className="w-6 h-6" />
  </div>
);

const BookOpenIcon = () => (
  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
    <BookOpen className="w-6 h-6" />
  </div>
);

export default About;