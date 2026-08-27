import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { cloneShop, DEFAULT_TYPE } from '../data/sampleShop.js'
import { computeInsights } from '../demo/insights.js'
import { computeTips } from '../demo/tips.js'
import { lineTotals, cartTotals, gstSummaryFromProducts } from '../demo/billing.js'

const DemoContext = createContext(null)

export function DemoProvider({ children }) {
  const [shopType, setShopTypeState] = useState(DEFAULT_TYPE)
  const [shop, setShop] = useState(() => cloneShop(DEFAULT_TYPE))
  const [tab, setTab] = useState('dashboard')
  const [cart, setCart] = useState([])
  const [toast, setToast] = useState('')

  const showToast = useCallback((msg) => {
    setToast(msg)
    window.clearTimeout(showToast._t)
    showToast._t = window.setTimeout(() => setToast(''), 2800)
  }, [])

  const setShopType = useCallback((type) => {
    setShopTypeState(type)
    setShop(cloneShop(type))
    setCart([])
    setTab('dashboard')
    showToast(`Switched to ${cloneShop(type).name}`)
  }, [showToast])

  const resetDemo = useCallback(() => {
    setShop(cloneShop(shopType))
    setCart([])
    setTab('dashboard')
    showToast('Demo reset')
  }, [shopType, showToast])

  const adjustStock = useCallback((productId, delta) => {
    setShop((prev) => ({
      ...prev,
      products: prev.products.map((p) =>
        p.id === productId ? { ...p, stock: Math.max(0, p.stock + delta) } : p,
      ),
    }))
  }, [])

  const addToCart = useCallback((product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((l) => l.id === product.id)
      if (existing) {
        return prev.map((l) =>
          l.id === product.id ? lineTotals(product, l.qty + qty) : l,
        )
      }
      return [...prev, lineTotals(product, qty)]
    })
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const completeSale = useCallback(() => {
    if (!cart.length) return
    setShop((prev) => {
      const next = { ...prev, products: prev.products.map((p) => ({ ...p })) }
      cart.forEach((line) => {
        const p = next.products.find((x) => x.id === line.id)
        if (p) {
          p.stock = Math.max(0, p.stock - line.qty)
          p.unitsSold += line.qty
        }
      })
      next.todaySales = (next.todaySales || 0) + cartTotals(cart).grand
      next.invoiceCount = (next.invoiceCount || 0) + 1
      return next
    })
    showToast('Sale recorded. Insights will update')
  }, [cart, showToast])

  const insights = useMemo(() => computeInsights(shop), [shop])
  const tips = useMemo(() => computeTips(shop), [shop])
  const totals = useMemo(() => cartTotals(cart), [cart])
  const gstSummary = useMemo(() => gstSummaryFromProducts(shop.products), [shop])

  const value = {
    shopType,
    setShopType,
    shop,
    tab,
    setTab,
    cart,
    addToCart,
    clearCart,
    totals,
    adjustStock,
    completeSale,
    resetDemo,
    insights,
    tips,
    gstSummary,
    toast,
    showToast,
  }

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

export function useDemo() {
  const ctx = useContext(DemoContext)
  if (!ctx) throw new Error('useDemo must be used within DemoProvider')
  return ctx
}
