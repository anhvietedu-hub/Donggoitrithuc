// Thống kê truy cập: mỗi lượt xem được gửi về chính Web App Apps Script đang nhận đăng ký,
// rồi trang /bao-cao/ đọc lại số liệu tổng hợp từ đó.
// Mã script: google-apps-script/thong-ke.gs (dán thêm vào script cũ rồi triển khai phiên bản mới).
import { registerForm } from './elearning';

export const analytics = {
  endpoint: registerForm.endpoint,
  // Phải trùng với REPORT_KEY trong thong-ke.gs.
  reportKey: 'mava2026',
};

export function analyticsReady() {
  return Boolean(analytics.endpoint);
}
