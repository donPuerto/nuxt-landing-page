<!-- app/components/global/Navbar.vue -->
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { cn } from '~/lib/utils';

const { activeSection } = useScrollSpy();
const { scrollTo } = useSmoothScroll();
const mobileMenuOpen = ref(false);

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'clients', label: 'Clients' },
  { id: 'contact', label: 'Contact' }
];

const handleNavClick = (id: string) => {
  scrollTo(id);
  mobileMenuOpen.value = false;
};

const isLinkActive = (id: string) => activeSection.value === id;

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
    <Container class="py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <button @click="handleNavClick('home')" class="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
          <Logo size="sm" />
        </button>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <button
            v-for="link in navLinks"
            :key="link.id"
            @click="handleNavClick(link.id)"
            :class="cn(
              'text-base font-medium transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1',
              isLinkActive(link.id) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
            )"
          >
            {{ link.label }}
          </button>
        </div>

        <!-- CTA Button & Theme Toggle (Desktop) -->
        <div class="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button @click="handleNavClick('contact')">
            Let's Talk
          </Button>
        </div>

        <!-- Mobile Menu Button & Theme Toggle -->
        <div class="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            @click="toggleMobileMenu"
            class="p-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
            aria-expanded="false"
          >
            <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div v-if="mobileMenuOpen" class="md:hidden pt-4 pb-2 border-t border-gray-200 dark:border-gray-800 mt-4">
          <div class="flex flex-col gap-2">
            <button
              v-for="link in navLinks"
              :key="link.id"
              @click="handleNavClick(link.id)"
              :class="cn(
                'text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500',
                isLinkActive(link.id) ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-300'
              )"
            >
              {{ link.label }}
            </button>
            <Button @click="handleNavClick('contact')" class="mt-2">
              Let's Talk
            </Button>
          </div>
        </div>
      </Transition>
    </Container>
  </nav>
</template>
