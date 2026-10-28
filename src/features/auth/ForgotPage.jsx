import { useState } from 'react'
import { Link } from 'react-router-dom'
import { requestPasswordReset } from '../../lib/session'
import { AuthLayout } from './AuthLayout'

export function ForgotPage() {
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  async function onSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const result = await requestPasswordReset(data.get('email'))
    setSent(result.ok)
    setError(result.ok ? '' : result.error)
  }

  return (
    <AuthLayout title="Recuperar senha" subtitle="A gente envia um link para criar uma senha nova.">
      {sent ? (
        <p>Se esse e-mail tiver conta, o link já foi enviado. Olhe também a caixa de spam.</p>
      ) : (
        <form className="auth-form" onSubmit={onSubmit} noValidate>
          <label className="field">
            <span>E-mail</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
          {error ? (
            <p className="form-error" role="alert">
              {error}
            </p>
          ) : null}
          <button className="btn block" type="submit">
            Enviar link
          </button>
        </form>
      )}
      <p className="auth-links">
        <Link to="/">Voltar para entrar</Link>
      </p>
    </AuthLayout>
  )
}
