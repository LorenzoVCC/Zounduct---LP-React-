import useScrollReveal from '../../hooks/useScrollReveal'
import styles from './Footer.module.scss'

function Footer() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>()

  return (
    <footer className={styles.footer}>
      <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${styles.footerGrid}`}>
        <div className={styles.footerBrand}>
          <div className={styles.logo}>
            <span className={styles.logoMark} />
            Zounduct
          </div>
          <p>Guide Your Zound.</p>
        </div>

        <div className={styles.footerCol}>
          <h4>Producto</h4>
          <a href="#features">Funciones</a>
          {/* "El Proyecto" se conecta en R50-R52 (panel/sección Historia) — placeholder por ahora */}
          <a href="#">El Proyecto</a>
          <a href="#cta">Beta</a>
          <a href="#hero">Descarga</a>
        </div>

        <div className={styles.footerCol}>
          <h4>Comunidad</h4>
          <a href="#">Instagram</a>
          <a href="#">X</a>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div>© 2026 Zounduct</div>
        <div>v1.0</div>
      </div>
    </footer>
  )
}

export default Footer
