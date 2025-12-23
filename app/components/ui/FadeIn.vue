<!-- app/components/ui/FadeIn.vue -->
<script setup lang="ts">
import { cn } from '~/lib/utils';

interface FadeInProps {
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  once?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<FadeInProps>(), {
  direction: 'up',
  delay: 0,
  once: true,
  class: ''
});

const isVisible = ref(false);
const elementRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!elementRef.value) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            isVisible.value = true;
          }, props.delay);

          if (props.once) {
            observer.unobserve(entry.target);
          }
        } else if (!props.once) {
          isVisible.value = false;
        }
      });
    },
    {
      threshold: 0.1
    }
  );

  observer.observe(elementRef.value);

  onUnmounted(() => {
    if (elementRef.value) {
      observer.unobserve(elementRef.value);
    }
  });
});

const directionClasses = {
  up: 'translate-y-8',
  down: '-translate-y-8',
  left: 'translate-x-8',
  right: '-translate-x-8'
};

const fadeClass = computed(() =>
  cn(
    'transition-all duration-700 ease-out',
    isVisible.value 
      ? 'opacity-100 translate-x-0 translate-y-0' 
      : cn('opacity-0', directionClasses[props.direction]),
    props.class
  )
);
</script>

<template>
  <div ref="elementRef" :class="fadeClass">
    <slot />
  </div>
</template>
