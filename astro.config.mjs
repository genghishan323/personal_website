import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Must match public/CNAME.
export default defineConfig({
  site: 'https://james-m-han.com',
  integrations: [sitemap()],
});
