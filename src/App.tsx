import { useEffect, useRef } from 'react'
import Layout from './components/Layout/Layout'
import Nav from './components/Nav/Nav'
import Hero from './components/Hero/Hero'
import Brands from './components/Brands/Brands'
import Problem from './components/Problem/Problem'
import BeforeAfter from './components/BeforeAfter/BeforeAfter'
import Features from './components/Features/Features'
import Audience from './components/Audience/Audience'
import Pricing from './components/Pricing/Pricing'
import FAQ from './components/FAQ/FAQ'
import CTA from './components/CTA/CTA'
import Footer from './components/Footer/Footer'
import RoadmapPanel from './components/RoadmapPanel/RoadmapPanel'
import { HistoriaPanelProvider } from './components/RoadmapPanel/HistoriaPanelContext'
import { useTrackEvent } from './hooks/useTrackEvent'

function App() {
  const { trackEvent } = useTrackEvent()
  const reached = useRef<Set<number>>(new Set())

  useEffect(() => {
    const checkDepth = () => {
      const scrolled = window.scrollY + window.innerHeight
      const total = document.documentElement.scrollHeight
      const pct = Math.floor((scrolled / total) * 100)

      for (const milestone of [25, 50, 75, 100]) {
        if (pct >= milestone && !reached.current.has(milestone)) {
          reached.current.add(milestone)
          trackEvent('ScrollDepth', { profundidad: `${milestone}%` })
        }
      }
    }

    window.addEventListener('scroll', checkDepth, { passive: true })
    return () => window.removeEventListener('scroll', checkDepth)
  }, [trackEvent])

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
        <FAQ />
        <CTA />
        <Footer />
      </Layout>
      <RoadmapPanel />
    </HistoriaPanelProvider>
  )
}

export default App
