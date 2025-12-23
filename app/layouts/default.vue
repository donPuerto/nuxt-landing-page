<!-- app/layouts/default.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-950 relative">
    <!-- Animated Gradient Background -->
    <div class="fixed inset-0 -z-10 w-screen h-screen pointer-events-none overflow-hidden">
      <!-- Gradient blobs for light mode -->
      <div class="absolute top-0 left-0 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div class="absolute top-0 right-0 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-8 left-20 w-96 h-96 bg-pink-200 dark:bg-pink-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>

    <Navbar />
    <main class="flex-1 relative z-10">
      <slot />
    </main>
    <Footer />
    <BackToTop />
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
</style>
