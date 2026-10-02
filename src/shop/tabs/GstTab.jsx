import { useEffect, useState } from 'react'
import { useShop } from '../ShopContext.jsx'
import { api } from '../../api.js'
import { downloadGstSummaryPdf } from '../../demo/pdf.js'

function currentMonth() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export default function GstTab() {
  const { shop, showToast } = useShop()
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    api(`/api/report?month=${currentMonth()}`)
      .then((data) => setSummary(data.report))
      .catch((err) => showToast(err.message))
  }, [showToast, shop.invoiceCount, shop.todaySales])

  const download = () => {
    if (!summary) return
    downloadGstSummaryPdf(shop, {
      taxable: summary.taxable,
      cgst: summary.cgst,
      sgst: summary.sgst,
      tax: summary.cgst + summary.sgst,
      total: summary.total,
    }, {
      title: 'Biz Keeping GST Summary',
      period: `Period: ${summary.month}`,
    })
    showToast('GST summary PDF downloaded')
  }

  if (!summary) return <p>Loading this month’s GST…</p>

  return (
    <div className="stack">
      <p className="strong">Period: {summary.month}. Rates are the ones stored on each sale.</p>
      <div className="demo-grid">
        <div className="demo-stat"><span>Taxable</span><strong>₹{Math.round(summary.taxable).toLocaleString('en-IN')}</strong></div>
        <div className="demo-stat"><span>CGST</span><strong>₹{Math.round(summary.cgst).toLocaleString('en-IN')}</strong></div>
        <div className="demo-stat"><span>SGST</span><strong>₹{Math.round(summary.sgst).toLocaleString('en-IN')}</strong></div>
      </div>
      <table className="demo-table">
        <thead>
          <tr><th>Item</th><th>Qty</th><th>Taxable</th><th>Tax</th></tr>
        </thead>
        <tbody>
          {summary.items.map((row) => (
            <tr key={row.name}>
              <td>{row.name}</td>
              <td className="mono">{row.qty}</td>
              <td className="mono">₹{Math.round(row.taxable).toLocaleString('en-IN')}</td>
              <td className="mono">₹{Math.round(row.cgst + row.sgst).toLocaleString('en-IN')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="disclaimer">
        This prepares a summary from your sales. It does not connect to GSTN or file returns.
      </div>
      <div className="row-actions">
        <button type="button" className="btn btn--primary btn--small" onClick={download}>Download GST summary PDF</button>
      </div>
    </div>
  )
}
