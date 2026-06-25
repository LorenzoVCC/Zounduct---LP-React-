import styles from './StatsRow.module.scss'

interface Stat {
  num: string
  big?: boolean
  label: string
  sub: string
}

const stats: Stat[] = [
  { num: '3', label: 'Formatos soportados', sub: 'MP3 · WAV · AIFF' },
  { num: '∞', big: true, label: 'Tracks gestionables', sub: 'sin límite de biblioteca' },
  { num: '0', label: 'Configuración compleja', sub: 'arrancás en 2 minutos' },
  {
    num: '⚡',
    label: 'Música ordenada en tiempo real',
    sub: 'tracks categorizados al instante',
  },
]

function StatsRow() {
  return (
    <div className={styles.heroStats}>
      {stats.map((stat) => (
        <div className={styles.stat} key={stat.label}>
          <div className={`${styles.statNum} ${stat.big ? styles.statNumBig : ''}`}>
            {stat.num}
          </div>
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
