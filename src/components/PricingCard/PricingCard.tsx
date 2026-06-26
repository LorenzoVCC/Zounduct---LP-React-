import type { ReactNode } from 'react'
import useScrollReveal from '../../hooks/useScrollReveal'
import styles from './PricingCard.module.scss'

interface PricingCardProps {
  name: string
  soonBadge?: string
  priceContent: ReactNode
  showLaunchBadge?: boolean
  description: string
  features: string[]
  ctaLabel: string
  ctaDisabled?: boolean
  soon?: boolean
  delay: number
}

function PricingCard({
  name,
  soonBadge,
  priceContent,
  showLaunchBadge,
  description,
  features,
  ctaLabel,
  ctaDisabled,
  soon,
  delay,
}: PricingCardProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms`, height: '100%' }}
    >
      <div className={`${styles.pricingCard} ${soon ? styles.pricingCardSoon : ''}`}>
        <div className={styles.pricingName}>
          {name}
          {soonBadge && <span className={styles.pricingSoon}>{soonBadge}</span>}
        </div>

        <div className={styles.pricingPriceWrapper}>
          <div className={styles.pricingPrice}>{priceContent}</div>
          {showLaunchBadge ? (
            <div className={styles.pricingLaunchBadge}>Precio de lanzamiento</div>
          ) : (
            <div className={styles.pricingPriceSlot} />
          )}
        </div>

        <div className={styles.pricingDesc}>{description}</div>

        <ul className={styles.pricingFeatures}>
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <a
          href="#"
          className={`btn ${styles.btnOutline} ${ctaDisabled ? styles.btnDisabled : ''}`}
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  )
}

export default PricingCard
