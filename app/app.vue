<script setup lang="ts">
import 'vue-sonner/style.css'
import { toast } from 'vue-sonner'

const colorMode = useColorMode();

// Sync class to document
watch(() => colorMode.value, (newVal) => {
  if (import.meta.client) {
    if (newVal === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}, { immediate: true });

// Global toast configuration
onMounted(() => {
  watch(() => colorMode.value, (isDark) => {
    // This updates all toast themes dynamically
    const backgroundColor = isDark === 'dark' ? '#1f2937' : '#ffffff'
    const borderColor = isDark === 'dark' ? '#374151' : '#e5e7eb'
    const textColor = isDark === 'dark' ? '#ffffff' : '#111827'
    
    // Apply styles via CSS variables that vue-sonner respects
    const style = document.documentElement.style
    style.setProperty('--sonner-background', backgroundColor)
    style.setProperty('--sonner-border', borderColor)
    style.setProperty('--sonner-text', textColor)
  }, { immediate: true })
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

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
