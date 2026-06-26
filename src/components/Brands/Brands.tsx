import useScrollReveal from '../../hooks/useScrollReveal'
import styles from './Brands.module.scss'

const platforms = ['Audio', 'Streaming', 'Video', 'Podcast', '+ más']
const formats = ['MP3', 'WAV', 'AIFF']

function Brands() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>()

  return (
    <section className={styles.brands}>
      <div className={styles.brandsLabel}>
        Cualquier plataforma. Cualquier formato. Directo a tu biblioteca.
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
