import {ref} from 'vue'

/** The resolved, applied theme. */
export type Theme = 'light' | 'dark'
/** The user's preference — `system` follows the OS. */
export type ThemeMode = 'light' | 'dark' | 'system'

function isMode(value: unknown): value is ThemeMode {
  return value === 'light' || value === 'dark' || value === 'system'
}

// `mode` is what the user picked; `theme` is what's actually applied.
const mode = ref<ThemeMode>('system')
const theme = ref<Theme>('light')
const STORAGE_KEY = 'nom-wallet-theme'
let mediaListenerAttached = false

function prefersDark(): boolean {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-color-scheme: dark)').matches
}

function apply(resolved: Theme) {
  theme.value = resolved
  document.documentElement.classList.toggle('dark', resolved === 'dark')
}

function resolve() {
  apply(mode.value === 'system' ? (prefersDark() ? 'dark' : 'light') : mode.value)
}

export function useTheme() {
  const setTheme = (newMode: ThemeMode) => {
    mode.value = newMode
    resolve()

    // Store preference
    try {
      localStorage.setItem(STORAGE_KEY, newMode)
    } catch {
      // Fallback for extension where localStorage might not be available
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.set({ [STORAGE_KEY]: newMode })
      }
    }
  }

  const toggleTheme = () => {
    // Toggle the resolved theme, pinning to an explicit light/dark choice.
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  const initTheme = async () => {
    let saved: ThemeMode | null = null

    // Try localStorage first
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      saved = isMode(stored) ? stored : null
    } catch {
      // Try chrome storage if available
      if (typeof chrome !== 'undefined' && chrome.storage) {
        const result = await chrome.storage.local.get(STORAGE_KEY)
        saved = isMode(result[STORAGE_KEY]) ? result[STORAGE_KEY] : null
      }
    }

    mode.value = saved ?? 'system'
    resolve()

    // Keep `system` mode in sync with the OS while the app is open.
    if (!mediaListenerAttached && typeof window !== 'undefined') {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (mode.value === 'system') resolve()
      })
      mediaListenerAttached = true
    }
  }

  return {
    mode,
    theme,
    setTheme,
    toggleTheme,
    initTheme,
  }
}
