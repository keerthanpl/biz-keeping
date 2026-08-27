# Biz Keeping — UI / UX

## Page job

One job for the landing page: **make a shop owner (or evaluator) believe Biz Keeping can run the counter and coach the business** — then let them prove it in the embedded demo.

Primary action: **Try the demo**  
Secondary action: **See pricing** / mock trial CTA

## Information architecture

1. Sticky nav  
2. Hero  
3. Problem  
4. Who it’s for (verticals)  
5. Interactive demo (core)  
6. Features  
7. GST assistance  
8. Business insights (marketing proof)  
9. Pricing  
10. Final CTA  
11. Footer  

Single URL. Section anchors: `#demo`, `#features`, `#gst`, `#insights`, `#pricing`.

## Hero rules

First viewport contains only:

- Brand: **Biz Keeping**
- One headline
- One supporting sentence
- One CTA group (Try demo / See how GST works)
- One dominant visual: demo peek / counter ledger frame  

No stats strip, no feature pills, no pricing in hero.

## Section jobs

| Section | One job |
|---|---|
| Problem | Name notebook chaos, GST fear, unknown bestsellers |
| Who it’s for | Show breadth of trades in a scannable strip |
| Demo | Let them *use* billing, stock, GST, insights, tips |
| Features | Map pitch features to what they just touched |
| GST | Promise “prepare reports” + honest disclaimer |
| Insights | Show analysis + personalised tips story |
| Pricing | Three clear tiers |
| CTA | One clear next step |

## Interactive demo UX

### Chrome

- App bar: shop name + **shop-type switcher** + Reset demo  
- Tabs: Dashboard · Billing · Inventory · Customers · GST · Insights  
- Desktop: side or top tabs inside a framed panel  
- Mobile: horizontal scroll tabs; demo remains usable, not identical to desktop density  

### Key flows

**Billing → share**
1. Add sample lines → see CGST/SGST  
2. Generate invoice preview  
3. Share on WhatsApp (opens `wa.me` with prefilled text) and/or Download PDF  

**GST**
1. Period = This month (sample)  
2. Taxable summary table  
3. Download GST summary PDF  
4. Visible disclaimer: does not file on GSTN  

**Insights + tips**
1. See top sellers / least sellers  
2. Invest more / focus lists with stock qty  
3. Tips panel: title, action, **why**  
4. Change shop type → tips + catalogue change  
5. Sell or adjust stock → rankings/tips update  

### Feedback

- Toast for PDF download / WhatsApp open / reset  
- Low stock = rust badge; overstock = muted badge  
- Empty cart state: “Add an item to bill”  

## Accessibility

- Visible `:focus-visible` rings (teal)
- Tabs are real buttons with `aria-selected`
- Colour is not the only status signal (badges include text)
- `prefers-reduced-motion` respected
- Contrast: Ink on Paper / Panel white meets readable body contrast

## Content voice

- Plain English, owner language  
- Active verbs: “Restock”, “Bundle”, “Share invoice”  
- Never pretend government filing happened  
- Tip “why” lines always cite a concrete metric  

## Error & empty states

- No network errors in prototype (all local)  
- Reset demo restores sample shop for the current vertical  
