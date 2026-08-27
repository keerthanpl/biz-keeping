# Biz Keeping — Website Plan

Master build brief for the single-page React prototype. Follow [`DESIGN_LANGUAGE.md`](./DESIGN_LANGUAGE.md) and [`UI_UX.md`](./UI_UX.md).

---

## Overview

Premium-practical marketing page + embedded product demo for **Biz Keeping**. Pure frontend. Zero gradients. English only.

**Target user action:** Try the demo → understand GST assist + insights/tips → see pricing.

---

## Brand

**Name:** Biz Keeping  
**Wordmark:** Fraunces, Ink on Paper (or Paper on Counter ink for dark bands).

---

## 1. Navigation

**Style:** Sticky top bar, full width.

```
[Biz Keeping]     [Problem  Who it's for  Demo  GST  Insights  Pricing]     [Try demo]
```

**Behaviour:**
- Default: Paper background, Ink text, 1px Rule bottom border after scroll > 40px
- Active section: teal underline 2px
- Mobile: hamburger → full-screen Counter panel, large links
- CTA “Try demo”: solid teal, Paper text; hover darken teal flat

---

## 2. Hero

**Background:** Paper `#F3EEE4`, min-height `100vh` (minus nav).

**Layout:**
```
Biz Keeping                          [demo peek frame, right / below on mobile]

KEEPING THE COUNTER CLEAR

Run sales, stock, GST-ready reports,
and get tips for *your* shop.

[Try the live demo]  [How GST assist works]
```

**Copy (locked):**
- Label: `FOR INDIAN SMALL BUSINESSES`
- Headline: `Keeping the counter clear.`
- Sub: `Billing, inventory, GST-ready reports, and personalised tips — built for grocerys, bookstores, cloth shops, and everyday trades.`
- CTAs: `Try the live demo` → `#demo` · `How GST assist works` → `#gst`

**Motion:**
1. Brand wordmark clip-reveal
2. Headline clip-reveal (words)
3. Sub fade-up 12px
4. CTAs fade-up
5. Demo peek: ruled-frame wipe left→right

No stats. No floating badges on the peek.

---

## 3. Problem

**Background:** Counter ink `#241F1A`, text Paper.

**Label:** `THE DAILY MESS`  
**Heading:** `Notebooks don’t tell you what to restock.`

Three ruled rows (not cards):
1. **Guesswork sales** — Best and worst sellers live in someone’s head.
2. **GST scramble** — Invoices scattered when returns are due.
3. **Generic advice** — Internet tips don’t know *your* stock or trade.

**Motion:** rows wipe in; thin Paper rule grows under heading.

---

## 4. Who it’s for

**Background:** Paper.  
**Label:** `WHO IT’S FOR`  
**Heading:** `Built for everyday Indian shops.`

Vertical strip (wrap grid), stroke icon + label:

Grocery · Restaurant · Pharmacy · Salon · Garage · Bookstore · Cloth · Electronics · Hardware · Bakery · Pet · Optical · Gifts · Printshop

**Motion:** icons stagger in on scroll. Clicking a vertical scrolls to `#demo` and (if implemented) preselects that shop type in the demo switcher.

---

## 5. Interactive demo

**Background:** Counter `#E6DFD2`.  
**Label:** `LIVE DEMO`  
**Heading:** `Run the shop for a minute.`  
**Sub:** Switch trade · bill an invoice · check GST · read tips for this business.

### Demo chrome

- Outer frame: Rule border, Panel white interior
- Top bar: shop name | shop-type `<select>` | Reset
- Tabs: Dashboard | Billing | Inventory | Customers | GST | Insights

### Tab specs

**Dashboard**
- Today’s sales (₹), invoices count, low-stock count
- Top seller chip
- 2 tip previews → jump Insights

**Billing**
- Product picker from sample catalogue
- Line items, qty, CGST 2.5% + SGST 2.5% (or 9+9 for 18% items — keep simple: 2.5+2.5 on taxable)
- Actions: Download invoice PDF · Share on WhatsApp

