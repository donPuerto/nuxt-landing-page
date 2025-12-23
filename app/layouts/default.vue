<!-- app/layouts/default.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-950 relative">
    <!-- Neural Background Layer -->
    <ClientOnly>
      <NeuralBg class="fixed inset-0 -z-10" :hue="200" :saturation="0.8" :chroma="0.6" />
    </ClientOnly>

    <Navbar />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
    <BackToTop />
  </div>
</template>
