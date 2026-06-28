import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://leonardoserrano.site',
  integrations: [
    react(),
    mdx(),
    sitemap(),
    icon({
      iconSets: {
        mdi: () => import('@iconify-json/mdi/icons.json').then((m) => m.default),
        'simple-icons': () =>
          import('@iconify-json/simple-icons/icons.json').then((m) => m.default),
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
