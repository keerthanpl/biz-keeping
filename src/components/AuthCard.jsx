import Nav from './Nav.jsx'

export default function AuthCard({ title, lede, children, wide = false }) {
  return (
    <>
      <Nav />
      <main className="app-page">
        <div className={`auth-card${wide ? ' auth-card--wide' : ''}`}>
          <h1>{title}</h1>
          {lede ? <p>{lede}</p> : null}
          {children}
        </div>
      </main>
    </>
  )
}
