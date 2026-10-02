import { useShop } from './ShopContext.jsx'
import Bizi from './Bizi.jsx'
import DashboardTab from './tabs/DashboardTab.jsx'
import BillingTab from './tabs/BillingTab.jsx'
import InventoryTab from './tabs/InventoryTab.jsx'
import CustomersTab from './tabs/CustomersTab.jsx'
import GstTab from './tabs/GstTab.jsx'
import InsightsTab from './tabs/InsightsTab.jsx'
import ReportTab from './tabs/ReportTab.jsx'
import SettingsTab from './tabs/SettingsTab.jsx'

const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'billing', label: 'Billing' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'customers', label: 'Customers' },
  { id: 'gst', label: 'GST' },
  { id: 'insights', label: 'Insights' },
  { id: 'report', label: 'Monthly report' },
  { id: 'settings', label: 'Shop settings' },
]

export default function ShopShell() {
  const { shop, ready, error, tab, setTab, toast, dismissAlert } = useShop()

  if (!ready) return <p>Loading your shop…</p>
  if (!shop) return <p className="form-error">{error || 'This account has no shop yet.'}</p>

  let body = null
  if (tab === 'dashboard') body = <DashboardTab />
  else if (tab === 'billing') body = <BillingTab />
  else if (tab === 'inventory') body = <InventoryTab />
  else if (tab === 'customers') body = <CustomersTab />
  else if (tab === 'gst') body = <GstTab />
  else if (tab === 'insights') body = <InsightsTab />
  else if (tab === 'report') body = <ReportTab />
  else body = <SettingsTab />

  return (
    <>
      {shop.alerts.length > 0 && (
        <div className="alert-strip" role="status">
          <strong>Low stock. </strong>
          {shop.alerts.map((alert) => (
            <span key={alert.id}>
              {alert.message}{' '}
              <button type="button" className="text-btn" onClick={() => dismissAlert(alert.id)}>Dismiss</button>
            </span>
          ))}
        </div>
      )}
      <div className="demo-shell demo-shell--app">
        <div className="demo-toolbar">
          <div>
            <div className="demo-toolbar__shop">{shop.name}</div>
            <div className="demo-toolbar__sub">{shop.city} · {shop.type}{shop.gstin ? ` · ${shop.gstin}` : ''}</div>
          </div>
        </div>
        <div className="demo-tabs" role="tablist" aria-label="Shop sections">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="demo-body" role="tabpanel">{body}</div>
      </div>
      {toast ? <div className="toast" role="status">{toast}</div> : null}
      <Bizi />
    </>
  )
}
