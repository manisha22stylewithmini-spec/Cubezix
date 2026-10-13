import { Link } from 'react-router-dom'

/** Section eyebrow used across the whole page: live dot, bold label, divider, supporting note, arrow. */
export default function Eyebrow({
  label,
  note,
  to,
  tag,
  className = '',
}: {
  label: string
  note?: string
  to?: string
  tag?: string
  className?: string
}) {
  const inner = (
    <>
      {tag ? (
        <span className="eb-tag">{tag}</span>
      ) : (
        <span className="eb-dot" aria-hidden />
      )}
      <span className="eb-label">{label}</span>
      {note && (
        <>
          <i aria-hidden className="eb-sep" />
          <span className="eb-note">{note}</span>
        </>
      )}
      <svg className="eb-arrow" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M3 8h9M8.5 4l4 4-4 4" />
      </svg>
    </>
  )
  return to ? <Link to={to} className={`eb ${className}`}>{inner}</Link> : <div className={`eb ${className}`}>{inner}</div>
}
