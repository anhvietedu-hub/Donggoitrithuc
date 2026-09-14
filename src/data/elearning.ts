// Nội dung landing page khoá E-Learning "Kỹ năng Đóng gói Tri thức".
// Nguồn: file Landing_page_E-Learning_Ky_nang_Dong_goi_Tri_thuc.docx do khách hàng cung cấp.

export const course = {
  label: 'Khoá học online',
  title: 'Kỹ năng Đóng gói Tri thức',
  promise:
    'Biến kiến thức, kinh nghiệm trong đầu bạn thành bộ tài liệu đào tạo chuẩn hoá với sự hỗ trợ AI chỉ trong 15 đến 30 phút',
  lede:
    'Bộ công thức giúp Trainer, Quản lý và chuyên gia nội bộ tự tay sản xuất trọn bộ 5 tài liệu đào tạo mà không cần biết viết lách, không cần biết thiết kế.',
  cadence: 'Mỗi ngày 30 phút. Sau 7 ngày bạn có bộ tài liệu đào tạo đầu tiên của riêng mình.',
  partCount: 5,
  lessonCount: 28,
  seatLimit: 10,
  originalPrice: 4990000,
  price: 899000,
  discountPercent: 82,
  countdownMinutes: 30,
};

// Form đăng ký đổ thẳng về Google Sheet qua một Google Apps Script dạng Web App.
// Mã script nằm ở google-apps-script/dang-ky.gs, hướng dẫn cài ở đầu file đó.
// Dán URL Web App (dạng https://script.google.com/macros/s/.../exec) vào endpoint.
// Khi endpoint còn rỗng, bấm gửi sẽ hiện lời nhắc gọi hotline để trang không nuốt mất lead.
export const registerForm = {
  endpoint: 'https://script.google.com/macros/s/AKfycbyxiyO50dfNhYHFz7QhHwbqK-tLu9dnh-9ZChqCS9ysJNGiK0tIc6Z5C7XiThlNIKNjHg/exec',
};

// Trang thanh toán /thanh-toan/. Các ô để trống là thông tin đang chờ khách hàng xác nhận.
// Chưa điền đủ phần bank thì ready = false: form vẫn hiện lời cảm ơn như cũ,
// không chuyển học viên sang một trang thanh toán thiếu số tài khoản.
export const checkout = {
  bank: {
    name: 'Ngân hàng Quân Đội (MB Bank)',
    binKey: 'mbbank',
    account: '1121888999',
    holder: 'CÔNG TY CP TVDT VÀ PTNNL MAVA',
  },
  // Nội dung chuyển khoản = số điện thoại học viên + hậu tố này.
  // Cú pháp gốc của MAVA là "SĐT_Donggoi"; dấu gạch dưới được đổi thành dấu cách
  // vì nhiều ngân hàng lọc bỏ ký tự đặc biệt khỏi nội dung chuyển khoản.
  transferSuffix: 'Donggoi',
  // Mô tả thật cách kích hoạt; không hứa "tự động" vì MAVA kích hoạt tay.
  activation: 'MAVA sẽ liên hệ và kích hoạt tài khoản học cho bạn muộn nhất 24 giờ sau khi nhận được học phí.',
  zalo: '0968 126 930',
  facebook: 'https://www.facebook.com/viettrainer/',
  legal: {
    company: 'Công ty Cổ phần Tư vấn Đào tạo và Phát triển Nguồn Nhân lực MAVA',
    taxCode: '0110952026',
  },
};

export function checkoutReady() {
  const b = checkout.bank;
  return Boolean(b.name && b.binKey && b.account && b.holder && checkout.transferSuffix);
}

export const contact = {
  hotline: '0968 126 930',
  hotlineTel: '0968126930',
  zalo: 'https://zalo.me/0968126930',
  email: 'mavatraining.company@gmail.com',
  company: 'Công ty Cổ phần Tư vấn Đào tạo và Phát triển Nguồn Nhân lực MAVA',
  address:
    'Phòng 401, Tầng 4, Dịch vụ 8, LK214, Khu đô thị Xa La, Phường Hà Đông, thành phố Hà Nội',
};

