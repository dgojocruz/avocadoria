import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import PageLoader from '@/components/ui/PageLoader'
import ScrollToTop from '@/components/ui/ScrollToTop'

// ─── Minimum loader display time ─────────────────────────────────────
// Increase this number (milliseconds) to show the loader longer.
// Decrease it to show the loader for less time.
// Set to 0 to disable — loader only shows while the page is downloading.
const MIN_LOADER_MS = 600

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const lazyMin = (importFn) => lazy(() =>
  Promise.all([importFn(), delay(MIN_LOADER_MS)]).then(([module]) => module)
)

// ─── Lazy-loaded pages ────────────────────────────────────────────────
const HomePage      = lazyMin(() => import('@/pages/HomePage'))
const OurStoresPage = lazyMin(() => import('@/pages/OurStoresPage'))
const AboutPage     = lazyMin(() => import('@/pages/AboutPage'))
const MenuPage      = lazyMin(() => import('@/pages/MenuPage'))
const FranchisePage = lazyMin(() => import('@/pages/FranchisePage'))
const PartyCartPage = lazyMin(() => import('@/pages/PartyCartPage'))
const CareersPage   = lazyMin(() => import('@/pages/CareersPage'))
const NotFoundPage  = lazyMin(() => import('@/pages/NotFoundPage'))

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index             element={<HomePage />} />
            <Route path="our-stores" element={<OurStoresPage />} />
            <Route path="about"      element={<AboutPage />} />
            <Route path="menu"       element={<MenuPage />} />
            <Route path="franchise"  element={<FranchisePage />} />
            <Route path="party-cart" element={<PartyCartPage />} />
            <Route path="careers"    element={<CareersPage />} />
            <Route path="*"          element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
