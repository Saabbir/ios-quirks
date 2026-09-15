// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://saabbir.github.io',
  base: '/ios-quirks',
  vite: {
    plugins: [tailwindcss()]
  }
});