<script lang="ts" setup>
import type { ToasterProps } from "vue-sonner"
import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon, XIcon } from "lucide-vue-next"
import { Toaster as Sonner } from "vue-sonner"

const props = defineProps<ToasterProps>()
const colorMode = useColorMode()
const theme = computed(() => colorMode.value === 'dark' ? 'dark' : 'light')

const isDark = computed(() => colorMode.value === 'dark')

const toastOptions = computed(() => ({
  unstyled: false,
  classNames: {
    toast: isDark.value
      ? '!bg-gray-800 !border-2 !border-gray-700 !text-white'
      : '!bg-white !border-2 !border-gray-300 !text-gray-900',
    title: isDark.value
      ? '!text-white !font-semibold'
      : '!text-gray-900 !font-semibold',
    description: isDark.value
      ? '!text-gray-300'
      : '!text-gray-600',
    success: isDark.value
      ? '!border-green-600'
      : '!border-green-500',
    error: isDark.value
      ? '!border-red-600'
      : '!border-red-500',
    warning: isDark.value
      ? '!border-yellow-600'
      : '!border-yellow-500',
    info: isDark.value
      ? '!border-blue-600'
      : '!border-blue-500',
  },
}))
</script>

<template>
  <Sonner
    :toast-options="toastOptions"
    v-bind="props"
  >
    <template #success-icon>
      <CircleCheckIcon class="size-4" />
    </template>
    <template #info-icon>
      <InfoIcon class="size-4" />
    </template>
    <template #warning-icon>
      <TriangleAlertIcon class="size-4" />
    </template>
    <template #error-icon>
      <OctagonXIcon class="size-4" />
    </template>
    <template #loading-icon>
      <div>
        <Loader2Icon class="size-4 animate-spin" />
      </div>
    </template>
    <template #close-icon>
      <XIcon class="size-4" />
    </template>
  </Sonner>
</template>
