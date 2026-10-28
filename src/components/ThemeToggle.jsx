import { toggleTheme } from '../lib/theme'
import { useTheme } from '../app/useTheme'
import { IconMoon, IconSun } from './Icons'

export function ThemeToggle() {
  const night = useTheme() === 'dark'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-pressed={night}
      aria-label={night ? 'Usar modo dia' : 'Usar modo noite'}
    >
      {night ? <IconSun /> : <IconMoon />}
    </button>
  )
}
