import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'
import Landing from './pages/Landing.jsx'
import PricingPage from './pages/PricingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import SetupPage from './pages/SetupPage.jsx'
import ShopPage from './pages/ShopPage.jsx'
import AdminPage from './pages/AdminPage.jsx'

function Loading() {
  return <main className="app-page container"><p>Loading…</p></main>
}

function RequireUser({ children }) {
  const { user, ready } = useAuth()
  if (!ready) return <Loading />
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/setup" element={<RequireUser><SetupPage /></RequireUser>} />
      <Route path="/app" element={<RequireUser><ShopPage /></RequireUser>} />
      <Route path="/admin" element={<RequireUser><AdminPage /></RequireUser>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