export const deliverables = [
  { ext: 'DOCX', name: 'Dàn ý chi tiết', note: 'Outline chương trình, mở ra là dạy được' },
  { ext: 'PPTX', name: 'Slide bài giảng', note: 'Chuẩn thương hiệu, chỉnh sửa được 100%' },
  { ext: 'DOCX', name: 'Bộ câu hỏi kiểm tra', note: '10 đến 20 câu, in ra hoặc chấm điểm tự động' },
  { ext: 'XLSX', name: 'Kế hoạch giảng dạy', note: 'Lesson plan chia theo từng mốc thời gian' },
  { ext: 'DOCX', name: 'Sổ tay học viên', note: 'Workbook phát cho lớp, sẵn sàng tổ chức buổi đào tạo' },
];

export const pains = [
  'Sếp giao chuẩn bị tài liệu đào tạo cho team. Bạn ngồi trước file trắng cả buổi, không biết bắt đầu từ đâu.',
  'Bạn dạy rất hay, nhưng toàn nói chay. Học viên nghe xong về là quên, không có gì để tra cứu lại.',
  'Kinh nghiệm 5 đến 10 năm của bạn đang nằm trong đầu, truyền miệng cho người sau, đến đời thứ ba thì tam sao thất bản.',
  'Soạn một bộ giáo án tử tế mất vài ngày đến vài tuần, trong khi bạn còn cả núi việc chuyên môn.',
  'Bạn đã thử dùng AI, nhưng kết quả ra chung chung, sáo rỗng, không dùng được vào lớp học thật.',
  'Bạn mắc bẫy cầu toàn: chỉnh đi chỉnh lại mãi mà tài liệu vẫn chưa bao giờ xong để đem ra dùng.',
];

export const whyNow = [
  {
    head: 'Không cần nổi tiếng, không cần viết hay',
    body: 'Chỉ cần bạn có kinh nghiệm thực chiến. Quy trình lo phần còn lại.',
  },
  {
    head: 'Nhanh gấp hàng chục lần cách làm cũ',
    body: 'Từ vài ngày hoặc vài tuần rút xuống 15 đến 30 phút cho một bộ tài liệu hoàn chỉnh.',
  },
  {
    head: 'Một lần đóng gói, dùng lại nhiều năm',
    body: 'Tài liệu chuẩn hoá có thể tái sử dụng, cập nhật, chuyển giao cho người khác đứng lớp.',
  },
  {
    head: 'Nâng vị thế của bạn trong tổ chức',
    body: 'Người sở hữu bộ tài liệu chuẩn là người định hình cách cả tổ chức làm việc.',
  },
  {
    head: 'Mở đường cho thu nhập mới',
    body: 'Có bộ tài liệu bài bản là có nền để nhận đứng lớp, làm coach, xây khoá học của riêng mình.',
  },
];

export const comparison = [
  {
    packed: '30 phút có bộ tài liệu đem vào lớp dùng ngay',
    unpacked: 'Vài ngày, vài tuần vẫn chưa xong một bộ giáo án',
  },
  {
    packed: 'Đứng lớp tự tin với slide, bộ đề, lesson plan đầy đủ',
    unpacked: 'Nói chay, phụ thuộc trí nhớ, hay cháy giáo án',
  },
  {
    packed: 'Kinh nghiệm thành tài sản, chuyển giao được cho người sau',
    unpacked: 'Kinh nghiệm chỉ nằm trong đầu, nghỉ việc là mất trắng',
  },
  {
    packed: 'Nhận thêm cơ hội đào tạo, coaching, xây khoá học',
    unpacked: 'Giỏi nhưng không có sản phẩm nào để chứng minh',
  },
  {
    packed: 'Tài liệu sống, cập nhật liên tục theo thực tế',
    unpacked: 'Tài liệu cũ kỹ, dùng một lần rồi bỏ xó',
  },
];

