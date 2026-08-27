import { VERTICALS } from '../data/verticals.js'
import { useDemo } from '../context/DemoContext.jsx'
import DashboardTab from './tabs/DashboardTab.jsx'
import BillingTab from './tabs/BillingTab.jsx'
import InventoryTab from './tabs/InventoryTab.jsx'
import CustomersTab from './tabs/CustomersTab.jsx'
import GstTab from './tabs/GstTab.jsx'
import InsightsTab from './tabs/InsightsTab.jsx'

const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'billing', label: 'Billing' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'customers', label: 'Customers' },
  { id: 'gst', label: 'GST' },
  { id: 'insights', label: 'Insights' },
]

export default function DemoShell() {
  const { shop, shopType, setShopType, tab, setTab, resetDemo, toast } = useDemo()

  let body = null
  if (tab === 'dashboard') body = <DashboardTab />
  else if (tab === 'billing') body = <BillingTab />
  else if (tab === 'inventory') body = <InventoryTab />
  else if (tab === 'customers') body = <CustomersTab />
  else if (tab === 'gst') body = <GstTab />
  else body = <InsightsTab />

  return (
    <>
      <div className="demo-shell">
        <div className="demo-toolbar">
          <div>
            <div className="demo-toolbar__shop">{shop.name}</div>
            <div className="demo-toolbar__sub">{shop.city} · {shop.type}</div>
          </div>
          <div className="demo-toolbar__meta">
            <label>
              <span className="visually-hidden">Shop type</span>
              <select
                value={shopType}
                onChange={(e) => setShopType(e.target.value)}
                aria-label="Shop type"
              >
                {VERTICALS.map((v) => (
                  <option key={v.id} value={v.id}>{v.label}</option>
                ))}
              </select>
            </label>
            <button type="button" className="btn btn--small btn--ghost" onClick={resetDemo}>Reset demo</button>
          </div>
        </div>
        <div className="demo-tabs" role="tablist" aria-label="Demo sections">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="demo-body" role="tabpanel">{body}</div>
      </div>
      {toast ? <div className="toast" role="status">{toast}</div> : null}
    </>
  )
}
