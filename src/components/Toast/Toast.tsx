import type { ToastType } from '../../hooks/useToast'
import styles from './Toast.module.scss'

interface ToastProps {
  message: string
  visible: boolean
  type: ToastType
}

function Toast({ message, visible, type }: ToastProps) {
  return (
    <div
      className={`${styles.toast} ${visible ? styles.visible : ''} ${styles[type]}`}
      role="alert"
      aria-live="polite"
    >
      {message}
    </div>
  )
}

export default Toast
