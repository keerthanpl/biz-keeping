import { useRef } from 'react'
import { DemoProvider } from './context/DemoContext.jsx'
import { useLenis } from './hooks/useLenis.js'
import { useScrollReveal } from './hooks/useScrollReveal.js'
import Nav from './components/Nav.jsx'
import Hero from './sections/Hero.jsx'
import Problem from './sections/Problem.jsx'
import WhoItsFor from './sections/WhoItsFor.jsx'
import Demo from './sections/Demo.jsx'
import Features from './sections/Features.jsx'
import Gst from './sections/Gst.jsx'
import Insights from './sections/Insights.jsx'
import Pricing from './sections/Pricing.jsx'
import Cta from './sections/Cta.jsx'
import Footer from './sections/Footer.jsx'

function Page() {
  const rootRef = useRef(null)
  useLenis()
  useScrollReveal(rootRef)

  return (
    <div ref={rootRef}>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <WhoItsFor />
        <Demo />
        <Features />
        <Gst />
        <Insights />
        <Pricing />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <DemoProvider>
      <Page />
    </DemoProvider>
  )
}
