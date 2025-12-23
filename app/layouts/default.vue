<!-- app/layouts/default.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-950">
    <Navbar />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
    <BackToTop />
  </div>
</template>
