import styles from './ProductMockup.module.scss'

/**
 * Issue #2: el mockup estaba en inglés y era de una versión vieja de la app.
 * Ahora replica (sin ser pixel-perfect) la ventana "Carpeta" actual de Zounduct
 * (ui/popup_principal.html, rama `features` de Sounduct), de arriba hacia abajo:
 *   Head → SB + FM (link + formato) → TData (con chips BPM/KEY/DUR) → PL →
 *   PList ("Cola") + Dirs (carpetas) → Btns (Cancelar / Confirmar).
 */

const queue = [
  { activo: true, nombre: 'Viken Arman - Ritual.mp3' },
  { activo: false, nombre: 'Alignment - Shift.wav' },
  { activo: false, nombre: 'Truncate - Caustic (Club Mix).mp3' },
  { activo: false, nombre: 'Phase Fatale - Hex.aiff' },
  { activo: false, nombre: 'Surgeon - Magneze.mp3' },
]

const folders = [
  { nombre: '/ Raíz', selected: false },
  { nombre: 'Techno', selected: true },
  { nombre: 'Deep House', selected: false },
  { nombre: 'Minimal', selected: false },
  { nombre: 'Acid', selected: false },
  { nombre: 'Ambient', selected: false },
]

const formats = ['MP3', 'WAV', 'AIFF']

// Metadata leída de los tags del archivo (en la app: chips BPM / KEY / DUR)
const trackMeta = [
  { label: 'BPM', value: '124' },
  { label: 'KEY', value: '8A' },
  { label: 'DUR', value: '6:42' },
]

function ProductMockup() {
  return (
    <div className={styles.heroMockup} aria-hidden="true">
      <div className={styles.mockupWindow}>
        {/* HEAD */}
        <div className={styles.mockupHeader}>
          <div className={styles.mockupBrand}>
            <span className={styles.mockupLogoMark} />
            <span className={styles.mockupBrandName}>Zounduct</span>
          </div>
          <div className={styles.mockupStatus}>
            <span className={styles.mockupStatusDot} />
            PD conectado
          </div>
        </div>

        {/* SB + FM: descarga por link y formato */}
        <div className={styles.mockupDownloadBar}>
          <div className={styles.mockupUrlInput}>
            Pegá un link de YouTube, SoundCloud, Bandcamp…
          </div>
          <div className={styles.mockupDownloadBtn}>Descargar</div>
        </div>
        <div className={styles.mockupFormatBar}>
          <span className={styles.mockupFormatLabel}>Formato</span>
          {formats.map((format) => (
            <span
              key={format}
              className={`${styles.mockupFormatBtn} ${format === 'MP3' ? styles.mockupFormatActive : ''}`}
            >
              {format}
            </span>
          ))}
        </div>

        {/* TDATA */}
        <div className={styles.mockupTrackBar}>
          <span className={styles.mockupTrackIdx}>1/5</span>
          <span className={styles.mockupTrackTitle}>Viken Arman - Ritual.mp3</span>
          <span className={styles.mockupTrackFmt}>MP3</span>
          <div className={styles.mockupMetaGroup}>
            {trackMeta.map((meta) => (
              <div key={meta.label} className={styles.mockupMetaChip}>
                <span className={styles.mockupMetaLabel}>{meta.label}</span>
                <span className={styles.mockupMetaValue}>{meta.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PL */}
        <div className={styles.mockupPlayerBar}>
          <div className={styles.mockupPlayBtn}>
            <svg viewBox="0 0 24 24" width="10" height="10" fill="#0f0f0f">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
          <div className={styles.mockupPlayerRight}>
            <div className={styles.mockupProgressTrack}>
              <div className={styles.mockupProgressFill} />
            </div>
            <div className={styles.mockupProgressTimes}>
              <span>1:58</span>
              <span>6:42</span>
            </div>
          </div>
        </div>

        {/* PLIST + DIRS */}
        <div className={styles.mockupColumns}>
          <div className={styles.mockupColTracks}>
            <div className={styles.mockupColHeader}>
              <span className={styles.mockupColLabel}>COLA</span>
              <span className={styles.mockupColCount}>{queue.length}</span>
            </div>
            <div className={styles.mockupBandeja}>
              {queue.map((track) => (
                <div
                  key={track.nombre}
                  className={`${styles.mockupBandejaItem} ${
                    track.activo ? styles.mockupBandejaActivo : ''
                  }`}
                >
                  <span className={styles.mockupBandejaNum}>{track.activo ? '▶' : ''}</span>
                  <span className={styles.mockupBandejaNombre}>{track.nombre}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.mockupColCarpetas}>
            <div className={styles.mockupColHeader}>
              <span className={styles.mockupColLabel}>DESTINO</span>
            </div>
            <ul className={styles.mockupFolderList}>
              {folders.map((folder) => (
                <li
                  key={folder.nombre}
                  className={`${styles.mockupFolderItem} ${
                    folder.selected ? styles.mockupFolderSelected : ''
                  }`}
                >
                  {folder.nombre}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BTNS */}
        <div className={styles.mockupActions}>
          <span className={styles.mockupBtnCancel}>Cancelar</span>
          <span className={styles.mockupBtnConfirm}>Confirmar</span>
        </div>
      </div>
      <div className={styles.mockupGlow} />
    </div>
  )
}

export default ProductMockup
