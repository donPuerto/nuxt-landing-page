<!-- app/components/global/Logo.vue -->
<script setup lang="ts">
import { cn } from '~/utils';
import { computed } from 'vue';

interface LogoProps {
  name?: string;
  size?: 'sm' | 'lg';
  variant?: 'full' | 'square';
  borderless?: boolean;
  logoOnly?: boolean;
  animated?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<LogoProps>(), {
  name: 'DP',
  size: 'sm',
  variant: 'full',
  borderless: false,
  logoOnly: false,
  animated: false,
  class: ''
});

// Parse name to get initials (first character of each word)
// If name has no spaces (already initials), return it as-is
const initials = computed(() => {
  if (!props.name) return 'DP';
  const trimmed = props.name.trim();
  
  // If name has no spaces and is 2+ chars, treat as already-parsed initials
  if (!trimmed.includes(' ') && trimmed.length > 1) {
    return trimmed.toUpperCase();
  }
  
  // Otherwise, parse first character of each word
  const words = trimmed.split(/\s+/);
  return words.map(word => word.charAt(0).toUpperCase()).join('');
});

const sizeClasses = {
  sm: 'text-xl',
  lg: 'text-3xl md:text-4xl'
};

const squareSizeClasses = {
  sm: 'w-9 h-9 text-sm',
  lg: 'w-16 h-16 text-2xl'
};

// Animated gradient style with vibrant colors (purple, pink, yellow, red, orange)
// Linear gradient that flows around the border with position animation
const gradientStyle = computed(() => {
  return {
    background: 'linear-gradient(90deg, #A07CFE, #FE8FB5, #FFD700, #FF4500, #FFBE7B, #A07CFE)',
    backgroundSize: '200% 200%',
  };
});

const borderClasses = computed(() => {
  return props.animated ? 'animate-gradient-flow' : '';
});

const staticGradient = 'linear-gradient(135deg, #A07CFE, #FE8FB5, #FFBE7B)';
</script>

<style scoped>
@keyframes gradientFlow {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 200% 200%;
  }
}

.animate-gradient-flow {
  animation: gradientFlow 2s ease infinite !important;
  transition: filter 0.3s ease;
}

.animate-gradient-flow:hover {
  filter: drop-shadow(0 0 4px rgba(160, 124, 254, 0.8)) drop-shadow(0 0 8px rgba(254, 143, 181, 0.6)) drop-shadow(0 0 6px rgba(255, 215, 0, 0.4));
}
</style>

<template>
  <!-- Logo only variant (just square) -->
  <div v-if="props.logoOnly && !props.borderless" :class="squareSizeClasses[size]">
    <!-- Gradient border wrapper -->
    <div 
      :class="borderClasses"
      :style="props.animated ? gradientStyle : { background: staticGradient }"
      class="w-full h-full rounded-lg p-0.5"
    >
      <!-- Inner content -->
      <div class="w-full h-full rounded-md bg-background flex items-center justify-center font-bold text-primary">
        {{ initials }}
      </div>
    </div>
  </div>
    
    <!-- Logo only variant borderless -->
    <div 
      v-else-if="props.logoOnly && props.borderless"
      :class="cn(
        'inline-flex items-center justify-center rounded-lg font-bold bg-transparent text-primary',
        squareSizeClasses[size],
        props.class
      )"
    >
      {{ initials }}
    </div>

    <!-- Square variant with gradient border (initials only) -->
    <div v-else-if="variant === 'square' && !props.borderless" :class="squareSizeClasses[size]">
      <!-- Gradient border wrapper -->
      <div 
        :class="borderClasses"
        :style="props.animated ? gradientStyle : { background: staticGradient }"
        class="w-full h-full rounded-lg p-0.5"
      >
        <!-- Inner content -->
        <div class="w-full h-full rounded-md bg-background flex items-center justify-center font-bold text-primary">
          {{ initials }}
        </div>
      </div>
    </div>
    
    <!-- Square variant without border -->
    <div 
      v-else-if="variant === 'square' && props.borderless"
      :class="cn(
        'inline-flex items-center justify-center rounded-lg font-bold bg-transparent text-primary',
        squareSizeClasses[size],
        props.class
      )"
    >
      {{ initials }}
    </div>
    
    <!-- Full variant (initials in square + name description) -->
    <div 
      v-else
      :class="cn(
        'flex items-center gap-2 font-bold text-foreground',
        sizeClasses[size],
        props.class
      )"
    >
      <!-- Logo square with gradient border -->
      <div v-if="!props.borderless" :class="squareSizeClasses[size]">
        <!-- Gradient border wrapper -->
        <div 
          :class="borderClasses"
          :style="props.animated ? gradientStyle : { background: staticGradient }"
          class="w-full h-full rounded-lg p-0.5"
        >
          <!-- Inner content -->
          <div class="w-full h-full rounded-md bg-background flex items-center justify-center font-bold text-primary">
            {{ initials }}
          </div>
        </div>
      </div>
      
      <!-- Logo square without border -->
      <div 
        v-else
        :class="cn(
          'inline-flex items-center justify-center rounded-lg font-bold bg-transparent text-primary',
          squareSizeClasses[size]
        )"
      >
        {{ initials }}
      </div>
      
      <!-- Name description (no gradient border) -->
      <span class="text-foreground">{{ props.name }}</span>
    </div>
</template>

