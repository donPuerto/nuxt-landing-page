import { watch } from 'vue'
import { type ThemeColor, isThemeColor } from '~/constants/theme'

const STORAGE_KEY = 'theme-color'
const LEGACY_STORAGE_KEY = 'accent-theme'

export function useThemeColor() {
  const themeColor = useState<ThemeColor>('theme-color', () => 'default')
  const isHydrated = useState<boolean>('theme-color-hydrated', () => false)
  const watcherRegistered = useState<boolean>('theme-color-watcher', () => false)

  if (import.meta.client && !isHydrated.value) {
    const saved = window.localStorage.getItem(STORAGE_KEY) ?? window.localStorage.getItem(LEGACY_STORAGE_KEY)

    if (isThemeColor(saved)) {
      themeColor.value = saved

      if (!window.localStorage.getItem(STORAGE_KEY)) {
        window.localStorage.setItem(STORAGE_KEY, saved)
      }
    }

    isHydrated.value = true
  }

  if (import.meta.client && !watcherRegistered.value) {
    watch(
      themeColor,
      (value) => {
        const html = document.documentElement
        html.dataset.theme = value
        window.localStorage.setItem(STORAGE_KEY, value)
      },
      { immediate: true },
    )

    watcherRegistered.value = true
  }

  const setThemeColor = (value: ThemeColor) => {
    themeColor.value = value
  }

  return {
    themeColor,
    setThemeColor,
  }
}
