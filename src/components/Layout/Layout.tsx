import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

/**
 * Wrapper general de la app. Los divs de fondo (bg-glow, bg-grid, bg-noise)
 * usan clases GLOBALES definidas en src/styles/_base.scss (migradas en R05),
 * no un SCSS module propio — son decoración de toda la página, no de este
 * componente en particular.
 */
function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="bg-glow" />
      <div className="bg-grid" />
      <div className="bg-noise" />

      {children}
    </>
  )
}

export default Layout
