const KEY = 'rumo.theme.v1'

export function getTheme() {
  try {
    return localStorage.getItem(KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function applyTheme(theme) {
  const next = theme === 'dark' ? 'dark' : 'light'
  document.documentElement.dataset.theme = next
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#102F3A' : '#F8F7F2')
}

export function toggleTheme() {
  const next = getTheme() === 'dark' ? 'light' : 'dark'
  try {
    localStorage.setItem(KEY, next)
  } catch {
    /* a escolha vale só até recarregar */
  }
  applyTheme(next)
  window.dispatchEvent(new Event('rumo-theme-change'))
}
