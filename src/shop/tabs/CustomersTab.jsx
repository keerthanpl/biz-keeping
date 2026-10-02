import { useState } from 'react'
import { useShop } from '../ShopContext.jsx'

export default function CustomersTab() {
  const { shop, saveCustomer } = useShop()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [editing, setEditing] = useState(null)

  const submit = async (event) => {
    event.preventDefault()
    try {
      await saveCustomer(editing, { name, phone })
      setName('')
      setPhone('')
      setEditing(null)
    } catch {
      /* toast */
    }
  }

  return (
    <div className="stack">
      <form className="form-grid" onSubmit={submit}>
        <div>
          <label className="field-label" htmlFor="cust-name">{editing ? 'Edit customer' : 'Add customer'}</label>
          <input id="cust-name" className="field" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label className="field-label" htmlFor="cust-phone">Phone</label>
          <input id="cust-phone" className="field" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="row-actions" style={{ alignSelf: 'end' }}>
          <button className="btn btn--primary btn--small" type="submit">{editing ? 'Save' : 'Add'}</button>
        </div>
      </form>
      <table className="demo-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Last purchase</th>
            <th>Days since</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {shop.customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td className="mono">{customer.phone}</td>
              <td>{customer.lastPurchase || '—'}</td>
              <td className="mono">{customer.lastPurchase ? customer.daysSince : '—'}</td>
              <td>
                <button
                  type="button"
                  className="btn btn--small btn--ghost"
                  onClick={() => {
                    setEditing(customer.id)
                    setName(customer.name)
                    setPhone(customer.phone)
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
