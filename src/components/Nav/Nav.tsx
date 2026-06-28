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
        <a href="#para-quien">Para vos</a>
        <a href="#pricing">Planes</a>
        <a
          href={PRE_LAUNCH ? '#cta' : DOWNLOAD_URL}
          className="btn btn-sm"
          style={{
            display: 'inline-flex',
            flexShrink: 0,
            visibility: 'visible',
            padding: '0.55rem 2.25rem',
          }}
        >
          {PRE_LAUNCH ? 'Beta' : 'Descargar gratis'}
        </a>
      </div>
    </nav>
  )
}

export default Nav
