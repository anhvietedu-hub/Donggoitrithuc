# MAVA — Landing Page "Kỹ năng Đóng gói Tri thức"

Landing page xây dựng bằng [Astro](https://astro.build) (site tĩnh, không cần server Node chạy liên tục), dựa theo bản thiết kế MAVA đã cung cấp.

## 1. Chạy thử ở máy local

```bash
npm install
npm run dev
```

Mở `http://localhost:4321` để xem. Sửa nội dung ở `src/components/*.astro` hoặc `src/data/site.ts`, trang sẽ tự tải lại.

## 2. Việc cần làm trước khi public (quan trọng)

- [ ] **Form đăng ký chưa nhận được dữ liệu.** Mở `src/data/site.ts`, thay `formEndpoint: 'https://formspree.io/f/YOUR_FORM_ID'` bằng endpoint thật của bạn:
  1. Tạo tài khoản miễn phí tại [formspree.io](https://formspree.io) bằng email `mavatraining.company@gmail.com`.
  2. Tạo form mới, Formspree sẽ cho một link dạng `https://formspree.io/f/xxxxxxxx`.
  3. Dán link đó vào `formEndpoint`.
- [ ] **2 video cảm nhận học viên chưa có link thật** (`src/components/TestimonialVideos.astro`). Hiện đang hiển thị khung giữ chỗ (nút play, chưa nhúng video) vì mình không tự suy đoán link YouTube. Dán ID video YouTube thật vào biến `videos` ở đầu file (ví dụ `id: 'dQw4w9WgXcQ'` — phần sau `v=` trong URL YouTube).
- [ ] **Rà lại 4 thẻ "Bạn Nhận Được Gì"** (`src/components/BenefitsSection.astro`, biến `perks`) — bản PDF gốc bị cắt chữ ở góc trang nên mình đã diễn giải lại cho hợp lý, bạn nên đọc lại và chỉnh đúng ý.
- [ ] Kiểm tra lại ngày/giờ sự kiện (`9h - 12h ngày 12/09/2026`) trong `src/data/site.ts` nếu có thay đổi.

## 3. Build ra site tĩnh

```bash
npm run build
```

Kết quả nằm ở thư mục `dist/` — đây là toàn bộ file HTML/CSS/JS tĩnh, upload thẳng lên hosting là chạy được, không cần cài Node.js trên server.

## 4. Đẩy code lên GitHub

```bash
git init
git add .
git commit -m "Landing page MAVA - Kỹ năng đóng gói tri thức"
git branch -M main
git remote add origin <URL_REPO_GITHUB_CUA_BAN>
git push -u origin main
```

(Thay `<URL_REPO_GITHUB_CUA_BAN>` bằng link repo bạn tạo trên GitHub.)

## 5. Deploy lên Hostinger

**Cách đơn giản nhất — upload thủ công:**

1. Chạy `npm run build` để tạo thư mục `dist/`.
2. Đăng nhập [hPanel Hostinger](https://hpanel.hostinger.com) → **File Manager** (hoặc dùng FTP với thông tin trong hPanel → **FTP Accounts**).
3. Vào thư mục `public_html` (hoặc thư mục gốc của domain `mavatraining.com`).
4. Xoá các file cũ (nếu có) và upload **toàn bộ nội dung bên trong** thư mục `dist/` (không upload chính thư mục `dist`, mà upload các file/thư mục *bên trong* nó) vào `public_html`.
5. Truy cập `mavatraining.com` để kiểm tra.

**Nâng cấp sau này — tự động deploy khi push GitHub:** Hostinger hPanel có mục **Website → Auto Deployment** (Git), cho phép trỏ vào repo GitHub và tự deploy khi có commit mới lên nhánh `main`. Vì đây là site tĩnh nên cần cấu hình build command `npm run build` và thư mục output `dist`.

## Cấu trúc dự án

```
src/
  components/     UI từng phần của trang (Hero, ProblemSection, RegisterSection, ...)
  data/site.ts    Thông tin trung tâm: giá vé, ngày sự kiện, liên hệ, form endpoint
  pages/index.astro   Trang chính, ghép các component lại
  styles/global.css   Màu thương hiệu, font, các class dùng chung
public/images/    Ảnh thật trích từ bản thiết kế gốc (logo, ảnh sự kiện, đồ họa)
```
