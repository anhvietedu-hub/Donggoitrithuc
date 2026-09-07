export const site = {
  name: 'MAVA',
  companyFull: 'Công ty cổ phần Tư vấn Đào tạo và Phát triển nguồn nhân lực MAVA',
  phone: '0968126930',
  email: 'mavatraining.company@gmail.com',
  website: 'mavatraining.com',
  eventDateLabel: '12/09/2026',
  eventTimeLabel: '9h - 12h',
  eventISO: '2026-09-12T09:00:00+07:00',
  format: 'Online qua Zoom',
  originalPrice: 1200000,
  formEndpoint: 'https://formspree.io/f/YOUR_FORM_ID',
};

export const pricingTiers = [
  { min: 1, max: 2, price: 499000, label: '1 - 2 vé' },
  { min: 3, max: 4, price: 399000, label: 'Từ 3 vé (Combo Lãnh Đạo)' },
  { min: 5, max: Infinity, price: 299000, label: 'Từ 5 vé (Combo Doanh Nghiệp)' },
];

export function priceFor(qty: number) {
  const tier = pricingTiers.find((t) => qty >= t.min && qty <= t.max) ?? pricingTiers[0];
  return tier.price;
}

export function formatVND(n: number) {
  return n.toLocaleString('vi-VN') + 'đ';
}
