import { useDemo } from '../../context/DemoContext.jsx'
import { downloadInvoicePdf } from '../pdf.js'

export default function BillingTab() {
  const { shop, cart, addToCart, clearCart, totals, completeSale, showToast } = useDemo()

  const shareWhatsApp = () => {
    if (!cart.length) return
    const lines = cart.map((l) => `${l.name} x${l.qty}`).join(', ')
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

  const record = () => {
    completeSale()
    clearCart()
  }

  return (
    <div className="two-col">
      <div>
        <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 15 }}>Add items</h3>
        <table className="demo-table">
          <thead>
            <tr><th>Product</th><th>Price</th><th></th></tr>
          </thead>
          <tbody>
            {shop.products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td className="mono">₹{p.price}</td>
                <td>
                  <button type="button" className="btn btn--small btn--ghost" onClick={() => addToCart(p, 1)}>
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
        {!cart.length && <p>Add an item to bill.</p>}
        {!!cart.length && (
          <>
            <table className="demo-table">
              <thead>
                <tr><th>Item</th><th>Qty</th><th>Total</th></tr>
              </thead>
              <tbody>
                {cart.map((l) => (
                  <tr key={l.id}>
                    <td>{l.name}</td>
                    <td className="mono">{l.qty}</td>
                    <td className="mono">₹{l.lineTotal.toFixed(2)}</td>
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
              <button type="button" className="btn btn--ghost btn--small" onClick={record}>Record sale</button>
              <button type="button" className="btn btn--ghost btn--small" onClick={clearCart}>Clear</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
