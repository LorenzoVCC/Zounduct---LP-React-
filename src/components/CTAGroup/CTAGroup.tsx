import { PRE_LAUNCH, DOWNLOAD_URL } from '../../config/launchMode'
import { useTrackEvent } from '../../hooks/useTrackEvent'
import styles from './CTAGroup.module.scss'

function CTAGroup() {
  const { trackEvent } = useTrackEvent()

  return (
    <div className={styles.ctaWrapper}>
      <div className={styles.ctas}>
        <a
          href={PRE_LAUNCH ? '#cta' : DOWNLOAD_URL}
          className="btn btn-lg"
          onClick={() => trackEvent('DescargarGratis', { modo: PRE_LAUNCH ? 'pre_launch' : 'launch' })}
        >
          {/* En pre-launch no hay nada para descargar: el CTA lleva a la lista de espera */}
          {PRE_LAUNCH ? 'Sumate a la beta' : 'Descargar gratis'}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
        <a href="#features" className="btn-link">
          Ver cómo funciona
        </a>
      </div>
      <p className={styles.ctaNote}>
        Gratis · Windows · Sin configuración
      </p>
    </div>
  )
}

export default CTAGroup
