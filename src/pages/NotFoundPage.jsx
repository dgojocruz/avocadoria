import { Link } from 'react-router-dom'
import SEO from '@/components/ui/SEO'
export default function NotFoundPage() {
  return (
    <>
      <SEO title="Page Not Found" noIndex={true} />
      <div className="page-enter min-h-[60vh] flex flex-col items-center justify-center text-center container-site py-20">
        <div className="text-8xl mb-6" aria-hidden="true">🥑</div>
        <h1 className="font-zing text-avo-olive text-h1 mb-4">Oops! This page is unripe.</h1>
        <p className="font-neue text-avo-brown mb-8 max-w-md">
          The page you are looking for does not exist. Maybe it got eaten already!
        </p>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    </>
  )
}
