import { useEffect, useState } from 'react'

/**
 * Equivalente al listener de script.js:
 *   window.addEventListener('scroll', () => {
 *     nav.classList.toggle('scrolled', window.scrollY > 60)
 *   })
 * Devuelve true cuando el scroll pasó los 60px, para que el componente
 * decida si aplica el estilo "scrolled".
 */
function useScrollNav(threshold = 60) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}

export default useScrollNav
