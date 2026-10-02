import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../api.js'
import { lineTotals, cartTotals } from '../demo/billing.js'
import { computeInsights } from '../demo/insights.js'
import { computeTips } from '../demo/tips.js'

const ShopContext = createContext(null)

export function ShopProvider({ children }) {
  const [shop, setShop] = useState(null)
  const [tab, setTab] = useState('dashboard')
  const [cart, setCart] = useState([])
  const [toast, setToast] = useState('')
  const [ready, setReady] = useState(false)
  const [error, setError] = useState('')

  const showToast = useCallback((msg) => {
    setToast(msg)
    window.clearTimeout(showToast._t)
    showToast._t = window.setTimeout(() => setToast(''), 3200)
  }, [])

  const reload = useCallback(async () => {
    const data = await api('/api/shop')
    setShop(data.shop)
    return data.shop
  }, [])

  useEffect(() => {
    reload()
      .catch((err) => setError(err.message))
      .finally(() => setReady(true))
  }, [reload])

  const run = useCallback(async (fn, okMessage) => {
    try {
      const next = await fn()
      if (next) setShop(next)
      if (okMessage) showToast(okMessage)
      setError('')
      return next
    } catch (err) {
      showToast(err.message)
      throw err
    }
  }, [showToast])

  const saveProduct = useCallback((id, body, message) => (
    run(() => api(id ? `/api/products/${id}` : '/api/products', {
      method: id ? 'PATCH' : 'POST',
      body,
    }).then((data) => data.shop), message === undefined ? (id ? 'Item updated' : 'Item added') : message)
  ), [run])

  const removeProduct = useCallback((id) => (
    run(() => api(`/api/products/${id}`, { method: 'DELETE' }).then((data) => data.shop), 'Item removed')
  ), [run])

  const adjustStock = useCallback((product, delta) => {
    const stock = Math.max(0, product.stock + delta)
    return saveProduct(product.id, { stock }, '')
  }, [saveProduct])

  const addToCart = useCallback((product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((line) => line.id === product.id)
      if (existing) return prev.map((line) => (
        line.id === product.id
          ? { ...lineTotals(product, line.qty + qty, line.gstRate), saveRate: line.saveRate }
          : line
      ))
      return [...prev, { ...lineTotals(product, qty), saveRate: false }]
    })
  }, [])

  const setLineRate = useCallback((productId, gstRate, saveRate) => {
    setCart((prev) => prev.map((line) => {
      if (line.id !== productId) return line
      const product = { id: line.id, name: line.name, price: line.price, gstRate: line.catalogRate }
      return { ...lineTotals(product, line.qty, gstRate), saveRate }
    }))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const completeSale = useCallback(async (customerName) => {
    if (!cart.length) return
    const before = new Set((shop?.alerts || []).map((alert) => alert.id))
    const next = await run(() => api('/api/sales', {
      method: 'POST',
      body: {
        customerName,
        lines: cart.map((line) => ({
          productId: line.id,
          qty: line.qty,
          gstRate: line.gstRate,
          saveRate: Boolean(line.saveRate),
        })),
      },
    }).then((data) => data.shop))
    setCart([])
    const fresh = (next?.alerts || []).filter((alert) => !before.has(alert.id))
    showToast(fresh[0]?.message || 'Sale recorded')
  }, [cart, shop, run, showToast])

  const saveCustomer = useCallback((id, body) => (
    run(() => api(id ? `/api/customers/${id}` : '/api/customers', {
      method: id ? 'PATCH' : 'POST',
      body,
    }).then((data) => data.shop), id ? 'Customer updated' : 'Customer added')
  ), [run])

  const saveShop = useCallback((body) => (
    run(() => api('/api/shop', { method: 'PATCH', body }).then((data) => data.shop), 'Shop details saved')
  ), [run])

  const dismissAlert = useCallback((id) => (
    run(() => api(`/api/notifications/${id}/dismiss`, { method: 'POST' }).then((data) => data.shop))
  ), [run])

  const insights = useMemo(() => (shop ? computeInsights(shop) : null), [shop])
  const tips = useMemo(() => (shop ? computeTips(shop) : []), [shop])
  const totals = useMemo(() => cartTotals(cart), [cart])

  const value = {
    shop,
    ready,
    error,
    tab,
    setTab,
    cart,
    totals,
    insights,
    tips,
    toast,
    showToast,
    addToCart,
    setLineRate,
    clearCart,
    completeSale,
    adjustStock,
    saveProduct,
    removeProduct,
    saveCustomer,
    saveShop,
    dismissAlert,
  }

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop() {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop must be used within ShopProvider')
  return ctx
}
