import { watch } from 'vue'
import { type AccentTheme, isAccentTheme } from '~/constants/theme'

const STORAGE_KEY = 'accent-theme'

export function useThemeAccent() {
  const accentTheme = useState<AccentTheme>('accent-theme', () => 'default')
  const isHydrated = useState<boolean>('accent-theme-hydrated', () => false)
  const watcherRegistered = useState<boolean>('accent-theme-watcher', () => false)

  if (import.meta.client && !isHydrated.value) {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (isAccentTheme(saved)) {
      accentTheme.value = saved
    }
    isHydrated.value = true
  }

  if (import.meta.client && !watcherRegistered.value) {
    watch(
      accentTheme,
      (value) => {
        const html = document.documentElement
        html.dataset.theme = value
        window.localStorage.setItem(STORAGE_KEY, value)
      },
      { immediate: true },
    )

    watcherRegistered.value = true
  }

  const setAccentTheme = (value: AccentTheme) => {
    accentTheme.value = value
  }

  return {
    accentTheme,
    setAccentTheme,
  }
}
