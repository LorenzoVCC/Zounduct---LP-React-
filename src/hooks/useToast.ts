import { useCallback, useState } from 'react'

export type ToastType = 'success' | 'error'

interface ToastState {
  message: string
  visible: boolean
  type: ToastType
}

/**
 * Equivalente a showToast() de script.js, pero con estado real de React
 * en vez de manipular className a mano. Mismo timing: se oculta sola a
 * los 4000ms.
 */
function useToast() {
  const [toast, setToast] = useState<ToastState>({
    message: '',
    visible: false,
    type: 'success',
  })

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    setToast({ message, visible: true, type })
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }))
    }, 4000)
  }, [])

  return { toast, showToast }
}

export default useToast
