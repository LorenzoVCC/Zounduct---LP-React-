import Layout from './components/Layout/Layout'
import Nav from './components/Nav/Nav'
import Hero from './components/Hero/Hero'
import Brands from './components/Brands/Brands'
import Problem from './components/Problem/Problem'
import BeforeAfter from './components/BeforeAfter/BeforeAfter'
import Features from './components/Features/Features'
import Audience from './components/Audience/Audience'
import Pricing from './components/Pricing/Pricing'
import CTA from './components/CTA/CTA'
import Footer from './components/Footer/Footer'
import RoadmapPanel from './components/RoadmapPanel/RoadmapPanel'
import { HistoriaPanelProvider } from './components/RoadmapPanel/HistoriaPanelContext'

function App() {
  return (
    <HistoriaPanelProvider>
      <Layout>
        <Nav />
        <Hero />
        <Brands />
        <Problem />
        <BeforeAfter />
        <Features />
        <Audience />
        <Pricing />
        <CTA />
        <Footer />
      </Layout>
      <RoadmapPanel />
    </HistoriaPanelProvider>
  )
}

export default App
