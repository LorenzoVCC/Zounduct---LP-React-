import styles from './Audience.module.scss'

const profiles = [
  {
    strong: 'DJ independiente',
    rest:
      '— resident o freelance que gestiona su propia biblioteca, descarga de múltiples plataformas y quiere tener todo ordenado.',
  },
  {
    strong: 'Productores/Promotores de música',
    rest:
      '— maneja tracks propios, promos y música ajena. Valora el control y la privacidad de su biblioteca.',
  },
]

function Audience() {
  return (
    <section className={styles.audience} id="para-quien">
      <div className={styles.audienceContent}>
        <div className={`eyebrow ${styles.eyebrowCentered}`}>Para quién</div>
        <h2>
          Hecho por un DJ.
          <br />
          Para DJs.
        </h2>
        <p className={`section-sub ${styles.sectionSubCentered}`}>
          Zounduct nace de años coleccionando música electrónica y sufriendo el mismo problema
          que vos. No es un producto de Silicon Valley adivinando qué necesita un DJ.
        </p>

        <div className={styles.audienceList}>
          {profiles.map((profile) => (
            <div className={styles.audienceItem} key={profile.strong}>
              <div className={styles.audienceCheck}>✓</div>
              <div>
                <strong>{profile.strong}</strong> {profile.rest}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Audience
