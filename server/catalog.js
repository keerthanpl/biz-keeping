import { SHOPS } from '../src/data/sampleShop.js'
import { VERTICALS } from '../src/data/verticals.js'

export function listTrades() {
  return VERTICALS.map((v) => ({ id: v.id, label: v.label, short: v.short }))
}

export function isTrade(id) {
  return Boolean(SHOPS[id])
}

/** Starter catalogue for a new shop. Stock starts at the reorder level, not the demo's on-hand count. */
export function starterItems(trade) {
  const shop = SHOPS[trade]
  if (!shop) return []
  return shop.products.map((p) => ({
    name: p.name,
    price: p.price,
    stock: p.reorder > 0 ? p.reorder : 0,
    reorder: p.reorder,
    gstRate: p.gstRate ?? 0,
  }))
}

export function demoGrocery() {
  return SHOPS.grocery
}
