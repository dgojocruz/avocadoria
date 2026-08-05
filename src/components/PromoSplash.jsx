import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getActivePromo, buildFacebookEmbedUrl } from '@/data/promos'
import './PromoSplash.css'

const STORAGE_KEY = 'avocadoria_dismissed_promos'
const OPEN_DELAY_MS = 900

/**
 * Preview mode. Add ?promo=force to any homepage URL to bypass the
 * dismissal record and the active/date gates — useful for showing the
 * client a promo before it goes live, and for repeat testing.
 * Nothing is written to storage while forcing.
 */
function isForced() {
  try {
    return new URLSearchParams(window.location.search).get('promo') === 'force'
  } catch {
    return false
  }
}

// Facebook's plugin refuses to render below 220px wide.
const MIN_EMBED_WIDTH = 220

function readDismissed() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function markDismissed(id) {
  try {
    const next = Array.from(new Set([...readDismissed(), id])).slice(-25)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    /* storage disabled — splash reappears next visit */
  }
}

function track(event, promo, extra = {}) {
  if (typeof window.gtag !== 'function') return
  window.gtag('event', event, {
    promo_id: promo.id,
    promo_title: promo.title || promo.id,
    ...extra,
  })
}

/**
 * Largest embed that fits the current viewport on BOTH axes.
 * Recomputed on resize and orientation change, so a laptop window
 * drag or a phone rotation re-fits instead of overflowing.
 */
function fitEmbed(media, hasCopy) {
  const ratio = media.ratio || 16 / 9
  const maxWidth = media.maxWidth || 340

  // Room taken by the CTA block and the modal's outer breathing space.
  const chrome = (hasCopy ? 104 : 0) + 48

  // visualViewport tracks the real usable area on mobile once the
  // browser's address bar collapses. innerHeight lags behind it.
  const vh = window.visualViewport?.height || window.innerHeight
  const vw = window.visualViewport?.width || window.innerWidth

  const byWidth = Math.min(vw - 32, maxWidth)
  const byHeight = (vh * 0.9 - chrome) / ratio

  const width = Math.max(MIN_EMBED_WIDTH, Math.floor(Math.min(byWidth, byHeight)))
  return { width, height: Math.round(width * ratio) }
}

export default function PromoSplash() {
  const [promo, setPromo] = useState(null)
  const [open, setOpen] = useState(false)
  const [embed, setEmbed] = useState(null)
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const lastFocusedRef = useRef(null)

  const forced = isForced()

  useEffect(() => {
    let cancelled = false
    let timer

    getActivePromo({ ignoreGates: forced })
      .then((found) => {
        if (cancelled || !found) return
        if (!forced && readDismissed().includes(found.id)) return
        setPromo(found)
        timer = window.setTimeout(() => !cancelled && setOpen(true), OPEN_DELAY_MS)
      })
      .catch(() => {})

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [forced])

  const media = promo?.media || {}
  const isVideo = media.type === 'facebook'
  const hasCta = Boolean(promo?.ctaLabel && promo?.ctaHref)
  const hasCopy = Boolean(promo?.title || promo?.body || hasCta)

  // Live re-fit. Debounced so dragging a window edge doesn't thrash
  // the iframe (each resize rebuilds the plugin URL and reloads it).
  useEffect(() => {
    if (!open || !isVideo) return undefined

    const apply = () => setEmbed(fitEmbed(media, hasCopy))
    apply()

    let debounce
    const onResize = () => {
      window.clearTimeout(debounce)
      debounce = window.setTimeout(apply, 220)
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)
    window.visualViewport?.addEventListener('resize', onResize)

    return () => {
      window.clearTimeout(debounce)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
      window.visualViewport?.removeEventListener('resize', onResize)
    }
  }, [open, isVideo, media, hasCopy])

  const embedSrc = useMemo(() => {
    if (!embed || !isVideo) return null
    return buildFacebookEmbedUrl(media.href, embed.width, embed.height)
  }, [embed, isVideo, media.href])

  const close = useCallback(
    (reason) => {
      if (promo) {
        if (!forced) markDismissed(promo.id)
        track('promo_dismiss', promo, { dismiss_method: reason })
      }
      setOpen(false)
      const previous = lastFocusedRef.current
      if (previous && typeof previous.focus === 'function') previous.focus()
    },
    [promo, forced]
  )

  useEffect(() => {
    if (!open) return undefined

    lastFocusedRef.current = document.activeElement
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    track('promo_view', promo)

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        close('escape')
        return
      }
      if (event.key !== 'Tab') return

      const focusable = dialogRef.current?.querySelectorAll('a[href], button:not([disabled])')
      if (!focusable?.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
    }
  }, [open, promo, close])

  if (!promo || !open) return null

  const isExternal = hasCta && /^https?:\/\//i.test(promo.ctaHref)

  // Facebook letterboxes the reel inside whatever box it's given.
  // `crop` scales the iframe up and lets the wrapper clip the bars.
  const crop = media.crop || 1

  return (
    <div
      className="promo-splash__backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) close('backdrop')
      }}
    >
      <div
        className={`promo-splash__dialog${isVideo ? ' promo-splash__dialog--video' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={promo.title ? 'promo-splash-title' : undefined}
        aria-label={promo.title ? undefined : 'Avocadoria promo'}
        ref={dialogRef}
        style={isVideo && embed ? { width: `${embed.width}px` } : undefined}
      >
        <button
          type="button"
          className="promo-splash__close"
          onClick={() => close('close_button')}
          aria-label="Close promo"
          ref={closeRef}
        >
          <span aria-hidden="true">&times;</span>
        </button>

        {media.type === 'image' && (
          <img
            className="promo-splash__image"
            src={media.src}
            alt={media.alt || ''}
            loading="eager"
            decoding="async"
          />
        )}

        {media.type === 'video' && (
          <video
            className="promo-splash__native"
            src={media.src}
            poster={media.poster}
            autoPlay
            muted
            loop
            playsInline
            controls={media.controls !== false}
            aria-label={media.alt || 'Avocadoria promo video'}
          />
        )}

        {isVideo && embedSrc && (
          <div className="promo-splash__video" style={{ height: `${embed.height}px` }}>
            <iframe
              key={embedSrc}
              src={embedSrc}
              width={embed.width}
              height={embed.height}
              title={promo.title || 'Avocadoria promo video'}
              style={{ border: 'none', transform: crop !== 1 ? `scale(${crop})` : undefined }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
          </div>
        )}

        {hasCopy && (
          <div className="promo-splash__content">
            {promo.title && (
              <h2 className="promo-splash__title" id="promo-splash-title">
                {promo.title}
              </h2>
            )}
            {promo.body && <p className="promo-splash__body">{promo.body}</p>}
            {hasCta && (
              <a
                className="promo-splash__cta"
                href={promo.ctaHref}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                onClick={() => {
                  track('promo_cta_click', promo, { promo_destination: promo.ctaHref })
                  if (!forced) markDismissed(promo.id)
                  setOpen(false)
                }}
              >
                {promo.ctaLabel}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
