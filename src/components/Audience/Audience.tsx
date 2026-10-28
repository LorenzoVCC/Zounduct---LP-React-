import AudienceItem from './AudienceItem'
import styles from './Audience.module.scss'

// Issue #2 (copy neutro)
const profiles = [
  {
    strong: 'DJ independiente',
    rest: '— Residente o freelance que gestiona su propia biblioteca y descarga desde varias plataformas.',
  },
  {
    strong: 'Productores y promotores',
    rest: '— Manejan tracks propios, promos y material de terceros, y valoran el control sobre su biblioteca.',
  },
]

function Audience() {
  return (
    <section className={styles.audience} id="para-quien">
      <div className={styles.audienceContent}>
        <div className={`eyebrow ${styles.eyebrowCentered}`}>Para quién</div>
        <h2>Hecho por DJs, para DJs.</h2>
        <p className={`section-sub ${styles.sectionSubCentered}`}>
          Zounduct nace de años coleccionando música electrónica y enfrentando el mismo problema que
          tú.
        </p>

        <div className={styles.audienceList}>
          {profiles.map((profile, i) => (
            <AudienceItem key={profile.strong} {...profile} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Audience
