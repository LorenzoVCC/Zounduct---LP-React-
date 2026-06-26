import PricingCard from '../PricingCard/PricingCard'
import cardStyles from '../PricingCard/PricingCard.module.scss'

const plans = [
  {
    name: 'Gratuito',
    priceContent: '$0',
    description: 'Para empezar a ordenar tu biblioteca hoy.',
    features: [
      'Detección automática de tracks',
      'Sync con pendrive',
      'MP3 · WAV · AIFF',
      '1 biblioteca',
    ],
    ctaLabel: 'Empezar gratis',
  },
  {
    name: 'Pro',
    priceContent: (
      <>
        <span className={cardStyles.pricingPriceOld}>USD 4</span> USD 2 <span>/ mes</span>
      </>
    ),
    showLaunchBadge: true,
    description: 'Para el DJ que descarga de todas partes.',
    features: [
      'Todo lo del plan Gratuito',
      'Descarga desde URL ilimitada',
      'Cualquier plataforma con URL',
      'Multi-biblioteca',
    ],
    ctaLabel: 'Notificarme',
  },
  {
    name: 'Cloud',
    soonBadge: 'Próximamente',
    priceContent: (
      <>
        USD 10 <span>/ mes</span>
      </>
    ),
    description: 'Para sincronizar entre dispositivos y tener backup.',
    features: [
      'Todo lo del plan Pro',
      'Backup automático',
      'Sync entre dispositivos',
      'Acceso prioritario a updates',
    ],
    ctaLabel: 'Notificarme',
    ctaDisabled: true,
    soon: true,
  },
]

function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <div className="eyebrow">Planes</div>
      <h2>El precio no es el problema.</h2>
      <p className="section-sub">Empezá gratis. Sumá potencia cuando lo necesites.</p>

      <div className={cardStyles.pricingGrid}>
        {plans.map((plan, i) => (
          <PricingCard key={plan.name} {...plan} delay={i * 150} />
        ))}
      </div>
    </section>
  )
}

export default Pricing
