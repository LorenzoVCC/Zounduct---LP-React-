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
          <h2 className={styles.baChaosTitle}>¿Te suena conocido?</h2>
          <p className={styles.baChaosDesc}>
            Descargás desde cualquier plataforma. El archivo cae en Descargas. Lo dejás para
            después. Se acumula. Cuando querés ordenar ya no sabés cuál era cuál — tenés que
            reescuchar todo de vuelta. Y después moverlo a mano.
          </p>
          <p className={styles.baChaosDesc}>Cada vez. Siempre.</p>
          <p className={`${styles.baChaosDesc} ${styles.baChaosCta}`}>
            Descargás. Zounduct detecta el archivo automáticamente y te permite ordenarlo en el
            momento, sin buscar, sin mover a mano.
          </p>
        </div>
      </div>

      <div className={styles.baFlowsHead}>
        <p>Mismo punto de partida. Distinta organización.</p>
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
              labelTitle="Descargás"
              labelSub="El archivo cae donde sea"
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
              labelTitle="Se acumula en Descargas"
              labelSub="No sabés qué es qué"
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
              labelTitle="Reescuchás para recordar"
              labelSub="Perdiste el contexto"
              showArrow
              content={
                <div className={styles.baMiniContent}>
                  <div className={styles.baMiniDescMain}>Reescuchás para recordar</div>
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
              labelTitle="Movés a mano, cada vez"
              labelSub="Trabajo repetitivo, siempre"
              showArrow={false}
              content={
                <div className={styles.baMiniContent}>
                  <div className={styles.baMiniDescMain}>Movés a mano, cada vez</div>
                  <div className={styles.baMiniFile}>📁 Techno</div>
                  <div className={`${styles.baMiniFile} ${styles.drag}`}>↳ sector_nine_raw.aiff</div>
                  <div className={styles.baMiniHint}>arrastrar a la carpeta...</div>
                </div>
              }
            />

            </div>

            <div className={`${styles.baFlowSummary} ${styles.sin}`}>
              4 pasos manuales. Cada track. Siempre.
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
              labelTitle="Descargás, listo"
              labelSub="Igual que antes"
              showArrow
              content={
                <div className={styles.baMiniContent}>
                  <div className={styles.baMiniDescMain}>Tu flujo no cambia en nada</div>
                  <div className={styles.baMiniUrl}>track_source.com/track/...</div>
                  <div className={styles.baMiniBtn}>↓ Descargar</div>
                  <div className={styles.baMiniTag}>Zounduct está viendo...</div>
                </div>
              }
            />

            <BeforeAfterStep
              variant="con"
              num="02"
              windowTitle="Zounduct"
              labelTitle="Zounduct lo detecta solo"
              labelSub="Automático, sin intervención"
              showArrow
              content={
                <>
                  <div className={styles.baPopupHeader}>
                    <div className={styles.baPopupBrand}>
                      <div className={`${styles.baWindowDot} ${styles.violet}`} />
                      <span className={styles.baPopupBrandName}>Zounduct</span>
                    </div>
                    <span className={styles.baPopupTitle}>Categorizar track</span>
                    <span className={styles.baPopupStatus}>● PD conectado</span>
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
              labelTitle="Elegís la carpeta"
              labelSub="Un click. Listo."
              showArrow={false}
              content={
                <>
                  <div className={styles.baPopupHeader}>
                    <div className={styles.baPopupBrand}>
                      <div className={`${styles.baWindowDot} ${styles.violet}`} />
                      <span className={styles.baPopupBrandName}>Zounduct</span>
                    </div>
                    <span className={styles.baPopupTitle}>Categorizar track</span>
                    <span className={styles.baPopupStatus}>● PD conectado</span>
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
              Listo. Ordenado, sincronizado, sin esfuerzo.
            </div>
        </div>

      </div>
    </section>
  )
}

export default BeforeAfter
