import type { ReactNode } from 'react'
import useScrollReveal from '../../hooks/useScrollReveal'
import { useTrackEvent } from '../../hooks/useTrackEvent'
import styles from './PricingCard.module.scss'

interface PricingCardProps {
  name: string
  soonBadge?: string
  priceContent: ReactNode
  showLaunchBadge?: boolean
  featured?: boolean
  description: string
  features: string[]
  ctaLabel: string
  ctaHref: string
  ctaDisabled?: boolean
  soon?: boolean
  delay: number
}

function PricingCard({
  name,
  soonBadge,
  priceContent,
  showLaunchBadge,
  featured,
  description,
  features,
  ctaLabel,
  ctaHref,
  ctaDisabled,
  soon,
  delay,
}: PricingCardProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>()
  const { trackEvent } = useTrackEvent()

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms`, height: '100%' }}
    >
      <div
        className={`${styles.pricingCard} ${featured ? styles.pricingCardFeatured : ''} ${soon ? styles.pricingCardSoon : ''}`}
      >
        {featured && <div className={styles.pricingFeaturedBadge}>Recomendado</div>}
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
          href={ctaHref}
          className={`btn ${featured ? styles.btnFeatured : styles.btnOutline} ${ctaDisabled ? styles.btnDisabled : ''}`}
          aria-disabled={ctaDisabled || undefined}
          tabIndex={ctaDisabled ? -1 : undefined}
          onClick={() => trackEvent('PricingCardClick', { plan: name, cta: ctaLabel })}
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  )
}

export default PricingCard
