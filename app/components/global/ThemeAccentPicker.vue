<script setup lang="ts">
import { computed } from 'vue'
import { Palette } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ACCENT_THEMES } from '~/constants/theme'
import { useThemeAccent } from '~/composables/useThemeAccent'
import { cn } from '~/lib/utils'

interface Props {
  compact?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  compact: false,
  class: '',
})

const { accentTheme } = useThemeAccent()

const activeTheme = computed(() => ACCENT_THEMES.find((theme) => theme.id === accentTheme.value) ?? ACCENT_THEMES[0])
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        :aria-label="props.compact ? 'Open theme color menu' : 'Change theme color'"
        :variant="props.compact ? 'ghost' : 'outline'"
        :size="props.compact ? 'icon' : 'sm'"
        :class="cn(
          'gap-2 rounded-full border border-border/60 bg-background/80 text-muted-foreground shadow-sm transition-colors hover:text-foreground',
          props.compact && 'border-none bg-transparent shadow-none hover:bg-primary/10 text-foreground',
          props.class,
        )"
      >
        <Palette class="w-4 h-4" />
        <span v-if="!props.compact" class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {{ activeTheme.label }}
        </span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-64 border border-border/60 bg-card text-card-foreground shadow-xl">
      <DropdownMenuLabel class="text-xs uppercase tracking-wide text-muted-foreground">Theme color</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup v-model="accentTheme" class="space-y-1">
        <DropdownMenuRadioItem
          v-for="theme in ACCENT_THEMES"
          :key="theme.id"
          :value="theme.id"
          class="flex items-start gap-3 rounded-lg px-3 py-2 text-foreground"
        >
          <span
            class="mt-1 inline-flex h-2.5 w-2.5 rounded-full border border-border ring-[4px] ring-background/80"
            :style="{ backgroundColor: theme.preview }"
            aria-hidden="true"
          />
          <div class="flex flex-col">
            <span class="text-sm font-semibold">{{ theme.label }}</span>
            <span class="text-xs text-muted-foreground">{{ theme.description }}</span>
          </div>
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
