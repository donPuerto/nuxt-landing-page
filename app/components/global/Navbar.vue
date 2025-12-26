<!-- app/components/global/Navbar.vue -->
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { cn } from '~/lib/utils';
import { computed } from 'vue';
import { useColorMode } from '@vueuse/core';

const { activeSection } = useScrollSpy();
const { scrollTo } = useSmoothScroll();
const mobileMenuOpen = ref(false);

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');

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
        <div class="flex items-center space-x-3 cursor-pointer" @click="handleNavClick('home')" role="button">
          <Logo size="sm" variant="square" :name="'Don Puerto'" :animated="true" class="text-blue-600 dark:text-blue-400" />
          <span class="font-bold text-base md:text-lg text-gray-900 dark:text-white">Don Puerto</span>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            v-for="link in navLinks"
            :key="link.id"
            @click="handleNavClick(link.id)"
            :class="cn(
              isLinkActive(link.id) ? 'text-blue-600 dark:text-blue-400' : ''
            )"
          >
            {{ link.label }}
          </Button>
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
          <Button
            variant="ghost"
            size="icon"
            @click="toggleMobileMenu"
            :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
            :aria-expanded="mobileMenuOpen"
          >
            <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
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
            <Button
              variant="outline"
              v-for="link in navLinks"
              :key="link.id"
              @click="handleNavClick(link.id)"
              :class="cn(
                'justify-start',
                isLinkActive(link.id) ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''
              )"
            >
              {{ link.label }}
            </Button>
            <Button @click="handleNavClick('contact')" class="mt-2">
              Let's Talk
            </Button>
          </div>
        </div>
      </Transition>
    </Container>
  </nav>
</template>
