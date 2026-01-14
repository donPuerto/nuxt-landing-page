<!-- app/components/ui/Container.vue -->
<script setup lang="ts">
import { cn } from '~/utils';

interface ContainerProps {
  class?: string;
}

const props = withDefaults(defineProps<ContainerProps>(), {
  class: ''
});

const layoutMode = useState<'full' | 'fixed'>('layout-mode', () => 'fixed')

const containerClass = computed(() =>
  cn(
    'mx-auto w-full px-6 transition-[max-width] duration-200',
    layoutMode.value === 'full' ? 'max-w-none' : 'max-w-7xl',
    props.class,
  )
);
</script>

<template>
  <div :class="containerClass">
    <slot />
  </div>
</template>
