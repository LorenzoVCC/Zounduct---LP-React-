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

        {/* Issue #2 (copy neutro): texto aprobado por Lolo el 28/10 */}
        <p>
          Crecimos escuchando música electrónica y, con el tiempo, armamos nuestras propias
          colecciones: mezclando por gusto y organizando por necesidad.
        </p>

        <p>
          Cada track nuevo había que escucharlo otra vez, clasificarlo y moverlo a mano. Un proceso
          pequeño, pero constante.{' '}
          <strong>Quien gestiona su propia biblioteca lo conoce bien.</strong>
        </p>

        <p>
          No encontramos una herramienta que lo resolviera, así que la construimos. Zounduct empezó
          como una solución para nosotros y, al ver el tiempo que ahorraba, entendimos que podía
          servirle a muchos más.
        </p>

        <p>
          No nace de una oficina que imagina qué necesita un DJ.{' '}
          <strong>Nace de haberlo vivido.</strong>
        </p>
      </aside>
    </>
  )
}

export default RoadmapPanel
