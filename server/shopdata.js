import db from './db.js'

export function nowIso() {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

export function todayKey() {
  return nowIso().slice(0, 10)
}

export function daysSince(isoDate) {
  if (!isoDate) return 0
  const then = new Date(`${isoDate}T00:00:00`)
  const now = new Date(`${todayKey()}T00:00:00`)
  return Math.max(0, Math.round((now - then) / 86400000))
}

export function syncAlert(shopId, product) {
  const reorder = product.reorder_level
  const low = reorder > 0 && product.stock <= reorder
  if (!low) {
    db.prepare('UPDATE notifications SET open = 0 WHERE shop_id = ? AND product_id = ? AND open = 1')
      .run(shopId, product.id)
    return
  }
  const open = db.prepare(
    'SELECT id FROM notifications WHERE shop_id = ? AND product_id = ? AND open = 1',
  ).get(shopId, product.id)
  if (open) return
  db.prepare(`
    INSERT INTO notifications (shop_id, product_id, message, open, created_at)
    VALUES (?, ?, ?, 1, ?)
  `).run(
    shopId,
    product.id,
    `${product.name} is down to ${product.stock} (reorder at ${reorder}).`,
    nowIso(),
  )
}

function mapProduct(row) {
  return {
    id: row.id,
    name: row.name,
    price: row.price,
    stock: row.stock,
    reorder: row.reorder_level,
    unitsSold: row.units_sold,
    gstRate: row.gst_rate,
  }
}

export function shopSnapshot(shopId) {
  const shop = db.prepare('SELECT * FROM shops WHERE id = ?').get(shopId)
  if (!shop) return null
  const products = db.prepare('SELECT * FROM products WHERE shop_id = ? ORDER BY name COLLATE NOCASE').all(shopId)
  const customers = db.prepare('SELECT * FROM customers WHERE shop_id = ? ORDER BY name COLLATE NOCASE').all(shopId)
  const stats = db.prepare(`
    SELECT COALESCE(SUM(total), 0) AS sales, COUNT(*) AS invoices
    FROM sales WHERE shop_id = ? AND substr(created_at, 1, 10) = ?
  `).get(shopId, todayKey())
  const alerts = db.prepare(`
    SELECT id, product_id AS productId, message
    FROM notifications WHERE shop_id = ? AND open = 1 ORDER BY id DESC
  `).all(shopId)

  return {
    id: shop.id,
    name: shop.name,
    city: shop.city,
    type: shop.trade,
    gstin: shop.gstin,
    todaySales: stats.sales,
    invoiceCount: stats.invoices,
    products: products.map(mapProduct),
    customers: customers.map((c) => ({
      id: c.id,
      name: c.name,
      phone: c.phone,
      lastPurchase: c.last_purchase,
      daysSince: daysSince(c.last_seen),
    })),
    alerts,
  }
}

export function shopForUser(userId) {
  return db.prepare('SELECT id FROM shops WHERE user_id = ?').get(userId) || null
}

export function monthRange(month) {
  const [y, m] = month.split('-').map(Number)
  const start = `${y}-${String(m).padStart(2, '0')}-01`
  const next = m === 12 ? `${y + 1}-01-01` : `${y}-${String(m + 1).padStart(2, '0')}-01`
  return { start, next }
}

export function monthReport(shopId, month) {
  const { start, next } = monthRange(month)
  const totals = db.prepare(`
    SELECT COUNT(*) AS invoices,
           COALESCE(SUM(taxable), 0) AS taxable,
           COALESCE(SUM(cgst), 0) AS cgst,
           COALESCE(SUM(sgst), 0) AS sgst,
           COALESCE(SUM(total), 0) AS total
    FROM sales
    WHERE shop_id = ? AND created_at >= ? AND created_at < ?
  `).get(shopId, start, next)

  const items = db.prepare(`
    SELECT sl.name AS name,
           SUM(sl.qty) AS qty,
           SUM(sl.taxable) AS taxable,
           SUM(sl.cgst) AS cgst,
           SUM(sl.sgst) AS sgst
    FROM sale_lines sl
    JOIN sales s ON s.id = sl.sale_id
    WHERE s.shop_id = ? AND s.created_at >= ? AND s.created_at < ?
    GROUP BY sl.name
    ORDER BY qty DESC, sl.name COLLATE NOCASE
  `).all(shopId, start, next)

  const lowStock = db.prepare(`
    SELECT id, name, stock, reorder_level AS reorder
    FROM products
    WHERE shop_id = ? AND reorder_level > 0 AND stock <= reorder_level
    ORDER BY name COLLATE NOCASE
  `).all(shopId)

  return { month, ...totals, items, lowStock }
}
