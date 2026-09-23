import useScrollReveal from '../../hooks/useScrollReveal'
import { useTrackEvent } from '../../hooks/useTrackEvent'
import styles from './FAQ.module.scss'

const faqs = [
  {
    q: '¿Reemplaza a Rekordbox o Serato?',
    a: 'No. Zounduct se encarga de lo que pasa antes: que cada track descargado llegue a la carpeta correcta y que tu pendrive esté siempre al día. Después lo tocás con el software o equipo que ya usás.',
  },
  {
    q: '¿En qué sistemas funciona?',
    a: 'Por ahora Zounduct es una app de escritorio para Windows. Vive en el system tray y arranca con tu computadora.',
  },
  {
    q: '¿Qué formatos soporta?',
    a: 'MP3, WAV y AIFF, los formatos que usan los DJs en cabina.',
  },
  {
    q: '¿Mis archivos se suben a algún lado?',
    a: 'No. En los planes Gratuito y Pro todo pasa en tu computadora: tu biblioteca es tuya y no sale de tu máquina. El plan Cloud, que llega más adelante, va a sumar backup y sync entre dispositivos para quien lo quiera.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: 'El plan Gratuito es gratis. Pro sale USD 2/mes durante el lanzamiento (el precio regular es USD 4/mes) y suma descarga desde URL ilimitada y múltiples bibliotecas.',
  },
  {
    q: '¿Cuándo sale?',
    a: 'Estamos en la etapa final antes de la beta. Dejá tu email abajo y te avisamos apenas esté disponible. Sin spam.',
  },
]

function FAQ() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>()
  const { trackEvent } = useTrackEvent()

  return (
    <section className={styles.faq} id="faq">
      <div className={styles.faqHeader}>
        <div className="eyebrow">Preguntas frecuentes</div>
        <h2>Lo que nos suelen preguntar.</h2>
        <p className="section-sub">
          ¿Te quedó alguna duda? Sumate a la beta y escribinos: lo leemos todo.
        </p>
      </div>

      <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${styles.faqList}`}>
        {faqs.map((item) => (
          <details
            key={item.q}
            className={styles.faqItem}
            onToggle={(e) => {
              if ((e.currentTarget as HTMLDetailsElement).open) {
                trackEvent('FAQOpen', { pregunta: item.q })
              }
            }}
          >
            <summary>
              {item.q}
              <span className={styles.faqIcon} aria-hidden="true" />
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export default FAQ
