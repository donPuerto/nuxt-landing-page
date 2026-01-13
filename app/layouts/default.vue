<!-- app/layouts/default.vue -->
<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { Button } from '@/components/ui/button'
import { MessageCircle, X, Maximize2, Minimize2 } from 'lucide-vue-next'

const { rippleStore } = useRipple()
const chatUrl = useRuntimeConfig().public.n8nChatWebhookUrl
const isChatOpen = ref(false)
const isChatFullscreen = ref(false)
const shouldShowWindow = computed(() => isChatOpen.value && !isChatFullscreen.value)
const shouldShowFullscreen = computed(() => isChatOpen.value && isChatFullscreen.value)

const toggleChat = () => {
  if (isChatOpen.value && !isChatFullscreen.value) {
    isChatOpen.value = false
    return
  }
  isChatOpen.value = true
  isChatFullscreen.value = false
}

const expandChat = () => {
  isChatOpen.value = true
  isChatFullscreen.value = true
}

const collapseChat = () => {
  isChatFullscreen.value = false
  isChatOpen.value = true
}

const closeChat = () => {
  isChatOpen.value = false
  isChatFullscreen.value = false
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isChatOpen.value) {
    closeChat()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="min-h-screen flex flex-col relative">
    <ClientOnly>
      <FluidCursor class="fixed inset-0 z-10" />
      <NeuralBg class="fixed inset-0 z-0" />
      <template #fallback>
        <div class="fixed inset-0 z-0 w-screen h-screen pointer-events-none overflow-hidden">
          <div class="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/30 mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div class="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary/30 mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div class="absolute -bottom-8 left-20 w-96 h-96 rounded-full bg-accent/30 mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
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

    <!-- Fixed Action Panel: BackToTop + Chat Toggle -->
    <div class="fixed bottom-8 right-8 z-50 pointer-events-none flex flex-row gap-4 items-center">
      <!-- BackToTop: Shows only when scrolling down -->
      <div class="pointer-events-auto">
        <BackToTop />
      </div>

      <!-- Chat Toggle Button -->
      <div class="pointer-events-auto">
        <Button
          aria-label="Open chat"
          class="w-12 h-12 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
          size="icon"
          variant="ghost"
          @click="toggleChat"
        >
          <MessageCircle class="w-5 h-5" />
        </Button>
      </div>
    </div>

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

    <!-- Chat Widget (Window Mode) -->
    <ClientOnly>
      <Transition
        enter-active-class="duration-200 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
      >
        <div
          v-if="shouldShowWindow"
          class="fixed bottom-28 right-8 z-40 pointer-events-auto"
        >
          <div class="w-[360px] h-[520px] rounded-2xl shadow-2xl border border-border bg-card flex flex-col overflow-hidden">
            <div class="px-4 py-3 border-b border-border flex items-center justify-between">
              <div>
                <p class="text-sm font-semibold text-foreground">Need a hand?</p>
                <p class="text-xs text-muted-foreground">Chat with Don Puerto’s AI assistant.</p>
              </div>
              <div class="flex items-center gap-1">
                <Button
                  aria-label="Expand chat"
                  size="icon"
                  variant="ghost"
                  class="text-muted-foreground"
                  @click="expandChat"
                >
                  <Maximize2 class="w-4 h-4" />
                </Button>
                <Button
                  aria-label="Close chat"
                  size="icon"
                  variant="ghost"
                  class="text-muted-foreground"
                  @click="closeChat"
                >
                  <X class="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div class="flex-1 min-h-0">
              <Chat :webhookUrl="chatUrl" mode="window" engine="simulated" class="w-full h-full" />
            </div>
          </div>
        </div>
      </Transition>
    </ClientOnly>

    <!-- Chat Fullscreen Overlay -->
    <ClientOnly>
      <Transition
        enter-active-class="duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="shouldShowFullscreen"
          class="fixed inset-0 z-100 bg-black/80 backdrop-blur-md p-1"
        >
          <div class="relative w-full h-full rounded-none bg-card shadow-2xl overflow-hidden">
            <div class="pointer-events-auto absolute top-4 right-4 flex items-center gap-2 z-20">
              <Button
                aria-label="Exit fullscreen"
                size="icon"
                variant="ghost"
                class="w-10 h-10 rounded-full bg-muted text-foreground hover:bg-muted/80"
                @click="collapseChat"
              >
                <Minimize2 class="w-4 h-4" />
              </Button>
              <Button
                aria-label="Close chat"
                size="icon"
                variant="ghost"
                class="w-10 h-10 rounded-full bg-muted text-foreground hover:bg-muted/80"
                @click="closeChat"
              >
                <X class="w-4 h-4" />
              </Button>
            </div>
            <Chat :webhookUrl="chatUrl" mode="fullscreen" engine="simulated" class="w-full h-full" />
          </div>
        </div>
      </Transition>
    </ClientOnly>
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
