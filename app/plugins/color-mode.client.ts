// app/plugins/color-mode.client.ts
export default defineNuxtPlugin(() => {
  const colorMode = useColorMode();
  const doc = typeof document !== 'undefined' ? document.documentElement : null

  const applyBaseSurface = (mode: string) => {
    if (!doc) return
    const isDark = mode === 'dark'
    if (isDark) {
      doc.classList.add('dark')
      doc.style.backgroundColor = '#0f172a'
      doc.style.color = '#e0e7ff'
    } else {
      doc.classList.remove('dark')
      doc.style.backgroundColor = '#f8f9ff'
      doc.style.color = '#0f172a'
    }
  }

  // Set initial dark mode class on mount
  applyBaseSurface(colorMode.value)

  // Watch for changes
  watch(() => colorMode.value, (newVal) => {
    applyBaseSurface(newVal)
  });
});
