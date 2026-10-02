import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import AuthCard from '../components/AuthCard.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { api } from '../api.js'

export default function SignupPage() {
  const { user, ready, apply } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (ready && user) return <Navigate to={user.role === 'admin' ? '/admin' : '/setup'} replace />

  const submit = async (event) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      const data = await api('/api/auth/signup', { method: 'POST', body: { name, email, password } })
      apply(data)
      navigate('/setup')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthCard title="Create your shop login" lede="After this, you’ll set the shop name and pick starter items for your trade.">
      <form className="stack" onSubmit={submit}>
        <label className="field-label" htmlFor="name">Your name</label>
        <input id="name" className="field" value={name} onChange={(e) => setName(e.target.value)} required />
        <label className="field-label" htmlFor="email">Email</label>
        <input id="email" className="field" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label className="field-label" htmlFor="password">Password</label>
        <input id="password" className="field" type="password" autoComplete="new-password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error ? <p className="form-error">{error}</p> : null}
        <button className="btn btn--primary" type="submit" disabled={busy}>{busy ? 'Creating…' : 'Continue to shop setup'}</button>
      </form>
      <p style={{ marginTop: '1rem' }}>Already registered? <Link to="/login">Sign in</Link></p>
    </AuthCard>
  )
}
