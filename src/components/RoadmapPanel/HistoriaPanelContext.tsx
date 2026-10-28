import { createContext, useContext, useState, type ReactNode } from 'react'

interface HistoriaPanelContextValue {
  isOpen: boolean
  openPanel: () => void
  closePanel: () => void
}

const HistoriaPanelContext = createContext<HistoriaPanelContextValue | null>(null)

export function HistoriaPanelProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openPanel = () => setIsOpen(true)
  const closePanel = () => setIsOpen(false)

  return (
    <HistoriaPanelContext.Provider value={{ isOpen, openPanel, closePanel }}>
      {children}
    </HistoriaPanelContext.Provider>
  )
}

// El provider y su hook viven juntos a propósito (mismo contexto). La regla de Fast
// Refresh pide un componente por archivo; acá solo afecta al hot reload en dev.
// eslint-disable-next-line react-refresh/only-export-components
export function useHistoriaPanel() {
  const ctx = useContext(HistoriaPanelContext)
  if (!ctx) {
    throw new Error('useHistoriaPanel debe usarse dentro de HistoriaPanelProvider')
  }
  return ctx
}
