<!-- app/components/global/Footer.vue -->
<script setup lang="ts">
const { scrollTo } = useSmoothScroll();

const currentYear = 2025;
</script>

<template>
  <footer class="bg-white/40 dark:bg-gray-900/40 text-gray-800 border-t border-gray-200 dark:border-gray-900 dark:text-gray-300 transition-colors duration-200 backdrop-blur-sm">
    <!-- Main Footer Content -->
    <Container class="py-16">
      <div class="space-y-12">
        <!-- Top Section: Connect with me -->
        <div class="text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white dark:text-gray-200 mb-8">Connect with me</h2>
          <div class="flex justify-center gap-6">
            <a
              href="https://www.linkedin.com/in/arlindo-puerto-58a26295/"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center w-12 h-12 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300 hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200 shadow-sm"
              aria-label="LinkedIn"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="mailto:don.puerto.1003@gmail.com"
              class="inline-flex items-center justify-center w-12 h-12 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300 hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200 shadow-sm"
              aria-label="Email"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Divider -->
        <div class="border-t border-gray-300 dark:border-gray-800 shadow-sm"></div>

        <!-- Bottom Section: Copyright & Contact -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center text-center md:text-left">
          <!-- Left: Copyright -->
          <div>
            <p class="text-sm md:text-base font-medium text-gray-700 dark:text-gray-200 flex items-center justify-center md:justify-start gap-3">
              <ClientOnly>
                <Logo size="sm" variant="square" />
              </ClientOnly>
              <span>&copy; {{ currentYear }} DP. All rights reserved.</span>
            </p>
          </div>

          <!-- Right: Contact Details -->
          <div class="flex flex-wrap items-center justify-center md:justify-end gap-3 text-sm md:text-base font-medium text-gray-700 dark:text-gray-200">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-500 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:don.puerto.1003@gmail.com" class="hover:text-blue-500 dark:hover:text-blue-300 transition-colors">don.puerto.1003@gmail.com</a>
            </div>
            <span class="text-gray-400 dark:text-gray-600">|</span>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-500 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>0976 093 8376</span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </footer>
</template>
