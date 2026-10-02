import { useEffect, useState } from 'react'
import { useShop } from '../ShopContext.jsx'
import { api } from '../../api.js'
import { downloadGstSummaryPdf } from '../../demo/pdf.js'

function currentMonth() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export default function ReportTab() {
  const { shop, showToast } = useShop()
  const [month, setMonth] = useState(currentMonth)
  const [report, setReport] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancel = false
    api(`/api/report?month=${month}`)
      .then((data) => {
        if (!cancel) setReport(data.report)
      })
      .catch((err) => {
        if (!cancel) setError(err.message)
      })
    return () => { cancel = true }
  }, [month, shop.todaySales, shop.invoiceCount])

  const download = () => {
    if (!report) return
    downloadGstSummaryPdf(shop, {
      taxable: report.taxable,
      cgst: report.cgst,
      sgst: report.sgst,
      tax: report.cgst + report.sgst,
      total: report.total,
    }, {
      title: 'Biz Keeping monthly report',
      period: `Period: ${report.month}`,
    })
    showToast('Monthly report downloaded')
  }

  const top = report?.items.slice(0, 5) || []
  const slow = report ? [...report.items].sort((a, b) => a.qty - b.qty).slice(0, 5) : []

  return (
    <div className="stack">
      <label className="field-label" htmlFor="report-month">Month</label>
      <input id="report-month" className="field field--num" type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
      {error ? <p className="form-error">{error}</p> : null}
      {!report && <p>Loading the report…</p>}
      {report && (
        <>
          <div className="demo-grid">
            <div className="demo-stat"><span>Sales</span><strong>₹{Math.round(report.total).toLocaleString('en-IN')}</strong></div>
            <div className="demo-stat"><span>Invoices</span><strong>{report.invoices}</strong></div>
            <div className="demo-stat"><span>Taxable</span><strong>₹{Math.round(report.taxable).toLocaleString('en-IN')}</strong></div>
            <div className="demo-stat"><span>CGST</span><strong>₹{Math.round(report.cgst).toLocaleString('en-IN')}</strong></div>
            <div className="demo-stat"><span>SGST</span><strong>₹{Math.round(report.sgst).toLocaleString('en-IN')}</strong></div>
          </div>
          <div className="two-col">
            <div>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 15 }}>Sold most</h3>
              <ul>{top.map((item) => <li key={item.name}>{item.name}: <span className="mono">{item.qty}</span></li>)}</ul>
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 15 }}>Sold least</h3>
              <ul>{slow.map((item) => <li key={item.name}>{item.name}: <span className="mono">{item.qty}</span></li>)}</ul>
            </div>
          </div>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 15 }}>Still low</h3>
          {report.lowStock.length === 0 && <p>Nothing is at or below its reorder level.</p>}
          {report.lowStock.length > 0 && (
            <ul>
              {report.lowStock.map((item) => (
                <li key={item.id}>{item.name}: <span className="mono">{item.stock}</span> on hand, reorder at {item.reorder}</li>
              ))}
            </ul>
          )}
          <button type="button" className="btn btn--primary btn--small" onClick={download}>Download PDF</button>
        </>
      )}
    </div>
  )
}
