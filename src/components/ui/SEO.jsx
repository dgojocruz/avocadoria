import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Avocadoria'
const BASE_URL  = 'https://avocadoria.com.ph'
const DEFAULT_OG = `${BASE_URL}/og-image.jpg`

/**
 * SEO component — drop into any page for per-route meta tags.
 *
 * Usage:
 *   <SEO
 *     title="Our Menu"
 *     description="Explore our avocado-based desserts..."
 *     image="/og-menu.jpg"
 *     path="/menu"
 *   />
 */
export default function SEO({
  title,
  description = 'The home of the No. 1 avocado-based desserts in the Philippines. Real avocado treats that feel indulgent yet guilt-free.',
  image = DEFAULT_OG,
  path = '',
  noIndex = false,
}) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Home of No. 1 Avocado-Based Desserts`
  const canonical = `${BASE_URL}${path}`
  const ogImage   = image.startsWith('http') ? image : `${BASE_URL}${image}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:url"         content={canonical} />
      <meta property="og:type"        content="website" />
      <meta property="og:site_name"   content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={ogImage} />
    </Helmet>
  )
}
