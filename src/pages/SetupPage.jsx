import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import AuthCard from '../components/AuthCard.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { VERTICALS } from '../data/verticals.js'
import { api } from '../api.js'

const emptyItem = () => ({
  key: `custom-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  name: '',
  price: '',
  stock: '',
  reorder: '',
  gstRate: 5,
  keep: true,
  custom: true,
})

export default function SetupPage() {
  const { user, shop, ready, refresh } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [trade, setTrade] = useState('grocery')
  const [gstin, setGstin] = useState('')
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let cancel = false
    api(`/api/suggestions?trade=${trade}`)
      .then((data) => {
        if (cancel) return
        setItems((prev) => {
          const custom = prev.filter((item) => item.custom)
          const suggested = data.items.map((item, index) => ({
            ...item,
            key: `${trade}-${index}-${item.name}`,
            keep: true,
          }))
          return [...suggested, ...custom]
        })
      })
      .catch((err) => {
        if (!cancel) setError(err.message)
      })
    return () => { cancel = true }
  }, [trade])

  if (!ready) return <AuthCard title="Shop setup"><p>Loading…</p></AuthCard>
  if (!user) return <Navigate to="/login" replace />
  if (user.role === 'admin') return <Navigate to="/admin" replace />
  if (shop) return <Navigate to="/app" replace />

  const update = (key, patch) => {
    setItems((prev) => prev.map((item) => (item.key === key ? { ...item, ...patch } : item)))
  }

  const submit = async (event) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    const chosen = items.filter((item) => item.keep).map((item) => ({
      name: item.name.trim(),
      price: Number(item.price),
      stock: Number(item.stock),
      reorder: Number(item.reorder || 0),
      gstRate: Number(item.gstRate),
    }))
    try {
      await api('/api/setup', {
        method: 'POST',
        body: { name, city, trade, gstin, items: chosen },
      })
      await refresh()
      navigate('/app')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthCard wide title="Set up your shop" lede="Tell us the trade. We’ll suggest a starter list. Untick anything you don’t sell, edit the GST rate, or add your own items. Another shop can stock the same names; stock stays yours.">
      <form className="stack" onSubmit={submit}>
        <div className="form-grid">
          <div>
            <label className="field-label" htmlFor="shop-name">Shop name</label>
            <input id="shop-name" className="field" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="field-label" htmlFor="city">City</label>
            <input id="city" className="field" value={city} onChange={(e) => setCity(e.target.value)} required />
          </div>
          <div>
            <label className="field-label" htmlFor="trade">Business type</label>
            <select id="trade" className="field" value={trade} onChange={(e) => setTrade(e.target.value)}>
              {VERTICALS.map((v) => <option key={v.id} value={v.id}>{v.label}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="gstin">GSTIN (optional)</label>
            <input id="gstin" className="field" value={gstin} onChange={(e) => setGstin(e.target.value)} />
          </div>
        </div>

        <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 16 }}>Suggested items</h2>
        <p>Each item keeps its GST bracket, so billing won’t ask for it again. You can change a rate here if it looks wrong.</p>
        <div className="table-scroll">
          <table className="demo-table">
            <thead>
              <tr>
                <th>Keep</th>
                <th>Item</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Reorder</th>
                <th>GST %</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.key}>
                  <td>
                    <input type="checkbox" checked={item.keep} aria-label={`Keep ${item.name || 'item'}`} onChange={(e) => update(item.key, { keep: e.target.checked })} />
                  </td>
                  <td><input className="field" value={item.name} aria-label="Item name" onChange={(e) => update(item.key, { name: e.target.value })} /></td>
                  <td><input className="field field--num" type="number" min="0" step="0.01" value={item.price} aria-label="Price" onChange={(e) => update(item.key, { price: e.target.value })} /></td>
                  <td><input className="field field--num" type="number" min="0" step="1" value={item.stock} aria-label="Stock" onChange={(e) => update(item.key, { stock: e.target.value })} /></td>
                  <td><input className="field field--num" type="number" min="0" step="1" value={item.reorder} aria-label="Reorder level" onChange={(e) => update(item.key, { reorder: e.target.value })} /></td>
                  <td><input className="field field--num" type="number" min="0" max="100" step="0.01" value={item.gstRate} aria-label="GST percent" onChange={(e) => update(item.key, { gstRate: e.target.value })} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="row-actions">
          <button type="button" className="btn btn--ghost btn--small" onClick={() => setItems((prev) => [...prev, emptyItem()])}>Add my own item</button>
        </div>
        {error ? <p className="form-error">{error}</p> : null}
        <button className="btn btn--primary" type="submit" disabled={busy}>{busy ? 'Saving…' : 'Open my shop'}</button>
      </form>
    </AuthCard>
  )
}
