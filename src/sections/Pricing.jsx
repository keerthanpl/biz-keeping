import { useState } from 'react'
import SectionLabel from '../components/SectionLabel.jsx'

const TIERS = [
  { name: 'Starter', price: '₹500', features: ['Billing + inventory', 'Customer book'], featured: false },
  { name: 'Growth', price: '₹1,000', features: ['Everything in Starter', 'GST reports', 'WhatsApp invoices'], featured: true },
  { name: 'Business', price: '₹2,000', features: ['Everything in Growth', 'Insights & forecast', 'Personalised tips'], featured: false },
]

export default function Pricing() {
  const [msg, setMsg] = useState('')
  return (
    <section className="section section--ink" id="pricing">
      <div className="container">
        <div data-reveal>
          <SectionLabel>Pricing</SectionLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: 'var(--paper)' }}>Simple monthly plans.</h2>
          <hr className="rule" data-rule />
        </div>
        <div className="pricing-grid" data-reveal>
          {TIERS.map((t) => (
            <div key={t.name} className={`price-tier${t.featured ? ' price-tier--featured' : ''}`}>
              <h3>{t.name}</h3>
              <div className="amount">{t.price}<span style={{ fontSize: 14 }}>/mo</span></div>
              <ul>
                {t.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <button
                type="button"
                className="btn btn--primary btn--small"
                onClick={() => {
                  setMsg(`Trial for ${t.name} (mock)`)
                  window.setTimeout(() => setMsg(''), 2500)
                }}
              >
                Start free trial
              </button>
            </div>
          ))}
        </div>
        {msg ? <p style={{ marginTop: '1rem', color: 'var(--paper)' }}>{msg}</p> : null}
      </div>
    </section>
  )
}
