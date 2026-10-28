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
          {/* Issue #2: la landing no decía en ningún lado que la app es para Windows */}
          Próximamente para Windows
        </div>

        <h1 className={styles.title}>
          Guide
          <br />
          Your <span className={styles.highlight}>Zound.</span>
        </h1>

        <p className={styles.sub}>
          {/* Issue #2 (copy neutro): español neutro con "tú", frases cortas y "USB" en vez de
              "pendrive" (la app sigue diciendo pendrive; acá buscamos el término más neutro). */}
          Organiza tu biblioteca musical sin esfuerzo. Zounduct detecta cada track nuevo, te
          ayuda a clasificarlo y mantiene tu USB sincronizado.
        </p>

        <CTAGroup />
      </div>

      <ProductMockup />

      <StatsRow />
    </section>
  )
}

export default Hero
