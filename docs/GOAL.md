# Biz Keeping — Goal & Product Brief

## One-liner

Biz Keeping helps small Indian businesses run daily sales, stock, customers, and GST-ready reports from one place — and tells the owner what is selling, what to stock more of, where to focus, and how to improve *this* shop.

## Problem

Shop owners still run on notebooks, WhatsApp chats, and memory:

- They do not know which product sells most or least.
- Stockouts and overstock happen without warning.
- GST season means digging through paper invoices.
- Advice they get online is generic — not about *their* shop.

## Goal of this prototype

Ship a **working single-page prototype** that proves the college pitch:

1. Marketing story for Biz Keeping (subscription SaaS, ₹500–₹2,000/month).
2. Embedded interactive product demo (billing, inventory, customers, GST mock, insights, tips).
3. Honest boundaries: we **prepare** GST summaries; we do **not** file on GSTN.

## Target users

Everyday Indian small businesses:

| Vertical | Examples |
|---|---|
| Grocery / general | Neighbourhood grocery |
| Restaurant & café | Small eateries |
| Pharmacy | Medical stores |
| Salon & beauty | Parlours, barbers |
| Garage | Auto workshops |
| Bookstore & stationery | Book shops, exam guides |
| Cloth / garments | Menswear, ladies, textiles |
| Electronics | Mobile & accessories |
| Hardware | Electrical / tools |
| Bakery & sweets | Local bakeries |
| Pet | Pet food & supplies |
| Optical | Eyewear shops |
| Gifts & toys | Gift stores |
| Printshop | Copy & print centres |

## Core product promises

- Billing & invoicing (CGST/SGST line totals)
- Inventory with low-stock / overstock signals
- Customer list & last purchase
- GST summary report + sample PDF download
- Business analysis:
  - Best sellers (units + revenue)
  - Least sellers / slow movers
  - Invest / restock advice
  - Focus advice (promote or clear)
  - Inventory snapshot tied to advice
  - Simple next-week forecast (rule-based)
- Personalised improvement tips for *this* shop type
- WhatsApp invoice share (mock)

## Monetization (marketing copy)

| Plan | Price | Positioning |
|---|---|---|
| Starter | ₹500/month | Billing + inventory |
| Growth | ₹1,000/month | + GST reports + WhatsApp invoices |
| Business | ₹2,000/month | + Insights, tips, forecast |

## In scope (prototype)

- Single React page (Vite)
- Interactive demo with shop-type switcher (grocery, bookstore, cloth, + others)
- Client-side PDF (invoice + GST summary)
- Rule-based insights and tips (explainable in a viva)

## Out of scope

- Real GSTN / government filing APIs
- Real payments, auth, multi-tenant backend
- Live machine-learning models
- Native mobile apps
- Multi-page marketing site

## Success criteria

- Brand **Biz Keeping** is the hero-level signal.
- Demo path: invoice → WhatsApp mock → GST PDF.
- Insights path: top/low sellers, invest/focus, inventory, tips with “why”.
- Vertical switch changes catalogue + tips (e.g. bookstore vs cloth).
- No AI-gradient / glass / glow aesthetic.
- `npm run build` succeeds; works on desktop and mobile.

## Honest language for demos

> Biz Keeping prepares GST summaries from your sales so filing is easier. This prototype does not connect to the GST portal or file returns for you.

> Tips and forecasts are AI-style coaching powered by clear rules on your sales and stock — so you always know *why* a tip appeared.
