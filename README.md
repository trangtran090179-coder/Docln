# 📚 Docln.net - Hệ Thống Thư Viện Số Học Đường

Docln.net là một nền tảng thư viện số hiện đại, mã nguồn mở, được thiết kế chuyên biệt cho môi trường trường học. Hệ thống cho phép học sinh và giáo viên dễ dàng tìm kiếm, quản lý và đọc các loại sách, truyện, tài liệu học tập một cách tập trung và tiện lợi.

## ✨ Tính năng chính

### 📖 Trình đọc sách chuyên sâu
- **Hỗ trợ đa dạng:** Đọc văn bản trực tiếp cho truyện nhiều chương và hỗ trợ mở tài liệu PDF/EPUB.
- **Tùy biến trải nghiệm:** Điều chỉnh cỡ chữ, khoảng cách dòng và chiều rộng nội dung để phù thể hiện tốt nhất trên mọi thiết bị.
- **Chế độ hiển thị:** Hỗ trợ 3 chế độ: Sáng (Light), Tối (Dark) và Sepia (vàng nhạt) giúp giảm mỏi mắt.
- **Tiến độ đọc:** Tự động lưu vị trí đang đọc vào `localStorage`, cho phép quay lại chính xác nơi đã dừng.
- **Điều hướng nhanh:** Chuyển chương bằng nút bấm hoặc phím mũi tên ($\leftarrow$ / $\rightarrow$).

### 📚 Quản lý Thư viện cá nhân
- **Danh sách yêu thích:** Lưu lại những cuốn sách yêu thích để truy cập nhanh.
- **Lịch sử đọc:** Theo dõi những tài liệu đã đọc và thời gian đọc gần nhất.
- **Quản lý tiến độ:** Xem tổng quan tiến độ đọc của từng cuốn sách trong thư viện.

### 🛠️ Công cụ Quản trị tĩnh (Static Admin)
- **Quản lý dữ liệu không cần Backend:** Cho phép thêm, sửa, xóa sách trực tiếp trên giao diện.
- **Nhập/Xuất JSON:** Hỗ trợ import/export danh mục sách thông qua file JSON, giúp dễ dàng cập nhật dữ liệu thông qua GitHub.
- **Kiểm tra dữ liệu:** Tích hợp validation để đảm bảo thông tin sách luôn đầy đủ và chính xác.

---

## 🚀 Hướng dẫn cài đặt & Triển khai

### 1. Yêu cầu hệ thống
- [Node.js](https://nodejs.org/) (Phiên bản 18 trở lên)
- [npm](https://www.npmjs.com/) hoặc [yarn](https://yarnpkg.com/)

### 2. Cài đặt cục bộ (Local Development)
```bash
# Clone project
git clone https://github.com/username/Docln.net.git
cd Docln.net

# Cài đặt dependencies
npm install

# Chạy môi trường phát triển
npm run dev
```
Truy cập: `http://localhost:5173`

### 3. Triển khai lên GitHub Pages (Production)
Dự án đã được cấu hình **GitHub Actions** để tự động triển khai. Bạn chỉ cần:
1. Đẩy code lên nhánh `main`.
2. GitHub Actions sẽ tự động Build và đẩy kết quả lên nhánh `gh-pages`.
3. Vào **Settings** $\rightarrow$ **Pages** $\rightarrow$ Chọn nhánh `gh-pages` để kích hoạt.

---

## ⚙️ Hướng dẫn dành cho Quản trị viên

Vì đây là website tĩnh (Static Site), dữ liệu sách được lưu trong file `src/constants/books.ts` (hoặc file JSON nếu bạn tùy chỉnh).

**Cách cập nhật danh sách sách:**
1. Truy cập vào trang `/admin` trên website.
2. Sử dụng tính năng **"Nhập JSON"** để nạp dữ liệu hiện tại.
3. Thực hiện Thêm/Sửa/Xóa sách theo nhu cầu.
4. Nhấn **"Xuất JSON"** để tải về file `books.json` mới nhất.
5. Mở file `src/constants/books.ts` trong mã nguồn và thay thế nội dung mảng `MOCK_BOOKS` bằng dữ liệu vừa xuất.
6. Commit và Push lên GitHub để cập nhật website cho toàn trường.

---

## 🛠️ Công nghệ sử dụng
- **Framework:** React 18 + Vite
- **Ngôn ngữ:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand (with Persist middleware)
- **Icons:** Lucide React
- **Routing:** React Router DOM
- **Deployment:** GitHub Actions $\rightarrow$ GitHub Pages

---

## 📄 Giấy phép
Dự án được phát triển cho mục đích giáo dục. Bạn có thể tự do tùy chỉnh và triển khai cho trường học của mình.