export const curriculum = [
  {
    title: 'Tư duy đóng gói tri thức',
    tag: 'Tư duy đóng gói',
    icon: 'bulb',
    // Ảnh bìa do khách hàng cung cấp. Phần nào chưa có ảnh thì tự rơi về bìa vẽ bằng icon.
    image: '/images/el/parts/tu-duy-dong-goi',
    sub: 'Gỡ rào cản trước khi bắt đầu',
    items: [
      'Vì sao hoàn thành hơn hoàn hảo là nguyên tắc sống còn, và cách thoát khỏi bẫy cầu toàn',
      'Nguyên tắc tài liệu sống và văn hoá Kaizen: cải tiến 5 đến 20% mỗi vòng thay vì làm lại từ đầu',
      'Ai nên là người đóng gói tri thức, và cách phối hợp giữa chuyên gia với L&D khi chuyên gia không có thời gian',
      'Cách chọn đúng đề bài đầu tiên để đóng gói, thay vì ôm đồm cả kho kiến thức',
    ],
    outcome: 'Chọn được chủ đề đầu tiên để đóng gói và bắt tay vào làm ngay trong ngày.',
  },
  {
    title: 'Chuẩn hoá khung dàn ý bài giảng',
    tag: 'Dàn ý Outline',
    icon: 'doc',
    image: '/images/el/parts/khung-dan-y',
    sub: 'Outline',
    items: [
      'Hệ thống hoá kinh nghiệm thực chiến thành khung sườn logic, dễ hiểu, dễ nhớ',
      'Form biểu mẫu chuẩn hoá: điền vào là có khung chương trình hoàn chỉnh',
      'Cấu trúc yêu cầu chuẩn với 4 tham số vàng để ra dàn ý sát bối cảnh doanh nghiệp bạn',
      'Ứng dụng trợ lý AI tạo dàn ý hoàn chỉnh, như ý',
    ],
    outcome: 'Xuất ra file Outline chi tiết cho bất kỳ chủ đề chuyên môn nào của mình.',
  },
  {
    title: 'Thiết kế slide bài giảng chuẩn thương hiệu',
    tag: 'Slide bài giảng',
    icon: 'slide',
    image: '/images/el/parts/thiet-ke-slide',
    sub: 'Slide',
    items: [
      'Cấu trúc slide bài giảng tiêu chuẩn, từ slide tiêu đề đến slide cảm ơn',
      'Biến dàn ý thô thành bộ slide trực quan, chuyên nghiệp trong dưới 5 phút',
      'Đồng bộ 100% bộ nhận diện thương hiệu doanh nghiệp về màu sắc và phong cách',
      'Phong cách tối giản: bỏ chữ rườm rà, tập trung từ khoá, sơ đồ, hình ảnh trực quan',
      'Xuất trực tiếp ra file PowerPoint chỉnh sửa được 100%',
    ],
    outcome: 'Có bộ slide đứng lớp chuẩn thương hiệu mà không cần biết thiết kế.',
  },
  {
    title: 'Tự động hoá bộ câu hỏi kiểm tra',
    tag: 'Bộ câu hỏi',
    icon: 'quiz',
    image: '/images/el/parts/bo-cau-hoi',
    sub: 'Quiz',
    items: [
      'Vì sao lớp học không có đo lường thì không chứng minh được hiệu quả đào tạo',
      'Kỹ thuật trích xuất bộ 10 đến 20 câu trắc nghiệm trực tiếp từ Outline và Slide vừa tạo',
      'Chuẩn hoá đáp án, độ khó và bám sát mục tiêu học tập',
      'Xuất ra Word để in, hoặc chuyển thành form online chấm điểm tự động',
    ],
    outcome: 'Có ngay công cụ đo lường mức độ tiếp thu của học viên sau mỗi buổi.',
  },
  {
    title: 'Lập kế hoạch giảng dạy chi tiết',
    tag: 'Kế hoạch giảng dạy',
    icon: 'plan',
    image: '/images/el/parts/ke-hoach-giang-day',
    sub: 'Lesson Plan',
    items: [
      'Cấu trúc Lesson Plan chuẩn theo từng mốc 10 đến 15 phút',
      'Phân định rõ nội dung, hoạt động giảng viên, hoạt động học viên, phương pháp và công cụ',
      'Kiểm soát thời lượng, xử lý triệt để rủi ro cháy giáo án',
      'Xuất bảng kế hoạch giảng dạy ra file Excel để quản lý và theo dõi',
    ],
    outcome: 'Cầm lesson plan lên lớp và chạy đúng timeline từ đầu đến cuối.',
  },
];

