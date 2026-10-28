import { PRE_LAUNCH, DOWNLOAD_URL } from '../../config/launchMode'
import { useTrackEvent } from '../../hooks/useTrackEvent'
import styles from './CTAGroup.module.scss'

function CTAGroup() {
  const { trackEvent } = useTrackEvent()

  return (
    <div className={styles.ctas}>
      <a
        href={PRE_LAUNCH ? '#cta' : DOWNLOAD_URL}
        className="btn btn-lg"
        onClick={() => trackEvent('DescargarGratis', { modo: PRE_LAUNCH ? 'pre_launch' : 'launch' })}
      >
        {/* Issue #2: en pre-lanzamiento no hay nada para descargar — el botón lleva a la
            lista de espera (#cta), así que dice lo mismo que el CTA final. "Descargar gratis"
            queda solo para cuando PRE_LAUNCH = false y el link apunta al instalador real. */}
        {PRE_LAUNCH ? 'Sumate a la beta' : 'Descargar gratis'}
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
