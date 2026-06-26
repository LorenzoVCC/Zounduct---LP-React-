import useScrollReveal from '../../hooks/useScrollReveal'
import styles from './Audience.module.scss'

interface AudienceItemProps {
  strong: string
  rest: string
  delay: number
}

function AudienceItem({ strong, rest, delay }: AudienceItemProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''} ${styles.audienceItem}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.audienceCheck}>✓</div>
      <div>
        <strong>{strong}</strong> {rest}
      </div>
    </div>
  )
}

export default AudienceItem
