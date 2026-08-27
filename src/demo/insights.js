/** Rule-based product rankings and advice from shop state */

function daysOfCover(stock, unitsSold, windowDays = 30) {
  const daily = unitsSold / windowDays
  if (daily <= 0) return stock > 0 ? 999 : 0
  return Math.round(stock / daily)
}

export function computeInsights(shop) {
  const products = shop.products.map((p) => {
    const velocity = p.unitsSold / 30
    const cover = daysOfCover(p.stock, p.unitsSold)
    const lowStock = p.reorder > 0 && p.stock <= p.reorder
    const overstock = p.reorder > 0 && p.stock > p.reorder * 3 && p.unitsSold < 15
    const investScore = velocity * 10 + (lowStock ? 40 : 0) - (cover > 60 ? 20 : 0)
    const slowScore = (40 - Math.min(p.unitsSold, 40)) + (overstock ? 30 : 0) + (cover > 90 ? 20 : 0)
    const marginProxy = p.price
    const focusScore = slowScore * 0.6 + (marginProxy > 500 && p.unitsSold < 20 ? 25 : 0) + (lowStock && velocity > 1 ? 15 : 0)
    return {
      ...p,
      velocity: Number(velocity.toFixed(2)),
      cover,
      lowStock,
      overstock,
      investScore,
      slowScore,
      focusScore,
      revenue: p.unitsSold * p.price,
    }
  })

  const byUnits = [...products].sort((a, b) => b.unitsSold - a.unitsSold)
  const byRevenue = [...products].sort((a, b) => b.revenue - a.revenue)
  const least = [...products].sort((a, b) => a.unitsSold - b.unitsSold)
  const invest = [...products].sort((a, b) => b.investScore - a.investScore).slice(0, 3)
  const focus = [...products].sort((a, b) => b.focusScore - a.focusScore).slice(0, 3)
  const lowStockCount = products.filter((p) => p.lowStock).length

  const forecast = byUnits.slice(0, 3).map((p) => ({
    id: p.id,
    name: p.name,
    nextWeek: Math.max(1, Math.round(p.velocity * 7 * 1.05)),
  }))

  return {
    products,
    topByUnits: byUnits.slice(0, 5),
    topByRevenue: byRevenue.slice(0, 5),
    leastSellers: least.slice(0, 5),
    investMore: invest.map((p) => ({
      ...p,
      advice: p.lowStock
        ? `Invest more: only ${p.stock} left vs reorder ${p.reorder}.`
        : `Invest more: strong sales (${p.unitsSold}/mo).`,
    })),
    focusMore: focus.map((p) => ({
      ...p,
      advice:
        p.unitsSold < 10 && p.stock > p.reorder * 2
          ? `Focus: slow mover with heavy stock (${p.stock} on hand). Promote or clear.`
          : p.lowStock
            ? `Focus: do not miss sales; restock ${p.name}.`
            : `Focus: watch this SKU this week.`,
    })),
    forecast,
    lowStockCount,
    topSeller: byUnits[0] || null,
  }
}
