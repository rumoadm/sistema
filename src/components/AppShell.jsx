import { NavLink } from 'react-router-dom'
import { firstName } from '../lib/format'
import { logout } from '../lib/session'
import { IconCheck, IconFile, IconHome } from './Icons'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'

const links = [
  { to: '/plano', label: 'Plano', icon: IconHome },
  { to: '/checklist', label: 'Checklist', icon: IconCheck },
  { to: '/documentos', label: 'Documentos', icon: IconFile },
]

export function AppShell({ user, children }) {
  return (
    <div className="shell">
      <a className="skip" href="#conteudo">
        Ir para o conteúdo
      </a>
      <aside className="sidenav">
        <div className="side-brand">
          <Logo />
          <ThemeToggle />
        </div>
        <nav aria-label="Seções">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <NavLink key={link.to} to={link.to}>
                <Icon />
                {link.label}
              </NavLink>
            )
          })}
        </nav>
        <div className="side-user">
          <span>{firstName(user.name)}</span>
          <button type="button" onClick={logout}>
            Sair
          </button>
        </div>
      </aside>
      <div className="shell-main">
      <header className="topbar">
        <Logo />
        <div className="top-user">
          <span>{firstName(user.name)}</span>
          <button type="button" onClick={logout}>
            Sair
          </button>
          <ThemeToggle />
        </div>
      </header>
      <main className="content" id="conteudo">
        {children}
      </main>
      <nav className="tabbar" aria-label="Seções">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <NavLink key={link.to} to={link.to}>
              <Icon />
              {link.label}
            </NavLink>
          )
        })}
      </nav>
      </div>
    </div>
  )
}
