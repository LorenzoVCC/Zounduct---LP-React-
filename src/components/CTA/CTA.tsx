import EmailForm from '../EmailForm/EmailForm'
import Toast from '../Toast/Toast'
import useToast from '../../hooks/useToast'
import useScrollReveal from '../../hooks/useScrollReveal'
import { PRE_LAUNCH } from '../../config/launchMode'
import styles from './CTA.module.scss'

function CTA() {
  const { toast, showToast } = useToast()
  const { ref, visible } = useScrollReveal<HTMLDivElement>()

  return (
    <section className={styles.cta} id="cta">
      <div
        ref={ref}
        className={`reveal ${visible ? 'visible' : ''} ${styles.ctaContent}`}
      >
        <div className="eyebrow centered">
          {PRE_LAUNCH ? 'Próximamente' : 'Disponible ahora'}
        </div>
        {PRE_LAUNCH ? (
          <h2>
            Tu próximo set
            <br />
            empieza acá.
          </h2>
        ) : (
          <h2>
            Tu próximo set
            <br />
            empieza ahora.
          </h2>
        )}
        <p>
          Sumate a la lista y enterate cuando salga.{' '}
          <span className="muted-strong">Sin spam, sin vueltas.</span>
        </p>

        <EmailForm showToast={showToast} ctaLabel={PRE_LAUNCH ? 'Sumate a la beta' : 'Descargar gratis'} />

        <div className={styles.ctaMeta}>
          No requiere tarjeta · Cancelás cuando quieras · Hecho para DJs
        </div>
      </div>

      <Toast message={toast.message} visible={toast.visible} type={toast.type} />
    </section>
  )
}

export default CTA
