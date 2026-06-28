/**
 * Modo de lanzamiento de la landing page.
 *
 * PRE_LAUNCH = true  -> la app todavía no está disponible para descargar.
 *                       CTAs apuntan a la lista de espera (#cta).
 * PRE_LAUNCH = false -> la app ya está disponible. CTAs apuntan a la
 *                       descarga real (S26/S27 deben estar resueltas).
 *
 * Se controla con la env var VITE_PRE_LAUNCH (definida en .env).
 * A diferencia del flag global mutable de la LP vieja (script.js,
 * `let PRE_LAUNCH = true` reasignado a mano antes de cada deploy),
 * este valor se fija en build time y no se reasigna en ningún lado del código.
 */
export const PRE_LAUNCH = import.meta.env.VITE_PRE_LAUNCH !== 'false'

/** URL real del instalador. Bloqueado hasta que S26/S27 (PyInstaller) estén listas. */
export const DOWNLOAD_URL =
  'https://github.com/LorenzoVCC/Zounduct/releases/latest/download/Zounduct-Setup.exe'
