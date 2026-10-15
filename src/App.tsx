import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Placeholder from './pages/Placeholder'
import ServiceCategory from './pages/ServiceCategory'
import ServicesIndex from './pages/ServicesIndex'
import { CATEGORIES } from './data/services'

const pages: [string, string][] = [
  ['about', 'About us'],
  ['blog', 'Blog'],
  ['contact', 'Contact us'],
  ['career', 'Career'],
]

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home-nova" element={<Navigate to="/" replace />} />
        <Route path="services" element={<ServicesIndex />} />
        {CATEGORIES.map((c) => <Route key={c.slug} path={`services/${c.slug}`} element={<ServiceCategory slug={c.slug} />} />)}
        {/* older URLs */}
        <Route path="services/managed-it-and-support" element={<Navigate to="/services/it-services" replace />} />
        <Route path="services/security-and-surveillance" element={<Navigate to="/services/elv-security" replace />} />
        <Route path="services/cloud-and-productivity" element={<Navigate to="/services/it-infrastructure#microsoft-365" replace />} />
        <Route path="services/erp" element={<Navigate to="/services/business-applications" replace />} />
        {pages.map(([path, title]) => <Route key={path} path={path} element={<Placeholder title={title} />} />)}
        <Route path="*" element={<Placeholder title="Page not found" />} />
      </Route>
    </Routes>
  )
}
