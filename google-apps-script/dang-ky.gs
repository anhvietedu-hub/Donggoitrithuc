/**
 * Nhận đăng ký từ landing page donggoitrithuc.mavatraining.com và ghi vào Google Sheet.
 *
 * CÀI ĐẶT (làm một lần):
 * 1. Mở Google Sheet nhận dữ liệu > Tiện ích mở rộng > Apps Script.
 * 2. Xoá hết mã mặc định, dán toàn bộ file này vào, bấm Lưu.
 * 3. Triển khai > Tùy chọn triển khai mới > loại "Ứng dụng web":
 *      - Thực thi dưới dạng: Tôi (tài khoản sở hữu Sheet)
 *      - Người có quyền truy cập: Bất kỳ ai
 *    Bấm Triển khai, cấp quyền khi Google hỏi.
 * 4. Sao chép "URL ứng dụng web" (dạng https://script.google.com/macros/s/.../exec)
 *    và dán vào registerForm.endpoint trong src/data/elearning.ts.
 *
 * Sửa mã này sau khi đã triển khai thì phải: Triển khai > Quản lý bản triển khai >
 * sửa bản đang dùng > Phiên bản: "Phiên bản mới". Làm vậy URL giữ nguyên.
 */

// Tên trang tính nhận dữ liệu. Để trống thì dùng trang tính đầu tiên.
const SHEET_NAME = '';

const HEADERS = ['Thời gian', 'Họ và tên', 'Số điện thoại', 'Email', 'Trang đăng ký'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // tránh hai lượt gửi cùng lúc ghi đè cùng một dòng

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = (SHEET_NAME && ss.getSheetByName(SHEET_NAME)) || ss.getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    const p = (e && e.parameter) || {};
    sheet.appendRow([
      new Date(),
      safe(p.name, 100),
      // Dấu nháy đầu giữ số điện thoại ở dạng chữ, không bị Sheet cắt mất số 0 đầu.
      "'" + clip(p.phone, 20),
      safe(p.email, 120),
      safe(p.page, 300),
    ]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Mở URL Web App trên trình duyệt sẽ thấy dòng này, dùng để kiểm tra script đang chạy.
function doGet() {
  return json({ ok: true, message: 'Web App đăng ký MAVA đang chạy.' });
}

function clip(value, max) {
  return String(value || '').trim().slice(0, max);
}

// Người điền có thể gõ "=..." để Sheet chạy như công thức. Thêm dấu nháy để luôn là chữ.
function safe(value, max) {
  const v = clip(value, max);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
