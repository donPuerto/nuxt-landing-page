<template>
  <button :class="cn(
  'relative inline-flex items-center justify-center overflow-hidden rounded-lg rainbow-btn',
  props.class,
)"
  :style="{ padding: borderWidthInPx }"
>
    <div class="absolute inset-0 rounded-lg animate-rainbow" :style="{ filter: `blur(${blurPx})` }"></div>
    <div class="relative z-10 inline-flex items-center justify-center rounded-lg bg-white dark:bg-gray-950">
      <slot />
    </div>
  </button>
</template>

<script lang="ts" setup>
import { cn } from "@/lib/utils";
import { computed } from "vue";

interface GradientButtonProps {
  borderWidth?: number;
  colors?: string[];
  duration?: number;
  borderRadius?: number;
  blur?: number;
  class?: string;
  bgColor?: string;
}

const props = withDefaults(defineProps<GradientButtonProps>(), {
  colors: () => [
    "#FF0000",
    "#FFA500",
    "#FFFF00",
    "#008000",
    "#0000FF",
    "#4B0082",
    "#EE82EE",
    "#FF0000",
  ],
  duration: 2500,
  borderWidth: 2,
  borderRadius: 8,
  blur: 4,
  bgColor: "transparent",
});

const durationInMilliseconds = computed(() => `${props.duration}ms`);
const allColors = computed(() => props.colors.join(", "));
const borderWidthInPx = computed(() => `${props.borderWidth}px`);
const borderRadiusInPx = computed(() => `${props.borderRadius}px`);
const blurPx = computed(() => `${props.blur}px`);
</script>

<style scoped>
.rainbow-btn {
  border-radius: v-bind(borderRadiusInPx);
  background: conic-gradient(v-bind(allColors));
}

.animate-rainbow {
  animation: rotate-rainbow v-bind(durationInMilliseconds) linear infinite;
  background: conic-gradient(v-bind(allColors));
}

@keyframes rotate-rainbow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