**Inventory**
- Table: name, on hand, reorder level, status badge
- +/- stock adjust
- Link “See in Insights”

**Customers**
- Name, phone, last purchase, days since

**GST**
- Period: This month
- Summary: taxable value, CGST, SGST, total tax
- HSN/item rollup (simplified)
- Download GST summary PDF
- Disclaimer banner (always visible)

**Insights**
- Top sellers bar/list
- Least sellers list
- Invest more / Focus more panels with stock
- Forecast strip (top 3 next-week estimate)
- Tips for your business (4–6 cards *inside demo only*): title, action, why, priority

### Sample shops (switcher)

| Type | Shop name |
|---|---|
| grocery | Corner Grocery |
| bookstore | Page & Spine |
| cloth | Main Street Garments |
| pharmacy | Ravi Medicals |
| salon | Glow & Co |
| restaurant | Spice Bench Café |
| (others) | Short sample packs / tip-only if catalogue thin |

**Motion:** section frame wipe; tab changes are instant (no page fade).

---

## 6. Features

**Background:** Paper.  
**Label:** `WHAT YOU GET`  
**Heading:** `Everything at the counter — plus a coach.`

Horizontal ruled feature list (01–07):

01 Billing & invoicing  
02 Inventory & low-stock alerts  
03 Customer book  
04 GST-ready summaries  
05 Sales analytics & forecast  
06 Personalised improvement tips  
07 WhatsApp invoice sharing  

**Motion:** index numbers fade; each row underline draws on enter.

---

## 7. GST assistance

**Background:** Counter.  
**Label:** `GST`  
**Heading:** `Prepare returns without the paper chase.`

Body: Biz Keeping builds a GST summary from your invoices so filing is faster.

**Disclaimer (required):**  
`This prototype prepares reports from sample data. It does not connect to GSTN or file returns for you.`

CTA: `Try GST in the demo` → `#demo` (GST tab)

**Motion:** disclaimer rule draws; stamp-like teal “GST READY” label (flat rect, not badge glow).

---

## 8. Business insights (marketing)

**Background:** Paper.  
**Label:** `INSIGHTS & TIPS`  
**Heading:** `Know what to stock. Know what to push.`

Three columns *as ruled panels, not cards*:
1. **Selling most / least** — example: “Class 10 Maths Textbook” top at Page & Spine  
2. **Invest / focus** — “Restock festival kurtas; clear last-season shirts”  
3. **Tips for your trade** — bookstore exam-season tip vs cloth festival tip vs grocery weekend staples  

CTA: `Open Insights in demo`

---

## 9. Pricing

**Background:** Counter ink, Paper text.  
**Label:** `PRICING`  
**Heading:** `Simple monthly plans.`

Three tiers as bordered flat panels (allowed here as interactive choice containers):

| Starter ₹500 | Growth ₹1,000 | Business ₹2,000 |
|---|---|---|
| Billing + inventory | + GST reports + WhatsApp | + Insights, tips, forecast |

Highlight Growth with teal border (flat). CTA per tier: `Start free trial` (mock toast).

---

## 10. Final CTA

**Background:** Paper.  
**Heading:** `Ready to keep the counter clear?`  
**Sub:** Try the demo now — switch to a bookstore or cloth shop and see tips change.  
**CTA:** `Try the live demo`

---

## 11. Footer

Shop teal band or Counter. Links to anchors.  
`© Biz Keeping — college prototype. Not affiliated with GSTN.`

---

## Animation summary

| Moment | Technique |
|---|---|
| Smooth scroll | Lenis |
| Section enter | clip-path / ruled line / stagger |
| Hero load | sequenced clip reveals |
| Demo tabs | instant state |
| Reduced motion | disable Lenis + reveals |

---

## Viva demo script (3 minutes)

1. Hero → scroll Who it’s for → click **Bookstore**  
2. Demo: bill a book → Download PDF → Share WhatsApp  
3. GST tab → Download summary → read disclaimer  
4. Insights → top seller, invest tip, personalised tip **why**  
5. Switch to **Cloth** → show tips/catalogue change  
6. Pricing glance  
