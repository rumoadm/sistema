import { useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../../lib/session'
import { AuthLayout } from './AuthLayout'

export function LoginPage() {
  const [error, setError] = useState('')

  async function onSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const result = await login({
      email: data.get('email'),
      password: data.get('password'),
    })
    setError(result.ok ? '' : result.error)
  }

  return (
    <AuthLayout
      minimal
      title="Entre no seu plano"
      subtitle="A mesma conta abre no celular e no computador."
    >
      <form className="auth-form" onSubmit={onSubmit} noValidate>
        <label className="field">
          <span>E-mail</span>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </label>
        <label className="field">
          <span>Senha</span>
          <input id="password" name="password" type="password" autoComplete="current-password" required minLength={8} />
        </label>
        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}
        <button className="btn block" type="submit">
          Entrar
        </button>
      </form>
      <p className="local-note">A senha fica protegida na sua conta.</p>
      <p className="auth-links">
        <Link to="/recuperar-senha">Esqueci minha senha</Link>
        <Link to="/cadastro">Criar conta</Link>
      </p>
    </AuthLayout>
  )
}
