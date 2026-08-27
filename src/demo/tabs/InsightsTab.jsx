import { useDemo } from '../../context/DemoContext.jsx'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'

export default function InsightsTab() {
  const { insights, tips } = useDemo()
  const chartData = insights.topByUnits.map((p) => ({ name: p.name.slice(0, 12), units: p.unitsSold }))

  return (
    <div className="stack">
      <div className="two-col">
        <div>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 15 }}>Selling most</h3>
          <div style={{ width: '100%', height: 180 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid stroke="#c9c0b0" strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="units" fill="#2f5d50" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 15 }}>Selling least</h3>
          <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
            {insights.leastSellers.slice(0, 4).map((p) => (
              <li key={p.id}>{p.name}: <span className="mono">{p.unitsSold}</span> units · stock {p.stock}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="two-col">
        <div>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 15 }}>Invest more in</h3>
          {insights.investMore.map((p) => (
            <div key={p.id} className="tip-card" style={{ marginBottom: 8 }}>
              <h4>{p.name}</h4>
              <p>{p.advice}</p>
              <p className="why">On hand {p.stock} · ~{p.cover} days cover</p>
            </div>
          ))}
        </div>
        <div>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 15 }}>Focus more on</h3>
          {insights.focusMore.map((p) => (
            <div key={p.id} className="tip-card" style={{ marginBottom: 8 }}>
              <h4>{p.name}</h4>
              <p>{p.advice}</p>
              <p className="why">Sold {p.unitsSold}/mo · stock {p.stock}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 15 }}>Next-week forecast (top 3)</h3>
        <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
          {insights.forecast.map((f) => (
            <li key={f.id}>{f.name}: ~<span className="mono">{f.nextWeek}</span> units</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 15 }}>Tips for your business</h3>
        <div className="tip-list">
          {tips.map((tip) => (
            <div key={tip.id} className="tip-card">
              <h4>{tip.title}</h4>
              <p>{tip.action}</p>
              <p className="why">Why: {tip.why}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
