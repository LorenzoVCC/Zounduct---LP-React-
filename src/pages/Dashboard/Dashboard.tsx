import { useState, useEffect, type JSX } from 'react'

const BACKEND_URL = 'https://zounduct-backend.onrender.com'
const PASSWORD = import.meta.env.VITE_DASHBOARD_PASSWORD as string

interface Summary {
  porTipo: Record<string, number>
  porDia: Record<string, number>
  porTipoPorDia: Record<string, Record<string, number>>
}

interface RawEvent {
  tipo: string
  payload: string
  timestamp: string
}

const TIPO_LABELS: Record<string, string> = {
  PageView: 'Vistas de página',
  DescargarGratis: 'Descargar gratis',
  EmailSubmit: 'Envío de email',
  ScrollDepth: 'Profundidad de scroll',
  PricingCardClick: 'Click en plan',
}

// --- Agrupación de tipos de evento por etapa del funnel ---
const GROUPS: { key: string; label: string; icon: JSX.Element; tipos: string[] }[] = [
  {
    key: 'interes',
    label: 'Interés',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    tipos: ['PageView', 'ScrollDepth'],
  },
  {
    key: 'lead',
    label: 'Lead',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16v16H4z" />
        <path d="m4 4 8 8 8-8" />
      </svg>
    ),
    tipos: ['EmailSubmit'],
  },
  {
    key: 'intencion',
    label: 'Intención de compra',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </svg>
    ),
    tipos: ['DescargarGratis', 'PricingCardClick'],
  },
]

const CHART_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="M18 17V9M13 17V5M8 17v-3" />
  </svg>
)

// --- Helpers de series temporales ---

function lastNDays(n: number): string[] {
  const out: string[] = []
  const today = new Date()
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    out.push(d.toISOString().slice(0, 10))
  }
  return out
}

function seriesForTipo(porTipoPorDia: Record<string, Record<string, number>>, tipo: string, days: string[]): number[] {
  const porDia = porTipoPorDia[tipo] ?? {}
  return days.map((d) => porDia[d] ?? 0)
}

function sumSeries(series: number[]): number {
  return series.reduce((a, b) => a + b, 0)
}

function porDiaInRange(porTipoPorDia: Record<string, Record<string, number>>, days: string[]): Record<string, number> {
  const out: Record<string, number> = {}
  for (const d of days) {
    let total = 0
    for (const tipo of Object.keys(porTipoPorDia)) {
      total += porTipoPorDia[tipo]?.[d] ?? 0
    }
    if (total > 0) out[d] = total
  }
  return out
}

function formatPayload(payload: string): string {
  try {
    const obj = JSON.parse(payload)
    return Object.entries(obj)
      .map(([k, v]) => `${k}: ${v}`)
      .join(' · ')
  } catch {
    return payload
  }
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'ahora'
  if (mins < 60) return `hace ${mins}m`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `hace ${hours}h`
  const days = Math.floor(hours / 24)
  return `hace ${days}d`
}

function variation(series: number[]): { pct: number; direction: 'up' | 'down' | 'flat' } | null {
  const half = Math.floor(series.length / 2)
  const prev = series.slice(0, half).reduce((a, b) => a + b, 0)
  const curr = series.slice(half).reduce((a, b) => a + b, 0)
  if (prev === 0) return null
  const pct = ((curr - prev) / prev) * 100
  return { pct, direction: pct > 0.5 ? 'up' : pct < -0.5 ? 'down' : 'flat' }
}

function Sparkline({ series }: { series: number[] }) {
  const max = Math.max(...series, 1)
  const w = 100
  const h = 28
  const step = series.length > 1 ? w / (series.length - 1) : 0
  const points = series
    .map((v, i) => `${(i * step).toFixed(1)},${(h - (v / max) * (h - 4) - 2).toFixed(1)}`)
    .join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none" style={{ display: 'block' }}>
      <polyline points={points} fill="none" stroke="#8B53FF" strokeWidth="2" />
    </svg>
  )
}

