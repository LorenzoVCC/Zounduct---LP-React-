import styles from './CTAGroup.module.scss'

function CTAGroup() {
  return (
    <div className={styles.ctas}>
      <a href="#" className="btn btn-lg">
        Descargar gratis
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </a>
      <a href="#features" className="btn-link">
        Ver cómo funciona
      </a>
    </div>
  )
}

export default CTAGroup
