import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header, { AwardBar } from './Header'
import Footer from './Footer'

export default function Layout() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const t = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
      return () => window.clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return (
    <>
      <AwardBar />
      <Header />
      <main><Outlet /></main>
      <Footer />
    </>
  )
}
