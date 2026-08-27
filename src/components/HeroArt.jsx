/** Flat SVG scene for Biz Keeping hero: register, invoice, stock, GST, chart */
export default function HeroArt() {
  return (
    <div className="hero-art" role="img" aria-label="Illustration of a shop register, invoice, stock boxes, GST stamp, and sales chart">
      <svg viewBox="0 0 520 420" xmlns="http://www.w3.org/2000/svg" className="hero-art__svg">
        <defs>
          <pattern id="heroGrain" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.6" fill="var(--ink)" opacity="0.06" />
          </pattern>
        </defs>

        {/* desk */}
        <rect x="24" y="300" width="472" height="88" fill="var(--counter)" stroke="var(--rule)" strokeWidth="2" />
        <rect x="24" y="300" width="472" height="10" fill="var(--rule)" opacity="0.35" />
        <rect x="24" y="300" width="472" height="88" fill="url(#heroGrain)" />

        {/* cash register */}
        <g className="hero-art__register">
          <rect x="48" y="168" width="150" height="132" rx="4" fill="var(--counter-ink)" stroke="var(--ink)" strokeWidth="2" />
          <rect x="60" y="182" width="126" height="48" fill="var(--panel)" stroke="var(--rule)" strokeWidth="1.5" />
          <text x="72" y="204" fill="var(--teal)" fontFamily="var(--font-mono)" fontSize="14">Rs 1,845</text>
          <text x="72" y="222" fill="var(--muted)" fontFamily="var(--font-mono)" fontSize="10">TODAY</text>
          {/* keys */}
          <g fill="var(--panel)" stroke="var(--rule)" strokeWidth="1">
            <rect x="64" y="244" width="28" height="18" rx="2" />
            <rect x="98" y="244" width="28" height="18" rx="2" />
            <rect x="132" y="244" width="28" height="18" rx="2" />
            <rect x="64" y="268" width="28" height="18" rx="2" />
            <rect x="98" y="268" width="28" height="18" rx="2" />
            <rect x="132" y="268" width="28" height="18" rx="2" />
          </g>
          {/* receipt coming out */}
          <g className="hero-art__receipt">
            <rect x="168" y="120" width="72" height="110" fill="var(--panel)" stroke="var(--ink)" strokeWidth="1.5" />
            <line x1="178" y1="138" x2="228" y2="138" stroke="var(--rule)" strokeWidth="2" />
            <line x1="178" y1="152" x2="220" y2="152" stroke="var(--rule)" strokeWidth="1.5" />
            <line x1="178" y1="164" x2="224" y2="164" stroke="var(--rule)" strokeWidth="1.5" />
            <line x1="178" y1="176" x2="212" y2="176" stroke="var(--rule)" strokeWidth="1.5" />
            <line x1="178" y1="188" x2="226" y2="188" stroke="var(--rule)" strokeWidth="1.5" />
            <text x="178" y="212" fill="var(--ink)" fontFamily="var(--font-mono)" fontSize="9">INVOICE</text>
            <text x="178" y="224" fill="var(--teal)" fontFamily="var(--font-mono)" fontSize="9">PAID</text>
          </g>
        </g>

        {/* stock crates */}
        <g className="hero-art__stock">
          <rect x="230" y="236" width="78" height="64" fill="var(--panel)" stroke="var(--ink)" strokeWidth="2" />
          <rect x="238" y="246" width="62" height="8" fill="var(--rule)" />
          <rect x="238" y="260" width="48" height="6" fill="var(--rule)" opacity="0.7" />
          <text x="242" y="286" fill="var(--muted)" fontFamily="var(--font-sans)" fontSize="10">STOCK</text>

          <rect x="262" y="210" width="78" height="64" fill="var(--counter)" stroke="var(--ink)" strokeWidth="2" />
          <rect x="270" y="220" width="62" height="8" fill="var(--rule)" />
          <rect x="270" y="234" width="40" height="6" fill="var(--rust)" opacity="0.85" />
          <text x="274" y="260" fill="var(--rust)" fontFamily="var(--font-sans)" fontSize="10">LOW</text>
        </g>

        {/* clipboard / sales chart */}
        <g className="hero-art__chart">
          <rect x="360" y="150" width="124" height="150" rx="3" fill="var(--panel)" stroke="var(--ink)" strokeWidth="2" />
          <rect x="400" y="140" width="44" height="16" rx="2" fill="var(--counter)" stroke="var(--rule)" strokeWidth="1.5" />
          <text x="372" y="178" fill="var(--ink)" fontFamily="var(--font-sans)" fontSize="11" fontWeight="600">Sales</text>
          {/* bars */}
          <rect className="hero-art__bar" x="378" y="250" width="18" height="30" fill="var(--teal)" />
          <rect className="hero-art__bar hero-art__bar--2" x="404" y="230" width="18" height="50" fill="var(--teal)" />
          <rect className="hero-art__bar hero-art__bar--3" x="430" y="210" width="18" height="70" fill="var(--teal)" />
          <rect className="hero-art__bar hero-art__bar--4" x="456" y="238" width="18" height="42" fill="var(--counter-ink)" opacity="0.75" />
          <line x1="372" y1="282" x2="478" y2="282" stroke="var(--rule)" strokeWidth="1.5" />
        </g>

        {/* GST stamp */}
        <g transform="translate(300 95) rotate(-12)">
          <g className="hero-art__stamp">
            <rect x="0" y="0" width="100" height="36" fill="none" stroke="var(--teal)" strokeWidth="2.5" rx="2" />
            <rect x="4" y="4" width="92" height="28" fill="none" stroke="var(--teal)" strokeWidth="1" rx="1" opacity="0.5" />
            <text x="50" y="24" textAnchor="middle" fill="var(--teal)" fontFamily="var(--font-mono)" fontSize="12" fontWeight="600" letterSpacing="0.08em">GST READY</text>
          </g>
        </g>

        {/* tip card */}
        <g className="hero-art__tip">
          <rect x="48" y="88" width="130" height="52" fill="var(--panel)" stroke="var(--ink)" strokeWidth="1.5" />
          <text x="60" y="108" fill="var(--muted)" fontFamily="var(--font-sans)" fontSize="9" letterSpacing="0.06em">TIP</text>
          <text x="60" y="126" fill="var(--ink)" fontFamily="var(--font-sans)" fontSize="11">Restock top seller</text>
        </g>

        {/* share / WhatsApp cue: simple chat bubble */}
        <g className="hero-art__share" transform="translate(420 88)">
          <path d="M8 8 h56 a8 8 0 0 1 8 8 v28 a8 8 0 0 1 -8 8 h-36 l-12 12 v-12 h-8 a8 8 0 0 1 -8 -8 v-28 a8 8 0 0 1 8 -8 z"
            fill="var(--panel)" stroke="var(--teal)" strokeWidth="2" />
          <text x="20" y="36" fill="var(--teal)" fontFamily="var(--font-mono)" fontSize="10">SHARE</text>
        </g>
      </svg>

      <ul className="hero-art__legend">
        <li>Billing</li>
        <li>Inventory</li>
        <li>GST</li>
        <li>Insights</li>
      </ul>
    </div>
  )
}
