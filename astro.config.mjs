// @ts-check
import { defineConfig } from 'astro/config';

// Site chạy ở donggoitrithuc.mavatraining.com với trang E-Learning ở địa chỉ gốc.
// Trang workshop cũ vẫn giữ trong code; build với SITE_VARIANT=workshop để đưa nó ra gốc.
// Trang gốc được chọn ngay lúc build chứ không chọn bằng điều kiện trong trang,
// vì Astro gộp CSS của mọi component được import vào cùng một trang,
// và CSS của hai trang này sẽ đè giao diện lên nhau.
const variant = process.env.SITE_VARIANT === 'workshop' ? 'workshop' : 'elearning';

const sites = {
  elearning: 'https://donggoitrithuc.mavatraining.com',
  workshop: 'https://donggoi.mavatraining.com',
};

// https://astro.build/config
export default defineConfig({
  site: sites[variant],
  integrations: [
    {
      name: 'site-variant-root',
      hooks: {
        'astro:config:setup': ({ injectRoute }) => {
          injectRoute({
            pattern: '/',
            entrypoint: `./src/routes/${variant}.astro`,
          });
        },
      },
    },
  ],
});
