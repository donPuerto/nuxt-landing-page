<!-- app/components/global/ThemeToggle.vue -->
<script setup lang="ts">
import { cn } from '~/lib/utils';

const colorMode = useColorMode();
const ripples = ref<Array<{ id: number; x: number; y: number }>>([]);
let rippleCounter = 0;
const mounted = ref(false);

const isDark = computed(() => colorMode.value === 'dark');

const toggleTheme = (event: MouseEvent) => {
  // Create ripple effect
  const button = event.currentTarget as HTMLElement;
  const rect = button.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const id = rippleCounter++;

  ripples.value.push({ id, x, y });

  // Remove ripple after animation
  setTimeout(() => {
    ripples.value = ripples.value.filter(r => r.id !== id);
  }, 600);

  // Toggle theme
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
    <!-- Ripple elements -->
    <div
      v-if="mounted"
      v-for="ripple in ripples"
      :key="ripple.id"
      class="absolute rounded-full border-2 border-blue-400/80 dark:border-blue-300/90 bg-blue-400/10 dark:bg-blue-300/15 pointer-events-none"
      :style="{
        left: ripple.x + 'px',
        top: ripple.y + 'px',
        width: '14px',
        height: '14px',
        marginLeft: '-7px',
        marginTop: '-7px',
        animation: 'ripple 1.15s ease-out forwards'
      }"
    />

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
</template>

<style scoped>
@keyframes ripple {
  0% {
    width: 14px;
    height: 14px;
    opacity: 1;
    border-color: rgba(59, 130, 246, 0.95);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
  }
  50% {
    opacity: 0.9;
  }
  100% {
    width: 1200px;
    height: 1200px;
    opacity: 0;
    border-color: rgb(59, 130, 246, 0);
  }
}
</style>
