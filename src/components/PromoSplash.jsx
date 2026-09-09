import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getActivePromo, buildFacebookEmbedUrl } from '@/data/promos'
import './PromoSplash.css'

const STORAGE_KEY = 'avocadoria_dismissed_promos'
const OPEN_DELAY_MS = 900

/**
 * true  — the splash appears on EVERY visit. Closing it only hides it for
 *         that page view; it returns on the next one.
 * false — once a visitor closes a promo, that promo id never shows for them
 *         again on that browser.
 */
const SHOW_EVERY_VISIT = true

/**
 * Auto-dismiss after this long, so the splash never blocks the homepage.
 * The countdown PAUSES while the visitor is interacting (hover, focus, touch,
 * or opening the branch list) — pulling a modal away mid-read is worse than
 * either always showing it or never showing it. Set to 0 to disable.
 */
const AUTO_CLOSE_MS = 5000
const MIN_EMBED_WIDTH = 220

/**
 * Preview mode. Add ?promo=force to any homepage URL to bypass the dismissal
 * record and the active/date gates — useful for showing the client a promo
 * before it goes live. Nothing is written to storage while forcing.
 */
function isForced() {
  try {
    return new URLSearchParams(window.location.search).get('promo') === 'force'
  } catch {
    return false
  }
}

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

function fitEmbed(media, hasCopy) {
  const ratio = media.ratio || 16 / 9
  const maxWidth = media.maxWidth || 340
  const chrome = (hasCopy ? 104 : 0) + 48
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
  const [branchesOpen, setBranchesOpen] = useState(false)
  const [engaged, setEngaged] = useState(false)
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const lastFocusedRef = useRef(null)
  const touchHoldRef = useRef(null)

  const forced = isForced()

  useEffect(() => {
    let cancelled = false
    let timer

    getActivePromo({ ignoreGates: forced })
      .then((found) => {
        if (cancelled || !found) return
        if (!forced && !SHOW_EVERY_VISIT && readDismissed().includes(found.id)) return
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
  const branches = promo?.branches || []

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
        if (!forced && !SHOW_EVERY_VISIT) markDismissed(promo.id)
        track('promo_dismiss', promo, { dismiss_method: reason })
      }
      window.clearTimeout(touchHoldRef.current)
      setOpen(false)
      const previous = lastFocusedRef.current
      if (previous && typeof previous.focus === 'function') previous.focus()
    },
    [promo, forced]
  )

  // Auto-dismiss. Restarts whenever engagement ends, giving the visitor the
  // full window back rather than whatever was left when they touched it.
  useEffect(() => {
    if (!open || !AUTO_CLOSE_MS || engaged || branchesOpen) return undefined
    const t = window.setTimeout(() => close('auto'), AUTO_CLOSE_MS)
    return () => window.clearTimeout(t)
  }, [open, engaged, branchesOpen, close])

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
        onMouseEnter={() => setEngaged(true)}
        onMouseLeave={() => setEngaged(false)}
        onTouchStart={() => {
          // No mouseleave on touch devices, so release engagement after a
          // pause rather than freezing the countdown for good.
          setEngaged(true)
          window.clearTimeout(touchHoldRef.current)
          touchHoldRef.current = window.setTimeout(() => setEngaged(false), 4000)
        }}
      >
        <div className="promo-splash__close-wrap">
          {/* Countdown ring around the close button: the timer lives where
              the close action is, so it reads as "closing in a moment"
              rather than an unexplained progress bar. */}
          {AUTO_CLOSE_MS > 0 && (
            <svg
              className={`promo-splash__ring${engaged || branchesOpen ? ' is-paused' : ''}`}
              viewBox="0 0 44 44"
              aria-hidden="true"
            >
              <circle className="promo-splash__ring-track" cx="22" cy="22" r="20" />
              <circle
                className="promo-splash__ring-fill"
                cx="22" cy="22" r="20"
                style={{ animationDuration: `${AUTO_CLOSE_MS}ms` }}
              />
            </svg>
          )}

          <button
            type="button"
            className="promo-splash__close"
            onClick={() => close('close_button')}
            aria-label="Close promo"
            ref={closeRef}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        {media.type === 'image' && (
          <img
            className="promo-splash__image"
            src={media.src}
            alt={media.alt || ''}
            loading="eager"
            fetchPriority="high"
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

        {(hasCopy || branches.length > 0) && (
          <div className="promo-splash__content">
            {promo.title && (
              <h2 className="promo-splash__title" id="promo-splash-title">
                {promo.title}
              </h2>
            )}

            {promo.body && <p className="promo-splash__body">{promo.body}</p>}

            {/* Participating branches. Collapsed by default so the CTA stays
                above the fold on a phone; the count is in the label so the
                customer knows it is worth opening. */}
            {branches.length > 0 && (
              <div className="promo-splash__branches">
                <button
                  type="button"
                  className="promo-splash__branches-toggle"
                  onClick={() => {
                    const next = !branchesOpen
                    setBranchesOpen(next)
                    if (next) track('promo_branches_open', promo)
                  }}
                  aria-expanded={branchesOpen}
                  aria-controls="promo-branch-list"
                >
                  <span className="promo-splash__branches-label">
                    Click here for the list of participating stores
                  </span>
                  <span
                    className={`promo-splash__chevron${branchesOpen ? ' is-open' : ''}`}
                    aria-hidden="true"
                  >
                    &#9662;
                  </span>
                </button>

                {branchesOpen && (
                  <ul className="promo-splash__branch-list" id="promo-branch-list">
                    {branches.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {hasCta && (
              <a
                className="promo-splash__cta"
                href={promo.ctaHref}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                onClick={() => {
                  track('promo_cta_click', promo, { promo_destination: promo.ctaHref })
                  if (!forced && !SHOW_EVERY_VISIT) markDismissed(promo.id)
                  setOpen(false)
                }}
              >
                {promo.ctaLabel}
                <span className="promo-splash__cta-arrow" aria-hidden="true">&rarr;</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
