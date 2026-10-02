import { jsPDF } from 'jspdf'

export function downloadInvoicePdf(shop, lines, totals) {
  const doc = new jsPDF()
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.text('Biz Keeping Tax Invoice', 14, 18)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.text(shop.name, 14, 28)
  doc.text(`${shop.city} · GSTIN ${shop.gstin}`, 14, 34)
  doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, 14, 40)

  let y = 52
  doc.setFont('helvetica', 'bold')
  doc.text('Item', 14, y)
  doc.text('Qty', 110, y)
  doc.text('Amount', 150, y)
  doc.setFont('helvetica', 'normal')
  y += 8
  lines.forEach((l) => {
    doc.text(String(l.name).slice(0, 40), 14, y)
    doc.text(String(l.qty), 110, y)
    doc.text(`Rs ${l.lineTotal.toFixed(2)}`, 150, y)
    y += 7
  })
  y += 6
  doc.text(`Taxable: Rs ${totals.taxable.toFixed(2)}`, 14, y)
  y += 6
  doc.text(`CGST: Rs ${totals.cgst.toFixed(2)}`, 14, y)
  y += 6
  doc.text(`SGST: Rs ${totals.sgst.toFixed(2)}`, 14, y)
  y += 6
  doc.setFont('helvetica', 'bold')
  doc.text(`Grand total: Rs ${totals.grand.toFixed(2)}`, 14, y)
  doc.save(`${shop.name.replace(/\s+/g, '-')}-invoice.pdf`)
}

export function downloadGstSummaryPdf(shop, summary, options = {}) {
  const doc = new jsPDF()
  const title = options.title || 'Biz Keeping GST Summary (Sample)'
  const period = options.period || 'Period: This month (sample demo data)'
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.text(title, 14, 18)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.text(shop.name, 14, 28)
  doc.text(`GSTIN ${shop.gstin || 'not set'}`, 14, 34)
  doc.text(period, 14, 40)
  let y = 52
  if (summary.total != null) {
    doc.text(`Sales total: Rs ${Number(summary.total).toFixed(2)}`, 14, y)
    y += 6
  }
  doc.text(`Taxable value: Rs ${summary.taxable.toFixed(2)}`, 14, y)
  y += 6
  doc.text(`CGST: Rs ${summary.cgst.toFixed(2)}`, 14, y)
  y += 6
  doc.text(`SGST: Rs ${summary.sgst.toFixed(2)}`, 14, y)
  y += 6
  doc.text(`Total tax: Rs ${summary.tax.toFixed(2)}`, 14, y)
  doc.setFontSize(9)
  doc.text('Disclaimer: Prepares a report from shop sales. Does not file on GSTN.', 14, y + 16)
  doc.save(`${shop.name.replace(/\s+/g, '-')}-gst-summary.pdf`)
}
