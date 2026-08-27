import SectionLabel from '../components/SectionLabel.jsx'

const ITEMS = [
  'Billing & invoicing',
  'Inventory & low-stock alerts',
  'Customer book',
  'GST-ready summaries',
  'Sales analytics & forecast',
  'Personalised improvement tips',
  'WhatsApp invoice sharing',
]

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="container" data-reveal>
        <SectionLabel>What you get</SectionLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>Everything at the counter, plus a coach.</h2>
        <hr className="rule" data-rule />
        <ol className="feature-list">
          {ITEMS.map((item, i) => (
            <li key={item}>
              <span className="idx">{String(i + 1).padStart(2, '0')}</span>
              <strong>{item}</strong>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
