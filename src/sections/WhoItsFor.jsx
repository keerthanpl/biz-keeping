import SectionLabel from '../components/SectionLabel.jsx'
import { VERTICALS } from '../data/verticals.js'
import { useDemo } from '../context/DemoContext.jsx'

export default function WhoItsFor() {
  const { setShopType, setTab } = useDemo()

  const pick = (id) => {
    setShopType(id)
    setTab('dashboard')
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="section" id="who">
      <div className="container">
        <div data-reveal>
          <SectionLabel>Who it’s for</SectionLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>Built for everyday Indian shops.</h2>
          <hr className="rule" data-rule />
        </div>
        <div className="verticals" data-reveal>
          {VERTICALS.map((v) => (
            <button key={v.id} type="button" className="vertical" onClick={() => pick(v.id)}>
              <span className="vertical__label">{v.label}</span>
              <span className="vertical__short">{v.short}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
