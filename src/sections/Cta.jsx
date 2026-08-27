export default function Cta() {
  return (
    <section className="section">
      <div className="container" data-reveal>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>Ready to keep the counter clear?</h2>
        <p className="strong">Try the demo now. Switch to a bookstore or cloth shop and see tips change.</p>
        <div className="cta-row" style={{ marginTop: '1.25rem' }}>
          <a className="btn btn--primary" href="#demo">Try the live demo</a>
        </div>
      </div>
    </section>
  )
}
