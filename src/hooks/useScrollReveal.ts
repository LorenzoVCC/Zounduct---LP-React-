import { useEffect, useRef, useState } from 'react'

/**
 * Equivalente al revealObserver de script.js original:
 *   threshold: 0.12, rootMargin: '0px 0px -60px 0px'
 *   agrega .visible la primera vez que el elemento entra en viewport,
 *   y deja de observar (unobserve) — no se vuelve a animar al salir/entrar de nuevo.
 *
 * Uso: const { ref, visible } = useScrollReveal()
 *      <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
 */
function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

export default useScrollReveal
