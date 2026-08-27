import HeroArt from '../components/HeroArt.jsx'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div data-reveal>
          <span className="label">For Indian small businesses</span>
          <h1>Keeping the counter clear.</h1>
          <p className="strong" style={{ fontSize: '1.05rem', maxWidth: '34ch' }}>
            Billing, inventory, GST-ready reports, and personalised tips, built for grocery stores,
            bookstores, cloth shops, and everyday trades.
          </p>
          <div className="cta-row" style={{ marginTop: '1.5rem' }}>
            <a className="btn btn--primary" href="#demo">Try the live demo</a>
            <a className="btn btn--ghost" href="#gst">How GST assist works</a>
          </div>
        </div>
        <div data-reveal>
          <HeroArt />
        </div>
      </div>
    </section>
  )
}
