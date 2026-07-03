import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import PageLoader from '@/components/ui/PageLoader'
import ScrollToTop from '@/components/ui/ScrollToTop'
import { usePageTracking } from '@/hooks/usePageTracking'

const MIN_LOADER_MS = 300
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const lazyMin = (importFn) => lazy(() =>
  Promise.all([importFn(), delay(MIN_LOADER_MS)]).then(([module]) => module)
)

const HomePage      = lazyMin(() => import('@/pages/HomePage'))
const OurStoresPage = lazyMin(() => import('@/pages/OurStoresPage'))
const AboutPage     = lazyMin(() => import('@/pages/AboutPage'))
const MenuPage      = lazyMin(() => import('@/pages/MenuPage'))
const FranchisePage = lazyMin(() => import('@/pages/FranchisePage'))
const PartyCartPage = lazyMin(() => import('@/pages/PartyCartPage'))
const CareersPage   = lazyMin(() => import('@/pages/CareersPage'))
const CareersJobPage = lazyMin(() => import('@/pages/CareersJobPage'))
const NotFoundPage     = lazyMin(() => import('@/pages/NotFoundPage'))
const VideoGalleryPage = lazyMin(() => import('@/pages/VideoGalleryPage'))
const ImageGalleryPage = lazyMin(() => import('@/pages/ImageGalleryPage'))

function AnalyticsTracker() {
  usePageTracking()
  return null
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AnalyticsTracker />
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index             element={<HomePage />} />
            <Route path="our-stores" element={<OurStoresPage />} />
            <Route path="about"      element={<AboutPage />} />
            <Route path="menu"       element={<MenuPage />} />
            <Route path="franchise"  element={<FranchisePage />} />
            <Route path="events"     element={<PartyCartPage />} />
            <Route path="party-cart" element={<PartyCartPage />} />
            <Route path="careers"        element={<CareersPage />} />
            <Route path="careers/:jobId" element={<CareersJobPage />} />
            <Route path="gallery/videos" element={<VideoGalleryPage />} />
            <Route path="gallery/photos" element={<ImageGalleryPage />} />
            <Route path="*"              element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}