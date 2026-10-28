import useScrollReveal from '../../hooks/useScrollReveal'
import styles from './Brands.module.scss'

// Issue #2: antes eran categorías genéricas ("Audio / Streaming / Video / Podcast"), que
// prometían "cualquier plataforma". Mostramos las plataformas reales que la app sugiere
// en su barra de descarga, en texto y sin logos (no usamos marcas registradas como imagen).
const platforms = ['YouTube', 'SoundCloud', 'Bandcamp']
const formats = ['MP3', 'WAV', 'AIFF']

function Brands() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>()

  return (
    <section className={styles.brands}>
      <div className={styles.brandsLabel}>
        YouTube, SoundCloud, Bandcamp y más. Directo a tu biblioteca.
      </div>
      <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${styles.brandsList}`}>
        {platforms.map((platform) => (
          <div className={styles.brand} key={platform}>
            {platform}
          </div>
        ))}
      </div>
      <div className="brands-formats">
        {formats.map((format) => (
          <span className="brand-format" key={format}>
            {format}
          </span>
        ))}
      </div>
    </section>
  )
}

export default Brands
