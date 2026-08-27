# Biz Keeping — Design Language

## Direction

**Retro Register** — late-1970s / early-1980s shop counter: carbon-copy invoices, rubber stamps, raised bevel buttons, ledger rules. The whole site (marketing + demo) uses this theme.

English only in all copy. No Hindi or regional labels.

## Anti-patterns (do not use)

- Purple / indigo AI gradients
- Glassmorphism, glow orbs, neon CRT “hacker” green
- Vaporwave / chrome 3D
- Soft multi-layer SaaS shadows
- Cream + terracotta + serif cluster as a generic AI look
- Floating glass cards in the hero

## Colour palette

| Role | Name | Hex | Usage |
|---|---|---|---|
| Page ground | Aged paper | `#EFE2C6` | Default backgrounds |
| Alt band | Formica tan | `#D9C7A3` | Alternating sections |
| Primary text | Carbon black | `#1A1510` | Headlines, body |
| Secondary text | Faded carbon | `#5E5346` | Supporting copy |
| Borders | Ledger brown | `#8A7355` | Rules, tables, frames |
| Primary action | Stamp red | `#B83220` | Primary CTAs, active states |
| Secondary / GST | Ledger green | `#2F5D50` | Paid / GST / secondary actions |
| Warning | Amber flag | `#A65B1F` | Low stock |
| Demo surface | Ticket white | `#F7F0DE` | Inside demo only |
| Dark band | Register body | `#2A241C` | Problem / pricing bands |
| Bevel light | `#F6ECD4` | Raised button highlight edge |
| Bevel dark | `#6E5A42` | Raised button shadow edge |

No gradient fills. Bevels are **solid border colours** only.

## Typography

| Role | Family | Notes |
|---|---|---|
| Display / brand | **Special Elite** | Typewriter wordmark + section titles |
| UI / body | **IBM Plex Sans** | Nav, body, controls |
| Numbers / money | **Share Tech Mono** (fallback IBM Plex Mono) | Register-tape totals |

## UI chrome

- Raised bevel buttons (press-in on `:active`)
- Inset / groove demo bezel (vintage POS)
- Double ledger rules under titles
- Rubber-stamp flat labels (GST READY) — slight rotate, stamp red
- Optional light paper grain (CSS/SVG noise at low opacity)
- Nav: thick bottom rule; active = stamp underline

## Signature element

The interactive demo framed as a **vintage register / POS bezel** — product proof, not a modern SaaS card.

## Motion

- Lenis + GSAP ScrollTrigger
- Stamp / wipe / rule-draw reveals
- Demo: instant tabs; buttons push in ≤150ms
- Honor `prefers-reduced-motion`


## Copy voice

- English only.
- Do not use em dashes (—). Prefer commas, periods, or colons.
