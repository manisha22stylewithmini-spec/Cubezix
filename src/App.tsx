import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Placeholder from './pages/Placeholder'
import About from './pages/About'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import ServiceCategory from './pages/ServiceCategory'
import ItAmc from './pages/ItAmc'
import ServicePage from './pages/ServicePage'
import ServicesIndex from './pages/ServicesIndex'
import { CATEGORIES } from './data/services'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home-nova" element={<Navigate to="/" replace />} />
        <Route path="services" element={<ServicesIndex />} />
        {CATEGORIES.map((c) => <Route key={c.slug} path={`services/${c.slug}`} element={<ServiceCategory slug={c.slug} />} />)}
        <Route path="services/it-services/it-amc" element={<ItAmc />} />
        <Route path="services/:cat/:slug" element={<ServicePage />} />
        {/* older URLs */}
        <Route path="services/managed-it-and-support" element={<Navigate to="/services/it-services" replace />} />
        <Route path="services/security-and-surveillance" element={<Navigate to="/services/elv-security" replace />} />
        <Route path="services/cloud-and-productivity" element={<Navigate to="/services/it-infrastructure#microsoft-365" replace />} />
        <Route path="services/erp" element={<Navigate to="/services/business-applications" replace />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="career" element={<Careers />} />
        <Route path="careers" element={<Navigate to="/career" replace />} />
        <Route path="insights" element={<Navigate to="/blog" replace />} />
        <Route path="*" element={<Placeholder title="Page not found" />} />
      </Route>
    </Routes>
  )
}
