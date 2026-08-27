import SectionLabel from '../components/SectionLabel.jsx'

export default function Problem() {
  return (
    <section className="section section--ink" id="problem">
      <div className="container" data-reveal>
        <SectionLabel>The daily mess</SectionLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: 'var(--paper)' }}>
          Notebooks don’t tell you what to restock.
        </h2>
        <hr className="rule" data-rule />
        <ol className="problem-list">
          <li>
            <span className="idx">01</span>
            <div>
              <strong style={{ color: 'var(--paper)' }}>Guesswork sales</strong>
              <p>Best and worst sellers live in someone’s head.</p>
            </div>
          </li>
          <li>
            <span className="idx">02</span>
            <div>
              <strong style={{ color: 'var(--paper)' }}>GST scramble</strong>
              <p>Invoices scattered when returns are due.</p>
            </div>
          </li>
          <li>
            <span className="idx">03</span>
            <div>
              <strong style={{ color: 'var(--paper)' }}>Generic advice</strong>
              <p>Internet tips don’t know your stock or trade.</p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  )
}
