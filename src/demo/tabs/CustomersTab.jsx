import { useDemo } from '../../context/DemoContext.jsx'

export default function CustomersTab() {
  const { shop } = useDemo()
  return (
    <table className="demo-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Last purchase</th>
          <th>Days since</th>
        </tr>
      </thead>
      <tbody>
        {shop.customers.map((c) => (
          <tr key={c.id}>
            <td>{c.name}</td>
            <td className="mono">{c.phone}</td>
            <td>{c.lastPurchase}</td>
            <td className="mono">{c.daysSince}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