function TrendBadge({ v }: { v: { pct: number; direction: 'up' | 'down' | 'flat' } | null }) {
  if (!v) return <p style={s.trendNeutral}>sin datos previos</p>
  const color = v.direction === 'up' ? s.trendUp : v.direction === 'down' ? s.trendDown : s.trendNeutral
  const arrow = v.direction === 'up' ? '↑' : v.direction === 'down' ? '↓' : '→'
  return <p style={color}>{arrow} {Math.abs(v.pct).toFixed(1)}%</p>
}

function Login({ onLogin }: { onLogin: () => void }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  function handleLogin() {
    if (input === PASSWORD) { onLogin(); setError(false) }
    else setError(true)
  }

  return (
    <div style={s.loginPage}>
      <div style={s.bgGlow} />
      <div style={s.bgGrid} />
      <div style={s.loginCard}>
        <div style={s.loginLogo}>
          <span style={s.loginLogoText}>Zounduct</span>
          <span style={s.loginLogoDot}>.</span>
        </div>
        <p style={s.loginSub}>Dashboard interno · Métricas de la LP</p>
        <input
          type="password"
          placeholder="Password"
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(false) }}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          style={{ ...s.loginInput, ...(error ? s.loginInputError : {}) }}
          autoFocus
        />
        {error && <p style={s.errorMsg}>Password incorrecta</p>}
        <button onClick={handleLogin} style={s.loginBtn}>
          Entrar
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

const DISPLAY_LIMIT = 6

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

const RANGE_OPTIONS = [
  { value: 7, label: 'Últimos 7 días' },
  { value: 14, label: 'Últimos 14 días' },
  { value: 30, label: 'Últimos 30 días' },
]

