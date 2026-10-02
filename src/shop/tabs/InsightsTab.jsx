import { useShop } from '../ShopContext.jsx'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'

export default function InsightsTab() {
  const { insights, tips } = useShop()
  const chartData = insights.topByUnits.map((product) => ({
    name: product.name.slice(0, 12),
    units: product.unitsSold,
  }))

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
            {insights.leastSellers.slice(0, 4).map((product) => (
              <li key={product.id}>{product.name}: <span className="mono">{product.unitsSold}</span> units · stock {product.stock}</li>
            ))}
          </ul>
        </div>
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
