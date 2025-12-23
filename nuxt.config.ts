import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  css: ['~/assets/css/tailwind.css'],
  modules: ['@nuxtjs/color-mode', '@nuxt/image', 'nuxt-security'],
  components: [
    { path: '~/components', pathPrefix: false, extensions: ['.vue'] },
  ],
  plugins: [
     
  ],
  runtimeConfig: {
    N8N_WEBHOOK_URL: '',
    N8N_WEBHOOK_SECRET: '',
  },
  colorMode: {
    preference: 'dark', // Default to dark mode
    fallback: 'dark',    // Fallback to dark
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    dataValue: 'theme',
    storage: 'localStorage',
    storageKey: 'nuxt-color-mode'
  },
  vite: {
    css: { devSourcemap: false },
    build: { sourcemap: false },
    resolve: {
      alias: {
        '@nuxt/nitro-server/dist/runtime/utils/cache-driver': resolve('./server/utils/cache-driver.js'),
        '@nuxt/nitro-server/dist/runtime/utils/cache-driver.js': resolve('./server/utils/cache-driver.js'),
      },
    },
    optimizeDeps: {
      exclude: ['@nuxt/nitro-server'],
    },
    plugins: [tailwindcss()],
  },
  nitro: {
    externals: {
      inline: ['@nuxt/nitro-server'],
    },
  },
})