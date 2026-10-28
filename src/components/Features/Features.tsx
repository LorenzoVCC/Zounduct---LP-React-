import FeatureCard from './FeatureCard'
import styles from './Features.module.scss'

// Issue #2: las features cuentan lo que la app hace HOY (rama `features` de Sounduct).
// Copy neutro (vuelta 2): frases cortas, sin voseo y sin negritas en medio de la frase.
// La 08 no dice "nada se sube a la nube": hay un plan Cloud y una plataforma a futuro.
const features = [
  {
    number: '01',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
      </svg>
    ),
    title: 'Descarga por enlace',
    description:
      'Pega un enlace de YouTube, SoundCloud o Bandcamp, elige el formato y el track llega directo a su carpeta.',
  },
  {
    number: '02',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Detección automática',
    description: 'Cada archivo nuevo en Descargas se detecta al instante, listo para clasificar.',
  },
  {
    number: '03',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" />
      </svg>
    ),
    title: 'Sincronización con USB',
    description:
      'Al conectarlo, ves qué se agrega, mueve o elimina. Nada cambia sin tu confirmación. PIN opcional.',
  },
  {
    number: '04',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: 'BPM, tonalidad y duración',
    description:
      'Leídos de las etiquetas del archivo y visibles mientras decides dónde va cada track.',
  },
  {
    number: '05',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 18v-6a9 9 0 0118 0v6" />
        <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
      </svg>
    ),
    title: 'Preescucha integrada',
    description: 'Escucha cada track antes de moverlo, incluso los que descargaste por enlace.',
  },
  {
    number: '06',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
        <path d="M12 11v6M9 14h6" />
      </svg>
    ),
    title: 'Gestión de carpetas',
    description: 'Crea, renombra y elimina carpetas y subcarpetas desde la misma ventana.',
  },
  {
    number: '07',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M23 4v6h-6" />
        <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
      </svg>
    ),
    title: 'Descargas confiables',
    description:
      'Si se corta la conexión, la descarga se reanuda sola. Si algo falla, un mensaje claro indica qué hacer.',
  },
  {
    number: '08',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: 'Tu biblioteca, bajo tu control',
    description:
      'Tus archivos están en tu equipo y en tu USB. Nada sale de ahí sin que lo decidas.',
  },
]

function Features() {
  return (
    <section className="features" id="features">
      <div className="eyebrow">Cómo funciona</div>
      <h2>
        Tu flujo de trabajo,
        <br />
        sin fricción.
      </h2>
      <p className="section-sub">
        Zounduct funciona en segundo plano desde la bandeja del sistema y aparece solo cuando hay
        algo que clasificar.
      </p>

      <div className={styles.featuresGrid}>
        {features.map((feature, i) => (
          <FeatureCard key={feature.number} {...feature} delay={(i % 4) * 120} />
        ))}
      </div>

      {/* Audience y Before/After se migran en R20 (ya hecho aparte) y R38-R41 respectivamente */}
    </section>
  )
}

export default Features