function RangeDropdown({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [open, setOpen] = useState(false)
  const current = RANGE_OPTIONS.find((o) => o.value === value)

  return (
    <div style={s.dropdownWrap} tabIndex={0} onBlur={() => setOpen(false)}>
      <button type="button" onClick={() => setOpen((o) => !o)} style={s.dropdownBtn}>
        {current?.label}
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div style={s.dropdownMenu}>
          <style>{`.zounduct-dd-item:hover { background: rgba(139,83,255,0.12); color: #fff; }`}</style>
          {RANGE_OPTIONS.map((opt) => (
            <div
              key={opt.value}
              className="zounduct-dd-item"
              onMouseDown={(e) => { e.preventDefault(); onChange(opt.value); setOpen(false) }}
              style={{ ...s.dropdownItem, ...(opt.value === value ? s.dropdownItemActive : {}) }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function MetricItem({ label, value, series, days, isFirst }: { label: string; value: string | number; series: number[]; days: string[]; isFirst: boolean }) {
  const [open, setOpen] = useState(false)
  const v = variation(series)
  const nonZero = days.map((d, i) => ({ d, count: series[i] })).filter((x) => x.count > 0).reverse()

  return (
    <div style={{ ...s.metricItem, ...(isFirst ? {} : s.metricItemBorder) }}>
      <div style={s.metricRowInner}>
        <div style={s.metricText}>
          <div style={s.metricLabel}>{label}</div>
          <div style={s.metricValue}>{value}</div>
          <TrendBadge v={v} />
        </div>
        <div style={s.metricChart}>
          <Sparkline series={series} />
        </div>
        <button onClick={() => setOpen((o) => !o)} style={s.expandBtn} aria-label={`Ver detalle de ${label}`}>
          <ChevronIcon open={open} />
        </button>
      </div>
      <div style={{ ...s.detailList, ...(open ? s.detailListOpen : {}) }}>
        {nonZero.length === 0 && <div style={s.detailEmpty}>Sin eventos en los últimos {days.length} días</div>}
        {nonZero.map(({ d, count }) => (
          <div key={d} style={s.detailListRow}>
            <span>{d}</span>
            <span style={s.detailListCount}>{count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SectionHeader({ icon, label }: { icon: JSX.Element; label: string }) {
  return (
    <div style={s.sectionHeader}>
      <span style={s.sectionIcon}>{icon}</span>
      <span style={s.sectionTitle}>{label}</span>
    </div>
  )
}

function BarChart({ data }: { data: Record<string, number> }) {
  const entries = Object.entries(data).sort(([a], [b]) => a.localeCompare(b))
  const max = Math.max(...entries.map(([, v]) => v), 1)
  return (
    <div style={s.chartWrap}>
      {entries.map(([dia, count]) => (
        <div key={dia} style={s.barRow}>
          <span style={s.barLabel}>{dia}</span>
          <div style={s.barTrack}>
            <div style={{ ...s.barFill, width: `${(count / max) * 100}%` }} />
          </div>
          <span style={s.barCount}>{count}</span>
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const [authed, setAuthed] = useState(false)
  const [summary, setSummary] = useState<Summary | null>(null)
  const [recent, setRecent] = useState<RawEvent[]>([])
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)
  const [rangeDays, setRangeDays] = useState(14)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  useEffect(() => {
    if (!authed) return
    setLoading(true)
    Promise.all([
      fetch(`${BACKEND_URL}/api/events/summary`).then((r) => r.json()),
      fetch(`${BACKEND_URL}/api/events/recent?limit=50`).then((r) => r.json()),
    ])
      .then(([summaryData, recentData]) => {
        setSummary(summaryData)
        setRecent(recentData)
        setLastUpdated(new Date().toLocaleTimeString('es-AR'))
      })
      .catch(() => { setSummary(null); setRecent([]) })
      .finally(() => setLoading(false))
  }, [authed])

  if (!authed) return <Login onLogin={() => setAuthed(true)} />

  const days = lastNDays(rangeDays)
  const porDiaFiltrado = summary ? porDiaInRange(summary.porTipoPorDia, days) : {}
  const totalEvents = Object.values(porDiaFiltrado).reduce((a, b) => a + b, 0)

  return (
    <div style={s.page}>
      <div style={s.bgGlow} />
      <div style={s.bgGrid} />
      <div style={s.inner}>
        <header style={s.header}>
          <div>
            <div style={s.loginLogo}>
              <span style={s.loginLogoText}>Zounduct</span>
              <span style={s.loginLogoDot}>.</span>
            </div>
            <p style={s.headerSub}>Dashboard de métricas</p>
          </div>
          <div style={s.headerMeta}>
            {lastUpdated && <span style={s.lastUpdated}>Actualizado a las {lastUpdated}</span>}
            <RangeDropdown value={rangeDays} onChange={setRangeDays} />
            <div style={s.totalBadge}>{totalEvents} eventos</div>
          </div>
        </header>

        <div style={s.divider} />

        {loading && (
          <div style={s.loadingWrap}>
            <span style={s.loadingText}>Cargando datos...</span>
          </div>
        )}

        {summary && (
          <div style={s.mainGrid}>
            <div style={s.mainCol}>
              {GROUPS.map((group) => {
                const showConversion = group.key === 'lead'
                const pageViewSeries = seriesForTipo(summary.porTipoPorDia, 'PageView', days)
                const emailSeries = seriesForTipo(summary.porTipoPorDia, 'EmailSubmit', days)
                const pageViewsTotal = sumSeries(pageViewSeries)
                const emailSubmitsTotal = sumSeries(emailSeries)
                const conversionPct = pageViewsTotal > 0 ? (emailSubmitsTotal / pageViewsTotal) * 100 : 0
                const conversionSeries = pageViewSeries.map((pv, i) => (pv > 0 ? (emailSeries[i] / pv) * 100 : 0))

                return (
                  <div key={group.key} style={s.section}>
                    <SectionHeader icon={group.icon} label={group.label} />
                    <div style={s.panel}>
                      <div style={s.metricRow}>
                        {group.tipos.map((tipo, i) => {
                          const series = seriesForTipo(summary.porTipoPorDia, tipo, days)
                          return (
                            <MetricItem
                              key={tipo}
                              label={TIPO_LABELS[tipo] ?? tipo}
                              value={sumSeries(series)}
                              series={series}
                              days={days}
                              isFirst={i === 0}
                            />
                          )
                        })}
                        {showConversion && (
                          <MetricItem
                            label="Tasa de conversión"
                            value={`${conversionPct.toFixed(1)}%`}
                            series={conversionSeries}
                            days={days}
                            isFirst={false}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}

              <div style={s.section}>
                <SectionHeader icon={CHART_ICON} label="Actividad por día" />
                <div style={s.panel}>
                  <BarChart data={porDiaFiltrado} />
                </div>
              </div>
            </div>

            <aside style={s.asideCol}>
              <SectionHeader icon={CHART_ICON} label="Detalle" />
              <div style={s.asidePanel}>
                <div style={s.filterRow}>
                  <button
                    onClick={() => setActiveFilter(null)}
                    style={{ ...s.filterPill, ...(activeFilter === null ? s.filterPillActive : {}) }}
                  >
                    Todos
                  </button>
                  {Object.keys(TIPO_LABELS).map((tipo) => (
                    <button
                      key={tipo}
                      onClick={() => setActiveFilter(tipo)}
                      style={{ ...s.filterPill, ...(activeFilter === tipo ? s.filterPillActive : {}) }}
                    >
                      {TIPO_LABELS[tipo]}
                    </button>
                  ))}
                </div>
                <div style={s.recentList}>
                  {recent
                    .filter((ev) => !activeFilter || ev.tipo === activeFilter)
                    .slice(0, DISPLAY_LIMIT)
                    .map((ev, i) => (
                      <div key={i} style={s.recentRow}>
                        <div style={s.recentText}>
                          <div style={s.recentLabel}>{TIPO_LABELS[ev.tipo] ?? ev.tipo}</div>
                          <div style={s.recentPayload}>{formatPayload(ev.payload)}</div>
                        </div>
                        <div style={s.recentTime}>{timeAgo(ev.timestamp)}</div>
                      </div>
                    ))}
                  {recent.filter((ev) => !activeFilter || ev.tipo === activeFilter).length === 0 && (
                    <div style={s.detailEmpty}>Sin eventos para este filtro</div>
                  )}
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}

const VIOLET = '#8B53FF'
const BG = '#0a0814'
const SURFACE = 'rgba(139,83,255,0.06)'
const BORDER = 'rgba(139,83,255,0.15)'

const s: Record<string, React.CSSProperties> = {
  loginPage: {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: BG, fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
    position: 'relative', overflow: 'hidden',
  },
  bgGlow: {
    position: 'fixed', top: '-20%', left: '50%', transform: 'translateX(-50%)',
    width: '800px', height: '600px',
    background: 'radial-gradient(ellipse at center, rgba(139,83,255,0.18) 0%, rgba(107,47,255,0.08) 40%, transparent 70%)',
    filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
  },
  bgGrid: {
    position: 'fixed', inset: 0,
    backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
    backgroundSize: '50px 50px',
    maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 80%)',
    pointerEvents: 'none', zIndex: 0,
  },
  loginCard: {
    position: 'relative', zIndex: 1,
    background: 'rgba(20,14,40,0.9)', border: `1px solid ${BORDER}`, borderRadius: '20px',
    padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem',
    minWidth: '340px', backdropFilter: 'blur(20px)', boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
  },
  loginLogo: { display: 'flex', alignItems: 'baseline', gap: '2px' },
  loginLogoText: {
    fontSize: '1.5rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em',
    fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
  },
  loginLogoDot: { fontSize: '1.5rem', fontWeight: 700, color: VIOLET },
  loginSub: { fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', margin: 0 },
  loginInput: {
    padding: '0.85rem 1rem', borderRadius: '10px', border: `1px solid ${BORDER}`,
    background: 'rgba(139,83,255,0.05)', color: '#fff', fontSize: '0.95rem',
    outline: 'none', fontFamily: 'inherit',
  },
  loginInputError: { borderColor: '#ff6b6b' },
  errorMsg: { color: '#ff6b6b', fontSize: '0.82rem', margin: 0 },
  loginBtn: {
    padding: '0.85rem 1.5rem', borderRadius: '10px', border: 'none',
    background: `linear-gradient(135deg, ${VIOLET} 0%, #6B33EF 100%)`,
    color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem',
    fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: '0.5rem', boxShadow: '0 4px 24px rgba(139,83,255,0.35)',
  },
  page: {
    minHeight: '100vh', background: BG,
    fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
    position: 'relative', overflow: 'hidden', color: '#fff',
  },
  inner: { position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto', padding: '1rem 2rem' },
  header: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.75rem' },
  headerSub: { fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', margin: '0.15rem 0 0 0' },
  headerMeta: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.6rem' },
  lastUpdated: { fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' },
  totalBadge: {
    fontSize: '0.8rem', fontWeight: 600, color: VIOLET,
    background: 'rgba(139,83,255,0.1)', border: `1px solid ${BORDER}`,
    borderRadius: '20px', padding: '0.3rem 0.85rem',
  },
  rangeSelect: {
    fontSize: '0.8rem', fontWeight: 500, color: '#fff',
    background: 'rgba(139,83,255,0.08)', border: `1px solid ${BORDER}`,
    borderRadius: '8px', padding: '0.35rem 0.6rem',
    fontFamily: 'inherit', cursor: 'pointer', outline: 'none',
  },
  dropdownWrap: { position: 'relative', outline: 'none' },
  dropdownBtn: {
    display: 'flex', alignItems: 'center', gap: '0.4rem',
    fontSize: '0.8rem', fontWeight: 500, color: '#fff',
    background: 'rgba(139,83,255,0.08)', border: `1px solid ${BORDER}`,
    borderRadius: '8px', padding: '0.4rem 0.7rem',
    fontFamily: 'inherit', cursor: 'pointer', outline: 'none',
  },
  dropdownMenu: {
    position: 'absolute', top: 'calc(100% + 6px)', right: 0, zIndex: 20,
    background: '#150f28', border: `1px solid ${BORDER}`, borderRadius: '10px',
    minWidth: '160px', overflow: 'hidden', boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
  },
  dropdownItem: {
    fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', padding: '0.55rem 0.8rem',
    cursor: 'pointer', whiteSpace: 'nowrap' as const,
  },
  dropdownItemActive: { background: 'rgba(139,83,255,0.15)', color: '#fff', fontWeight: 600 },
  divider: { height: '1px', background: BORDER, marginBottom: '0.9rem' },
  loadingWrap: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 0' },
  loadingText: { color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' },
  section: { marginBottom: '0.7rem' },
  sectionHeader: {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    paddingBottom: '0.35rem', marginBottom: '0.45rem',
    borderBottom: `1px solid ${BORDER}`,
  },
  sectionIcon: { color: VIOLET, display: 'flex', alignItems: 'center' },
  sectionTitle: { fontSize: '0.88rem', fontWeight: 600, color: '#fff' },
  metricRow: { display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' },
  metricItem: {
    display: 'flex', flexDirection: 'column',
    flex: '1 1 180px', padding: '0.2rem 1.1rem',
  },
  metricItemBorder: { borderLeft: `1px solid ${BORDER}` },
  metricRowInner: { display: 'flex', alignItems: 'center', gap: '0.85rem' },
  metricText: { minWidth: '78px', flexShrink: 0 },
  metricLabel: { fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', marginBottom: '0.15rem', whiteSpace: 'nowrap' },
  metricValue: { fontSize: '1.35rem', fontWeight: 700, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em' },
  metricChart: { flex: 1, minWidth: '50px', height: '30px' },
  expandBtn: {
    background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)',
    cursor: 'pointer', padding: '0.3rem', display: 'flex', alignItems: 'center',
    flexShrink: 0, borderRadius: '6px',
  },
  detailList: {
    marginTop: '0', paddingTop: '0', borderTop: '1px solid transparent',
    display: 'flex', flexDirection: 'column', gap: '0.3rem',
    maxHeight: '0px', opacity: 0, overflow: 'hidden',
    transition: 'max-height 0.3s ease, opacity 0.25s ease, margin-top 0.3s ease, padding-top 0.3s ease, border-color 0.3s ease',
  },
  detailListOpen: {
    marginTop: '0.6rem', paddingTop: '0.5rem', borderTop: `1px solid ${BORDER}`,
    maxHeight: '320px', opacity: 1,
  },
  detailListRow: { display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' },
  detailListCount: { color: VIOLET, fontWeight: 600 },
  detailEmpty: { fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' },
  trendUp: { fontSize: '0.68rem', color: '#4ADE80', margin: '0.2rem 0 0' },
  trendDown: { fontSize: '0.68rem', color: '#FF5353', margin: '0.2rem 0 0' },
  trendNeutral: { fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', margin: '0.2rem 0 0' },
  mainGrid: { display: 'grid', gridTemplateColumns: '2.3fr 1fr', gap: '1.25rem', alignItems: 'stretch' },
  mainCol: { display: 'flex', flexDirection: 'column' },
  asideCol: { display: 'flex', flexDirection: 'column' },
  asidePanel: { background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '0.9rem 1rem', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 },
  filterRow: { display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' },
  filterPill: {
    fontSize: '0.68rem', fontWeight: 500, color: 'rgba(255,255,255,0.5)',
    background: 'transparent', border: `1px solid ${BORDER}`, borderRadius: '999px',
    padding: '0.25rem 0.6rem', cursor: 'pointer', fontFamily: 'inherit',
  },
  filterPillActive: { background: 'rgba(139,83,255,0.18)', color: '#fff', borderColor: VIOLET },
  recentList: {
    display: 'flex', flexDirection: 'column', gap: '0.6rem',
  },
  recentRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.6rem',
    paddingBottom: '0.65rem', borderBottom: `1px solid ${BORDER}`,
  },
  recentText: { minWidth: 0 },
  recentLabel: { fontSize: '0.82rem', fontWeight: 600, color: '#fff', marginBottom: '0.15rem' },
  recentPayload: {
    fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)',
    overflowWrap: 'break-word' as const, wordBreak: 'break-word' as const,
  },
  recentTime: { fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', flexShrink: 0, whiteSpace: 'nowrap' as const },
  panel: { background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '0.65rem 0.9rem' },
  chartWrap: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  barRow: { display: 'flex', alignItems: 'center', gap: '0.6rem' },
  barLabel: { fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', width: '90px', flexShrink: 0 },
  barTrack: { flex: 1, height: '6px', background: 'rgba(139,83,255,0.12)', borderRadius: '3px', overflow: 'hidden' },
  barFill: {
    height: '100%', background: `linear-gradient(90deg, ${VIOLET}, #c4a8ff)`,
    borderRadius: '3px', transition: 'width 0.8s cubic-bezier(0.16,1,0.3,1)',
  },
  barCount: { fontSize: '0.82rem', color: '#fff', width: '28px', textAlign: 'right', fontWeight: 600 },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: {
    padding: '0 0 0.5rem', fontSize: '0.68rem', color: 'rgba(255,255,255,0.3)',
    borderBottom: `1px solid ${BORDER}`, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500,
  },
  td: {
    padding: '0.45rem 0', fontSize: '0.85rem',
    borderBottom: 'rgba(139,83,255,0.07) 1px solid', color: 'rgba(255,255,255,0.8)',
  },
}
