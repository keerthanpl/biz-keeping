# Biz Keeping

Biz Keeping is a single-page web prototype for a business management suite aimed at small shops in India. It combines a marketing landing page with an embedded interactive product demo covering billing, inventory, customers, GST-ready summaries, sales insights, and personalised improvement tips.

---

## Run locally

### Requirements

- **Node.js** 18 or newer (recommended: current LTS)
- **npm** 9 or newer (ships with Node)

### Steps

```bash
# 1. Open the project folder
cd /path/to/keer-proj

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Vite prints a local URL (usually `http://localhost:5173/`). Open that address in your browser.

### Other commands

```bash
# Production build (output in dist/)
npm run build

# Preview the production build locally
npm run preview

# Lint source files
npm run lint
```

`npm run preview` typically serves at `http://localhost:4173/` after a successful build.

---

## What this project is

| Aspect | Detail |
|---|---|
| Product name | Biz Keeping |
| Page type | Single-page application (one URL, section anchors) |
| Audience | Grocery, bookstore, cloth, pharmacy, salon, restaurant, garage, and other small retail / service trades |
| Language | English only |
| Backend | None (fully client-side) |
| Purpose | Working front-end prototype for presentation and evaluation |

The product story: help shop owners run the counter (billing, stock, customers), prepare GST summaries from sales data, analyse what sells, and receive trade-specific tips. Subscription pricing shown on the page is illustrative (₹500 / ₹1,000 / ₹2,000 per month).

**Important GST note:** The prototype prepares sample GST summaries and PDF exports from demo data. It does **not** connect to GSTN and does **not** file returns.

---

## Tech stack

| Layer | Choice | Role |
|---|---|---|
| UI library | React 19 | Component UI and interactive demo state |
| Bundler / dev server | Vite 8 | Fast HMR, ES modules, production build |
| Language | JavaScript (JSX) | Application code |
| Styling | Plain CSS + CSS custom properties | Theme tokens, layout, demo chrome |
| Smooth scroll | Lenis | Page scroll feel |
| Scroll animation | GSAP + ScrollTrigger | Section reveals and rule draws |
| Charts | Recharts | Insights bar chart in the demo |
| PDF export | jsPDF | Invoice and GST summary downloads |
| Fonts | Google Fonts | Special Elite, IBM Plex Sans, Share Tech Mono / IBM Plex Mono |
| Lint | Oxlint | `npm run lint` |

There is no React Router. Navigation uses in-page hash links (`#demo`, `#gst`, `#pricing`, etc.).

---

## Project structure

```text
keer-proj/
├── docs/                      # Product and design documentation
│   ├── GOAL.md
│   ├── DESIGN_LANGUAGE.md
│   ├── UI_UX.md
│   └── WEBSITE_PLAN.md
├── public/                    # Static public assets (Vite)
├── src/
│   ├── main.jsx               # React entry, global CSS imports
│   ├── App.jsx                # Page composition + providers
│   ├── components/            # Shared UI (Nav, HeroArt, labels)
│   ├── sections/              # Marketing page sections
│   ├── demo/                  # Interactive product shell
│   │   ├── DemoShell.jsx
│   │   ├── billing.js
│   │   ├── insights.js
│   │   ├── tips.js
│   │   ├── pdf.js
│   │   └── tabs/              # Dashboard, Billing, Inventory, ...
│   ├── data/
│   │   ├── sampleShop.js      # Sample catalogues per shop type
│   │   └── verticals.js       # Trade list + tip playbooks
│   ├── context/
│   │   └── DemoContext.jsx    # Shared demo state
│   ├── hooks/                 # Lenis, reduced motion, scroll reveal
│   └── styles/
│       ├── variables.css      # Design tokens
│       ├── global.css
│       ├── sections.css
│       └── demo.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Page architecture

The app is one long page. `App.jsx` wraps everything in `DemoProvider` and renders:

1. **Nav** (sticky)
2. **Hero** (brand, CTA, custom SVG art)
3. **Problem**
4. **Who it’s for** (trade switcher buttons)
5. **Demo** (interactive shell)
6. **Features**
7. **GST**
8. **Insights** (marketing copy)
9. **Pricing**
10. **CTA**
11. **Footer**

Smooth scrolling is enabled via `useLenis`. Scroll-triggered reveals use `useScrollReveal` (GSAP). Both respect `prefers-reduced-motion`.

---

## Interactive demo (technical)

### Shell

`DemoShell.jsx` provides:

- Shop name and city from sample data
- **Shop-type `<select>`** to switch verticals
- **Reset demo** to reload the current vertical’s sample data
- Tabs: Dashboard, Billing, Inventory, Customers, GST, Insights

### State (`DemoContext.jsx`)

Central React context holds:

| State | Purpose |
|---|---|
| `shopType` | Active vertical id (`grocery`, `bookstore`, `cloth`, …) |
| `shop` | Cloned catalogue, stock, customers, today’s sales |
| `tab` | Active demo tab |
| `cart` | Billing line items |
| `toast` | Short status messages |

Actions include `setShopType`, `addToCart`, `adjustStock`, `completeSale`, `resetDemo`, and PDF/WhatsApp helpers invoked from tabs.

Switching shop type deep-clones a fresh sample shop from `sampleShop.js` and clears the cart.

### Billing math (`demo/billing.js`)

- Line taxable = unit price × quantity  
- Tax = taxable × `gstRate` / 100  
- CGST and SGST each take half of that tax  
- Cart totals sum taxable, CGST, SGST, and grand total  

### Insights engine (`demo/insights.js`)

Rule-based scoring from units sold and stock levels:

- Rank top sellers (units and revenue)
- Rank least sellers
- **Invest more** when sell velocity is high and stock is low
- **Focus more** for slow movers with heavy stock, or urgent restocks
- Approximate **days of cover** and a simple **next-week forecast** for top SKUs  

Outputs update when the user records a sale or adjusts inventory.

### Tips engine (`demo/tips.js`)

Builds 4–6 tips with `{ title, action, why, priority }` from:

- Current insights (top seller, slow mover, invest target)
- Lapsed customers (28+ days since purchase)
- GST habit tip
- Trade playbook lines from `verticals.js` (changes with shop type)

### PDF (`demo/pdf.js`)

Client-side generation with jsPDF:

- Tax invoice PDF from the current cart  
- GST summary PDF from the month rollup of sample sales  

### WhatsApp share

Billing opens `https://wa.me/?text=...` with a prefilled invoice message. No WhatsApp Business API is used.

