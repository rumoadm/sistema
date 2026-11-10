export function planHome(user) {
  return user?.plan?.countryCode ? '/plano' : '/paises'
}

export function startPath(user) {
  return user ? planHome(user) : '/cadastro'
}

export function scrollToSection(id) {
  const target = document.getElementById(id)
  if (!target) return false
  const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'start' })
  return true
}
