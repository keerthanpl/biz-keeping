import db from './db.js'
import { hashPassword } from './passwords.js'
import { demoGrocery } from './catalog.js'
import { nowIso, syncAlert } from './shopdata.js'

const DEMO_PASSWORD = 'bizkeeping2026'
const SHOP_EMAIL = 'suryashreevathsa11@gmail.com'
const ADMIN_EMAIL = 'keerthannair03@gmail.com'

function pad(n) {
  return String(n).padStart(2, '0')
}

function lineMoney(price, qty, rate) {
  const taxable = price * qty
  const tax = (taxable * rate) / 100
  return { taxable, cgst: tax / 2, sgst: tax / 2 }
}

function seedMonthSales(shopId, products) {
  const now = new Date()
  const y = now.getFullYear()
  const m = now.getMonth() + 1
  const today = now.getDate()
  const buckets = Array.from({ length: today }, () => new Map())

  for (const product of products) {
    let left = product.units_sold
    let step = 0
    while (left > 0 && step < 8000) {
      const qty = Math.min(left, (step % 4) + 1)
      const day = step % today
      const prev = buckets[day].get(product.id) || 0
      buckets[day].set(product.id, prev + qty)
      left -= qty
      step += 1
    }
  }

  const insertSale = db.prepare(`
    INSERT INTO sales (shop_id, created_at, taxable, cgst, sgst, total, customer_name)
    VALUES (?, ?, ?, ?, ?, ?, '')
  `)
  const insertLine = db.prepare(`
    INSERT INTO sale_lines (sale_id, product_id, name, qty, unit_price, gst_rate, taxable, cgst, sgst)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  const byId = new Map(products.map((p) => [p.id, p]))

  buckets.forEach((qtyByProduct, index) => {
    if (qtyByProduct.size === 0) return
    const lines = []
    for (const [productId, qty] of qtyByProduct) {
      const product = byId.get(productId)
      const money = lineMoney(product.price, qty, product.gst_rate)
      lines.push({ product, qty, ...money })
    }
    const taxable = lines.reduce((sum, l) => sum + l.taxable, 0)
    const cgst = lines.reduce((sum, l) => sum + l.cgst, 0)
    const sgst = lines.reduce((sum, l) => sum + l.sgst, 0)
    const created = `${y}-${pad(m)}-${pad(index + 1)}T11:00:00`
    const sale = insertSale.run(shopId, created, taxable, cgst, sgst, taxable + cgst + sgst)
    for (const line of lines) {
      insertLine.run(
        sale.lastInsertRowid,
        line.product.id,
        line.product.name,
        line.qty,
        line.product.price,
        line.product.gst_rate,
        line.taxable,
        line.cgst,
        line.sgst,
      )
    }
  })
}

export function seedIfEmpty() {
  const { n } = db.prepare('SELECT COUNT(*) AS n FROM users').get()
  if (n > 0) return

  const created = nowIso()
  const passwordHash = hashPassword(DEMO_PASSWORD)
  const insertUser = db.prepare(`
    INSERT INTO users (email, password_hash, name, role, created_at)
    VALUES (?, ?, ?, ?, ?)
  `)

  const run = db.transaction(() => {
    insertUser.run(ADMIN_EMAIL, passwordHash, 'Keerthan', 'admin', created)
    const shopUser = insertUser.run(SHOP_EMAIL, passwordHash, 'Suryashree', 'user', created)

    const sample = demoGrocery()
    const shop = db.prepare(`
      INSERT INTO shops (user_id, name, city, trade, gstin, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(shopUser.lastInsertRowid, sample.name, sample.city, sample.type, sample.gstin, created)

    const insertProduct = db.prepare(`
      INSERT INTO products (shop_id, name, price, stock, reorder_level, gst_rate, units_sold)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    const products = sample.products.map((p) => {
      const row = insertProduct.run(shop.lastInsertRowid, p.name, p.price, p.stock, p.reorder, p.gstRate, p.unitsSold)
      return {
        id: Number(row.lastInsertRowid),
        name: p.name,
        price: p.price,
        stock: p.stock,
        reorder_level: p.reorder,
        gst_rate: p.gstRate,
        units_sold: p.unitsSold,
      }
    })

    const insertCustomer = db.prepare(`
      INSERT INTO customers (shop_id, name, phone, last_purchase, last_seen)
      VALUES (?, ?, ?, ?, ?)
    `)
    const today = new Date()
    for (const customer of sample.customers) {
      const seen = new Date(today)
      seen.setDate(seen.getDate() - (customer.daysSince || 0))
      insertCustomer.run(
        shop.lastInsertRowid,
        customer.name,
        customer.phone,
        customer.lastPurchase,
        seen.toISOString().slice(0, 10),
      )
    }

    seedMonthSales(shop.lastInsertRowid, products)
    for (const product of products) syncAlert(shop.lastInsertRowid, product)
  })

  run()
}
