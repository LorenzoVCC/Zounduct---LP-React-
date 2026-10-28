import PricingCard from '../PricingCard/PricingCard'
import cardStyles from '../PricingCard/PricingCard.module.scss'
import { PRE_LAUNCH } from '../../config/launchMode'

const plans = [
  {
    name: 'Gratuito',
    priceContent: '$0',
    description: 'Para empezar a organizar tu biblioteca hoy.',
    features: [
      'Detección automática de tracks',
      'Sincronización con USB', // Issue #2: barrido "pendrive" → "USB" (solo el término)
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
    description: 'Para el DJ que descarga de muchas fuentes.',
    features: [
      'Todo lo del plan Gratuito',
      'Descarga desde URL ilimitada',
      // Issue #2: alineado con el resto de la página (antes: "Cualquier plataforma con URL")
      'YouTube, SoundCloud, Bandcamp y más',
      'Multi-biblioteca',
    ],
    // R44 — pre-launch: "Notificarme" (sin oferta activa todavía).
    // launch: "Probar Pro" (ya se puede empezar a usar el plan).
    ctaLabel: PRE_LAUNCH ? 'Notificarme' : 'Probar Pro',
  },
  {
    name: 'Cloud',
    soonBadge: 'Próximamente',
    priceContent: (
      <>
        USD 10 <span>/ mes</span>
      </>
    ),
    description: 'Para sincronizar entre dispositivos y tener respaldo.',
    features: [
      'Todo lo del plan Pro',
      'Respaldo automático',
      'Sincronización entre dispositivos',
      'Acceso prioritario a novedades',
    ],
    // Cloud sigue "Próximamente" sin importar el modo de lanzamiento general.
    ctaLabel: 'Notificarme',
    ctaDisabled: true,
    soon: true,
  },
]

function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <div className="eyebrow">Planes</div>
      <h2>Empieza gratis.</h2>
      <p className="section-sub">Agrega más funciones cuando las necesites.</p>

      <div className={cardStyles.pricingGrid}>
        {plans.map((plan, i) => (
          <PricingCard key={plan.name} {...plan} delay={i * 150} />
        ))}
      </div>
    </section>
  )
}

export default Pricing
