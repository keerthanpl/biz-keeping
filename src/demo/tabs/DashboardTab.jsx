import { useDemo } from '../../context/DemoContext.jsx'

export default function DashboardTab() {
  const { shop, insights, tips, setTab } = useDemo()
  return (
    <div>
      <div className="demo-grid">
        <div className="demo-stat">
          <span>Today’s sales</span>
          <strong>₹{Math.round(shop.todaySales).toLocaleString('en-IN')}</strong>
        </div>
        <div className="demo-stat">
          <span>Invoices</span>
          <strong>{shop.invoiceCount}</strong>
        </div>
        <div className="demo-stat">
          <span>Low stock</span>
          <strong>{insights.lowStockCount}</strong>
        </div>
      </div>
      {insights.topSeller && (
        <p className="strong">
          Top seller today:{' '}
          <span className="mono">{insights.topSeller.name}</span> ({insights.topSeller.unitsSold} / 30d)
        </p>
      )}
      <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 15, marginTop: '1rem' }}>Focus today</h3>
      <div className="tip-list">
        {tips.slice(0, 2).map((t) => (
          <button
            key={t.id}
            type="button"
            className="tip-card"
            style={{ textAlign: 'left', cursor: 'pointer', width: '100%' }}
            onClick={() => setTab('insights')}
          >
            <h4>{t.title}</h4>
            <p>{t.action}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
