import { useEffect, useState } from 'react'
import { VERTICALS } from '../../data/verticals.js'
import { api } from '../../api.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { useShop } from '../ShopContext.jsx'

export default function SettingsTab() {
  const { shop, saveShop } = useShop()
  const { refresh } = useAuth()
  const [name, setName] = useState(shop.name)
  const [city, setCity] = useState(shop.city)
  const [trade, setTrade] = useState(shop.type)
  const [gstin, setGstin] = useState(shop.gstin || '')
  const [offers, setOffers] = useState([])
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    setName(shop.name)
    setCity(shop.city)
    setTrade(shop.type)
    setGstin(shop.gstin || '')
  }, [shop.name, shop.city, shop.type, shop.gstin])

  useEffect(() => {
    if (trade === shop.type) {
      setOffers([])
      return
    }
    let cancel = false
    api(`/api/suggestions?trade=${trade}`)
      .then((data) => {
        if (cancel) return
        setOffers(data.items.map((item, index) => ({
          ...item,
          key: `${trade}-${index}`,
          keep: false,
        })))
      })
      .catch(() => {
        if (!cancel) setOffers([])
      })
    return () => { cancel = true }
  }, [trade, shop.type])

  const submit = async (event) => {
    event.preventDefault()
    setBusy(true)
    try {
      await saveShop({
        name,
        city,
        trade,
        gstin,
        addItems: offers.filter((item) => item.keep).map((item) => ({
          name: item.name,
          price: Number(item.price),
          stock: Number(item.stock),
          reorder: Number(item.reorder || 0),
          gstRate: Number(item.gstRate),
        })),
      })
      await refresh()
      setOffers([])
    } catch {
      /* toast */
    } finally {
      setBusy(false)
    }
  }

  return (
    <form className="stack" onSubmit={submit}>
      <div className="form-grid">
        <div>
          <label className="field-label" htmlFor="set-name">Shop name</label>
          <input id="set-name" className="field" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label className="field-label" htmlFor="set-city">City</label>
          <input id="set-city" className="field" value={city} onChange={(e) => setCity(e.target.value)} required />
        </div>
        <div>
          <label className="field-label" htmlFor="set-trade">Business type</label>
          <select id="set-trade" className="field" value={trade} onChange={(e) => setTrade(e.target.value)}>
            {VERTICALS.map((v) => <option key={v.id} value={v.id}>{v.label}</option>)}
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="set-gstin">GSTIN</label>
          <input id="set-gstin" className="field" value={gstin} onChange={(e) => setGstin(e.target.value)} />
        </div>
      </div>
      {offers.length > 0 && (
        <div className="stack">
          <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 15 }}>Starter items for this trade</h3>
          <p>These are not in your shop yet. Tick the ones you want to add. Names another shop already uses are still your own stock.</p>
          {offers.map((item) => (
            <label key={item.key} className="check-line">
              <input
                type="checkbox"
                checked={item.keep}
                onChange={(e) => setOffers((prev) => prev.map((row) => (
                  row.key === item.key ? { ...row, keep: e.target.checked } : row
                )))}
              />
              {item.name} · ₹{item.price} · GST {item.gstRate}%
            </label>
          ))}
        </div>
      )}
      <button className="btn btn--primary btn--small" type="submit" disabled={busy}>Save shop</button>
    </form>
  )
}
