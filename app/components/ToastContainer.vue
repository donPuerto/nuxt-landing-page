<script setup lang="ts">
import { cn } from '~/lib/utils'
import { useToast } from '~/composables/useToast'

const { toasts, remove } = useToast()

const getToastStyles = (type: string) => {
  const baseStyles = 'px-4 py-3 rounded-lg shadow-lg border flex items-start gap-3 min-w-[300px] max-w-[400px]'
  
  switch (type) {
    case 'success':
      return cn(baseStyles, 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200')
    case 'error':
      return cn(baseStyles, 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200')
    case 'warning':
      return cn(baseStyles, 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200')
    default:
      return cn(baseStyles, 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200')
  }
}
</script>

<template>
  <div class="fixed top-4 right-4 z-50 flex flex-col gap-2">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="getToastStyles(toast.type)"
      >
        <div class="flex-1">
          {{ toast.message }}
        </div>
        <button
          type="button"
          @click="remove(toast.id)"
          class="text-current opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close notification"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>