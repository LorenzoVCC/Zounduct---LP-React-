import useScrollNav from '../../hooks/useScrollNav'
import { PRE_LAUNCH, DOWNLOAD_URL } from '../../config/launchMode'
import styles from './Nav.module.scss'

function Nav() {
  const scrolled = useScrollNav()

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>
        <span className={styles.logoMark} />
        Zounduct
      </div>
      <div className={styles.navLinks}>
        <a href="#problema">Problema</a>
        <a href="#features">Cómo funciona</a>
        <a href="#para-quien">Para quién</a>
        <a href="#pricing">Planes</a>
        <a
          href={PRE_LAUNCH ? '#cta' : DOWNLOAD_URL}
          className="btn btn-sm"
          style={{
            display: 'inline-flex',
            flexShrink: 0,
            visibility: 'visible',
            // Issue #2: el botón ahora dice "Únete a la beta" (antes "Beta"); con el padding
            // lateral anterior (2.25rem) la nav no entraba y los links se partían en 2 líneas.
            padding: '0.55rem 1.4rem',
          }}
        >
          {/* Issue #2 (copy neutro): mismo texto que el resto de los CTAs de pre-lanzamiento */}
          {PRE_LAUNCH ? 'Únete a la beta' : 'Descargar gratis'}
        </a>
      </div>
    </nav>
  )
}

export default Nav
