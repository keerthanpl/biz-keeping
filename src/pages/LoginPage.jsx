import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import AuthCard from '../components/AuthCard.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { api } from '../api.js'

function homeFor(data) {
  if (data.user?.role === 'admin') return '/admin'
  if (data.shop) return '/app'
  return '/setup'
}

export default function LoginPage() {
  const { user, shop, ready, apply } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (ready && user) return <Navigate to={homeFor({ user, shop })} replace />

  const submit = async (event) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      const data = await api('/api/auth/login', { method: 'POST', body: { email, password } })
      apply(data)
      navigate(homeFor(data))
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthCard title="Sign in" lede="Open your shop, or the admin desk.">
      <form className="stack" onSubmit={submit}>
        <label className="field-label" htmlFor="email">Email</label>
        <input id="email" className="field" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label className="field-label" htmlFor="password">Password</label>
        <input id="password" className="field" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error ? <p className="form-error">{error}</p> : null}
        <button className="btn btn--primary" type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
      <p style={{ marginTop: '1rem' }}>New shop? <Link to="/signup">Create an account</Link></p>
    </AuthCard>
  )
}
