import { useState } from 'react'
import { useShop } from '../ShopContext.jsx'
import { downloadInvoicePdf } from '../../demo/pdf.js'

export default function BillingTab() {
  const { shop, cart, addToCart, setLineRate, clearCart, totals, completeSale, showToast } = useShop()
  const [customerName, setCustomerName] = useState('')
  const [busy, setBusy] = useState(false)

  const shareWhatsApp = () => {
    if (!cart.length) return
    const lines = cart.map((line) => `${line.name} x${line.qty}`).join(', ')
    const text = encodeURIComponent(
      `Invoice from ${shop.name}\n${lines}\nTotal: ₹${totals.grand.toFixed(2)}\nVia Biz Keeping`,
    )
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer')
    showToast('WhatsApp share opened')
  }

  const downloadPdf = () => {
    if (!cart.length) return
    downloadInvoicePdf(shop, cart, totals)
    showToast('Invoice PDF downloaded')
  }

  const record = async () => {
    setBusy(true)
    try {
      await completeSale(customerName)
      setCustomerName('')
    } catch {
      /* toast already shown */
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="two-col">
      <div>
        <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 15 }}>Add items</h3>
        <p>GST comes from the item. You don’t enter it again unless a rate is wrong.</p>
        <table className="demo-table">
          <thead>
            <tr><th>Product</th><th>Price</th><th>GST</th><th>On hand</th><th></th></tr>
          </thead>
          <tbody>
            {shop.products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td className="mono">₹{product.price}</td>
                <td className="mono">{product.gstRate}%</td>
                <td className="mono">{product.stock}</td>
                <td>
                  <button type="button" className="btn btn--small btn--ghost" disabled={product.stock < 1} onClick={() => addToCart(product, 1)}>
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 15 }}>Invoice</h3>
        <label className="field-label" htmlFor="bill-customer">Customer (optional)</label>
        <input id="bill-customer" className="field" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        {!cart.length && <p>Add an item to bill.</p>}
        {!!cart.length && (
          <>
            <table className="demo-table">
              <thead>
                <tr><th>Item</th><th>Qty</th><th>GST %</th><th>Total</th></tr>
              </thead>
              <tbody>
                {cart.map((line) => (
                  <tr key={line.id}>
                    <td>
                      {line.name}
                      {line.gstRate !== line.catalogRate && (
                        <label className="check-line">
                          <input
                            type="checkbox"
                            checked={Boolean(line.saveRate)}
                            onChange={(e) => setLineRate(line.id, line.gstRate, e.target.checked)}
                          />
                          Save {line.gstRate}% on this item
                        </label>
                      )}
                    </td>
                    <td className="mono">{line.qty}</td>
                    <td>
                      <input
                        className="field field--num"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        aria-label={`GST for ${line.name}`}
                        value={line.gstRate}
                        onChange={(e) => setLineRate(line.id, Number(e.target.value), line.saveRate)}
                      />
                    </td>
                    <td className="mono">₹{line.lineTotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mono">Taxable ₹{totals.taxable.toFixed(2)}</p>
            <p className="mono">CGST ₹{totals.cgst.toFixed(2)} · SGST ₹{totals.sgst.toFixed(2)}</p>
            <p className="strong mono">Grand ₹{totals.grand.toFixed(2)}</p>
            <div className="row-actions">
              <button type="button" className="btn btn--primary btn--small" onClick={downloadPdf}>Download PDF</button>
              <button type="button" className="btn btn--ghost btn--small" onClick={shareWhatsApp}>Share WhatsApp</button>
              <button type="button" className="btn btn--ghost btn--small" disabled={busy} onClick={record}>Record sale</button>
              <button type="button" className="btn btn--ghost btn--small" onClick={clearCart}>Clear</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
