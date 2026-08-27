import SectionLabel from '../components/SectionLabel.jsx'

export default function Insights() {
  return (
    <section className="section" id="insights">
      <div className="container">
        <div data-reveal>
          <SectionLabel>Insights & tips</SectionLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>Know what to stock. Know what to push.</h2>
          <hr className="rule" data-rule />
        </div>
        <div className="insight-panels" data-reveal>
          <div className="insight-panel">
            <h3>Selling most / least</h3>
            <p>See Class 10 Maths Textbook leading at Page & Spine, and which old editions barely move.</p>
          </div>
          <div className="insight-panel">
            <h3>Invest / focus</h3>
            <p>Restock festival shirts; clear last-season shirts before they tie up cash.</p>
          </div>
          <div className="insight-panel">
            <h3>Tips for your trade</h3>
            <p>Bookstore exam-season push, cloth festival runs, grocery weekend staples: personalised to the shop type you pick.</p>
          </div>
        </div>
        <div className="cta-row" style={{ marginTop: '1.5rem' }} data-reveal>
          <a className="btn btn--primary" href="#demo">Open Insights in demo</a>
        </div>
      </div>
    </section>
  )
}
