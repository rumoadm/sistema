import { useEffect, useState } from 'react'
import { getTheme } from '../lib/theme'

export function useTheme() {
  const [theme, setTheme] = useState(getTheme)

  useEffect(() => {
    const sync = () => setTheme(getTheme())
    window.addEventListener('rumo-theme-change', sync)
    return () => window.removeEventListener('rumo-theme-change', sync)
  }, [])

  return theme
}
