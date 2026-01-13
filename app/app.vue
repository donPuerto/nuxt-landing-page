<script setup lang="ts">
import 'vue-sonner/style.css'
import { Toaster } from 'vue-sonner'
import { type LayoutMode, isLayoutMode } from '~/constants/theme'
import { useThemeAccent } from '~/composables/useThemeAccent'

const colorMode = useColorMode()
const { accentTheme } = useThemeAccent()
const layoutMode = useState<LayoutMode>('layout-mode', () => 'fixed')

useHead(() => ({
  htmlAttrs: {
    'data-theme': accentTheme.value,
    'data-layout': layoutMode.value,
    class: layoutMode.value === 'full' ? 'layout-full' : 'layout-fixed',
  },
}))

// Sync dark mode class
watch(() => colorMode.value, (newVal) => {
  if (import.meta.client) {
    if (newVal === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}, { immediate: true })

if (import.meta.client) {
  const savedLayout = window.localStorage.getItem('layout-mode')
  if (isLayoutMode(savedLayout)) {
    layoutMode.value = savedLayout
  }

  watch(layoutMode, (value) => {
    window.localStorage.setItem('layout-mode', value)
  }, { immediate: true })
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <ClientOnly>
    <Toaster 
      class="pointer-events-auto"
      :theme="(colorMode.preference as any) || 'system'"
      position="top-right"
    />
  </ClientOnly>
</template>

<style>
/* Light mode toast styling */
:where(.sonner-toast) {
  background-color: #ffffff !important;
  border: 2px solid #e5e7eb !important;
  color: #111827 !important;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

:where(.sonner-toast) * {
  color: #111827 !important;
}

:where(.sonner-title) {
  color: #111827 !important;
  font-weight: 600;
}

:where(.sonner-description) {
  color: #6b7280 !important;
}

/* Dark mode toast styling */
:root.dark :where(.sonner-toast) {
  background-color: #111827 !important;
  border: 2px solid #1f2937 !important;
  color: #ffffff !important;
}

:root.dark :where(.sonner-toast) * {
  color: #ffffff !important;
}

:root.dark :where(.sonner-title) {
  color: #ffffff !important;
  font-weight: 600;
}

:root.dark :where(.sonner-description) {
  color: #d1d5db !important;
}

/* Success, Error, Warning colors */
:where(.sonner-toast[data-type="success"]) {
  border-color: #10b981 !important;
}

:root.dark :where(.sonner-toast[data-type="success"]) {
  border-color: #059669 !important;
}

:where(.sonner-toast[data-type="error"]) {
  border-color: #ef4444 !important;
}

:root.dark :where(.sonner-toast[data-type="error"]) {
  border-color: #dc2626 !important;
}

:where(.sonner-toast[data-type="warning"]) {
  border-color: #f59e0b !important;
}

:root.dark :where(.sonner-toast[data-type="warning"]) {
  border-color: #d97706 !important;
}
</style>

<style>
:root {
  --sonner-background: #ffffff;
  --sonner-border: #e5e7eb;
  --sonner-text: #111827;
}

:root.dark {
  --sonner-background: #1f2937;
  --sonner-border: #374151;
  --sonner-text: #ffffff;
}

/* Apply CSS variables to vue-sonner toast */
:where(.sonner-toaster) {
  --background: var(--sonner-background);
  --border: var(--sonner-border);
  --text-color: var(--sonner-text);
}

:where(.sonner-toast) {
  background-color: var(--sonner-background) !important;
  border-color: var(--sonner-border) !important;
  color: var(--sonner-text) !important;
  border-width: 2px;
}

:where(.sonner-toast) * {
  color: var(--sonner-text) !important;
}
</style>
