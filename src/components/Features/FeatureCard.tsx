import type { ReactNode } from 'react'
import useScrollReveal from '../../hooks/useScrollReveal'
import styles from './Features.module.scss'

interface FeatureCardProps {
  number: string
  icon: ReactNode
  title: string
  description: ReactNode
  delay: number
}

function FeatureCard({ number, icon, title, description, delay }: FeatureCardProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''} ${styles.featureCard}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.featureNumber}>{number}</div>
      <div className={styles.featureIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default FeatureCard
