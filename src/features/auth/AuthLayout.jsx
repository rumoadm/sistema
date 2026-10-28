import { useEffect } from 'react'
import { Logo } from '../../components/Logo'
import './auth.css'

export function AuthLayout({ title, subtitle, children, minimal = false }) {
  useEffect(() => {
    document.title = 'Rumo'
  }, [])
  return (
    <div className={minimal ? 'auth auth-minimal' : 'auth'}>
      <aside className="auth-brand">
        <Logo tone="light" />
        <div className="auth-brand-copy">
          <p className="auth-kicker">Do sonho ao próximo passo.</p>
          <h1>Um país. Um caminho. O que fazer agora.</h1>
          <p>
            Para quem quer sair do Brasil sem se perder no meio de visto, documento e família.
          </p>
        </div>
        <p className="auth-brand-note">O Rumo organiza o plano. Não promete visto e não substitui um advogado.</p>
      </aside>
      <main className="auth-panel">
        <div className="auth-card">
          <h2>{title}</h2>
          <p className="auth-lead">{subtitle}</p>
          {children}
        </div>
      </main>
    </div>
  )
}
