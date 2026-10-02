import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [shop, setShop] = useState(null)
  const [ready, setReady] = useState(false)

  const apply = useCallback((data) => {
    setUser(data.user)
    setShop(data.shop)
  }, [])

  const refresh = useCallback(async () => {
    const data = await api('/api/auth/me')
    apply(data)
    return data
  }, [apply])

  useEffect(() => {
    refresh()
      .catch(() => apply({ user: null, shop: null }))
      .finally(() => setReady(true))
  }, [refresh, apply])

  const logout = useCallback(async () => {
    await api('/api/auth/logout', { method: 'POST' })
    apply({ user: null, shop: null })
  }, [apply])

  const value = useMemo(
    () => ({ user, shop, ready, refresh, apply, logout }),
    [user, shop, ready, refresh, apply, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
