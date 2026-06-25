import useScrollNav from '../../hooks/useScrollNav'
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
        <a href="#cta" className="btn btn-sm">
          Sumate a la beta
        </a>
      </div>
    </nav>
  )
}

export default Nav
