<script lang="ts" setup>
import type { ToasterProps } from "vue-sonner"
import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon, XIcon } from "lucide-vue-next"
import { Toaster as Sonner } from "vue-sonner"

const props = defineProps<ToasterProps>()
const colorMode = useColorMode()
const theme = computed(() => colorMode.value === 'dark' ? 'dark' : 'light')
</script>

<template>
  <Sonner
    :theme="theme"
    :toastOptions="{
      unstyled: false,
      classNames: {
        toast: 'shadow-lg border dark:border-gray-700',
        title: 'dark:text-white',
        description: 'dark:text-gray-300',
        success: 'dark:bg-gray-900 dark:border-green-800',
        error: 'dark:bg-gray-900 dark:border-red-800',
      },
    }"
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
