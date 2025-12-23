<!-- app/components/global/Logo.vue -->
<script setup lang="ts">
import { cn } from '~/lib/utils';

interface LogoProps {
  size?: 'sm' | 'lg';
  variant?: 'full' | 'square';
  class?: string;
}

const props = withDefaults(defineProps<LogoProps>(), {
  size: 'sm',
  variant: 'full',
  class: ''
});

const sizeClasses = {
  sm: 'text-xl',
  lg: 'text-3xl md:text-4xl'
};

const squareSizeClasses = {
  sm: 'w-10 h-10 text-base',
  lg: 'w-16 h-16 text-2xl'
};
</script>

<template>
  <!-- Square variant (DP in bordered square) -->
  <div 
    v-if="variant === 'square'" 
    :class="cn(
      'inline-flex items-center justify-center border-2 border-blue-600 rounded-lg font-bold text-blue-600 bg-transparent dark:border-blue-400 dark:text-blue-400',
      squareSizeClasses[size],
      props.class
    )"
  >
    DP
  </div>
  
  <!-- Full variant (DP Don Puerto) -->
  <div 
    v-else
    :class="cn(
      'flex items-center gap-2 font-bold text-gray-900 dark:text-white',
      sizeClasses[size],
      props.class
    )"
  >
    <span class="inline-flex items-center justify-center border-2 border-blue-600 rounded-lg text-blue-600 bg-transparent dark:border-blue-400 dark:text-blue-400 w-10 h-10 text-base">
      DP
    </span>
    <span>Don Puerto</span>
  </div>
</template>
