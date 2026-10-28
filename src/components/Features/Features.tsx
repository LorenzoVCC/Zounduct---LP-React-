import FeatureCard from './FeatureCard'
import styles from './Features.module.scss'

// Issue #2: las features cuentan lo que la app hace HOY (rama `features` de Sounduct).
// Se pasa de 3 a 8 tarjetas con el mismo FeatureCard: las 3 originales (corregidas) +
// 5 cosas que la app ya hace y la landing no contaba.
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
    title: 'Descarga multiplataforma',
    // Antes: "cualquier plataforma" — prometía de más. Nombramos las que la app sugiere.
    description: (
      <>
        Pegás un link de YouTube, SoundCloud, Bandcamp y más. Elegís MP3, WAV o AIFF.{' '}
        <strong>Cae directo en la carpeta correcta.</strong>
      </>
    ),
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
    description: (
      <>
        Nada se pierde en Descargas. Zounduct detecta cada track y{' '}
        <strong>te ofrece la carpeta correcta.</strong>
      </>
    ),
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
    title: 'Sync con pendrive',
    // Antes decía "Automático, siempre", que no es exacto: la app muestra el diff y el
    // usuario confirma (y el sync automático se puede proteger con PIN). Es mejor argumento.
    description: (
      <>
        Conectás el pendrive y Zounduct te muestra qué se agrega, qué se mueve y qué se borra.{' '}
        <strong>Nada cambia hasta que confirmás.</strong> Y si querés, lo protegés con un PIN.
      </>
    ),
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
    // La app los lee de los tags del archivo y los muestra como chips BPM / KEY / DUR.
    description: (
      <>
        Cada track muestra su BPM, su tonalidad y su duración, leídos de los tags.{' '}
        <strong>Los tenés a la vista mientras decidís dónde va.</strong>
      </>
    ),
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
    title: 'Escuchá antes de decidir',
    // Reproductor integrado + opción "escuchar antes de enviar" para descargas por link.
    description: (
      <>
        Reproductor integrado para escuchar cada track antes de moverlo. Y si querés, lo que bajás
        por link también pasa por ahí <strong>antes de elegir carpeta.</strong>
      </>
    ),
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
    title: 'Tus carpetas, sin salir de la app',
    description: (
      <>
        Creás, renombrás y borrás carpetas y subcarpetas desde Zounduct.{' '}
        <strong>Sin abrir el explorador.</strong>
      </>
    ),
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
    title: 'Descargas que no se rompen',
    // La app espera a que vuelva la conexión y retoma; los errores tienen títulos claros.
    description: (
      <>
        Si se corta internet, la descarga espera a que vuelva y sigue sola. Y si algo falla,{' '}
        <strong>te explica qué pasó en criollo.</strong>
      </>
    ),
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
    title: 'Tu música queda en tu PC',
    description: (
      <>
        Nada se sube a la nube. Tu biblioteca vive en tu PC y en tu pendrive.{' '}
        <strong>En ningún otro lado.</strong>
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
          <FeatureCard key={feature.number} {...feature} delay={(i % 4) * 120} />
        ))}
      </div>

      {/* Audience y Before/After se migran en R20 (ya hecho aparte) y R38-R41 respectivamente */}
    </section>
  )
}

export default Features
