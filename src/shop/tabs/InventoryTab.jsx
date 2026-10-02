import { useState } from 'react'
import { useShop } from '../ShopContext.jsx'
import { computeInsights } from '../../demo/insights.js'

const blank = { name: '', price: '', stock: '', reorder: '', gstRate: 5 }

export default function InventoryTab() {
  const { shop, adjustStock, saveProduct, removeProduct, setTab } = useShop()
  const { products } = computeInsights(shop)
  const [form, setForm] = useState(blank)
  const [editing, setEditing] = useState(null)
  const [busy, setBusy] = useState(false)

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const startEdit = (product) => {
    setEditing(product.id)
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      reorder: product.reorder,
      gstRate: product.gstRate,
    })
  }

  const submit = async (event) => {
    event.preventDefault()
    setBusy(true)
    try {
      await saveProduct(editing, {
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
        reorder: Number(form.reorder || 0),
        gstRate: Number(form.gstRate),
      })
      setForm(blank)
      setEditing(null)
    } catch {
      /* toast */
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="stack">
      <form className="form-grid" onSubmit={submit}>
        <div>
          <label className="field-label" htmlFor="item-name">{editing ? 'Edit item' : 'New item'}</label>
          <input id="item-name" className="field" value={form.name} onChange={(e) => set('name', e.target.value)} required />
        </div>
        <div>
          <label className="field-label" htmlFor="item-price">Price ₹</label>
          <input id="item-price" className="field" type="number" min="0" step="0.01" value={form.price} onChange={(e) => set('price', e.target.value)} required />
        </div>
        <div>
          <label className="field-label" htmlFor="item-stock">On hand</label>
          <input id="item-stock" className="field" type="number" min="0" step="1" value={form.stock} onChange={(e) => set('stock', e.target.value)} required />
        </div>
        <div>
          <label className="field-label" htmlFor="item-reorder">Reorder at</label>
          <input id="item-reorder" className="field" type="number" min="0" step="1" value={form.reorder} onChange={(e) => set('reorder', e.target.value)} required />
        </div>
        <div>
          <label className="field-label" htmlFor="item-gst">GST %</label>
          <input id="item-gst" className="field" type="number" min="0" max="100" step="0.01" value={form.gstRate} onChange={(e) => set('gstRate', e.target.value)} required />
        </div>
        <div className="row-actions" style={{ alignSelf: 'end' }}>
          <button className="btn btn--primary btn--small" type="submit" disabled={busy}>{editing ? 'Save item' : 'Add item'}</button>
          {editing && (
            <button className="btn btn--ghost btn--small" type="button" onClick={() => { setEditing(null); setForm(blank) }}>Cancel</button>
          )}
        </div>
      </form>
      <p>The GST percent stays on the item. Change it here if a bracket was saved wrong.</p>
      <table className="demo-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>GST</th>
            <th>On hand</th>
            <th>Reorder</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td className="mono">₹{product.price}</td>
              <td className="mono">{product.gstRate}%</td>
              <td className="mono">{product.stock}</td>
              <td className="mono">{product.reorder || '—'}</td>
              <td>
                {product.lowStock && <span className="badge badge--low">Low stock</span>}
                {product.overstock && <span className="badge badge--over">Overstocked</span>}
                {!product.lowStock && !product.overstock && <span className="badge">OK</span>}
              </td>
              <td>
                <div className="row-actions">
                  <button type="button" className="btn btn--small btn--ghost" onClick={() => adjustStock(product, -1)}>-</button>
                  <button type="button" className="btn btn--small btn--ghost" onClick={() => adjustStock(product, 1)}>+</button>
                  <button type="button" className="btn btn--small btn--ghost" onClick={() => startEdit(product)}>Edit</button>
                  <button type="button" className="btn btn--small btn--ghost" onClick={() => setTab('insights')}>Insights</button>
                  <button
                    type="button"
                    className="btn btn--small btn--ghost"
                    onClick={() => {
                      if (window.confirm(`Remove ${product.name}? Past invoices keep the name.`)) removeProduct(product.id)
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