export const elearningPerks = [
  'Học mọi lúc, mọi nơi, trên máy tính hoặc điện thoại, không cần sắp lịch nghỉ làm.',
  'Truy cập trọn đời, xem lại không giới hạn. Thao tác nào chưa kịp làm theo thì tua lại làm cùng.',
  'Học theo từng module ngắn 10 đến 15 phút. Mỗi ngày 30 phút, vừa học vừa làm ra sản phẩm.',
  'Cập nhật miễn phí trọn đời. Công cụ thay đổi, bài học được cập nhật, bạn luôn xem bản mới nhất.',
  'Hỗ trợ hỏi đáp trong nhóm học viên riêng.',
];

export const trainer = {
  name: 'Nguyễn Anh Việt',
  role: 'COO MAVA Company',
  credential: 'NLP Master Coach',
  clients: [
    'F88',
    'Nhất Tín Logistics',
    'ĐHQG Hà Nội',
    'ĐH Công nghiệp',
    'Học viện Nông nghiệp',
    'Appota',
    'Thành Vinh Holding',
    'Maicom Việt Nam',
    'Thế Giới Đất Việt',
    'Soraco',
    'TDA',
    'GS GROUP',
    'Topas Group',
  ],
  story: [
    'Với hơn 6 năm trong lĩnh vực Đào tạo và Phát triển con người, tôi đã trực tiếp tổ chức và đào tạo hơn 6.000 học viên tại Việt Nam.',
    'Trong hành trình đó, tôi chứng kiến một nghịch lý lặp đi lặp lại ở gần như mọi doanh nghiệp: người giỏi nhất thì bận nhất, nên kinh nghiệm quý nhất lại là thứ không bao giờ được viết ra. Đến khi họ rời đi, tổ chức phải xây lại từ đầu.',
    'Bản thân tôi cũng từng mất trọn những đêm cuối tuần chỉ để soạn một bộ giáo án rồi sửa tới sửa lui mà vẫn thấy chưa đủ hoàn hảo để đem ra dùng. Kỹ năng Đóng gói Tri thức là quy trình tôi đúc kết để không ai phải đi lại con đường vòng đó nữa.',
  ],
};

export const gallery = [
  {
    src: '/images/el/teaching.jpg',
    alt: 'Trainer Nguyễn Anh Việt trao đổi với học viên trong một lớp đào tạo của MAVA',
    caption: 'Lớp đào tạo trực tiếp tại doanh nghiệp',
  },
  {
    src: '/images/v2/team.jpg',
    alt: 'Học viên Nhất Tín Logistics chụp ảnh cuối chương trình Nhân bản Nhân tài',
    caption: 'Chương trình Nhân bản Nhân tài tại Nhất Tín Logistics',
  },
  {
    src: '/images/v2/lesson.jpg',
    alt: 'Học viên dựng slide bài giảng trên laptop ngay trong buổi học',
    caption: 'Học viên dựng slide ngay trong buổi học',
  },
  {
    src: '/images/v2/classroom.jpg',
    alt: 'Một lớp đào tạo đông học viên của MAVA chụp ảnh tập thể cuối buổi',
    caption: 'Kết thúc buổi học, mỗi người mang về một bộ tài liệu',
  },
  {
    src: '/images/v2/laptop.jpg',
    alt: 'Màn hình laptop hiển thị slide bài giảng do học viên đóng gói',
    caption: 'Sản phẩm học viên xuất ra tại lớp',
  },
  {
    src: '/images/v2/team-two.jpg',
    alt: 'Đội ngũ Nhất Tín Logistics hoàn thành chương trình đào tạo nội bộ cùng MAVA',
    caption: 'Đội ngũ nội bộ sau khi chuẩn hoá tài liệu đào tạo',
  },
];

