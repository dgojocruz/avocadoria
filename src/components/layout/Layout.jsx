import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import SocialSidebar from './SocialSidebar'
import FloatingWidgets from './FloatingWidgets'

/**
 * Root layout — wraps every page.
 * Structure:
 *   <Navbar />            — fixed top navigation
 *   <SocialSidebar />     — fixed left: sound toggle + social icons
 *   <main>
 *     <Outlet />          — page content renders here
 *   </main>
 *   <Footer />
 *   <FloatingWidgets />   — fixed right: GrabFood + Messenger buttons
 */
export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-avo-cream">
      <Navbar />
      <SocialSidebar />

      <main className="flex-1 pt-0">
        {/* pt-20 clears the fixed navbar height (80px) */}
        <Outlet />
      </main>

      <Footer />
      <FloatingWidgets />
    </div>
  )
}
