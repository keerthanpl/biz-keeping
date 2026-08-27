import SectionLabel from '../components/SectionLabel.jsx'

export default function Gst() {
  return (
    <section className="section section--counter" id="gst">
      <div className="container" data-reveal>
        <SectionLabel>GST</SectionLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>Prepare returns without the paper chase.</h2>
        <p className="strong" style={{ maxWidth: '48ch' }}>
          Biz Keeping builds a GST summary from your invoices so filing is faster.
        </p>
        <span className="gst-stamp">GST ready</span>
        <div className="disclaimer">
          This prototype prepares reports from sample data. It does not connect to GSTN or file returns for you.
        </div>
        <div className="cta-row" style={{ marginTop: '1.25rem' }}>
          <a className="btn btn--primary" href="#demo">Try GST in the demo</a>
        </div>
      </div>
    </section>
  )
}