export const gifts = [
  {
    name: 'Bộ Form biểu mẫu chuẩn hoá',
    image: '/images/el/gifts/qua-1',
    body: 'Khung Outline, khung Lesson Plan, khung Workbook. Điền vào là dùng được ngay, không cần nghĩ từ đầu.',
    value: 500000,
  },
  {
    name: 'Thư viện câu lệnh Đóng gói Tri thức',
    image: '/images/el/gifts/qua-2',
    body: 'Bộ câu lệnh đã kiểm chứng cho từng bước: dàn ý, slide, bộ đề trắc nghiệm, lesson plan.',
    value: 500000,
  },
  {
    name: 'Bộ template Slide',
    image: '/images/el/gifts/qua-3',
    body: 'Mẫu slide đào tạo phong cách tối giản, sẵn sàng thay màu sắc và logo doanh nghiệp bạn.',
    value: 500000,
  },
  {
    name: 'Cộng đồng học viên MAVA',
    image: '/images/el/gifts/qua-4',
    body: 'Nơi chia sẻ tài liệu, nhận góp ý cho sản phẩm bạn đóng gói.',
    value: 500000,
  },
];

export const audienceFit = [
  'Bạn là Trainer, Coach, giảng viên nội bộ cần chuẩn hoá giáo án và tiết kiệm thời gian soạn bài.',
  'Bạn là Quản lý cấp trung, Trưởng bộ phận đang mất quá nhiều thời gian kèm cặp, đào tạo lặp lại cho nhân sự mới.',
  'Bạn làm HR hoặc L&D và cần xây thư viện tài liệu đào tạo bài bản, tái sử dụng được.',
  'Bạn là chuyên gia nắm giữ bí kíp chuyên môn, muốn để lại di sản kiến thức thay vì mang theo khi rời đi.',
  'Bạn đã thử dùng AI để soạn tài liệu nhưng kết quả ra chung chung, chưa dùng được vào lớp thật.',
];

export const audienceMisfit = [
  'Bạn muốn có sẵn tài liệu để dùng luôn, chứ không muốn tự tay làm ra sản phẩm của mình.',
  'Bạn chưa có kinh nghiệm chuyên môn nào để đóng gói. Khoá học giúp hệ thống hoá cái bạn đã có, không tạo ra chuyên môn thay bạn.',
];

// Video cảm nhận học viên trên kênh YouTube MAVA TRAINING.
// Tên và vai trò lấy từ chính tiêu đề video, không tự đặt thêm.
export const testimonialVideos = [
  {
    id: 'YWwNgZFoSs4',
    name: 'Học viên chương trình Nhân bản Nhân tài',
    role: 'Cảm nhận sau module Kỹ năng Đóng gói Tri thức',
  },
  {
    id: 'mEoay0LlnCA',
    name: 'Ms. Quế Anh',
    role: 'Trưởng phòng Kinh doanh dự án, Nhất Tín Logistics',
  },
  {
    id: 'ykuNJwuYAHo',
    name: 'Lương Thế Mạnh',
    role: 'Học viên Kỹ năng Đóng gói Tri thức',
  },
  {
    id: 'R1CurSAmV34',
    name: 'Đỗ Tiến Trung',
    role: 'Học viên Kỹ năng Đóng gói Tri thức',
  },
  {
    id: '7B_EbRtz5CY',
    name: 'Nguyễn Trọng Hùng',
    role: 'Học viên Kỹ năng Đóng gói Tri thức',
  },
  {
    id: 'LlW1T6DCDJI',
    name: 'Mr. Phước',
    role: 'Nhất Tín Logistics',
  },
];

export function vnd(n: number) {
  return n.toLocaleString('vi-VN') + 'đ';
}
