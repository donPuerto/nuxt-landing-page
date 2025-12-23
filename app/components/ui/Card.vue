<!-- app/components/ui/Card.vue -->
<script setup lang="ts">
import { cn } from '~/lib/utils';

interface CardProps {
  class?: string;
}

const props = withDefaults(defineProps<CardProps>(), {
  class: ''
});

const cardClass = computed(() =>
  cn(
    'bg-white dark:bg-gray-900 rounded-xl border border-gray-300 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200 p-6',
    props.class
  )
);
</script>

<template>
  <div :class="cardClass">
    <slot />
  </div>
</template>
