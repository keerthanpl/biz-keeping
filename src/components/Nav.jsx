import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const LINKS = [
  { href: '#problem', label: 'Problem', section: true },
  { href: '#who', label: "Who it's for", section: true },
  { href: '#demo', label: 'Demo', section: true },
  { href: '#gst', label: 'GST', section: true },
  { href: '#insights', label: 'Insights', section: true },
  { href: '/pricing', label: 'Pricing', section: false },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, shop, logout } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const hrefFor = (link) => {
    if (!link.section) return link.href
    return pathname === '/' ? link.href : `/${link.href}`
  }

  const desk = user?.role === 'admin'
    ? { to: '/admin', label: 'Admin' }
    : shop
      ? { to: '/app', label: shop.name }
      : user
        ? { to: '/setup', label: 'Set up shop' }
        : null

  const onLogout = async () => {
    setOpen(false)
    navigate('/', { replace: true })
    await logout()
  }

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="nav__inner">
        <Link className="nav__brand" to="/">Biz Keeping</Link>
        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((link) => (
            link.section
              ? <a key={link.href} href={hrefFor(link)}>{link.label}</a>
              : <Link key={link.href} to={link.href}>{link.label}</Link>
          ))}
        </nav>
        <div className="nav__actions">
          {desk ? <Link className="nav__shop" to={desk.to}>{desk.label}</Link> : null}
          {user ? (
            <button type="button" className="btn btn--ghost btn--small" onClick={onLogout}>Log out</button>
          ) : (
            <Link className="btn btn--primary btn--small" to="/login">Log in</Link>
          )}
        </div>
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
        {LINKS.map((link) => (
          link.section
            ? <a key={link.href} href={hrefFor(link)} onClick={() => setOpen(false)}>{link.label}</a>
            : <Link key={link.href} to={link.href} onClick={() => setOpen(false)}>{link.label}</Link>
        ))}
        {desk ? <Link to={desk.to} onClick={() => setOpen(false)}>{desk.label}</Link> : null}
        {user ? (
          <button type="button" className="btn btn--ghost" onClick={onLogout}>Log out</button>
        ) : (
          <Link className="btn btn--primary" to="/login" onClick={() => setOpen(false)}>Log in</Link>
        )}
      </div>
    </header>
  )
}
