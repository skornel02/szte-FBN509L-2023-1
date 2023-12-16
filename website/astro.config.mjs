import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  base: '/szte-FBN509L-2023-1',
  integrations: [tailwind()]
});