// app/plugins/color-mode.client.ts
export default defineNuxtPlugin(() => {
  const colorMode = useColorMode();

  // Set initial dark mode class on mount
  if (colorMode.value === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Watch for changes
  watch(() => colorMode.value, (newVal) => {
    if (newVal === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });
});
