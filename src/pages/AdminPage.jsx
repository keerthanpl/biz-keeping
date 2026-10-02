import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { api } from '../api.js'

export default function AdminPage() {
  const { user, ready } = useAuth()
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (!ready || user?.role !== 'admin') return
    api('/api/admin/overview')
      .then((data) => setUsers(data.users))
      .catch((err) => setError(err.message))
  }, [ready, user])

  if (!ready) return <main className="app-page container"><p>Loading…</p></main>
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'admin') return <Navigate to={user ? '/app' : '/login'} replace />

  return (
    <>
      <Nav />
      <main className="app-page">
        <div className="container">
          <h1>Shop accounts</h1>
          <p>You can see who signed up. Stock and bills stay with each shop.</p>
          {error ? <p className="form-error">{error}</p> : null}
          <div className="table-scroll">
            <table className="demo-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Shop</th>
                  <th>Trade</th>
                  <th>Items</th>
                  <th>Low stock</th>
                </tr>
              </thead>
              <tbody>
                {users.map((row) => (
                  <tr key={row.email}>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.shopName || 'Setup not finished'}</td>
                    <td className="mono">{row.trade || '—'}</td>
                    <td className="mono">{row.itemCount || 0}</td>
                    <td className="mono">{row.lowStock || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}
