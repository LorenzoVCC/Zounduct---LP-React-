import styles from './Problem.module.scss'

// Mismo ícono SVG repetido 4 veces en el original — extraído una sola vez.
function ProblemIconSvg() {
  return (
    <svg viewBox="0 0 32 32" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="26" height="26" rx="3" stroke="#8B53FF" strokeWidth="1.5" fill="none" />
      <path
        d="M9 9.5 C10 10.5, 13 13, 14.5 14.8 C15.5 16, 16.5 16, 17.5 17.2 C19 19, 21.5 21.5, 23 23"
        stroke="#8B53FF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M8.5 9 C9.5 9.8, 12 11.5, 13.5 13 C15 14.5, 15.8 15.5, 17 16.8 C18.5 18.5, 21 21, 22.5 22.8"
        stroke="#8B53FF"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M23 9.5 C22 10.5, 19 13, 17.5 14.8 C16.5 16, 15.5 16, 14.5 17.2 C13 19, 10.5 21.5, 9 23"
        stroke="#8B53FF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M23.5 9 C22.5 9.8, 20 11.5, 18.5 13 C17 14.5, 16.2 15.5, 15 16.8 C13.5 18.5, 11 21, 9.5 22.8"
        stroke="#8B53FF"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  )
}

const problems = [
  { strong: 'Tracks sin ordenar', rest: 'enterrados en tus descargas.' },
  { strong: 'USB desincronizado', rest: '— te falta algo en cada fecha' },
  { strong: 'Problemas de compatibilidad', rest: 'con diferentes formatos de archivo.' },
  { strong: '30 minutos antes del set', rest: 'buscando un archivo.' },
]

const terminalLines = [
  'Kachanta Style.mp3',
  'gig_saturday_v2_FINAL.mp3',
  'gig_saturday_v2_FINAL_ok.mp3',
  'unknown_track (2).wav',
  'that_record_from_jake.mp3',
  'new_download_untitled.aiff',
]

function Problem() {
  return (
    <section className="problem" id="problema">
      <div className="eyebrow">El problema</div>
      <h2>
        Tu biblioteca bajo control.
        <br />
        Tus tracks, Zounduct los ordena.
      </h2>

      <div className={styles.problemGrid}>
        <div>
          <p className="section-sub">
            Si sos DJ y gestionás tu propia biblioteca musical, sabés exactamente de qué
            hablamos.
          </p>
          <ul className={styles.problemList}>
            {problems.map((item) => (
              <li key={item.strong}>
                <span className={styles.problemIcon}>
                  <ProblemIconSvg />
                </span>
                <span className={styles.problemText}>
                  <strong>{item.strong}</strong> {item.rest}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.problemTerminal}>
          <div className={styles.terminalHeader}>
            <div className={styles.mockupBrand}>
              <span className={styles.mockupLogoMark} />
              <span className={styles.mockupBrandName}>Zounduct</span>
            </div>
            <div className={styles.terminalName}>~/Downloads</div>
          </div>
          <div className={styles.terminalBody}>
            {terminalLines.map((line) => (
              <div className={styles.terminalLine} key={line}>
                ├── {line}
              </div>
            ))}
            <div className={`${styles.terminalLine} ${styles.dim}`}>└── 27 more files...</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Problem
