import CTAGroup from '../CTAGroup/CTAGroup'
import ProductMockup from '../ProductMockup/ProductMockup'
import StatsRow from '../StatsRow/StatsRow'
import styles from './Hero.module.scss'

function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.heroContent}>
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
        <ProductMockup />
      </div>

      <StatsRow />
    </section>
  )
}

export default Hero
