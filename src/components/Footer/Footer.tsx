import useScrollReveal from '../../hooks/useScrollReveal'
import { useHistoriaPanel } from '../RoadmapPanel/HistoriaPanelContext'
import styles from './Footer.module.scss'

// Issue #2: Instagram y X apuntaban a "#" (links muertos). La columna "Comunidad" solo se
// muestra si hay al menos un link real: completar el href acá cuando existan las cuentas.
const socialLinks: { label: string; href: string }[] = [
  { label: 'Instagram', href: '' },
  { label: 'X', href: '' },
].filter((link) => link.href !== '')

function Footer() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>()
  const { openPanel } = useHistoriaPanel()

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
          {/* R50-R52 — conectado al panel Historia via Context */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              openPanel()
            }}
          >
            El Proyecto
          </a>
          <a href="#cta">Beta</a>
          <a href="#hero">Descarga</a>
        </div>

        {socialLinks.length > 0 && (
          <div className={styles.footerCol}>
            <h4>Comunidad</h4>
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>

      <div className={styles.footerBottom}>
        <div>© 2026 Zounduct</div>
        {/* Issue #2: la app está en 0.9.0 (pre-beta); "v1.0" no coincidía con nada */}
        <div>Beta</div>
      </div>
    </footer>
  )
}

export default Footer
