import { TRADE_PLAYBOOK } from '../data/verticals.js'
import { computeInsights } from './insights.js'

export function computeTips(shop) {
  const insights = computeInsights(shop)
  const tips = []
  const top = insights.topSeller
  const slow = insights.leastSellers[0]
  const invest = insights.investMore[0]
  const lapsed = (shop.customers || []).filter((c) => c.daysSince >= 28)

  if (top && top.lowStock) {
    tips.push({
      id: 'restock-top',
      priority: 1,
      title: `Restock ${top.name}`,
      action: `Order at least ${Math.max(top.reorder, Math.ceil(top.velocity * 14))} units before the weekend.`,
      why: `Top seller (${top.unitsSold} units / 30 days) with only ${top.stock} on hand.`,
    })
  } else if (top) {
    tips.push({
      id: 'feature-top',
      priority: 2,
      title: `Keep ${top.name} visible`,
      action: 'Place it at the counter. It already leads your sales.',
      why: `Best seller by units: ${top.unitsSold} in 30 days.`,
    })
  }

  if (slow && invest && slow.id !== invest.id) {
    tips.push({
      id: 'bundle',
      priority: 2,
      title: `Bundle ${slow.name} with ${top?.name || 'a top seller'}`,
      action: 'Offer a small combo discount at billing.',
      why: `${slow.name} sold only ${slow.unitsSold} units while stock sits at ${slow.stock}.`,
    })
  }

  if (insights.investMore[0]) {
    const p = insights.investMore[0]
    tips.push({
      id: 'invest',
      priority: 1,
      title: `Invest more in ${p.name}`,
      action: p.advice,
      why: `Sell-through ${p.unitsSold}/mo · stock ${p.stock} · ~${p.cover} days cover.`,
    })
  }

  if (lapsed.length) {
    tips.push({
      id: 'lapsed',
      priority: 3,
      title: 'WhatsApp lapsed regulars',
      action: `Message ${lapsed.slice(0, 2).map((c) => c.name).join(' & ')} with a small offer.`,
      why: `${lapsed.length} customer(s) have not bought in 28+ days.`,
    })
  }

  tips.push({
    id: 'gst-habit',
    priority: 3,
    title: 'Keep invoices flowing',
    action: 'Bill every sale in Biz Keeping so your GST summary stays ready.',
    why: 'Clean invoice history makes monthly GST prep faster.',
  })

  const playbook = TRADE_PLAYBOOK[shop.type] || TRADE_PLAYBOOK.grocery
  playbook.forEach((line, i) => {
    tips.push({
      id: `trade-${i}`,
      priority: 2 + i,
      title: 'Tip for your trade',
      action: line,
      why: `Personalised for ${shop.name} (${shop.type}).`,
    })
  })

  tips.sort((a, b) => a.priority - b.priority)
  // unique-ish by title+action
  const seen = new Set()
  return tips.filter((t) => {
    const key = t.title + t.action
    if (seen.has(key)) return false
    seen.add(key)
    return true
  }).slice(0, 6)
}
