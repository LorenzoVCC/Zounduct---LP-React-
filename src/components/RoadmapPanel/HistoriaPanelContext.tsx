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

export function useHistoriaPanel() {
  const ctx = useContext(HistoriaPanelContext)
  if (!ctx) {
    throw new Error('useHistoriaPanel debe usarse dentro de HistoriaPanelProvider')
  }
  return ctx
}
