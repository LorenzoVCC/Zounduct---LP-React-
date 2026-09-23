import { useState, type FormEvent } from 'react'
import type { ToastType } from '../../hooks/useToast'
import { useTrackEvent } from '../../hooks/useTrackEvent'

interface EmailFormProps {
  showToast: (message: string, type: ToastType) => void
  ctaLabel?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
}

function EmailForm({ showToast, ctaLabel = 'Sumate a la beta' }: EmailFormProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { trackEvent } = useTrackEvent()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!EMAIL_REGEX.test(email)) {
      showToast('Ingresá un email válido.', 'error')
      trackEvent('EmailSubmit', { resultado: 'error_validacion' })
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'beta', email }),
      })

      if (res.ok) {
        showToast('¡Listo! Te avisamos cuando Zounduct esté disponible.', 'success')
        setEmail('')
        trackEvent('EmailSubmit', { resultado: 'exito' })
      } else {
        showToast('Algo salió mal. Intentá de nuevo.', 'error')
        trackEvent('EmailSubmit', { resultado: 'error_servidor' })
      }
    } catch {
      showToast('Algo salió mal. Intentá de nuevo.', 'error')
      trackEvent('EmailSubmit', { resultado: 'error_red' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="cta-form" name="beta" onSubmit={handleSubmit} noValidate>
      <input
        type="email"
        name="email"
        aria-label="Tu email"
        autoComplete="email"
        placeholder="tu@email.com"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <button type="submit" className="btn btn-lg" disabled={loading}>
        {loading ? 'Enviando...' : ctaLabel}
      </button>
    </form>
  )
}

export default EmailForm
