import { useState } from 'react'
import Icon from './Icon'
import Eyebrow from './Eyebrow'

export type FaqBlock = ['p', string] | ['ul', string[]]
export interface FaqItem { q: string; a: string | FaqBlock[] }
export interface FaqCat { id: string; label: string; icon: string; heading: string; sub?: string }

/** The FAQ block of the home page (category rail on the left, accordion on the right),
    used on every page that has questions. */
export default function FaqSection({ cats, items, note = 'Straight answers', lede }: {
  cats: FaqCat[]
  items: Record<string, FaqItem[]>
  note?: string
  lede?: string
}) {
  const [catId, setCatId] = useState(cats[0].id)
  const [open, setOpen] = useState(`${cats[0].id}-0`)
  const cat = cats.find((c) => c.id === catId)!
  return (
    <section className="sec">
      <div className="sec-pad">
        <div className="center-head" style={{ marginBottom: 56 }}>
          <Eyebrow label="FAQs" note={note} />
          <h2 className="h2">Frequently asked questions</h2>
          {lede && <p className="lede">{lede}</p>}
        </div>
        <div className="faq-shell">
          <div className="faq-rail">
            <h3>FAQs</h3>
            <nav>
              {cats.map((c) => (
                <button key={c.id} type="button" className={`faq-cat${c.id === catId ? ' on' : ''}`} onClick={() => { setCatId(c.id); setOpen(`${c.id}-0`) }}>
                  <Icon name={c.icon} size={18} />{c.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="faq-main">
            <div>
              <h2>{cat.heading}</h2>
              {cat.sub && <p>{cat.sub}</p>}
            </div>
            <div className="faq-list">
              {items[catId].map((item, i) => {
                const key = `${catId}-${i}`
                const on = open === key
                return (
                  <div className="faq-item" key={key}>
                    <button type="button" className="faq-q" aria-expanded={on} onClick={() => setOpen(on ? '' : key)}>
                      {item.q}
                      <i><Icon name="chevron-down" size={17} /></i>
                    </button>
                    {on && (typeof item.a === 'string'
                      ? <p className="faq-a">{item.a}</p>
                      : <div className="faq-a">{item.a.map((b, k) => b[0] === 'p'
                          ? <p key={k} style={{ margin: k ? '12px 0 0' : 0 }}>{b[1]}</p>
                          : <ul key={k} style={{ margin: '12px 0 0', paddingLeft: 22 }}>{b[1].map((li, n) => <li key={n}>{li}</li>)}</ul>)}</div>)}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
