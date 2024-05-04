import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    site: 'https://leonardoserrano.site',
    integrations: [
        tailwind({ applyBaseStyles: false }),
        react(),
        sitemap(),
        icon(),
    ],
});
