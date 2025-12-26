<template>
  <div
    class="pointer-events-none absolute inset-0"
    :style="styles"
  ></div>
</template>

<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";

interface Props {
  borderRadius?: number;
  color?: string | Array<string>;
  borderWidth?: number;
  duration?: number;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  borderRadius: 8,
  color: "#FFF",
  borderWidth: 2,
  duration: 3,
});

const styles = computed(() => {
  // Use the first color for the main glow
  const glowColor = Array.isArray(props.color) ? props.color[0] : props.color;
  return {
    "--border-radius": `${props.borderRadius}px`,
    "--border-width": `${props.borderWidth}px`,
    "--duration": `${props.duration}s`,
    "--glow-color": glowColor,
    borderRadius: `${props.borderRadius}px`,
    border: `${props.borderWidth}px solid transparent`,
    backgroundImage: `linear-gradient(${
      Array.isArray(props.color) ? props.color.join(", ") : props.color
    })`,
    backgroundClip: "padding-box",
    animation: `glow-pulse var(--duration) ease-in-out infinite`,
  } as any;
});
</script>

<style scoped>
@keyframes glow-pulse {
  0% {
    box-shadow: 0 0 5px var(--glow-color), 0 0 10px var(--glow-color);
  }
  50% {
    box-shadow: 0 0 15px var(--glow-color), 0 0 25px var(--glow-color);
  }
  100% {
    box-shadow: 0 0 5px var(--glow-color), 0 0 10px var(--glow-color);
  }
}
</style>
