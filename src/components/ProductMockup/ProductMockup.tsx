import styles from './ProductMockup.module.scss'

const queue = [
  { activo: true, nombre: 'Viken Arman - Ritual.mp3' },
  { activo: false, nombre: 'Alignment - Shift.wav' },
  { activo: false, nombre: 'Truncate - Caustic (Club Mix).mp3' },
  { activo: false, nombre: 'Phase Fatale - Hex.aiff' },
  { activo: false, nombre: 'Surgeon - Magneze.mp3' },
]

const folders = [
  { nombre: '/ Root', selected: true },
  { nombre: 'Techno', selected: false },
  { nombre: 'Deep House', selected: false },
  { nombre: 'Minimal', selected: false },
  { nombre: 'Percussion', selected: false },
  { nombre: 'Acid', selected: false },
  { nombre: 'Ambient', selected: false },
  { nombre: 'Classics', selected: false },
]

function ProductMockup() {
  return (
    <div className={styles.heroMockup}>
      <div className={styles.mockupWindow}>
        {/* HEADER */}
        <div className={styles.mockupHeader}>
          <div className={styles.mockupBrand}>
            <span className={styles.mockupLogoMark} />
            <span className={styles.mockupBrandName}>Zounduct</span>
          </div>
          <div className={styles.mockupTitle}>Categorize track</div>
          <div className={styles.mockupStatus}>
            <span className={styles.mockupStatusDot} />
            USB connected
          </div>
        </div>

        {/* TRACK INFO BAR */}
        <div className={styles.mockupTrackBar}>
          <span className={styles.mockupTrackIdx}>1/5</span>
          <span className={styles.mockupTrackTitle}>Viken Arman - Ritual.mp3</span>
          <span className={styles.mockupTrackFmt}>MP3</span>
        </div>

        {/* PLAYER */}
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
              <span>0:00</span>
              <span>6:42</span>
            </div>
          </div>
        </div>

        {/* BODY: DOS COLUMNAS */}
        <div className={styles.mockupColumns}>
          {/* COLUMNA IZQUIERDA: QUEUE */}
          <div className={styles.mockupColTracks}>
            <div className={styles.mockupColHeader}>
              <span className={styles.mockupColLabel}>QUEUE</span>
              <span className={styles.mockupColCount}>{queue.length - 1}</span>
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

          {/* COLUMNA DERECHA: DESTINATION */}
          <div className={styles.mockupColCarpetas}>
            <div className={styles.mockupColHeader}>
              <span className={styles.mockupColLabel}>DESTINATION</span>
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
      </div>
      <div className={styles.mockupGlow} />
    </div>
  )
}

export default ProductMockup
