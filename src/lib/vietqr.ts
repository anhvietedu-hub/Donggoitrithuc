// Tạo chuỗi dữ liệu VietQR (chuẩn EMVCo của NAPAS) cho chuyển khoản tới một số tài khoản.
// Chuỗi này đưa vào thư viện vẽ QR; app ngân hàng quét sẽ tự điền số tài khoản,
// số tiền và nội dung chuyển khoản. Tạo ngay trên máy người xem, không gọi dịch vụ ngoài,
// nên số điện thoại học viên trong nội dung chuyển khoản không bị gửi đi đâu.

// Mã BIN ngân hàng theo danh sách NAPAS.
export const BANK_BINS: Record<string, string> = {
  vietcombank: '970436',
  vietinbank: '970415',
  bidv: '970418',
  agribank: '970405',
  mbbank: '970422',
  techcombank: '970407',
  acb: '970416',
  vpbank: '970432',
  tpbank: '970423',
  sacombank: '970403',
  vib: '970441',
  hdbank: '970437',
  shb: '970443',
  ocb: '970448',
  msb: '970426',
  seabank: '970440',
  eximbank: '970431',
  lpbank: '970449',
};

function field(id: string, value: string) {
  return id + String(value.length).padStart(2, '0') + value;
}

// CRC-16/CCITT-FALSE: đa thức 0x1021, khởi tạo 0xFFFF. Tính trên cả chuỗi kể cả "6304".
export function crc16(input: string) {
  let crc = 0xffff;
  for (let i = 0; i < input.length; i++) {
    crc ^= input.charCodeAt(i) << 8;
    for (let b = 0; b < 8; b++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

// Ngân hàng Việt Nam bỏ dấu và ký tự đặc biệt trong nội dung chuyển khoản.
// Chuẩn hoá trước để nội dung quét ra đúng y như nội dung hiển thị trên trang.
export function toTransferText(text: string, max = 50) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^A-Za-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

export function buildVietQR(opts: { bin: string; account: string; amount: number; message: string }) {
  const beneficiary = field('00', opts.bin) + field('01', opts.account);
  const merchant = field('00', 'A000000727') + field('01', beneficiary) + field('02', 'QRIBFTTA');
  const body =
    field('00', '01') +
    field('01', '12') + // 12 = mã dùng một lần, có sẵn số tiền
    field('38', merchant) +
    field('53', '704') + // VND
    field('54', String(Math.round(opts.amount))) +
    field('58', 'VN') +
    field('62', field('08', toTransferText(opts.message))) +
    '6304';
  return body + crc16(body);
}
