import { useEffect } from 'react'
import { useHistoriaPanel } from './HistoriaPanelContext'
import styles from './RoadmapPanel.module.scss'

function RoadmapPanel() {
  const { isOpen, openPanel, closePanel } = useHistoriaPanel()

  // Cerrar con Escape (R50 — mismo comportamiento que la versión vieja en panel.js)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closePanel()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [closePanel])

  // Bloquear scroll del body mientras el panel está abierto (igual que la versión vieja)
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <button
        className={`${styles.panelTrigger} ${isOpen ? styles.isOpen : ''}`}
        onClick={isOpen ? closePanel : openPanel}
        aria-label="El Proyecto"
      >
        El Proyecto
        <span className={styles.panelTriggerArrow}>›</span>
      </button>

      <div
        className={`${styles.panelOverlay} ${isOpen ? styles.isOpen : ''}`}
        onClick={closePanel}
      />

      <aside
        className={`${styles.panelHistoria} ${isOpen ? styles.isOpen : ''}`}
        aria-hidden={!isOpen}
      >
        <button className={styles.panelClose} onClick={closePanel} aria-label="Cerrar">
          ✕
        </button>

        <div className={styles.panelEyebrow}>EL PROYECTO</div>

        <h2>¿Por qué existe Zounduct?</h2>

        <p>
          Crecimos escuchando música electrónica. Con el tiempo, construimos nuestras propias
          colecciones — mezclando por hobby, organizando por necesidad.
        </p>

        <p>
          El problema apareció solo: cada track nuevo requería reescucharlo, categorizarlo a mano
          y moverlo a la carpeta correcta. Un proceso pequeño, pero constante.{' '}
          <strong>El que gestiona su propia biblioteca sabe exactamente de qué hablamos.</strong>
        </p>

        <p>
          En un momento nos preguntamos por qué no existía una herramienta que simplificara eso.
          Como no la encontramos, la construimos. Zounduct nació como una solución para nosotros
          mismos — y cuando vimos el tiempo que ahorraba, entendimos que podía servirle a muchos
          más.
        </p>

        <p>
          No viene de una oficina adivinando qué necesita un DJ.{' '}
          <strong>Viene de haberlo vivido.</strong>
        </p>
      </aside>
    </>
  )
}

export default RoadmapPanel
