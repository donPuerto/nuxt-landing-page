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
      <Sonner position="top-right" class="z-100" />
    </ClientOnly>
    <BackToTop />

    <!-- Global Ripple Overlay (mask-based to reveal new theme) -->
    <div class="pointer-events-none fixed inset-0 z-100">
      <div
        v-for="ripple in rippleStore"
        :key="ripple.id"
        class="absolute inset-0"
        :style="{
          background: ripple.prevTheme === 'light' ? '#ffffff' : '#030712',
          WebkitMaskImage: `radial-gradient(circle at ${ripple.x}px ${ripple.y}px, transparent 0px, black 0px)`,
          maskImage: `radial-gradient(circle at ${ripple.x}px ${ripple.y}px, transparent 0px, black 0px)`,
          animation: `mask-reveal ${ripple.duration ?? 800}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
          '--ripple-x': ripple.x + 'px',
          '--ripple-y': ripple.y + 'px',
          '--ripple-size': ripple.size + 'px',
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

@keyframes mask-reveal {
  0% {
    -webkit-mask-image: radial-gradient(circle at var(--ripple-x) var(--ripple-y), transparent 0px, black 0px);
            mask-image: radial-gradient(circle at var(--ripple-x) var(--ripple-y), transparent 0px, black 0px);
  }
  100% {
    -webkit-mask-image: radial-gradient(circle at var(--ripple-x) var(--ripple-y), transparent var(--ripple-size), black calc(var(--ripple-size) + 1px));
            mask-image: radial-gradient(circle at var(--ripple-x) var(--ripple-y), transparent var(--ripple-size), black calc(var(--ripple-size) + 1px));
  }
}
</style>

<!-- View Transition radial reveal from top-right (global, unscoped) -->
<style>
/* Enable transitions on root */
:root { view-transition-name: root; }

/* Avoid default cross-fade; we'll drive the clip-path */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
}

@keyframes vt-ripple {
  from { clip-path: circle(0% at var(--vt-x, 100%) var(--vt-y, 0%)); }
  to { clip-path: circle(160% at var(--vt-x, 100%) var(--vt-y, 0%)); }
}

/* New view expands from top-right; old contracts */
::view-transition-new(root) {
  animation: vt-ripple 400ms cubic-bezier(0.4, 0, 0.2, 1) both;
}
::view-transition-old(root) {
  animation: vt-ripple 400ms cubic-bezier(0.4, 0, 0.2, 1) both reverse;
}
</style>
