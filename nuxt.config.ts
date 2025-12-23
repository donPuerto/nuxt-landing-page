/// <reference types="node" />
import tailwindcss from '@tailwindcss/vite'
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
    n8nWebhookUrl: process.env.NUXT_N8N_WEBHOOK_URL || '',
    n8nWebhookSecret: process.env.NUXT_N8N_WEBHOOK_SECRET || '',
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
      alias: {},
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
    experimental: {
      // Disable strict CSP in development
    }
  },
  routeRules: {
    '/**': {
      headers: {
        'Content-Security-Policy': process.env.NODE_ENV === 'development' 
          ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:;"
          : "script-src 'self' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:;"
      }
    }
  },
})