<!-- app/components/ui/Container.vue -->
<script setup lang="ts">
import { cn } from '~/lib/utils';

interface ContainerProps {
  class?: string;
}

const props = withDefaults(defineProps<ContainerProps>(), {
  class: ''
});

const containerClass = computed(() =>
  cn(
    'max-w-7xl mx-auto px-6',
    props.class
  )
);
</script>

<template>
  <div :class="containerClass">
    <slot />
  </div>
</template>
