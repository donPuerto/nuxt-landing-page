<!-- app/components/global/ThemeToggle.vue -->
<script setup lang="ts">
const colorMode = useColorMode();
const ripples = ref<Array<{ id: number; x: number; y: number; size: number }>>([]);
let rippleCounter = 0;
const mounted = ref(false);

const isDark = computed(() => colorMode.value === 'dark');

const toggleTheme = (event: MouseEvent) => {
  if (!import.meta.client) return;

  const x = event.clientX;
  const y = event.clientY;
  const maxX = Math.max(x, window.innerWidth - x);
  const maxY = Math.max(y, window.innerHeight - y);
  const size = 2 * Math.sqrt(maxX * maxX + maxY * maxY);
  const id = rippleCounter++;

  ripples.value.push({ id, x, y, size });

  setTimeout(() => {
    ripples.value = ripples.value.filter((r) => r.id !== id);
  }, 800);

  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

// Watch color mode changes
watch(() => colorMode.value, (newVal) => {
  if (import.meta.client) {
    // Update document class
    if (newVal === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}, { immediate: true });

onMounted(() => {
  mounted.value = true;
});
</script>

<template>
  <button
    @click="toggleTheme"
    class="relative inline-flex items-center justify-center w-10 h-10 border-2 border-blue-500 dark:border-blue-600 rounded-lg text-blue-500 dark:text-blue-400 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200 overflow-hidden shadow-sm"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <!-- Sun icon (show when dark mode is on - to switch to light) -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 rotate-0 scale-0"
      enter-to-class="opacity-100 rotate-180 scale-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100 rotate-0 scale-100"
      leave-to-class="opacity-0 -rotate-180 scale-0"
    >
      <svg v-if="mounted && isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </Transition>

    <!-- Moon icon (show when light mode is on - to switch to dark) -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -rotate-180 scale-0"
      enter-to-class="opacity-100 rotate-0 scale-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100 rotate-0 scale-100"
      leave-to-class="opacity-0 rotate-180 scale-0"
    >
      <svg v-if="mounted && !isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </Transition>
  </button>

  <Teleport to="body">
    <div class="pointer-events-none fixed inset-0 z-40">
      <div
        v-for="ripple in ripples"
        :key="ripple.id"
        class="absolute rounded-full bg-blue-400/15 dark:bg-blue-300/20 border border-blue-400/60 dark:border-blue-300/60 backdrop-blur-sm"
        :style="{
          left: ripple.x + 'px',
          top: ripple.y + 'px',
          width: ripple.size + 'px',
          height: ripple.size + 'px',
          marginLeft: -(ripple.size / 2) + 'px',
          marginTop: -(ripple.size / 2) + 'px',
          animation: 'ripple-page 0.85s ease-out forwards'
        }"
      />
    </div>
  </Teleport>
</template>

<style scoped>
@keyframes ripple-page {
  0% {
    transform: scale(0);
    opacity: 0.8;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
