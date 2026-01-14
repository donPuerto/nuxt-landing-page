<!-- app/components/global/ThemeToggle.vue -->
<script setup lang="ts">
import { cn } from '~/utils'

const props = withDefaults(defineProps<{ class?: string }>(), {
  class: '',
})

const colorMode = useColorMode();
const { rippleStore } = useRipple();
const mounted = ref(false);

const isDark = computed(() => colorMode.value === 'dark');

const toggleTheme = (event: MouseEvent) => {
  if (!import.meta.client) return;

  const prevTheme = colorMode.value === 'dark' ? 'dark' : 'light';
  const newTheme = prevTheme === 'dark' ? 'light' : 'dark';

  // Prefer native View Transitions API for a true wave reveal
  const doc: any = document as any;
  if (doc && typeof doc.startViewTransition === 'function') {
    // Start position: top-right corner
    document.documentElement.style.setProperty('--vt-x', '100%');
    document.documentElement.style.setProperty('--vt-y', '0%');

    doc.startViewTransition(() => {
      colorMode.preference = newTheme;
    });
    return;
  }

  // Fallback: use mask-based overlay starting from top-right of the viewport
  const originX = window.innerWidth - 1;
  const originY = 0;
  const maxX = Math.max(originX, window.innerWidth - originX);
  const maxY = Math.max(originY, window.innerHeight - originY);
  const maxDistance = Math.sqrt(maxX * maxX + maxY * maxY);

  const finalSize = maxDistance * 1.25;
  const duration = 450;

  const id = Date.now() + Math.random();
  rippleStore.value.push({
    id,
    x: originX,
    y: originY,
    size: finalSize,
    prevTheme,
    duration,
  });

  colorMode.preference = newTheme;

  setTimeout(() => {
    rippleStore.value = rippleStore.value.filter((r) => r.id !== id);
  }, duration + 50);
};

// Watch color mode changes
watch(() => colorMode.value, (newVal) => {
  if (import.meta.client) {
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
  <Button
    variant="ghost"
    size="icon"
    @click="toggleTheme"
    :class="cn('relative w-10 h-10 text-primary hover:bg-primary/10 overflow-hidden transition-colors', props.class)"
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
  </Button>
</template>