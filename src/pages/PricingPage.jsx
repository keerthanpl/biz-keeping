import Nav from '../components/Nav.jsx'
import Footer from '../sections/Footer.jsx'
import Pricing from '../sections/Pricing.jsx'

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main className="pricing-page">
        <Pricing />
      </main>
      <Footer />
    </>
  )
}
