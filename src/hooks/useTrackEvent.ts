const BACKEND_URL = 'https://zounduct-backend.onrender.com';

export function useTrackEvent() {
  const trackEvent = async (tipo: string, payload: Record<string, unknown> = {}) => {
    try {
      await fetch(`${BACKEND_URL}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo, pagina: window.location.pathname, payload: JSON.stringify(payload) }),
      });
    } catch {
      // Silencioso — el tracking nunca debe romper la UI
    }
  };

  return { trackEvent };
}