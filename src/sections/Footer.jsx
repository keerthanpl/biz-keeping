import { Link, useLocation } from 'react-router-dom'

export default function Footer() {
  const { pathname } = useLocation()
  const section = (hash) => (pathname === '/' ? hash : `/${hash}`)

  return (
    <footer className="footer">
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between' }}>
        <span>© Biz Keeping, college prototype. Not affiliated with GSTN.</span>
        <span>
          <a href={section('#demo')}>Demo</a> · <Link to="/pricing">Pricing</Link> · <a href={section('#gst')}>GST</a>
        </span>
      </div>
    </footer>
  )
}
