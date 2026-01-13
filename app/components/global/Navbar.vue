<!-- app/components/global/Navbar.vue -->
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { GalleryHorizontal } from 'lucide-vue-next'
import { cn } from '~/lib/utils';
import { computed } from 'vue';
import { type LayoutMode, LAYOUT_MODES } from '~/constants/theme'

const { activeSection } = useScrollSpy();
const { scrollTo } = useSmoothScroll();
const mobileMenuOpen = ref(false);

const layoutMode = useState<LayoutMode>('layout-mode', () => 'fixed')
const layoutLabel = computed(() => layoutMode.value === 'full' ? 'layout-full' : 'layout-fixed')

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

const setLayoutMode = (mode: LayoutMode) => {
  layoutMode.value = mode
}

const toggleLayoutMode = () => {
  layoutMode.value = layoutMode.value === 'full' ? 'fixed' : 'full'
}

const layoutToggleLabel = computed(() => layoutMode.value === 'full' ? 'Switch to fixed layout' : 'Switch to full layout')
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/80">
    <Container class="py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-3 cursor-pointer" @click="handleNavClick('home')" role="button">
          <Logo size="sm" variant="square" :name="'Don Puerto'" :animated="true" class="text-primary" />
          <span class="font-bold text-base md:text-lg text-foreground">Don Puerto</span>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            v-for="link in navLinks"
            :key="link.id"
            @click="handleNavClick(link.id)"
            :class="cn(
              isLinkActive(link.id) ? 'text-primary' : ''
            )"
          >
            {{ link.label }}
          </Button>
        </div>

        <!-- CTA Button, Theme + Layout Controls (Desktop) -->
        <div class="hidden md:flex items-center gap-4">
          <TooltipProvider :delay-duration="200">
            <div class="hidden lg:flex items-center gap-3 text-muted-foreground">
              <Tooltip>
                <TooltipTrigger as-child>
                  <ThemeAccentPicker compact class="text-muted-foreground hover:text-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p class="text-xs font-semibold">Switch accent palette</p>
                </TooltipContent>
              </Tooltip>
              <span class="text-border/70 text-sm" aria-hidden="true">|</span>
              <Tooltip>
                <TooltipTrigger as-child>
                  <ThemeToggle class="text-muted-foreground hover:text-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p class="text-xs font-semibold">Toggle color mode</p>
                </TooltipContent>
              </Tooltip>
              <span class="text-border/70 text-sm" aria-hidden="true">|</span>
              <Tooltip>
                <TooltipTrigger as-child>
                  <Button
                    variant="ghost"
                    size="icon"
                    class="text-muted-foreground hover:text-foreground"
                    type="button"
                    :aria-label="layoutToggleLabel"
                    @click="toggleLayoutMode"
                  >
                    <GalleryHorizontal class="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div class="flex flex-col">
                    <span class="text-xs font-semibold capitalize">{{ layoutLabel.replace('-', ' ') }}</span>
                    <span class="text-[11px] opacity-80">{{ layoutToggleLabel }}</span>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
          <Button @click="handleNavClick('contact')">
            Let's Talk
          </Button>
        </div>

        <!-- Mobile Menu Button & Theme Toggle -->
        <div class="md:hidden flex items-center gap-2">
          <ThemeAccentPicker compact />
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
        <div v-if="mobileMenuOpen" class="md:hidden pt-4 pb-2 border-t border-border/80 mt-4">
          <div class="flex flex-col gap-2">
            <Button
              variant="outline"
              v-for="link in navLinks"
              :key="link.id"
              @click="handleNavClick(link.id)"
              :class="cn(
                'justify-start',
                isLinkActive(link.id) ? 'text-primary bg-primary/10' : ''
              )"
            >
              {{ link.label }}
            </Button>
            <Button @click="handleNavClick('contact')" class="mt-2">
              Let's Talk
            </Button>
            <div class="mt-4 space-y-3 rounded-2xl border border-border/70 p-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-semibold text-foreground">Layout</p>
                  <p class="text-xs text-muted-foreground">{{ layoutLabel }}</p>
                </div>
                <div class="flex gap-1">
                  <Button
                    v-for="option in LAYOUT_MODES"
                    :key="option.id"
                    variant="ghost"
                    size="sm"
                    class="rounded-full px-3"
                    :class="option.id === layoutMode ? 'bg-primary/10 text-primary' : 'text-muted-foreground'"
                    @click="setLayoutMode(option.id as LayoutMode)"
                  >
                    {{ option.label }}
                  </Button>
                </div>
              </div>
              <div class="flex items-center justify-between rounded-xl border border-border/70 px-3 py-2">
                <div>
                  <p class="text-sm font-semibold text-foreground">Theme color</p>
                  <p class="text-xs text-muted-foreground">Tap to switch palette</p>
                </div>
                <ThemeAccentPicker compact />
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Container>
  </nav>
</template>
