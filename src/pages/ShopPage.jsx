import { Navigate } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { ShopProvider } from '../shop/ShopContext.jsx'
import ShopShell from '../shop/ShopShell.jsx'

export default function ShopPage() {
  const { user, shop, ready } = useAuth()
  if (!ready) return <main className="app-page container"><p>Loading…</p></main>
  if (!user) return <Navigate to="/login" replace />
  if (user.role === 'admin') return <Navigate to="/admin" replace />
  if (!shop) return <Navigate to="/setup" replace />

  return (
    <ShopProvider>
      <Nav />
      <main className="app-page">
        <div className="container">
          <ShopShell />
        </div>
      </main>
    </ShopProvider>
  )
}
