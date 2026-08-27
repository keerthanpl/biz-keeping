import SectionLabel from '../components/SectionLabel.jsx'
import DemoShell from '../demo/DemoShell.jsx'

export default function Demo() {
  return (
    <section className="section section--counter" id="demo">
      <div className="container">
        <div data-reveal>
          <SectionLabel>Live demo</SectionLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>Run the shop for a minute.</h2>
          <p>Switch trade · bill an invoice · check GST · read tips for this business.</p>
          <hr className="rule" data-rule />
        </div>
        <div data-reveal>
          <DemoShell />
        </div>
      </div>
    </section>
  )
}
