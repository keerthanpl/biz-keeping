import { useDemo } from '../../context/DemoContext.jsx'
import { downloadGstSummaryPdf } from '../pdf.js'

export default function GstTab() {
  const { shop, gstSummary, showToast } = useDemo()

  const download = () => {
    downloadGstSummaryPdf(shop, gstSummary)
    showToast('GST summary PDF downloaded')
  }

  return (
    <div className="stack">
      <p className="strong">Period: This month (sample)</p>
      <div className="demo-grid">
        <div className="demo-stat"><span>Taxable</span><strong>₹{Math.round(gstSummary.taxable).toLocaleString('en-IN')}</strong></div>
        <div className="demo-stat"><span>CGST</span><strong>₹{Math.round(gstSummary.cgst).toLocaleString('en-IN')}</strong></div>
        <div className="demo-stat"><span>SGST</span><strong>₹{Math.round(gstSummary.sgst).toLocaleString('en-IN')}</strong></div>
      </div>
      <table className="demo-table">
        <thead>
          <tr><th>Item rollup</th><th>Rate</th><th>Taxable</th><th>Tax</th></tr>
        </thead>
        <tbody>
          {gstSummary.rows.slice(0, 8).map((r) => (
            <tr key={r.name}>
              <td>{r.name}</td>
              <td className="mono">{r.rate}%</td>
              <td className="mono">₹{Math.round(r.taxable).toLocaleString('en-IN')}</td>
              <td className="mono">₹{Math.round(r.cgst + r.sgst).toLocaleString('en-IN')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="disclaimer">
        This prototype prepares reports from sample data. It does not connect to GSTN or file returns for you.
      </div>
      <div className="row-actions">
        <button type="button" className="btn btn--primary btn--small" onClick={download}>Download GST summary PDF</button>
      </div>
    </div>
  )
}
