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
  colorMode: {
    preference: 'system', // Default preference
    fallback: 'light',    // Fallback when system preference isn't available
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',      // Important for Tailwind dark mode
    dataValue: '',        // Use class-based dark mode instead of data attribute
    storage: 'sessionStorage', // Match theme manager's sessionStorage
    storageKey: 'nuxt-color-mode'
  },
   vite: {
     plugins: [
      tailwindcss(),
    ],
   },
  //  nitro: {
  //   prerender: {
  //       autoSubfolderIndex: false
  //     },
  //     preset: "cloudflare_module",
  //     cloudflare: {
  //         deployConfig: true,
  //         nodeCompat: true
  //       },
  //     externals: {
  //       inline: ['@nuxt/nitro-server']
  //     }
  // },
})