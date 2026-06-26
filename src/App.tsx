import Layout from './components/Layout/Layout'
import Nav from './components/Nav/Nav'
import Hero from './components/Hero/Hero'
import Brands from './components/Brands/Brands'
import Problem from './components/Problem/Problem'
import Features from './components/Features/Features'
import Audience from './components/Audience/Audience'
import Pricing from './components/Pricing/Pricing'
import CTA from './components/CTA/CTA'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <Layout>
      <Nav />
      <Hero />
      <Brands />
      <Problem />
      <Features />
      <Audience />
      <Pricing />
      <CTA />
      <Footer />
    </Layout>
  )
}

export default App
