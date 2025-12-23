<script setup lang="ts">
const colorMode = useColorMode();

// Sync class to document
watch(() => colorMode.value, (newVal) => {
  if (import.meta.client) {
    if (newVal === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}, { immediate: true });
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
