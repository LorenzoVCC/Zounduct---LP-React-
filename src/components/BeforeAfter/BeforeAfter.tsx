import useScrollReveal from '../../hooks/useScrollReveal'
import BeforeAfterStep from './BeforeAfterStep'
import styles from './BeforeAfter.module.scss'

function BeforeAfter() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>()

  return (
    <section className={`before-after ${styles.beforeAfter}`} id="before-after">
      <div
        ref={ref}
        className={`reveal ${visible ? 'visible' : ''} ${styles.baChaos}`}
      >
        <div>
          <div className={styles.baChaosLabel}>El problema</div>
          <div className={styles.baWindow}>
            <div className={styles.baWindowHeader}>📁 Downloads</div>
            <div>
              <div className={`${styles.baExplorerRow} ${styles.folder}`}>
                <span>📁</span>
                <span className={styles.baExplorerName}>Sets</span>
                <span className={styles.baExplorerDate}>21/5</span>
              </div>
              <div className={`${styles.baExplorerRow} ${styles.folder}`}>
                <span>📁</span>
                <span className={styles.baExplorerName}>Bangers</span>
                <span className={styles.baExplorerDate}>31/5</span>
              </div>
              <div className={`${styles.baExplorerRow} ${styles.highlight}`}>
                <span>🎵</span>
                <span className={styles.baExplorerName}>Vault Boy - Back Again.aiff</span>
                <span className={styles.baExplorerBadge}>¿dónde va?</span>
              </div>
              <div className={`${styles.baExplorerRow} ${styles.highlight}`}>
                <span>🎵</span>
                <span className={styles.baExplorerName}>Kael Voss - Tunnel Vision.mp3</span>
                <span className={styles.baExplorerBadge}>¿dónde va?</span>
              </div>
              <div className={styles.baExplorerRow}>
                <span>🎵</span>
                <span className={styles.baExplorerName}>Distant Hours - Fade Out.mp3</span>
                <span className={styles.baExplorerDate}>29/5</span>
              </div>
              <div className={`${styles.baExplorerRow} ${styles.highlight}`}>
                <span>🎵</span>
                <span className={styles.baExplorerName}>Rune &amp; Slate - No Signal.mp3</span>
                <span className={styles.baExplorerBadge}>¿dónde va?</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className={styles.baChaosTitle}>¿Te resulta familiar?</h2>
          <p className={styles.baChaosDesc}>
            {/* Issue #2 (copy neutro): un solo párrafo, sin voseo; se saca "Cada vez. Siempre." */}
            Descargas un track y queda en Descargas. Lo dejas para después, se acumulan, y cuando
            vuelves ya no recuerdas cuál era cuál: hay que escucharlos de nuevo y moverlos a mano.
          </p>
          <p className={`${styles.baChaosDesc} ${styles.baChaosCta}`}>
            Con Zounduct, cada descarga se detecta al momento y la clasificas en un clic.
          </p>
        </div>
      </div>

      <div className={styles.baFlowsHead}>
        <p>Mismo punto de partida. Distinto resultado.</p>
      </div>

      <div className={styles.baFlows}>

        {/* ===== SIN ZOUNDUCT ===== */}
        <div className={`${styles.baFlowContainer} ${styles.sin}`}>
          <div className={`${styles.baFlowTag} ${styles.sin}`}>Sin Zounduct</div>

          <div className={styles.baFlowSteps}>

            <BeforeAfterStep
              variant="sin"
              num="01"
              windowTitle="Herramienta de descarga"
              labelTitle="Descargas"
              labelSub="El archivo queda en cualquier lugar"
              showArrow
              content={
                <div className={styles.baMiniContent}>
                  <div className={styles.baMiniDescMain}>Sin carpeta de destino</div>
                  <div className={styles.baMiniUrl}>track_source.com/track/...</div>
                  <div className={styles.baMiniBtn}>↓ Descargar</div>
                </div>
              }
            />

            <BeforeAfterStep
              variant="sin"
              num="02"
              windowTitle="📁 Downloads"
              labelTitle="Se acumula"
              labelSub="Sin contexto"
              showArrow
              content={
                <div className={styles.baMiniContent}>
                  <div className={styles.baMiniDescMain}>Se acumula sin orden</div>
                  <div className={`${styles.baMiniFile} ${styles.chaos}`}>🎵 echo_drift_001.mp3</div>
                  <div className={`${styles.baMiniFile} ${styles.chaos}`}>🎵 sector_nine_raw.aiff</div>
                  <div className={`${styles.baMiniFile} ${styles.chaos}`}>🎵 loop_static_final.mp3</div>
                  <div className={`${styles.baMiniFile} ${styles.chaos}`}>🎵 unnamed_track_03.mp3</div>
                </div>
              }
            />

            <BeforeAfterStep
              variant="sin"
              num="03"
              windowTitle="▶ Reproductor"
              labelTitle="Vuelves a escuchar"
              labelSub="Para recordar qué era"
              showArrow
              content={
                <div className={styles.baMiniContent}>
                  <div className={styles.baMiniDescMain}>Vuelves a escuchar</div>
                  <div className={styles.baMiniFile}>🎵 sector_nine_raw.aiff</div>
                  <div className={styles.baMiniProgress}>
                    <div className={styles.baMiniProgressBar} />
                  </div>
                  <div className={styles.baMiniQ}>¿era este el track que buscaba?</div>
                </div>
              }
            />

            <BeforeAfterStep
              variant="sin"
              num="04"
              windowTitle="📁 Biblioteca de música"
              labelTitle="Lo mueves a mano"
              labelSub="Cada vez"
              showArrow={false}
              content={
                <div className={styles.baMiniContent}>
                  <div className={styles.baMiniDescMain}>Lo mueves a mano</div>
                  <div className={styles.baMiniFile}>📁 Techno</div>
                  <div className={`${styles.baMiniFile} ${styles.drag}`}>↳ sector_nine_raw.aiff</div>
                  <div className={styles.baMiniHint}>arrastrar a la carpeta...</div>
                </div>
              }
            />

            </div>

            <div className={`${styles.baFlowSummary} ${styles.sin}`}>
              Cuatro pasos manuales por cada track.
            </div>
        </div>

        {/* ===== CON ZOUNDUCT ===== */}
        <div className={`${styles.baFlowContainer} ${styles.con}`}>
          <div className={`${styles.baFlowTag} ${styles.con}`}>Con Zounduct</div>

          <div className={styles.baFlowSteps}>

            <BeforeAfterStep
              variant="con"
              num="01"
              windowTitle="Origen de descarga"
              labelTitle="Descargas"
              labelSub="Como siempre"
              showArrow
              content={
                <div className={styles.baMiniContent}>
                  <div className={styles.baMiniDescMain}>Tu flujo no cambia</div>
                  <div className={styles.baMiniUrl}>track_source.com/track/...</div>
                  <div className={styles.baMiniBtn}>↓ Descargar</div>
                  <div className={styles.baMiniTag}>Zounduct detectando…</div>
                </div>
              }
            />

            <BeforeAfterStep
              variant="con"
              num="02"
              windowTitle="Zounduct"
              labelTitle="Zounduct lo detecta"
              labelSub="Automáticamente"
              showArrow
              content={
                <>
                  <div className={styles.baPopupHeader}>
                    <div className={styles.baPopupBrand}>
                      <div className={`${styles.baWindowDot} ${styles.violet}`} />
                      <span className={styles.baPopupBrandName}>Zounduct</span>
                    </div>
                    <span className={styles.baPopupTitle}>Categorizar track</span>
                    <span className={styles.baPopupStatus}>● USB conectado</span>
                  </div>
                  <div className={styles.baPopupTrackBar}>
                    <span className={styles.baPopupTrackIdx}>1/1</span>
                    <span className={styles.baPopupTrackName}>echo_drift_001.aiff</span>
                    <span className={styles.baPopupTrackFmt}>AIFF</span>
                  </div>
                  <div className={styles.baMiniContentSplit}>
                    <div className={styles.baMiniQueue}>
                      <div className={styles.baPopupColHeader}>COLA <span>1</span></div>
                      <div className={`${styles.baMiniQItem} ${styles.active}`}>▶ echo_drift_001</div>
                    </div>
                    <div className={`${styles.baMiniDest} ${styles.muted}`}>
                      <div className={styles.baPopupColHeader}>DESTINO</div>
                      <div className={styles.baMiniDestItem}>/ Raíz</div>
                      <div className={styles.baMiniDestItem}>Techno</div>
                      <div className={styles.baMiniDestItem}>Deep House</div>
                      <div className={styles.baMiniDestItem}>Minimal</div>
                    </div>
                  </div>
                </>
              }
            />

            <BeforeAfterStep
              variant="con"
              num="03"
              windowTitle="Zounduct"
              labelTitle="Eliges la carpeta"
              labelSub="Un clic"
              showArrow={false}
              content={
                <>
                  <div className={styles.baPopupHeader}>
                    <div className={styles.baPopupBrand}>
                      <div className={`${styles.baWindowDot} ${styles.violet}`} />
                      <span className={styles.baPopupBrandName}>Zounduct</span>
                    </div>
                    <span className={styles.baPopupTitle}>Categorizar track</span>
                    <span className={styles.baPopupStatus}>● USB conectado</span>
                  </div>
                  <div className={styles.baPopupTrackBar}>
                    <span className={styles.baPopupTrackIdx}>1/1</span>
                    <span className={styles.baPopupTrackName}>echo_drift_001.aiff</span>
                    <span className={styles.baPopupTrackFmt}>AIFF</span>
                  </div>
                  <div className={styles.baMiniContentSplit}>
                    <div className={styles.baMiniQueue}>
                      <div className={styles.baPopupColHeader}>COLA <span>1</span></div>
                      <div className={`${styles.baMiniQItem} ${styles.active}`}>▶ echo_drift_001</div>
                    </div>
                    <div className={styles.baMiniDest}>
                      <div className={styles.baPopupColHeader}>DESTINO</div>
                      <div className={styles.baMiniDestItem}>/ Raíz</div>
                      <div className={`${styles.baMiniDestItem} ${styles.sel}`}>Techno</div>
                      <div className={styles.baMiniDestItem}>Deep House</div>
                      <div className={styles.baMiniDestItem}>Minimal</div>
                    </div>
                  </div>
                </>
              }
            />

          </div>

            <div className={`${styles.baFlowSummary} ${styles.con}`}>
              Clasificado y sincronizado.
            </div>
        </div>

      </div>
    </section>
  )
}

export default BeforeAfter
