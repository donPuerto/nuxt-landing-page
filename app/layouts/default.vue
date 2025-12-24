<!-- app/layouts/default.vue -->
<script setup lang="ts">
const { rippleStore } = useRipple();
</script>

<template>
  <div class="min-h-screen flex flex-col relative">
    <ClientOnly>
      <NeuralBg class="fixed inset-0 z-0" />
      <template #fallback>
        <div class="fixed inset-0 z-0 w-screen h-screen pointer-events-none overflow-hidden">
          <div class="absolute top-0 left-0 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div class="absolute top-0 right-0 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div class="absolute -bottom-8 left-20 w-96 h-96 bg-pink-200 dark:bg-pink-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </template>
    </ClientOnly>

    <Navbar />
    <main class="flex-1 relative z-10">
      <slot />
    </main>
    <Footer />
    <ClientOnly>
      <Sonner position="top-right" class="z-[100]" />
    </ClientOnly>
    <BackToTop />

    <!-- Global Ripple Overlay -->
    <div class="pointer-events-none fixed inset-0 z-50">
      <div
        v-for="ripple in rippleStore"
        :key="ripple.id"
        class="absolute inset-0"
        :style="{
          background: ripple.theme === 'light' ? '#ffffff' : '#030712',
          clipPath: `circle(0px at ${ripple.x}px ${ripple.y}px)`,
          animation: `ripple-reveal 1s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
          '--ripple-x': ripple.x + 'px',
          '--ripple-y': ripple.y + 'px',
          '--ripple-size': ripple.size + 'px',
          boxShadow: `0 0 0 2px ${ripple.theme === 'light' ? '#3b82f6' : '#60a5fa'}`
        } as any"
      />
    </div>
  </div>
</template>

<style scoped>
@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

@keyframes ripple-reveal {
  0% {
    clip-path: circle(0px at var(--ripple-x) var(--ripple-y));
  }
  100% {
    clip-path: circle(var(--ripple-size) at var(--ripple-x) var(--ripple-y));
  }
}
</style>
