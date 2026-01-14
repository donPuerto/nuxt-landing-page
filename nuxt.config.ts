/// <reference types="node" />
import tailwindcss from '@tailwindcss/vite'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  css: ['~/assets/css/tailwind.css'],
  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/image',
    'nuxt-security',
  ],
  components: [
    { path: '~/components', pathPrefix: false, extensions: ['.vue'] },
  ],
  plugins: [],
  imports: {
    dirs: ['~/composables', '~/composables/**'],
  },
  app: {
    head: {
      style: [
        {
          key: 'initial-theme-colors',
          innerHTML: 'html{background-color:#f8f9ff;color:#0f172a;}html.dark{background-color:#0f172a;color:#e0e7ff;}',
        },
      ],
      script: [
        {
          key: 'initial-theme-script',
          innerHTML: `(() => {
            try {
              const doc = document.documentElement
              const storedTheme = localStorage.getItem('theme-color') || localStorage.getItem('accent-theme')
              if (storedTheme) doc.dataset.theme = storedTheme

              const saved = localStorage.getItem('nuxt-color-mode')
              const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
              const isDark = saved ? saved === 'dark' : systemDark

              if (isDark) {
                doc.classList.add('dark')
              } else {
                doc.classList.remove('dark')
              }
            } catch (error) {
              console.warn('Theme bootstrap failed', error)
            }
          })()`,
          tagPriority: 'critical',
        },
      ]
    }
  },
  runtimeConfig: {
    n8nWebhookUrl: process.env.NUXT_N8N_WEBHOOK_URL || '',
    n8nWebhookSecret: process.env.NUXT_N8N_WEBHOOK_SECRET || '',
    public: {
      n8nChatWebhookUrl: process.env.NUXT_PUBLIC_N8N_CHAT_WEBHOOK_URL || '',
    },
  },
  colorMode: {
    preference: 'dark', // Default to dark mode
    fallback: 'dark',    // Fallback to dark
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    dataValue: 'color-mode',
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
          ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'; worker-src 'self' blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:;"
          : "script-src 'self' 'unsafe-inline' https:; worker-src 'self' blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:;"
      }
    }
  },
  
})