import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSessionState } from '../../app/useSession.jsx'
import { Logo } from '../../components/Logo'
import { planHome, scrollToSection } from './links'
import './landing.css'

function SectionLink({ id, children }) {
  const { pathname } = useLocation()

  function onClick(event) {
    if (pathname !== '/') return
    event.preventDefault()
    if (scrollToSection(id)) window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <Link to={{ pathname: '/', hash: `#${id}` }} onClick={onClick}>
      {children}
    </Link>
  )
}

export function SiteHeader() {
  const { user } = useSessionState()

  return (
    <header className="site-header">
      <div className="site-bar">
        <Link className="site-home" to="/">
          <Logo />
        </Link>
        <nav className="site-nav" aria-label="Seções da página">
          <SectionLink id="como-funciona">Como funciona</SectionLink>
          <SectionLink id="destinos">Destinos</SectionLink>
        </nav>
        <div className="site-actions">
          {user ? (
            <Link className="btn site-btn" to={planHome(user)}>
              Abrir meu plano
            </Link>
          ) : (
            <>
              <Link className="btn ghost site-btn" to="/entrar">
                Entrar
              </Link>
              <Link className="btn site-btn site-start" to="/cadastro">
                Começar meu plano
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <Logo />
          <p>Do sonho ao próximo passo.</p>
        </div>
        <p className="site-footer-note">
          O Rumo ajuda a organizar a mudança. Não promete visto e não substitui orientação jurídica.
        </p>
      </div>
    </footer>
  )
}

export function SiteFrame({ children }) {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <div className="site">
      <a className="skip" href="#conteudo">
        Ir para o conteúdo
      </a>
      <SiteHeader />
      <main id="conteudo">{children}</main>
      <SiteFooter />
    </div>
  )
}
