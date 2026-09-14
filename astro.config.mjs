// @ts-check
import { defineConfig } from 'astro/config';

// Một repo, hai tên miền:
//   donggoi.mavatraining.com        -> trang workshop ở địa chỉ gốc (mặc định)
//   donggoitrithuc.mavatraining.com -> trang E-Learning ở địa chỉ gốc (SITE_VARIANT=elearning)
// Trang gốc được chọn ngay lúc build chứ không chọn bằng điều kiện trong trang,
// vì Astro gộp CSS của mọi component được import vào cùng một trang,
// và CSS của hai trang này sẽ đè giao diện lên nhau.
const variant = process.env.SITE_VARIANT === 'elearning' ? 'elearning' : 'workshop';

const sites = {
  workshop: 'https://donggoi.mavatraining.com',
  elearning: 'https://donggoitrithuc.mavatraining.com',
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
