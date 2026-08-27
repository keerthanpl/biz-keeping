/** Split GST: half CGST / half SGST from product gstRate */
export function lineTotals(product, qty) {
  const rate = product.gstRate ?? 5
  const taxable = product.price * qty
  const tax = (taxable * rate) / 100
  const cgst = tax / 2
  const sgst = tax / 2
  return {
    id: product.id,
    name: product.name,
    qty,
    price: product.price,
    gstRate: rate,
    taxable,
    cgst,
    sgst,
    lineTotal: taxable + tax,
  }
}

export function cartTotals(lines) {
  return lines.reduce(
    (acc, l) => ({
      taxable: acc.taxable + l.taxable,
      cgst: acc.cgst + l.cgst,
      sgst: acc.sgst + l.sgst,
      grand: acc.grand + l.lineTotal,
    }),
    { taxable: 0, cgst: 0, sgst: 0, grand: 0 },
  )
}

export function gstSummaryFromProducts(products) {
  // Approximate month summary from unitsSold * price
  let taxable = 0
  let cgst = 0
  let sgst = 0
  const rows = products.map((p) => {
    const rate = p.gstRate ?? 5
    const t = p.price * p.unitsSold
    const tax = (t * rate) / 100
    taxable += t
    cgst += tax / 2
    sgst += tax / 2
    return { name: p.name, taxable: t, cgst: tax / 2, sgst: tax / 2, rate }
  })
  return { taxable, cgst, sgst, tax: cgst + sgst, rows }
}
