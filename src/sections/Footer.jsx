export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between' }}>
        <span>© Biz Keeping, college prototype. Not affiliated with GSTN.</span>
        <span>
          <a href="#demo">Demo</a> · <a href="#pricing">Pricing</a> · <a href="#gst">GST</a>
        </span>
      </div>
    </footer>
  )
}
