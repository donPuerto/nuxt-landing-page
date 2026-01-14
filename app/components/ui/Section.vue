<!-- app/components/ui/Section.vue -->
<script setup lang="ts">
import { cn } from '~/utils';

interface SectionProps {
  id?: string;
  class?: string;
}

const props = withDefaults(defineProps<SectionProps>(), {
  class: ''
});

const sectionClass = computed(() =>
  cn(
    'py-16 md:py-24',
    props.class
  )
);
</script>

<template>
  <section :id="id" :class="sectionClass">
    <slot />
  </section>
</template>
