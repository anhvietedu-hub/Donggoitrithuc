// Thống kê truy cập: mỗi lượt xem được gửi về chính Web App Apps Script đang nhận đăng ký,
// rồi trang /bao-cao/ đọc lại số liệu tổng hợp từ đó.
// Mã script: google-apps-script/mava-web-app.gs (dán đè toàn bộ mã cũ rồi triển khai phiên bản mới).
import { registerForm } from './elearning';

export const analytics = {
  endpoint: registerForm.endpoint,
  // Phải trùng với REPORT_KEY trong mava-web-app.gs.
  reportKey: 'mava2026',
};

export function analyticsReady() {
  return Boolean(analytics.endpoint);
}
