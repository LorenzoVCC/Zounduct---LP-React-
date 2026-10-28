import styles from './StatsRow.module.scss'

interface Stat {
  num: string
  big?: boolean
  label: string
  sub: string
}

// Issue #2 (copy neutro): labels cortos y sin voseo. El "0 / Configuración compleja"
// se reemplaza por un engranaje: el mensaje ahora es positivo ("en minutos").
const stats: Stat[] = [
  { num: '3', label: 'Formatos', sub: 'MP3 · WAV · AIFF' },
  { num: '∞', big: true, label: 'Tracks', sub: 'Sin límite de biblioteca' },
  { num: '⚙', label: 'Configuración en minutos', sub: 'Sin pasos complicados' },
  { num: '⚡', label: 'Clasificación al instante', sub: 'Cada track, en el momento' },
]

function StatsRow() {
  return (
    <div className={styles.heroStats}>
      {stats.map((stat) => (
        <div className={styles.stat} key={stat.label}>
          <div className={`${styles.statNum} ${stat.big ? styles.statNumBig : ''}`}>{stat.num}</div>
          <div className={styles.statLabel}>
            {stat.label}
            <br />
            <span>{stat.sub}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsRow
