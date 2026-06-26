import FeatureCard from './FeatureCard'
import styles from './Features.module.scss'

const features = [
  {
    number: '01',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
      </svg>
    ),
    title: 'Descarga multiplataforma',
    description: (
      <>
        Pegás un link de cualquier plataforma. Elegís formato.{' '}
        <strong>Cae directo en la carpeta correcta.</strong>
      </>
    ),
  },
  {
    number: '02',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Detección automática',
    description: (
      <>
        Nada se pierde en Descargas. Zounduct detecta cada track y{' '}
        <strong>te guía hasta la carpeta correcta.</strong>
      </>
    ),
  },
  {
    number: '03',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" />
      </svg>
    ),
    title: 'Sync con pendrive',
    description: (
      <>
        Lo que está en tu biblioteca, está en tu pendrive. Sin comparar archivos, sin copiar a
        mano. Conectás el USB y Zounduct hace el resto. <strong>Automático, siempre.</strong>
      </>
    ),
  },
]

function Features() {
  return (
    <section className="features" id="features">
      <div className="eyebrow">Cómo funciona</div>
      <h2>
        Tu flujo de descarga,
        <br />
        sin fricción.
      </h2>
      <p className="section-sub">
        Zounduct vive en el system tray. No abrís nada. Actúa cuando hay algo para hacer.
      </p>

      <div className={styles.featuresGrid}>
        {features.map((feature, i) => (
          <FeatureCard key={feature.number} {...feature} delay={i * 200} />
        ))}
      </div>

      {/* Audience y Before/After se migran en R20 (ya hecho aparte) y R38-R41 respectivamente */}
    </section>
  )
}

export default Features
