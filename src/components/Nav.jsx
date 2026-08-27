import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#problem', label: 'Problem' },
  { href: '#who', label: "Who it's for" },
  { href: '#demo', label: 'Demo' },
  { href: '#gst', label: 'GST' },
  { href: '#insights', label: 'Insights' },
  { href: '#pricing', label: 'Pricing' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="nav__inner">
        <a className="nav__brand" href="#top">Biz Keeping</a>
        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
        <a className="btn btn--primary btn--small" href="#demo">Try demo</a>
        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </div>
      <div className={`nav__mobile${open ? ' is-open' : ''}`}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
        <a className="btn btn--primary" href="#demo" onClick={() => setOpen(false)}>Try demo</a>
      </div>
    </header>
  )
}
