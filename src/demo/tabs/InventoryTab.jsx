import { useDemo } from '../../context/DemoContext.jsx'
import { computeInsights } from '../insights.js'

export default function InventoryTab() {
  const { shop, adjustStock, setTab } = useDemo()
  const { products } = computeInsights(shop)

  return (
    <div>
      <table className="demo-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>On hand</th>
            <th>Reorder</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td className="mono">{p.stock}</td>
              <td className="mono">{p.reorder || '-'}</td>
              <td>
                {p.lowStock && <span className="badge badge--low">Low stock</span>}
                {p.overstock && <span className="badge badge--over">Overstocked</span>}
                {!p.lowStock && !p.overstock && <span className="badge">OK</span>}
              </td>
              <td>
                <div className="row-actions">
                  <button type="button" className="btn btn--small btn--ghost" onClick={() => adjustStock(p.id, -1)}>-</button>
                  <button type="button" className="btn btn--small btn--ghost" onClick={() => adjustStock(p.id, 1)}>+</button>
                  <button type="button" className="btn btn--small btn--ghost" onClick={() => setTab('insights')}>Insights</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
