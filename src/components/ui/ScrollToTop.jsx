import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls to top of page whenever the route changes.
 * Place inside <BrowserRouter> in App.jsx.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
