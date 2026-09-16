/**
 * Thống kê truy cập landing page donggoitrithuc.mavatraining.com.
 *
 * Ghi mỗi lượt xem vào một trang tính riêng ("TruyCap") trong cùng Google Sheet
 * đang nhận đăng ký, và trả về số liệu tổng hợp cho trang báo cáo /bao-cao/.
 *
 * CÀI ĐẶT (làm một lần):
 * 1. Mở Google Sheet nhận đăng ký > Tiện ích mở rộng > Apps Script.
 * 2. Dán TOÀN BỘ nội dung file này vào CUỐI file mã đang có (đừng xoá phần doPost
 *    của dang-ky.gs). Nếu file cũ đã có hàm doGet thì xoá hàm doGet cũ đi,
 *    vì file này có doGet mới làm cả việc cũ.
 * 3. Bấm Lưu, rồi Triển khai > Quản lý bản triển khai > sửa bản đang dùng >
 *    Phiên bản: "Phiên bản mới" > Triển khai. URL Web App giữ nguyên.
 *
 * Không lưu tên, số điện thoại hay địa chỉ IP của người xem. Mỗi người chỉ được
 * đánh dấu bằng một mã ngẫu nhiên do chính trình duyệt của họ tạo ra.
 */

// Trang tính lưu lượt xem. Script tự tạo nếu chưa có.
const TRACK_SHEET = 'TruyCap';

// Mật khẩu để mở trang báo cáo. Đổi chuỗi này thì phải đổi cả reportKey
// trong src/data/analytics.ts của website.
const REPORT_KEY = 'mava2026';

const TRACK_HEADERS = [
  'Thời gian',
  'Trang',
  'Nguồn',
  'Chi tiết nguồn',
  'Chiến dịch',
  'Thiết bị',
  'Mã khách',
  'Khách mới',
];

function doGet(e) {
  const p = (e && e.parameter) || {};

  if (p.action === 'hit') {
    return out(p, logHit(p));
  }
  if (p.action === 'report') {
    if (p.key !== REPORT_KEY) return out(p, { ok: false, error: 'Sai mật khẩu báo cáo.' });
    return out(p, report());
  }
  return out(p, { ok: true, message: 'Web App MAVA đang chạy.' });
}

// Ghi một lượt xem.
function logHit(p) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const sheet = trackSheet();
    sheet.appendRow([
      new Date(),
      cut(p.page, 200),
      cut(p.source, 80) || 'Truy cập trực tiếp',
      cut(p.ref, 200),
      cut(p.campaign, 80),
      cut(p.device, 20) || 'Không rõ',
      cut(p.vid, 40),
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

// Tổng hợp 30 ngày gần nhất cho trang báo cáo.
function report() {
  const sheet = trackSheet();
  const last = sheet.getLastRow();
  if (last < 2) return { ok: true, days: [], sources: [], devices: [], today: emptyToday() };

  const tz = Session.getScriptTimeZone();
  const from = new Date();
  from.setHours(0, 0, 0, 0);
  from.setDate(from.getDate() - 29);

  const values = sheet.getRange(2, 1, last - 1, TRACK_HEADERS.length).getValues();
  const today = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd');

  const byDay = {};
  const dayVisitors = {};
  const sources = {};
  const sourceVisitors = {};
  const devices = {};
  const todayVisitors = {};
  let todayViews = 0;

  for (let i = 0; i < values.length; i++) {
    const row = values[i];
    const when = row[0];
    if (!(when instanceof Date) || when < from) continue;

    const day = Utilities.formatDate(when, tz, 'yyyy-MM-dd');
    const vid = String(row[6] || '');
    const source = String(row[2] || 'Truy cập trực tiếp');
    const device = String(row[5] || 'Không rõ');

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

  const days = [];
  const cursor = new Date(from);
  const end = new Date();
  end.setHours(0, 0, 0, 0);
  while (cursor <= end) {
    const key = Utilities.formatDate(cursor, tz, 'yyyy-MM-dd');
    days.push({
      date: key,
      views: byDay[key] || 0,
      visitors: Object.keys(dayVisitors[key] || {}).length,
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  const sourceList = Object.keys(sources)
    .map(function (name) {
      return {
        name: name,
        views: sources[name],
        visitors: Object.keys(sourceVisitors[name]).length,
      };
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
    updatedAt: Utilities.formatDate(new Date(), tz, 'HH:mm dd/MM/yyyy'),
    today: { views: todayViews, visitors: Object.keys(todayVisitors).length },
    days: days,
    sources: sourceList,
    devices: deviceList,
  };
}

function emptyToday() {
  return { views: 0, visitors: 0 };
}

function cut(value, max) {
  return String(value == null ? '' : value)
    .trim()
    .slice(0, max);
}

// Trả JSON. Có tham số callback thì trả JSONP để trang web đọc được từ tên miền khác.
function out(p, obj) {
  const body = JSON.stringify(obj);
  if (p && p.callback) {
    return ContentService.createTextOutput(p.callback + '(' + body + ');').setMimeType(
      ContentService.MimeType.JAVASCRIPT
    );
  }
  return ContentService.createTextOutput(body).setMimeType(ContentService.MimeType.JSON);
}