### Sample data

`sampleShop.js` defines catalogues for each vertical (products with price, stock, reorder level, units sold, GST rate; plus customers). Default vertical: **grocery** (`Corner Grocery`). Bookstores, cloth shops, pharmacies, and other trades are fully switchable in the demo.

---

## Design system (technical)

Theme: **Retro Register** (documented in `docs/DESIGN_LANGUAGE.md`).

### Tokens (`styles/variables.css`)

Examples:

- Aged paper / formica backgrounds  
- Stamp red primary actions (`--stamp`)  
- Ledger green secondary / GST accent (`--teal`)  
- Bevel light/dark borders for raised controls  

### Typography

| Role | Font |
|---|---|
| Display / brand | Special Elite |
| Body / UI | IBM Plex Sans |
| Numbers / tape | Share Tech Mono (fallback IBM Plex Mono) |

Fonts load from Google Fonts in `index.html`.

### CSS organisation

- `global.css`: reset-ish base, buttons, sections, reduced-motion-friendly defaults  
- `sections.css`: nav, hero, marketing layouts, hero SVG legend  
- `demo.css`: POS-style demo bezel, tables, tips, toasts  

No Tailwind. No CSS-in-JS. Buttons use solid fills and border bevels (no gradient fills).

### Hero art

`HeroArt.jsx` is a custom SVG scene (register, invoice, stock crates, GST stamp, sales bars, share cue) using CSS variables so it follows the theme.

---

## Accessibility and motion

- `:focus-visible` outlines on interactive controls  
- Demo tabs use `role="tab"` / `aria-selected`  
- Status toasts use `role="status"`  
- `useReducedMotion` disables Lenis and GSAP reveals when the user prefers reduced motion  
- Hero SVG loops are gated with `prefers-reduced-motion: no-preference`  

---

## Scripts reference

| Script | Command | Description |
|---|---|---|
| Development | `npm run dev` | Vite dev server with HMR |
| Build | `npm run build` | Output static assets to `dist/` |
| Preview | `npm run preview` | Serve `dist/` locally |
| Lint | `npm run lint` | Oxlint over the project |

---

## Browser support

Target modern evergreen browsers (latest Chrome, Firefox, Safari, Edge). ES modules and CSS custom properties are required. The production build is static files under `dist/` and can be hosted on any static host (Nginx, Netlify, Vercel, GitHub Pages, etc.).

---

## Prototype limits

- No authentication, database, or multi-tenant API  
- No real payments or subscription billing  
- No GSTN / government filing integration  
- Insights and tips are deterministic heuristics, not a hosted ML service  
- WhatsApp share is a client-side deep link only  
- Sample shops are fictional demo data  

---

## Documentation map

| File | Contents |
|---|---|
| [docs/GOAL.md](docs/GOAL.md) | Problem, audience, scope, success criteria |
| [docs/DESIGN_LANGUAGE.md](docs/DESIGN_LANGUAGE.md) | Palette, type, chrome, copy rules |
| [docs/UI_UX.md](docs/UI_UX.md) | Information architecture and demo flows |
| [docs/WEBSITE_PLAN.md](docs/WEBSITE_PLAN.md) | Section-by-section build brief |

---

## Suggested demo path (for presentations)

1. Open the site and scroll to **Live demo**.  
2. Create an invoice in **Billing**, download the PDF, optionally share via WhatsApp.  
3. Open **GST**, read the disclaimer, download the GST summary PDF.  
4. Open **Insights** for top/least sellers, invest/focus advice, and tips.  
5. Switch shop type to **Bookstore** or **Cloth** and show tips/catalogue change.  
6. Glance at **Pricing**.  

---

## License / attribution

College / academic prototype. Product name: Biz Keeping. Not affiliated with GSTN or any government tax portal.
