import CTAGroup from '../CTAGroup/CTAGroup'
import ProductMockup from '../ProductMockup/ProductMockup'
import StatsRow from '../StatsRow/StatsRow'
import useScrollReveal from '../../hooks/useScrollReveal'
import styles from './Hero.module.scss'

function Hero() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>()

  return (
    <section className={styles.hero} id="hero">
      <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${styles.heroContent}`}>
        <div className={`pill ${styles.pill}`}>
          <span className="pill-dot" />
          Próximamente
        </div>

        <h1 className={styles.title}>
          Guide
          <br />
          Your <span className={styles.highlight}>Zound.</span>
        </h1>

        <p className={styles.sub}>
          Tu biblioteca musical, organizada dinámicamente. Detección automática, sync con
          pendrive, descarga desde cualquier plataforma. <span className="muted-strong">Sin caos.</span>
        </p>

        <CTAGroup />
      </div>

      <ProductMockup />

      <StatsRow />
    </section>
  )
}

export default Hero
