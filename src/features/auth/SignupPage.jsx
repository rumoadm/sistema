import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconEye, IconEyeOff } from '../../components/Icons'
import { signup } from '../../lib/session'
import { AuthLayout } from './AuthLayout'

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length === 0) return ''
  if (digits.length < 3) return `(${digits}`
  if (digits.length < 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length < 11) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function PasswordField({ id, name, label, placeholder, autoComplete }) {
  const [visible, setVisible] = useState(false)

  return (
    <label className="field">
      <span>{label}</span>
      <span className="password-field">
        <input
          id={id}
          name={name}
          type={visible ? 'text' : 'password'}
          autoComplete={autoComplete}
          required
          minLength={8}
          placeholder={placeholder}
        />
        <button
          className="password-toggle"
          type="button"
          aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
          aria-pressed={visible}
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? <IconEyeOff /> : <IconEye />}
        </button>
      </span>
    </label>
  )
}

export function SignupPage() {
  const [error, setError] = useState('')
  const [phone, setPhone] = useState('')

  async function onSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const password = String(data.get('password') || '')
    const confirm = String(data.get('confirm') || '')
    if (password !== confirm) {
      setError('As senhas não são iguais.')
      return
    }
    const result = await signup({
      firstName: String(data.get('firstName') || ''),
      lastName: String(data.get('lastName') || ''),
      phone,
      email: String(data.get('email') || ''),
      password,
    })
    setError(result.ok ? '' : result.error)
  }

  return (
    <AuthLayout
      title="Crie sua conta"
      subtitle="A gente abre um plano de exemplo para Portugal, só para você ver o caminho."
    >
      <form className="auth-form" onSubmit={onSubmit} noValidate>
        <div className="field-row">
          <label className="field">
            <span>Nome</span>
            <input id="firstName" name="firstName" type="text" autoComplete="given-name" required />
          </label>
          <label className="field">
            <span>Sobrenome</span>
            <input id="lastName" name="lastName" type="text" autoComplete="family-name" required />
          </label>
        </div>
        <label className="field">
          <span>Telefone</span>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(11) 99999-9999"
            value={phone}
            onChange={(event) => setPhone(formatPhone(event.target.value))}
            required
          />
        </label>
        <label className="field">
          <span>E-mail</span>
          <input id="signup-email" name="email" type="email" autoComplete="email" required />
        </label>
        <PasswordField
          id="signup-password"
          name="password"
          label="Senha"
          autoComplete="new-password"
          placeholder="Mínimo de 8 caracteres"
        />
        <PasswordField id="confirm" name="confirm" label="Repita a senha" autoComplete="new-password" />
        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}
        <button className="btn block" type="submit">
          Criar meu plano
        </button>
      </form>
      <p className="local-note">A conta abre no celular e no computador.</p>
      <p className="auth-links">
        <Link to="/">Já tem conta? Entrar</Link>
      </p>
    </AuthLayout>
  )
}
