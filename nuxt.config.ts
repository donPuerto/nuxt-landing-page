/// <reference types="node" />
import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  css: ['~/assets/css/tailwind.css'],
  modules: [
    '@nuxt/image',
    '@nuxtjs/color-mode',
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
    // @ts-expect-error spaLoadingTemplate is provided by Nuxt runtime
    spaLoadingTemplate: '<div id="nuxt-loading" style="position:fixed;inset:0;background-color:#050713;background-image:linear-gradient(180deg,#11192f 0%,#050713 100%);background-repeat:no-repeat;background-size:cover"></div>',
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      style: [
        {
          innerHTML: 'html,body,#__nuxt{background-color:#050713!important;color:#e0e7ff!important;margin:0;padding:0;min-height:100%;background-image:linear-gradient(180deg,#11192f 0%,#050713 100%)!important;background-repeat:no-repeat;background-size:cover}html.light,html.light body,html.light #__nuxt{background-color:#f8f9ff!important;color:#0f172a!important;background-image:linear-gradient(180deg,#f8f9ff 0%,#e4e7ff 100%)!important}',
          tagPosition: 'head',
        },
      ],
      meta: [
        { name: 'theme-color', content: '#050713' },
        { name: 'color-scheme', content: 'dark' },
      ],
      script: [
        {
          innerHTML: `!function(){try{var start=performance.now();var m=localStorage.getItem('nuxt-color-mode')||'dark';var t=localStorage.getItem('theme-color')||localStorage.getItem('accent-theme')||'default';var d=document.documentElement;var dark=m==='dark';var apply=function(el){if(!el){return;}el.style.backgroundColor=dark?'#050713':'#f8f9ff';el.style.color=dark?'#e0e7ff':'#0f172a';el.style.backgroundImage=dark?'linear-gradient(180deg,#11192f 0%,#050713 100%)':'linear-gradient(180deg,#f8f9ff 0%,#e4e7ff 100%)';el.style.backgroundRepeat='no-repeat';el.style.backgroundSize='cover';};var snap=function(label,el){if(!el){console.log('[theme-boot] '+label+' missing');return;}var s=getComputedStyle(el);console.log('[theme-boot] '+label+' bg=%s img=%s color=%s',s.backgroundColor,s.backgroundImage,s.color);};var frameSnap=function(label){snap(label+':html',d);snap(label+':body',document.body);snap(label+':root',document.getElementById('__nuxt'));};d.classList.toggle('dark',dark);d.classList.toggle('light',!dark);d.dataset.theme=t;d.style.colorScheme=dark?'dark':'light';apply(d);apply(document.body);apply(document.getElementById('__nuxt'));console.log('[theme-boot] mode=%s theme=%s dark=%s body=%s %sms',m,t,dark,!!document.body,Math.round(performance.now()-start));frameSnap('init');document.addEventListener('readystatechange',function(){console.log('[theme-boot] readyState=%s %sms',document.readyState,Math.round(performance.now()-start));frameSnap('state-'+document.readyState);});if(document.body){apply(document.body);snap('body',document.body);}else{document.addEventListener('DOMContentLoaded',function(){apply(document.body);apply(document.getElementById('__nuxt'));snap('body-ready',document.body);snap('root-ready',document.getElementById('__nuxt'));console.log('[theme-boot] body-ready %sms',Math.round(performance.now()-start));});}var frames=0;var raf=function(){frames+=1;frameSnap('raf'+frames);if(frames<5){requestAnimationFrame(raf);}};requestAnimationFrame(raf);}catch(e){console.warn('[theme-boot] failed',e);}}();`,
          tagPosition: 'head',
        },
      ],
    },
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
