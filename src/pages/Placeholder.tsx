import { Link } from 'react-router-dom'
import Eyebrow from '../components/Eyebrow'

export default function Placeholder({ title }: { title: string }) {
  return (
    <section className="sec">
      <div className="sec-pad center-head" style={{ minHeight: '50vh', justifyContent: 'center' }}>
        <Eyebrow label="Coming next" note="Page in progress" />
        <h1 className="h2">{title}</h1>
        <p className="lede">This page is designed in the source files and hasn't been converted yet.</p>
        <Link to="/" className="btn btn-primary">Back to home</Link>
      </div>
    </section>
  )
}
