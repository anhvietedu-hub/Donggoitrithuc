/**
 * MỘT FILE DUY NHẤT cho Web App của landing page donggoitrithuc.mavatraining.com.
 * Gồm hai việc:
 *   1. Nhận đăng ký từ form và ghi vào trang tính đầu tiên.
 *   2. Đếm lượt truy cập (trang tính "LuotTruyCap") và trả số liệu cho trang /bao-cao/.
 *
 * CÀI ĐẶT:
 * 1. Mở Google Sheet nhận đăng ký > Tiện ích mở rộng > Apps Script.
 * 2. XOÁ HẾT mã cũ trong mọi file của dự án (nếu có nhiều file thì xoá bớt,
 *    chỉ để lại một file), rồi dán toàn bộ file này vào. Bấm Lưu.
 *    Quan trọng: cả dự án chỉ được có MỘT hàm doGet và MỘT hàm doPost,
 *    nếu còn hàm cũ ở file khác thì Google chạy nhầm hàm và trang báo cáo báo lỗi.
 * 3. Triển khai > Quản lý bản triển khai > sửa bản đang dùng (biểu tượng bút chì)
 *    > Phiên bản: "Phiên bản mới" > Triển khai. URL Web App giữ nguyên.
 *
 * Kiểm tra nhanh: mở URL Web App kèm ?action=report&key=mava2026 trên trình duyệt.
 * Thấy chữ "days" là đã chạy bản mới. Còn thấy "Web App đăng ký MAVA đang chạy"
 * nghĩa là bản cũ vẫn đang được triển khai.
 *
 * Không lưu tên, số điện thoại hay địa chỉ IP của người xem trang.
 */

// Trang tính nhận đăng ký. Để trống thì dùng trang tính đầu tiên.
const SHEET_NAME = '';
const HEADERS = ['Thời gian', 'Họ và tên', 'Số điện thoại', 'Email', 'Trang đăng ký'];

// Trang tính lưu lượt xem. Script tự tạo nếu chưa có.
const TRACK_SHEET = 'LuotTruyCap';
// Cột "Ngày" lưu dạng chữ yyyy-MM-dd. Gộp số liệu theo cột này cho chắc,
// vì ô ngày giờ đọc lại từ Sheet không phải lúc nào cũng ra kiểu ngày.
const TRACK_HEADERS = [
  'Thời gian',
  'Ngày',
  'Trang',
  'Nguồn',
  'Chi tiết nguồn',
  'Chiến dịch',
  'Thiết bị',
  'Mã khách',
  'Khách mới',
];

// Mật khẩu mở trang báo cáo. Đổi ở đây thì đổi luôn reportKey trong src/data/analytics.ts.
const REPORT_KEY = 'mava2026';

// Mốc bắt đầu tính số liệu, dạng yyyy-MM-dd. Mọi lượt xem trước 00h ngày này
// vẫn nằm trong trang tính nhưng không được tính vào báo cáo.
// Để trống ('') thì tính đủ 30 ngày gần nhất như trước.
const START_DATE = '2026-10-12';

/* ---------------- 1. Nhận đăng ký ---------------- */

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

/* ---------------- 2. Thống kê truy cập ---------------- */

function doGet(e) {
  const p = (e && e.parameter) || {};

  if (p.action === 'hit') return out(p, logHit(p));
  if (p.action === 'report') {
    if (p.key !== REPORT_KEY) return out(p, { ok: false, error: 'Sai mật khẩu báo cáo.' });
    return out(p, report());
  }
  return out(p, { ok: true, message: 'Web App MAVA đang chạy (bản có thống kê).' });
}

function logHit(p) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const now = new Date();
    trackSheet().appendRow([
      now,
      Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM-dd'),
      clip(p.page, 200),
      clip(p.source, 80) || 'Truy cập trực tiếp',
      clip(p.ref, 200),
      clip(p.campaign, 80),
      clip(p.device, 20) || 'Không rõ',
      clip(p.vid, 40),
      p.first === '1' ? 1 : 0,
    ]);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: String(err) };
  } finally {
    lock.releaseLock();
  }
}

function trackSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(TRACK_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(TRACK_SHEET);
    sheet.appendRow(TRACK_HEADERS);
    sheet.getRange(1, 1, 1, TRACK_HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Tổng hợp 30 ngày gần nhất cho trang /bao-cao/.
function report() {
  const sheet = trackSheet();
  const last = sheet.getLastRow();
  const tz = Session.getScriptTimeZone();
  const now = new Date();
  const updatedAt = Utilities.formatDate(now, tz, 'HH:mm dd/MM/yyyy');

  if (last < 2) {
    return {
      ok: true,
      updatedAt: updatedAt,
      today: { views: 0, visitors: 0 },
      days: emptyDays(tz, startKey(tz)),
      sources: [],
      devices: [],
    };
  }

  const from = new Date();
  from.setHours(0, 0, 0, 0);
  from.setDate(from.getDate() - 29);
  let fromKey = Utilities.formatDate(from, tz, 'yyyy-MM-dd');
  if (START_DATE && START_DATE > fromKey) fromKey = START_DATE;

  const values = sheet.getRange(2, 1, last - 1, TRACK_HEADERS.length).getValues();
  const today = Utilities.formatDate(now, tz, 'yyyy-MM-dd');

  const byDay = {};
  const dayVisitors = {};
  const sources = {};
  const sourceVisitors = {};
  const devices = {};
  const todayVisitors = {};
  let todayViews = 0;

  for (let i = 0; i < values.length; i++) {
    const row = values[i];
    const day = dayKey(row, tz);
    if (!day || day < fromKey) continue;

    const vid = String(row[7] || '');
    const source = String(row[3] || 'Truy cập trực tiếp');
    const device = String(row[6] || 'Không rõ');

    byDay[day] = (byDay[day] || 0) + 1;
    (dayVisitors[day] = dayVisitors[day] || {})[vid] = 1;
    sources[source] = (sources[source] || 0) + 1;
    (sourceVisitors[source] = sourceVisitors[source] || {})[vid] = 1;
    devices[device] = (devices[device] || 0) + 1;

    if (day === today) {
      todayViews++;
      todayVisitors[vid] = 1;
    }
  }

  const days = emptyDays(tz, fromKey).map(function (d) {
    return {
      date: d.date,
      views: byDay[d.date] || 0,
      visitors: Object.keys(dayVisitors[d.date] || {}).length,
    };
  });

  const sourceList = Object.keys(sources)
    .map(function (name) {
      return { name: name, views: sources[name], visitors: Object.keys(sourceVisitors[name]).length };
    })
    .sort(function (a, b) {
      return b.views - a.views;
    });

  const deviceList = Object.keys(devices)
    .map(function (name) {
      return { name: name, views: devices[name] };
    })
    .sort(function (a, b) {
      return b.views - a.views;
    });

  return {
    ok: true,
    updatedAt: updatedAt,
    today: { views: todayViews, visitors: Object.keys(todayVisitors).length },
    days: days,
    sources: sourceList,
    devices: deviceList,
  };
}

// Lấy ngày yyyy-MM-dd của một dòng: ưu tiên cột Ngày, không có thì suy từ cột Thời gian.
function dayKey(row, tz) {
  const text = String(row[1] || '').trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;

  const when = row[0];
  if (when instanceof Date) return Utilities.formatDate(when, tz, 'yyyy-MM-dd');

  const parsed = new Date(when);
  return isNaN(parsed.getTime()) ? '' : Utilities.formatDate(parsed, tz, 'yyyy-MM-dd');
}

// Ngày bắt đầu khung biểu đồ: muộn hơn giữa mốc reset và 30 ngày trước.
function startKey(tz) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - 29);
  const key = Utilities.formatDate(d, tz, 'yyyy-MM-dd');
  return START_DATE && START_DATE > key ? START_DATE : key;
}

// Khung ngày liên tục, kể cả ngày chưa có lượt nào, để biểu đồ không bị đứt quãng.
function emptyDays(tz, firstKey) {
  const list = [];
  // Tách tay yyyy-MM-dd để không phụ thuộc cách trình thông dịch hiểu chuỗi ngày.
  const parts = String(firstKey || '').split('-');
  const cursor =
    parts.length === 3
      ? new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]))
      : new Date();
  cursor.setHours(0, 0, 0, 0);
  if (parts.length !== 3) cursor.setDate(cursor.getDate() - 29);
  const end = new Date();
  end.setHours(0, 0, 0, 0);
  while (cursor <= end) {
    list.push({ date: Utilities.formatDate(cursor, tz, 'yyyy-MM-dd'), views: 0, visitors: 0 });
    cursor.setDate(cursor.getDate() + 1);
  }
  return list;
}

/* ---------------- Dùng chung ---------------- */

function clip(value, max) {
  return String(value == null ? '' : value)
    .trim()
    .slice(0, max);
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

// Có tham số callback thì trả JSONP, không thì trả JSON thường.
function out(p, obj) {
  const body = JSON.stringify(obj);
  if (p && p.callback) {
    return ContentService.createTextOutput(p.callback + '(' + body + ');').setMimeType(
      ContentService.MimeType.JAVASCRIPT
    );
  }
  return ContentService.createTextOutput(body).setMimeType(ContentService.MimeType.JSON);
}
