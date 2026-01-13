<!-- app/components/global/BackToTop.vue -->
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-vue-next'

const showButton = ref(false);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(() => {
  const handleScroll = () => {
    showButton.value = window.pageYOffset > 300;
  };

  window.addEventListener('scroll', handleScroll);

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
});
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 scale-75"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-75"
  >
    <Button
      v-if="showButton"
      variant="ghost"
      size="icon"
      @click="scrollToTop"
      class="w-12 h-12 bg-blue-600 dark:bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 pointer-events-auto"
      aria-label="Back to top"
    >
      <ArrowUp class="w-5 h-5" />
    </Button>
  </Transition>
</template>
