/**
 * Promo splash data.
 *
 * TODAY: promos live in the PROMOS array below. Edit, commit, push to staging.
 * LATER: replace the body of getActivePromo() with a fetch call when the
 * admin panel exists. Nothing else in the app changes.
 *
 * media options:
 *
 *   { type: 'image', src, alt }
 *       Static artwork from /public. Cheapest and most reliable.
 *
 *   { type: 'video', src, poster, alt, controls }
 *       Self-hosted MP4 from /public. Autoplays muted, loops, no
 *       third-party cookies, no letterboxing. Preferred for reels.
 *
 *   { type: 'facebook', href, ratio, crop, maxWidth }
 *       Facebook plugin embed. href = the plain reel URL, not the
 *       iframe markup. ratio = height / width (1.78 for 9:16).
 *       crop = scale factor to push FB's black bars outside the
 *       clipping wrapper; start at 1 and nudge up in 0.05 steps
 *       only if you see letterboxing. maxWidth caps desktop size.
 */

export const PROMOS = [
  {
    id: 'reel-promo-2026-08',
    title: null,
    body: null,
    media: {
      type: 'facebook',
      href: 'https://www.facebook.com/reel/27262381503458532/',
      ratio: 476 / 267,
      crop: 1,
      maxWidth: 340,
    },
    ctaLabel: 'See the menu',
    ctaHref: '/menu',
    startDate: null,
    endDate: null,
    // Held OFF for launch: Facebook's video plugin does not render Reels
    // correctly (black frame). Switch to the self-hosted MP4 entry below
    // once the file is in /public/videos/promos/, then flip this to true.
    active: false,
  },

  // Self-hosted version of the same reel — swap active flags to compare.
  {
    id: 'reel-promo-2026-08-mp4',
    media: {
      type: 'video',
      src: '/videos/promos/reel-2026-08.mp4',
      poster: '/videos/promos/reel-2026-08.webp',
      alt: 'Avocadoria promo reel',
      controls: true,
    },
    ctaLabel: 'See the menu',
    ctaHref: '/menu',
    active: false,
  },

  {
    id: 'image-promo-example',
    title: 'Something new is coming',
    body: 'Static-image promos still work — just swap the media block.',
    media: {
      type: 'image',
      src: '/images/promos/sample-promo.webp',
      alt: 'Avocadoria promotional artwork',
    },
    ctaLabel: 'See the menu',
    ctaHref: '/menu',
    active: false,
  },
]

/**
 * Builds the Facebook plugin URL at a specific pixel size.
 * Pass the reel's public URL — this handles the encoding.
 */
export function buildFacebookEmbedUrl(href, width, height) {
  const params = new URLSearchParams({
    href,
    width: String(width),
    height: String(height),
    show_text: 'false',
    t: '0',
  })
  return `https://www.facebook.com/plugins/video.php?${params.toString()}`
}

function isLive(promo, now) {
  if (!promo || promo.active === false) return false

  if (promo.startDate) {
    const start = new Date(`${promo.startDate}T00:00:00`)
    if (Number.isNaN(start.getTime()) || now < start) return false
  }

  if (promo.endDate) {
    const end = new Date(`${promo.endDate}T23:59:59`)
    if (Number.isNaN(end.getTime()) || now > end) return false
  }

  return true
}

/**
 * Returns the first live promo, or null when there is nothing to show.
 * Async on purpose so the swap to an admin/API source is a one-line change.
 */
export async function getActivePromo({ ignoreGates = false } = {}) {
  // Preview mode: return the first promo regardless of active/date gates.
  if (ignoreGates) return PROMOS[0] || null

  const now = new Date()
  return PROMOS.find((promo) => isLive(promo, now)) || null
}
